// Procedural adaptive score: D dorian / D-shang pentatonic, 90 BPM, chord
// change every 2 bars, 8-bar sections. Layers: deep drone, pad, guzheng
// ostinato (Karplus-Strong), low string/brass swell, taiko war drums, and an
// occasional dizi / erhu / horn-call lead. Intensity (0..1) drives density,
// brightness and which layers play. Lookahead scheduler: setTimeout ticks
// schedule 16th-note steps against AudioContext time; the same code renders
// offline via scheduleUntil().
import { Kit, rand, pick, clamp, smoothstep, ksBuffer } from './synth.js';
import * as Ins from './instruments.js';

export const BPM = 90;
export const BEAT = 60 / BPM;
const STEP = BEAT / 4;
const CHORD_STEPS = 32; // 2 bars

// D shang pentatonic (D E G A C) across the useful range
export const SCALE = [];
for (let m = 38; m <= 98; m++) if ([0, 2, 4, 7, 9].includes(m % 12)) SCALE.push(m);

const CH = {
  Dm:   { pad: [50, 57, 62, 65], root: 38, anchor: 62, swell: [38, 50, 57] },
  Dsus: { pad: [50, 57, 64, 69], root: 38, anchor: 62, swell: [38, 50, 57] },
  C:    { pad: [48, 55, 64, 67], root: 36, anchor: 60, swell: [36, 48, 55] },
  Cadd: { pad: [48, 55, 62, 64], root: 36, anchor: 60, swell: [36, 48, 55] },
  G:    { pad: [55, 59, 62, 67], root: 43, anchor: 67, swell: [43, 55, 62] },
  Gsus: { pad: [55, 62, 67, 69], root: 43, anchor: 67, swell: [43, 55, 62] },
  F:    { pad: [53, 57, 60, 64], root: 41, anchor: 60, swell: [41, 53, 60] },
  Am:   { pad: [57, 60, 64, 67], root: 45, anchor: 64, swell: [45, 57, 64] },
  Asus: { pad: [57, 62, 64, 69], root: 45, anchor: 64, swell: [45, 57, 64] },
  Em:   { pad: [52, 59, 62, 67], root: 40, anchor: 64, swell: [40, 52, 59] },
  Bb:   { pad: [58, 62, 65, 69], root: 46, anchor: 62, swell: [46, 58, 65] },
};

const CALM = [
  ['Dm', 'C', 'Gsus', 'Dm'], ['Dsus', 'F', 'C', 'Dm'], ['Dm', 'Am', 'C', 'Dsus'], ['F', 'C', 'Dm', 'Asus'],
  ['Dm', 'Em', 'F', 'C'], ['Dsus', 'Cadd', 'Gsus', 'Asus'], ['Am', 'F', 'C', 'Dm'], ['Dm', 'G', 'Dm', 'Cadd'],
];
const WAR = [
  ['Dm', 'Bb', 'C', 'Dm'], ['Dm', 'C', 'Bb', 'Asus'], ['Dm', 'F', 'G', 'Asus'], ['Dm', 'Dm', 'Bb', 'C'],
  ['Am', 'Bb', 'C', 'Dm'], ['Dm', 'C', 'F', 'G'], ['Bb', 'C', 'Dm', 'Dm'],
];

// Ostinato: scale-degree offsets from the chord anchor, 16 eighth notes (2 bars)
const PATS = [
  [0, 2, 4, 2, 5, 4, 2, 1, 0, 2, 4, 5, 7, 5, 4, 2],
  [0, 4, 3, 4, 2, 4, 1, 4, 0, 4, 3, 4, 5, 4, 2, 4],
  [0, 1, 2, 4, 5, 4, 2, 1, 0, 1, 2, 4, 2, 1, 0, -1],
  [4, 2, 0, 2, 3, 2, 0, -1, 0, 2, 3, 4, 5, 3, 2, 0],
  [0, null, 4, 2, null, 5, 4, null, 0, null, 4, 2, 5, 7, 5, 4],
  [0, 2, 0, 4, 0, 5, 0, 4, 0, 2, 0, 4, 3, 2, 1, 2],
  [5, 4, 2, 4, 0, 2, 1, 2, 5, 4, 2, 4, 7, 5, 4, 2],
];

