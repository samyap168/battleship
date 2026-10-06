// Multiplayer state snapshots. The sim is deterministic, so peers normally agree exactly; a snapshot is the safety
// net: the host sends one every few seconds, and a peer whose hash differs (a different JS engine rounding a float
// differently, a dropped tab, a bug) is pulled back onto the host's state. It also carries the RNG state, so after a
// correction every future roll agrees again.
import { Creep } from '../game/units.js';
import { laneFor } from '../game/map.js';
import { simState, setSimState } from '../core/rng.js';

const q = (v, s = 2) => Math.round(v * s);

/** Cheap fingerprint of everything that decides the match (coarsely quantised: engines may differ in the last ulp). */
export function stateHash(G) {
  let h = 2166136261 >>> 0;
  const eat = (v) => { h ^= v | 0; h = Math.imul(h, 16777619) >>> 0; };
  for (const u of G.heroes) { eat(q(u.x)); eat(q(u.z)); eat(Math.round(u.hp)); eat(Math.round(u.gold)); eat(u.level); eat(u.alive ? 1 : 0); eat(u.age); eat(u.kills); }
  for (const c of G.creeps) { if (!c.alive) continue; eat(c.id); eat(q(c.x)); eat(q(c.z)); eat(Math.round(c.hp)); }
  for (const s of G.structures) { eat(Math.round(s.hp)); eat(s.alive ? 1 : 0); }
  for (const t of G.teams) { eat(t.kills); eat(t.towersLost); }
  eat(simState() | 0);
  return h >>> 0;
}

const LANES = ['top', 'mid', 'bot'];

export function snapshot(G) {
  const b = G.boss;
  return {
    heroes: G.heroes.map((h) => ({
      x: h.x, z: h.z, yaw: h.yaw, speed: h.speed, hp: h.hp, maxHp: h.maxHp, shield: h.shield, shieldT: h.shieldT,
      alive: h.alive, respawn: h.respawn, level: h.level, xp: h.xp, gold: h.gold, hull: h.hullId, upg: { ...h.upg }, cds: [...h.cds],
      kills: h.kills, deaths: h.deaths, assists: h.assists, streak: h.streak, stun: h.stun, silence: h.silence, slowT: h.slowT, slow: h.slow,
      guard: h.spawnGuard || 0, dmg: h.dmgDealt, ck: h.creepKills, buffs: h.buffs.map((x) => ({ ...x })),
    })),
    creeps: G.creeps.filter((c) => c.alive).map((c) => [c.id, c.team, LANES.indexOf(c.lane), c.heavy ? 1 : 0, c.era, c.x, c.z, c.yaw, c.speed, c.hp, c.wpi]),
    structures: G.structures.map((s) => [s.hp, s.alive ? 1 : 0, s.exposedAt ?? null]),
    boss: { hp: b.hp, alive: b.alive, risen: b.risen, rise: b.rise, t: b.t, slamT: b.slamT, biteT: b.biteT, regenT: b.regenT, pending: b.pending.map((p) => ({ ...p })) },
    ports: G.ports.map((p) => [p.owner, p.prog]),
    teams: G.teams.map((t) => [t.kills, t.era, t.towersLost]),
    g: { waveNo: G.waveNo, nextWave: G.nextWave, duskTide: !!G.duskTide, stormAt: G.stormAt, shotT: G.shotT ? [...G.shotT] : null, firstBlood: !!G.firstBlood, nextUnitId: G.nextUnitId },
    rng: simState(),
  };
}

export function applySnapshot(G, S) {
  S.heroes.forEach((d, i) => {
    const h = G.heroes[i];
    if (!h) return;
    if (h.hullId !== d.hull) h.setHull(d.hull);
    Object.assign(h, { x: d.x, z: d.z, yaw: d.yaw, speed: d.speed, hp: d.hp, maxHp: d.maxHp, shield: d.shield, shieldT: d.shieldT, respawn: d.respawn, level: d.level, xp: d.xp, gold: d.gold,
      kills: d.kills, deaths: d.deaths, assists: d.assists, streak: d.streak, stun: d.stun, silence: d.silence, slowT: d.slowT, slow: d.slow, spawnGuard: d.guard, dmgDealt: d.dmg, creepKills: d.ck });
    Object.assign(h.upg, d.upg); h.cds = [...d.cds]; h.buffs = d.buffs.map((x) => ({ ...x }));
    if (h.alive !== d.alive) {
      h.alive = d.alive;
      if (d.alive) { h.sinkT = undefined; h.rig.root.visible = true; } else h.sinkT = 0;
    }
  });
  // creeps: adopt the host's roster (create the ones we lack, drop the ones it does not have)
  const have = new Map(G.creeps.map((c) => [c.id, c]));
  const keep = new Set();
  for (const [id, team, lane, heavy, era, x, z, yaw, speed, hp, wpi] of S.creeps) {
    keep.add(id);
    let c = have.get(id);
    if (!c) {
      const laneId = LANES[lane];
      c = new Creep(G, team, laneId, !!heavy, era, laneFor(team, laneId));
      G.nextUnitId--; // the constructor drew a fresh id: give it the host's instead
      c.id = id;
      G.creeps.push(c); G.units.push(c);
    }
    Object.assign(c, { x, z, yaw, speed, hp, wpi });
  }
  for (const c of G.creeps) if (c.alive && !keep.has(c.id)) { c.alive = false; c.hp = 0; c.deadT = 99; }
  S.structures.forEach(([hp, alive, exposedAt], i) => {
    const s = G.structures[i];
    s.hp = hp; if (exposedAt !== null) s.exposedAt = exposedAt;
    if (!!alive !== s.alive) { s.alive = !!alive; if (!alive) s.sinkT = 0; }
  });
  Object.assign(G.boss, S.boss, { pending: S.boss.pending.map((p) => ({ ...p })) });
  S.ports.forEach(([owner, prog], i) => { G.ports[i].prog = prog; if (G.ports[i].owner !== owner) { G.ports[i].owner = owner; G.ports[i].rig.setOwner(owner); } });
  S.teams.forEach(([kills, era, towersLost], i) => { Object.assign(G.teams[i], { kills, towersLost }); if (G.teams[i].era !== era) G.updateEra(i); });
  Object.assign(G, { waveNo: S.g.waveNo, nextWave: S.g.nextWave, stormAt: S.g.stormAt, firstBlood: S.g.firstBlood });
  if (S.g.shotT) G.shotT = [...S.g.shotT];
  if (S.g.duskTide) G.duskTide = true;
  G.nextUnitId = Math.max(G.nextUnitId, S.g.nextUnitId);
  setSimState(S.rng);
}
