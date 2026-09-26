// Gameplay harness. Boots ?autoplay, pauses the rAF loop, then advances the
// simulation deterministically and screenshots at the requested match times.
// Usage: node tests/play.mjs "5,30,90" [prefix=play] [query] [w=1600] [h=900]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const [times = '5', prefix = 'play', query = '', w = '1600', h = '900'] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const errs = [];
page.on('console', (m) => { const t = m.text(); if ((m.type() === 'error' || m.type() === 'warning') && !t.includes('CERT')) errs.push(`[${m.type()}] ${t}`); });
page.on('pageerror', (e) => errs.push(`[pageerror] ${e.message}\n${e.stack}`));
await page.goto(`http://localhost:5173/?autoplay=1${query}`, { waitUntil: 'load' });
await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 90000 });
await page.evaluate(() => { window.__aa.paused = true; });
const t0 = Date.now();
for (const [i, ts] of times.split(',').entries()) {
  await page.evaluate(async (target) => {
    const A = window.__aa;
    // pure simulation for the bulk, then ~1s of full ticks so VFX/decals are live
    while (A.G.time < target - 1 && !A.G.over) { for (let i = 0; i < 100 && A.G.time < target - 1; i++) A.G.update(0.05); await new Promise((r) => setTimeout(r, 0)); }
    A.cameraDir.intro = 0; A.cameraDir.cine = null;
    for (let k = 0; k < 4 && (A.G.time < target || A.G.over); k++) A.step(8, 1 / 30);
    A.step(1, 1 / 30);
  }, +ts);
  await page.screenshot({ path: `tests/output/${prefix}${i}.png` });
}
const summary = await page.evaluate(() => {
  const G = window.__aa.G;
  const h = G.heroes.map((x) => `${x.team}:${x.name.slice(0, 8)} ${x.hullId} L${x.level} ${x.kills}/${x.deaths} g${Math.floor(x.gold)} ${x.alive ? 'hp' + Math.round(x.hp) : 'dead'} @${Math.round(x.x)},${Math.round(x.z)}`);
  return { time: G.time.toFixed(1), kills: G.teams.map((t) => t.kills), era: G.teams.map((t) => t.era), towersLost: G.teams.map((t) => t.towersLost),
    creeps: G.creeps.length, drones: G.drones.list.length, proj: G.combat.list.length, ports: G.ports.map((p) => p.owner), over: G.over, winner: G.winner, heroes: h };
});
console.log(`wall ${((Date.now() - t0) / 1000).toFixed(1)}s`);
console.log(JSON.stringify(summary));
console.log(errs.slice(0, 20).join('\n'));
await browser.close();
