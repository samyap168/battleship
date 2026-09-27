// Armada Ascension audio engine. 100% procedural Web Audio: no sample files.
//
//   import { audio } from './audio/audio.js';
//   canvas.addEventListener('pointerdown', () => audio.init(), { once: true });
//   audio.setListener(camFocus.x, camFocus.z, camDist);          // every frame
//   audio.play('cannon', { x, z });                              // positional
//   audio.play('uiClick');                                       // UI (non-positional)
//   audio.startAmbience(); audio.startMusic(); audio.setIntensity(0.7);
//
// Graph:
//   voices ─ dry ─ [distance LPF] ─ pan ─┐
//          └ send ─ sea reverb ─────────┤
//          └ echo ─ horizon delay ──────┼─ sfxVol ─┐
//   ambience / swarm / stingers ─────────┘          │
//   score layers ─┬──────────── duck ─ fade ─ musicVol ─┤
//                 └ hall reverb ┘                       │
//                            preMaster ─ HPF ─ glue comp ─ limiter ─ masterVol ─ mute ─ soft clip ─ out
import { Kit, getResources, clamp } from './synth.js';
import { DEFS, RECIPES, SOUND_NAMES } from './sounds.js';
import { Music } from './music.js';
import { STINGERS } from './stingers.js';
import { Ambience, Swarm } from './ambience.js';

export { SOUND_NAMES };
export const STINGER_NAMES = Object.keys(STINGERS);

const MAX_VOICES = 48;
const THROTTLE = 0.025;
const REF_ZOOM = 180;
const BASE_RADIUS = 420;
const STINGER_PRI = { victory: 9, defeat: 9, ageUp: 7, enemyAge: 5, matchStart: 8, firstBlood: 4, towerDown: 4, warning: 3 };

function softClipCurve(n = 2048) {
  // input u in [-1,1] represents actual amplitude 2u; linear to 0.8, soft knee to 0.98
  const c = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const a = ((i / (n - 1)) * 2 - 1) * 2;
    const s = Math.sign(a), m = Math.abs(a);
    c[i] = s * (m <= 0.8 ? m : 0.8 + 0.18 * Math.tanh((m - 0.8) / 0.18));
  }
  return c;
}

export class Engine {
  constructor(ctx, { offline = false, raw = false } = {}) {
    this.ctx = ctx;
    this.offline = offline;
    this.res = getResources(ctx);
    this.k = new Kit(ctx, this.res);
    this.voices = [];
    this.last = Object.create(null);
    this.listener = { x: 0, z: 0, zoom: REF_ZOOM };
    this.stingers = [];
    this.warned = new Set();
    this._build(raw);
    this.music = new Music(this);
    this.ambience = new Ambience(this);
    this.swarm = new Swarm(this);
    if (!offline) this._slowTick();
  }

