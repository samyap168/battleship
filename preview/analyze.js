// TEMPORARY analysis harness for the audio review. Not part of the game build.
// Reuses the exact same Engine/renderOffline pattern as src/audio/audio.js,
// but keeps the raw rendered buffer around so we can measure spectral
// balance, attack time, decay tail, stereo width and shot-to-shot variation.
import { Engine } from '../src/audio/audio.js';
import { Kit, getResources } from '../src/audio/synth.js';
import { RECIPES } from '../src/audio/sounds.js';
import { Music } from '../src/audio/music.js';

async function renderBuf(script, { seconds = 3, sampleRate = 44100, raw = false } = {}) {
  const OAC = globalThis.OfflineAudioContext || globalThis.webkitOfflineAudioContext;
  const ctx = new OAC(2, Math.ceil(seconds * sampleRate), sampleRate);
  const eng = new Engine(ctx, { offline: true, raw });
  await script(eng);
  const buf = await ctx.startRendering();
  return { buf, sr: sampleRate };
}

function dbfs(x) { return 20 * Math.log10(Math.abs(x) + 1e-12); }

// Simple radix-2 FFT (in place, iterative), real input padded with zeros imag.
function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    const wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cwr = 1, cwi = 0;
      for (let k = 0; k < len / 2; k++) {
        const ur = re[i + k], ui = im[i + k];
        const vr = re[i + k + len / 2] * cwr - im[i + k + len / 2] * cwi;
        const vi = re[i + k + len / 2] * cwi + im[i + k + len / 2] * cwr;
        re[i + k] = ur + vr; im[i + k] = ui + vi;
        re[i + k + len / 2] = ur - vr; im[i + k + len / 2] = ui - vi;
        const nwr = cwr * wr - cwi * wi, nwi = cwr * wi + cwi * wr;
        cwr = nwr; cwi = nwi;
      }
    }
  }
}

const BANDS = [
  ['sub<120', 0, 120], ['low120-500', 120, 500], ['mid500-2k', 500, 2000],
  ['hi2k-6k', 2000, 6000], ['air>6k', 6000, 22050],
];

// STFT-based band-energy split across the whole (or windowed) signal.
export function spectralBalance(chan, sr, { start = 0, end } = {}) {
  const N = 4096, hop = 2048;
  const s0 = Math.floor(start * sr), e0 = Math.min(chan.length, end ? Math.floor(end * sr) : chan.length);
  const totals = new Array(BANDS.length).fill(0);
  let frames = 0;
  const win = new Float32Array(N);
  for (let i = 0; i < N; i++) win[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (N - 1));
  for (let off = s0; off + N <= e0; off += hop) {
    const re = new Float32Array(N), im = new Float32Array(N);
    for (let i = 0; i < N; i++) re[i] = (chan[off + i] || 0) * win[i];
    fft(re, im);
    for (let k = 1; k < N / 2; k++) {
      const f = (k * sr) / N;
      const mag2 = re[k] * re[k] + im[k] * im[k];
      for (let b = 0; b < BANDS.length; b++) if (f >= BANDS[b][1] && f < BANDS[b][2]) { totals[b] += mag2; break; }
    }
    frames++;
  }
  const sum = totals.reduce((a, b) => a + b, 0) || 1e-12;
  const pct = {};
  BANDS.forEach(([name], i) => { pct[name] = +((totals[i] / sum) * 100).toFixed(1); });
  return { frames, pct };
}

// Envelope (RMS, 5ms window) in dBFS relative to the buffer's own peak.
function envelopeDb(chan, sr, winSec = 0.005) {
  const win = Math.max(1, Math.floor(sr * winSec));
  const out = [];
  let peak = 0;
  for (let i = 0; i < chan.length; i++) { const a = Math.abs(chan[i]); if (a > peak) peak = a; }
  for (let i = 0; i < chan.length; i += win) {
    let ss = 0, n = 0;
    for (let j = i; j < Math.min(chan.length, i + win); j++) { ss += chan[j] * chan[j]; n++; }
    out.push({ t: i / sr, db: dbfs(Math.sqrt(ss / n) / (peak || 1)) });
  }
  return { env: out, peak, peakDb: dbfs(peak) };
}

