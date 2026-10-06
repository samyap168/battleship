import { AGE_HULLS, UPGRADES, ABILITIES, COUNTERS, TEAMS } from '../../core/config.js';
import { laneFor, fountain } from '../map.js';
import { cast, canCast } from '../abilities.js';

import { srand } from '../../core/rng.js';
const rnd = (a, b) => a + srand() * (b - a);

// Utility-style bot: every think tick it scores a handful of desires
// (retreat, fight, farm/push, capture, shop) and executes the winner.
export class BotBrain {
  constructor(G, hero, diff) {
    this.G = G; this.h = hero; this.d = diff;
    this.thinkT = rnd(0, 0.5);
    this.state = 'lane';
    this.branch = srand() < 0.5 ? 0 : 1;
    this.upgOrder = shuffle(['plating', 'gunnery', 'reload', 'engines', 'repair'], hero.slot);
    hero.aimSkill = diff.aim;
    this.lastHp = hero.hp;
    this.dest = null;
  }

  update(dt) {
    const h = this.h, G = this.G;
    if (!h.alive) { this.state = 'lane'; this.shop(); return; }
    this.thinkT -= dt;
    if (this.thinkT > 0) return;
    this.thinkT = this.d.react * rnd(0.6, 1.2);
    const tookDmg = this.lastHp - h.hp;
    this.lastHp = h.hp;

    this.shop();
    const hpF = h.hp / h.maxHp;
    const near = 170;
    const enemies = G.heroes.filter((e) => e.alive && e.team !== h.team && h.dist(e) < near && e.targetable);
    const allies = G.heroes.filter((a) => a.alive && a.team === h.team && a !== h && h.dist(a) < near);
    const enemyPower = enemies.reduce((s, e) => s + e.hp * e.dmgMul, 0);
    const allyPower = allies.reduce((s, a) => s + a.hp * a.dmgMul, 0) + h.hp * h.dmgMul;

    // ---- dodge: step out of a telegraphed enemy strike zone (reaction scales with difficulty)
    if (G.dangers && G.dangers.length) {
      G.dangers = G.dangers.filter((d) => d.until > G.time);
      const d = G.dangers.find((z) => z.team !== h.team && (h.x - z.x) ** 2 + (h.z - z.z) ** 2 < (z.r + h.radius) ** 2);
      if (d && srand() < this.d.aim) {
        const ax = h.x - d.x, az = h.z - d.z, l = Math.hypot(ax, az) || 1, side = h.slot % 2 ? 1 : -1;
        const out = d.r + h.radius + 12;
        h.attackOrder = null; this.dest = null; this.go(d.x + (ax / l) * out + (-az / l) * 10 * side, d.z + (az / l) * out + (ax / l) * 10 * side);
        this.thinkT = 0.35; // re-check soon
        return;
      }
    }
    // ---- rally: answer a teammate's rally call (unless badly hurt or already brawling nearby)
    const rally = G.rally && G.rally[h.team];
    if (rally && rally.until > G.time && rally.caller !== h && hpF > 0.4 && h.dist(rally) > 35 && h.dist(rally) < 520 && !(enemies.length && h.dist(enemies[0]) < 70)) {
      if (!this.ackRally || this.ackRally !== rally) { this.ackRally = rally; if (G.player && rally.caller === G.player && Math.random() < 0.5) G.ui.feed(`<b style="color:${TEAMS[h.team].css}">${h.name}</b>: on my way`); }
      h.attackOrder = null; this.go(rally.x + rnd(-15, 15), rally.z + rnd(-15, 15));
      this.tryAbilities(enemies, null, tookDmg);
      return;
    }
    // ---- retreat
    const outnumbered = enemyPower > allyPower * 1.35;
    if (this.state === 'retreat') {
      if (hpF > 0.92) this.state = 'lane';
    } else if (hpF < 0.28 || (hpF < 0.45 && outnumbered) || (hpF < 0.5 && outnumbered && G.teams[1 - h.team].kills - G.teams[h.team].kills >= 8) || (hpF < 0.6 && this.inEnemyTowerRange() && tookDmg > 0 && !this.creepsTanking())) {
      this.state = 'retreat';
    }

    if (this.state === 'retreat') {
      const f = fountain(h.team);
      h.attackOrder = null; // a retreating captain must stop chasing the target it was trading with
      this.go(f.x, f.z);
      // defensive casts
      this.tryDefensive(enemies, true, tookDmg);
      return;
    }

    // ---- fight: pick a kill target
    let prey = null, preyScore = -Infinity;
    for (const e of enemies) {
      const eF = e.hp / e.maxHp;
      const underTower = this.enemyTowerCovers(e.x, e.z);
      let s = (1 - eF) * 2 + (h.dmgMul * h.hp) / (e.dmgMul * e.hp + 1) - h.dist(e) / 200;
      // team play: focus the target allies are already shooting, and peel for an ally under attack
      s += Math.min(2, allies.filter((a) => a.attackOrder === e).length) * 0.3;
      if (allies.some((a) => e.attackOrder === a || (a.lastAttacker === e && a.hp / a.maxHp < 0.6))) s += 0.45;
      if (underTower && eF > 0.2) s -= 2;
      if (s > preyScore) { preyScore = s; prey = e; }
    }
    // a team that is well behind plays for picks under its own forts instead of feeding
    const deficit = G.teams[1 - h.team].kills - G.teams[h.team].kills;
    const cautious = deficit >= 8 && !this.enemyTowerCovers(h.x, h.z) && !G.duskTide;
    const aggressive = this.d.aggression + (allyPower > enemyPower ? 0.2 : -0.2) - (cautious ? 0.35 : 0);
    const engage = prey && (preyScore > 1.2 - aggressive || prey.hp / prey.maxHp < 0.3) && hpF > (cautious ? 0.55 : 0.4)
      && !(cautious && enemyPower > allyPower * 1.1);
    this.tryAbilities(enemies, prey, tookDmg);

    if (engage) {
      this.state = 'fight';
      const range = h.hull.guns.range;
      // kite: keep at ~85% of range rather than face-hugging
      const d = h.dist(prey);
      if (d > range * 0.9) this.go(prey.x + (prey.vx || 0) * 0.8, prey.z + (prey.vz || 0) * 0.8);
      else {
        const ax = h.x - prey.x, az = h.z - prey.z, l = Math.hypot(ax, az) || 1;
        const side = (h.slot % 2 ? 1 : -1);
        this.go(prey.x + (ax / l) * range * 0.75 + (-az / l) * 25 * side, prey.z + (az / l) * range * 0.75 + (ax / l) * 25 * side);
      }
      h.attackOrder = prey;
      return;
    }
    if (this.state === 'fight') { this.state = 'lane'; h.attackOrder = null; }

    // ---- contest the Leviathan when grouped and healthy
    const B = G.boss;
    if (B && B.alive && B.risen && hpF > 0.55 && !enemies.some((e) => e.dist(B) < 120)) {
      const alliesNear = G.heroes.filter((a) => a.alive && a.team === h.team && a.dist(B) < 200).length;
      const need = G.time > 420 ? 2 : 3; // grow bolder as dusk approaches
      if (alliesNear >= need || (B.hp / B.maxHp < 0.35 && h.dist(B) < 260)) {
        this.state = 'boss';
        const a = Math.atan2(h.z - B.z, h.x - B.x);
        this.go(B.x + Math.cos(a) * 62, B.z + Math.sin(a) * 62);
        h.attackOrder = B;
        this.tryAbilities([B], B, tookDmg);
        return;
      }
    }
    if (this.state === 'boss') { this.state = 'lane'; h.attackOrder = null; }
    // ---- capture a port opportunistically
    if (this.state !== 'capture' && srand() < 0.06 && hpF > 0.6) {
      const port = G.ports.find((p) => p.owner !== h.team && h.dist(p) < 260 && !G.heroes.some((e) => e.alive && e.team !== h.team && e.dist(p) < 90));
      if (port) { this.state = 'capture'; this.capPort = port; this.capT = 14; }
    }
    if (this.state === 'capture') {
      this.capT -= this.d.react;
      if (this.capPort.owner === h.team || this.capT <= 0) this.state = 'lane';
      else { this.go(this.capPort.x + rnd(-8, 8), this.capPort.z + rnd(-8, 8)); return; }
    }

    // ---- lane / push
    this.laneBehaviour();
  }