  _build(raw) {
    const k = this.k, ctx = this.ctx;
    this.preMaster = k.gain(1);
    if (raw) {
      this.preMaster.connect(ctx.destination);
      this.masterVol = k.gain(1); this.mute = k.gain(1); this.out = this.preMaster;
    } else {
      const hp = k.filter('highpass', 24, 0.7);
      this.preMaster.connect(hp);
      const glue = ctx.createDynamicsCompressor();
      glue.threshold.value = -16; glue.knee.value = 10; glue.ratio.value = 2.5;
      glue.attack.value = 0.008; glue.release.value = 0.28;
      const lim = ctx.createDynamicsCompressor();
      lim.threshold.value = -3; lim.knee.value = 0; lim.ratio.value = 20;
      lim.attack.value = 0.001; lim.release.value = 0.12;
      hp.connect(glue); glue.connect(lim);
      this.masterVol = k.gain(0.8);
      this.mute = k.gain(1);
      lim.connect(this.masterVol); this.masterVol.connect(this.mute);
      const pre = k.gain(0.5);
      const sh = ctx.createWaveShaper();
      sh.curve = softClipCurve();
      sh.oversample = '2x';
      this.mute.connect(pre); pre.connect(sh); sh.connect(ctx.destination);
      this.out = sh;
      this.comp = glue; this.limiter = lim;
    }
    // SFX
    this.sfxVol = k.gain(0.9, this.preMaster);
    // low-end guard: a lowshelf that dips the sub when many heavy voices stack (no mud in teamfights)
    this.sfxShelf = ctx.createBiquadFilter(); this.sfxShelf.type = 'lowshelf'; this.sfxShelf.frequency.value = 150; this.sfxShelf.gain.value = 0;
    this.sfxShelf.connect(this.sfxVol);
    this.uiDuck = k.gain(1, this.sfxShelf); // UI clicks briefly carve space in the battle bed
    this.sfxIn = k.gain(0.55, this.uiDuck);
    this.uiIn = k.gain(0.55, this.sfxShelf);
    this.ambIn = k.gain(0.8, this.sfxVol);
    this.stingerIn = k.gain(0.55, this.sfxVol);
    const sea = ctx.createConvolver();
    sea.buffer = this.res.irSea;
    this.sfxRevIn = k.gain(1, sea);
    sea.connect(k.gain(0.5, this.sfxVol));
    this.stingerWet = k.gain(0.45, this.sfxRevIn);
    // horizon echo for big booms
    this.echoIn = k.gain(1);
    const dl = ctx.createDelay(1.5);
    dl.delayTime.value = 0.41;
    const elp = k.filter('lowpass', 1300, 0.7);
    const fb = k.gain(0.42); // 2-3 audible repeats rolling back off the islands
    this.echoIn.connect(dl); dl.connect(elp); elp.connect(fb); fb.connect(dl);
    elp.connect(k.gain(0.35, this.sfxIn));
    elp.connect(k.gain(0.25, this.sfxRevIn));
    // Music
    this.musicVol = k.gain(0.6, this.preMaster);
    this.musicFade = k.gain(0, k.gain(0.56, this.musicVol)); // fade stage + fixed score trim
    this.combatDuck = k.gain(1, this.musicFade); // combat sidechain stage (heavy fire pushes the score back)
    this.musicIn = k.gain(1, this.combatDuck); // stinger duck stage
    const hall = ctx.createConvolver();
    hall.buffer = this.res.irHall;
    this.hallIn = k.gain(1, hall);
    hall.connect(k.gain(0.55, this.musicIn));
  }

  get radius() { return BASE_RADIUS * Math.sqrt(clamp(this.listener.zoom, 60, 400) / REF_ZOOM); }

  setListener(x, z, zoom) {
    const L = this.listener;
    if (Number.isFinite(x)) L.x = x;
    if (Number.isFinite(z)) L.z = z;
    if (Number.isFinite(zoom) && zoom !== L.zoom) { L.zoom = zoom; this.ambience.setZoom(zoom); }
  }

