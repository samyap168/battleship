// Full-match regression: simulates a whole match, asserts no runtime errors,
// and screenshots the end screen. Usage: node tests/fullmatch.mjs [query]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const query = process.argv[2] ?? '&autopilot=1';
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const settle = (p) => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 250))))); // let the compositor present the finished frame
const errs = [];
page.on('pageerror', (e) => errs.push(`[pageerror] ${e.message}\n${e.stack}`));
page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('CERT')) errs.push(`[console] ${m.text()}`); });
await page.goto(`http://localhost:5173/?autoplay=1${query}`);
await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 90000 });
const res = await page.evaluate(async () => {
  const A = window.__aa; A.paused = true; const G = A.G;
  const errors = [];
  while (!G.over && G.time < 620) {
    try { for (let i = 0; i < 100; i++) G.update(0.05); } catch (e) { errors.push(e.stack); break; }
    await new Promise((r) => setTimeout(r, 0));
  }
  A.cameraDir.intro = 0; A.cameraDir.cine = null;
  for (let k = 0; k < 40 && !document.querySelector('#end'); k++) A.step(15, 1 / 30); // let the end screen appear (slow-mo aware)
  return { time: G.time.toFixed(0), winner: G.winner, kills: G.teams.map((t) => t.kills), towers: G.teams.map((t) => t.towersLost), ages: G.heroes.map((h) => h.age).join(''), errors, endShown: !!document.querySelector('#end') };
});
await settle(page); await page.screenshot({ path: 'tests/output/end.png', timeout: 180000 });
console.log(JSON.stringify(res));
console.log(errs.slice(0, 10).join('\n') || 'no page errors');
await browser.close();