// Taiko patterns per intensity level [bar A, bar B]. X big, x mid, o soft big, . rest
const DRUMS = [
  ['................', '................'],
  ['X...............', 'X.........o.....'],
  ['X.....x.X...x...', 'X.....x.X..xX.x.'],
  ['X..x..x.X.x.X..x', 'X..x..x.X.xxX.xx'],
  ['X.xX.xX.XxX.X.xX', 'X.xX.xX.XxXxXxxx'],
];
const RIMS = ['................', '................', '....r.......r...', '..r...r...r...rr', 'rrRrrrRrrrRrrrRr'];
const FILL = '........x.x.xxXX';

const CALLS = [
  [[57, 1.5], [62, 0.5], [64, 2]],
  [[62, 1], [64, 0.5], [67, 0.5], [69, 2.5]],
  [[69, 1.5], [67, 0.5], [64, 1], [62, 2]],
  [[50, 1], [57, 1], [62, 2.5]],
  [[62, 0.5], [67, 0.5], [69, 3]],
];

export class Music {
  constructor(eng) {
    this.eng = eng;
    this.ctx = eng.ctx;
    this.k = new Kit(eng.ctx, eng.res);
    this.running = false;
    this.target = 0;
    this.I = 0;
    this.stopAt = Infinity;
    this.L = null;
    this.timer = null;
    this.lastProg = -1;
    this.lastPat = -1;
    this.lastOnset = -99;
    this.combat = false;
  }

  _build() {
    const k = this.k, dry = this.eng.musicIn, wet = this.eng.hallIn;
    const layer = (lvl, send) => {
      const g = k.gain(lvl, dry);
      g.connect(k.gain(send, wet));
      return g;
    };
    const L = {
      drone: layer(0.12, 0.15),
      pad: layer(2.0, 0.35),
      pluck: layer(2.0, 0.4),
      swell: layer(1.5, 0.35),
      drums: layer(0, 0.16),
      lead: layer(1.8, 0.5),
    };
    // guzheng body EQ, stereo spread
    const pk = k.filter('peaking', 220, 1, L.pluck);
    pk.gain.value = 2.5;
    const hs = k.filter('highshelf', 5200, 0.7, pk);
    hs.gain.value = -4;
    L.pluckL = k.pan(-0.3, hs);
    L.pluckR = k.pan(0.3, hs);
    L.drumL = k.pan(-0.25, L.drums);
    L.drumR = k.pan(0.25, L.drums);
    this.L = L;
  }

  setIntensity(v) { this.target = clamp(+v || 0); }

  start() {
    const now = this.ctx.currentTime;
    if (!this.L) this._build();
    const fade = this.eng.musicFade.gain;
    fade.cancelScheduledValues(now);
    fade.setValueAtTime(fade.value, now);
    fade.linearRampToValueAtTime(1, now + 2.5);
    if (this.running) { this.stopAt = Infinity; return; }
    this.running = true;
    this.stopAt = Infinity;
    this.I = this.target;
    // pre-generate the plucked-string tables used by the ostinato
    for (const m of SCALE) if (m >= 48 && m <= 90) ksBuffer(this.ctx, this.eng.res, m);
    this._startDrone(now);
    this.step = 0;
    this.next = now + 0.12;
    this.prog = CALM[0];
    this.opening = true;
    if (!this.eng.offline) this._tick();
  }

  stop(fadeSec = 2) {
    if (!this.running) return;
    const now = this.ctx.currentTime;
    const f = Math.max(0.05, +fadeSec || 0);
    const fade = this.eng.musicFade.gain;
    fade.cancelScheduledValues(now);
    fade.setValueAtTime(fade.value, now);
    fade.linearRampToValueAtTime(0, now + f);
    this.stopAt = now + f;
    if (this.eng.offline) for (const o of this.drone || []) o.stop(now + f + 0.1);
  }