  go(x, z) {
    const h = this.h;
    if (!this.dest || Math.hypot(this.dest.x - x, this.dest.z - z) > 14 || !h.path.length) {
      this.dest = { x, z };
      h.setDestination(x, z);
    }
  }

  laneBehaviour() {
    const h = this.h, G = this.G;
    // late game: group up on the lane with the weakest enemy defenses
    if (G.time > 330 && !this.groupLane) {
      this.groupLane = G.weakestEnemyLane(h.team);
    }
    const lane = this.groupLane && G.time > 330 ? this.groupLane : h.lane;
    const wp = laneFor(h.team, lane);
    // lane front = furthest allied creep along this lane
    let front = null, best = -Infinity;
    for (const c of G.creeps) {
      if (!c.alive || c.team !== h.team || c.lane !== lane) continue;
      const prog = h.team === 0 ? c.x : -c.x;
      if (prog > best) { best = prog; front = c; }
    }
    const range = h.hull.guns.range;
    let tx, tz;
    if (front) {
      // stand slightly behind the front, toward our base
      const back = h.team === 0 ? -1 : 1;
      tx = front.x + back * range * 0.35 + rnd(-10, 10);
      tz = front.z + rnd(-14, 14);
    } else {
      // no creeps: hold at our furthest alive tower in the lane, else lane midpoint
      const t = G.structures.filter((s) => s.alive && s.team === h.team && s.lane === lane).sort((a, b) => (h.team === 0 ? b.x - a.x : a.x - b.x))[0];
      const p = t ? { x: t.x + (h.team === 0 ? 40 : -40), z: t.z * 0.9 } : wp[Math.floor(wp.length / 2)];
      tx = p.x; tz = p.z;
    }
    // tower safety: don't stand inside enemy tower range unless creeps tank it
    const tower = this.enemyTowerCovers(tx, tz);
    if (tower && !this.creepsTanking(tower)) {
      const ax = tx - tower.x, az = tz - tower.z, l = Math.hypot(ax, az) || 1;
      tx = tower.x + (ax / l) * (tower.def.range + 14);
      tz = tower.z + (az / l) * (tower.def.range + 14);
      if (h.team === 0 ? tx > tower.x : tx < tower.x) tx = tower.x + (h.team === 0 ? -1 : 1) * (tower.def.range + 14);
    }
    this.go(tx, tz);
    // hit the tower when creeps are tanking
    const tw = G.structures.find((s) => s.alive && s.team !== h.team && !s.invulnerable && h.dist(s) < range + s.radius + 25);
    if (tw && this.creepsTanking(tw)) h.attackOrder = tw;
    else if (h.attackOrder && h.attackOrder.kind !== 'hero') h.attackOrder = null;
  }

