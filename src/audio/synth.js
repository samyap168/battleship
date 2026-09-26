// Low-level synthesis toolkit shared by the SFX recipes, the adaptive score and
// the stingers. Everything here works on any BaseAudioContext (realtime or
// OfflineAudioContext) so every sound can be rendered and measured offline.

export const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
export const rand = (a = 0, b = 1) => a + Math.random() * (b - a);
export const pick = (arr) => arr[(Math.random() * arr.length) | 0];
export const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function connect(node, dest) {
  if (!dest) return node;
  if (Array.isArray(dest)) { for (const d of dest) if (d) node.connect(d); }
  else node.connect(dest);
  return node;
}

// Linear attack, optional hold, exponential decay to silence.
export function envelope(param, t, a, peak, d, hold = 0) {
  const p = Math.max(peak, 0.00011);
  a = Math.max(a, 0.0005);
  param.setValueAtTime(0, t);
  param.linearRampToValueAtTime(p, t + a);
  if (hold > 0) param.setValueAtTime(p, t + a + hold);
  param.exponentialRampToValueAtTime(0.0001, t + a + hold + d);
  param.setValueAtTime(0, t + a + hold + d + 0.005);
}

// ---------------------------------------------------------------------------
// Shared, pre-generated resources (one set per context, cached).

const cache = new WeakMap();

export function getResources(ctx) {
  let r = cache.get(ctx);
  if (r) return r;
  r = {
    white: makeNoise(ctx, 2.0, 'white'),
    pink: makeNoise(ctx, 2.0, 'pink'),
    brown: makeNoise(ctx, 2.5, 'brown'),
    crackle: makeCrackle(ctx, 2.0),
    irSea: makeIR(ctx, 2.6, { predelay: 0.018, bright: 0.55, dark: 0.07, early: [0.021, 0.034, 0.047, 0.066, 0.089] }),
    irHall: makeIR(ctx, 3.9, { predelay: 0.028, bright: 0.45, dark: 0.05, early: [0.031, 0.052, 0.074, 0.101, 0.133] }),
    ks: new Map(),
  };
  cache.set(ctx, r);
  return r;
}

function seamless(data, n, fade) {
  // data has n + fade samples; crossfade the overshoot into the head so the loop is click-free
  for (let i = 0; i < fade; i++) {
    const w = i / fade;
    data[i] = data[i] * w + data[n + i] * (1 - w);
  }
}

function normalize(d, target = 0.95) {
  let pk = 0;
  for (let i = 0; i < d.length; i++) { const a = Math.abs(d[i]); if (a > pk) pk = a; }
  if (pk > 0) { const k = target / pk; for (let i = 0; i < d.length; i++) d[i] *= k; }
}

