// Two-window multiplayer test over BroadcastChannel (no internet needed): host + client join a lobby, play a few
// seconds of a replicated 5v5 (the other 8 seats are bots), exchange commands, and verify the peers never drifted
// (the host's state hash is compared against the client's at every snapshot).
// Usage: node tests/mp.mjs [seconds=40]
//   NET=peer  uses real WebRTC through a local PeerJS server (npm i peer; PeerServer({port: 9000, host: '0.0.0.0'}))
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const SECONDS = +process.argv[2] || 40;
const BASE = process.env.BASE || 'http://localhost:5173';
const PEER = process.env.NET === 'peer';
const QS = PEER ? 'quality=low&photo=1&peerhost=localhost&peerport=9000&peersecure=0' : 'quality=low&photo=1';
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
const errs = [];
const open = async (tag) => {
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errs.push(tag + ': ' + e.message));
  await p.goto(`${BASE}/?${QS}`);
  await p.waitForSelector('#mpBtn', { timeout: 120000, state: 'visible' });
  await p.evaluate(() => { window.__aa.paused = true; }); // the lobby is DOM only: keep the software renderer idle
  await p.click('#mpBtn', { timeout: 120000 });
  if (!PEER) await p.click('#mpNet button[data-v="local"]');
  await p.fill('#mpName', tag);
  return p;
};
const A = await open('Ahab');
await A.click('#mpHost');
await A.waitForSelector('.mp-roomcode');
const code = (await A.textContent('.mp-roomcode')).trim();
console.log('room', code);
const B = await open('Bligh');
await B.fill('#mpCode', code);
await B.click('#mpJoin');
await B.waitForSelector('.mp-lobby', { timeout: 30000 });
await A.waitForFunction(() => document.querySelectorAll('.seat.human, .seat.me').length >= 2, null, { timeout: 15000 });
const seatsA = await A.$$eval('.seat.human, .seat.me', (els) => els.map((e) => e.textContent.trim()));
console.log('lobby seats (host view):', JSON.stringify(seatsA));
await A.evaluate(() => { window.__aa.paused = false; }); await B.evaluate(() => { window.__aa.paused = false; });
await A.evaluate(() => document.getElementById('mpStart').click());
for (const [tag, p] of [['A', A], ['B', B]]) await p.waitForFunction(() => window.__aa.G && window.__aa.G.mp && window.__aa.session() && window.__aa.session().go, null, { timeout: 120000 }).catch((e) => { throw new Error(tag + ' never started: ' + e.message); });
console.log('match running on both');
// the sim is what is under test: skip drawing so two software-rendered pages do not starve it
for (const p of [A, B]) await p.evaluate(() => {
  window.__aa.paused = true; // drive the session by hand, faster than real time and without drawing
  const s = window.__aa.session(); s.maxSteps = 40; s.accCap = 1;
  setInterval(() => s.update(0.25), 25);
});
// both captains give orders now and then
const t0 = Date.now();
let n = 0;
while (Date.now() - t0 < SECONDS * 1000) {
  await A.evaluate((i) => { const G = window.__aa.G, p = G.player; window.__aa.cmd({ k: 'mv', x: p.x + (i % 2 ? 80 : -80), z: p.z + 40 }); }, n);
  await B.evaluate((i) => { const G = window.__aa.G, p = G.player; window.__aa.cmd({ k: 'mv', x: p.x - 60, z: p.z + (i % 2 ? 50 : -50) }); if (i % 3 === 0) window.__aa.cmd({ k: 'ca', i: 1, x: p.x, z: p.z }); }, n);
  n++;
  await A.waitForTimeout(2500);
}
// chat: a client's message (and a team-only one) reaches the host's screen
await B.evaluate(() => { const s = window.__aa.session(); s.chat('hello from Bligh'); s.chat('/t only my team'); });
await A.waitForTimeout(1500);
const chatA = await A.$$eval('#chatLog .cm', (els) => els.map((e) => e.textContent));
console.log('host chat log:', JSON.stringify(chatA));
await A.evaluate(() => window.__aa.session().mark(10, 20));
await A.waitForTimeout(800);
const pingOk = await A.evaluate(() => [...document.querySelectorAll('#feed .item')].some((e) => /pings the map/.test(e.textContent)));
console.log('team map ping shown:', pingOk);
const stat = (p) => p.evaluate(() => { const s = window.__aa.session(), G = window.__aa.G; return { tick: s.tick, desyncs: s.stats.desyncs, rtt: s.stats.rtt, behind: s.stats.behind, time: +G.time.toFixed(1), me: G.player.name, seat: G.player.seat, humans: G.heroes.filter((h) => h.human).map((h) => h.name) }; });
const a = await stat(A), b = await stat(B);
console.log('host  ', JSON.stringify(a));
console.log('client', JSON.stringify(b));
const chatOk = chatA.some((t) => t.includes('Bligh: hello from Bligh')) && !chatA.some((t) => t.includes('only my team')); // Bligh sits on the other team: team chat must not leak
// a full match ends on both peers with the result screen
let ended = true;
if (process.env.FULL) {
  for (const p of [A, B]) await p.waitForFunction(() => window.__aa.G.over, null, { timeout: 240000 }).catch(() => { ended = false; });
  await A.waitForTimeout(6000);
  const shown = await Promise.all([A, B].map((p) => p.evaluate(() => !!document.getElementById('end'))));
  const wins = await Promise.all([A, B].map((p) => p.evaluate(() => window.__aa.G.winner)));
  console.log('result screen shown (host, client):', shown.join(', '), '· winner on each peer:', wins.join(', '));
  ended = ended && shown.every(Boolean) && wins[0] === wins[1];
}
const ok = ended && chatOk && pingOk && a.tick > 1500 && b.tick > 1500 && b.desyncs === 0 && a.humans.length === 2 && b.humans.length === 2 && !errs.length;
console.log(ok ? `PASS: peers stayed in sync (${b.tick} ticks, 0 resyncs)` : 'FAIL');
if (errs.length) console.log('page errors:', errs.slice(0, 4).join(' | '));
await browser.close();
process.exit(ok ? 0 : 1);
