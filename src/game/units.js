import * as THREE from 'three';
import { HULLS, ABILITIES, CREEPS, STRUCTURES, MATCH, TEAMS, AGES, UPGRADES } from '../core/config.js';
import { sampleWaves } from '../render/waves.js';
import { buildHeroShip, buildCreepShip } from '../render/models/shipModels.js';
import { buildStructure } from '../render/models/structureModels.js';
import { applyTeamRim } from '../render/teamRim.js';
import { BOUNDS, segmentBlocked } from './map.js';
import { srand } from '../core/rng.js';

/**
 * World position of a model part, with the ship's visual scale divided out. A captain's root scale changes with the
 * camera zoom and the reforge animation, which differ per player: gameplay must never read it.
 */
export function simWorldPos(u, obj, out) {
  const r = u.rig && u.rig.root;
  let top = obj; while (top && top !== r) top = top.parent;
  if (r && !top) return out.set(u.x, 3, u.z); // a part of a hull that has since been replaced (age-up mid-salvo): same fallback on every peer
  obj.getWorldPosition(out);
  if (r) {
    const s = r.scale.x || 1;
    if (s !== 1) { out.x = r.position.x + (out.x - r.position.x) / s; out.y = r.position.y + (out.y - r.position.y) / s; out.z = r.position.z + (out.z - r.position.z) / s; }
  }
  return out;
}
const _w = { y: 0, nx: 0, ny: 1, nz: 0 };
const _v = new THREE.Vector3();
const _e = new THREE.Euler(0, 0, 0, 'YXZ');
const wrapAngle = (a) => Math.atan2(Math.sin(a), Math.cos(a));

export class Unit {
  constructor(G, kind, team) {
    this.G = G; this.id = G.nextUnitId++; this.kind = kind; this.team = team; // per-match numbering: ids agree on every peer
    this.x = 0; this.z = 0; this.yaw = 0; this.vx = 0; this.vz = 0; this.speed = 0;
    this.hp = 1; this.maxHp = 1; this.armor = 0; this.radius = 5;
    this.alive = true; this.stun = 0; this.slow = 0; this.slowT = 0; this.shield = 0; this.shieldT = 0;
    this.untargetable = 0; this.silence = 0;
    this.damagers = new Map(); // heroId -> time of last damage (assists)
    this.lastAttacker = null;
    this.gunCd = 0;
    this.target = null;
    this.rig = null;
    this.hitFlash = 0;
  }
  get isShip() { return this.kind === 'hero' || this.kind === 'creep'; }
  get targetable() { return this.alive && this.untargetable <= 0; }
  dist2(o) { const dx = o.x - this.x, dz = o.z - this.z; return dx * dx + dz * dz; }
  dist(o) { return Math.sqrt(this.dist2(o)); }
  heal(v) { if (this.alive) this.hp = Math.min(this.maxHp, this.hp + v); }
  removeVisual() { if (this.rig) { this.G.scene.remove(this.rig.root); } }
}

