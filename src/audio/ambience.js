// Looping ocean ambience (surf wash, wind, rare gulls) and the continuous
// drone-swarm buzz bus. Both are driven by the engine's slow tick (update()).
import { Kit, rand, clamp, smoothstep } from './synth.js';

export class Ambience {
  constructor(eng) {
    this.eng = eng;
    this.ctx = eng.ctx;
    this.k = new Kit(eng.ctx, eng.res);
    this.on = false;
    this.srcs = [];
  }

  _loop(kind, dest, rate = 1) {
    const s = this.ctx.createBufferSource();
    s.buffer = this.eng.res[kind];
    s.loop = true;
    s.playbackRate.value = rate;
    s.connect(dest);
    s.start(this.ctx.currentTime, Math.random() * s.buffer.duration);
    this.srcs.push(s);
    return s;
  }

  start() {
    if (this.on) return;
    this.on = true;
    const k = this.k, t = this.ctx.currentTime;
    this.out = k.gain(0, this.eng.ambIn);
    this.out.gain.setValueAtTime(0, t);
    this.out.gain.linearRampToValueAtTime(1, t + 3);
    this.surfBus = k.gain(1, this.out);
    this.windBus = k.gain(1, this.out);
    // constant low bed, stereo
    for (const p of [-0.5, 0.5]) this._loop('pink', k.filter('lowpass', 330 + p * 40, 0.6, k.gain(0.05, k.pan(p, this.surfBus))), rand(0.97, 1.03));
    // two independent surf layers
    this.surf = [-0.6, 0.6].map((p) => {
      const g = k.gain(0, k.pan(p, this.surfBus));
      const lp = k.filter('lowpass', 300, 0.7, g);
      this._loop('brown', lp);
      this._loop('white', k.filter('bandpass', 2600, 0.6, k.gain(0.035, g))); // foam hiss rides the wave
      return { g, lp, next: t + rand(0.2, 2.5) };
    });
    // wind: broad band + faint tonal whistle
    this.windG = k.gain(0.03, this.windBus);
    this.windBP = k.filter('bandpass', 700, 0.8, this.windG);
    this._loop('white', this.windBP);
    this.whistleG = k.gain(0.004, this.windBus);
    this.whistleBP = k.filter('bandpass', 1700, 14, this.whistleG);
    this._loop('white', this.whistleBP);
    this.nextWind = t;
    this.nextGull = t + rand(10, 25);
    // storm layers: rain hiss (two bands) + a low gale roar, silent until setStorm()
    this.rainG = k.gain(0, this.out);
    this._loop('white', k.filter('highpass', 2200, 0.5, k.gain(0.1, this.rainG)));
    this._loop('pink', k.filter('bandpass', 5200, 0.7, k.gain(0.12, this.rainG)), 1.3);
    this.galeG = k.gain(0, this.windBus);
    this._loop('brown', k.filter('lowpass', 420, 0.9, k.gain(0.5, this.galeG)), 0.9);
    // the player's own ship voice: bow wash for every hull + a per-age propulsion layer
    const ctx = this.ctx;
    this.shipOut = k.gain(1.5, this.out); // +4.4 dB: the ship must read as 'my ship', not texture
    this.washG = k.gain(0, this.shipOut);
    this._loop('brown', k.filter('lowpass', 520, 0.7, this.washG));
    this._loop('white', k.filter('bandpass', 1900, 0.9, k.gain(0.12, this.washG)), 0.8);
    this.creakG = k.gain(0, this.shipOut);                       // Sail: rigging creak (slow resonant wobble)
    const creakBP = k.filter('bandpass', 420, 9, this.creakG);
    this._loop('pink', creakBP, 0.6);
    const cl = ctx.createOscillator(); cl.frequency.value = 0.35; const cld = k.gain(160); cl.connect(cld); cld.connect(creakBP.frequency); cl.start(); this.srcs.push(cl);
    this.chuffG = k.gain(0, this.shipOut);                       // Steam: piston chuff, tempo follows speed
    const chuffAmp = k.gain(0, this.chuffG);
    this._loop('pink', k.filter('bandpass', 190, 1.4, chuffAmp));
    this.chuffLfo = ctx.createOscillator(); this.chuffLfo.type = 'square'; this.chuffLfo.frequency.value = 1.5;
    const cd = k.gain(0.5); this.chuffLfo.connect(cd); cd.connect(chuffAmp.gain); chuffAmp.gain.value = 0.5; this.chuffLfo.start(); this.srcs.push(this.chuffLfo);
    this.turbG = k.gain(0, this.shipOut);                        // Dreadnought-Airpower: turbine drone
    const turbLP = k.filter('lowpass', 240, 0.8, this.turbG);
    this.turbOsc = [44, 88.6].map((f, i) => { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.connect(k.gain(i ? 0.35 : 0.6, turbLP)); o.start(); this.srcs.push(o); return o; });
    this.humG = k.gain(0, this.shipOut);                         // Swarm: electric hum + fan whine
    this.humOsc = [110, 220.7, 1760].map((f, i) => { const o = ctx.createOscillator(); o.type = i === 2 ? 'triangle' : 'sine'; o.frequency.value = f; o.connect(k.gain([0.5, 0.25, 0.04][i], this.humG)); o.start(); this.srcs.push(o); return o; });
    this.setShip(this.shipAge || 1, this.shipSpeed || 0);
    this.setStorm(this.storm || 0);
    this.setZoom(this.eng.listener.zoom);
  }

