// SFX recipes. Each recipe receives a Voice `V` (a Kit plus routing):
//   V.t   start time        V.p    pitch multiplier (already jittered)
//   V.out dry+send input    V.wet  extra reverb-only input    V.echo  horizon-echo send (may be null)
//   V.o   the play() options (e.g. variant)
// and returns the voice duration in seconds. Levels are raw; per-sound
// calibration lives in DEFS.lvl.
import { rand } from './synth.js';

// cap: max concurrent voices of this sound. pri: importance when the global
// cap is reached. rev: reverb send. echo: horizon echo send. range: audible
// radius multiplier. jp/jv: pitch / level randomisation (fractional).
export const DEFS = {
  cannon:        { cap: 8, pri: 3, rev: 0.22, echo: 0.05, range: 1.0,  jp: 0.07, jv: 0.18, lvl: 0.87 },
  cannonHeavy:   { cap: 6, pri: 5, rev: 0.25, echo: 0.26, range: 1.15, jp: 0.05, jv: 0.15, lvl: 0.74 },
  shellWhistle:  { cap: 4, pri: 2, rev: 0.15, echo: 0,    range: 0.8,  jp: 0.08, jv: 0.2,  lvl: 1.07 },
  flak:          { cap: 8, pri: 2, rev: 0.2,  echo: 0.03, range: 0.9,  jp: 0.1,  jv: 0.2,  lvl: 1.27 },
  laser:         { cap: 8, pri: 2, rev: 0.18, echo: 0,    range: 0.9,  jp: 0.05, jv: 0.15, lvl: 1.26 },
  pulse:         { cap: 8, pri: 2, rev: 0.18, echo: 0,    range: 0.9,  jp: 0.06, jv: 0.15, lvl: 1.14 },
  rail:          { cap: 3, pri: 7, rev: 0.28, echo: 0.24, range: 1.15, jp: 0.03, jv: 0.1,  lvl: 1.7 },
  torpedoLaunch: { cap: 4, pri: 3, rev: 0.15, echo: 0,    range: 0.9,  jp: 0.06, jv: 0.15, lvl: 0.94 },
  torpedoRun:    { cap: 4, pri: 1, rev: 0.1,  echo: 0,    range: 0.7,  jp: 0.08, jv: 0.2,  lvl: 1.78 },
  missile:       { cap: 6, pri: 3, rev: 0.22, echo: 0.05, range: 1.0,  jp: 0.06, jv: 0.15, lvl: 1.66 },
  missileRipple: { cap: 2, pri: 5, rev: 0.22, echo: 0.06, range: 1.05, jp: 0.04, jv: 0.1,  lvl: 3.02 },
  hypersonic:    { cap: 2, pri: 8, rev: 0.25, echo: 0.28, range: 1.25, jp: 0.03, jv: 0.08, lvl: 1.06 },
  explosion:     { cap: 6, pri: 4, rev: 0.25, echo: 0.07, range: 1.0,  jp: 0.08, jv: 0.18, lvl: 0.75 },
  thunder:       { cap: 2, pri: 6, rev: 0.45, echo: 0.3,  range: 3.0,  jp: 0.12, jv: 0.15, lvl: 1.2 },
  explosionBig:  { cap: 3, pri: 7, rev: 0.3,  echo: 0.28, range: 1.2,  jp: 0.05, jv: 0.1,  lvl: 0.65 },
  splash:        { cap: 8, pri: 1, rev: 0.15, echo: 0,    range: 0.8,  jp: 0.12, jv: 0.25, lvl: 1.62 },
  hitTick:       { cap: 3, pri: 9, rev: 0.02, echo: 0,    range: 9,    jp: 0.04, jv: 0.08, lvl: 1.4 },
  killConfirm:   { cap: 2, pri: 10, rev: 0.12, echo: 0,   range: 9,    jp: 0.02, jv: 0.05, lvl: 1.3 },
  hit:           { cap: 8, pri: 2, rev: 0.18, echo: 0,    range: 0.85, jp: 0.1,  jv: 0.2,  lvl: 0.92 },
  droneLaunch:   { cap: 4, pri: 2, rev: 0.15, echo: 0,    range: 0.85, jp: 0.08, jv: 0.15, lvl: 2.66 },
  dronePop:      { cap: 10, pri: 1, rev: 0.15, echo: 0,   range: 0.8,  jp: 0.15, jv: 0.25, lvl: 1.51 },
  emp:           { cap: 2, pri: 6, rev: 0.3,  echo: 0.08, range: 1.05, jp: 0.04, jv: 0.1,  lvl: 0.93 },
  shield:        { cap: 3, pri: 5, rev: 0.3,  echo: 0,    range: 0.9,  jp: 0.03, jv: 0.1,  lvl: 1.74 },
  shieldHit:     { cap: 6, pri: 2, rev: 0.22, echo: 0,    range: 0.85, jp: 0.1,  jv: 0.2,  lvl: 1.84 },
  heal:          { cap: 3, pri: 4, rev: 0.3,  echo: 0,    range: 0.85, jp: 0.04, jv: 0.1,  lvl: 3.31 },
  ram:           { cap: 3, pri: 5, rev: 0.22, echo: 0.05, range: 1.0,  jp: 0.06, jv: 0.12, lvl: 0.69 },
  smoke:         { cap: 3, pri: 3, rev: 0.2,  echo: 0,    range: 0.9,  jp: 0.06, jv: 0.15, lvl: 2.72 },
  mineDrop:      { cap: 4, pri: 2, rev: 0.15, echo: 0,    range: 0.8,  jp: 0.08, jv: 0.15, lvl: 1.64 },
  bombWhistle:   { cap: 4, pri: 3, rev: 0.15, echo: 0,    range: 0.9,  jp: 0.06, jv: 0.15, lvl: 1.43 },
  engineBoost:   { cap: 3, pri: 3, rev: 0.2,  echo: 0.04, range: 0.9,  jp: 0.04, jv: 0.12, lvl: 1.27 },
  levelUp:       { cap: 2, pri: 9, rev: 0.3,  echo: 0,    range: 2,    jp: 0,    jv: 0.05, lvl: 3.47 },
  gold:          { cap: 4, pri: 6, rev: 0.2,  echo: 0,    range: 2,    jp: 0.02, jv: 0.1,  lvl: 3.51 },
  uiClick:       { cap: 3, pri: 10, rev: 0.05, echo: 0,   range: 2,    jp: 0.02, jv: 0.05, lvl: 4.73 },
  uiHover:       { cap: 2, pri: 10, rev: 0.05, echo: 0,   range: 2,    jp: 0.02, jv: 0.05, lvl: 6.84 },
  uiError:       { cap: 2, pri: 10, rev: 0.05, echo: 0,   range: 2,    jp: 0,    jv: 0.05, lvl: 2.00 },
  capture:       { cap: 2, pri: 8, rev: 0.3,  echo: 0.12, range: 1.3,  jp: 0.02, jv: 0.08, lvl: 2.57 },
  death:         { cap: 4, pri: 8, rev: 0.28, echo: 0.12, range: 1.2,  jp: 0.05, jv: 0.1,  lvl: 0.84 },
  towerDown:     { cap: 2, pri: 8, rev: 0.3,  echo: 0.15, range: 1.3,  jp: 0.04, jv: 0.08, lvl: 0.80 },
  roar:          { cap: 2, pri: 9, rev: 0.4,  echo: 0.2,  range: 1.6,  jp: 0.06, jv: 0.08, lvl: 0.9 },
  sailFlap:      { cap: 4, pri: 1, rev: 0.12, echo: 0,    range: 0.7,  jp: 0.1,  jv: 0.25, lvl: 4.68 },
};

