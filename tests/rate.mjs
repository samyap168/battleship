// Frame-rate independence of effects: node tests/rate.mjs <hz>   (try 20, 60, 144)
// Prints particles emitted per sim-second and the live smoke count; they should be about the same at every rate.
import { createRequire } from 'module';
const require = createRequire('/home/user/BlueWhale/tests/x.mjs');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const hz = +(process.argv[2] || 30);
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
page.on('pageerror', (e) => console.log('ERR', e.message));
await page.goto('http://localhost:5173/?autoplay=1&autopilot=1&photo=1&quality=low');
await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 120000 });
const r = await page.evaluate(async (hz) => {
  const A = window.__aa, G = A.G; A.paused = true; A.howto(false);
  while (G.time < 300) { for (let i = 0; i < 50; i++) A.ff(0.05); await new Promise((r) => setTimeout(r, 0)); }
  const P = A.fx.p; const cnt = { alpha: 0, add: 0 }; const wrap = (pool, k) => { const o = pool.emit.bind(pool); pool.emit = (x) => { cnt[k]++; return o(x); }; }; wrap(P.alpha, 'alpha'); wrap(P.add, 'add');
  // advance 6 sim-seconds as render frames at the given refresh rate, skipping the GPU draw (CPU sim + emit only)
  const dt = 1 / hz, frames = Math.round(6 * hz); const t0 = G.time; let aSum = 0;
  for (let i = 0; i < frames; i++) { A.ff(dt); aSum += P.alpha.n; }
  return { hz, simSecs: +(G.time - t0).toFixed(2), alphaEmitPerSec: Math.round(cnt.alpha / (G.time - t0)), addEmitPerSec: Math.round(cnt.add / (G.time - t0)), avgAlphaLive: Math.round(aSum / frames) };
}, hz);
console.log(JSON.stringify(r));
await browser.close();