  play(name, opts = {}) {
    const def = DEFS[name], recipe = RECIPES[name];
    if (!def) {
      if (!this.warned.has(name)) { this.warned.add(name); console.warn(`[audio] unknown sound "${name}"`); }
      return null;
    }
    const ctx = this.ctx;
    const vol = opts.vol == null ? 1 : +opts.vol;
    if (!(vol > 0)) return null;
    const t = ctx.currentTime + 0.005 + Math.max(0, +opts.when || 0);
    // spatialisation (world XZ; screen right = +X)
    let g = 1, pan = 0, cutoff = 0;
    const positional = Number.isFinite(opts.x) && Number.isFinite(opts.z);
    if (positional) {
      const L = this.listener;
      const R = this.radius * def.range;
      const near = L.zoom * 0.3;
      const dx = opts.x - L.x, dz = opts.z - L.z;
      const d = Math.hypot(dx, dz);
      if (d >= R) return null;
      const dn = clamp((d - near) / (R - near));
      g = Math.pow(1 - dn, 1.6) / (1 + 1.5 * dn);
      pan = clamp(dx / (R * 0.55), -1, 1) * 0.8;
      if (dn > 0.04) cutoff = 900 + 15000 * (1 - dn) * (1 - dn) * (1 - dn); // air absorption: highs die first over open water
    }
    const jit = 1 + (Math.random() * 2 - 1) * def.jv;
    let base = vol * def.lvl * jit;
    if (base * g < 0.004) return null;
    this._prune(t);
    // throttle identical sounds (unless the new one is clearly louder)
    const last = this.last[name];
    if (last && Math.abs(t - last.t) < THROTTLE && base * g <= last.level * 1.5) return null;
    // per-sound cap: steal the oldest
    let same = 0, oldest = null;
    for (const v of this.voices) if (v.name === name) { same++; if (!oldest || v.start < oldest.start) oldest = v; }
    if (same >= def.cap) { this._steal(oldest); same--; }
    // global cap: steal the least important (priority x loudness x remaining life)
    if (this.voices.length >= MAX_VOICES) {
      let worst = null, ws = Infinity;
      for (const v of this.voices) {
        const life = clamp((v.end - t) / (v.end - v.start), 0.05, 1);
        const s = v.pri * v.level * Math.sqrt(life);
        if (s < ws) { ws = s; worst = v; }
      }
      if (ws >= def.pri * base * g) return null;
      this._steal(worst);
    }
    base /= 1 + 0.12 * same; // density attenuation keeps piles clean
    const V = new Kit(ctx, this.res, true);
    V.t = t;
    V.p = (opts.pitch == null ? 1 : +opts.pitch || 1) * (1 + (Math.random() * 2 - 1) * def.jp);
    V.o = opts;
    V.out = V.gain(1);
    const dry = V.gain(base * g);
    V.out.connect(dry);
    let head = dry;
    const nodes = [V.out, dry];
    if (cutoff) { const lp = V.filter('lowpass', cutoff, 0.5); head.connect(lp); head = lp; nodes.push(lp); }
    if (positional) { const p = V.pan(pan); head.connect(p); head = p; nodes.push(p); }
    const isUI = name.startsWith('ui');
    head.connect(isUI ? this.uiIn : this.sfxIn);
    if (isUI) { const ud = this.uiDuck.gain; ud.cancelScheduledValues(t); ud.setTargetAtTime(0.6, t, 0.008); ud.setTargetAtTime(1, t + 0.09, 0.08); }
    if (def.pri >= 4) {
      let heavy = 0; for (const v of this.voices) if (v.pri >= 4 && t - v.start < 0.9) heavy++;
      const sg = this.sfxShelf.gain; sg.cancelScheduledValues(t);
      sg.setTargetAtTime(-Math.min(7, Math.max(0, heavy - 2) * 1.4), t, 0.05); sg.setTargetAtTime(0, t + 0.9, 0.6);
    }
    // sends are darkened by distance too (gentler than the dry path), so far shots
    // sound muffled instead of their reverb tail staying bright
    const sendDest = (dest) => { if (!cutoff) return dest; const f = V.filter('lowpass', Math.min(18000, cutoff * 1.15), 0.5); f.connect(dest); nodes.push(f); return f; };
    V.wet = V.gain(base * def.rev * Math.sqrt(g), sendDest(this.sfxRevIn));
    V.out.connect(V.wet);
    nodes.push(V.wet);
    V.echo = def.echo > 0 ? V.gain(base * def.echo * Math.pow(g, 0.7), sendDest(this.echoIn)) : null;
    if (V.echo) nodes.push(V.echo);
    // sidechain: loud weapon hits near the listener dip the music for a moment
    if (def.pri >= 3 && base * g > 0.3 && this.combatDuck) {
      // depth accumulates across overlapping hits (focus fire buries the score), floor 0.42
      const dk = this.combatDuck.gain, depth = Math.min(0.4, 0.2 + base * g * 0.15) * (def.pri >= 5 ? 1.2 : 1);
      dk.cancelScheduledValues(t);
      dk.setTargetAtTime(Math.max(0.42, Math.min(dk.value, 1) * (1 - depth * 0.65)), t, 0.025);
      dk.setTargetAtTime(1, t + 0.3, 0.8);
    }
    let dur;
    try { dur = recipe(V); } catch (e) { for (const n of nodes) n.disconnect(); throw e; }
    const voice = { name, start: t, end: t + dur, level: base * g, pri: def.pri, V, nodes };
    this.voices.push(voice);
    this.last[name] = { t, level: base * g };
    return { name, stop: () => this._steal(voice) };
  }