export function attackAndTail(chan, sr) {
  // fine (1ms) envelope for the attack edge, coarse (5ms) for the tail so a
  // brief mid-sound dip doesn't get mistaken for the -40dB point.
  const fine = envelopeDb(chan, sr, 0.001);
  const coarse = envelopeDb(chan, sr, 0.005);
  let peakI = 0, peakV = -Infinity;
  for (let i = 0; i < fine.env.length; i++) if (fine.env[i].db > peakV) { peakV = fine.env[i].db; peakI = i; }
  // 10%->90% of peak (i.e. peak-20dB -> peak) rise time, walking back from the peak
  let startI = peakI;
  for (let i = peakI; i >= 0; i--) { if (fine.env[i].db < peakV - 20) { startI = i; break; } startI = i; }
  const attackMs = (fine.env[peakI].t - fine.env[startI].t) * 1000;
  const peakDb = fine.peakDb, peakT = fine.env[peakI].t;
  // tail: first index (coarse grid) after the peak where level <= -40dB rel. to peak AND stays there
  let tailI = coarse.env.length - 1, cPeakI = 0, cBest = -Infinity;
  for (let i = 0; i < coarse.env.length; i++) if (coarse.env[i].db > cBest) { cBest = coarse.env[i].db; cPeakI = i; }
  for (let i = cPeakI; i < coarse.env.length; i++) {
    if (coarse.env[i].db <= -40) {
      let stays = true;
      for (let j = i; j < coarse.env.length; j++) if (coarse.env[j].db > -40) { stays = false; break; }
      if (stays) { tailI = i; break; }
    }
  }
  const tailSec = coarse.env[tailI].t - coarse.env[cPeakI].t;
  return { peakDb, attackMs: +attackMs.toFixed(2), tailSec: +tailSec.toFixed(3), peakT };
}

export function stereoWidth(L, R) {
  let sl = 0, sr2 = 0, sm = 0, ss = 0;
  const n = Math.min(L.length, R.length);
  for (let i = 0; i < n; i++) {
    sl += L[i] * L[i]; sr2 += R[i] * R[i];
    const mid = (L[i] + R[i]) * 0.5, side = (L[i] - R[i]) * 0.5;
    sm += mid * mid; ss += side * side;
  }
  const corr = (() => {
    let num = 0, dl = 0, dr = 0;
    for (let i = 0; i < n; i++) { num += L[i] * R[i]; dl += L[i] * L[i]; dr += R[i] * R[i]; }
    return num / (Math.sqrt(dl * dr) + 1e-12);
  })();
  return { corr: +corr.toFixed(3), sideToMidDb: +dbfs(Math.sqrt(ss / (sm || 1e-12))).toFixed(1) };
}

function spectralCentroid(chan, sr, start, end) {
  const N = 8192;
  const s0 = Math.floor(start * sr);
  const re = new Float32Array(N), im = new Float32Array(N);
  for (let i = 0; i < N; i++) re[i] = chan[s0 + i] || 0;
  fft(re, im);
  let num = 0, den = 0;
  for (let k = 1; k < N / 2; k++) {
    const f = (k * sr) / N, m = Math.hypot(re[k], im[k]);
    num += f * m; den += m;
  }
  return den > 0 ? num / den : 0;
}

// Render `name` `count` times back-to-back (gapSec apart) and report per-hit
// peak level + spectral centroid so we can see if repeats are identical.
export async function variation(name, count = 5, gapSec = 0.4, opts = {}) {
  const { buf, sr } = await renderBuf(async (e) => {
    for (let i = 0; i < count; i++) e.play(name, { when: i * gapSec, ...opts });
  }, { seconds: count * gapSec + 3 });
  const L = buf.getChannelData(0);
  const hits = [];
  for (let i = 0; i < count; i++) {
    const t0 = i * gapSec;
    const seg = L.subarray(Math.floor(t0 * sr), Math.floor((t0 + gapSec) * sr));
    let pk = 0; for (const x of seg) { const a = Math.abs(x); if (a > pk) pk = a; }
    const cen = spectralCentroid(L, sr, t0 + 0.001, t0 + gapSec);
    hits.push({ peakDb: +dbfs(pk).toFixed(2), centroidHz: Math.round(cen) });
  }
  return hits;
}