// ---------------------------------------------------------------------------
// Shared ship movement: momentum, turn rate, arrival, obstacle avoidance.
export function shipPhysics(u, dt, desiredX, desiredZ, maxSpeed, turnRate, accel = 16) {
  const G = u.G;
  let want = 0;
  if (desiredX !== null && u.stun <= 0) {
    const dx = desiredX - u.x, dz = desiredZ - u.z;
    const d = Math.hypot(dx, dz);
    if (d > 1.5) {
      const targetYaw = Math.atan2(dx, dz);
      const diff = wrapAngle(targetYaw - u.yaw);
      const turn = Math.sign(diff) * Math.min(Math.abs(diff), turnRate * dt);
      u.yaw = wrapAngle(u.yaw + turn);
      u.turnRate = turn / Math.max(dt, 1e-4);
      // slow in sharp turns, slow on arrival
      const align = Math.max(0.25, Math.cos(Math.min(Math.abs(diff), Math.PI / 2)));
      want = maxSpeed * align * Math.min(1, d / 18 + 0.25);
    } else u.turnRate = 0;
  } else u.turnRate = 0;
  const a = want > u.speed ? accel : accel * 1.4;
  u.speed += Math.sign(want - u.speed) * Math.min(Math.abs(want - u.speed), a * dt);
  const fx = Math.sin(u.yaw), fz = Math.cos(u.yaw);
  let nx = u.x + (fx * u.speed + (u.pushX || 0)) * dt;
  let nz = u.z + (fz * u.speed + (u.pushZ || 0)) * dt;
  u.pushX = (u.pushX || 0) * Math.max(0, 1 - dt * 4);
  u.pushZ = (u.pushZ || 0) * Math.max(0, 1 - dt * 4);
  // island collision (slide)
  for (const o of G.obstacles) {
    const dx = nx - o.x, dz = nz - o.z;
    const r = o.r + u.radius * 0.8;
    const d2 = dx * dx + dz * dz;
    if (d2 < r * r) {
      const d = Math.sqrt(d2) || 1;
      nx = o.x + (dx / d) * r; nz = o.z + (dz / d) * r;
    }
  }
  nx = Math.max(-BOUNDS.x + 8, Math.min(BOUNDS.x - 8, nx));
  nz = Math.max(-BOUNDS.z + 8, Math.min(BOUNDS.z - 8, nz));
  u.vx = (nx - u.x) / Math.max(dt, 1e-4); u.vz = (nz - u.z) / Math.max(dt, 1e-4);
  u.x = nx; u.z = nz;
}

/** Ship-ship soft separation. */
export function separateShips(list, dt) {
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    if (!a.alive) continue;
    for (let j = i + 1; j < list.length; j++) {
      const b = list[j];
      if (!b.alive) continue;
      const dx = b.x - a.x, dz = b.z - a.z;
      // long hulls: separate on ~40% of hull length so ships never clip through each other
      const ra = a.rig ? Math.max(a.radius, a.rig.length * 0.4) : a.radius;
      const rb = b.rig ? Math.max(b.radius, b.rig.length * 0.4) : b.radius;
      const r = (ra + rb) * 0.9;
      const d2 = dx * dx + dz * dz;
      if (d2 < r * r && d2 > 1e-6) {
        const d = Math.sqrt(d2), push = (r - d) * 0.5;
        const nx = dx / d, nz = dz / d;
        const wa = b.kind === 'hero' && a.kind !== 'hero' ? 0.8 : a.kind === 'hero' && b.kind !== 'hero' ? 0.2 : 0.5;
        a.x -= nx * push * wa; a.z -= nz * push * wa;
        b.x += nx * push * (1 - wa); b.z += nz * push * (1 - wa);
      }
    }
  }
}

