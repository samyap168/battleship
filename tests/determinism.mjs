// Determinism check for multiplayer: the same seed + the same commands must give the same match whatever the
// frame pattern is (peers render at different rates). Runs one match three ways and compares state hashes.
// Usage: node tests/determinism.mjs [ticks=7200]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const TICKS = +process.argv[2] || 7200;
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
await page.goto((process.env.BASE || 'http://localhost:5173') + '/?autoplay=1&quality=low');
await page.waitForFunction(() => window.__aa && window.__aa.R, null, { timeout: 120000 });
await page.evaluate(() => { window.__aa.paused = true; });

const run = (pattern) => page.evaluate(async ([TICKS, pattern]) => {
  const A = window.__aa;
  A.play({ mp: true, seed: 12345, autopilot: true });
  const G = A.G; A.howto(false);
  const TICK = 1 / 60, out = [];
  const hash = () => {
    let h = 2166136261 >>> 0;
    const eat = (v) => { const s = String(v); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } };
    for (const u of G.units) { eat(u.id); eat(u.x); eat(u.z); eat(u.hp); eat(u.alive); }
    for (const t of G.heroes) { eat(t.gold); eat(t.level); eat(t.hullId); eat(t.kills); }
    for (const p of G.combat.list) { eat(p.x); eat(p.z); }
    return h >>> 0;
  };
  for (let i = 1; i <= TICKS; i++) {
    G.restoreTickPose(); // as the multiplayer session does: poses are blended for drawing, exact for the sim
    G.tick(TICK);
    if (i % pattern === 0) { G.visualUpdate(TICK * pattern); G.presentPose((i % 7) / 7); }
    if (i % 600 === 0) { out.push([i, hash()]); await new Promise((r) => setTimeout(r, 0)); }
  }
  return { out, creeps: G.creeps.length, kills: G.teams.map((t) => t.kills) };
}, [TICKS, pattern]);

const a = await run(1), b = await run(5), c = await run(1);
console.log('run1', JSON.stringify(a.kills), 'creeps', a.creeps);
console.log('run2', JSON.stringify(b.kills), 'creeps', b.creeps);
let firstBad = null;
for (let i = 0; i < a.out.length; i++) {
  const same = a.out[i][1] === b.out[i][1], same2 = a.out[i][1] === c.out[i][1];
  if ((!same || !same2) && firstBad === null) firstBad = a.out[i][0];
}
console.log(firstBad === null ? `DETERMINISTIC over ${TICKS} ticks (${a.out.length} checkpoints, frame patterns 1 vs 5, rerun)` : `DIVERGED at tick ${firstBad}`);
console.log(errs.length ? 'page errors: ' + errs.slice(0, 3).join(' | ') : 'no page errors');
await browser.close();
process.exit(firstBad === null && !errs.length ? 0 : 1);
