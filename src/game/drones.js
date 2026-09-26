import * as THREE from 'three';
import { getDroneAssets } from '../render/models/smallModels.js';
import { sampleWaves } from '../render/waves.js';

// Autonomous aircraft & drone swarms. Hundreds of agents, one instanced
// draw call per type, team-tinted via instanceColor.
//   micro   - kamikaze quad-drones with boids-style swarm motion
//   fighter - strafing aircraft that orbit and gun targets
//   bomber  - dive bombers that release a bomb over the target point
//   shield  - orbit their owner; visual for Aegis shields

const CAP = { micro: 900, fighter: 220, bomber: 90, shield: 60 };
const SPEED = { micro: 64, fighter: 62, bomber: 50, shield: 0 };
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(1, 1, 1), _p = new THREE.Vector3();
const _d = new THREE.Vector3(), _fwd = new THREE.Vector3(0, 0, 1), _up = new THREE.Vector3(0, 1, 0), _e = new THREE.Euler(0, 0, 0, 'YXZ');
const _w = { y: 0 };
const rnd = (a, b) => a + Math.random() * (b - a);

export class Drones {
  constructor(G) {
    this.G = G;
    this.list = [];
    this.inst = {};
    const assets = getDroneAssets();
    for (const k of Object.keys(CAP)) {
      const a = assets[k];
      const im = new THREE.InstancedMesh(a.geometry, a.material, CAP[k]);
      im.count = 0; im.frustumCulled = false; im.castShadow = k !== 'micro';
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      im.setColorAt(0, new THREE.Color(1, 1, 1));
      G.scene.add(im);
      this.inst[k] = im;
    }
    this.teamCol = [new THREE.Color(0.55, 0.8, 1.2), new THREE.Color(1.25, 0.55, 0.45)];
  }

  get activeCount() { return this.list.length; }

  launch(owner, type, count, tx, tz, opts = {}) {
    const G = this.G;
    const rig = owner.rig;
    if (rig && rig.launch) rig.launch.getWorldPosition(_p); else _p.set(owner.x, 6, owner.z);
    for (let i = 0; i < count; i++) {
      const delay = type === 'micro' ? i * 0.025 : i * 0.12;
      this.list.push({
        type, owner, team: owner.team, x: _p.x + rnd(-2, 2), y: _p.y + rnd(0, 2), z: _p.z + rnd(-2, 2),
        vx: Math.sin(owner.yaw) * 10 + rnd(-6, 6), vy: type === 'micro' ? rnd(14, 24) : 8, vz: Math.cos(owner.yaw) * 10 + rnd(-6, 6),
        tx, tz, t: -delay, life: opts.dur || 10, dmg: opts.dmg || 20, radius: opts.radius || 5, fireCd: opts.fireCd || 0.4, gunT: rnd(0, 0.4),
        target: null, phase: Math.random() * 6.28, alt: type === 'micro' ? rnd(7, 16) : type === 'bomber' ? 34 : rnd(16, 26),
        dropped: false, alive: true, hp: type === 'bomber' ? 3 : type === 'fighter' ? 2 : 1, bank: 0, idx: i, orbitR: opts.orbitR || 12,
      });
    }
    G.audio.play('droneLaunch', { x: owner.x, z: owner.z, vol: Math.min(1.2, 0.5 + count * 0.02) });
  }

  /** Point defense/flak: kill up to `max` enemy drones in radius. */
  shootDown(team, x, z, radius, max) {
    const G = this.G;
    let n = 0;
    for (const d of this.list) {
      if (n >= max) break;
      if (!d.alive || d.team === team || d.t < 0 || d.type === 'shield') continue;
      if ((d.x - x) ** 2 + (d.z - z) ** 2 < radius * radius) {
        d.hp--;
        n++;
        const pos = new THREE.Vector3(d.x, d.y, d.z);
        G.fx.beam(new THREE.Vector3(x, 7, z), pos, team === 0 ? 0x88ddff : 0xff8866, 0.35, 0.1);
        if (d.hp <= 0) { d.alive = false; G.fx.hitSpark(pos, 0.7, [3, 2, 0.8]); G.fx.spawnDebris(pos, 0.3); }
      }
    }
    return n;
  }

  /** Remove shield drones for an owner (when shield breaks / expires). */
  popShields(owner) {
    for (const d of this.list) if (d.type === 'shield' && d.owner === owner && d.alive) {
      d.alive = false;
      this.G.fx.hitSpark(new THREE.Vector3(d.x, d.y, d.z), 0.6, [0.6, 1.6, 3]);
    }
  }

