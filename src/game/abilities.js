import * as THREE from 'three';
import { sampleWaves } from '../render/waves.js';

const _p = new THREE.Vector3();
const _w = { y: 0 };
import { srand } from '../core/rng.js';
import { simWorldPos } from './units.js';
const vrnd = (a, b) => a + Math.random() * (b - a); // presentation-only dice (particles): never part of the seeded stream
const rnd = (a, b) => a + srand() * (b - a); // seeded: every ability roll replays identically on all peers

/** Muzzle/launch world position for abilities. */
function launchPos(h, out = new THREE.Vector3()) {
  const r = h.rig;
  if (r && r.launch) simWorldPos(h, r.launch, out);
  else out.set(h.x, 4, h.z);
  return out;
}
function gunPos(h, out = new THREE.Vector3()) {
  const r = h.rig;
  const m = r && (r.turrets?.[0]?.muzzles?.[0] || r.broadside?.[0]);
  if (m) simWorldPos(h, m, out); else out.set(h.x + Math.sin(h.yaw) * 6, 4, h.z + Math.cos(h.yaw) * 6);
  return out;
}
function enemiesInRange(G, h, range, filter = () => true) {
  return G.units.filter((u) => u.alive && u.team !== h.team && u.targetable && h.dist(u) <= range + u.radius && !(u.invulnerable) && filter(u))
    .sort((a, b) => (a.kind === 'hero' ? 0 : 1) - (b.kind === 'hero' ? 0 : 1) || h.dist2(a) - h.dist2(b));
}

export function canCast(h, i) {
  const ab = h.abilities[i];
  if (!h.alive || h.stun > 0 || h.silence > 0 || h.cds[i] > 0) return false;
  if (ab.minLevel && h.level < ab.minLevel) return false;
  return true;
}

