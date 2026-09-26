// Musical instruments used by the adaptive score and the stingers.
// All take a Kit `k` (untracked), a destination node and an absolute start time.
import { mtof, rand, ksBuffer } from './synth.js';

function release(param, peak, tRel, rel) {
  param.setValueAtTime(peak, tRel);
  param.exponentialRampToValueAtTime(0.0001, tRel + rel);
  param.setValueAtTime(0, tRel + rel + 0.005);
}

// Guzheng / koto-like pluck (Karplus-Strong). bend: slide in from `bend`
// semitones; vib: depth of the pressed-string vibrato ("yao").
export function pluck(k, dest, t, midi, vel, { bend = 0, vib = 0 } = {}) {
  const buf = ksBuffer(k.ctx, k.res, midi);
  const g = k.gain(vel, dest);
  const s = k.buffer(buf, t, 1, g);
  const r = s.playbackRate;
  if (bend) {
    r.setValueAtTime(Math.pow(2, bend / 12), t);
    r.setTargetAtTime(1, t + 0.03, 0.045);
  }
  if (vib) {
    r.setValueAtTime(1, t + 0.28);
    r.linearRampToValueAtTime(1 + vib, t + 0.4);
    r.linearRampToValueAtTime(1 - vib * 0.5, t + 0.52);
    r.linearRampToValueAtTime(1 + vib * 0.6, t + 0.64);
    r.linearRampToValueAtTime(1, t + 0.8);
  }
  return s;
}

// Taiko. f0 ~ 60 (o-daiko) .. 140 (shime).
export function taiko(k, dest, t, vel, f0 = 70) {
  const big = f0 < 80;
  k.tone(t, { f: f0 * 1.75, f1: f0, sweep: 0.05, a: 0.002, d: big ? 0.75 : 0.4, peak: 0.7 * vel, dest });
  k.tone(t, { type: 'triangle', f: f0 * 2.4, f1: f0 * 1.5, sweep: 0.04, a: 0.001, d: 0.1, peak: 0.22 * vel, dest });
  k.burst(t, { kind: 'pink', type: 'lowpass', f: 1500, Q: 0.7, a: 0.001, d: 0.06, peak: 0.45 * vel, dest });
  if (big) k.tone(t, { f: f0 * 0.62, a: 0.004, d: 0.9, peak: 0.32 * vel, dest });
}

// Rim / kake (wood click) and shime-daiko tick
export function rim(k, dest, t, vel) {
  k.burst(t, { kind: 'white', type: 'bandpass', f: 2300, Q: 2.5, a: 0.0005, d: 0.035, peak: 0.5 * vel, dest });
  k.tone(t, { type: 'triangle', f: 780, f1: 600, sweep: 0.03, a: 0.0005, d: 0.05, peak: 0.2 * vel, dest });
}

// Chinese gong / tam-tam with blooming upper partials.
export function gong(k, dest, t, vel, f0 = 110, dur = 6) {
  const R = [1, 1.483, 1.932, 2.546, 2.987, 3.41, 4.18, 5.03, 6.12];
  const A = [1, 0.7, 0.55, 0.45, 0.38, 0.3, 0.22, 0.15, 0.1];
  for (let i = 0; i < R.length; i++) {
    const g = k.gain(0, dest);
    const f = f0 * R[i] * rand(0.997, 1.003);
    const o = k.osc('sine', f * 0.985, t, dur + 0.15, g);
    o.frequency.exponentialRampToValueAtTime(f, t + 0.7);
    const atk = 0.004 + i * 0.05;
    const dec = dur / (1 + i * 0.3);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(A[i] * vel * 0.11, t + atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t + atk + dec);
  }
  k.burst(t, { kind: 'brown', type: 'lowpass', f: 300, a: 0.002, d: 0.35, peak: 0.3 * vel, dest });
  k.tone(t, { f: f0 * 0.5, a: 0.005, d: 1.6, peak: 0.16 * vel, dest });
  k.burst(t, { kind: 'white', type: 'bandpass', f: 4200, Q: 1, a: 0.5, d: dur * 0.5, peak: 0.035 * vel, dest });
}