  _finish() {
    const t = this.ctx.currentTime;
    for (const o of this.drone || []) { try { o.stop(t + 0.05); } catch (e) { /* already stopped */ } }
    this.running = false;
    this.drone = null;
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }

  _tick() {
    this.timer = null;
    if (!this.running) return;
    const now = this.ctx.currentTime;
    if (now >= this.stopAt) { this._finish(); return; }
    const hidden = typeof document !== 'undefined' && document.hidden;
    this.scheduleUntil(now + (hidden ? 1.3 : 0.2));
    this.timer = setTimeout(() => this._tick(), 25);
  }

  scheduleUntil(tEnd) {
    if (!this.running) return;
    const now = this.ctx.currentTime;
    if (this.next < now - 0.06) this.next = now + 0.03; // fell behind (tab throttled): skip, never pile up
    while (this.next < tEnd && this.next < this.stopAt) {
      this._step(this.step, this.next);
      this.next += STEP;
      this.step++;
    }
  }

  _startDrone(t) {
    const k = this.k;
    const g = k.gain(0, this.L.drone);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(1, t + 5);
    const lp = k.filter('lowpass', 200, 1.2, g);
    this.droneLP = lp;
    const mk = (type, f, lvl, dest, detune = 0) => {
      const o = this.ctx.createOscillator();
      o.type = type;
      o.frequency.value = f;
      o.detune.value = detune;
      o.connect(k.gain(lvl, dest));
      o.start(t);
      return o;
    };
    const lfo = mk('sine', 0.045, 70, lp.frequency);
    this.drone = [
      mk('sine', 36.71, 0.25, g),
      mk('triangle', 73.42, 0.5, lp),
      mk('sawtooth', 73.42, 0.22, lp, 6),
      mk('sawtooth', 110, 0.16, lp, -5),
      lfo,
    ];
  }

  _step(step, t) {
    const s16 = step % 16;
    const bar = (step / 16) | 0;
    const barInSec = bar % 8;
    const barInChord = bar % 2;
    const chordIdx = barInSec >> 1;
    const d = this.target - this.I;
    this.I += d > 0 ? Math.min(d, 0.5 * STEP) : Math.max(d, -0.07 * STEP);
    if (s16 === 0) {
      if (barInSec === 0) this._section((bar / 8) | 0, t);
      this._bar(barInSec, t);
      if (barInChord === 0) this._chord(chordIdx, t);
    }
    this._pluckStep(s16, barInChord, barInSec, t);
    this._drumStep(s16, barInChord, barInSec, t);
  }

  _section(sec, t) {
    const I = this.I;
    const pool = I > 0.5 ? WAR : CALM;
    let pi;
    do { pi = (Math.random() * pool.length) | 0; } while (pool.length > 1 && pool === this.lastPool && pi === this.lastProg);
    this.lastPool = pool;
    this.lastProg = pi;
    this.prog = this.opening ? CALM[0] : pool[pi];
    let pat;
    do { pat = (Math.random() * PATS.length) | 0; } while (pat === this.lastPat);
    this.lastPat = pat;
    this.pat = PATS[pat];
    this.shifts = [0, pick([-1, 0, 1, 2]), 0, pick([-1, 1, 2])];
    this.breath = sec % 4 === 3 && I < 0.7;
    this.plan = null;
    if (!this.opening) {
      if (I < 0.6 && !this.hadLead && Math.random() < 0.7) {
        const variant = Math.random() < 0.62 ? 'dizi' : 'erhu';
        this.plan = { kind: 'lead', bar: pick([1, 2, 4]), off: pick([0, 1, 2]), variant };
      } else if (I >= 0.55 && Math.random() < 0.6) {
        this.plan = { kind: 'horn', bar: pick([2, 4]), off: pick([0, 1]) };
      }
    }
    this.hadLead = !!this.plan && this.plan.kind === 'lead';
    if (this.opening) Ins.gong(this.k, this.L.pad, t, 0.35, 98, 7);
    else if (I > 0.78 && sec % 2 === 0) Ins.gong(this.k, this.L.drums, t, 0.45, 104, 6);
    this.opening = false;
  }