function makeNoise(ctx, sec, kind) {
  const sr = ctx.sampleRate;
  const n = Math.floor(sr * sec), fade = 2048;
  const tmp = new Float32Array(n + fade);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
  for (let i = 0; i < n + fade; i++) {
    const w = Math.random() * 2 - 1;
    if (kind === 'white') tmp[i] = w;
    else if (kind === 'pink') {
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852; b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898;
      tmp[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    } else {
      last = (last + 0.02 * w) / 1.02;
      tmp[i] = last * 3.5;
    }
  }
  if (kind === 'brown') { // remove DC drift
    let m = 0; for (let i = 0; i < tmp.length; i++) m += tmp[i]; m /= tmp.length;
    for (let i = 0; i < tmp.length; i++) tmp[i] -= m;
  }
  seamless(tmp, n, fade);
  const buf = ctx.createBuffer(1, n, sr);
  const d = buf.getChannelData(0);
  d.set(tmp.subarray(0, n));
  normalize(d);
  return buf;
}

// Sparse crackle: random decaying micro-bursts (debris, fire, electric arcs).
function makeCrackle(ctx, sec) {
  const sr = ctx.sampleRate;
  const n = Math.floor(sr * sec);
  const buf = ctx.createBuffer(1, n, sr);
  const d = buf.getChannelData(0);
  const density = 900 / sr; // events per sample
  for (let i = 0; i < n; i++) {
    if (Math.random() < density) {
      const amp = (0.25 + 0.75 * Math.pow(Math.random(), 3)) * (Math.random() < 0.5 ? -1 : 1);
      const len = 8 + ((Math.random() * 70) | 0);
      const tau = len / 3;
      for (let k = 0; k < len; k++) {
        const idx = (i + k) % n;
        d[idx] += amp * Math.exp(-k / tau) * (Math.random() * 2 - 1);
      }
    }
  }
  normalize(d);
  return buf;
}

// Generated stereo impulse response: pre-delay, early reflections, then an
// exponentially decaying diffuse tail that darkens over time.
function makeIR(ctx, dur, { predelay = 0.02, bright = 0.5, dark = 0.06, early = [] } = {}) {
  const sr = ctx.sampleRate;
  const n = Math.floor(sr * dur);
  const buf = ctx.createBuffer(2, n, sr);
  const pd = Math.floor(predelay * sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let lp = 0;
    for (let i = pd; i < n; i++) {
      const t = (i - pd) / sr;
      const env = Math.exp((-6.9 * t) / dur);
      const a = dark + (bright - dark) * Math.exp(-t / (dur * 0.25));
      lp += a * ((Math.random() * 2 - 1) - lp);
      const fadeIn = Math.min(1, t / 0.012);
      d[i] = lp * env * fadeIn * (0.8 + 0.4 * a);
    }
    early.forEach((et, k) => {
      const idx = Math.floor((et + predelay * 0.5 + ch * 0.0037 * (k + 1)) * sr);
      if (idx < n) d[idx] += (0.6 - k * 0.09) * (Math.random() < 0.5 ? -1 : 1);
    });
  }
  return buf;
}

// Karplus-Strong plucked string (guzheng / koto flavour), cached per midi note.
// Rendered at 32 kHz to keep memory modest; the engine resamples on playback.
export function ksBuffer(ctx, res, midi) {
  const key = Math.round(midi * 4) / 4;
  let b = res.ks.get(key);
  if (b) return b;
  const sr = 32000;
  const f = mtof(key);
  const dur = clamp(3.2 - (key - 50) * 0.045, 1.4, 3.4);
  const n = Math.floor(sr * dur);
  b = ctx.createBuffer(1, n, sr);
  const out = b.getChannelData(0);
  const S = 0.5; // two-point average loss filter
  const P = sr / f - S; // required loop delay
  let L = Math.floor(P - 0.15);
  const frac = P - L;
  const C = (1 - frac) / (1 + frac);
  const ring = new Float32Array(L);
  // excitation: brightness-shaped noise with pick-position comb (plucked near the bridge)
  let lp = 0;
  const bright = clamp(0.75 - (key - 60) * 0.01, 0.35, 0.85);
  for (let i = 0; i < L; i++) { lp += bright * ((Math.random() * 2 - 1) - lp); ring[i] = lp; }
  const pp = Math.max(1, Math.floor(L * 0.14));
  const tmp = Float32Array.from(ring);
  for (let i = 0; i < L; i++) ring[i] = tmp[i] - 0.8 * tmp[(i + pp) % L];
  let mean = 0; for (let i = 0; i < L; i++) mean += ring[i]; mean /= L;
  for (let i = 0; i < L; i++) ring[i] -= mean;
  const t60 = clamp(4.2 - (key - 50) * 0.07, 0.9, 4.5);
  const rho = Math.pow(10, -3 / (t60 * f));
  let ptr = 0, prev = 0, apx = 0, apy = 0;
  for (let i = 0; i < n; i++) {
    const cur = ring[ptr];
    const lo = rho * ((1 - S) * cur + S * prev);
    prev = cur;
    const ap = C * lo + apx - C * apy;
    apx = lo; apy = ap;
    ring[ptr] = ap;
    ptr = ptr + 1 === L ? 0 : ptr + 1;
    out[i] = cur;
  }
  // fade tail, normalise
  const fl = Math.floor(sr * 0.25);
  for (let i = 0; i < fl; i++) out[n - 1 - i] *= i / fl;
  normalize(out, 0.9);
  res.ks.set(key, b);
  return b;
}

// ---------------------------------------------------------------------------
// Kit: node factory + layered building blocks. When `track` is true every
// source node is remembered so a voice can be stopped early (voice stealing).
// Layer helpers (tone/burst/clang/blip) default their destination to `kit.out`.

export class Kit {
  constructor(ctx, res, track = false) {
    this.ctx = ctx;
    this.res = res;
    this.srcs = track ? [] : null;
  }
  _reg(s) { if (this.srcs) this.srcs.push(s); return s; }

  gain(v = 1, dest) {
    const g = this.ctx.createGain();
    g.gain.value = v;
    return connect(g, dest);
  }
  filter(type, f, Q = 0.707, dest) {
    const b = this.ctx.createBiquadFilter();
    b.type = type;
    b.frequency.value = f;
    b.Q.value = Q;
    return connect(b, dest);
  }
  pan(v, dest) {
    if (this.ctx.createStereoPanner) {
      const p = this.ctx.createStereoPanner();
      p.pan.value = clamp(v, -1, 1);
      return connect(p, dest);
    }
    return this.gain(1, dest);
  }
  osc(type, f, t, dur, dest) {
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    connect(o, dest);
    o.start(t);
    o.stop(t + dur);
    return this._reg(o);
  }
  noise(kind, t, dur, rate = 1, dest) {
    const s = this.ctx.createBufferSource();
    const b = this.res[kind];
    s.buffer = b;
    s.loop = true;
    s.playbackRate.value = rate;
    connect(s, dest);
    s.start(t, Math.random() * b.duration * 0.9);
    s.stop(t + dur);
    return this._reg(s);
  }
  buffer(buf, t, rate = 1, dest) {
    const s = this.ctx.createBufferSource();
    s.buffer = buf;
    s.playbackRate.setValueAtTime(rate, t);
    connect(s, dest);
    s.start(t);
    s.stop(t + buf.duration / Math.max(0.25, rate) + 0.05);
    return this._reg(s);
  }
  lfo(f, depth, param, t, dur, type = 'sine') {
    const g = this.gain(depth, param);
    const o = this.osc(type, f, t, dur, g);
    return { o, g };
  }

  // Oscillator with exponential pitch sweep and AR envelope.
  tone(t, { type = 'sine', f = 440, f1, sweep, a = 0.002, hold = 0, d = 0.3, peak = 0.5, dest, detune = 0 }) {
    const g = this.gain(0, dest || this.out);
    const o = this.osc(type, f, t, a + hold + d + 0.03, g);
    if (detune) o.detune.value = detune;
    if (f1 && f1 !== f) o.frequency.exponentialRampToValueAtTime(f1, t + (sweep ?? a + hold + d));
    envelope(g.gain, t, a, peak, d, hold);
    return { o, g };
  }

  // Filtered noise burst with optional filter sweep and a second filter stage.
  burst(t, { kind = 'white', rate = 1, type = 'lowpass', f = 1000, f1, sweep, Q = 0.707, a = 0.002, hold = 0, d = 0.3, peak = 0.5, dest, type2, f2 = 1000, Q2 = 0.707 }) {
    const g = this.gain(0, dest || this.out);
    let head = g;
    if (type2) head = this.filter(type2, f2, Q2, head);
    const flt = this.filter(type, f, Q, head);
    flt.frequency.setValueAtTime(f, t);
    if (f1 && f1 !== f) flt.frequency.exponentialRampToValueAtTime(f1, t + (sweep ?? a + hold + d));
    const src = this.noise(kind, t, a + hold + d + 0.03, rate, flt);
    envelope(g.gain, t, a, peak, d, hold);
    return { src, flt, g };
  }

  // Inharmonic metallic partials (clangs, bells, gongs-lite).
  clang(t, { f, ratios, decays, amps, peak = 0.2, dest, a = 0.001, type = 'sine' }) {
    for (let i = 0; i < ratios.length; i++) {
      this.tone(t, { type, f: f * ratios[i] * rand(0.995, 1.005), a, d: decays[i % decays.length], peak: peak * (amps ? amps[i] : 1 / (1 + i)), dest });
    }
  }

  // Tiny rising sine chirp (bubbles, droplets).
  blip(t, f, peak, dest, d = 0.04, rise = 1.8) {
    this.tone(t, { f, f1: f * rise, sweep: d, a: 0.002, d, peak, dest });
  }
}