  /** 0..1 storm intensity: rain + gale. */
  /** Player ship voice: age picks the propulsion layer, speed (0..1) drives wash, tempo and pitch. */
  setShip(age, speed) {
    this.shipAge = age; this.shipSpeed = clamp(speed); this.shipAt = this.ctx.currentTime;
    if (!this.on || !this.washG) return;
    const t = this.ctx.currentTime, v = this.shipSpeed, tc = 0.4;
    this.washG.gain.setTargetAtTime(0.012 + v * 0.07, t, tc);
    this.creakG.gain.setTargetAtTime(age === 1 ? 0.05 + v * 0.03 : 0, t, tc);
    this.chuffG.gain.setTargetAtTime(age === 2 ? 0.05 + v * 0.06 : 0, t, tc);
    this.chuffLfo.frequency.setTargetAtTime(1.2 + v * 3.2, t, tc);
    this.turbG.gain.setTargetAtTime(age === 3 || age === 4 ? 0.02 + v * 0.035 : 0, t, tc);
    this.turbOsc.forEach((o, i) => o.frequency.setTargetAtTime((i ? 88.6 : 44) * (0.85 + v * 0.35), t, tc));
    this.humG.gain.setTargetAtTime(age === 5 ? 0.012 + v * 0.02 : 0, t, tc);
    this.humOsc[2].frequency.setTargetAtTime(1500 + v * 900, t, tc);
  }

  /** The Dusk Tide: a lower, gustier wind and the gulls fall quiet. */
  setDusk(on) { this.dusk = !!on; if (on && this.ctx) this.nextWind = this.ctx.currentTime; } // the dusk wind lands with the event, not up to 7 s later

  setStorm(v) {
    this.storm = clamp(v);
    if (!this.on) return;
    const t = this.ctx.currentTime;
    this.rainG.gain.setTargetAtTime(this.storm * 0.9, t, 1.5);
    this.galeG.gain.setTargetAtTime(this.storm * 0.6, t, 2.5);
  }

  stop(fade = 2) {
    if (!this.on) return;
    this.on = false;
    const t = this.ctx.currentTime;
    this.out.gain.cancelScheduledValues(t);
    this.out.gain.setValueAtTime(this.out.gain.value, t);
    this.out.gain.linearRampToValueAtTime(0, t + fade);
    for (const s of this.srcs) s.stop(t + fade + 0.05);
    this.srcs = [];
  }

