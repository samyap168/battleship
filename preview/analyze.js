// TEMPORARY analysis harness for the audio review. Not part of the game build.
// Reuses the exact same Engine/renderOffline pattern as src/audio/audio.js,
// but keeps the raw rendered buffer around so we can measure spectral
// balance, attack time, decay tail, stereo width and shot-to-shot variation.
import { Engine } from '../src/audio/audio.js';

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

export async function fullAnalyze(name, opts = {}, seconds = 5) {
  const { buf, sr } = await renderBuf(async (e) => { e.play(name, { x: 0, z: 0, ...opts }); }, { seconds });
  const L = buf.getChannelData(0), R = buf.getChannelData(1);
  const at = attackAndTail(L, sr);
  const sb = spectralBalance(L, sr, { start: 0, end: Math.min(seconds, at.tailSec + at.peakT + 0.3) });
  const width = stereoWidth(L, R);
  return { name, ...at, bandsPct: sb.pct, stereo: width };
}

window.Analyze = { renderBuf, spectralBalance, attackAndTail, stereoWidth, variation, distanceCompare, fullAnalyze };