  _bar(barInSec, t) {
    const I = this.I, L = this.L;
    L.drums.gain.setTargetAtTime(0.75 * smoothstep(0.1, 0.45, I), t, 0.6);
    L.pad.gain.setTargetAtTime(2.0 * (0.95 - 0.3 * I), t, 1.5);
    this.droneLP.frequency.setTargetAtTime(170 + 260 * I, t, 2);
    // combat onset / release accents
    if (I > 0.6 && !this.combat) {
      this.combat = true;
      if (t - this.lastOnset > 20) {
        this.lastOnset = t;
        Ins.taiko(this.k, L.drums, t, 1, 60);
        Ins.gong(this.k, L.drums, t, 0.55, 96, 6);
        for (const m of [50, 57, 62]) Ins.brass(this.k, L.swell, t, m, 0.7, 0.05, 0.85, { rel: 1.2 });
      }
    } else if (I < 0.3 && this.combat) {
      this.combat = false;
      Ins.gong(this.k, L.pad, t, 0.22, 92, 7);
    }
    const p = this.plan;
    if (p && p.bar === barInSec) {
      const tl = t + p.off * BEAT;
      if (p.kind === 'lead') Ins.lead(this.k, L.lead, tl, this._phrase(p.variant), BEAT, p.variant === 'erhu' ? 0.09 : 0.1, p.variant, SCALE);
      else {
        const call = pick(CALLS);
        let tn = tl;
        const bright = 0.45 + 0.4 * I;
        for (const [m, b] of call) {
          Ins.brass(this.k, L.swell, tn, m, b * BEAT * 0.95, 0.06, bright, { rel: 0.6 });
          Ins.brass(this.k, L.swell, tn, m - 12, b * BEAT * 0.95, 0.04, bright * 0.7, { rel: 0.6, scoop: false });
          tn += b * BEAT;
        }
      }
      this.plan = null;
    }
  }

  _phrase(variant) {
    const erhu = variant === 'erhu';
    const lo = SCALE.indexOf(erhu ? 62 : 74), hi = SCALE.indexOf(erhu ? 81 : 86);
    let idx = lo + ((Math.random() * 4) | 0);
    const n = 4 + ((Math.random() * 4) | 0);
    const notes = [];
    let beats = 0;
    for (let i = 0; i < n && beats < 10; i++) {
      const b = i === 0 ? pick([1, 1.5, 2]) : pick([0.5, 1, 1, 1.5, 2, 0.5, 1]);
      notes.push({ m: SCALE[idx], b });
      beats += b;
      let st = pick([-2, -1, -1, 1, 1, 2, 0]);
      if (st === 0 && i > 0 && notes[i - 1].m === SCALE[idx]) st = 1;
      idx = clamp(idx + st, lo - 1, hi);
    }
    // cadence on D or A
    const targets = SCALE.filter((m, i) => i >= lo - 1 && i <= hi && (m % 12 === 2 || m % 12 === 9));
    const last = notes[notes.length - 1].m;
    targets.sort((a, b) => Math.abs(a - last) - Math.abs(b - last));
    notes.push({ m: targets[0], b: pick([2.5, 3, 4]) });
    return notes;
  }

