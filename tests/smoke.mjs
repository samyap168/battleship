// ~30 s smoke test: the page loads, a match starts, two minutes of game time run, nothing throws, the world is alive.
//   BASE=http://localhost:5173 node tests/smoke.mjs        (after `npm run build && npx vite preview --port 5173`)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const BASE = process.env.BASE || 'http://localhost:5173';
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 800, height: 480 } });
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
await page.goto(`${BASE}/?autoplay=1&quality=low`);
await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 120000 });
const r = await page.evaluate(() => {
  const A = window.__aa; A.howto(false); A.paused = true;
  for (let i = 0; i < 2400; i++) A.ff(0.05); // two minutes of game time
  const G = A.G;
  return { time: +G.time.toFixed(0), units: G.units.length, heroes: G.heroes.length, finite: G.units.every((u) => Number.isFinite(u.x) && Number.isFinite(u.z) && Number.isFinite(u.hp)), glErr: A.R.gl.getContext().getError() };
});
await browser.close();
console.log(JSON.stringify(r), errs.length ? 'errors: ' + errs.slice(0, 3).join(' | ') : 'no page errors');
const ok = r.time >= 110 && r.units > 20 && r.heroes === 10 && r.finite && !errs.length;
console.log(ok ? 'PASS: smoke' : 'FAIL: smoke');
process.exit(ok ? 0 : 1);