  _steal(v) {
    const i = this.voices.indexOf(v);
    if (i < 0) return;
    this.voices.splice(i, 1);
    const now = this.ctx.currentTime;
    for (const n of [v.V.out, v.V.echo]) {
      if (!n) continue;
      n.gain.cancelScheduledValues(now);
      n.gain.setValueAtTime(n.gain.value, now);
      n.gain.setTargetAtTime(0, now, 0.012);
    }
    for (const s of v.V.srcs) { try { s.stop(now + 0.08); } catch (e) { /* not started / already stopped */ } }
    if (!this.offline) setTimeout(() => { for (const n of v.nodes) n.disconnect(); }, 200);
  }

  _prune(t = this.ctx.currentTime) {
    const now = this.ctx.currentTime;
    for (let i = this.voices.length - 1; i >= 0; i--) {
      const v = this.voices[i];
      if (v.end <= t) {
        this.voices.splice(i, 1);
        if (!this.offline && v.end <= now) for (const n of v.nodes) n.disconnect();
        else if (!this.offline) setTimeout(() => { for (const n of v.nodes) n.disconnect(); }, (v.end - now) * 1000 + 100);
      }
    }
  }

  stinger(name) {
    const fn = STINGERS[name];
    if (!fn) {
      if (!this.warned.has('s:' + name)) { this.warned.add('s:' + name); console.warn(`[audio] unknown stinger "${name}"`); }
      return false;
    }
    const now = this.ctx.currentTime;
    this.stingers = this.stingers.filter((s) => s.end > now);
    if (this.stingers.some((s) => s.name === name && now - s.start < 0.8)) return false;
    const pri = STINGER_PRI[name] || 1;
    if (this.stingers.length >= 2) {
      const low = this.stingers.reduce((a, b) => (a.pri <= b.pri ? a : b));
      if (low.pri >= pri) return false;
      low.out.gain.setTargetAtTime(0, now, 0.08);
      low.wet.gain.setTargetAtTime(0, now, 0.08);
      this.stingers.splice(this.stingers.indexOf(low), 1);
    }
    const t = now + 0.02;
    const out = this.k.gain(1, this.stingerIn);
    const wet = this.k.gain(1, this.stingerWet);
    const dur = fn(this.k, out, wet, t);
    // stingers talk; the score ducks under them
    const dk = this.musicIn.gain;
    dk.cancelScheduledValues(t);
    dk.setTargetAtTime(0.35, t, 0.12);
    dk.setTargetAtTime(1, t + dur * 0.7, 0.9);
    if (pri >= 8 && this.sfxIn) { // the big stingers also carve ~4 dB out of the battle (e.g. the citadel collapse's sub rumble)
      const sd = this.sfxIn.gain; sd.cancelScheduledValues(t); sd.setTargetAtTime(0.55 * 0.63, t, 0.05); sd.setTargetAtTime(0.55, t + Math.min(2.5, dur * 0.4), 0.6);
    }
    this.stingers.push({ name, pri, start: t, end: t + dur, out, wet });
    return true;
  }

  setVolume({ master, music, sfx } = {}) {
    const t = this.ctx.currentTime;
    if (Number.isFinite(master)) this.masterVol.gain.setTargetAtTime(clamp(master), t, 0.03);
    if (Number.isFinite(music)) this.musicVol.gain.setTargetAtTime(clamp(music), t, 0.03);
    if (Number.isFinite(sfx)) this.sfxVol.gain.setTargetAtTime(clamp(sfx), t, 0.03);
  }

