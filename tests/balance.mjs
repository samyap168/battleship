// Balance batch: node tests/balance.mjs [matches] > run.log ; python3 tests/balance.py run.log
// Credits kills, deaths and damage to the hull held at that moment and normalises by minutes in that hull,
// so mid-game hulls get fair numbers even though every captain ages past them.
import { createRequire } from 'module';
const require = createRequire('/home/user/BlueWhale/tests/x.mjs');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const N = +(process.argv[2] || 8);
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 800, height: 450 } });
page.on('pageerror', (e) => console.log('ERR', e.message));

for (let k = 0; k < N; k++) {
  const team1 = k % 2 === 1; // alternate: half the runs get &team=1
  const url = `http://localhost:5173/?autoplay=1&autopilot=1&quality=low${team1 ? '&team=1' : ''}`;
  await page.goto(url);
  await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 90000 });
  const r = await page.evaluate(async () => {
    const A = window.__aa; A.paused = true; const G = A.G;
    const castCounts = {};
    const branchPicks = {};
    let bossKilledBy = null, endReason = null;
    // telegraph-hit tracking: how often a hero takes damage while standing in a live hostile G.dangers zone
    const telegraph = { casts: 0, hitsWhileInZone: 0, heroHitsTotal: 0 };
    G.events.on('cast', (e) => {
      const hid = e.hero.hullId;
      castCounts[hid] ||= {};
      castCounts[hid][e.ability.name] = (castCounts[hid][e.ability.name] || 0) + 1;
      if (e.ability.type === 'barrage') telegraph.casts++;
    });
    const origAgeUp = G.ageUp.bind(G);
    G.ageUp = (h, hullId) => { const res = origAgeUp(h, hullId); if (res !== false) branchPicks[hullId] = (branchPicks[hullId] || 0) + 1; return res; };
    const origBossDeath = G.bossDeath.bind(G);
    G.bossDeath = (u, killer) => { bossKilledBy = killer && killer.team; return origBossDeath(u, killer); };
    const origEndMatch = G.endMatch.bind(G);
    G.endMatch = (w, reason) => { endReason = reason; return origEndMatch(w, reason); };
    // per-hull exposure accounting: credit kills/deaths/damage to the hull held at that moment
    const HX = {}; const hx = (id) => (HX[id] ||= { secs: 0, kills: 0, deaths: 0, dmg: 0 });
    const srcHero = (s) => s && s.kind === 'hero' ? s : s && s.owner && s.owner.kind === 'hero' ? s.owner : null;
    const origKill = G.kill.bind(G);
    G.kill = (u, killer) => { if (u && u.alive && u.kind === 'hero') { hx(u.hullId).deaths++; const k = srcHero(killer); if (k) hx(k.hullId).kills++; } return origKill(u, killer); };
    const origDamage = G.combat.damage.bind(G.combat);
    G.combat.damage = (target, amount, source, opts = {}) => {
      if (target && target.kind === 'hero' && target.alive && amount > 0 && G.dangers && G.dangers.length) {
        telegraph.heroHitsTotal++;
        const inZone = G.dangers.some((d) => d.team !== target.team && (target.x - d.x) ** 2 + (target.z - d.z) ** 2 < (d.r + target.radius) ** 2);
        if (inZone) telegraph.hitsWhileInZone++;
      }
      const hp0 = target ? target.hp : 0, res = origDamage(target, amount, source, opts);
      const sh = srcHero(source); if (sh && target && target.kind === 'hero' && target.team !== sh.team) hx(sh.hullId).dmg += Math.max(0, hp0 - target.hp);
      return res;
    };

    while (!G.over && G.time < 700) {
      for (let i = 0; i < 200; i++) { G.update(0.05); for (const h of G.heroes) if (h.alive) hx(h.hullId).secs += 0.05; if (G.over) break; }
      await new Promise((r) => setTimeout(r, 0));
    }
    const heroes = G.heroes;
    const totalDmg = heroes.reduce((a, h) => a + (h.dmgDealt || 0), 0);
    const perHero = heroes.map((h) => ({
      team: h.team, hullId: h.hullId, kills: h.kills || 0, deaths: h.deaths || 0, assists: h.assists || 0,
      dmgDealt: Math.round(h.dmgDealt || 0), age: h.age, isPlayer: !!h.isPlayer,
    }));
    return {
      t: Math.round(G.time), winner: G.winner, endReason, duskTide: !!G.duskTide,
      playerTeam: G.player ? G.player.team : null,
      kills: [0, 1].map((tm) => heroes.filter((h) => h.team === tm).reduce((a, h) => a + (h.kills || 0), 0)),
      ages: heroes.map((h) => h.age).join(''),
      perHero, castCounts, branchPicks, telegraph, HX,
      bossKilledBy, bossRisen: G.boss ? G.boss.risen : null, bossAlive: G.boss ? G.boss.alive : null,
      finalScore: G.finalScore || null,
    };
  });
  console.log(JSON.stringify({ runTeamParam: team1 ? 1 : 0, ...r }));
}
await browser.close();