  setZoom(zoom) {
    if (!this.on) return;
    const z = clamp((zoom - 100) / 160);
    const t = this.ctx.currentTime;
    this.surfBus.gain.setTargetAtTime(1.15 - 0.4 * z, t, 0.5);
    this.windBus.gain.setTargetAtTime(0.7 + 0.7 * z, t, 0.5);
  }

  update(now) {
    if (!this.on) return;
    this._shipEvents(now);
    for (const s of this.surf) {
      if (s.next < now + 1.5) {
        const t0 = Math.max(s.next, now + 0.05);
        const rise = rand(1.4, 2.8), fall = rand(2.5, 4.8), pk = rand(0.12, 0.26);
        const g = s.g.gain, f = s.lp.frequency;
        g.setValueAtTime(g.value > 0.01 ? Math.min(g.value, 0.05) : 0.02, t0);
        g.linearRampToValueAtTime(pk, t0 + rise);
        g.linearRampToValueAtTime(0.02, t0 + rise + fall);
        f.setValueAtTime(260, t0);
        f.exponentialRampToValueAtTime(rand(700, 1100), t0 + rise);
        f.exponentialRampToValueAtTime(240, t0 + rise + fall);
        s.next = t0 + rise + fall * rand(0.55, 0.85) + rand(0, 1.5);
      }
    }
    if (now > this.nextWind) {
      const dk = this.dusk ? 0.7 : 1;
      this.windBP.frequency.setTargetAtTime(rand(450, 1100) * dk, now, 2.5);
      this.windG.gain.setTargetAtTime(rand(0.018, 0.045) * (this.dusk ? 1.35 : 1), now, 2.5);
      this.whistleBP.frequency.setTargetAtTime(rand(1300, 2200), now, 3);
      this.whistleG.gain.setTargetAtTime(Math.random() < 0.4 ? rand(0.003, 0.009) : 0.0015, now, 3);
      this.nextWind = now + rand(3, 7);
    }
    if (now > this.nextGull) {
      this._gull(now + 0.1);
      this.nextGull = now + rand(14, 40) * (this.dusk ? 2.5 : 1);
    }
  }