  setMuted(m) { this.mute.gain.setTargetAtTime(m ? 0 : 1, this.ctx.currentTime, 0.04); }

  _slowTick() {
    try {
      const now = this.ctx.currentTime;
      this._prune(now);
      this.ambience.update(now);
      this.swarm.update(now);
    } catch (e) { console.warn('[audio] tick', e); }
    this.tickTimer = setTimeout(() => this._slowTick(), 250);
  }

  meter() {
    if (!this.analyser) {
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 2048;
      this.out.connect(this.analyser);
      this.meterBuf = new Float32Array(this.analyser.fftSize);
    }
    this.analyser.getFloatTimeDomainData(this.meterBuf);
    let pk = 0, ss = 0;
    for (const x of this.meterBuf) { const a = Math.abs(x); if (a > pk) pk = a; ss += x * x; }
    const rms = Math.sqrt(ss / this.meterBuf.length);
    return { peak: pk, peakDb: 20 * Math.log10(pk + 1e-9), rmsDb: 20 * Math.log10(rms + 1e-9) };
  }
}

// ---------------------------------------------------------------------------
// Public singleton. Every method is safe before init() and when Web Audio is
// unavailable (becomes a no-op).

class AudioSystem {
  constructor() {
    this.eng = null;
    this.failed = false;
    this._vol = { master: 0.8, music: 0.6, sfx: 0.9 };
    this._muted = false;
    this._L = { x: 0, z: 0, zoom: REF_ZOOM };
    this._intensity = 0;
    this._swarm = 0;
    this._wantMusic = false;
    this._wantAmb = false;
  }

  get ready() { return !!this.eng; }
  get context() { return this.eng ? this.eng.ctx : null; }

  init() {
    if (this.eng) { this._resume(); return true; }
    if (this.failed) return false;
    try {
      const w = typeof window !== 'undefined' ? window : globalThis;
      const AC = w.AudioContext || w.webkitAudioContext;
      if (!AC) throw new Error('Web Audio unavailable');
      let ctx;
      try { ctx = new AC({ latencyHint: 'interactive' }); } catch (e) { ctx = new AC(); }
      this.eng = new Engine(ctx);
      this.eng.setVolume(this._vol);
      this.eng.setMuted(this._muted);
      this.eng.setListener(this._L.x, this._L.z, this._L.zoom);
      this.eng.music.setIntensity(this._intensity);
      if (this._swarm) this.eng.swarm.set(this._swarm);
      if (this._wantAmb) this.eng.ambience.start();
      if (this._storm) this.eng.ambience.setStorm(this._storm);
      if (this._wantMusic) this.eng.music.start();
      this._resume();
      // keep trying to unlock on later gestures (autoplay policies, iOS interruptions)
      const unlock = () => this._resume();
      for (const ev of ['pointerdown', 'keydown', 'touchend']) w.addEventListener?.(ev, unlock, { passive: true });
      return true;
    } catch (e) {
      this.failed = true;
      this.eng = null;
      console.warn('[audio] disabled:', e && e.message);
      return false;
    }
  }

  _resume() {
    const c = this.eng && this.eng.ctx;
    if (c && c.state !== 'running' && c.state !== 'closed') c.resume().catch(() => {});
  }

  _safe(fn, fallback = null) {
    if (!this.eng) return fallback;
    try { return fn(this.eng); } catch (e) { console.warn('[audio]', e); return fallback; }
  }

  setListener(x, z, zoom) {
    if (Number.isFinite(x)) this._L.x = x;
    if (Number.isFinite(z)) this._L.z = z;
    if (Number.isFinite(zoom)) this._L.zoom = zoom;
    if (this.eng) this.eng.setListener(x, z, zoom);
  }

  play(name, opts) { return this._safe((e) => e.play(name, opts || {})); }

  startAmbience() { this._wantAmb = true; this._safe((e) => e.ambience.start()); }
  stopAmbience(fadeSec = 2) { this._wantAmb = false; this._safe((e) => e.ambience.stop(fadeSec)); }
  startMusic() { this._wantMusic = true; this._safe((e) => e.music.start()); }
  stopMusic(fadeSec = 2) { this._wantMusic = false; this._safe((e) => e.music.stop(fadeSec)); }

