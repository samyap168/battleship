// VFX showcase: puts the player in a chosen hull next to enemies, casts abilities,
// and captures a sequence. Usage: node tests/showcase.mjs <hull> "<abilityIdx,...>" [prefix] [frames]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const [hull = 'mothership', casts = '3', prefix = 'show', frames = '4', dist = '130'] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const settle = (p) => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 250))))); // let the compositor present the finished frame
page.on('pageerror', (e) => console.log('ERR', e.message, e.stack));
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
await page.goto('http://localhost:5173/?autoplay=1');
await page.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 90000 });
await page.evaluate(async ([hull, d]) => {
  const A = window.__aa; A.paused = true; const G = A.G; const p = G.player;
  A.cameraDir.intro = 0; A.cameraDir.cine = null;
  for (let i = 0; i < 400; i++) G.update(0.05); // 20s: waves spawn
  const HULLS = { frigate: 1, ironclad: 2, dreadnought: 3, torpedo: 3, battleship: 4, carrier: 4, arsenal: 5, mothership: 5 };
  const target = HULLS[hull];
  const chain = { 2: 'ironclad', 3: ['dreadnought', 'torpedo'], 4: ['battleship', 'carrier'], 5: ['arsenal', 'mothership'] };
  while (p.age < target) {
    p.gold += 99999;
    const opts = chain[p.age + 1];
    const pick = Array.isArray(opts) ? (opts.includes(hull) ? hull : opts[0]) : opts;
    G.ageUp(p, pick);
  }
  p.level = 8; p.refreshStats(); p.hp = p.maxHp;
  // stage: player mid-map, enemy heroes + creeps in front
  p.x = -40; p.z = 30; p.yaw = Math.PI / 2;
  const enemies = G.heroes.filter((h) => h.team !== p.team);
  enemies.forEach((e, i) => { e.x = 60 + (i % 3) * 22; e.z = -10 + Math.floor(i / 3) * 40 + i * 6; e.yaw = -Math.PI / 2; e.path = []; });
  for (const b of G.bots) b.thinkT = 999; // freeze AI for a clean shot
  A.cameraDir.locked = true; A.cameraDir.distGoal = A.cameraDir.dist = d;
  A.cameraDir.snapTo(p.x + 40, p.z);
  A.step(20, 1 / 30);
}, [hull, +dist]);
const list = casts.split(',').map(Number);
await page.evaluate(async (list) => {
  const A = window.__aa; const G = A.G; const p = G.player;
  const e = G.heroes.find((h) => h.team !== p.team);
}, list);
for (let f = 0; f < +frames; f++) {
  if (f < list.length) await page.evaluate((i) => window.__aa.castAt(i), list[f]);
  await page.evaluate((n) => window.__aa.step(n, 1 / 30), f === 0 ? 12 : 18);
  await settle(page); await page.screenshot({ path: `tests/output/${prefix}${f}.png` });
}
await browser.close();
