// Washed-out-frame watchdog test: injects a cream-painting fault into individual post passes and checks the verdict (node tests/washout.mjs)
import { createRequire } from 'module';
const require = createRequire('/home/user/BlueWhale/tests/x.mjs');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const CREAM = 'void main(){ gl_FragColor = vec4(0.93,0.89,0.78,1.0); }';
async function run(label, setup, frames = 80) {
  const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
  const page = await ctx.newPage(); const logs = [];
  page.on('console', (m) => { if (/\[render\]/.test(m.text())) logs.push(m.text().slice(0, 110)); }); page.on('pageerror', (e) => logs.push('ERR ' + e.message));
  await page.goto('http://localhost:5173/?autoplay=1&photo=1&quality=high&safe=0');
  await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 120000 });
  const r = await page.evaluate(async ([setup, frames]) => {
    const A = window.__aa, R = A.R; A.paused = true; A.howto(false); A.cameraDir.cine = null; R.safeMode = false; R.checkT = 0; R.wd = null;
    A.step(30, 1 / 30);
    eval(setup);
    for (let i = 0; i < frames; i++) { A.step(1, 1 / 30); await new Promise((r) => setTimeout(r, 0)); }
    const s = R._sample();
    return { fxOff: R.fxOff || [], safe: R.safeMode, state: R.wd && R.wd.state, finalBad: s.bad, mean: Math.round(s.mean), spread: Math.round(s.spread), saved: localStorage.getItem('aa.fxoff') };
  }, [setup, frames]);
  console.log(label.padEnd(34), JSON.stringify(r), logs.join(' | '));
  await ctx.close();
}
const stub = "R.setSun = () => { R.rays.enabled = !R.raysBlocked; }; ";
// await run('rays paints cream', stub + `R.rays.material.fragmentShader = \`${CREAM}\`; R.rays.material.needsUpdate = true;`);
await run('nanguard paints cream', `R.nanGuard.material.fragmentShader = \`${CREAM}\`; R.nanGuard.material.needsUpdate = true;`);
await run('brief flash (no blame expected)', `R.grade.uniforms.uFlash.value = 3.0; setTimeout(() => { R.grade.uniforms.uFlash.value = 0; }, 150); R.flashHold = true; const o = R.render.bind(R); R.render = function(dt, t) { if (R.flashHold) R.grade.uniforms.uFlash.value = Math.max(R.grade.uniforms.uFlash.value, 0.0); return o(dt, t); };`, 60);
await run('scene itself bright (no post blame)', `R.grade.material.fragmentShader = \`${CREAM}\`; R.grade.material.needsUpdate = true;`, 140);
await browser.close();