  acquire(d, range) {
    const G = this.G;
    let best = null, bd = range * range;
    const cx = d.type === 'micro' ? (d.x + d.tx) * 0.5 : d.tx, cz = d.type === 'micro' ? (d.z + d.tz) * 0.5 : d.tz;
    for (const u of G.units) {
      if (!u.alive || u.team === d.team || (u.kind === 'hero' && u.untargetable > 0)) continue;
      if ((u.kind === 'tower' || u.kind === 'citadel') && u.invulnerable) continue;
      const d2 = (u.x - cx) ** 2 + (u.z - cz) ** 2;
      const w = u.kind === 'hero' ? 0.6 : 1; // prefer heroes
      if (d2 * w < bd) { bd = d2 * w; best = u; }
    }
    return best;
  }

  update(dt) {
    const G = this.G;
    const counts = { micro: 0, fighter: 0, bomber: 0, shield: 0 };
    let nearListener = 0;
    for (let i = this.list.length - 1; i >= 0; i--) {
      const d = this.list[i];
      if (!d.alive || (!d.owner.alive && d.type === 'shield')) { this.list.splice(i, 1); continue; }
      d.t += dt;
      if (d.t < 0) continue; // staggered launch
      if (d.t > d.life && d.type !== 'shield') {
        if (d.type === 'micro' && d.target && d.target.alive) { /* keep diving */ }
        else { d.alive = false; G.fx.hitSpark(_p.set(d.x, d.y, d.z), 0.4); this.list.splice(i, 1); continue; }
      }
      if (d.type === 'micro') this.stepMicro(d, dt);
      else if (d.type === 'fighter') this.stepFighter(d, dt);
      else if (d.type === 'bomber') this.stepBomber(d, dt);
      else this.stepShield(d, dt);
      if (!d.alive) { this.list.splice(i, 1); continue; }
      if ((d.x - G.listener.x) ** 2 + (d.z - G.listener.z) ** 2 < 180 * 180) nearListener++;

      // render
      const im = this.inst[d.type];
      const c = counts[d.type]++;
      if (c >= CAP[d.type]) continue;
      const yaw = Math.atan2(d.vx, d.vz);
      const hs = Math.hypot(d.vx, d.vz);
      const pitch = -Math.atan2(d.vy, hs + 1e-3);
      _e.set(pitch * 0.8, yaw, d.bank);
      _q.setFromEuler(_e);
      _s.setScalar((d.type === 'micro' ? 1.9 : d.type === 'fighter' ? 1.5 : 1.4) * (0.82 + ((d.idx * 0.618) % 1) * 0.36));
      _m.compose(_p.set(d.x, d.y, d.z), _q, _s);
      im.setMatrixAt(c, _m);
      im.setColorAt(c, this.teamCol[d.team]);
      // engine glow sprites (sparse for micro swarms)
      if (d.type !== 'micro' || (d.idx + (G.frame | 0)) % 2 === 0) {
        const glow = d.team === 0 ? [0.6, 1.5, 3.6] : [3.6, 1.0, 0.45];
        G.fx.trailGlow(_p, glow, d.type === 'micro' ? 2.0 : 3.0, d.type === 'micro' ? 0.22 : 0.3); // streaking engine trails
      }
    }
    for (const [k, im] of Object.entries(this.inst)) {
      im.count = counts[k];
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
    G.audio.setSwarm(nearListener);
  }

  steer(d, tx, ty, tz, speed, turn, dt) {
    _d.set(tx - d.x, ty - d.y, tz - d.z);
    const len = _d.length() || 1;
    _d.multiplyScalar(speed / len);
    const k = Math.min(1, turn * dt);
    const ovx = d.vx, ovz = d.vz;
    d.vx += (_d.x - d.vx) * k; d.vy += (_d.y - d.vy) * k; d.vz += (_d.z - d.vz) * k;
    // bank into turns
    const cross = ovx * d.vz - ovz * d.vx;
    d.bank += (THREE.MathUtils.clamp(-cross * 0.004, -1.1, 1.1) - d.bank) * Math.min(1, dt * 5);
    d.x += d.vx * dt; d.y += d.vy * dt; d.z += d.vz * dt;
    return len;
  }

  stepMicro(d, dt) {
    const G = this.G;
    d.retarget = (d.retarget || 0) - dt;
    if ((!d.target || !d.target.alive) && d.retarget <= 0) { d.target = this.acquire(d, 90); d.retarget = 0.4; }
    const t = d.t;
    // swirling swarm offsets (unique per drone)
    const ox = Math.sin(t * 3.1 + d.phase) * 6, oz = Math.cos(t * 2.7 + d.phase * 1.3) * 6, oy = Math.sin(t * 4 + d.phase) * 2;
    let tx, ty, tz, speed = SPEED.micro;
    if (d.target && d.target.alive && t > 0.5) {
      const dist = Math.hypot(d.target.x - d.x, d.target.z - d.z);
      const dive = dist < 30 ? 1 : 0;
      tx = d.target.x + ox * (1 - dive); tz = d.target.z + oz * (1 - dive);
      ty = dive ? 2.5 : d.alt + oy;
      speed *= dive ? 1.35 : 1;
      if (dist < d.target.radius + 2 && d.y < 7) {
        d.alive = false;
        G.combat.splashDamage(d.x, d.z, d.radius, d.dmg * d.owner.dmgMul, d.team, d.owner);
        const pos = new THREE.Vector3(d.x, Math.max(d.y, 2), d.z);
        G.fx.explosion(pos, 0.45, { water: false });
        G.audio.play('dronePop', { x: d.x, z: d.z, vol: 0.5 });
        return;
      }
    } else {
      tx = d.tx + ox * 2; tz = d.tz + oz * 2; ty = d.alt + oy;
    }
    this.steer(d, tx, ty, tz, speed, t < 0.5 ? 1.5 : 4.5, dt);
    if (d.y < 0.5) { d.alive = false; G.fx.splash(d.x, d.z, 0.4); }
  }

  stepFighter(d, dt) {
    const G = this.G;
    d.retarget = (d.retarget || 0) - dt;
    if ((!d.target || !d.target.alive) && d.retarget <= 0) { d.target = this.acquire(d, 90); d.retarget = 0.6; }
    const cx = d.target && d.target.alive ? d.target.x : d.tx, cz = d.target && d.target.alive ? d.target.z : d.tz;
    // racetrack orbit around the target with strafing passes
    const ang = d.t * 1.1 + d.phase;
    const R = 22 + (d.idx % 3) * 6;
    const tx = cx + Math.cos(ang) * R, tz = cz + Math.sin(ang) * R;
    this.steer(d, tx, d.alt, tz, SPEED.fighter, 2.2, dt);
    d.gunT -= dt;
    if (d.target && d.target.alive && d.gunT <= 0) {
      const dist = Math.hypot(d.target.x - d.x, d.target.z - d.z);
      if (dist < 55) {
        d.gunT = d.fireCd;
        const from = new THREE.Vector3(d.x, d.y, d.z);
        const to = new THREE.Vector3(d.target.x + rnd(-2, 2), 2.5, d.target.z + rnd(-2, 2));
        G.fx.beam(from, to, d.team === 0 ? 0xffe0a0 : 0xffc080, 0.25, 0.08);
        G.fx.hitSpark(to, 0.5);
        G.combat.damage(d.target, d.dmg * d.owner.dmgMul, d.owner);
        if (Math.random() < 0.2) G.audio.play('flak', { x: d.x, z: d.z, vol: 0.25, pitch: 1.6 });
      }
    }
  }

  stepBomber(d, dt) {
    const G = this.G;
    if (!d.dropped) {
      const dist = this.steer(d, d.tx, d.alt, d.tz, SPEED.bomber, 1.8, dt);
      const hd = Math.hypot(d.tx - d.x, d.tz - d.z);
      if (hd < 26) d.alt = Math.max(14, d.alt - 40 * dt); // dive
      if (hd < 8 || dist < 10) {
        d.dropped = true;
        const owner = d.owner, x = d.tx + rnd(-3, 3), z = d.tz + rnd(-3, 3);
        G.combat.ballistic(owner, 'bomb', new THREE.Vector3(d.x, d.y, d.z), x, z, 55, d.dmg * owner.dmgMul, { aoe: d.radius, arc: 0 });
        G.audio.play('bombWhistle', { x, z, vol: 0.7 });
        d.alt = 60; d.life = d.t + 3;
      }
    } else {
      this.steer(d, d.x + d.vx, d.alt, d.z + d.vz, SPEED.bomber * 1.2, 1, dt);
    }
  }

  stepShield(d, dt) {
    const o = d.owner;
    const ang = d.t * 2.2 + (d.idx / 6) * Math.PI * 2;
    const y = sampleWaves(o.x, o.z, this.G.time, _w).y;
    const tx = o.x + Math.cos(ang) * d.orbitR, tz = o.z + Math.sin(ang) * d.orbitR;
    d.vx = (tx - d.x) / Math.max(dt, 1e-3); d.vz = (tz - d.z) / Math.max(dt, 1e-3); d.vy = 0;
    d.x = tx; d.z = tz; d.y = y + 8 + Math.sin(d.t * 3 + d.idx) * 1.2;
    d.bank = 0.4;
    if (o.shield <= 0 || !o.alive) d.alive = false;
  }
}
