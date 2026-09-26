// VFX gallery: triggers effects in front of the camera and screenshots them.
// Usage: node tests/vfx.mjs <effect> [frames=3] [stepsPerFrame=6]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const [effect = 'explosion', frames = '3', spf = '6'] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const settle = (p) => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 250))))); // let the compositor present the finished frame
page.on('pageerror', (e) => console.log('ERR', e.message));
await page.goto('http://localhost:5173/?autoplay=1&photo=1');
await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 90000 });
await page.evaluate((effect) => {
  const A = window.__aa; A.paused = true; A.cameraDir.intro = 0; A.cameraDir.cine = null;
  const G = A.G, V = A.G.player.rig.root.position.constructor;
  A.cameraDir.locked = false; A.cameraDir.goal.set(-200, 0, 0); A.cameraDir.focus.set(-200, 0, 0); A.cameraDir.distGoal = A.cameraDir.dist = 110;
  A.step(4, 1 / 30);
  const fx = A.fx;
  const P = new V(-200, 2, 0);
  const run = {
    explosion: () => fx.explosion(P, 1.6),
    small: () => { fx.explosion(new V(-215, 2, 0), 0.8); fx.hitSpark(new V(-185, 3, 0), 1.2); fx.splash(-200, 15, 1.3); },
    mega: () => fx.megaExplosion(P, 40),
    emp: () => fx.emp(-200, 0, 30),
    rail: () => { fx.beam(new V(-260, 3, 10), new V(-140, 3, -10), 0x5fc4ff, 3.2, 0.5); fx.beam(new V(-260, 3, 10), new V(-140, 3, -10), 0xffffff, 1, 0.25); },
    ageup: () => fx.ageUp(P, 0x5fc4ff),
    muzzle: () => { for (let i = 0; i < 6; i++) fx.muzzle(new V(-220 + i * 8, 4, 0), new V(0, 0.1, -1), 1.3, i % 2 ? 'ball' : 'shell'); },
  };
  run[effect]();
}, effect);
for (let f = 0; f < +frames; f++) {
  await page.evaluate((n) => window.__aa.step(n, 1 / 30), +spf);
  await settle(page); await page.screenshot({ path: `tests/output/vfx_${effect}${f}.png`, timeout: 120000 });
}
await browser.close();