// Play `name` at two distances and compare level + spectral centroid.
export async function distanceCompare(name, dists = [0, 200, 380], opts = {}) {
  const out = [];
  for (const d of dists) {
    const { buf, sr } = await renderBuf(async (e) => { e.setListener(0, 0, 180); e.play(name, { x: d, z: 0, ...opts }); });
    const L = buf.getChannelData(0), R = buf.getChannelData(1);
    let pk = 0; for (let i = 0; i < L.length; i++) { const a = Math.max(Math.abs(L[i]), Math.abs(R[i])); if (a > pk) pk = a; }
    const cen = spectralCentroid(L, sr, 0, Math.min(2, L.length / sr));
    out.push({ d, peakDb: +dbfs(pk).toFixed(2), centroidHz: Math.round(cen) });
  }
  return out;
}

// Isolated per-shot variation: N fully independent offline renders (no
// cross-voice/reverb-tail bleed between shots) so peak/centroid differences
// reflect only the recipe's own per-play randomisation (pitch/level jitter,
// random noise-buffer read offsets).
export async function isolatedVariation(name, count = 5, opts = {}) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const { buf, sr } = await renderBuf(async (e) => { e.play(name, { x: 0, z: 0, ...opts }); }, { seconds: 3 });
    const L = buf.getChannelData(0);
    let pk = 0; for (const x of L) { const a = Math.abs(x); if (a > pk) pk = a; }
    out.push({ peakDb: +dbfs(pk).toFixed(2), centroidHz: Math.round(spectralCentroid(L, sr, 0, 1)) });
  }
  return out;
}

export async function fullAnalyze(name, opts = {}, seconds = 5) {
  const { buf, sr } = await renderBuf(async (e) => { e.play(name, { x: 0, z: 0, ...opts }); }, { seconds });
  const L = buf.getChannelData(0), R = buf.getChannelData(1);
  const at = attackAndTail(L, sr);
  const sb = spectralBalance(L, sr, { start: 0, end: Math.min(seconds, at.tailSec + at.peakT + 0.3) });
  const width = stereoWidth(L, R);
  return { name, ...at, bandsPct: sb.pct, stereo: width };
}

// Simple RBJ biquad (bandpass/highpass/lowpass), used for short-window band
// probes where STFT (spectralBalance's N=4096 frame) is too coarse in time
// (e.g. a 20ms transient early in a 2s sound).
function biquad(chan, sr, { type = 'bandpass', f0, Q = 1 }) {
  const w0 = (2 * Math.PI * f0) / sr, cw = Math.cos(w0), sw = Math.sin(w0), alpha = sw / (2 * Q);
  let b0, b1, b2, a0, a1, a2;
  if (type === 'bandpass') { b0 = alpha; b1 = 0; b2 = -alpha; a0 = 1 + alpha; a1 = -2 * cw; a2 = 1 - alpha; }
  else if (type === 'highpass') { b0 = (1 + cw) / 2; b1 = -(1 + cw); b2 = (1 + cw) / 2; a0 = 1 + alpha; a1 = -2 * cw; a2 = 1 - alpha; }
  else { b0 = (1 - cw) / 2; b1 = 1 - cw; b2 = (1 - cw) / 2; a0 = 1 + alpha; a1 = -2 * cw; a2 = 1 - alpha; } // lowpass
  b0 /= a0; b1 /= a0; b2 /= a0; a1 /= a0; a2 /= a0;
  const out = new Float32Array(chan.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < chan.length; i++) {
    const x0 = chan[i];
    const y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
    out[i] = y0;
    x2 = x1; x1 = x0; y2 = y1; y1 = y0;
  }
  return out;
}