// ---------------------------------------------------------------------------
// Shared layers

// Generic detonation. s: 0.5 small .. 1.6 huge.
function blast(V, t, s, p) {
  const sq = Math.sqrt(s);
  V.burst(t, { kind: 'white', type: 'highpass', f: 1400 * p, a: 0.0008, d: 0.03 + 0.03 * s, peak: 0.5 });
  V.burst(t, { kind: 'pink', type: 'lowpass', f: 3600 * p, f1: (380 / s) * p, sweep: 0.3 * s + 0.15, Q: 0.8, a: 0.002, d: 0.5 + 0.6 * s, peak: 0.85, dest: [V.out, V.echo] });
  V.tone(t, { f: (118 / sq) * p, f1: (38 / sq) * p, sweep: 0.2 + 0.4 * s, a: 0.003, d: 0.35 + 0.6 * s, peak: 0.75 + 0.2 * s });
  V.burst(t + 0.015, { kind: 'crackle', type: 'bandpass', f: 2300 * p, Q: 0.6, a: 0.01, d: 0.5 + 0.9 * s, peak: 0.3 });
  V.burst(t + 0.04, { kind: 'brown', type: 'lowpass', f: 650 * p, f1: 170 * p, sweep: 1.5 * s, a: 0.06, d: 0.9 + 1.2 * s, peak: 0.28 + 0.14 * s, dest: [V.out, V.wet] });
}

function bubbles(V, t, n, spread, lo, hi, peak) {
  for (let i = 0; i < n; i++) V.blip(t + Math.random() * spread, rand(lo, hi) * V.p, peak * rand(0.5, 1), V.out, rand(0.025, 0.05), rand(1.4, 2.2));
}

function fm(V, t, { fc, fc1, ratio, index, index1 = 1, sweep, a = 0.001, d = 0.25, peak = 0.3, dest }) {
  const car = V.osc('sine', fc, t, a + d + 0.03);
  const mod = V.osc('sine', fc * ratio, t, a + d + 0.03);
  const mg = V.gain(index, car.frequency);
  mod.connect(mg);
  if (fc1) {
    car.frequency.exponentialRampToValueAtTime(fc1, t + sweep);
    mod.frequency.exponentialRampToValueAtTime(fc1 * ratio, t + sweep);
  }
  mg.gain.setValueAtTime(index, t);
  mg.gain.exponentialRampToValueAtTime(Math.max(1, index1), t + (sweep ?? d));
  const g = V.gain(0, dest || V.out);
  car.connect(g);
  const env = g.gain;
  env.setValueAtTime(0, t);
  env.linearRampToValueAtTime(peak, t + a);
  env.exponentialRampToValueAtTime(0.0001, t + a + d);
}

// Falling whistle (incoming shell / bomb)
function whistle(V, t, f0, f1, dur, peak) {
  const g = V.gain(0, V.out);
  const o = V.osc('sine', f0, t, dur + 0.05, g);
  o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  V.lfo(rand(8, 12), f0 * 0.006, o.frequency, t, dur + 0.05);
  const o2 = V.osc('triangle', f0 * 1.003, t, dur + 0.05, V.gain(0.25, g));
  o2.frequency.exponentialRampToValueAtTime(f1 * 1.003, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak * 0.25, t + dur * 0.5);
  g.gain.exponentialRampToValueAtTime(peak, t + dur * 0.93);
  g.gain.linearRampToValueAtTime(0, t + dur);
  // air band
  const ng = V.gain(0, V.out);
  const bp = V.filter('bandpass', f0 * 1.9, 9, ng);
  bp.frequency.setValueAtTime(f0 * 1.9, t);
  bp.frequency.exponentialRampToValueAtTime(f1 * 1.9, t + dur);
  V.noise('white', t, dur + 0.05, 1, bp);
  ng.gain.setValueAtTime(0.0001, t);
  ng.gain.exponentialRampToValueAtTime(peak * 0.7, t + dur * 0.93);
  ng.gain.linearRampToValueAtTime(0, t + dur);
}

// ---------------------------------------------------------------------------