  enemyTowerCovers(x, z) {
    for (const s of this.G.structures) {
      if (!s.alive || s.team === this.h.team) continue;
      if ((s.x - x) ** 2 + (s.z - z) ** 2 < (s.def.range + 8) ** 2) return s;
    }
    return null;
  }
  inEnemyTowerRange() { return !!this.enemyTowerCovers(this.h.x, this.h.z); }
  creepsTanking(tower) {
    const t = tower || this.enemyTowerCovers(this.h.x, this.h.z);
    if (!t) return false;
    if (t.target && t.target.kind === 'creep') return true;
    return this.G.creeps.some((c) => c.alive && c.team === this.h.team && c.dist(t) < t.def.range);
  }

  // ------------------------------------------------------------------ abilities
  tryDefensive(enemies, retreating, tookDmg) {
    const h = this.h, G = this.G;
    h.abilities.forEach((ab, i) => {
      if (!canCast(h, i)) return;
      if (ab.type === 'buff') {
        if (ab.speedMul && (retreating || enemies.length)) cast(G, h, i, h.x, h.z);
        else if (ab.healPct && h.hp / h.maxHp < 0.55) cast(G, h, i, h.x, h.z);
        else if (ab.shield && (tookDmg > 0 || enemies.length)) cast(G, h, i, h.x, h.z);
      } else if (ab.type === 'smoke' && retreating && enemies.length) cast(G, h, i, h.x, h.z);
      else if (ab.type === 'mines' && retreating && enemies.length) cast(G, h, i, h.x, h.z);
      else if (ab.type === 'pointdefense' && this.threatCount() > 3) cast(G, h, i, h.x, h.z);
    });
  }

  threatCount() {
    const h = this.h, G = this.G;
    let n = 0;
    for (const d of G.drones.list) if (d.team !== h.team && d.type !== 'shield' && (d.x - h.x) ** 2 + (d.z - h.z) ** 2 < 60 * 60) n++;
    for (const p of G.combat.list) if (p.team !== h.team && p.type === 'homing' && (p.x - h.x) ** 2 + (p.z - h.z) ** 2 < 70 * 70) n++;
    return n;
  }