// RMS (dBFS) of a band-filtered signal within [start,end) seconds — for
// narrow time windows (early transient) where spectralBalance's STFT frame
// (93ms @44.1k) is too coarse.
export function bandRms(chan, sr, { start = 0, end, peak = false, ...filt } = {}) {
  const filtered = biquad(chan, sr, filt);
  const s0 = Math.floor(start * sr), e0 = Math.min(chan.length, end ? Math.floor(end * sr) : chan.length);
  if (peak) {
    let pk = 0; for (let i = s0; i < e0; i++) { const a = Math.abs(filtered[i]); if (a > pk) pk = a; }
    return +dbfs(pk).toFixed(2);
  }
  let ss = 0, n = 0;
  for (let i = s0; i < e0; i++) { ss += filtered[i] * filtered[i]; n++; }
  return +dbfs(Math.sqrt(ss / (n || 1))).toFixed(2);
}

// Call a RECIPES[name] fn directly with a fixed V.p=1 and no play()-level
// pitch/level jitter, gain staging or busing — for clean A/B comparison of a
// recipe's own branches (e.g. cannonHeavy's era<=2 / era>=4 split) with zero
// per-call random noise in the way.
export async function directRecipe(name, opts = {}, seconds = 4) {
  const OAC = globalThis.OfflineAudioContext || globalThis.webkitOfflineAudioContext;
  const ctx = new OAC(2, Math.ceil(seconds * 44100), 44100);
  const res = getResources(ctx);
  const V = new Kit(ctx, res, true);
  V.t = 0.02; V.p = opts.pitch == null ? 1 : +opts.pitch;
  V.o = opts;
  V.out = V.gain(1, ctx.destination);
  V.wet = V.gain(0.0001, ctx.destination);
  V.echo = V.gain(0.0001, ctx.destination);
  RECIPES[name](V);
  const buf = await ctx.startRendering();
  return { buf, sr: 44100 };
}

// Ship-voice probe (Round 4, change #1): builds a live Engine+Ambience, steps
// real OfflineAudioContext time forward with ctx.suspend()/ctx.resume() (a
// plain currentTime read before startRendering() never advances — same
// lesson as Round 3's combatDuck probe), calling setShip(age,speed) then
// sampling each propulsion-layer gain node's *actual automated* .value once
// the setTargetAtTime has had time to settle.
export async function shipVoiceProbe(cases, settleSec = 2.5, seconds = 3) {
  const OAC = globalThis.OfflineAudioContext || globalThis.webkitOfflineAudioContext;
  const ctx = new OAC(2, Math.ceil(seconds * cases.length * 44100), 44100);
  const eng = new Engine(ctx, { offline: true });
  eng.ambience.start();
  const out = [];
  const rendering = ctx.startRendering();
  for (let i = 0; i < cases.length; i++) {
    const at = i * seconds + 0.05;
    await ctx.suspend(at).then(() => {
      const { age, speed } = cases[i];
      eng.ambience.setShip(age, speed);
    });
    ctx.resume();
    await ctx.suspend(at + settleSec).then(() => {
      const { age, speed } = cases[i];
      out.push({
        age, speed,
        wash: +eng.ambience.washG.gain.value.toFixed(4),
        creak: +eng.ambience.creakG.gain.value.toFixed(4),
        chuff: +eng.ambience.chuffG.gain.value.toFixed(4),
        chuffHz: +eng.ambience.chuffLfo.frequency.value.toFixed(3),
        turb: +eng.ambience.turbG.gain.value.toFixed(4),
        hum: +eng.ambience.humG.gain.value.toFixed(4),
      });
    });
    ctx.resume();
  }
  await rendering;
  return out;
}

