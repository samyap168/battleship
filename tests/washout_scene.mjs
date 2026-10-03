// Scene-level watchdog test: healthy frames untouched, a giant foam decal and a cream sea shader traced to the right component (node tests/washout_scene.mjs)
import { createRequire } from 'module';
const require = createRequire('/home/user/BlueWhale/tests/x.mjs');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
async function run(label, quality, setup, frames) {
  const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
  const page = await ctx.newPage(); const logs = [];
  page.on('console', (m) => { if (/\[render\]/.test(m.text())) logs.push(m.text().slice(0, 100)); }); page.on('pageerror', (e) => logs.push('ERR ' + e.message));
  await page.goto(`http://localhost:5173/?autoplay=1&photo=1&quality=${quality}&safe=0`);
  await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 120000 });
  const r = await page.evaluate(async ([setup, frames]) => {
    const A = window.__aa, R = A.R; A.paused = true; A.howto(false); A.cameraDir.cine = null; R.checkT = 0; R.wd = null; A.step(30, 1 / 30);
    let maxWarm = 0, bad = 0; const eachSample = () => { const s = R._sample(); maxWarm = Math.max(maxWarm, s.warmFrac); if (s.bad) bad++; };
    eval(setup);
    for (let i = 0; i < frames; i++) { A.step(1, 1 / 30); if (i % 10 === 0) eachSample(); await new Promise((r) => setTimeout(r, 0)); }
    const s = R._sample();
    return { fxOff: R.fxOff || [], state: R.wd && R.wd.state, finalBad: s.bad, warm: +s.warmFrac.toFixed(2), maxWarm: +maxWarm.toFixed(2), badSamples: bad, saved: localStorage.getItem('aa.fxoff'), seaSafe: A.R.sceneSteps.sea.live() === false, env: !!A.R.scene.environment };
  }, [setup, frames]);
  console.log(label.padEnd(30), JSON.stringify(r), logs.join(' | '));
  await ctx.close();
}
await run('healthy match start', 'high', '', 60);
await run('giant foam decal (white sea)', 'medium', "const f = A.cameraDir.focus; A.G.ocean.decals.add(f.x, f.z, 3000, 1e7, 0, 1, 0, 0); A.G.ocean.decals.add(f.x + 40, f.z - 30, 2500, 1e7, 0, 1, 0, 1);", 160);
await run('sea shader cream', 'medium', "const mesh = A.R.scene.children.find((c) => c.material && c.material.roughness === 0.06); mesh.material.emissive.setRGB(3, 2.7, 2.3);", 200);
await browser.close();