  /** Rhythmic one-shots that give each age's hull a voice of its own (scheduled ~0.45 s ahead
   *  from the 250 ms slow tick): timber creaks and sail luffs, piston chuffs, diesel knock and
   *  hull groans, sonar pings. Speed sets the tempo; a stationary ship only ticks over. */
  _shipEvents(now) {
    // only while a living player ship is reporting in (not the menu backdrop, not while sunk)
    if (!this.shipOut || !this.shipAge || !(now - (this.shipAt ?? -9) < 0.6)) { if (this.shipEv) this.shipEv.beat = now + 0.2; return; }
    const k = this.k, age = this.shipAge, v = this.shipSpeed || 0, out = this.shipOut;
    const ev = (this.shipEv ||= { beat: now, beatN: 0, rare: now + rand(1, 3), rare2: now + rand(4, 8) });
    if (ev.age !== age) { ev.age = age; ev.beat = now + 0.1; ev.rare = now + rand(0.5, 2); }
    const ahead = now + 0.45;
    // pulse track
    while (ev.beat < ahead) {
      const t = Math.max(ev.beat, now + 0.02), n = ev.beatN++;
      let gap;
      if (age === 1) { // bow slapping into the swell
        k.burst(t, { kind: 'brown', type: 'lowpass', f: 520, f1: 240, Q: 0.8, a: 0.02, d: 0.42, peak: 0.09 + v * 0.08, dest: out });
        k.burst(t + 0.03, { kind: 'white', type: 'bandpass', f: 1400, f1: 700, Q: 0.7, a: 0.03, d: 0.35, peak: 0.012 + v * 0.03, dest: out });
        gap = rand(1.6, 2.6) / (0.55 + v * 0.8);
      } else if (age === 2) { // piston chuff: strong-weak pairs, tempo follows the throttle
        const acc = n % 2 === 0;
        k.burst(t, { kind: 'pink', type: 'bandpass', f: acc ? 260 : 320, f1: 150, Q: 1.3, a: 0.004, d: acc ? 0.2 : 0.13, peak: (acc ? 0.24 : 0.12) * (0.75 + v * 0.5), dest: out });
        k.burst(t + 0.01, { kind: 'white', type: 'highpass', f: 3200, Q: 0.6, a: 0.003, d: 0.08, peak: 0.02 * (0.4 + v), dest: out }); // valve hiss
        gap = 1 / (1.6 + v * 4.4);
      } else if (age === 3 || age === 4) { // diesel/turbine knock: a low thump train with a metallic tick
        const acc = n % 4 === 0;
        k.burst(t, { kind: 'brown', type: 'lowpass', f: 190, f1: 90, Q: 1.8, a: 0.003, d: 0.1, peak: (acc ? 0.16 : 0.08) * (0.7 + v * 0.5), dest: out });
        if (acc) k.tone(t, { type: 'triangle', f: 612, f1: 580, a: 0.001, d: 0.05, peak: 0.008 + v * 0.01, dest: out });
        gap = 1 / (3 + v * 5);
      } else { // swarm tender: quiet servo ticks under the hum
        k.tone(t, { type: 'sine', f: 2400 + (n % 3) * 180, a: 0.001, d: 0.03, peak: 0.007 + v * 0.005, dest: out });
        gap = rand(0.35, 0.7);
      }
      ev.beat += gap;
    }
    // rare, characterful events
    if (ev.rare < ahead) {
      const t = Math.max(ev.rare, now + 0.02);
      if (age === 1) { // timber groan (+ a sail luff when under way)
        const f0 = rand(260, 520);
        k.burst(t, { kind: 'pink', type: 'bandpass', f: f0, f1: f0 * rand(0.7, 1.35), Q: 14, a: 0.08, hold: 0.1, d: 0.5, peak: 0.07, dest: out });
        if (v > 0.35) for (let i = 0; i < 3; i++) k.burst(t + 0.6 + i * rand(0.07, 0.11), { kind: 'white', type: 'bandpass', f: 900, Q: 0.9, a: 0.006, d: 0.06, peak: 0.03, dest: out });
        ev.rare = t + rand(2.5, 5.5);
      } else if (age === 2) { // safety valve blow-off
        k.burst(t, { kind: 'white', type: 'bandpass', f: 4200, f1: 3600, Q: 1.4, a: 0.05, hold: 0.25, d: 0.6, peak: 0.018, dest: out });
        ev.rare = t + rand(9, 16);
      } else if (age === 3 || age === 4) { // steel hull groan under load
        const f0 = rand(95, 150);
        k.burst(t, { kind: 'pink', type: 'bandpass', f: f0, f1: f0 * rand(0.8, 1.2), Q: 22, a: 0.2, hold: 0.2, d: 0.9, peak: 0.09, dest: out });
        ev.rare = t + rand(7, 13);
      } else { // sonar ping: the swarm age's signature
        k.tone(t, { type: 'sine', f: 1320, f1: 1290, a: 0.004, d: 0.9, peak: 0.02, dest: [out, this.eng.sfxRevIn] });
        k.tone(t + 0.02, { type: 'sine', f: 2640, a: 0.002, d: 0.25, peak: 0.004, dest: out });
        ev.rare = t + rand(5, 8);
      }
    }
  }