/** Cast ability index i at world aim point (ax, az). Returns true if cast. */
export function cast(G, h, i, ax, az) {
  if (!canCast(h, i)) return false;
  const ab = h.abilities[i];
  const dm = h.dmgMul;
  let dx = ax - h.x, dz = az - h.z;
  let dist = Math.hypot(dx, dz) || 1;
  dx /= dist; dz /= dist;
  if (ab.target === 'point' && dist > ab.range) { ax = h.x + dx * ab.range; az = h.z + dz * ab.range; dist = ab.range; }

  switch (ab.type) {
    case 'projectile': {
      const p0 = gunPos(h);
      const n = ab.count;
      for (let k = 0; k < n; k++) {
        const off = n > 1 ? (k / (n - 1) - 0.5) * ab.spread : 0;
        const jitter = ab.model === 'ball' && n > 3 ? rnd(-0.05, 0.05) : 0;
        const a = Math.atan2(dx, dz) + off + jitter;
        G.combat.straight(h, ab.model, p0.clone(), Math.sin(a), Math.cos(a), ab.speed * (n > 3 ? rnd(0.85, 1.1) : 1), ab.range, ab.dmg * dm, {
          aoe: ab.model === 'shell_big' || ab.model === 'emp' ? ab.radius : 0, hitR: ab.radius > 6 ? 3 : ab.radius,
          slow: ab.slow, slowDur: ab.slowDur, stun: ab.stun, silence: ab.model === 'emp' ? ab.stun : 0,
        });
      }
      G.fx.muzzle(p0, new THREE.Vector3(dx, 0.1, dz), ab.model === 'torpedo' ? 0.8 : 1.6, ab.model === 'emp' ? 'laser' : 'ball');
      G.audio.play(ab.model === 'torpedo' ? 'torpedoLaunch' : ab.model === 'emp' ? 'droneLaunch' : n > 3 ? 'cannon' : 'cannonHeavy', { x: h.x, z: h.z, vol: 1 });
      if (n > 3) G.audio.play('cannon', { x: h.x, z: h.z, vol: 0.8, pitch: 0.8 });
      break;
    }
    case 'barrage': {
      const isHyper = ab.model === 'hypersonic';
      if (isHyper) {
        G.combat.skyStrike(h, 'hypersonic', ax, az, ab.delay, ab.dmg * dm, ab.radius);
        (G.dangers ||= []).push({ x: ax, z: az, r: ab.radius * 1.2 + 4, team: h.team, until: G.time + ab.delay + 0.2 });
        const hostileH = G.player && h.team !== G.player.team;
        G.fx.ring(ax, az, ab.radius, ab.radius, hostileH ? 0xff8a00 : G.teamGlow(h.team), ab.delay, 0.05);
        G.fx.ring(ax, az, ab.radius * 1.2, 2, hostileH ? 0xffb050 : 0xffffff, ab.delay, 0.08);
        G.audio.play('missile', { x: h.x, z: h.z, vol: 1.2, pitch: 0.7 });
        G.audio.play('hypersonic', { x: ax, z: az, vol: 1 });
      } else {
        const p0 = gunPos(h);
        (G.dangers ||= []).push({ x: ax, z: az, r: ab.area + ab.radius + 4, team: h.team, until: G.time + ab.delay + ab.spreadTime + 0.2 }); // bots read these and dodge
        const hostile = G.player && h.team !== G.player.team; // enemy strike zones read as danger for the player
        G.fx.ring(ax, az, ab.area + 4, ab.area + 4, hostile ? 0xff8a00 : G.teamGlow(h.team), ab.delay + ab.spreadTime, hostile ? 0.07 : 0.04);
        for (let k = 0; k < ab.count; k++) {
          G.combat.after((k / ab.count) * ab.spreadTime, () => {
            if (!h.alive) return;
            const a = srand() * 6.283, r = Math.sqrt(srand()) * ab.area;
            const x1 = ax + Math.cos(a) * r, z1 = az + Math.sin(a) * r;
            gunPos(h, _p);
            const d = Math.hypot(x1 - _p.x, z1 - _p.z);
            const speed = d / ab.delay;
            G.combat.ballistic(h, ab.model, _p.clone(), x1, z1, speed, ab.dmg * dm, { aoe: ab.radius, arc: d * 0.3 + 20 });
            G.fx.muzzle(_p, new THREE.Vector3(x1 - h.x, 0.5, z1 - h.z).normalize(), ab.model === 'shell_big' ? 1.8 : 1.2, ab.model === 'ball' ? 'ball' : 'shell');
            if (k % 2 === 0) G.audio.play(ab.model === 'ball' ? 'cannon' : 'cannonHeavy', { x: h.x, z: h.z, vol: 0.9 });
          });
        }
        G.fx.shake(0.15, h.x, h.z);
      }
      break;
    }
    case 'volley': {
      const targets = enemiesInRange(G, h, ab.range);
      if (!targets.length) return false;
      for (let k = 0; k < ab.count; k++) {
        G.combat.after((k / ab.count) * ab.spreadTime, () => {
          if (!h.alive) return;
          const t = targets[k % targets.length];
          if (!t.alive) return;
          const p0 = G.combat.pickMuzzles(h, t, 1)[0];
          if (p0) simWorldPos(h, p0, _p); else gunPos(h, _p);
          const d = Math.hypot(t.x - _p.x, t.z - _p.z);
          G.combat.ballistic(h, ab.model, _p.clone(), t.x + (t.vx || 0) * d / 130 + rnd(-3, 3), t.z + (t.vz || 0) * d / 130 + rnd(-3, 3), 130, ab.dmg * dm, { aoe: ab.radius });
          G.fx.muzzle(_p, new THREE.Vector3(t.x - h.x, 0.2, t.z - h.z).normalize(), 1.7, 'shell');
          if (k % 2 === 0) G.audio.play('cannonHeavy', { x: h.x, z: h.z, vol: 1 });
        });
      }
      G.fx.shake(0.4, h.x, h.z);
      break;
    }
    case 'homing': {
      const targets = enemiesInRange(G, h, ab.range);
      if (!targets.length) return false;
      for (let k = 0; k < ab.count; k++) {
        G.combat.after(k * (ab.model === 'missile' ? 0.08 : 0.12), () => {
          if (!h.alive) return;
          const t = targets[k % targets.length];
          if (!t.alive) return;
          launchPos(h, _p);
          _p.x += rnd(-3, 3); _p.z += rnd(-3, 3);
          G.combat.homing(h, ab.model, _p.clone(), t, ab.speed, ab.dmg * dm, { aoe: ab.radius, turn: ab.model === 'torpedo' ? 2.2 : 3.4, life: 6, launchYaw: h.yaw + (k % 2 ? 1 : -1) * 0.6 });
          if (ab.model === 'missile') G.fx.muzzle(_p, new THREE.Vector3(0, 1, 0), 1.0, 'shell');
          G.audio.play(ab.model === 'missile' ? 'missile' : 'torpedoLaunch', { x: h.x, z: h.z, vol: 0.7 });
        });
      }
      if (ab.model === 'missile') G.audio.play('missileRipple', { x: h.x, z: h.z });
      break;
    }
    case 'buff': {
      const b = { t: 0, dur: ab.dur };
      if (ab.speedMul) { b.speedMul = ab.speedMul; G.audio.play('engineBoost', { x: h.x, z: h.z, variant: h.age <= 2 ? 'steam' : undefined }); }
      if (ab.dmgTaken) b.dmgTaken = ab.dmgTaken;
      if (ab.healPct) { b.healPerSec = (h.maxHp * ab.healPct) / ab.dur; G.audio.play('heal', { x: h.x, z: h.z }); }
      if (ab.shield) {
        h.shield = ab.shield * h.lvlMul; h.shieldT = ab.dur;
        G.audio.play('shield', { x: h.x, z: h.z });
        if (ab.drones) G.drones.launch(h, 'shield', ab.drones, h.x, h.z, { dur: ab.dur, orbitR: h.radius + 6 });
      }
      h.buffs.push(b);
      G.fx.ring(h.x, h.z, h.radius, h.radius * 3, ab.healPct ? 0x60ff90 : ab.shield ? 0x66ccff : 0xffffff, 0.6, 0.08);
      if (ab.speedMul) h.boostFx = ab.dur;
      break;
    }
    case 'dash': {
      h.dash = { t: 0, dur: 0.55, dx, dz, speed: ab.range / 0.55, dmg: ab.dmg * dm, stun: ab.stun, hit: new Set(), radius: ab.radius };
      G.audio.play('engineBoost', { x: h.x, z: h.z, pitch: 0.8, variant: 'steam' });
      break;
    }
    case 'smoke': {
      G.smokes.push({ x: h.x, z: h.z, r: ab.radius, t: 0, dur: ab.dur, team: h.team });
      for (let k = 0; k < 50; k++) {
        const a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * ab.radius;
        G.fx.p.alpha.emit({ x: h.x + Math.cos(a) * r, y: vrnd(1, 6), z: h.z + Math.sin(a) * r, vx: vrnd(-1, 1), vy: vrnd(0.3, 1.2), vz: vrnd(-1, 1),
          life: ab.dur + vrnd(0, 1.5), s0: 8, s1: vrnd(18, 26), r: 0.72, g: 0.74, b: 0.76, a0: 0.8, a1: 0, kind: 1, drag: 0.5 });
      }
      G.audio.play('smoke', { x: h.x, z: h.z });
      break;
    }
    case 'mines': {
      for (let k = 0; k < ab.count; k++) {
        G.combat.after(k * 0.22, () => {
          if (!h.alive) return;
          const bx = h.x - Math.sin(h.yaw) * (h.radius + 3) + rnd(-3, 3), bz = h.z - Math.cos(h.yaw) * (h.radius + 3) + rnd(-3, 3);
          G.combat.addMine(h, bx, bz, ab.dmg * dm, ab.radius, ab.dur);
          G.fx.splash(bx, bz, 0.5);
          G.audio.play('mineDrop', { x: bx, z: bz, vol: 0.6 });
        });
      }
      break;
    }
    case 'swarm': {
      const tx = ab.target === 'point' ? ax : h.x, tz = ab.target === 'point' ? az : h.z;
      G.drones.launch(h, ab.drone, ab.count, tx, tz, { dur: ab.dur, dmg: ab.dmg, radius: ab.radius || 5, fireCd: ab.fireCd });
      if (ab.extra) G.drones.launch(h, ab.extra.drone, ab.extra.count, tx, tz, { dur: ab.dur, dmg: 220, radius: 15 });
      if (ab.count >= 20) G.fx.shake(0.12, h.x, h.z);
      break;
    }
    case 'beam': {
      // 0.3 s charge: a thin targeting line telegraphs the lane so the slug can be dodged
      const c0 = gunPos(h), cTo = new THREE.Vector3(h.x + dx * ab.range, 3, h.z + dz * ab.range);
      G.fx.beam(c0, cTo, 0xff6a50, 0.5, 0.32);
      G.audio.play('shield', { x: h.x, z: h.z, vol: 0.5, pitch: 1.8 });
      G.combat.after(0.3, () => {
      if (!h.alive) return;
      const p0 = gunPos(h);
      const to = new THREE.Vector3(h.x + dx * ab.range, 3, h.z + dz * ab.range);
      // damage everything along the line
      for (const u of G.units) {
        if (!u.alive || u.team === h.team) continue;
        const rx = u.x - h.x, rz = u.z - h.z;
        const t = rx * dx + rz * dz;
        if (t < 0 || t > ab.range) continue;
        const perp = Math.abs(rx * dz - rz * dx);
        if (perp < ab.width + u.radius) {
          G.combat.damage(u, ab.dmg * dm, h);
          G.fx.hitSpark(new THREE.Vector3(u.x, 3, u.z), 1.6, [0.8, 1.6, 3]);
        }
      }
      G.fx.beam(p0, to, G.teamGlow(h.team), 3.2, 0.5);
      G.fx.beam(p0, to, 0xffffff, 1.0, 0.25);
      for (let s = 0; s < 30; s++) {
        const k = s / 30;
        G.fx.p.add.emit({ x: p0.x + (to.x - p0.x) * k, y: 3 + vrnd(-1, 1), z: p0.z + (to.z - p0.z) * k, vx: vrnd(-4, 4), vy: vrnd(0, 6), vz: vrnd(-4, 4), life: vrnd(0.3, 0.7), s0: 1.2, s1: 0.1, r: 0.8, g: 1.6, b: 3, a0: 1, a1: 0, kind: 2 });
        if (s % 3 === 0) G.ocean.decals.add(p0.x + (to.x - p0.x) * k, p0.z + (to.z - p0.z) * k, 5, 2, 0, 0.8, 1);
      }
      G.fx.muzzle(p0, new THREE.Vector3(dx, 0, dz), 2.2, 'laser');
      G.renderer.shockwave(p0, 0.8, 0.4);
      G.fx.shake(0.3, h.x, h.z);
      });
      G.audio.play('rail', { x: h.x, z: h.z, vol: 1.2 });
      h.pushX = -dx * 18; h.pushZ = -dz * 18; // recoil
      break;
    }
    case 'pointdefense': {
      h.pd = { t: 0, dur: ab.dur, radius: ab.radius, laser: !!ab.laser, tick: 0 };
      G.audio.play(ab.laser ? 'laser' : 'flak', { x: h.x, z: h.z, vol: 1 });
      G.fx.ring(h.x, h.z, ab.radius, ab.radius, ab.laser ? 0x66ddff : 0xffcc66, ab.dur, 0.03);
      break;
    }
    default: return false;
  }
  h.cds[i] = ab.cd * h.cdMul;
  G.events.emit('cast', { hero: h, ability: ab, x: ax, z: az });
  return true;
}