/** Place a ship rig on the waves with pitch/roll + turn lean; sinking anim. */
const _wf = { y: 0 }, _wa = { y: 0 }, _wp = { y: 0 }, _ws = { y: 0 }; // scratch wave samples: a hundred ships a frame allocate nothing
export function syncShipVisual(u, dt, t, bobScale = 1) {
  const r = u.rig; if (!r) return;
  sampleWaves(u.x, u.z, t, _w);
  // Sample fore/aft to derive pitch and roll that match the hull length.
  const L = r.length * 0.4, fx = Math.sin(u.yaw), fz = Math.cos(u.yaw);
  const yf = sampleWaves(u.x + fx * L, u.z + fz * L, t, _wf).y;
  const ya = sampleWaves(u.x - fx * L, u.z - fz * L, t, _wa).y;
  const B = r.beam * 0.5;
  const yp = sampleWaves(u.x + fz * B, u.z - fx * B, t, _wp).y;
  const ys = sampleWaves(u.x - fz * B, u.z + fx * B, t, _ws).y;
  const pitch = Math.atan2(ya - yf, L * 2) * bobScale;
  const roll = Math.atan2(yp - ys, B * 2) * bobScale;
  const lean = THREE.MathUtils.clamp(-(u.turnRate || 0) * 0.12 * Math.min(1, u.speed / 20), -0.14, 0.14);
  u.leanS = THREE.MathUtils.lerp(u.leanS || 0, lean, Math.min(1, dt * 3));
  let y = ((yf + ya + yp + ys) * 0.25) * bobScale;
  let extraPitch = 0, extraRoll = 0;
  if (u.alive && u.maxHp && u.kind !== 'boss') {
    // damage tells: below half hull she settles lower and takes a list, so you can read who's hurting
    const hurt = Math.max(0, 0.5 - u.hp / u.maxHp) * 2; // 0 at 50% -> 1 at 0%
    u.listS = THREE.MathUtils.lerp(u.listS || 0, hurt, Math.min(1, dt * 1.5));
    y -= u.listS * r.height * 0.05;
    extraRoll += u.listS * 0.13 * ((u.id || 0) & 1 ? 1 : -1);
    extraPitch += u.listS * 0.04;
  }
  if (!u.alive && u.sinkT !== undefined && u.kind === 'hero') {
    // a captain goes down in three acts: lurch and list, the stern rears out of the sea, then the slide under
    const T = u.sinkT, sd = u.sinkDir || 1;
    const lurch = 1 - Math.pow(1 - Math.min(1, T / 1.1), 3);
    const rear = THREE.MathUtils.smoothstep(T, 1.0, 4.4);
    const slide = Math.min(1, Math.max(0, (T - 4.0) / 2.9));
    y -= lurch * r.height * 0.12 + rear * r.height * 0.22 + slide * slide * (r.height * 0.7 + r.length * 0.5 + 6);
    extraPitch = sd * (rear * 0.78 + slide * 0.4);
    extraRoll = sd * (lurch * 0.42 - rear * 0.2);
  } else if (!u.alive && u.sinkT !== undefined) {
    // gunboats: a fast lurch onto their beam ends, then bow-first under
    const T = u.sinkT, sd = u.sinkDir || 1;
    const lurch = 1 - Math.pow(1 - Math.min(1, T / 0.6), 3);
    const dive = THREE.MathUtils.smoothstep(T, 0.5, 3.2);
    const k = Math.min(1, T / 4.2);
    y -= lurch * r.height * 0.1 + k * k * (r.height + r.length * 0.35 + 6);
    extraPitch = sd * dive * 0.75;
    extraRoll = lurch * 0.6 - dive * 0.2;
  }
  r.root.position.set(u.x, y, u.z);
  _e.set(pitch + extraPitch, u.yaw, roll + u.leanS + extraRoll);
  r.root.quaternion.setFromEuler(_e);
}

// ---------------------------------------------------------------------------
export class Hero extends Unit {
  constructor(G, team, name, isPlayer, slot, human = isPlayer) {
    super(G, 'hero', team);
    this.name = name; this.isPlayer = isPlayer; this.slot = slot;
    this.human = human; // a person drives this ship (in multiplayer: any person, not just the one at this keyboard)
    this.hullId = 'frigate'; this.age = 1;
    this.level = 1; this.xp = 0; this.gold = MATCH.startGold;
    this.upg = { plating: 0, gunnery: 0, engines: 0, reload: 0, repair: 0 };
    this.cds = [0, 0, 0, 0];
    this.buffs = []; // {speedMul, dmgTaken, heal, t, dur}
    this.kills = 0; this.deaths = 0; this.assists = 0; this.streak = 0; this.dmgDealt = 0; this.creepKills = 0;
    this.respawn = 0;
    this.moveX = null; this.moveZ = null; this.path = [];
    this.attackOrder = null;
    this.wakeT = 0; this.stackT = 0;
    this.lane = 'mid';
    this.setHull('frigate', true);
  }
  get hull() { return HULLS[this.hullId]; }
  get abilities() { // cached per hull: read many times a frame by the HUD and AI, so no per-access allocation
    if (this._abHull !== this.hull) { this._abHull = this.hull; this._ab = this.hull.abilities.map((id) => ({ id, ...ABILITIES[id] })); }
    return this._ab;
  }
  get lvlMul() { return 1 + 0.07 * (this.level - 1); }
  get dmgMul() {
    let m = this.lvlMul * (1 + 0.1 * this.upg.gunnery);
    for (const b of this.buffs) if (b.dmgMul) m *= b.dmgMul;
    return m;
  }
  get cdMul() { return 1 - 0.07 * this.upg.reload; }
  get maxSpeed() {
    let m = 1 + 0.06 * this.upg.engines;
    for (const b of this.buffs) if (b.speedMul) m *= b.speedMul;
    if (this.slowT > 0) m *= 1 - this.slow;
    return this.hull.speed * m;
  }
  computeMaxHp() { return Math.round(this.hull.hp * this.lvlMul * (1 + 0.1 * this.upg.plating)); }