  setIntensity(v) {
    this._intensity = clamp(+v || 0);
    this._safe((e) => e.music.setIntensity(this._intensity));
  }
  get intensity() { return this.eng ? this.eng.music.I : this._intensity; }

  setFinale(on) { this._finale = !!on; this._safe((e) => { e.music.setFinale(this._finale); e.ambience.setDusk && e.ambience.setDusk(this._finale); }); }

  setShip(age, speed) {
    this._safe((e) => { e.ambience.shipAt = e.ctx.currentTime; }); // liveness: ship one-shots stop when play stops
    if (this._shipAge === age && Math.abs((this._shipSpd ?? -1) - speed) < 0.05) return;
    this._shipAge = age; this._shipSpd = speed;
    this._safe((e) => e.ambience.setShip(age, speed));
  }

  setSwarm(count) {
    this._swarm = clamp(+count || 0, 0, 200);
    this._safe((e) => e.swarm.set(this._swarm));
  }

  /** Storm ambience (rain + gale), 0..1. Remembered before init(). */
  setStorm(v) {
    this._storm = v;
    this._safe((e) => e.ambience.setStorm(v));
  }
  stinger(name) { return this._safe((e) => e.stinger(name), false); }

  setVolume(v = {}) {
    for (const key of ['master', 'music', 'sfx']) if (Number.isFinite(v[key])) this._vol[key] = clamp(v[key]);
    this._safe((e) => e.setVolume(this._vol));
  }
  get volume() { return { ...this._vol }; }

  get muted() { return this._muted; }
  set muted(m) { this._muted = !!m; this._safe((e) => e.setMuted(this._muted)); }

  // Debug / preview helpers
  stats() {
    return this._safe((e) => {
      const byName = {};
      for (const v of e.voices) byName[v.name] = (byName[v.name] || 0) + 1;
      return { state: e.ctx.state, voices: e.voices.length, byName, intensity: e.music.I, ...e.meter() };
    }, { state: 'off', voices: 0, byName: {} });
  }
}

export const audio = new AudioSystem();
export default audio;

// Render a script into an OfflineAudioContext and measure it.
// script(engine) may call engine.play(name, { when }), engine.stinger(),
// engine.music.start() + engine.music.scheduleUntil(sec), etc.
// raw: bypass the master chain (compressor/limiter/clipper) to check headroom.
export async function renderOffline(script, { seconds = 3, sampleRate = 44100, raw = false } = {}) {
  const OAC = globalThis.OfflineAudioContext || globalThis.webkitOfflineAudioContext;
  const ctx = new OAC(2, Math.ceil(seconds * sampleRate), sampleRate);
  const eng = new Engine(ctx, { offline: true, raw });
  await script(eng);
  const buf = await ctx.startRendering();
  let peak = 0, ss = 0, maxWin = 0;
  const n = buf.length, win = Math.floor(sampleRate * 0.05);
  const L = buf.getChannelData(0), R = buf.getChannelData(1);
  let ws = 0, wc = 0, nonFinite = 0;
  for (let i = 0; i < n; i++) {
    const a = L[i], b = R[i];
    if (!Number.isFinite(a) || !Number.isFinite(b)) { nonFinite++; continue; }
    const m = Math.max(Math.abs(a), Math.abs(b));
    if (m > peak) peak = m;
    const e = (a * a + b * b) * 0.5;
    ss += e; ws += e; wc++;
    if (wc === win) { if (ws / wc > maxWin) maxWin = ws / wc; ws = 0; wc = 0; }
  }
  const db = (x) => 20 * Math.log10(x + 1e-12);
  return {
    peak, peakDb: db(peak), rmsDb: db(Math.sqrt(ss / n)), maxShortDb: db(Math.sqrt(maxWin)), nonFinite,
    voices: eng.voices.length,
  };
}
