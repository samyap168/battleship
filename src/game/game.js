import * as THREE from 'three';
import { TEAMS, MATCH, AGES, HULLS, UPGRADES, REWARDS, PORTS, BOT_NAMES, DIFFICULTY, STRUCTURES } from '../core/config.js';
import { buildObstacles, NavGrid, STRUCTURE_LAYOUT, PORT_LAYOUT, LANE_IDS, laneFor, spawnPoint, fountain } from './map.js';
import { Hero, Creep, Structure, separateShips, syncShipVisual } from './units.js';
import { Combat } from './combat.js';
import { Drones } from './drones.js';
import { updateHeroEffects } from './abilities.js';
import { BotBrain } from './ai/bot.js';
import { buildPort } from '../render/models/structureModels.js';
import { Leviathan, LEVIATHAN } from './leviathan.js';
import { sampleWaves, WAVES_GLSL, WAVE_UNIFORMS } from '../render/waves.js';

class Emitter {
  constructor() { this.h = {}; }
  on(e, f) { (this.h[e] ||= []).push(f); }
  emit(e, a) { (this.h[e] || []).forEach((f) => f(a)); }
}

const _v = new THREE.Vector3();
const _w = { y: 0 };
const rnd = (a, b) => a + Math.random() * (b - a);
const LANE_OF_SLOT = ['top', 'top', 'mid', 'bot', 'bot'];

