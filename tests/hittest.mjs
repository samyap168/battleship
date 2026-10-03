// Click hit-test: node tests/hittest.mjs [w] [h]. Lists any non-control HUD element that would swallow clicks meant for the sea (expect none).
import { createRequire } from 'module';
const require = createRequire('/home/user/BlueWhale/tests/x.mjs');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const W = +(process.argv[2] || 1600), H = +(process.argv[3] || 900);
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.goto('http://localhost:5173/?autoplay=1&photo=1&quality=low');
await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 120000 });
await page.evaluate(async () => { const A = window.__aa, G = A.G; A.paused = true; A.howto(false); A.cameraDir.cine = null; while (G.time < 20) { for (let i = 0; i < 20; i++) A.ff(0.05); await new Promise((r) => setTimeout(r, 0)); } A.step(10, 1 / 30); document.querySelector('#announce').innerHTML = ''; });
const r = await page.evaluate(() => {
  const bad = {}, W = innerWidth, H = innerHeight; let n = 0;
  for (let y = 4; y < H; y += 12) for (let x = 4; x < W; x += 12) {
    const e = document.elementFromPoint(x, y); n++;
    if (!e || e.tagName === 'CANVAS' || e === document.body || e === document.documentElement) continue;
    if (e.closest('.panel, button, .card, #howto, #options, input, #fps, .ab, #tip')) continue; // real controls
    const id = e.id || e.className || e.tagName; const key = id + ' < ' + (e.parentElement && (e.parentElement.id || e.parentElement.className || e.parentElement.tagName));
    (bad[key] ||= []).push([x, y]);
  }
  return { n, bad: Object.entries(bad).map(([k, v]) => `${k}: ${v.length} pts, x ${Math.min(...v.map((p) => p[0]))}-${Math.max(...v.map((p) => p[0]))}, y ${Math.min(...v.map((p) => p[1]))}-${Math.max(...v.map((p) => p[1]))}`) };
});
console.log(W + 'x' + H, 'points', r.n); console.log(r.bad.join('\n') || 'no click-blocking non-control elements');
await browser.close();
