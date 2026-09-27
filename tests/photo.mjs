// Photo mode: node tests/photo.mjs out.png x z dist [simSeconds] [query]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const [out, x, z, dist = '160', sim = '3', query = ''] = process.argv.slice(2); // x='player' frames your ship
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const settle = (p) => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 1200))))); // let the compositor present the finished frame
page.on('pageerror', (e) => console.log('ERR', e.message));
await page.goto(`http://localhost:5173/?autoplay=1${query}`);
await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 90000 });
await page.evaluate(async ([x, z, d, sim]) => {
  const A = window.__aa; A.paused = true;
  A.cameraDir.intro = 0; A.cameraDir.cine = null;
  while (A.G.time < sim - 1 && !A.G.over) { for (let i = 0; i < 100; i++) A.G.update(0.05); await new Promise((r) => setTimeout(r, 0)); }
  const follow = Number.isNaN(x);
  A.cameraDir.locked = follow;
  A.cameraDir.distGoal = A.cameraDir.dist = d;
  for (let k = 0; k < 4; k++) {
    A.cameraDir.cine = null; A.cameraDir.intro = 0; // the opening shot may start after page load
    if (!follow) { A.cameraDir.goal.set(x, 0, z); A.cameraDir.focus.set(x, 0, z); }
    A.step(8, 1 / 30);
  }
  const an = document.querySelector('#announce'); if (an) an.innerHTML = ''; // harness: no stale title cards
}, [x === 'player' ? NaN : +x, +z, +dist, +sim]);
await settle(page); await page.evaluate(() => window.__aa.step(1, 1 / 60)); await settle(page); // one fresh frame: queued banners switch on wall-clock timers while the sim is paused
await page.screenshot({ path: out, timeout: 180000 });
await browser.close();