  _chord(chordIdx, t) {
    const I = this.I, k = this.k, L = this.L;
    const ch = CH[this.prog[chordIdx]];
    this.chord = ch;
    this.anchorIdx = SCALE.indexOf(ch.anchor) + this.shifts[chordIdx];
    const dur = CHORD_STEPS * STEP;
    Ins.pad(k, L.pad, t, ch.pad, dur, 0.022, 650 + 1400 * I);
    Ins.pluck(k, L.pluckL, t + rand(0, 0.01), ch.root + 12, 0.34);
    if (I > 0.2) {
      const sv = 0.015 + 0.03 * smoothstep(0.2, 0.8, I);
      Ins.swell(k, L.swell, t, ch.swell, dur, sv, I);
    }
    if (I > 0.74) Ins.choir(k, L.pad, t, ch.pad, dur * 0.9, 0.05 * smoothstep(0.74, 1, I), { a: 1.8, rel: 2 });
    if (I > 0.7 && chordIdx % 2 === 1) {
      const tb = t + 16 * STEP;
      for (const m of [ch.swell[1], ch.swell[2]]) Ins.brass(k, L.swell, tb, m, 12 * STEP, 0.03 + 0.02 * I, 0.4 + 0.4 * I, { rel: 0.8 });
    }
  }

  _pluckStep(s16, barInChord, barInSec, t) {
    if (this.breath && barInSec >= 6) {
      if (s16 === 0 && barInSec === 6) Ins.pluck(this.k, this.L.pluckR, t, this.chord.anchor + 12, 0.22, { vib: 0.02 });
      return;
    }
    const I = this.I;
    const th = t + rand(-0.004, 0.006);
    if (s16 % 2 === 0) {
      const pos = barInChord * 8 + (s16 >> 1);
      const deg = this.pat[pos];
      if (deg == null) return;
      if (I < 0.12) { if (s16 % 4 !== 0 || (s16 !== 0 && Math.random() > 0.7)) return; }
      else if (I < 0.3) { if (s16 !== 0 && Math.random() > 0.78) return; }
      const idx = clamp(this.anchorIdx + deg, 0, SCALE.length - 1);
      const m = SCALE[idx];
      const acc = s16 % 8 === 0 ? 1 : s16 % 4 === 0 ? 0.8 : 0.64;
      const vel = acc * (0.17 + 0.07 * I) * rand(0.9, 1.08);
      const opts = {};
      if (s16 === 0 && Math.random() < 0.14) opts.bend = -2;
      else if (s16 % 8 === 0 && Math.random() < 0.08) opts.vib = 0.022;
      Ins.pluck(this.k, (pos & 1) ? this.L.pluckR : this.L.pluckL, th, m, vel, opts);
      this.lastPluck = m;
    } else if (I > 0.62 && Math.random() < (I - 0.62) * 2.2) {
      const m = Math.random() < 0.5 ? this.lastPluck || this.chord.anchor : SCALE[clamp(this.anchorIdx + 5, 0, SCALE.length - 1)];
      Ins.pluck(this.k, this.L.pluckR, th, m, 0.075 * rand(0.85, 1.1));
    }
  }

  _drumStep(s16, barInChord, barInSec, t) {
    const I = this.I;
    const lvl = I < 0.14 ? 0 : I < 0.4 ? 1 : I < 0.65 ? 2 : I < 0.85 ? 3 : 4;
    if (lvl === 0) return;
    let c = DRUMS[lvl][barInChord][s16];
    if (barInSec === 7 && I > 0.45 && s16 >= 8) c = FILL[s16];
    const k = this.k, L = this.L;
    const th = t + rand(-0.004, 0.004);
    const dyn = 0.6 + 0.4 * I;
    if (c === 'X') Ins.taiko(k, L.drums, th, dyn * rand(0.92, 1.05), 62);
    else if (c === 'o') Ins.taiko(k, L.drums, th, dyn * 0.5, 64);
    else if (c === 'x') Ins.taiko(k, s16 % 4 < 2 ? L.drumL : L.drumR, th, dyn * rand(0.5, 0.7), 96);
    const r = RIMS[lvl][s16];
    if (r !== '.' && r) Ins.rim(k, s16 & 2 ? L.drumR : L.drumL, th, (r === 'R' ? 0.45 : 0.25) * dyn * rand(0.8, 1.1));
  }
}