export const RECIPES = {
  cannon(V) {
    const { t, p } = V;
    // round-robin: three transient shapes so a broadside never repeats one voiceprint
    const rr = (Math.random() * 3) | 0;
    V.burst(t, { kind: 'white', type: 'highpass', f: [1900, 2400, 1500][rr] * p, a: 0.0008, d: [0.045, 0.035, 0.06][rr], peak: 0.55 });
    V.burst(t, { kind: 'pink', type: 'bandpass', f: [190, 160, 230][rr] * p, Q: 1.1, a: 0.002, d: 0.22, peak: 0.6 });
    // black-powder grain ignition: a rough mid-band crackle that turret HE shells don't have
    V.burst(t + 0.003, { kind: 'crackle', type: 'bandpass', f: 2200 * p * rand(0.85, 1.25), Q: 0.9, a: 0.001, d: rand(0.018, 0.04), peak: 0.38 });
    if (rr === 2) V.burst(t + rand(0.01, 0.016), { kind: 'white', type: 'bandpass', f: 1700 * p, Q: 1.2, a: 0.0008, d: 0.03, peak: 0.3 }); // uneven double crack
    V.burst(t, { kind: 'pink', type: 'lowpass', f: 2600 * p, f1: 260 * p, sweep: 0.35, Q: 0.9, a: 0.002, d: 0.65, peak: 0.85, dest: [V.out, V.echo] });
    V.tone(t, { f: 96 * p, f1: 38 * p, sweep: 0.25, a: 0.002, d: 0.45, peak: 0.85 });
    V.burst(t + 0.03, { kind: 'brown', type: 'lowpass', f: 520 * p, f1: 170 * p, sweep: 1.2, a: 0.05, d: 1.4, peak: 0.3, dest: [V.out, V.wet] });
    return 1.9;
  },

  cannonHeavy(V) {
    const { t, p } = V;
    V.burst(t, { kind: 'white', type: 'highpass', f: 1200 * p, a: 0.0006, d: 0.08, peak: 0.6 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 3400 * p, Q: 0.8, a: 0.0006, d: 0.025, peak: 0.45 });
    V.burst(t, { kind: 'pink', type: 'lowpass', f: 3000 * p, f1: 170 * p, sweep: 0.9, Q: 0.9, a: 0.002, d: 1.2, peak: 1.0, dest: [V.out, V.echo] });
    V.tone(t, { f: 72 * p, f1: 26 * p, sweep: 0.6, a: 0.003, d: 1.1, peak: 1.0 });
    V.tone(t + 0.018, { type: 'triangle', f: 46 * p, f1: 24 * p, sweep: 0.8, a: 0.004, d: 1.0, peak: 0.45 });
    V.burst(t + 0.05, { kind: 'brown', type: 'lowpass', f: 360 * p, f1: 110 * p, sweep: 3, a: 0.1, d: 3.2, peak: 0.45, dest: [V.out, V.wet] });
    [0.35, 0.9, 1.65].forEach((k, i) => {
      V.burst(t + k * rand(0.9, 1.1), { kind: 'brown', type: 'lowpass', f: (420 / (i + 1)) * p, Q: 1.2, a: 0.08, d: 1.0 + i * 0.3, peak: 0.26 / (i + 1), dest: [V.out, V.wet] });
    });
    // each age's heavy gun has its own voice on top of the shared boom
    const era = V.o.era || 3;
    if (era <= 2) { // Steam ironclad: iron barrel ring + breech valve hiss
      V.tone(t + 0.004, { type: 'triangle', f: 318 * p, f1: 290 * p, sweep: 0.3, a: 0.002, d: 0.32, peak: 0.16 });
      V.tone(t + 0.004, { type: 'triangle', f: 612 * p, f1: 580 * p, sweep: 0.3, a: 0.002, d: 0.22, peak: 0.08 });
      V.burst(t + 0.08, { kind: 'white', type: 'highpass', f: 4800, a: 0.03, d: 0.55, peak: 0.12 });
    } else if (era >= 4) { // radar-directed battleship: supersonic crack + long rolling whump
      V.burst(t, { kind: 'white', type: 'bandpass', f: 5200 * p, Q: 1.4, a: 0.0004, d: 0.02, peak: 0.55 });
      V.tone(t + 0.06, { f: 54 * p, f1: 22 * p, sweep: 0.9, a: 0.01, d: 1.4, peak: 0.55 });
      V.burst(t + 0.12, { kind: 'pink', type: 'bandpass', f: 900 * p, f1: 300 * p, sweep: 1.2, Q: 0.8, a: 0.05, d: 1.3, peak: 0.18, dest: [V.out, V.echo] });
    }
    return 4.6;
  },

  shellWhistle(V) {
    const dur = rand(0.95, 1.2);
    whistle(V, V.t, rand(2300, 2700) * V.p, rand(800, 1000) * V.p, dur, 0.22);
    return dur + 0.1;
  },

  flak(V) {
    const { t, p } = V;
    V.burst(t, { kind: 'white', type: 'highpass', f: 2600 * p, a: 0.0005, d: 0.03, peak: 0.55 });
    V.burst(t, { kind: 'pink', type: 'bandpass', f: 900 * p, Q: 1.2, a: 0.001, d: 0.12, peak: 0.8 });
    V.tone(t, { f: 170 * p, f1: 60 * p, sweep: 0.08, a: 0.001, d: 0.14, peak: 0.5 });
    V.burst(t + 0.02, { kind: 'crackle', type: 'bandpass', f: 3000 * p, Q: 0.7, a: 0.005, d: 0.25, peak: 0.3 });
    V.burst(t + 0.01, { kind: 'brown', type: 'lowpass', f: 700 * p, a: 0.01, d: 0.45, peak: 0.25, dest: [V.out, V.wet] });
    return 0.8;
  },

  laser(V) {
    const { t, p } = V;
    const g = V.gain(0, V.out);
    const lp = V.filter('lowpass', 5200 * p, 5, g);
    lp.frequency.setValueAtTime(5200 * p, t);
    lp.frequency.exponentialRampToValueAtTime(900 * p, t + 0.2);
    const o1 = V.osc('sawtooth', 1650 * p, t, 0.3, lp);
    const o2 = V.osc('square', 1658 * p, t, 0.3, V.gain(0.5, lp));
    o1.frequency.exponentialRampToValueAtTime(260 * p, t + 0.17);
    o2.frequency.exponentialRampToValueAtTime(258 * p, t + 0.17);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.22, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    V.tone(t, { f: 3200 * p, f1: 1800 * p, sweep: 0.08, a: 0.001, d: 0.1, peak: 0.1 });
    V.burst(t, { kind: 'white', type: 'highpass', f: 4000, a: 0.0005, d: 0.012, peak: 0.18 });
    return 0.35;
  },

  pulse(V) {
    const { t, p } = V;
    fm(V, t, { fc: 540 * p, fc1: 170 * p, ratio: 2.7, index: 900, index1: 5, sweep: 0.16, d: 0.24, peak: 0.3 });
    V.burst(t, { kind: 'crackle', type: 'bandpass', f: 2600 * p, Q: 0.8, a: 0.001, d: 0.12, peak: 0.35 });
    V.tone(t, { f: 150 * p, f1: 60 * p, sweep: 0.1, a: 0.001, d: 0.12, peak: 0.3 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 5000 * p, Q: 1, a: 0.0005, d: 0.02, peak: 0.25 });
    return 0.4;
  },

  rail(V) {
    const { t, p } = V;
    V.burst(t, { kind: 'white', type: 'highpass', f: 2500 * p, a: 0.0004, d: 0.06, peak: 0.8 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 6500 * p, Q: 0.7, a: 0.0004, d: 0.12, peak: 0.35 });
    V.burst(t + 0.005, { kind: 'white', type: 'bandpass', f: 7000 * p, f1: 650 * p, sweep: 0.5, Q: 1.5, a: 0.002, d: 0.6, peak: 0.45 });
    V.tone(t, { f: 66 * p, f1: 30 * p, sweep: 0.4, a: 0.002, d: 0.45, peak: 0.22 }); // sub kept, but the electric snap leads
    V.burst(t, { kind: 'pink', type: 'bandpass', f: 1400 * p, f1: 420 * p, sweep: 0.8, Q: 0.7, a: 0.002, d: 0.9, peak: 0.5, dest: [V.out, V.echo] });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 4200 * p, Q: 2.5, a: 0.0005, d: 0.09, peak: 0.55 }); // ionised-air zap
    // capacitor-discharge whine with electric flutter
    const wg = V.gain(0, V.out);
    const trem = V.gain(0.6, wg);
    V.lfo(31, 0.4, trem.gain, t, 1.8, 'square');
    const bp = V.filter('bandpass', 2600 * p, 6, trem);
    bp.frequency.setValueAtTime(2600 * p, t);
    bp.frequency.exponentialRampToValueAtTime(900 * p, t + 1.4);
    [1200, 1213].forEach((f) => {
      const o = V.osc('sawtooth', f * p, t, 1.8, bp);
      o.frequency.exponentialRampToValueAtTime(680 * p, t + 1.5);
    });
    envelope2(wg.gain, t, 0.006, 0.34, 1.5);
    V.burst(t + 0.01, { kind: 'crackle', type: 'highpass', f: 3000, a: 0.002, d: 0.5, peak: 0.3 });
    return 2.6;
  },

  torpedoLaunch(V) {
    const { t, p } = V;
    V.tone(t, { f: 135 * p, f1: 50 * p, sweep: 0.12, a: 0.002, d: 0.2, peak: 0.7 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 2300 * p, f1: 700 * p, sweep: 0.45, Q: 1.2, a: 0.01, d: 0.5, peak: 0.35 });
    const ts = t + rand(0.22, 0.3);
    V.burst(ts, { kind: 'pink', type: 'bandpass', f: 700 * p, Q: 0.8, a: 0.004, d: 0.4, peak: 0.4 });
    V.burst(ts, { kind: 'white', type: 'highpass', f: 3000, a: 0.01, d: 0.3, peak: 0.12 });
    bubbles(V, ts + 0.08, 4, 0.5, 400, 900, 0.07);
    return 1.1;
  },

  torpedoRun(V) {
    const { t, p } = V;
    const env = V.gain(0, V.out);
    const am = V.gain(0.5, env);
    V.lfo(rand(14, 19), 0.45, am.gain, t, 1.5);
    const lp = V.filter('lowpass', 600 * p, 1, am);
    V.noise('brown', t, 1.5, 1, lp);
    V.tone(t, { type: 'triangle', f: 112 * p, a: 0.3, hold: 0.5, d: 0.6, peak: 0.07, dest: am });
    V.burst(t, { kind: 'pink', type: 'bandpass', f: 1500 * p, Q: 1, a: 0.3, hold: 0.4, d: 0.6, peak: 0.06 });
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.4, t + 0.3);
    env.gain.setValueAtTime(0.4, t + 0.8);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
    return 1.5;
  },

  missile(V) {
    const { t, p } = V;
    V.burst(t, { kind: 'pink', type: 'bandpass', f: 1200 * p, Q: 1, a: 0.001, d: 0.07, peak: 0.55 });
    V.tone(t, { f: 125 * p, f1: 55 * p, sweep: 0.1, a: 0.002, d: 0.16, peak: 0.4 });
    const r = V.burst(t, { kind: 'white', type: 'bandpass', f: 900 * p, Q: 0.9, a: 0.04, hold: 0.3, d: 1.1, peak: 0.42 });
    r.flt.frequency.exponentialRampToValueAtTime(2600 * p, t + 0.25);
    r.flt.frequency.exponentialRampToValueAtTime(1300 * p, t + 1.4);
    r.src.playbackRate.setValueAtTime(1.1, t);
    r.src.playbackRate.linearRampToValueAtTime(0.75, t + 1.4);
    V.burst(t, { kind: 'brown', type: 'lowpass', f: 320 * p, a: 0.05, d: 1.2, peak: 0.35, dest: [V.out, V.echo] });
    V.burst(t + 0.03, { kind: 'crackle', type: 'highpass', f: 1500, a: 0.02, d: 0.9, peak: 0.16 });
    return 1.8;
  },

  missileRipple(V) {
    const { t, p } = V;
    const n = 8;
    let ti = t;
    for (let i = 0; i < n; i++) {
      V.burst(ti, { kind: 'pink', type: 'bandpass', f: 1400 * p * rand(0.9, 1.1), Q: 1, a: 0.001, d: 0.05, peak: 0.35 });
      V.burst(ti, { kind: 'white', type: 'bandpass', f: 1900 * p * rand(0.9, 1.1), f1: 1100 * p, sweep: 0.5, Q: 0.9, a: 0.02, d: 0.45, peak: 0.2 });
      ti += rand(0.09, 0.14);
    }
    V.burst(t, { kind: 'brown', type: 'lowpass', f: 290 * p, a: 0.1, hold: ti - t, d: 1.0, peak: 0.35, dest: [V.out, V.echo] });
    return ti - t + 1.3;
  },

  hypersonic(V) {
    const { t, p } = V;
    const T = 1.32; // boom lands T seconds after play()
    const sg = V.gain(0, V.out);
    const bp = V.filter('bandpass', 500 * p, 2.5, sg);
    bp.frequency.setValueAtTime(500 * p, t);
    bp.frequency.exponentialRampToValueAtTime(4800 * p, t + T);
    V.noise('white', t, T + 0.05, 1, bp);
    sg.gain.setValueAtTime(0.0001, t);
    sg.gain.exponentialRampToValueAtTime(0.5, t + T - 0.02);
    sg.gain.linearRampToValueAtTime(0, t + T + 0.02);
    const wg = V.gain(0, V.out);
    const o = V.osc('sine', 320 * p, t, T + 0.05, wg);
    o.frequency.exponentialRampToValueAtTime(2600 * p, t + T);
    wg.gain.setValueAtTime(0.0001, t);
    wg.gain.exponentialRampToValueAtTime(0.09, t + T - 0.02);
    wg.gain.linearRampToValueAtTime(0, t + T + 0.02);
    const tb = t + T;
    for (const dt of [0, 0.085]) {
      V.burst(tb + dt, { kind: 'white', type: 'lowpass', f: 3500, a: 0.0004, d: 0.06, peak: 0.85, dest: [V.out, V.echo] });
      V.tone(tb + dt, { f: 58 * p, f1: 24 * p, sweep: 0.5, a: 0.002, d: 0.9, peak: 0.8 });
    }
    V.burst(tb, { kind: 'brown', type: 'lowpass', f: 420 * p, f1: 100 * p, sweep: 2.4, a: 0.02, d: 2.5, peak: 0.5, dest: [V.out, V.wet] });
    return T + 2.7;
  },

  explosion(V) {
    blast(V, V.t, 0.8, V.p);
    return 2.3;
  },

  // Thunder: no transient crack or debris, just a tearing rip and a long rolling
  // low-passed rumble that swells and recedes (clearly not a gun or a blast)
  thunder(V) {
    const { t, p } = V;
    V.burst(t, { kind: 'crackle', type: 'bandpass', f: 1600 * p, f1: 500 * p, sweep: 0.5, Q: 0.6, a: 0.02, d: 0.7, peak: 0.25 });
    V.burst(t + 0.05, { kind: 'brown', type: 'lowpass', f: 380 * p, f1: 120 * p, sweep: 4, a: 0.35, d: 4.5, peak: 0.9, dest: [V.out, V.wet] });
    for (let i = 0; i < 4; i++) V.burst(t + 0.6 + i * rand(0.5, 0.9), { kind: 'brown', type: 'lowpass', f: rand(160, 260) * p, a: rand(0.2, 0.4), d: rand(1.2, 2.2), peak: rand(0.25, 0.45), dest: [V.out, V.wet] });
    return 6.5;
  },

  explosionBig(V) {
    const { t, p } = V;
    blast(V, t, 1.6, p);
    V.tone(t, { f: 90 * p, f1: 34 * p, sweep: 0.4, a: 0.002, d: 0.5, peak: 0.45 });
    V.burst(t + 0.06, { kind: 'brown', type: 'lowpass', f: 900 * p, f1: 240 * p, sweep: 2.5, a: 0.1, d: 2.8, peak: 0.45, dest: [V.out, V.wet] });
    for (let i = 0; i < 3; i++) {
      const tp = t + rand(0.35, 1.3);
      V.burst(tp, { kind: 'pink', type: 'bandpass', f: rand(600, 1100) * p, Q: 1, a: 0.001, d: 0.16, peak: rand(0.15, 0.28) });
    }
    return 5.0;
  },

  splash(V) {
    const { t, p } = V;
    V.burst(t, { kind: 'pink', type: 'bandpass', f: 520 * p, Q: 1, a: 0.003, d: 0.15, peak: 0.5 });
    V.tone(t, { f: 230 * p, f1: 90 * p, sweep: 0.12, a: 0.002, d: 0.15, peak: 0.22 });
    V.burst(t + 0.01, { kind: 'white', type: 'highpass', f: 2500, a: 0.02, d: 0.7, peak: 0.28, type2: 'lowpass', f2: 9000 });
    V.burst(t + 0.02, { kind: 'pink', type: 'lowpass', f: 1300 * p, f1: 400 * p, sweep: 0.9, a: 0.05, d: 0.9, peak: 0.25 });
    for (let i = 0; i < 5; i++) V.blip(t + rand(0.15, 0.8), rand(900, 2800) * p, rand(0.02, 0.05), V.out, 0.025, 1.5);
    return 1.3;
  },

  // player hit confirmation: short bright tick that cuts through the battle
  hitTick(V) {
    const { t, p } = V;
    V.tone(t, { type: 'triangle', f: 2400 * p, f1: 1700 * p, sweep: 0.04, a: 0.001, d: 0.05, peak: 0.25 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 5200 * p, Q: 3, a: 0.0005, d: 0.025, peak: 0.18 });
    return 0.12;
  },
  // sink confirmation: metallic double chime over a low thump
  killConfirm(V) {
    const { t, p } = V;
    V.tone(t, { f: 90 * p, f1: 45 * p, sweep: 0.2, a: 0.002, d: 0.3, peak: 0.5 });
    V.tone(t + 0.01, { type: 'triangle', f: 1320 * p, a: 0.002, d: 0.35, peak: 0.2 });
    V.tone(t + 0.09, { type: 'triangle', f: 1760 * p, a: 0.002, d: 0.5, peak: 0.2 });
    return 0.8;
  },

  hit(V) {
    const { t, p } = V;
    V.clang(t, { f: rand(330, 490) * p, ratios: [1, 2.32, 4.25, 6.63, 9.38], decays: [0.6, 0.45, 0.3, 0.2, 0.12], amps: [1, 0.72, 0.5, 0.32, 0.2], peak: 0.24 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 3500 * p, Q: 1, a: 0.0005, d: 0.025, peak: 0.5 });
    V.tone(t, { f: 150 * p, f1: 80 * p, sweep: 0.05, a: 0.001, d: 0.12, peak: 0.4 });
    return 0.9;
  },

  droneLaunch(V) {
    const { t, p } = V;
    V.burst(t, { kind: 'white', type: 'bandpass', f: 400 * p, f1: 2200 * p, sweep: 0.35, Q: 1.5, a: 0.08, d: 0.4, peak: 0.28 });
    const g = V.gain(0, V.out);
    const lp = V.filter('lowpass', 1800 * p, 3, g);
    const o = V.osc('sawtooth', 220 * p, t, 0.7, lp);
    o.frequency.exponentialRampToValueAtTime(880 * p, t + 0.4);
    envelope2(g.gain, t, 0.03, 0.09, 0.45, 0.15);
    V.burst(t, { kind: 'white', type: 'highpass', f: 5000, a: 0.0005, d: 0.012, peak: 0.2 });
    return 0.8;
  },

  dronePop(V) {
    const { t, p } = V;
    V.burst(t, { kind: 'white', type: 'bandpass', f: 1800 * p, Q: 1.4, a: 0.0005, d: 0.06, peak: 0.6 });
    V.tone(t, { f: 240 * p, f1: 90 * p, sweep: 0.05, a: 0.001, d: 0.1, peak: 0.35 });
    V.burst(t + 0.005, { kind: 'crackle', type: 'highpass', f: 2500, a: 0.002, d: 0.15, peak: 0.25 });
    return 0.35;
  },

  emp(V) {
    const { t, p } = V;
    V.burst(t, { kind: 'crackle', type: 'highpass', f: 1500, a: 0.002, d: 0.6, peak: 0.55 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 3000 * p, Q: 1, a: 0.001, d: 0.15, peak: 0.45 });
    fm(V, t, { fc: 900 * p, fc1: 300 * p, ratio: 2.66, index: 1500, index1: 10, sweep: 0.3, d: 0.4, peak: 0.26 });
    const g = V.gain(0, V.out);
    const lp = V.filter('lowpass', 3000 * p, 5, g);
    lp.frequency.setValueAtTime(3000 * p, t);
    lp.frequency.exponentialRampToValueAtTime(200 * p, t + 1.3);
    const o = V.osc('sawtooth', 2200 * p, t, 1.5, lp);
    o.frequency.exponentialRampToValueAtTime(35 * p, t + 1.3);
    envelope2(g.gain, t, 0.005, 0.22, 1.4);
    V.tone(t, { f: 80 * p, f1: 28 * p, sweep: 0.5, a: 0.003, d: 0.8, peak: 0.7 });
    V.tone(t + 0.05, { f: 700 * p, f1: 40 * p, sweep: 1.1, a: 0.01, d: 1.1, peak: 0.12, dest: [V.out, V.wet] });
    return 2.0;
  },

  shield(V) {
    const { t, p } = V;
    [293.7, 440, 659.3].forEach((f, i) => {
      V.tone(t + i * 0.04, { type: 'triangle', f: f * 0.5 * p, f1: f * p, sweep: 0.5, a: 0.25, hold: 0.3, d: 0.7, peak: 0.075 });
    });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 2000 * p, f1: 6000 * p, sweep: 0.8, Q: 3, a: 0.2, d: 0.7, peak: 0.12 });
    const he = V.gain(0, V.out);
    const ham = V.gain(0.75, he);
    V.lfo(8, 0.25, ham.gain, t, 1.3);
    V.osc('sine', 110 * p, t, 1.3, ham);
    envelope2(he.gain, t, 0.1, 0.14, 0.8, 0.3);
    [1174.7, 1568, 1760, 2349.3].forEach((f, i) => V.tone(t + 0.3 + i * 0.07, { f: f * p, a: 0.002, d: 0.4, peak: 0.045, dest: [V.out, V.wet] }));
    return 1.5;
  },

  shieldHit(V) {
    const { t, p } = V;
    const be = V.gain(0, V.out);
    const bam = V.gain(0.4, be);
    V.lfo(47, 0.6, bam.gain, t, 0.42);
    const bo = V.osc('sine', 240 * p, t, 0.42, bam);
    bo.frequency.exponentialRampToValueAtTime(180 * p, t + 0.3);
    envelope2(be.gain, t, 0.001, 0.32, 0.35);
    V.tone(t, { f: 1400 * p, a: 0.001, d: 0.4, peak: 0.07, dest: [V.out, V.wet] });
    V.tone(t, { f: 2100 * p, a: 0.001, d: 0.3, peak: 0.045 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 2500 * p, Q: 1.2, a: 0.0005, d: 0.06, peak: 0.35 });
    return 0.6;
  },

  heal(V) {
    const { t, p } = V;
    [0, 0.16, 0.34].forEach((dt) => {
      V.clang(t + dt, { f: rand(900, 1300) * p, ratios: [1, 2.7, 5.1], decays: [0.15, 0.1, 0.06], peak: 0.1 });
      V.burst(t + dt, { kind: 'white', type: 'bandpass', f: 2500, Q: 1.5, a: 0.0005, d: 0.02, peak: 0.2 });
    });
    [587.3, 659.3, 880, 1174.7].forEach((f, i) => {
      const ti = t + 0.1 + i * 0.1;
      V.tone(ti, { f: f * p, a: 0.002, d: 1.0, peak: 0.065, dest: [V.out, V.wet] });
      V.tone(ti, { f: f * 2.76 * p, a: 0.002, d: 0.3, peak: 0.02 });
    });
    V.burst(t + 0.1, { kind: 'white', type: 'bandpass', f: 6000, Q: 2, a: 0.3, d: 0.8, peak: 0.04 });
    return 1.8;
  },

  ram(V) {
    const { t, p } = V;
    V.tone(t, { f: 85 * p, f1: 32 * p, sweep: 0.3, a: 0.002, d: 0.5, peak: 1.0 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 1500 * p, Q: 0.8, a: 0.0005, d: 0.08, peak: 0.55 });
    V.burst(t + 0.01, { kind: 'crackle', type: 'lowpass', f: 2500, a: 0.005, d: 0.7, peak: 0.55 });
    V.burst(t + 0.03, { kind: 'crackle', type: 'bandpass', f: 600, Q: 1, a: 0.005, d: 0.5, peak: 0.45 });
    V.clang(t, { f: 170 * p, ratios: [1, 2.4, 3.9, 5.6], decays: [0.9, 0.6, 0.4, 0.3], peak: 0.13 });
    const g = V.gain(0, V.out);
    const lp = V.filter('lowpass', 500, 4, g);
    const o = V.osc('sawtooth', 95 * p, t + 0.05, 1.4, lp);
    o.frequency.exponentialRampToValueAtTime(55 * p, t + 1.3);
    envelope2(g.gain, t + 0.05, 0.1, 0.12, 1.1);
    return 1.8;
  },

  smoke(V) {
    const { t, p } = V;
    V.burst(t, { kind: 'white', type: 'bandpass', f: 1200 * p, Q: 1.5, a: 0.0005, d: 0.04, peak: 0.3 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 3200 * p, f1: 1600 * p, sweep: 1.5, Q: 0.7, a: 0.15, hold: 0.6, d: 1.2, peak: 0.25 });
    V.burst(t, { kind: 'pink', type: 'lowpass', f: 600 * p, a: 0.02, d: 0.5, peak: 0.3 });
    return 2.2;
  },

  mineDrop(V) {
    const { t, p } = V;
    V.clang(t, { f: 520 * p, ratios: [1, 2.9, 5.2], decays: [0.2, 0.12, 0.08], peak: 0.12 });
    V.tone(t, { f: 180 * p, f1: 90 * p, sweep: 0.08, a: 0.001, d: 0.1, peak: 0.35 });
    const ts = t + rand(0.18, 0.24);
    V.burst(ts, { kind: 'pink', type: 'bandpass', f: 600 * p, Q: 1, a: 0.003, d: 0.15, peak: 0.3 });
    V.tone(ts, { f: 350 * p, f1: 140 * p, sweep: 0.08, a: 0.002, d: 0.1, peak: 0.25 });
    bubbles(V, ts + 0.05, 3, 0.4, 500, 1100, 0.06);
    return 0.9;
  },

  bombWhistle(V) {
    const dur = rand(1.3, 1.5);
    whistle(V, V.t, rand(1800, 2000) * V.p, rand(450, 520) * V.p, dur, 0.22);
    return dur + 0.1;
  },

  engineBoost(V) {
    const { t, p } = V;
    if (V.o.variant === 'steam') {
      [440, 554.4, 659.3].forEach((f) => {
        const { o } = V.tone(t, { f: f * 0.97 * p, f1: f * p, sweep: 0.12, a: 0.08, hold: 0.7, d: 0.4, peak: 0.075 });
        V.lfo(5.5, f * 0.003, o.frequency, t, 1.3);
        V.burst(t, { kind: 'white', type: 'bandpass', f: f * 2 * p, Q: 8, a: 0.08, hold: 0.7, d: 0.4, peak: 0.07 });
      });
      V.burst(t, { kind: 'white', type: 'highpass', f: 3000, a: 0.02, d: 1.2, peak: 0.15 });
      return 1.4;
    }
    const g = V.gain(0, V.out);
    const lp = V.filter('lowpass', 400, 2, g);
    lp.frequency.setValueAtTime(400, t);
    lp.frequency.exponentialRampToValueAtTime(3000 * p, t + 0.9);
    const o = V.osc('sawtooth', 180 * p, t, 1.6, lp);
    o.frequency.exponentialRampToValueAtTime(900 * p, t + 0.9);
    envelope2(g.gain, t, 0.3, 0.12, 0.9, 0.3);
    V.tone(t, { f: 2000 * p, f1: 4200 * p, sweep: 0.9, a: 0.3, hold: 0.3, d: 0.8, peak: 0.04 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 600 * p, f1: 1800 * p, sweep: 0.9, Q: 1, a: 0.2, hold: 0.3, d: 1.0, peak: 0.2 });
    V.tone(t, { f: 70 * p, f1: 110 * p, sweep: 0.9, a: 0.25, hold: 0.3, d: 0.7, peak: 0.2 });
    return 1.7;
  },

  levelUp(V) {
    const { t, p } = V;
    [587.3, 659.3, 784, 880, 1174.7].forEach((f, i) => {
      const ti = t + i * 0.07;
      V.tone(ti, { f: f * p, a: 0.002, d: 0.8, peak: 0.08, dest: [V.out, V.wet] });
      V.tone(ti, { f: f * 2 * p, a: 0.002, d: 0.4, peak: 0.025 });
      V.tone(ti, { f: f * 3.01 * p, a: 0.002, d: 0.15, peak: 0.01 });
    });
    V.tone(t, { type: 'triangle', f: 587.3 * p, a: 0.15, d: 0.9, peak: 0.035 });
    V.tone(t, { type: 'triangle', f: 880 * p, a: 0.15, d: 0.9, peak: 0.03 });
    V.burst(t, { kind: 'white', type: 'bandpass', f: 7000, Q: 2, a: 0.2, d: 0.6, peak: 0.03 });
    return 1.4;
  },

  gold(V) {
    const { t, p } = V;
    V.tone(t, { f: 1975.5 * p, a: 0.001, d: 0.25, peak: 0.11 });
    V.tone(t, { f: 1975.5 * 3.1 * p, a: 0.001, d: 0.08, peak: 0.03 });
    V.tone(t + 0.07, { f: 2637 * p, a: 0.001, d: 0.4, peak: 0.11, dest: [V.out, V.wet] });
    V.tone(t + 0.07, { f: 2637 * 2.9 * p, a: 0.001, d: 0.1, peak: 0.025 });
    V.burst(t, { kind: 'white', type: 'highpass', f: 6000, a: 0.0005, d: 0.006, peak: 0.1 });
    return 0.6;
  },

  uiClick(V) {
    const { t, p } = V;
    V.tone(t, { f: 1700 * p, f1: 1200 * p, sweep: 0.02, a: 0.0008, d: 0.035, peak: 0.14 });
    V.burst(t, { kind: 'white', type: 'highpass', f: 4000, a: 0.0005, d: 0.008, peak: 0.08 });
    return 0.08;
  },

  uiHover(V) {
    V.tone(V.t, { f: 1250 * V.p, a: 0.002, d: 0.025, peak: 0.05 });
    return 0.05;
  },

  uiError(V) {
    const { t, p } = V;
    const lp = V.filter('lowpass', 1200, 0.7, V.out);
    V.tone(t, { type: 'square', f: 220 * p, a: 0.003, hold: 0.05, d: 0.06, peak: 0.07, dest: lp });
    V.tone(t + 0.11, { type: 'square', f: 175 * p, a: 0.003, hold: 0.07, d: 0.08, peak: 0.07, dest: lp });
    return 0.32;
  },

  capture(V) {
    const { t, p } = V;
    const g = V.gain(0, [V.out, V.echo]);
    const lp = V.filter('lowpass', 250, 1.2, g);
    lp.frequency.setValueAtTime(250, t);
    lp.frequency.exponentialRampToValueAtTime(1500, t + 0.3);
    lp.frequency.exponentialRampToValueAtTime(900, t + 1.2);
    [110, 164.8, 220].forEach((f, i) => {
      for (const dc of [-6, 6]) {
        const o = V.osc('sawtooth', f * p * 0.98, t, 2.0, V.gain(i === 2 ? 0.5 : 1, lp));
        o.detune.value = dc;
        o.frequency.exponentialRampToValueAtTime(f * p, t + 0.12);
        V.lfo(5, f * 0.002, o.frequency, t, 2.0);
      }
    });
    envelope2(g.gain, t, 0.12, 0.09, 0.6, 0.9);
    V.clang(t + 0.05, { f: 587.3 * p, ratios: [1, 2.01, 2.76, 4.07], decays: [1.4, 1, 0.6, 0.4], peak: 0.05, dest: [V.out, V.wet] });
    return 2.2;
  },

  death(V) {
    const { t, p } = V;
    blast(V, t, 1.0, p);
    const g = V.gain(0, V.out);
    const lp = V.filter('lowpass', 700, 0.7, g);
    const bp = V.filter('bandpass', 300, 3, lp);
    const o = V.osc('sawtooth', 72 * p, t + 0.3, 3.2, bp);
    o.frequency.exponentialRampToValueAtTime(44 * p, t + 3.0);
    V.lfo(0.7, 5, o.frequency, t + 0.3, 3.2);
    envelope2(g.gain, t + 0.3, 0.3, 0.2, 1.6, 1.0);
    for (let i = 0; i < 3; i++) {
      const tc = t + rand(0.8, 2.2);
      const cg = V.gain(0, V.out);
      const cb = V.filter('bandpass', rand(700, 1000), 8, cg);
      const co = V.osc('sawtooth', rand(140, 220) * p, tc, 0.35, cb);
      V.lfo(rand(25, 40), 20, co.frequency, tc, 0.35, 'square');
      envelope2(cg.gain, tc, 0.04, 0.07, 0.25);
    }
    const gg = V.gain(0, V.out);
    const am = V.gain(0.5, gg);
    V.lfo(7, 0.45, am.gain, t + 0.8, 3.0);
    V.noise('brown', t + 0.8, 3.0, 1, V.filter('lowpass', 400, 1, am));
    envelope2(gg.gain, t + 0.8, 0.5, 0.25, 1.5, 1.0);
    bubbles(V, t + 1.0, 8, 2.5, 250, 700, 0.06);
    return 4.2;
  },

  // Leviathan roar: throat growl through sweeping vocal formants, breath, sub.
  roar(V) {
    const { t, p } = V;
    const dur = 2.6;
    const out = V.gain(0, V.out);
    envelope2(out.gain, t, 0.35, 1.0, 1.4, 0.9);
    const vox = V.gain(1, out);
    // formants sweep "aah" -> "ooh" as the jaw closes
    const f1 = V.filter('bandpass', 720, 5, vox), f2 = V.filter('bandpass', 1150, 6, vox), f3 = V.filter('bandpass', 2600, 8, V.gain(0.35, vox));
    for (const [f, a] of [[f1, 380], [f2, 760], [f3, 2200]]) f.frequency.exponentialRampToValueAtTime(a, t + dur);
    for (const [det, lvl] of [[1, 0.6], [1.007, 0.45], [0.5, 0.5]]) {
      const o = V.osc('sawtooth', 58 * p * det, t, dur + 0.2, V.gain(lvl, f1));
      o.connect(f2); o.connect(f3);
      o.frequency.linearRampToValueAtTime(74 * p * det, t + 0.5);
      o.frequency.exponentialRampToValueAtTime(40 * p * det, t + dur);
      V.lfo(27, 9 * p, o.frequency, t, dur, 'triangle'); // guttural flutter
    }
    V.noise('pink', t, dur, 0.8, V.filter('bandpass', 900, 1.2, V.gain(0.35, out))); // breath
    V.tone(t, { f: 42 * p, f1: 28 * p, sweep: dur, a: 0.3, d: dur, peak: 0.8 }); // sub
    V.burst(t + 0.1, { kind: 'white', type: 'highpass', f: 2500, a: 0.2, d: 1.8, peak: 0.18, dest: [V.out, V.wet] }); // spray
    return dur + 1.5;
  },

  towerDown(V) {
    const { t, p } = V;
    V.tone(t, { f: 60 * p, f1: 24 * p, sweep: 0.8, a: 0.003, d: 1.2, peak: 1.0 });
    V.burst(t, { kind: 'pink', type: 'lowpass', f: 2500 * p, f1: 200 * p, sweep: 1, a: 0.002, d: 1.3, peak: 0.8, dest: [V.out, V.echo] });
    V.burst(t, { kind: 'white', type: 'highpass', f: 1500, a: 0.0006, d: 0.05, peak: 0.45 });
    for (let i = 0; i < 5; i++) {
      const ti = t + 0.3 + i * rand(0.22, 0.34);
      V.burst(ti, { kind: 'crackle', type: 'lowpass', f: 1800, a: 0.005, d: 0.4, peak: 0.35 });
      V.tone(ti, { f: rand(80, 100) * p, f1: 40 * p, sweep: 0.2, a: 0.002, d: 0.25, peak: 0.4 });
    }
    V.burst(t + 0.1, { kind: 'brown', type: 'lowpass', f: 300 * p, a: 0.2, hold: 1.0, d: 2.0, peak: 0.45, dest: [V.out, V.wet] });
    V.clang(t + 0.5, { f: rand(200, 280) * p, ratios: [1, 2.4, 3.9], decays: [1.0, 0.7, 0.4], peak: 0.1 });
    V.clang(t + 1.1, { f: rand(160, 230) * p, ratios: [1, 2.6, 4.3], decays: [0.9, 0.6, 0.4], peak: 0.08 });
    return 4.2;
  },

  sailFlap(V) {
    const { t, p } = V;
    let ti = t;
    for (let i = 0; i < 3; i++) {
      V.burst(ti, { kind: 'pink', type: 'bandpass', f: rand(500, 800) * p, Q: 0.9, a: 0.005, d: 0.08, peak: 0.35 * (1 - i * 0.2) });
      V.burst(ti, { kind: 'brown', type: 'lowpass', f: 300 * p, a: 0.004, d: 0.1, peak: 0.25 * (1 - i * 0.2) });
      ti += rand(0.1, 0.15);
    }
    return 0.6;
  },
};

// attack / hold / exponential release helper for gain params
function envelope2(param, t, a, peak, d, hold = 0) {
  param.setValueAtTime(0, t);
  param.linearRampToValueAtTime(peak, t + a);
  if (hold) param.setValueAtTime(peak, t + a + hold);
  param.exponentialRampToValueAtTime(0.0001, t + a + hold + d);
  param.setValueAtTime(0, t + a + hold + d + 0.005);
}

export const SOUND_NAMES = Object.keys(RECIPES);
