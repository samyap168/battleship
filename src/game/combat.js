import * as THREE from 'three';
import { getProjectileAssets } from '../render/models/smallModels.js';
import { sampleWaves } from '../render/waves.js';
import { TEAMS } from '../core/config.js';

const _w = { y: 0 };
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(1, 1, 1), _p = new THREE.Vector3();
const _dir = new THREE.Vector3(), _fwd = new THREE.Vector3(0, 0, 1);
const rnd = (a, b) => a + Math.random() * (b - a);

// Visual configs per projectile model
const VIS = {
  ball: { mesh: 'ball', scale: 1.1, glow: [1.6, 0.9, 0.4], glowSize: 2.2, smoke: 0.55, arc: 0.2, snd: 'cannon' },
  chain: { mesh: 'ball', scale: 1.4, glow: [1.8, 1.0, 0.5], glowSize: 3, smoke: 0.6, arc: 0.12, snd: 'cannon', spin: true },
  shell: { mesh: 'shell', scale: 1, glow: [2.4, 1.3, 0.5], glowSize: 2.4, smoke: 0, arc: 0.16, snd: 'cannonHeavy' },
  shell_big: { mesh: 'shell', scale: 1.7, glow: [2.8, 1.5, 0.6], glowSize: 3.8, smoke: 0.3, arc: 0.22, snd: 'cannonHeavy' },
  flak: { mesh: 'shell', scale: 0.7, glow: [2.6, 2.0, 0.9], glowSize: 1.8, smoke: 0, arc: 0.06, snd: 'flak' },
  pulse: { mesh: 'shell', scale: 0.8, glow: [0.6, 1.8, 3.2], glowSize: 3.2, smoke: 0, arc: 0.02, snd: 'pulse' },
  torpedo: { mesh: 'torpedo', scale: 1, glow: null, smoke: 0, arc: 0, snd: 'torpedoLaunch', water: true },
  missile: { mesh: 'missile', scale: 1, glow: [2.8, 1.6, 0.7], glowSize: 3, smoke: 0.8, arc: 0, snd: 'missile' },
  emp: { mesh: 'emp', scale: 1.2, glow: [0.6, 1.4, 3.0], glowSize: 5, smoke: 0, arc: 0.1, snd: 'droneLaunch' },
  hypersonic: { mesh: 'hypersonic', scale: 2, glow: [3, 2.4, 2], glowSize: 9, smoke: 1, arc: 0, snd: 'hypersonic' },
  bomb: { mesh: 'shell', scale: 1.4, glow: null, smoke: 0, arc: 0, snd: 'bombWhistle' },
};