// Full-match music-arc instrumentation (Round 4): drives Music through a
// scripted 10-minute calm->war->finale intensity curve purely via repeated
// setIntensity()+scheduleUntil() calls (the same functions the real _tick()
// loop calls every 25ms) — no audio is ever rendered, so this is fast and
// exact: it exercises the identical section/pattern/theme decision code the
// live game runs, just without needing 10 real minutes or ctx.suspend
// stepping (that trick is for reading live *audio-graph automation*, not for
// driving this pre-render scheduling logic, which only depends on the
// scheduler's own internal clock and never touches ctx.currentTime meaningfully
// until startRendering() is called, which we skip entirely here).
export async function musicArc(totalSec = 600, stepSec = 8, finaleAt = 480, intensityFn) {
  const OAC = globalThis.OfflineAudioContext || globalThis.webkitOfflineAudioContext;
  const ctx = new OAC(2, 44100, 44100); // tiny buffer: we never render it
  const eng = new Engine(ctx, { offline: true });
  const music = eng.music;
  const log = [];
  const origSection = music._section.bind(music);
  music._section = (sec, t) => {
    const preI = music.I, preWarSecs = music.warSecs || 0; // pool/theme both key off this pre-call I
    origSection(sec, t);
    const pool = music.finale ? 'FINALE' : preI > 0.5 ? 'WAR' : 'CALM';
    // reconstruct the exact boolean `theme` fired inside _section by diffing warSecs
    // (it only increments when I>0.85 && !opening, and fires the theme override on %3===1)
    const eligible = (music.warSecs || 0) > preWarSecs;
    const theme = eligible && (music.warSecs % 3 === 1);
    log.push({
      sec, t: +t.toFixed(2), I: +music.I.toFixed(3), finale: !!music.finale, pool,
      progIdx: music.lastProg, prog: music.prog.join('-'), patIdx: music.lastPat,
      theme, eligible, warSecs: music.warSecs || 0,
      drumLvl: Math.max(music.finale ? 3 : 0, music.I < 0.14 ? 0 : music.I < 0.4 ? 1 : music.I < 0.65 ? 2 : music.I < 0.85 ? 3 : 4),
      tempo: +(music.tempo || 1).toFixed(3), plan: music.plan ? music.plan.kind : null,
    });
  };
  const defaultCurve = (t) => {
    if (t < 60) return 0.15; // calm open
    if (t < 420) return 0.15 + 0.75 * Math.min(1, (t - 60) / 200); // ramp into war, hold ~0.9
    if (t < finaleAt) return 0.9;
    return 0.95; // dusk tide finale
  };
  const curve = intensityFn || defaultCurve;
  music.start();
  const steps = Math.ceil(totalSec / stepSec);
  for (let i = 0; i <= steps; i++) {
    const at = Math.min(totalSec, i * stepSec);
    music.setIntensity(curve(at));
    if (!music.finale && at >= finaleAt) music.setFinale(true);
    music.scheduleUntil(at + stepSec);
  }
  return log;
}

// Actual rendered loudness arc for the full match: schedules the same
// calm->war->finale curve as musicArc() but this time really renders the
// audio through the full mix chain (duck/fade/glue-comp/limiter), then
// reports windowed RMS dBFS so we can see the arc's shape and whether the
// finale actually lands louder, not just busier-on-paper.
export async function musicLoudness(totalSec = 600, stepSec = 8, finaleAt = 480, intensityFn, winSec = 10) {
  const OAC = globalThis.OfflineAudioContext || globalThis.webkitOfflineAudioContext;
  const sr = 44100;
  const ctx = new OAC(2, Math.ceil((totalSec + 3) * sr), sr);
  const eng = new Engine(ctx, { offline: true });
  const music = eng.music;
  const defaultCurve = (t) => {
    if (t < 60) return 0.15;
    if (t < 420) return 0.15 + 0.75 * Math.min(1, (t - 60) / 200);
    if (t < finaleAt) return 0.9;
    return 0.95;
  };
  const curve = intensityFn || defaultCurve;
  music.start();
  const steps = Math.ceil(totalSec / stepSec);
  for (let i = 0; i <= steps; i++) {
    const at = Math.min(totalSec, i * stepSec);
    music.setIntensity(curve(at));
    if (!music.finale && at >= finaleAt) music.setFinale(true);
    music.scheduleUntil(at + stepSec);
  }
  const buf = await ctx.startRendering();
  const L = buf.getChannelData(0), R = buf.getChannelData(1);
  const win = Math.floor(winSec * sr);
  const out = [];
  for (let off = 0; off + win <= L.length; off += win) {
    let ss = 0;
    for (let i = off; i < off + win; i++) { const m = (L[i] + R[i]) * 0.5; ss += m * m; }
    out.push({ t: +(off / sr).toFixed(1), db: +dbfs(Math.sqrt(ss / win)).toFixed(2) });
  }
  return out;
}

window.Analyze = { renderBuf, spectralBalance, attackAndTail, stereoWidth, variation, distanceCompare, fullAnalyze, isolatedVariation, bandRms, directRecipe, shipVoiceProbe, musicArc, musicLoudness };