  setHull(id, initial = false) {
    const frac = initial ? 1 : this.hp / this.maxHp;
    this.hullId = id;
    this.age = HULLS[id].age;
    this.maxHp = this.computeMaxHp();
    this.hp = Math.max(1, Math.round(this.maxHp * Math.max(frac, initial ? 1 : 0.5))); // age-up also repairs to at least 50%
    this.armor = this.hull.armor;
    this.radius = this.hull.radius;
    this.cds = [0, 0, 0, 0];
    const old = this.rig;
    this.rig = buildHeroShip(id, this.team);
    applyTeamRim(this.rig.root, this.team);
    this.rig.root.traverse((o) => { if (o.isMesh) o.userData.unitId = this.id; });
    this.G.scene.add(this.rig.root);
    if (this.G.reflect) this.G.reflect(this.rig.root);
    if (old) this.G.scene.remove(old.root);
    this.shieldMesh = null;
    this.reforgeT = initial ? 1 : 0; // age-up scale-in animation
  }

  refreshStats() {
    const frac = this.hp / this.maxHp;
    this.maxHp = this.computeMaxHp();
    this.hp = Math.round(this.maxHp * frac);
  }

  addXp(v) {
    if (this.level >= MATCH.maxLevel) return;
    this.xp += v;
    let leveled = false;
    while (this.level < MATCH.maxLevel && this.xp >= this.xpToNext()) {
      this.xp -= this.xpToNext();
      this.level++;
      leveled = true;
    }
    if (leveled) {
      const f = this.hp / this.maxHp;
      this.maxHp = this.computeMaxHp();
      this.hp = Math.min(this.maxHp, Math.round(this.maxHp * f + this.maxHp * 0.1));
      this.G.events.emit('levelUp', this);
    }
  }
  xpToNext() { return 90 + 60 * this.level; }

  canAgeUp() { return this.age < 5; }
  nextAgeCost() { return this.age < 5 ? AGES[this.age].cost : Infinity; }
  upgradeCost(id) {
    const def = UPGRADES.find((u) => u.id === id);
    const lvl = this.upg[id];
    return lvl >= def.max ? Infinity : def.cost[lvl];
  }

  commandMove(x, z) {
    this.attackOrder = null;
    this.setDestination(x, z);
  }
  setDestination(x, z) {
    this.moveX = x; this.moveZ = z;
    this.path = this.G.nav.findPath(this.x, this.z, x, z);
  }
  commandAttack(target) { this.attackOrder = target; this.path = []; this.repathT = 0; }
  stop() { this.moveX = null; this.path = []; this.attackOrder = null; }