export class Combat {
  constructor(G) {
    this.G = G;
    this.list = [];
    this.mines = [];
    this.timers = [];
    const assets = getProjectileAssets();
    this.inst = {};
    const caps = { ball: 700, shell: 900, torpedo: 150, missile: 250, hypersonic: 8, emp: 16 };
    for (const [k, cap] of Object.entries(caps)) {
      const a = assets[k] || assets.shell;
      const im = new THREE.InstancedMesh(a.geometry, a.material, cap);
      im.count = 0; im.frustumCulled = false; im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      G.scene.add(im);
      this.inst[k] = im;
    }
    const mineGeo = new THREE.SphereGeometry(1.1, 12, 8);
    const mineMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, metalness: 0.7, roughness: 0.35 });
    this.mineMesh = new THREE.InstancedMesh(mineGeo, mineMat, 120);
    this.mineMesh.count = 0; this.mineMesh.frustumCulled = false;
    G.scene.add(this.mineMesh);
  }

  after(delay, fn) { this.timers.push({ t: delay, fn }); }

  // ------------------------------------------------------------------ damage
  damage(target, amount, source, opts = {}) {
    const G = this.G;
    if (!target || !target.alive) return 0;
    if (target.spawnGuard > 0) return 0;
    if ((target.kind === 'tower' || target.kind === 'citadel') && target.invulnerable) {
      if (source && source.isPlayer && Math.random() < 0.15) G.ui.floatText(target.x, 18, target.z, 'PROTECTED', '#9ab', 14);
      return 0;
    }
    let dmg = amount * (1 - (target.armor || 0));
    if (target.buffs) for (const b of target.buffs) if (b.dmgTaken) dmg *= b.dmgTaken;
    if (source && (source.kind === 'tower' || source.kind === 'citadel')) {
      // towers scale with match time so late ships still respect them; they shred gunboats
      dmg *= target.kind === 'creep' ? 1.8 : 1 + G.structureScale;
    }
    if (source && source.kind === 'creep' && (target.kind === 'tower' || target.kind === 'citadel')) dmg *= 0.6;
    // Backdoor protection: forts shrug off captains unless allied gunboats escort the siege.
    if ((target.kind === 'tower' || target.kind === 'citadel') && source && source.kind !== 'creep') {
      const team = source.team;
      const escorted = G.creeps.some((c) => c.alive && c.team === team && (c.x - target.x) ** 2 + (c.z - target.z) ** 2 < 95 * 95);
      if (!escorted) dmg *= 0.45;
    }
    // Home waters: a team trailing badly defends its own forts more stubbornly (anti-stomp).
    const behind = G.teams[1 - target.team] && target.team >= 0 ? G.teams[1 - target.team].kills - G.teams[target.team].kills : 0;
    if (behind >= 6 && source && source.team !== target.team) {
      const k = Math.min(1, (behind - 5) / 15);
      if (target.kind === 'tower' || target.kind === 'citadel') dmg *= 1 - 0.25 * k;
      else if (target.kind === 'hero' && G.structures.some((st) => st.alive && st.team === target.team && (st.x - target.x) ** 2 + (st.z - target.z) ** 2 < 120 * 120)) {
        dmg *= 1 - 0.3 * k;
        if (!G.teams[target.team].homeWaters) {
          G.teams[target.team].homeWaters = true;
          G.ui.announce('HOME WATERS', `${G.teams[target.team].short} defenders dig in near their forts`, TEAMS[target.team].css, 'small');
        }
      }
    }
    let absorbed = 0;
    if (target.shield > 0) {
      absorbed = Math.min(target.shield, dmg);
      target.shield -= absorbed; dmg -= absorbed;
      if (absorbed > 0 && Math.random() < 0.3) G.audio.play('shieldHit', { x: target.x, z: target.z, vol: 0.6 });
    }
    target.hp -= dmg;
    target.hitFlash = 0.12;
    if (target.kind === 'boss' && target.onDamaged) target.onDamaged();
    const srcHero = source && source.kind === 'hero' ? source : source && source.owner && source.owner.kind === 'hero' ? source.owner : null;
    if (srcHero) {
      target.damagers.set(srcHero.id, G.time);
      srcHero.dmgDealt += dmg;
      if (target.kind === 'hero') {
        for (const s of G.structures) if (s.alive && s.team === target.team && s.dist(srcHero) <= s.def.range) { s.aggroHero = srcHero; s.aggroT = 2.5; }
      }
    }
    target.lastAttacker = srcHero || source;
    // alert the player's team when a fortress is under fire (throttled)
    if ((target.kind === 'tower' || target.kind === 'citadel') && G.player && target.team === G.player.team && G.time - (target.alertT || -99) > 12) {
      target.alertT = G.time;
      G.ui.ping(target.x, target.z);
      G.ui.feed(`<b style="color:#ff8a7a">⚠ Our ${target.kind === 'citadel' ? 'citadel' : target.lane + ' ' + target.tier + ' fortress'} is under attack!</b>`);
    }
    // floating combat text for anything the player is part of
    const player = G.player;
    if (player && (srcHero === player || target === player) && (dmg + absorbed) >= 1) {
      if (opts.crit && target.kind !== 'creep') G.ui.floatText(target.x, (target.rig?.height || 8) + 6, target.z, '✦' + Math.round(dmg + absorbed), '#ffd24a', 24);
      else if (target === player || target.kind !== 'creep') G.ui.damageNumber(target, dmg + absorbed, target === player);
    }
    if (target.hp <= 0) G.kill(target, srcHero || source);
    return dmg;
  }

  /** Area damage; returns number of units hit. */
  splashDamage(x, z, radius, dmg, team, source, opts = {}) {
    let n = 0;
    for (const u of this.G.units) {
      if (!u.alive || u.team === team) continue;
      const r = radius + u.radius * 0.6;
      const d2 = (u.x - x) ** 2 + (u.z - z) ** 2;
      if (d2 > r * r) continue;
      const fall = opts.falloff ? 1 - 0.5 * Math.sqrt(d2) / r : 1;
      this.damage(u, dmg * fall, source, opts);
      if (opts.stun) u.stun = Math.max(u.stun, opts.stun);
      if (opts.silence && u.kind === 'hero') u.silence = Math.max(u.silence, opts.silence);
      if (opts.slow) { u.slow = opts.slow; u.slowT = Math.max(u.slowT, opts.slowDur || 1.5); }
      n++;
    }
    return n;
  }

  // ------------------------------------------------------------------ spawners
  /** Ballistic shot from p0 to impact point p1 (lands at p1 after dist/speed). */
  ballistic(owner, model, p0, x1, z1, speed, dmg, opts = {}) {
    const d = Math.hypot(x1 - p0.x, z1 - p0.z);
    const vis = VIS[model];
    const T = Math.max(0.12, d / speed);
    this.list.push({
      type: 'ballistic', model, vis, owner, team: owner.team,
      x0: p0.x, y0: p0.y, z0: p0.z, x1, z1, T, t: 0, arc: opts.arc ?? d * vis.arc,
      dmg, aoe: opts.aoe || 0, hitR: opts.hitR ?? 2.5, crit: opts.crit, slow: opts.slow, slowDur: opts.slowDur, stun: opts.stun,
      splashScale: opts.splashScale || 1, alive: true, x: p0.x, y: p0.y, z: p0.z, trailT: 0, isAbility: opts.isAbility,
    });
  }

  /** Straight skillshot that collides with the first enemy (or pierces). */
  straight(owner, model, p0, dirX, dirZ, speed, range, dmg, opts = {}) {
    const vis = VIS[model];
    this.list.push({
      type: 'straight', model, vis, owner, team: owner.team,
      x: p0.x, y: vis.water ? -0.25 : Math.max(1.5, p0.y), z: p0.z, vx: dirX * speed, vz: dirZ * speed, vy: 0,
      dist: 0, range, dmg, aoe: opts.aoe || 0, hitR: opts.hitR || 2.5, slow: opts.slow, slowDur: opts.slowDur, stun: opts.stun, silence: opts.silence,
      hit: new Set(), pierce: opts.pierce || false, alive: true, trailT: 0, isAbility: true, onExplode: opts.onExplode,
    });
  }

  /** Homing missile / torpedo. */
  homing(owner, model, p0, target, speed, dmg, opts = {}) {
    const vis = VIS[model];
    const vertical = model === 'missile';
    const a = opts.launchYaw ?? owner.yaw;
    this.list.push({
      type: 'homing', model, vis, owner, team: owner.team, target,
      x: p0.x, y: vis.water ? -0.25 : p0.y + 1, z: p0.z,
      vx: vertical ? rnd(-3, 3) : Math.sin(a) * speed * 0.6, vy: vertical ? speed * 0.55 : 0, vz: vertical ? rnd(-3, 3) : Math.cos(a) * speed * 0.6,
      speed, turn: opts.turn || 3.2, dmg, aoe: opts.aoe || 0, life: opts.life || 5, t: 0, lastX: target.x, lastZ: target.z,
      alive: true, trailT: 0, isAbility: true, boost: vertical ? 0.35 : 0,
    });
  }

  /** Strike from the sky (hypersonic glide vehicle / bomb). */
  skyStrike(owner, model, x, z, delay, dmg, radius) {
    const vis = VIS[model];
    const y0 = 260, off = 180;
    const a = Math.random() * 6.28;
    this.list.push({
      type: 'ballistic', model, vis, owner, team: owner.team,
      x0: x + Math.cos(a) * off, y0, z0: z + Math.sin(a) * off, x1: x, z1: z, T: delay, t: 0, arc: 0,
      dmg, aoe: radius, hitR: 0, alive: true, x, y: y0, z, trailT: 0, isAbility: true, mega: model === 'hypersonic', splashScale: radius / 10,
    });
  }

  addMine(owner, x, z, dmg, radius, life) {
    if (this.mines.length > 110) this.mines.shift();
    this.mines.push({ owner, team: owner.team, x, z, dmg, radius, life, t: 0, arm: 0.8 });
  }

  // ------------------------------------------------------------------ gun helpers
  muzzleWorld(rig, obj, out) { obj.getWorldPosition(out); return out; }

  aimTurrets(unit, target) {
    const rig = unit.rig;
    if (!rig || !rig.turrets) return;
    const want = Math.atan2(target.x - unit.x, target.z - unit.z) - unit.yaw;
    for (const t of rig.turrets) t.pivot.rotation.y = Math.atan2(Math.sin(want), Math.cos(want));
  }

  /** Pick muzzles facing the target. */
  pickMuzzles(unit, target, n) {
    const rig = unit.rig;
    const out = [];
    const rel = Math.atan2(target.x - unit.x, target.z - unit.z) - unit.yaw;
    const side = Math.sin(rel) >= 0 ? 1 : -1; // +1 = starboard? (local +X)
    if (rig.turrets && rig.turrets.length) {
      this.aimTurrets(unit, target);
      rig.root.updateMatrixWorld(true);
      const all = rig.turrets.flatMap((t) => t.muzzles);
      for (let i = 0; i < n; i++) out.push(all[(unit.salvoIdx = ((unit.salvoIdx || 0) + 1)) % all.length]);
    } else if (rig.broadside && rig.broadside.length) {
      const sideM = rig.broadside.filter((m) => (m.userData.side ?? Math.sign(m.position.x || 1)) === side);
      const pool = sideM.length ? sideM : rig.broadside;
      for (let i = 0; i < n; i++) out.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return out;
  }

  fireGuns(hero, target) {
    const G = this.G;
    const g = hero.hull.guns;
    const muzzles = this.pickMuzzles(hero, target, g.count);
    const aim = hero.aimSkill ?? 0.92;
    for (let i = 0; i < g.count; i++) {
      this.after(i * 0.09, () => {
        if (!hero.alive || !target.alive) return;
        const m = muzzles[i];
        if (m) m.getWorldPosition(_p); else _p.set(hero.x, 3, hero.z);
        const crit = target.isShip && Math.random() < 0.1;
        const dmg = g.dmg * hero.dmgMul * (crit ? 1.75 : 1);
        _dir.set(target.x - _p.x, 0, target.z - _p.z).normalize();
        if (g.kind === 'laser') {
          const hitP = new THREE.Vector3(target.x, 3, target.z);
          G.fx.beam(_p, hitP, G.teamGlow(hero.team), 1.1, 0.22);
          G.fx.hitSpark(hitP, 0.8, [1.2, 1.8, 3]);
          G.fx.muzzle(_p, _dir, 0.6, 'laser');
          G.audio.play('laser', { x: hero.x, z: hero.z, vol: 0.5 });
          this.damage(target, dmg, hero, { crit });
          return;
        }
        const d = Math.hypot(target.x - _p.x, target.z - _p.z);
        const T = d / g.speed;
        const lead = aim;
        const scatter = d * 0.035 * (1.2 - aim) * (1 + (G.storm || 0) * 0.8) + (G.storm ? 1.5 : 0);
        const x1 = target.x + (target.vx || 0) * T * lead + rnd(-scatter, scatter);
        const z1 = target.z + (target.vz || 0) * T * lead + rnd(-scatter, scatter);
        this.ballistic(hero, g.kind, _p.clone(), x1, z1, g.speed, dmg, { crit, hitR: 2.5 });
        G.fx.muzzle(_p, _dir, g.kind === 'ball' ? 1.1 : g.kind === 'flak' ? 0.7 : 1.3, g.kind);
        if (hero.isPlayer && g.kind !== 'flak') G.fx.shake(0.05 + hero.age * 0.012, hero.x, hero.z);
        G.audio.play(VIS[g.kind].snd, { x: _p.x, z: _p.z, vol: 0.55, era: hero.age });
        // Carrier flak is a real anti-air gun: each burst can swat a nearby enemy drone or missile
        if (g.kind === 'flak' && Math.random() < 0.55) G.drones.shootDown(hero.team, hero.x, hero.z, 42, 1) + this.interceptNear(hero.team, hero.x, hero.z, 42, 1);
      });
    }
  }

  fireCreep(c, target) {
    const G = this.G;
    _p.set(c.x + Math.sin(c.yaw) * 2, 2.5, c.z + Math.cos(c.yaw) * 2);
    _dir.set(target.x - c.x, 0, target.z - c.z).normalize();
    if (c.gunKind === 'laser') {
      G.fx.beam(_p, new THREE.Vector3(target.x, 3, target.z), G.teamGlow(c.team), 0.6, 0.15);
      this.damage(target, c.dmg, c);
      if (Math.random() < 0.3) G.audio.play('laser', { x: c.x, z: c.z, vol: 0.25 });
      return;
    }
    const d = c.dist(target);
    const speed = 100;
    const T = d / speed;
    this.ballistic(c, c.gunKind === 'ball' ? 'ball' : c.gunKind === 'pulse' ? 'pulse' : 'shell', _p.clone(),
      target.x + (target.vx || 0) * T * 0.7 + rnd(-2, 2) * (G.storm ? 3 : 1), target.z + (target.vz || 0) * T * 0.7 + rnd(-2, 2) * (G.storm ? 3 : 1), speed, c.dmg, { hitR: 2.5, splashScale: 0.6 });
    G.fx.muzzle(_p, _dir, 0.6, c.gunKind);
    if (Math.random() < 0.35) G.audio.play(c.gunKind === 'ball' ? 'cannon' : 'cannonHeavy', { x: c.x, z: c.z, vol: 0.3, era: c.era });
  }

  fireStructure(s, target) {
    const G = this.G;
    const m = s.rig.turret && s.rig.turret.muzzles[0];
    if (m) m.getWorldPosition(_p); else _p.set(s.x, 20, s.z);
    const dmg = s.def.dmg * (1 + G.structureScale * 0.5);
    if (s.era >= 4) {
      this.homing(s, 'missile', _p.clone(), target, 120, dmg, { aoe: 4, turn: 5 });
      G.audio.play('missile', { x: s.x, z: s.z, vol: 0.6 });
    } else {
      const d = Math.hypot(target.x - _p.x, target.z - _p.z);
      const T = d / 120;
      const ss = G.storm ? d * 0.06 : 0; // squall: fort gunners lose their aim too (ambush window)
      this.ballistic(s, 'shell_big', _p.clone(), target.x + (target.vx || 0) * T * 0.95 + rnd(-ss, ss), target.z + (target.vz || 0) * T * 0.95 + rnd(-ss, ss), 120, dmg, { hitR: 4, splashScale: 1.2 });
      _dir.set(target.x - s.x, 0.3, target.z - s.z).normalize();
      G.fx.muzzle(_p, _dir, 1.6, 'shell');
      G.audio.play('cannonHeavy', { x: s.x, z: s.z, vol: 0.8 });
    }
  }

  // ------------------------------------------------------------------ impact
  impact(p, x, z) {
    const G = this.G;
    const y = sampleWaves(x, z, G.time, _w).y;
    if (p.aoe > 0) {
      const n = this.splashDamage(x, z, p.aoe, p.dmg, p.team, p.owner, { crit: p.crit, stun: p.stun, slow: p.slow, slowDur: p.slowDur, silence: p.silence, falloff: p.mega });
      if (p.mega) { G.fx.megaExplosion(new THREE.Vector3(x, y, z), p.aoe); G.audio.play('explosionBig', { x, z, vol: 1.3 }); }
      else if (p.model === 'emp') { G.fx.emp(x, z, p.aoe); G.audio.play('emp', { x, z }); }
      else {
        G.fx.explosion(new THREE.Vector3(x, y, z), Math.max(0.7, p.aoe / 9) * (p.splashScale || 1));
        G.audio.play(p.aoe > 11 ? 'explosionBig' : 'explosion', { x, z, vol: n ? 1 : 0.7 });
      }
      return;
    }
    // direct hit test
    let best = null, bd = Infinity;
    for (const u of G.units) {
      if (!u.alive || u.team === p.team || u.untargetable > 0 && u.kind === 'hero') continue;
      const r = p.hitR + u.radius;
      const d2 = (u.x - x) ** 2 + (u.z - z) ** 2;
      if (d2 < r * r && d2 < bd) { bd = d2; best = u; }
    }
    if (best) {
      this.damage(best, p.dmg, p.owner, { crit: p.crit });
      if (p.slow) { best.slow = p.slow; best.slowT = p.slowDur; }
      const hp = new THREE.Vector3(x, Math.max(y + 2, 2.5), z);
      if (p.crit) { G.fx.explosion(hp, 0.8, { water: false }); G.audio.play('explosion', { x, z, vol: 0.8 }); }
      else { G.fx.hitSpark(hp, p.model === 'shell_big' ? 1.3 : 0.9); G.audio.play('hit', { x, z, vol: 0.45 }); }
      if (best.kind !== 'hero' && best.kind !== 'creep' && p.model === 'shell_big') G.fx.explosion(hp, 0.9, { water: false });
    } else {
      G.fx.splash(x, z, (p.model === 'shell_big' ? 1.3 : 0.85) * (p.splashScale || 1));
      if (Math.random() < 0.5) G.audio.play('splash', { x, z, vol: 0.35 });
    }
  }

  // ------------------------------------------------------------------ update
  update(dt) {
    const G = this.G;
    for (let i = this.timers.length - 1; i >= 0; i--) {
      const t = this.timers[i];
      t.t -= dt;
      if (t.t <= 0) { this.timers.splice(i, 1); t.fn(); }
    }
    const counts = { ball: 0, shell: 0, torpedo: 0, missile: 0, hypersonic: 0, emp: 0 };
    for (let i = this.list.length - 1; i >= 0; i--) {
      const p = this.list[i];
      if (!p.alive) { this.list.splice(i, 1); continue; }
      if (p.type === 'ballistic') this.stepBallistic(p, dt);
      else if (p.type === 'straight') this.stepStraight(p, dt);
      else this.stepHoming(p, dt);
      if (!p.alive) { this.list.splice(i, 1); continue; }
      // trail
      const v = p.vis;
      p.trailT -= dt;
      if (p.trailT <= 0) {
        p.trailT = 0.03;
        _p.set(p.x, p.y, p.z);
        if (v.glow) G.fx.trailGlow(_p, v.glow, v.glowSize, 0.16);
        if (v.smoke) G.fx.trailSmoke(_p, p.mega ? 3 : 1, 0.75, v.smoke * 0.5);
        if (v.water) G.ocean.decals.add(p.x, p.z, 2.2, 1.8, 0, 0.8, 1.5);
      }
      // render
      const key = v.mesh;
      const im = this.inst[key];
      if (!im) continue;
      const c = counts[key]++;
      if (c >= im.instanceMatrix.count) continue;
      _dir.set(p.vx ?? 0, p.vy ?? 0, p.vz ?? 0);
      if (_dir.lengthSq() < 1e-6) _dir.set(0, 0, 1);
      _q.setFromUnitVectors(_fwd, _dir.normalize());
      if (v.spin) _q.multiply(new THREE.Quaternion().setFromAxisAngle(_fwd, G.time * 20));
      _s.setScalar(v.scale);
      _m.compose(_p.set(p.x, p.y, p.z), _q, _s);
      im.setMatrixAt(c, _m);
    }
    for (const [k, im] of Object.entries(this.inst)) { im.count = counts[k] || 0; im.instanceMatrix.needsUpdate = true; }

    // mines
    let mc = 0;
    for (let i = this.mines.length - 1; i >= 0; i--) {
      const m = this.mines[i];
      m.t += dt;
      if (m.t > m.life) { this.mines.splice(i, 1); continue; }
      const y = sampleWaves(m.x, m.z, G.time, _w).y;
      if (m.t > m.arm) {
        let trig = false;
        for (const u of G.units) {
          if (!u.alive || u.team === m.team || !u.isShip) continue;
          if ((u.x - m.x) ** 2 + (u.z - m.z) ** 2 < (u.radius + 5) ** 2) { trig = true; break; }
        }
        if (trig) {
          this.splashDamage(m.x, m.z, m.radius, m.dmg, m.team, m.owner);
          G.fx.explosion(new THREE.Vector3(m.x, y, m.z), 1.4);
          G.audio.play('explosionBig', { x: m.x, z: m.z });
          this.mines.splice(i, 1);
          continue;
        }
        if (Math.sin(m.t * 6) > 0.9) G.fx.trailGlow(new THREE.Vector3(m.x, y + 1.2, m.z), m.team === 0 ? [0.5, 1.2, 3] : [3, 0.5, 0.3], 2.4, 0.2);
      }
      _m.makeTranslation(m.x, y + 0.2, m.z);
      this.mineMesh.setMatrixAt(mc++, _m);
    }
    this.mineMesh.count = mc;
    this.mineMesh.instanceMatrix.needsUpdate = true;
  }

  stepBallistic(p, dt) {
    p.t += dt;
    const k = Math.min(1, p.t / p.T);
    const nx = p.x0 + (p.x1 - p.x0) * k;
    const nz = p.z0 + (p.z1 - p.z0) * k;
    const baseY = p.y0 * (1 - k);
    const ny = baseY + 4 * p.arc * k * (1 - k);
    p.vx = (nx - p.x) / dt; p.vy = (ny - p.y) / dt; p.vz = (nz - p.z) / dt;
    p.x = nx; p.y = ny; p.z = nz;
    if (k >= 1) { p.alive = false; this.impact(p, p.x1, p.z1); }
  }

  stepStraight(p, dt) {
    const G = this.G;
    p.x += p.vx * dt; p.z += p.vz * dt;
    p.dist += Math.hypot(p.vx, p.vz) * dt;
    if (p.vis.water) p.y = sampleWaves(p.x, p.z, G.time, _w).y - 0.3;
    for (const u of G.units) {
      if (!u.alive || u.team === p.team || p.hit.has(u.id)) continue;
      if (u.kind === 'hero' && u.untargetable > 0 && !p.aoe) continue;
      const r = p.hitR + u.radius;
      if ((u.x - p.x) ** 2 + (u.z - p.z) ** 2 < r * r) {
        if (p.aoe) { p.alive = false; this.impact(p, p.x, p.z); return; }
        p.hit.add(u.id);
        this.damage(u, p.dmg, p.owner);
        if (p.slow) { u.slow = p.slow; u.slowT = p.slowDur; }
        if (p.stun) u.stun = Math.max(u.stun, p.stun);
        const hp = new THREE.Vector3(p.x, 3, p.z);
        if (p.model === 'torpedo') { G.fx.explosion(hp, 1.3); G.fx.splash(p.x, p.z, 2.2); G.audio.play('explosionBig', { x: p.x, z: p.z }); }
        else { G.fx.hitSpark(hp, 1.1); G.audio.play('hit', { x: p.x, z: p.z, vol: 0.6 }); }
        if (!p.pierce) { p.alive = false; return; }
      }
    }
    if (p.dist >= p.range) {
      p.alive = false;
      if (p.aoe) this.impact(p, p.x, p.z);
      else G.fx.splash(p.x, p.z, p.model === 'torpedo' ? 1.2 : 0.8);
    }
    for (const o of G.obstacles) if ((p.x - o.x) ** 2 + (p.z - o.z) ** 2 < o.r * o.r) {
      p.alive = false;
      G.fx.explosion(new THREE.Vector3(p.x, 2, p.z), 0.8, { water: false });
      return;
    }
  }

  stepHoming(p, dt) {
    const G = this.G;
    p.t += dt;
    if (p.target && p.target.alive) { p.lastX = p.target.x; p.lastZ = p.target.z; }
    const water = p.vis.water;
    const ty = water ? -0.25 : 2.5;
    let desired;
    if (p.boost > 0) { p.boost -= dt; desired = _dir.set(p.vx * 0.2, p.speed, p.vz * 0.2); }
    else desired = _dir.set(p.lastX - p.x, (ty - p.y) * (water ? 0 : 1) + (water ? 0 : Math.min(20, Math.hypot(p.lastX - p.x, p.lastZ - p.z) * 0.15)), p.lastZ - p.z);
    desired.normalize().multiplyScalar(p.speed);
    const k = Math.min(1, p.turn * dt * (p.boost > 0 ? 3 : 1));
    p.vx += (desired.x - p.vx) * k; p.vy += (desired.y - p.vy) * k; p.vz += (desired.z - p.vz) * k;
    p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
    if (water) p.y = sampleWaves(p.x, p.z, G.time, _w).y - 0.3;
    const tr = (p.target && p.target.alive ? p.target.radius : 2) + 1.5;
    const d2 = (p.lastX - p.x) ** 2 + (p.lastZ - p.z) ** 2;
    if ((d2 < tr * tr && (water || p.y < 8)) || p.t > p.life || (!water && p.y < -0.5)) {
      p.alive = false;
      if (p.aoe) { this.impact(p, p.x, p.z); return; }
      if (p.target && p.target.alive && d2 < tr * tr * 2) this.damage(p.target, p.dmg, p.owner);
      const hp = new THREE.Vector3(p.x, Math.max(2, p.y), p.z);
      G.fx.explosion(hp, water ? 1.3 : 1.0);
      G.audio.play(water ? 'explosionBig' : 'explosion', { x: p.x, z: p.z, vol: 0.8 });
    }
  }

  /** Point defense: destroy enemy projectiles + drones near (x,z). Returns count. */
  interceptNear(team, x, z, radius, max = 3) {
    const G = this.G;
    let n = 0;
    for (const p of this.list) {
      if (n >= max) break;
      if (!p.alive || p.team === team || p.type !== 'homing' && p.model !== 'hypersonic') continue;
      if ((p.x - x) ** 2 + (p.z - z) ** 2 < radius * radius) {
        p.alive = false; n++;
        const pos = new THREE.Vector3(p.x, p.y, p.z);
        G.fx.hitSpark(pos, 1.0, [3, 2, 1]);
        G.fx.beam(new THREE.Vector3(x, 6, z), pos, team === 0 ? 0x66ccff : 0xff6644, 0.5, 0.12);
      }
    }
    return n;
  }
}

export { VIS };