  tryAbilities(enemies, prey, tookDmg) {
    const h = this.h, G = this.G;
    if (srand() > this.d.abilityRate) return;
    this.tryDefensive(enemies, false, tookDmg);
    const creeps = G.creeps.filter((c) => c.alive && c.team !== h.team && h.dist(c) < 200);
    // combo order: open with crowd control on a healthy target, finish a weak one with burst
    const healthy = prey && prey.hp / prey.maxHp > 0.55;
    const isCC = (ab) => ab && (ab.stun || ab.slow || ab.type === 'dash' || ab.type === 'emp');
    const order = [0, 1, 2, 3].sort((a, b) => {
      const A = h.abilities[a], B = h.abilities[b];
      const sa = isCC(A) ? (healthy ? -1 : 1) : 0, sb = isCC(B) ? (healthy ? -1 : 1) : 0;
      return sa - sb || a - b;
    });
    for (const i of order) {
      if (!canCast(h, i)) continue;
      const ab = h.abilities[i];
      const range = ab.range || 0;
      const heroT = prey && h.dist(prey) <= range ? prey : enemies.find((e) => h.dist(e) <= range);
      const lead = (t, T) => ({ x: t.x + (t.vx || 0) * T * this.d.aim, z: t.z + (t.vz || 0) * T * this.d.aim });
      switch (ab.type) {
        case 'projectile':
        case 'beam': {
          let t = heroT;
          if (!t && creeps.length >= 3 && srand() < 0.4) t = creeps.find((c) => h.dist(c) < range);
          if (!t) break;
          const T = ab.speed ? h.dist(t) / ab.speed : 0.05;
          const p = lead(t, T);
          const err = (1 - this.d.aim) * 14;
          cast(G, h, i, p.x + rnd(-err, err), p.z + rnd(-err, err));
          return;
        }
        case 'dash':
          if (heroT && h.dist(heroT) < range * 0.9 && h.hp / h.maxHp > 0.5) { cast(G, h, i, heroT.x, heroT.z); return; }
          break;
        case 'barrage':
        case 'swarm': {
          let target = heroT ? lead(heroT, ab.delay || 1) : null;
          if (!target) {
            const c = clusterCenter(creeps.filter((c) => h.dist(c) < range), 30);
            if (c && c.n >= (ab.minLevel ? 4 : 3)) target = c;
          }
          if (!target && (ab.drone || ab.type === 'barrage')) {
            const tw = G.structures.find((s) => s.alive && s.team !== h.team && !s.invulnerable && h.dist(s) < range);
            if (tw && this.creepsTanking(tw)) target = { x: tw.x, z: tw.z };
          }
          if (ab.drone === 'fighter' && !target && enemies.length) target = enemies[0];
          if (target) { cast(G, h, i, target.x, target.z); return; }
          break;
        }
        case 'volley':
        case 'homing': {
          const inR = enemies.filter((e) => h.dist(e) <= range).length;
          const cr = creeps.filter((c) => h.dist(c) <= range).length;
          if (inR >= 1 || cr >= 5) { cast(G, h, i, h.x, h.z); return; }
          break;
        }
        case 'mines':
          if (enemies.length && enemies.some((e) => h.dist(e) < 80)) { cast(G, h, i, h.x, h.z); return; }
          break;
        default: break;
      }
    }
  }

  // ------------------------------------------------------------------ shop
  shop() {
    const h = this.h, G = this.G;
    if (h.canAgeUp() && h.gold >= h.nextAgeCost()) {
      const opts = AGE_HULLS[h.age + 1];
      let pick = opts[Math.min(this.branch, opts.length - 1)];
      if (opts.length > 1) {
        // counter-pick against the enemy fleet's current hulls (ties keep this captain's style)
        const enemy = G.heroes.filter((o) => o.team !== h.team).map((o) => o.hullId);
        const score = (id) => enemy.filter((e) => (COUNTERS[id] || []).includes(e)).length;
        const best = opts.reduce((a, b) => (score(b) > score(a) ? b : a), pick);
        if (score(best) > score(pick) + 1) pick = best;
        // composition: avoid a third copy of the same hull on the team
        const same = G.heroes.filter((o) => o !== h && o.team === h.team && o.hullId === pick).length;
        if (same >= 2) pick = opts.find((o) => o !== pick) || pick;
      }
      G.ageUp(h, pick);
      return;
    }
    // Upgrades get at most ~25% of lifetime earnings until the final age.
    const earned = h.gold + (h.spentAge || 0) + (h.spentUpg || 0);
    const budget = h.age === 5 ? Infinity : earned * 0.25 - (h.spentUpg || 0);
    for (const id of this.upgOrder) {
      const c = h.upgradeCost(id);
      if (!isFinite(c) || c > budget || h.gold < c) continue;
      G.buyUpgrade(h, id);
      return;
    }
  }
}

function clusterCenter(list, radius) {
  let best = null;
  for (const a of list) {
    let n = 0, sx = 0, sz = 0;
    for (const b of list) if ((a.x - b.x) ** 2 + (a.z - b.z) ** 2 < radius * radius) { n++; sx += b.x; sz += b.z; }
    if (!best || n > best.n) best = { x: sx / n, z: sz / n, n };
  }
  return best;
}

function shuffle(arr, seed) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = (seed * 7 + i * 13) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