// Brass (horn / trombone section). bright 0..1
export function brass(k, dest, t, midi, dur, vel, bright = 0.5, { rel = 0.5, scoop = true } = {}) {
  const f = mtof(midi);
  const total = dur + rel + 0.1;
  const g = k.gain(0, dest);
  const lp = k.filter('lowpass', f * 1.2, 1.1, g);
  lp.frequency.setValueAtTime(f * 1.2, t);
  lp.frequency.exponentialRampToValueAtTime(Math.min(f * (2.5 + 7 * bright), 11000), t + 0.08);
  lp.frequency.exponentialRampToValueAtTime(Math.min(f * (1.8 + 4 * bright), 8000), t + 0.35);
  lp.frequency.setTargetAtTime(f * 1.1, t + dur, rel * 0.35);
  const vg = k.gain(0);
  k.osc('sine', rand(4.6, 5.4), t, total, vg);
  vg.gain.setValueAtTime(0, t);
  vg.gain.linearRampToValueAtTime(7, t + Math.min(0.7, dur));
  for (const dc of [-7, 6]) {
    const o = k.osc('sawtooth', f, t, total, lp);
    o.detune.setValueAtTime(scoop ? dc - 35 : dc, t);
    o.detune.linearRampToValueAtTime(dc, t + 0.07);
    vg.connect(o.detune);
  }
  k.osc('square', f * 0.5, t, total, k.gain(0.3, lp));
  const sus = Math.min(0.3, dur * 0.6);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vel, t + 0.05);
  g.gain.linearRampToValueAtTime(vel * 0.8, t + sus);
  release(g.gain, vel * 0.8, t + Math.max(dur, sus + 0.01), rel);
}

// Formant choir pad ("aah").
export function choir(k, dest, t, midis, dur, vel, { a = 1.2, rel = 1.6 } = {}) {
  const total = dur + rel + 0.15;
  const env = k.gain(0, dest);
  const sum = k.gain(1);
  for (const [f, Q, gg] of [[760, 5, 1], [1150, 7, 0.55], [2600, 9, 0.22]]) sum.connect(k.filter('bandpass', f, Q, k.gain(gg, env)));
  const vg = k.gain(9);
  k.osc('sine', 5.1, t, total, vg);
  for (const m of midis) {
    for (const dc of [-9, 0, 9]) {
      const o = k.osc('sawtooth', mtof(m), t, total, sum);
      o.detune.value = dc + rand(-3, 3);
      vg.connect(o.detune);
    }
  }
  const at = Math.min(a, dur);
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(vel, t + at);
  release(env.gain, vel, t + Math.max(dur, at + 0.01), rel);
  k.burst(t, { kind: 'pink', type: 'bandpass', f: 1300, Q: 0.8, a: at, hold: Math.max(0, dur - at), d: rel, peak: vel * 0.05, dest });
}

// Warm analog pad chord.
export function pad(k, dest, t, midis, dur, vel, cutoff = 1200, { a = 1.6, rel = 2.4 } = {}) {
  const total = dur + rel + 0.1;
  const env = k.gain(0, dest);
  const lp = k.filter('lowpass', cutoff * 0.6, 0.6, env);
  lp.frequency.setValueAtTime(cutoff * 0.6, t);
  lp.frequency.linearRampToValueAtTime(cutoff, t + dur * 0.5);
  lp.frequency.linearRampToValueAtTime(cutoff * 0.7, t + dur + rel);
  for (const m of midis) {
    for (const dc of [-7, 7]) {
      const o = k.osc('sawtooth', mtof(m), t, total, lp);
      o.detune.value = dc + rand(-2, 2);
    }
  }
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(vel, t + a);
  release(env.gain, vel, t + dur, rel);
}