  update(dt) {
    const G = this.G;
    if (!this.alive) return;
    // timers
    for (let i = 0; i < 4; i++) this.cds[i] = Math.max(0, this.cds[i] - dt);
    this.stun = Math.max(0, this.stun - dt);
    this.silence = Math.max(0, this.silence - dt);
    this.slowT = Math.max(0, this.slowT - dt);
    this.untargetable = Math.max(0, this.untargetable - dt);
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    if (this.shieldT > 0) { this.shieldT -= dt; if (this.shieldT <= 0) this.shield = 0; }
    for (let i = this.buffs.length - 1; i >= 0; i--) {
      const b = this.buffs[i];
      b.t += dt;
      if (b.healPerSec) this.heal(b.healPerSec * dt);
      if (b.t >= b.dur) this.buffs.splice(i, 1);
    }
    // regen + fountain
    this.heal(this.maxHp * (0.0015 + 0.004 * this.upg.repair) * dt);
    const f = G.fountains[this.team];
    if ((this.x - f.x) ** 2 + (this.z - f.z) ** 2 < f.r * f.r) this.heal(this.maxHp * MATCH.fountainHeal * dt);

    // movement: attack order chases into range, else path following
    let dx = null, dz = null;
    const range = this.hull.guns.range;
    if (this.attackOrder) {
      const t = this.attackOrder;
      if (!t.alive || (t.team === this.team)) this.attackOrder = null;
      else {
        const d = this.dist(t);
        if (d > range * 0.9) {
          this.repathT = (this.repathT || 0) - dt;
          if (this.repathT <= 0 || !this.path.length) { this.path = G.nav.findPath(this.x, this.z, t.x, t.z); this.repathT = 0.6; }
        } else this.path = [];
      }
    }
    if (this.path.length) {
      const p = this.path[0];
      dx = p.x; dz = p.z;
      const arrive = this.path.length === 1 ? 6 : 14;
      if ((p.x - this.x) ** 2 + (p.z - this.z) ** 2 < arrive * arrive) {
        this.path.shift();
        if (!this.path.length) this.moveX = null;
      }
    }
    shipPhysics(this, dt, dx, dz, this.maxSpeed, this.hull.turn * (this.stun > 0 ? 0 : 1), 14);

    // auto-attack
    this.gunCd -= dt;
    if (this.gunCd <= 0 && this.stun <= 0) {
      const tgt = (this.attackOrder && this.attackOrder.targetable && this.dist(this.attackOrder) <= range + this.attackOrder.radius) ? this.attackOrder : G.findTarget(this, range, 'hero');
      this.target = tgt;
      if (tgt) {
        G.combat.fireGuns(this, tgt);
        this.gunCd = this.hull.guns.cd * this.cdMul;
      }
    }
  }
}