// Energy shield: fresnel rim + scrolling hex lattice, hugging the hull as an ellipsoid.
const SHIELD_GEO = new THREE.SphereGeometry(1, 40, 24);
export function shieldMesh(color) {
  const m = new THREE.Mesh(SHIELD_GEO, new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uTime: { value: 0 }, uA: { value: 0 } },
    vertexShader: `varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main(){ vP = position; vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 uColor; uniform float uTime, uA; varying vec3 vN; varying vec3 vV; varying vec3 vP;
      float hexDist(vec2 p){ p = abs(p); return max(dot(p, normalize(vec2(1.0, 1.732))), p.x); }
      void main(){
        float f = pow(max(1.0 - abs(dot(vN, vV)), 0.0), 2.5);
        vec2 uv = vec2(atan(vP.z, vP.x + 1e-5) * 3.0, vP.y * 5.0 + uTime * 0.4);
        vec2 r = vec2(1.0, 1.732), h = r * 0.5;
        vec2 a = mod(uv, r) - h, b = mod(uv - h, r) - h;
        vec2 g = dot(a, a) < dot(b, b) ? a : b;
        float hex = smoothstep(0.42, 0.5, hexDist(g));
        float flick = 0.85 + 0.15 * sin(uTime * 23.0 + vP.y * 9.0);
        float alpha = (f * 0.9 + hex * 0.25 + 0.04) * uA * flick * smoothstep(-0.25, 0.1, vP.y);
        gl_FragColor = vec4(uColor * 1.8 * alpha, alpha);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  }));
  m.renderOrder = 9;
  return m;
}

// Team-coloured selection ring that rides the waves under each captain.
const RING_GEO = new THREE.RingGeometry(0.9, 1, 72, 1).rotateX(-Math.PI / 2);
function heroRing(color, isPlayer) {
  const m = new THREE.Mesh(RING_GEO, new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uA: { value: isPlayer ? 0.55 : 0.38 }, uTime: { value: 0 }, ...WAVE_UNIFORMS },
    // vertices follow the Gerstner surface so the ring never dips under a swell
    vertexShader: `uniform float uTime; varying vec2 vUv; ${WAVES_GLSL}
      void main(){ vUv = uv; vec4 wp = modelMatrix * vec4(position, 1.0); vec3 n = vec3(0.0, 1.0, 0.0);
        vec3 d = gerstnerWave(wp.xz, uTime, n); wp.xyz += d; wp.y += 0.35;
        gl_Position = projectionMatrix * viewMatrix * wp; }`,
    fragmentShader: 'uniform vec3 uColor; uniform float uA; varying vec2 vUv; void main(){ float e = 1.0 - abs(vUv.y - 0.5) * 2.0; gl_FragColor = vec4(uColor * 1.6 * e * uA, e * uA); }',
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  m.renderOrder = 3;
  return m;
}

export class Game {
  constructor(ctx, opts) {
    Object.assign(this, ctx); // renderer, scene, fx, ocean, audio, ui, sky
    if (this.audio && this.audio.setSubmerged) this.audio.setSubmerged(false); // never inherit a muffled mix from the last match
    this.opts = opts;
    this.diff = DIFFICULTY[opts.difficulty] || DIFFICULTY.normal;
    this.events = new Emitter();
    this.time = 0; this.frame = 0; this.vtime = 0;
    this.over = false; this.winner = -1;
    this.listener = { x: 0, z: 0 };
    this.obstacles = buildObstacles();
    this.nav = new NavGrid(this.obstacles);
    this.fountains = [fountain(0), fountain(1)];
    this.combat = new Combat(this);
    this.drones = new Drones(this);
    this.smokes = [];
    this.units = []; this.heroes = []; this.creeps = []; this.structures = []; this.ports = [];
    this.teams = TEAMS.map((t) => ({ ...t, kills: 0, era: 1, towersLost: 0, ageAnnounced: { 1: true } }));
    this.structureScale = 0;
    this.firstBlood = false;
    this.nextWave = MATCH.firstWave;
    this.waveNo = 0;
    this.combatHeat = 0;
    this.stormAt = rnd(250, 320); this.stormDur = 55; this.storm = 0;

    for (const s of STRUCTURE_LAYOUT) { const st = new Structure(this, s); this.structures.push(st); this.units.push(st); }
    this.boss = new Leviathan(this);
    if (this.reflect) this.reflect(this.boss.rig.root);
    this.units.push(this.boss);
    for (const p of PORT_LAYOUT) {
      const rig = buildPort();
      rig.root.position.set(p.x, 0, p.z);
      this.scene.add(rig.root);
      if (this.reflect) this.reflect(rig.root);
      this.ports.push({ ...p, owner: -1, prog: 0, rig, dist(o) { return Math.hypot(o.x - this.x, o.z - this.z); } });
    }

    // Heroes: player occupies slot 2 (mid) of their team.
    const names = [...BOT_NAMES].sort(() => Math.random() - 0.5);
    let ni = 0;
    this.bots = [];
    for (let team = 0; team < 2; team++) {
      for (let slot = 0; slot < 5; slot++) {
        const isPlayer = team === opts.playerTeam && slot === 2 && !opts.spectate;
        const h = new Hero(this, team, isPlayer ? (opts.playerName || 'You') : names[ni++ % names.length], isPlayer, slot);
        h.lane = LANE_OF_SLOT[slot];
        const sp = spawnPoint(team, slot);
        h.x = sp.x; h.z = sp.z; h.yaw = sp.yaw;
        this.heroes.push(h); this.units.push(h);
        if (isPlayer) { this.player = h; if (opts.autopilot) this.bots.push(new BotBrain(this, h, this.diff)); }
        else this.bots.push(new BotBrain(this, h, this.diff));
      }
    }
    this.ocean.setIslands(this.obstacles);

    this.events.on('levelUp', (h) => {
      if (h === this.player) { this.audio.play('levelUp'); this.ui.floatText(h.x, 16, h.z, `LEVEL ${h.level}`, '#ffe28a', 20); }
      this.fx.ring(h.x, h.z, h.radius, h.radius * 2.5, 0xffe28a, 0.7, 0.1);
    });
  }

  teamGlow(team) { return TEAMS[team].glow; }

  // ---------------------------------------------------------------- queries
  findTarget(u, range, mode) {
    let best = null, bs = Infinity;
    for (const o of this.units) {
      if (!o.alive || o.team === u.team || !o.targetable) continue;
      if ((o.kind === 'tower' || o.kind === 'citadel') && o.invulnerable) continue;
      if (o.kind === 'boss' && (mode !== 'hero' || !o.risen)) continue;
      if (o.kind === 'hero' && this.inEnemySmoke(o)) continue;
      const d2 = u.dist2(o);
      const r = range + o.radius;
      if (d2 > r * r) continue;
      let s = d2;
      if (mode === 'tower') s *= o.kind === 'creep' ? 0.3 : 1;
      else if (mode === 'creep') s *= o.kind === 'creep' ? 0.5 : o.kind === 'hero' ? 1 : 0.8;
      else if (mode === 'hero') s *= o.kind === 'hero' ? 0.55 : o.kind === 'creep' ? 1 : o.kind === 'boss' ? 1.6 : 1.2;
      if (s < bs) { bs = s; best = o; }
    }
    return best;
  }
  inEnemySmoke(h) {
    for (const s of this.smokes) if (s.team === h.team && (h.x - s.x) ** 2 + (h.z - s.z) ** 2 < s.r * s.r) return true;
    return false;
  }

  isStructureProtected(s) {
    if (s.tier === 'outer') return false;
    const mine = this.structures.filter((o) => o.team === s.team);
    if (s.tier === 'inner') return mine.some((o) => o.alive && o.tier === 'outer' && o.lane === s.lane);
    // citadel: vulnerable once two lanes are broken (two inner towers down); under the Dusk Tide one
    // breached lane is enough, so late stalemates end at a burning citadel instead of on the clock
    return mine.filter((o) => !o.alive && o.tier === 'inner').length < (this.duskTide ? 1 : 2);
  }

  weakestEnemyLane(team) {
    let best = 'mid', bs = Infinity;
    for (const lane of LANE_IDS) {
      const hp = this.structures.filter((s) => s.team !== team && s.lane === lane && s.alive).reduce((a, s) => a + s.hp, 0);
      if (hp < bs) { bs = hp; best = lane; }
    }
    return best;
  }

  // ---------------------------------------------------------------- economy
  ageUp(h, hullId) {
    if (!h.canAgeUp() || !HULLS[hullId] || HULLS[hullId].age !== h.age + 1) return false;
    const cost = h.nextAgeCost();
    if (h.gold < cost) return false;
    h.gold -= cost;
    h.spentAge = (h.spentAge || 0) + cost;
    h.setHull(hullId);
    syncShipVisual(h, 0.016, this.time);
    this.fx.ageUp(new THREE.Vector3(h.x, 0, h.z), this.teamGlow(h.team));
    this.events.emit('reforge', h);
    const team = this.teams[h.team];
    if (h === this.player) { this.audio.stinger('ageUp'); this.ui.announce(AGES[h.age - 1].name.toUpperCase(), HULLS[hullId].name, TEAMS[h.team].css); }
    else this.audio.play('levelUp', { x: h.x, z: h.z });
    if (!team.ageAnnounced[h.age]) {
      team.ageAnnounced[h.age] = true;
      if (h !== this.player) {
        const friendly = this.player ? h.team === this.player.team : h.team === 0;
        this.ui.announce(`${team.short.toUpperCase()} ENTERS THE ${AGES[h.age - 1].name.toUpperCase()}`, `${h.name} commissions ${/^[AEIOU]/.test(HULLS[hullId].name) ? 'an' : 'a'} ${HULLS[hullId].name}`, TEAMS[h.team].css, 'small');
        this.audio.stinger(friendly ? 'ageUp' : 'enemyAge');
      }
    }
    this.ui.feed(`<b style="color:${TEAMS[h.team].css}">${h.name}</b> advanced to the <b>${AGES[h.age - 1].name}</b>`);
    this.updateEra(h.team);
    return true;
  }

  buyUpgrade(h, id) {
    const c = h.upgradeCost(id);
    if (!isFinite(c) || h.gold < c) return false;
    h.gold -= c;
    h.spentUpg = (h.spentUpg || 0) + c;
    h.upg[id]++;
    h.refreshStats();
    if (h === this.player) this.audio.play('gold');
    return true;
  }

  updateEra(team) {
    const ages = this.heroes.filter((h) => h.team === team).map((h) => h.age).sort((a, b) => a - b);
    const era = ages[2]; // median
    const t = this.teams[team];
    if (era !== t.era) {
      t.era = era;
      for (const s of this.structures) if (s.team === team && s.alive) s.setEra(era);
    }
  }

  // ---------------------------------------------------------------- death
  kill(u, killer) {
    if (!u.alive) return;
    u.alive = false;
    u.hp = 0;
    u.sinkT = 0; u.sinkDir = Math.random() < 0.5 ? -1 : 1;
    const pos = new THREE.Vector3(u.x, 2, u.z);
    if (u.kind === 'boss') { this.bossDeath(u, killer); return; }
    if (u.kind === 'hero') this.heroDeath(u, killer, pos);
    else if (u.kind === 'creep') {
      this.fx.explosion(pos, u.heavy ? 1.2 : 0.8);
      this.audio.play('explosion', { x: u.x, z: u.z, vol: 0.7 });
      const k = killer && killer.kind === 'hero' ? killer : null;
      if (k) { k.gold += u.gold; k.creepKills++; if (k === this.player) { this.ui.goldPop(k, u.gold); this.audio.play('gold', { vol: 0.35 }); } }
      this.shareXp(u, u.xpVal, k);
    } else {
      this.structureDeath(u, killer, pos);
    }
  }

  shareXp(victim, xp, killer) {
    const near = this.heroes.filter((h) => h.alive && h.team !== victim.team && h.dist(victim) < REWARDS.xpShareRadius);
    if (killer && !near.includes(killer)) near.push(killer);
    if (!near.length) return;
    const each = (xp * (near.length > 1 ? 1.2 : 1)) / near.length;
    const avg = this.heroes.reduce((a, h) => a + h.level, 0) / this.heroes.length;
    for (const h of near) h.addXp(each * Math.min(1.6, Math.max(0.8, 1 + 0.12 * (avg - h.level))));
  }

  heroDeath(u, killer, pos) {
    this.fx.explosion(pos, 2.2);
    this.combat.after(0.35, () => this.fx.explosion(new THREE.Vector3(u.x + rnd(-5, 5), 3, u.z + rnd(-5, 5)), 1.5));
    this.combat.after(0.8, () => this.fx.explosion(new THREE.Vector3(u.x + rnd(-6, 6), 2, u.z + rnd(-6, 6)), 1.2));
    this.audio.play('death', { x: u.x, z: u.z, vol: 1.2 });
    u.deaths++;
    u.prevStreak = u.streak;
    u.streak = 0;
    u.respawn = MATCH.respawnBase + MATCH.respawnPerAge * u.age + u.level * 0.4;
    const behind = this.teams[1 - u.team].kills - this.teams[u.team].kills;
    if (behind > 4) u.respawn *= Math.max(0.6, 1 - behind * 0.025); // comeback: trailing team returns sooner
    this.drones.popShields(u);
    u.shield = 0; u.buffs = []; u.dash = null; u.pd = null;
    // assists
    const assisters = [];
    for (const [id, t] of u.damagers) {
      if (this.time - t > 10) continue;
      const h = this.heroes.find((x) => x.id === id);
      if (h && h !== killer && h.team !== u.team) assisters.push(h);
    }
    u.damagers.clear();
    // Comeback economy: shutdown bounties on streakers, diminishing bounty on feeders,
    // and kill gold scaled by the team kill differential.
    const victimStreak = u.prevStreak || 0;
    u.deathStreak = (u.deathStreak || 0) + 1;
    let bounty = (REWARDS.heroGold + REWARDS.heroGoldPerAge * u.age) * Math.max(0.45, 1 - 0.14 * (u.deathStreak - 1));
    bounty += victimStreak >= 3 ? 90 * victimStreak : 0;
    if (killer && killer.kind === 'hero') {
      const diff = this.teams[killer.team].kills - this.teams[u.team].kills;
      bounty *= diff > 0 ? Math.max(0.55, 1 - diff * 0.035) : Math.min(1.7, 1 - diff * 0.05);
    }
    bounty = Math.round(bounty);
    if (victimStreak >= 3) this.ui.announce('SHUTDOWN', `${killer && killer.name ? killer.name : 'The sea'} ends ${u.name}'s rampage`, TEAMS[1 - u.team].css, 'small');
    let killerName = 'the sea';
    if (killer && killer.kind === 'hero') {
      killer.kills++; killer.streak++; killer.deathStreak = 0;
      const streakBonus = Math.max(0, killer.streak - 2) * REWARDS.streakGold;
      killer.gold += bounty + streakBonus;
      this.teams[killer.team].kills++;
      killerName = `<b style="color:${TEAMS[killer.team].css}">${killer.name}</b>`;
      if (killer === this.player) { this.ui.floatText(u.x, 14, u.z, `+${bounty + streakBonus}`, '#ffd24a', 22); this.hitstop = 0.09; this.fx.shake(0.45, u.x, u.z); }
      if (!this.firstBlood) {
        this.firstBlood = true;
        this.ui.announce('FIRST BLOOD', `${killer.name} ${killer === this.player ? 'sink' : 'sinks'} ${u.name}`, TEAMS[killer.team].css);
        this.audio.stinger('firstBlood');
      } else {
        const now = this.time;
        killer.multi = (killer.lastKillT && now - killer.lastKillT < 12) ? (killer.multi || 1) + 1 : 1;
        killer.lastKillT = now;
        const MULTI = { 2: 'DOUBLE SINK', 3: 'TRIPLE SINK', 4: 'ARMADA BREAKER', 5: 'ADMIRAL OF THE SEAS' };
        if (MULTI[killer.multi]) { this.ui.announce(MULTI[killer.multi], killer.name, TEAMS[killer.team].css); this.audio.stinger('firstBlood'); }
        else if (killer.streak === 5) this.ui.announce('DOMINATING', `${killer.name} is on a rampage`, TEAMS[killer.team].css, 'small');
      }
    } else if (killer) {
      killerName = killer.kind === 'creep' ? 'a gunboat' : killer.kind === 'boss' ? '<b style="color:#7dfff0">the Leviathan</b>' : 'a fortress';
      if (killer.kind !== 'boss') this.teams[1 - u.team].kills++;
    }
    for (const a of assisters) { a.assists++; a.gold += Math.round(REWARDS.assistGold / Math.max(1, assisters.length) * 1.5); }
    this.shareXp(u, REWARDS.heroXp + REWARDS.heroXpPerLevel * u.level, killer && killer.kind === 'hero' ? killer : null);
    if (this.player && u.team === this.player.team && u !== this.player) this.ui.ping(u.x, u.z, '#ffb24a');
    this.ui.feed(`${killerName} sank <b style="color:${TEAMS[u.team].css}">${u.name}</b>${assisters.length ? ` <span class="dim">+${assisters.length}</span>` : ''}`);
    if (u === this.player) {
      this.ui.death(u.respawn, killer); this.audio.stinger('warning'); this.slowmo = 0.7; this.fx.shake(0.6, u.x, u.z);
      if (!(this.coached ||= {}).death) { this.coached.death = true; setTimeout(() => this.ui.hint('Sunk ships recommission at your citadel · fight near your gunboats and forts, and <b>retreat below a third of your hull</b>', 8000), 2500); }
    }
  }

  bossDeath(u, killer) {
    const team = killer && killer.team !== undefined && killer.team < 2 ? killer.team : null;
    for (let i = 0; i < 8; i++) this.combat.after(i * 0.3, () => this.fx.explosion(new THREE.Vector3(u.x + rnd(-30, 30), 4, u.z + rnd(-22, 22)), 2.2, { color: [0.8, 2.2, 2.0] }));
    this.combat.after(0.5, () => this.fx.megaExplosion(new THREE.Vector3(u.x, 4, u.z), 50));
    this.audio.play('roar', { x: u.x, z: u.z, vol: 1.3, pitch: 0.75 });
    this.audio.play('death', { x: u.x, z: u.z, vol: 1.4, pitch: 0.5 });
    u.sinkT = 0;
    if (team === null) return;
    for (const h of this.heroes) if (h.team === team) {
      h.gold += LEVIATHAN.gold;
      h.buffs.push({ t: 0, dur: LEVIATHAN.buffDur, dmgMul: 1.3, healPerSec: h.maxHp * 0.012, blessing: true });
    }
    this.ui.announce('LEVIATHAN SLAIN', `${TEAMS[team].name} claims the Leviathan's Blessing`, '#7dfff0');
    this.audio.stinger(this.player && this.player.team === team ? 'ageUp' : 'enemyAge');
    this.ui.feed(`<b style="color:${TEAMS[team].css}">${killer.name || TEAMS[team].short}</b> slew <b style="color:#7dfff0">the Leviathan</b> <span class="dim">(+${LEVIATHAN.gold} gold, +30% damage for ${LEVIATHAN.buffDur}s)</span>`);
  }

  structureDeath(u, killer, pos) {
    const big = u.kind === 'citadel';
    for (let i = 0; i < (big ? 10 : 5); i++) {
      this.combat.after(i * 0.28, () => this.fx.explosion(new THREE.Vector3(u.x + rnd(-u.radius, u.radius), rnd(4, 20), u.z + rnd(-u.radius, u.radius)), big ? 2.6 : 1.8, { water: false }));
    }
    this.combat.after(0.1, () => this.fx.megaExplosion(new THREE.Vector3(u.x, 6, u.z), big ? 60 : 28));
    this.audio.play(big ? 'citadelFall' : 'towerDown', { x: u.x, z: u.z, vol: big ? 1.4 : 1.3 });
    const enemy = 1 - u.team;
    this.teams[u.team].towersLost++;
    const g = u.def.gold || 0;
    for (const h of this.heroes) if (h.team === enemy) h.gold += g;
    if (killer && killer.kind === 'hero') killer.gold += Math.round(g * 0.5);
    if (!big) {
      const friendly = this.player ? u.team !== this.player.team : true;
      this.ui.announce(friendly ? 'FORTRESS DESTROYED' : 'OUR FORTRESS HAS FALLEN', `${TEAMS[enemy].name} destroys the ${u.lane} ${u.tier} tower`, TEAMS[enemy].css, 'small');
      this.audio.stinger('towerDown');
      this.ui.feed(`<b style="color:${TEAMS[enemy].css}">${TEAMS[enemy].short}</b> destroyed the ${u.lane} ${u.tier} tower`);
    } else {
      this.events.emit('citadelFall', u);
      this.endMatch(enemy, 'citadel');
    }
  }

  endMatch(winner, reason) {
    if (this.over) return;
    if (this.opts && this.opts.spectate) { this.time = Math.min(this.time, 340); return; } // the menu showreel never ends: no result screen or fanfare behind the menu
    this.over = true; this.winner = winner;
    if (this.audio.setSubmerged) this.audio.setSubmerged(false);
    this.slowmo = 1.8;
    const won = this.player ? winner === this.player.team : winner === 0;
    this.combat.after(winner < 0 ? 0.5 : 2.2, () => {
      this.audio.stinger(winner < 0 ? 'defeat' : won ? 'victory' : 'defeat');
      this.ui.endScreen(this, winner, reason);
    });
  }

  // ---------------------------------------------------------------- waves
  spawnWave() {
    this.waveNo++;
    for (let team = 0; team < 2; team++) {
      const era = this.teams[team].era;
      for (const lane of LANE_IDS) {
        const wp = laneFor(team, lane);
        const n = 3 + (this.waveNo >= 8 ? 1 : 0);
        const heavies = this.duskTide ? 2 : 1; // dusk tide: siege waves carry two heavy gunboats
        for (let k = 0; k < n + heavies; k++) {
          const heavy = k >= n;
          this.combat.after(k * 0.9, () => {
            const c = new Creep(this, team, lane, heavy, era, wp);
            c.x = wp[0].x + rnd(-6, 6); c.z = wp[0].z + rnd(-6, 6);
            c.yaw = Math.atan2(wp[1].x - wp[0].x, wp[1].z - wp[0].z);
            this.creeps.push(c); this.units.push(c);
          });
        }
      }
    }
  }

  /** Rally call: nearby allied captains break off and converge on the point for 25 s. */
  callRally(caller, x, z) {
    if (!caller || this.over || this.time - (this.rallyT?.[caller.team] ?? -99) < 6) return false;
    (this.rallyT ||= {})[caller.team] = this.time;
    (this.rally ||= {})[caller.team] = { x, z, until: this.time + 25, caller };
    this.fx.ring(x, z, 4, 34, 0xffd76a, 1.2, 0.08);
    this.ui.ping(x, z, '#ffd76a');
    if (caller === this.player) { this.ui.feed('<b style="color:#ffd76a">You</b> call the fleet to rally'); this.audio.play('capture', { vol: 0.6, pitch: 1.3 }); }
    return true;
  }

  // Effect cadence must not depend on the display's refresh rate. Frame-modulo and per-frame dice rolls tied
  // smoke/fire density to FPS (a 144 Hz screen laid ~5x the haze of the 30 Hz tests it was tuned on), so:
  /** True once per n/30 s, however often update() runs (n = the old "every n-th frame at 30 fps"). */
  pulse(n) { const k = 30 / n, t = this.vtime; return Math.floor(t * k) !== Math.floor((t - this.dt) * k); }
  /** A per-frame chance p (tuned at 30 fps) as a per-second rate. */
  chance(p, dt = this.dt) { return Math.random() < p * dt * 30; }

  // ---------------------------------------------------------------- update
  update(rawDt) {
    let dt = Math.min(rawDt, 1 / 20);
    if (this.slowmo > 0) { this.slowmo -= rawDt; dt *= 0.35; }
    if (this.hitstop > 0) { this.hitstop -= rawDt; dt *= 0.15; }
    this.dt = dt;
    this.frame++;
    this.vtime = (this.vtime || 0) + dt; // effect clock: keeps running after the match ends so ruins keep burning
    if (!this.over) this.time += dt;
    const t = this.time;
    this.structureScale = STRUCTURES.scalePerMin * (t / 60);

    // match flow
    if (!this.over) {
      if (t >= this.nextWave) { this.spawnWave(); this.nextWave += MATCH.waveInterval; }
      // catch-up stipend: captains behind the enemy fleet's median age earn faster passive gold
      const medAge = [0, 1].map((tm) => { const a = this.heroes.filter((x) => x.team === tm).map((x) => x.age).sort((p, q) => p - q); return a[a.length >> 1] || 1; });
      for (const h of this.heroes) {
        const gap = Math.max(0, medAge[1 - h.team] - h.age);
        h.gold += MATCH.passiveGold * dt * (h.isPlayer ? 1 : this.diff.goldMul) * (1 + 0.6 * gap);
        // harbour repairs: fast regeneration close to your own citadel
        if (h.alive && h.hp < h.maxHp) { if (!this.citadels) this.citadels = [0, 1].map((tm) => this.structures.find((st) => st.team === tm && st.kind === 'citadel')); const c = this.citadels[h.team]; if (c && c.alive && (c.x - h.x) ** 2 + (c.z - h.z) ** 2 < 90 * 90) h.hp = Math.min(h.maxHp, h.hp + h.maxHp * 0.06 * dt); }
        if (h.spawnGuard > 0) h.spawnGuard -= dt;
        for (const p of this.ports) if (p.owner === h.team) h.gold += PORTS.goldPerSec * dt;
      }
      if (t >= MATCH.duration) this.timeUp();
      // Dusk Tide (8:00): the endgame push. Heavier waves and crumbling forts turn stalemates into sieges.
      if (!this.duskTide && t >= 480) {
        this.duskTide = true;
        this.ui.announce('THE DUSK TIDE', 'Siege waves grow · every fortress crumbles, captains may siege alone', '#ffb35a');
        this.audio.stinger('enemyAge');
        if (this.audio.setFinale) this.audio.setFinale(true);
        this.ui.feed('<b style="color:#ffb35a">The Dusk Tide rises:</b> <span class="dim">heavier gunboat waves, forts take +70% damage and no longer need gunboat escort to be sieged. One breached lane now exposes a citadel.</span>');
      }
      // mid-match squall
      const inStorm = t > this.stormAt && t < this.stormAt + this.stormDur;
      if (inStorm && !this.storm) { this.ui.announce('A SQUALL ROLLS IN', 'Heavy seas · gunnery accuracy reduced', '#9fb6d0', 'small'); this.audio.stinger('warning'); }
      if (!inStorm && this.storm) this.ui.feed('<span class="dim">The squall passes.</span>');
      this.storm = inStorm ? 1 : 0;
    }

    // onboarding hints for the first minutes
    const pl = this.player;
    if (pl && !this.over) {
      const H = [
        [9, '<kbd>Click</kbd> the sea to sail · head for the <b>mid lane</b> and escort your gunboats'],
        [22, '<b>Hold</b> <kbd>Q</kbd><kbd>W</kbd><kbd>E</kbd><kbd>R</kbd> to aim an ability, <b>release to fire</b> · right-click cancels'],
        [40, 'Guns fire automatically · shells take time to land, so <b>keep moving</b> to dodge · red rings are incoming enemy salvos'],
        [58, 'Sinking gunboats earns <b>gold</b> · last hits pay the most · the top-left panel shows your next goal'],
        [80, 'Sail into a <b>trade port</b> (◆ on the minimap) to capture it · every captain on your team earns more gold'],
        [120, 'Forts only fall with gunboat support · break <b>two lanes</b> to expose the enemy citadel'],
      ];
      this.hintIdx ||= 0;
      if (this.hintIdx < H.length && this.time > H[this.hintIdx][0]) { this.ui.hint(H[this.hintIdx][1], 7000); this.hintIdx++; }
    }
    // onboarding: first time the next age is affordable
    if (pl && !this.over && pl.canAgeUp() && pl.gold >= pl.nextAgeCost() && !pl.hintedAge?.[pl.age]) {
      (pl.hintedAge ||= {})[pl.age] = true;
      this.ui.hint(`<b>${AGES[pl.age].name}</b> is within reach · press <kbd>T</kbd> to reforge your ship`, 6000);
      this.audio.play('levelUp', { vol: 0.5 });
    }
    // contextual coaching: each tip fires once, the first time its situation arises
    if (pl && !this.over && !pl.isBot && (this.coachT = (this.coachT || 0) + dt) > 0.5) {
      this.coachT = 0;
      const seen = (this.coached ||= {});
      const tip = (k, cond, msg, ms = 6500) => { if (!seen[k] && cond()) { seen[k] = true; this.ui.hint(msg, ms); return true; } return false; };
      const near = (arr, r) => arr.find((u) => u.alive && u.team !== pl.team && (u.x - pl.x) ** 2 + (u.z - pl.z) ** 2 < r * r);
      void (
        tip('lowhp', () => pl.alive && pl.hp / pl.maxHp < 0.35, '<b>Hull critical</b> · sail back toward your citadel, ships repair fast in the harbour') ||
        tip('enemycap', () => pl.alive && near(this.heroes, (pl.hull && pl.hull.guns ? pl.hull.guns.range : 80) * 1.1), '<b>Enemy captain in range</b> · <kbd>Right-click</kbd> them to focus fire, keep turning to dodge their shells') ||
        tip('ult', () => pl.abilities && pl.abilities[3] && pl.level >= (pl.abilities[3].minLevel || 1) && pl.level >= 3, '<b>Ultimate ready</b> · <kbd>R</kbd> is unlocked: save it for a team fight or a fleeing captain') ||
        tip('fortsolo', () => pl.alive && near(this.structures, 70) && !this.creeps.some((c) => c.alive && c.team === pl.team && (c.x - pl.x) ** 2 + (c.z - pl.z) ** 2 < 110 * 110), 'Forts shrug off captains who siege alone · <b>wait for your gunboats</b> to tank before you push') ||
        false // squall + Leviathan are covered by their banners and the Admiral's orders panel (no triple call-outs)
      );
      // first time either citadel opens up: make it an event, not a silent panel row
      for (const c of this.structures) if (c.kind === 'citadel' && c.alive && !c.invulnerable && !seen['cit' + c.team]) {
        seen['cit' + c.team] = true;
        const ours = c.team === pl.team;
        this.ui.announce(ours ? 'OUR CITADEL IS EXPOSED' : 'ENEMY CITADEL EXPOSED', ours ? 'Defend it: both inner forts have fallen' : 'Push with your gunboats to win', ours ? '#ff6a5a' : '#ffd76a');
        this.audio.stinger(ours ? 'warning' : 'towerDown');
      }
    }
    // bot shot-calling: every ~30 s a team's captains rally on the objective that matters now
    if (!this.over) for (const tm of [0, 1]) {
      this.shotT ||= [rnd(20, 40), rnd(20, 40)];
      this.shotT[tm] -= dt;
      if (this.shotT[tm] > 0 || (this.rally && this.rally[tm] && this.rally[tm].until > this.time)) continue;
      this.shotT[tm] = rnd(26, 36);
      let target = null, why = '';
      const boss = this.boss;
      if (boss && boss.risen && boss.alive) { target = boss; why = 'the Leviathan'; }
      else if (this.duskTide) {
        const forts = this.structures.filter((st) => st.alive && st.team !== tm && !st.invulnerable).sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp);
        if (forts[0]) { target = forts[0]; why = `the ${forts[0].kind === 'citadel' ? 'enemy citadel' : forts[0].lane + ' fort'}`; }
      }
      const caller = this.heroes.filter((h) => h.team === tm && h.alive && h !== this.player).sort((a, b) => b.level - a.level)[0];
      if (target && caller && this.callRally(caller, target.x, target.z) && this.player && tm === this.player.team) {
        this.ui.feed(`<b style="color:${TEAMS[tm].css}">${caller.name}</b> calls a rally at ${why} <span class="dim">(press G to call your own)</span>`);
      }
    }
    // ports
    for (const p of this.ports) this.updatePort(p, dt);
    // smokes
    for (let i = this.smokes.length - 1; i >= 0; i--) { const s = this.smokes[i]; s.t += dt; if (s.t > s.dur) this.smokes.splice(i, 1); }

    // AI + units
    // Update order is a coin flip every tick (not frame parity): the mirrored start makes duels recur on
    // the same frame parity (gun cooldowns are whole numbers of ticks), so a parity rule still hands one
    // team the first shot. A fresh coin per tick gives neither team a first-mover edge.
    const rev = Math.random() < 0.5;
    if (!this.over) { const n = this.bots.length; for (let i = 0; i < n; i++) this.bots[rev ? n - 1 - i : i].update(dt); }
    const H = this.heroes, nh = H.length;
    for (let i = 0; i < nh; i++) {
      const h = H[rev ? nh - 1 - i : i]; // same coin as the bots: movement + gunnery have no fixed first mover
      if (!h.alive) {
        h.respawn -= dt;
        if (h.respawn <= 0 && !this.over) this.respawnHero(h);
        continue;
      }
      h.update(dt);
      updateHeroEffects(this, h, dt);
      h.untargetable = this.inEnemySmoke(h) ? 0.1 : h.untargetable;
    }
    const C = this.creeps, S = this.structures;
    for (let i = 0, n = C.length; i < n; i++) C[rev ? n - 1 - i : i].update(dt);
    for (let i = 0, n = S.length; i < n; i++) S[rev ? n - 1 - i : i].update(dt);
    this.boss.update(dt);
    const ships = this.units.filter((u) => u.isShip && u.alive);
    separateShips(ships, dt);
    this.combat.update(dt);
    this.drones.update(dt);

    // visuals
    for (const u of this.units) this.syncVisual(u, dt, t);
    // cleanup dead creeps after sinking
    for (let i = this.creeps.length - 1; i >= 0; i--) {
      const c = this.creeps[i];
      if (!c.alive && c.sinkT > 4.5) {
        c.removeVisual();
        this.creeps.splice(i, 1);
        this.units.splice(this.units.indexOf(c), 1);
      }
    }
    for (const b of this.teams) b; // eslint
    this.combatHeat = Math.max(0, this.combatHeat - dt * 0.15);
  }

  timeUp() {
    // Score: structures destroyed x5 + kills + citadel damage/1000; tie-breaks below
    const score = [0, 1].map((tm) => this.teams[1 - tm].towersLost * 5 + this.teams[tm].kills
      + (this.structures.find((s) => s.team === 1 - tm && s.kind === 'citadel').maxHp - this.structures.find((s) => s.team === 1 - tm && s.kind === 'citadel').hp) / 1000);
    // tie-breaks (dusk decides, a 10-minute match should never end without a victor):
    // damage dealt to enemy forts, then total damage dealt by captains
    for (const tm of [0, 1]) {
      score[tm] += this.structures.filter((st) => st.team === 1 - tm).reduce((a, st) => a + (1 - Math.max(0, st.hp) / st.maxHp), 0) * 0.01;
      score[tm] += this.heroes.filter((h) => h.team === tm).reduce((a, h) => a + (h.dmgDealt || 0), 0) * 1e-9;
    }
    this.finalScore = score;
    const w = score[0] > score[1] ? 0 : score[1] > score[0] ? 1 : -1;
    this.ui.announce('TIME', w < 0 ? 'The seas are undecided' : `${TEAMS[w].name} controls the seas`, w < 0 ? '#ddd' : TEAMS[w].css);
    this.endMatch(w, 'time');
  }

  respawnHero(h) {
    const sp = spawnPoint(h.team, h.slot);
    h.alive = true; h.hp = h.maxHp; h.x = sp.x; h.z = sp.z; h.yaw = sp.yaw; h.speed = 0;
    if (h === this.player && this.audio.setSubmerged) this.audio.setSubmerged(false);
    h.sinkT = undefined; h.stun = 0; h.slowT = 0; h.path = []; h.moveX = null; h.attackOrder = null;
    h.rig.root.visible = true; h.spawnGuard = 3; // brief invulnerability: no spawn camping
    this.fx.ring(h.x, h.z, 4, 30, this.teamGlow(h.team), 0.8, 0.1);
    if (h === this.player) this.ui.respawned();
  }

  updatePort(p, dt) {
    const present = [0, 0];
    for (const h of this.heroes) if (h.alive && h.dist(p) < PORTS.radius + h.radius) present[h.team]++;
    const cap = present[0] && !present[1] ? 0 : present[1] && !present[0] ? 1 : -1;
    if (cap >= 0 && cap !== p.owner) {
      const dir = cap === 0 ? -1 : 1;
      p.prog += (dir * dt) / PORTS.captureTime;
      if (Math.abs(p.prog) >= 1) {
        p.prog = dir; p.owner = cap;
        p.rig.setOwner(cap);
        this.fx.ring(p.x, p.z, 10, PORTS.radius * 1.6, this.teamGlow(cap), 1, 0.08);
        this.audio.play('capture', { x: p.x, z: p.z });
        this.ui.feed(`<b style="color:${TEAMS[cap].css}">${TEAMS[cap].short}</b> captured the ${p.id} trade port <span class="dim">(+${PORTS.goldPerSec} gold/s each)</span>`);
      } else if (p.owner >= 0 && Math.sign(p.prog) !== Math.sign(p.owner === 0 ? -1 : 1) && Math.abs(p.prog) > 0.02) {
        p.owner = -1; p.rig.setOwner(-1);
      }
    }
    p.rig.update && p.rig.update(dt, this.time);
    if (this.pulse(4)) {
      const col = p.owner >= 0 ? TEAMS[p.owner].glow : 0xdddddd;
      if (Math.abs(p.prog) > 0.01 && p.owner < 0 || cap >= 0 && cap !== p.owner) {
        const a = Math.random() * 6.28;
        const c = new THREE.Color(cap >= 0 ? TEAMS[cap].glow : col);
        this.fx.p.add.emit({ x: p.x + Math.cos(a) * PORTS.radius, y: 1, z: p.z + Math.sin(a) * PORTS.radius, vy: 8, life: 0.8, s0: 1.4, s1: 0.2, r: c.r * 2, g: c.g * 2, b: c.b * 2, a0: 1, a1: 0, kind: 2 });
      }
    }
  }

  // captain's ship going down (visual only): magazine cook-offs, air venting where the hull slips under,
  // a groan of failing frames, and a boil of escaping air after she's gone
  sinkFx(u, r, dt) {
    const T = u.sinkT, T0 = T - dt, at = (s) => T0 < s && T >= s;
    const sd = u.sinkDir || 1, fx = Math.sin(u.yaw), fz = Math.cos(u.yaw), L = r.length;
    const P = this.fx.p;
    if (at(1.1)) this.audio.play('hullGroan', { x: u.x, z: u.z, vol: 1 });
    if (u === this.player && at(3.2)) this.audio.setSubmerged && this.audio.setSubmerged(true); // your ship slips under: the world muffles
    for (const [s, o] of [[1.6, 0.28], [2.7, -0.18]]) if (at(s)) {
      const k = sd * o * L;
      this.fx.explosion(new THREE.Vector3(u.x + fx * k, 3, u.z + fz * k), 0.78); // small: the hull silhouette must stay readable
      this.audio.play('explosion', { x: u.x, z: u.z, vol: 0.55 });
    }
    if (T > 1.3 && T < 6.6 && this.chance(0.55, dt)) {
      // the submerging end: air and spray jet out along the waterline
      const k = sd * L * (0.22 + 0.12 * Math.random()) * (T < 4 ? 1 : 0.4);
      const x = u.x + fx * k + rnd(-1.5, 1.5), z = u.z + fz * k + rnd(-1.5, 1.5), y = this.fx.waterY(x, z);
      for (let i = 0; i < 3; i++) P.alpha.emit({ x, y, z, vx: rnd(-2.5, 2.5), vy: rnd(7, 15), vz: rnd(-2.5, 2.5), life: rnd(0.6, 1.0),
        s0: 1, s1: rnd(3, 4.5), r: 0.93, g: 0.96, b: 1, a0: 0.5, a1: 0, kind: 3, grav: 16 });
      if (Math.random() < 0.3) P.alpha.emit({ x, y: y + 1, z, vx: rnd(-0.5, 0.5), vy: rnd(2, 4), vz: rnd(-0.5, 0.5), life: rnd(1.8, 2.6),
        s0: 2.5, s1: rnd(7, 10), r: 0.78, g: 0.79, b: 0.8, a0: 0.16, a1: 0, kind: 1, drag: 0.6 }); // steam where fire meets sea
    }
    if (at(6.5)) { this.ocean.decals.add(u.x, u.z, L * 0.9, 3.5, 1, 0.55, 2.4); this.audio.play('splash', { x: u.x, z: u.z, vol: 0.8, pitch: 0.6 }); }
    if (T > 6.3 && T < 9.5 && this.chance(0.45, dt)) {
      const a = Math.random() * 6.283, rr = Math.random() * L * 0.25;
      const x = u.x + Math.cos(a) * rr, z = u.z + Math.sin(a) * rr, y = this.fx.waterY(x, z);
      const g = 1 - (T - 6.3) / 3.2; // boil weakens as the air runs out
      for (let i = 0; i < 4; i++) P.alpha.emit({ x, y, z, vx: rnd(-2, 2), vy: rnd(3, 8) * g + 1, vz: rnd(-2, 2), life: rnd(0.4, 0.7),
        s0: 0.8, s1: rnd(2, 3.5) * (0.5 + g), r: 0.94, g: 0.97, b: 1, a0: 0.55, a1: 0, kind: 3, grav: 18 });
      this.ocean.decals.add(x, z, rnd(2, 4) * (0.6 + g), 2.2, 0, 0.7, 1.6);
    }
  }

  syncVisual(u, dt, t) {
    const r = u.rig;
    if (!r) return;
    if (u.kind === 'boss') {
      if (!u.alive && u.sinkT !== undefined) { u.sinkT += dt; u.rise = Math.max(0, 1 - u.sinkT / 3); if (u.sinkT > 3.2) r.root.visible = false; }
      u.sync(t);
      return;
    }
    if (u.kind === 'tower' || u.kind === 'citadel') {
      if (!u.alive) {
        u.sinkT += dt;
        r.root.position.y = -(Math.min(1, u.sinkT / 4) ** 2) * (u.kind === 'citadel' ? 30 : 22);
        r.root.rotation.z = Math.min(1, u.sinkT / 4) * 0.15;
        if (this.chance(0.4, dt)) this.fx.fire(new THREE.Vector3(u.x + rnd(-6, 6), 4, u.z + rnd(-6, 6)), 1.6);
        if (u.sinkT > 5 && r.root.visible) r.root.visible = false;
      }
      r.update && r.update(dt, t);
      return;
    }
    if (!u.alive) {
      u.sinkT += dt;
      if (u.kind === 'hero') this.sinkFx(u, r, dt);
      if (u.sinkT > (u.kind === 'hero' ? 7.2 : 5.5)) { r.root.visible = false; return; }
      if (this.chance(0.6, dt) && (u.kind !== 'hero' || u.sinkT < 4.6)) this.fx.fire(new THREE.Vector3(u.x + rnd(-3, 3), 2, u.z + rnd(-3, 3)), u.kind === 'hero' ? 1.5 : 0.8);
      if (this.pulse(3)) this.ocean.decals.add(u.x + rnd(-4, 4), u.z + rnd(-4, 4), r.beam * 1.2, 3, 0, 0.8, 1.5);
      if (this.pulse(5)) this.ocean.decals.add(u.x, u.z, r.beam * 1.5, 12, 2, 0.35, 0.4); // oil slick
    }
    syncShipVisual(u, dt, t, u.kind === 'hero' ? 0.8 : 1);
    if (u.kind === 'hero' && u.reforgeT < 1) {
      // reforge: ease-out-back scale-in with a molten emissive sparkle
      u.reforgeT = Math.min(1, u.reforgeT + dt / 0.75);
      const k = u.reforgeT, c1 = 1.9, c3 = c1 + 1;
      const e = 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2);
      r.root.scale.setScalar(0.6 + 0.4 * e);
      if (this.pulse(2)) {
        const a = Math.random() * 6.283, rr = Math.random() * r.length * 0.5;
        const c = new THREE.Color(TEAMS[u.team].glow);
        this.fx.p.add.emit({ x: u.x + Math.cos(a) * rr, y: Math.random() * r.height, z: u.z + Math.sin(a) * rr, vy: 12, life: 0.6, s0: 1.4, s1: 0.1, r: c.r * 3, g: c.g * 3, b: c.b * 3, a0: 1, a1: 0, kind: 2 });
      }
    } else if (u.kind === 'hero') r.root.scale.setScalar(this.viewScale || 1); // readability boost when zoomed out
    else if (u.kind === 'creep' && r.root.scale.x !== 0.9) r.root.scale.setScalar(0.9); // gunboats read a class below captains
    if (u.kind === 'hero') {
      if (!u.ring) { u.ring = heroRing(u.isPlayer ? 0xffd27a : TEAMS[u.team].glow, u.isPlayer); this.scene.add(u.ring); }
      u.ring.visible = u.alive;
      u.ring.position.set(u.x, 0, u.z);
      u.ring.material.uniforms.uTime.value = t;
      u.ring.scale.setScalar((r.length * 0.5 + 3) * (this.viewScale || 1) + Math.sin(t * 3) * (u.isPlayer ? 0.3 : 0));
    }
    if (u.kind === 'hero') {
      u.reforgeFlash = Math.max(0, (u.reforgeFlash || 0) - dt * 1.1);
      const want = u.alive ? Math.max(u.shield > 0 ? 1 : 0, Math.min(1.6, u.reforgeFlash || 0)) : 0;
      if (want && !u.shieldFx) { u.shieldFx = shieldMesh(TEAMS[u.team].glow); this.scene.add(u.shieldFx); }
      if (u.shieldFx) {
        const mu = u.shieldFx.material.uniforms;
        mu.uA.value += (want - mu.uA.value) * Math.min(1, dt * 8);
        mu.uTime.value = t;
        u.shieldFx.visible = mu.uA.value > 0.01;
        u.shieldFx.position.copy(r.root.position);
        u.shieldFx.quaternion.copy(r.root.quaternion);
        u.shieldFx.scale.set(r.beam * 0.95 + 3, r.height * 0.75 + 3, r.length * 0.62 + 2);
      }
    }
    if (!u.alive) return;
    const speed01 = Math.min(1, Math.abs(u.speed) / 25);
    r.update && r.update(dt, t, speed01);
    // idle turret sweep toward target
    if (r.turrets && u.target && u.target.alive) {
      const want = Math.atan2(u.target.x - u.x, u.target.z - u.z) - u.yaw;
      for (const tr of r.turrets) {
        const cur = tr.pivot.rotation.y;
        const d = Math.atan2(Math.sin(want - cur), Math.cos(want - cur));
        tr.pivot.rotation.y = cur + d * Math.min(1, dt * 4);
      }
    }
    // wake ribbon (continuous trail) + bow spray
    {
      const fx = Math.sin(u.yaw), fz = Math.cos(u.yaw);
      const L = r.length * 0.46;
      if (this.wakes) this.wakes.track(u.id, u.x - fx * L, u.z - fz * L, u.yaw, r.beam, speed01, u.alive);
    }
    u.wakeT = (u.wakeT || 0) - dt;
    if (u.wakeT <= 0 && speed01 > 0.1) {
      u.wakeT = u.kind === 'hero' ? 0.06 : 0.1;
      const fx = Math.sin(u.yaw), fz = Math.cos(u.yaw);
      const L = r.length * 0.5;
      // bow wave
      this.ocean.decals.add(u.x + fx * L * 0.9, u.z + fz * L * 0.9, r.beam * 0.7, 1.1, 0, 0.35 * speed01, 1.2);
      if (u.kind === 'hero' && speed01 > 0.5 && this.frame % 2 === 0) {
        const side = Math.random() < 0.5 ? 1 : -1;
        this.fx.p.alpha.emit({ x: u.x + fx * L * 0.85 + fz * side * r.beam * 0.4, y: 0.8, z: u.z + fz * L * 0.85 - fx * side * r.beam * 0.4,
          vx: fz * side * rnd(3, 7) + fx * 4, vy: rnd(3, 7), vz: -fx * side * rnd(3, 7) + fz * 4, life: 0.6, s0: 1.0, s1: 2.6, r: 0.95, g: 0.97, b: 1, a0: 0.45, a1: 0, kind: 3, grav: 18 });
      }
    }
    // hull-contact foam: where the hull meets the sea
    u.hullT = (u.hullT || 0) - dt;
    if (u.hullT <= 0 && (u.kind === 'hero' || this.frame % 2 === 0)) {
      u.hullT = 0.12;
      const fx = Math.sin(u.yaw), fz = Math.cos(u.yaw);
      const along = (Math.random() - 0.5) * r.length * 0.85, side = (Math.random() < 0.5 ? -1 : 1) * r.beam * 0.5;
      this.ocean.decals.add(u.x + fx * along + fz * side, u.z + fz * along - fx * side, r.beam * 0.55, 1.2, 0, 0.35, 0.8);
    }
    // funnel smoke / engine glow
    u.stackT = (u.stackT || 0) - dt;
    if (u.stackT <= 0) {
      u.stackT = 0.09;
      if (r.stacks) for (const s of r.stacks) { s.getWorldPosition(_v); this.fx.stackSmoke(_v, 0.22, u.kind === 'hero' ? 1 : 0.6); }
      const age = u.kind === 'hero' ? u.age : u.era;
      if (age >= 4 && r.engines) for (const e of r.engines) { e.getWorldPosition(_v); this.fx.trailGlow(_v, u.team === 0 ? [0.5, 1.2, 3] : [3, 0.9, 0.4], 2.6 * (0.4 + speed01), 0.14); }
    }
    // Leviathan's Blessing aura
    if (u.kind === 'hero' && u.buffs.some((b) => b.blessing) && this.pulse(3)) {
      const a = Math.random() * 6.283, rr = r.length * 0.4;
      this.fx.p.add.emit({ x: u.x + Math.cos(a) * rr, y: 1, z: u.z + Math.sin(a) * rr, vy: rnd(4, 9), life: 0.8, s0: 1.6, s1: 0.2, r: 0.5, g: 2.2, b: 2.0, a0: 1, a1: 0, kind: 2 });
    }
    // damage fire
    const hpF = u.hp / u.maxHp;
    if (hpF < 0.45 && this.chance((0.45 - hpF) * 1.6, dt)) {
      _v.set(u.x + rnd(-1, 1) * r.beam * 0.3, 2 + rnd(0, 2), u.z + rnd(-1, 1) * r.beam * 0.3);
      this.fx.fire(_v, u.kind === 'hero' ? 1 : 0.6);
    }
    // crippled: a dark plume climbs off the hull (thin and fast-fading, so it marks the ship without fogging the fight)
    if (u.kind === 'hero' && hpF < 0.25 && this.pulse(4)) {
      _v.set(u.x + rnd(-1, 1) * r.beam * 0.25, 3 + r.height * 0.3, u.z + rnd(-1, 1) * r.beam * 0.25);
      // near-black and oily, climbing straight up: distinct from the grey drift of powder and battle smoke
      this.fx.p.alpha.emit({ x: _v.x, y: _v.y, z: _v.z, vx: rnd(-0.3, 0.3) + 0.6, vy: rnd(10, 14), vz: rnd(-0.3, 0.3), life: rnd(1.8, 2.6),
        s0: 2.0, s1: rnd(6, 8), r: 0.035, g: 0.038, b: 0.05, a0: 0.55, a1: 0, kind: 1, drag: 0.25 });
    }
  }
}