  _gull(t) {
    const k = this.k;
    const out = k.gain(rand(0.5, 1), k.pan(rand(-0.8, 0.8), [this.out, this.eng.sfxRevIn]));
    const n = 2 + ((Math.random() * 3) | 0);
    const base = rand(950, 1250);
    for (let i = 0; i < n; i++) {
      const tc = t + i * rand(0.32, 0.5);
      const g = k.gain(0, out);
      const bp = k.filter('bandpass', 1800, 2, g);
      for (const [type, lvl] of [['sawtooth', 0.4], ['triangle', 1]]) {
        const o = k.osc(type, base, tc, 0.45, k.gain(lvl, bp));
        const f = o.frequency;
        f.setValueAtTime(base * 0.9, tc);
        f.exponentialRampToValueAtTime(base * 1.4, tc + 0.07);
        f.exponentialRampToValueAtTime(base * 0.75, tc + 0.36);
      }
      g.gain.setValueAtTime(0, tc);
      g.gain.linearRampToValueAtTime(0.012, tc + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, tc + 0.38);
    }
  }
}

// Continuous drone-swarm buzz. Loudness, density and brightness follow count.
export class Swarm {
  constructor(eng) {
    this.eng = eng;
    this.ctx = eng.ctx;
    this.k = new Kit(eng.ctx, eng.res);
    this.built = false;
    this.count = 0;
  }

  _build() {
    const k = this.k, ctx = this.ctx, t = ctx.currentTime;
    this.built = true;
    this.out = k.gain(0, this.eng.sfxIn);
    const flutter = k.gain(0.7, this.out);
    // slow random amplitude flutter from lowpassed noise
    const fl = k.filter('lowpass', 9, 0.7, k.gain(0.9, flutter.gain));
    const ns = ctx.createBufferSource();
    ns.buffer = this.eng.res.brown; ns.loop = true; ns.connect(fl); ns.start(t);
    this.bp = k.filter('bandpass', 900, 0.6, flutter);
    this.layers = [];
    const bases = [118, 141, 163, 187, 211, 246, 131, 199];
    bases.forEach((f, i) => {
      const g = k.gain(0, this.bp);
      const o = ctx.createOscillator();
      o.type = i % 3 === 2 ? 'square' : 'sawtooth';
      o.frequency.value = f;
      o.detune.value = rand(-30, 30);
      o.connect(g);
      o.start(t);
      // per-rotor wobble
      const lfo = ctx.createOscillator();
      lfo.frequency.value = rand(3, 9);
      const lg = k.gain(rand(8, 20), o.detune);
      lfo.connect(lg);
      lfo.start(t);
      this.layers.push({ g, o, at: i / bases.length });
    });
    this.hiss = k.gain(0, this.out);
    const hbp = k.filter('bandpass', 4200, 1.5, this.hiss);
    const hs = ctx.createBufferSource();
    hs.buffer = this.eng.res.white; hs.loop = true; hs.connect(hbp); hs.start(t);
    this.whine = k.gain(0, this.out);
    this.whineO = ctx.createOscillator();
    this.whineO.frequency.value = 2300;
    this.whineO.connect(this.whine);
    this.whineO.start(t);
  }

  set(count) {
    const c = clamp(+count || 0, 0, 200);
    this.count = c;
    if (c <= 0 && !this.built) return;
    if (!this.built) this._build();
    const n = c / 200, t = this.ctx.currentTime;
    const loud = c <= 0 ? 0 : 0.05 + 0.3 * Math.sqrt(n);
    this.out.gain.setTargetAtTime(loud, t, 0.25);
    this.layers.forEach((l, i) => {
      const lvl = i === 0 ? (c > 0 ? 1 : 0) : smoothstep(l.at * 0.6, l.at * 0.6 + 0.12, n);
      l.g.gain.setTargetAtTime(0.12 * lvl, t, 0.3);
    });
    this.bp.frequency.setTargetAtTime(650 + 1500 * n, t, 0.4);
    this.hiss.gain.setTargetAtTime(0.25 * n, t, 0.4);
    this.whine.gain.setTargetAtTime(0.006 * Math.sqrt(n), t, 0.4);
  }

  update(now) {
    if (!this.built || this.count <= 0) return;
    for (const l of this.layers) if (Math.random() < 0.3) l.o.detune.setTargetAtTime(rand(-40, 40), now, 0.6);
    this.whineO.frequency.setTargetAtTime(rand(2000, 2800), now, 0.8);
  }
}