// ---------------------------------------------------------------------------
export class Creep extends Unit {
  constructor(G, team, lane, heavy, era, waypoints) {
    super(G, 'creep', team);
    const def = heavy ? CREEPS.heavy : CREEPS.light;
    const mul = 1 + CREEPS.eraScale * (era - 1);
    this.def = def; this.heavy = heavy; this.era = era; this.lane = lane;
    this.maxHp = this.hp = Math.round(def.hp * mul);
    this.dmg = def.dmg * mul;
    this.radius = def.radius;
    this.armor = 0.05 * (era - 1);
    this.wp = waypoints; this.wpi = 1;
    this.gold = def.gold; this.xpVal = def.xp;
    this.rig = buildCreepShip(era, heavy, team);
    this.rig.root.userData.noAO = true; // tiny hulls: AO is invisible at gameplay zoom, the extra G-buffer draws are not
    this.rig.root.traverse((o) => { if (o.isMesh) o.castShadow = false; }); // perf: gunboat shadows are imperceptible from above
    applyTeamRim(this.rig.root, this.team, 2.2); // faction rim (stronger on small hulls): gunboats stay readable through smoke and the squall's chop
    G.scene.add(this.rig.root);
    this.gunKind = era <= 1 ? 'ball' : era >= 5 ? 'laser' : era >= 4 ? 'pulse' : 'shell';
  }
  update(dt) {
    if (!this.alive) return;
    const G = this.G;
    this.stun = Math.max(0, this.stun - dt);
    this.slowT = Math.max(0, this.slowT - dt);
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    const range = this.def.range;
    // acquire (keep current target if valid)
    this.retarget = (this.retarget || 0) - dt;
    if (!this.target || !this.target.targetable || this.dist(this.target) > range * 1.6 || this.retarget <= 0) {
      this.target = G.findTarget(this, range * 1.5, 'creep');
      this.retarget = 0.5;
    }
    let tx = null, tz = null;
    if (this.target && this.dist(this.target) > range * 0.85) { tx = this.target.x; tz = this.target.z; }
    else if (!this.target) {
      const p = this.wp[this.wpi];
      if (p) {
        tx = p.x; tz = p.z;
        if ((p.x - this.x) ** 2 + (p.z - this.z) ** 2 < 30 * 30 && this.wpi < this.wp.length - 1) this.wpi++;
      }
    }
    // gentle lane-avoidance of islands
    if (tx !== null && segmentBlocked(G.obstacles, this.x, this.z, tx, tz, this.radius + 2)) {
      if (!this.path || !this.path.length || (this.pathT = (this.pathT || 0) - dt) <= 0) { this.path = G.nav.findPath(this.x, this.z, tx, tz); this.pathT = 1; }
      if (this.path.length) { tx = this.path[0].x; tz = this.path[0].z; if ((tx - this.x) ** 2 + (tz - this.z) ** 2 < 100) this.path.shift(); }
    }
    const slow = this.slowT > 0 ? 1 - this.slow : 1;
    shipPhysics(this, dt, tx, tz, this.def.speed * slow, 1.8, 14);
    this.gunCd -= dt;
    if (this.gunCd <= 0 && this.target && this.target.targetable && this.dist(this.target) <= range + this.target.radius && this.stun <= 0) {
      G.combat.fireCreep(this, this.target);
      this.gunCd = this.def.cd * (0.9 + srand() * 0.2);
    }
  }
}

// ---------------------------------------------------------------------------
export class Structure extends Unit {
  constructor(G, layout) {
    super(G, layout.tier === 'citadel' ? 'citadel' : 'tower', layout.team);
    this.tier = layout.tier; this.lane = layout.lane;
    const def = STRUCTURES[layout.tier];
    this.def = def;
    this.maxHp = this.hp = def.hp;
    this.armor = def.armor; this.radius = def.radius;
    this.x = layout.x; this.z = layout.z;
    this.rig = buildStructure(layout.tier, layout.team);
    this.rig.root.position.set(this.x, 0, this.z);
    // face toward the map centre
    this.rig.root.rotation.y = Math.atan2(-this.x, -this.z);
    G.scene.add(this.rig.root);
    if (G.reflect) G.reflect(this.rig.root);
    this.era = 1;
  }
  get invulnerable() { return this.G.isStructureProtected(this); }
  update(dt) {
    if (!this.alive) return;
    const G = this.G;
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    const range = this.def.range;
    this.gunCd -= dt;
    // Tower aggro rules: keep hitting a hero who attacked an allied hero in range, else creeps first.
    if (this.target && (!this.target.targetable || this.dist(this.target) > range + this.target.radius)) this.target = null;
    if (this.aggroHero && this.aggroHero.targetable && this.dist(this.aggroHero) <= range) this.target = this.aggroHero;
    if (!this.target) this.target = G.findTarget(this, range, 'tower');
    if (this.rig.turret && this.target) {
      const want = Math.atan2(this.target.x - this.x, this.target.z - this.z) - this.rig.root.rotation.y;
      const p = this.rig.turret.pivot;
      p.rotation.y += wrapAngle(want - p.rotation.y) * Math.min(1, dt * 6);
    }
    if (this.gunCd <= 0 && this.target) {
      G.combat.fireStructure(this, this.target);
      this.gunCd = this.def.cd;
    }
    this.aggroT = (this.aggroT || 0) - dt;
    if (this.aggroT <= 0) this.aggroHero = null;
  }
  setEra(era) { if (era !== this.era) { this.era = era; this.rig.setEra && this.rig.setEra(era); } }
}

export { wrapAngle };