/** Per-frame ongoing ability effects on a hero (dash, point defense, boost fx). */
export function updateHeroEffects(G, h, dt) {
  if (h.dash) {
    const d = h.dash;
    d.t += dt;
    h.pushX = d.dx * d.speed; h.pushZ = d.dz * d.speed;
    h.yaw = Math.atan2(d.dx, d.dz);
    for (const u of G.units) {
      if (!u.alive || u.team === h.team || d.hit.has(u.id) || !u.isShip) continue;
      if (h.dist(u) < h.radius + u.radius + 2) {
        d.hit.add(u.id);
        G.combat.damage(u, d.dmg, h);
        u.stun = Math.max(u.stun, d.stun);
        u.pushX = d.dx * 30; u.pushZ = d.dz * 30;
        G.fx.explosion(new THREE.Vector3((h.x + u.x) / 2, 3, (h.z + u.z) / 2), 0.9, { water: false });
        G.audio.play('ram', { x: u.x, z: u.z });
        G.fx.shake(0.35, u.x, u.z);
      }
    }
    // bow spray
    for (let k = 0; k < 3; k++) G.fx.p.alpha.emit({ x: h.x + d.dx * h.radius, y: 1, z: h.z + d.dz * h.radius, vx: vrnd(-8, 8), vy: vrnd(6, 14), vz: vrnd(-8, 8), life: 0.8, s0: 2, s1: 5, r: 0.95, g: 0.97, b: 1, a0: 0.8, a1: 0, kind: 3, grav: 20 });
    if (d.t >= d.dur) { h.dash = null; }
  }
  if (h.pd) {
    const p = h.pd;
    p.t += dt; p.tick -= dt;
    if (p.tick <= 0) {
      p.tick = 0.12;
      const n = G.drones.shootDown(h.team, h.x, h.z, p.radius, p.laser ? 4 : 3) + G.combat.interceptNear(h.team, h.x, h.z, p.radius, 2);
      if (n && Math.random() < 0.5) G.audio.play(p.laser ? 'laser' : 'flak', { x: h.x, z: h.z, vol: 0.5 });
      if (!p.laser) for (let k = 0; k < 3; k++) {
        const a = Math.random() * 6.283, r = vrnd(10, p.radius);
        const pos = new THREE.Vector3(h.x + Math.cos(a) * r, vrnd(10, 22), h.z + Math.sin(a) * r);
        G.fx.p.add.emit({ x: pos.x, y: pos.y, z: pos.z, life: 0.1, s0: 3, s1: 5, r: 2.5, g: 1.8, b: 0.8, a0: 1, a1: 0 });
        G.fx.p.alpha.emit({ x: pos.x, y: pos.y, z: pos.z, life: 1.4, s0: 2, s1: 5, r: 0.2, g: 0.2, b: 0.2, a0: 0.6, a1: 0, kind: 1 });
      }
    }
    if (p.t >= p.dur) h.pd = null;
  }
  if (h.boostFx > 0) {
    h.boostFx -= dt;
    const bx = h.x + Math.sin(h.yaw) * h.rig.length * 0.45, bz = h.z + Math.cos(h.yaw) * h.rig.length * 0.45;
    if (G.chance(1, dt)) G.fx.p.alpha.emit({ x: bx, y: 0.8, z: bz, vx: Math.cos(h.yaw) * vrnd(-9, 9), vy: vrnd(4, 9), vz: -Math.sin(h.yaw) * vrnd(-9, 9), life: 0.7, s0: 1.5, s1: 4, r: 0.95, g: 0.97, b: 1, a0: 0.7, a1: 0, kind: 3, grav: 18 });
  }
  // shield bubble shimmer
  if (h.shield > 0 && G.pulse(3)) {
    const a = Math.random() * 6.283, e = vrnd(0, 1.4), r = h.radius + 4;
    G.fx.p.add.emit({ x: h.x + Math.cos(a) * Math.cos(e) * r, y: 3 + Math.sin(e) * r * 0.6, z: h.z + Math.sin(a) * Math.cos(e) * r, life: 0.4, s0: 2.4, s1: 0.5, r: 0.4, g: 1.0, b: 2.2, a0: 0.8, a1: 0 });
  }
  if (h.shieldWas > 0 && h.shield <= 0) G.drones.popShields(h);
  h.shieldWas = h.shield;
}
