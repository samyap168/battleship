// Controls end to end: desktop (edge peek, minimap, re-centre, free camera, settings) and phones in landscape and portrait
// (tap, drag, pinch, skill tap and drag-aim, minimap tap / double-tap / long-press, armory drawer, re-centre button).
//   BASE=http://localhost:5173 node tests/ui_controls.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const BASE = process.env.BASE || 'http://localhost:5173';
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const results = []; const check = (name, ok, extra = '') => { results.push(ok); console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${extra ? ' · ' + extra : ''}`); };

async function open(ctx, qs = '') {
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.errs = errs;
  await p.goto(`${BASE}/?autoplay=1&quality=low${qs}`);
  await p.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 120000 });
  await p.evaluate(() => { const A = window.__aa; A.howto(false); A.cameraDir.intro = 0; A.cameraDir.cine = null; for (let i = 0; i < 100; i++) A.ff(0.05); document.body.classList.remove('cinematic'); A.cameraDir.snapTo(A.G.player.x, A.G.player.z); });
  await p.evaluate(() => { window.__aa.R.render = () => {}; window.__aa.R.composer && (window.__aa.R.composer.render = () => {}); }); // the controls are under test, not the picture: a software renderer would delay events by seconds
  await p.waitForTimeout(800);
  return p;
}
const state = (p) => p.evaluate(() => { const A = window.__aa, c = A.cameraDir, pl = A.G.player; return { locked: c.locked, mode: c.mode, peek: Math.hypot(c.peek.x, c.peek.z), off: Math.hypot(c.focus.x - pl.x, c.focus.z - pl.z), dist: c.distGoal, yaw: c.yawGoal, path: pl.path.length, cd0: pl.cds[0], camfree: document.body.classList.contains('camfree') }; });
const center = (p, sel) => p.$eval(sel, (e) => { const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });

// ---------------------------------------------------------------- desktop
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const p = await open(ctx);
  await p.mouse.move(640, 360); await p.mouse.move(1278, 360); await p.waitForTimeout(1500);
  let s = await state(p); check('desktop: edge of screen peeks ahead', s.peek > 15 && s.locked, `peek ${s.peek.toFixed(0)}`);
  await p.mouse.move(640, 360); await p.waitForTimeout(1500); await p.evaluate(() => { const A = window.__aa; A.paused = true; for (let i = 0; i < 90; i++) A.cameraDir.update(1 / 60, A.G.player); A.paused = false; });
  s = await state(p); check('desktop: view springs back to the ship', s.peek < 6 && s.locked, `peek ${s.peek.toFixed(1)}`);
  // pointer over a HUD panel at the edge must not pan
  const sh = await p.$eval('#shop', (e) => { const r = e.getBoundingClientRect(); return [r.right - 3, r.top + r.height / 2]; }); await p.mouse.move(sh[0] - 40, sh[1]); await p.mouse.move(sh[0], sh[1]); await p.waitForTimeout(1500);
  s = await state(p); check('desktop: hovering a HUD panel near the screen edge does not pan', s.peek < 6, `peek ${s.peek.toFixed(1)}`);
  await p.mouse.move(640, 360);
  const mm = await center(p, '#mm');
  await p.mouse.click(mm[0] + 100, mm[1]); await p.waitForTimeout(900);
  s = await state(p); check('desktop: minimap left-click looks there and frees the camera', !s.locked && s.off > 300 && s.camfree, `off ${s.off.toFixed(0)}`);
  check('desktop: a re-centre button appears while the view is away', await p.$eval('#recenterBtn', (e) => getComputedStyle(e).display !== 'none'));
  await p.mouse.dblclick(mm[0] - 50, mm[1]); await p.waitForTimeout(800);
  s = await state(p); check('desktop: double-click on the minimap returns to the ship and locks', s.locked && s.off < 30, `off ${s.off.toFixed(0)}`);
  await p.mouse.click(mm[0] + 90, mm[1] + 20, { button: 'right' }); await p.waitForTimeout(300);
  s = await state(p); check('desktop: minimap right-click sends the ship', s.path > 0 && s.locked);
  await p.mouse.click(mm[0] + 100, mm[1]); await p.waitForTimeout(600);
  await p.keyboard.press('Space'); await p.waitForTimeout(700);
  s = await state(p); check('desktop: Space returns and locks', s.locked && s.off < 30);
  await p.mouse.click(mm[0] + 100, mm[1]); await p.waitForTimeout(600);
  const pc = await center(p, '#portrait'); await p.mouse.dblclick(pc[0], pc[1]); await p.waitForTimeout(700);
  s = await state(p); check('desktop: double-click on the ship portrait returns and locks', s.locked && s.off < 30);
  await p.mouse.click(mm[0] + 100, mm[1]); await p.waitForTimeout(500);
  await p.click('#recenterBtn'); await p.waitForTimeout(700);
  s = await state(p); check('desktop: the re-centre button returns and locks', s.locked && s.off < 30);
  // free camera mode
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  await p.click('#optCam button[data-v="free"]'); await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  await p.mouse.move(640, 360); await p.mouse.move(2, 360); await p.waitForTimeout(1500);
  s = await state(p); check('desktop free camera: edge pans and stays away from the ship', !s.locked && s.off > 20 && s.mode === 'free', `off ${s.off.toFixed(0)}`);
  await p.mouse.move(640, 360); await p.waitForTimeout(800);
  const s2 = await state(p); check('desktop free camera: stays where you left it', s2.off > s.off * 0.8);
  await p.keyboard.press('Space'); await p.waitForTimeout(700);
  s = await state(p); check('desktop free camera: Space returns and locks', s.locked && s.off < 30);
  check('desktop: no page errors', p.errs.length === 0, p.errs[0] || '');
  await ctx.close();
}

// ---------------------------------------------------------------- phones
for (const [name, w, h] of [['landscape 844x390', 844, 390], ['portrait 390x844', 390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const p = await open(ctx);
  const cdp = await ctx.newCDPSession(p);
  const touch = (type, pts) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: pts.map(([x, y], id) => ({ x, y, id })) });
  const tag = `phone ${name}`;
  const cx = w / 2, cy = h * 0.42;
  await p.touchscreen.tap(cx + (w > h ? 150 : 90), cy - 40); await p.waitForTimeout(300);
  let s = await state(p); check(`${tag}: tap the sea sails there`, s.path > 0);
  const y0 = s.yaw; await touch('touchStart', [[cx, cy]]); for (let i = 1; i <= 8; i++) await touch('touchMove', [[cx + i * 14, cy]]); await touch('touchEnd', []); await p.waitForTimeout(250);
  s = await state(p); check(`${tag}: one-finger drag orbits the view`, Math.abs(s.yaw - y0) > 0.2);
  const d0 = s.dist; await touch('touchStart', [[cx - 40, cy], [cx + 40, cy]]); for (let i = 1; i <= 8; i++) await touch('touchMove', [[cx - 40 - i * 10, cy], [cx + 40 + i * 10, cy]]); await touch('touchEnd', []); await p.waitForTimeout(250);
  s = await state(p); check(`${tag}: pinch zooms`, s.dist < d0 - 10, `${d0.toFixed(0)} -> ${s.dist.toFixed(0)}`);
  const mm = await center(p, '#mm'); await p.touchscreen.tap(mm[0] + 20, mm[1]); await p.waitForTimeout(400);
  s = await state(p); check(`${tag}: tap the minimap looks there`, !s.locked && s.off > 100, `off ${s.off.toFixed(0)}`);
  await p.touchscreen.tap(...(await center(p, '#recenterBtn'))); await p.waitForTimeout(600);
  s = await state(p); check(`${tag}: the ◎ button returns and locks`, s.locked && s.off < 60, `locked ${s.locked} off ${s.off.toFixed(0)}`);
  // (the headless software renderer delays real taps by whole seconds, so the two taps are dispatched together)
  await p.evaluate(([x, y]) => { const m = document.getElementById('mm'); for (let i = 0; i < 2; i++) { m.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'touch', pointerId: 9 + i, clientX: x, clientY: y, bubbles: true, cancelable: true, button: 0 })); m.dispatchEvent(new PointerEvent('pointerup', { pointerType: 'touch', pointerId: 9 + i, clientX: x, clientY: y, bubbles: true })); } }, [mm[0] + 20, mm[1]]); await p.waitForTimeout(800);
  s = await state(p); check(`${tag}: double-tap the minimap returns and locks`, s.locked && s.off < 60, `off ${s.off.toFixed(0)}`);
  await p.touchscreen.tap(mm[0] + 20, mm[1]); await p.waitForTimeout(500);
  const pc = await center(p, '#portrait'); await p.evaluate(([x, y]) => { const e = document.getElementById('portrait'); for (let i = 0; i < 2; i++) e.dispatchEvent(new PointerEvent('pointerup', { pointerType: 'touch', pointerId: 5 + i, clientX: x, clientY: y, bubbles: true })); }, pc); await p.waitForTimeout(800);
  s = await state(p); check(`${tag}: double-tap the ship portrait returns and locks`, s.locked && s.off < 60, `locked ${s.locked} off ${s.off.toFixed(0)}`);
  // skills: quick tap fires at the best target, drag aims by hand
  const q = await center(p, '.ab[data-i="0"]');
  await p.touchscreen.tap(...q); await p.waitForTimeout(300);
  s = await state(p); check(`${tag}: tapping a skill fires it`, s.cd0 > 0);
  await p.evaluate(() => { window.__aa.G.player.cds = window.__aa.G.player.cds.map(() => 0); });
  await touch('touchStart', [q]); for (let i = 1; i <= 6; i++) await touch('touchMove', [[q[0] - i * 30, q[1] - i * 30]]); const aiming = await p.evaluate(() => window.__aa.hudAiming ?? null); await touch('touchEnd', []); await p.waitForTimeout(300);
  s = await state(p); check(`${tag}: dragging a skill onto the sea aims and fires it`, s.cd0 > 0);
  await p.touchscreen.tap(...(await center(p, '#armBtn'))); await p.waitForTimeout(300);
  check(`${tag}: the armory drawer opens`, await p.evaluate(() => getComputedStyle(document.getElementById('shop')).display !== 'none'));
  await p.touchscreen.tap(cx, cy); await p.waitForTimeout(300);
  check(`${tag}: tapping the sea closes the drawer`, await p.evaluate(() => getComputedStyle(document.getElementById('shop')).display === 'none'));
  // options: reachable, scrollable and closable
  await p.touchscreen.tap(...(await center(p, '#optBtn'))); await p.waitForTimeout(400);
  const o = await p.evaluate(() => { const r = document.getElementById('options'); const b = document.getElementById('optResume'); if (r.classList.contains('hidden')) return { open: false }; b.scrollIntoView({ block: 'center' }); const br = b.getBoundingClientRect(); return { open: true, visible: br.top >= 0 && br.bottom <= innerHeight }; });
  check(`${tag}: options open and RESUME can be reached`, o.open && o.visible);
  await p.evaluate(() => document.getElementById('optResume').click()); await p.waitForTimeout(300);
  check(`${tag}: options close`, await p.evaluate(() => document.getElementById('options').classList.contains('hidden')));
  check(`${tag}: no page errors`, p.errs.length === 0, p.errs[0] || '');
  await ctx.close();
}
await browser.close();
const bad = results.filter((r) => !r).length;
console.log(bad ? `FAIL: ${bad} of ${results.length} control checks failed` : `PASS: ${results.length} control checks`);
process.exit(bad ? 1 : 0);