// Low strings / brass swell: crescendo into the next chord.
export function swell(k, dest, t, midis, dur, vel, bright = 0.5) {
  const total = dur + 1.4;
  const env = k.gain(0, dest);
  const lp = k.filter('lowpass', 280, 0.9, env);
  const peakT = t + dur * 0.8;
  lp.frequency.setValueAtTime(280, t);
  lp.frequency.exponentialRampToValueAtTime(350 + 2600 * bright, peakT);
  lp.frequency.exponentialRampToValueAtTime(300, t + dur + 1.2);
  const vg = k.gain(8);
  k.osc('sine', 4.8, t, total, vg);
  for (const m of midis) {
    for (const dc of [-10, 0, 10]) {
      const o = k.osc('sawtooth', mtof(m), t, total, lp);
      o.detune.value = dc + rand(-2, 2);
      vg.connect(o.detune);
    }
  }
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(vel * 0.2, t + 0.4);
  env.gain.linearRampToValueAtTime(vel, peakT);
  release(env.gain, vel, peakT + 0.01, dur - (peakT - t) + 1.2);
}

// Legato wind / bowed lead: dizi (bamboo flute) or erhu (two-string fiddle).
// notes: [{ m, b }] with b in beats.
export function lead(k, dest, t, notes, beat, vel, variant = 'dizi', scale = null) {
  const erhu = variant === 'erhu';
  let total = 0;
  for (const n of notes) total += n.b * beat;
  const end = t + total;
  const env = k.gain(0, dest);
  let src = env;
  if (erhu) {
    const pk = k.filter('peaking', 1100, 1.2, env);
    pk.gain.value = 5;
    src = k.filter('lowpass', 2400, 0.8, pk);
  }
  const o = k.osc(erhu ? 'sawtooth' : 'triangle', mtof(notes[0].m), t, total + 1.0, src);
  const h = erhu ? null : k.osc('sine', mtof(notes[0].m) * 2, t, total + 1.0, k.gain(0.18, env));
  const vg = k.gain(0);
  k.osc('sine', erhu ? 5.6 : 5.2, t, total + 1.0, vg);
  vg.connect(o.detune);
  if (h) vg.connect(h.detune);
  // breath / bow noise
  const bn = k.gain(erhu ? 0.05 : 0.09, env);
  const bbp = k.filter('bandpass', mtof(notes[0].m) * 2, 3, bn);
  k.noise('pink', t, total + 1.0, 1, bbp);
  const glide = erhu ? 0.045 : 0.012;
  const setF = (f, at, tau) => {
    o.frequency.setTargetAtTime(f, at, tau);
    if (h) h.frequency.setTargetAtTime(f * 2, at, tau);
    bbp.frequency.setTargetAtTime(f * 2, at, tau);
  };
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(vel, t + (erhu ? 0.15 : 0.07));
  let tn = t;
  notes.forEach((n, i) => {
    const f = mtof(n.m);
    const d = n.b * beat;
    if (i > 0) {
      if (!erhu) { // tongued articulation
        env.gain.setTargetAtTime(vel * 0.4, tn - 0.035, 0.01);
        env.gain.setTargetAtTime(vel, tn, 0.02);
      }
      const grace = !erhu && scale && Math.random() < 0.28;
      if (grace) {
        const idx = scale.indexOf(n.m);
        const up = idx >= 0 && idx < scale.length - 1 ? scale[idx + 1] : n.m + 2;
        setF(mtof(up), tn, 0.004);
        setF(f, tn + 0.06, 0.008);
      } else setF(f, tn, glide * (erhu && Math.random() < 0.5 ? 2.2 : 1));
    }
    vg.gain.setValueAtTime(0, tn + 0.001);
    vg.gain.linearRampToValueAtTime(erhu ? 16 : 11, tn + Math.min(0.45, d * 0.7));
    tn += d;
  });
  env.gain.setTargetAtTime(0, end - 0.05, erhu ? 0.2 : 0.14);
  env.gain.setValueAtTime(0, end + 0.95);
}
