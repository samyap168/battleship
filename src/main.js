import * as THREE from 'three';
import './ui/style.css';
import { Renderer } from './render/renderer.js';
import { Sky, MENU_TIME } from './render/sky.js';
import { Ocean } from './render/ocean.js';
import { Environment } from './render/environment.js';
import { Particles } from './render/particles.js';
import { FX } from './render/fx.js';
import { ISLANDS, SCENERY, BOUNDS } from './game/map.js';
import { Game } from './game/game.js';
import { cast } from './game/abilities.js';
import { HUD } from './ui/hud.js';
import { CameraDirector } from './core/camera.js';
import { audio } from './audio/audio.js';
import { CLOUD } from './render/cloudShadow.js';
import { Weather } from './render/weather.js';
import { Birds } from './render/birds.js';
import { Wakes } from './render/wakes.js';
import { renderThumbnails } from './render/thumbnails.js';
import { WaterReflection, reflectable } from './render/reflection.js';
import { TEAM_RIM } from './render/teamRim.js';
import { MATCH, AGE_HULLS, UPGRADES, AGES, TEAMS } from './core/config.js';

const params = new URLSearchParams(location.search);
const settings = {
  difficulty: params.get('difficulty') || localGet('aa.diff') || 'normal',
  team: +(params.get('team') ?? localGet('aa.team') ?? 0),
  quality: params.get('quality') || localGet('aa.quality') || 'high',
};
function localGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function localSet(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }

const $ = (s) => document.querySelector(s);
const TIPS = [
  '<b>Shells have travel time.</b> Keep your ship turning and enemy salvos will splash harmlessly behind you.',
  '<b>Forts shrug off captains.</b> Siege alongside your gunboats, or your guns barely scratch the stone.',
  '<b>Trade ports</b> pay every captain on the owning team. Hold both and your fleet out-ages the enemy.',
  '<b>The squall</b> widens gun scatter. It is the perfect cover for an ambush.',
  '<b>Ages III to V</b> offer two warships. Mix artillery, carriers and swarms to cover each other.',
  '<b>Shutdown bounties</b> reward sinking a captain on a rampage. Hunt the enemy ace.',
];
{ const t = document.getElementById('tip0'); if (t) t.innerHTML = TIPS[Math.floor(Math.random() * TIPS.length)]; }
const loadBar = $('#loading .p i'), loadTxt = $('#loading .s');
const step = async (pct, txt) => { loadBar.style.width = pct + '%'; loadTxt.textContent = txt; await new Promise((r) => setTimeout(r, 16)); };

// ---------------------------------------------------------------------------
await step(8, 'Kindling the forge');
const R = new Renderer($('#app'), settings.quality);
if (settings.quality === 'low') R.rays.enabled = false;
if (navigator.webdriver) R.fixedRes = true;
// GPU diagnostics: surface shader compile/link failures on screen (real drivers are stricter than test rasterisers)
const gpuErrs = [];
R.gl.debug.onShaderError = (gl, program, vs, fs) => {
  const log = (sh) => (gl.getShaderInfoLog(sh) || '').trim();
  const msg = (gl.getProgramInfoLog(program) || '').trim() || log(fs) || log(vs) || 'unknown';
  gpuErrs.push(msg.split('\n').slice(0, 3).join(' | ').slice(0, 260));
  console.error('[gpu] shader failed:', msg);
  let el = document.getElementById('gpuerr');
  if (!el) { el = document.createElement('div'); el.id = 'gpuerr'; el.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:50;max-width:620px;padding:8px 12px;background:rgba(60,8,8,.92);color:#ffd2c8;font:12px/1.4 monospace;border:1px solid #ff6a5a;pointer-events:auto'; document.body.appendChild(el); }
  el.innerHTML = '<b>GPU shader error</b> (please screenshot this for the developer):<br>' + gpuErrs.slice(-4).map((e) => e.replace(/</g, '&lt;')).join('<br>');
};
R.onSafeMode = () => { try { hud.hint('Graphics compatibility mode enabled for your GPU (post effects off) · choose <b>Low</b> graphics in the menu if it persists', 9000); } catch (e) { /* hud not ready */ } };
// GPUs without float render targets can't run the HDR post chain: start in safe mode
if (!(R.gl.extensions.has('EXT_color_buffer_float') || R.gl.extensions.has('EXT_color_buffer_half_float'))) R.safeMode = true;
if (params.get('safe') === '1') R.safeMode = true; // automated captures: keep full quality, no load shedding
const scene = R.scene;
await step(22, 'Painting the sky');
const sky = new Sky(R.gl, scene);
sky.setTime(MENU_TIME, 0);
sky.updateEnv(0, true);
await step(40, 'Raising the tides');
const ocean = new Ocean(scene, settings.quality);
await step(58, 'Charting the archipelago');
const env = new Environment(scene, ISLANDS, SCENERY);
const birds = new Birds(scene, ISLANDS);
const wakes = new Wakes(scene);
const particles = new Particles(scene);
const fx = new FX(scene, particles, ocean.decals, R);
// Planar reflections on Ultra: tag reflection-worthy objects onto layer 2.
let refl = null;
if (settings.quality === 'high' && params.get('refl') !== '0') {
  refl = new WaterReflection(R.gl, scene, R.camera, 1 / 2);
  ocean.enableReflection(refl.uniforms);
  R.refl = refl;
  [sky.dome, sky.sun, sky.hemi, env.group, birds.mesh, fx.p.add.points, fx.p.alpha.points, fx.debris, ...fx.lights, ...fx.beams].forEach(reflectable);
}
const cameraDir = new CameraDirector(R.camera);
fx.onShake = (a, x, z) => cameraDir.addTrauma(a, x, z);
const hud = new HUD($('#ui'), $('#overlay'));
const weather = new Weather(scene, fx, R, audio);
await step(70, 'Photographing the fleet');
renderThumbnails();
await step(80, 'Compiling shaders');

let G = null;         // current game
let mode = 'menu';    // menu | play
let worldGroup = null;
const mouse = { x: 0, y: 0, nx: 0, ny: 0, ground: new THREE.Vector3(), inside: false };
const raycaster = new THREE.Raycaster();
const waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

function startGame(spectate) {
  if (worldGroup) scene.remove(worldGroup);
  worldGroup = new THREE.Group();
  scene.add(worldGroup);
  audio.setFinale(false);
  G = new Game({ renderer: R, scene: worldGroup, fx, ocean, audio, ui: hud, sky, wakes, reflect: refl ? reflectable : null }, {
    difficulty: settings.difficulty, playerTeam: settings.team, spectate, playerName: 'You', autopilot: !!params.get('autopilot'),
  });
  hud.mount(G);
  G.events.on('reforge', (h) => {
    if (h !== G.player) return;
    // The Reforging: slow-mo dolly to a hero angle around the new hull, then back to play.
    const cam = R.camera.position, V3 = THREE.Vector3;
    const d = cameraDir.dist, pitch = THREE.MathUtils.degToRad(cameraDir.pitchFor(d));
    const side = Math.sin(h.yaw) > 0 ? -1 : 1;
    cameraDir.startCinematic([
      { t: 0, pos: new V3(cam.x - h.x, cam.y, cam.z - h.z), look: new V3(0, 0, 0) },
      { t: 0.55, pos: new V3(side * 38, 22, 44), look: new V3(0, 6, 0) },
      { t: 1.05, pos: new V3(side * 30, 26, 52), look: new V3(0, 7, 0) },
      { t: 1.65, pos: new V3(Math.sin(cameraDir.yaw) * Math.cos(pitch) * d, Math.sin(pitch) * d, Math.cos(cameraDir.yaw) * Math.cos(pitch) * d), look: new V3(0, 0, 0) }, // lands on the player's orbit
    ], null, { letterbox: false, follow: () => ({ x: h.x, z: h.z }) });
    G.slowmo = 1.1;
    h.reforgeFlash = 1.4;
    R.grade.uniforms.uFlash.value = 0.22;
  });
  if (spectate) {
    // menu backdrop: skip ahead so the seas are already busy
    // showreel: jump to the late game so the backdrop shows airpower, swarms and the Leviathan
    G.time = 329.5;
    G.nextWave = 0;
    G.stormAt = 9999;
    for (const h of G.heroes) {
      h.gold += 6000 + Math.random() * 3000; h.level = 8; h.refreshStats(); h.hp = h.maxHp;
      h.x = (h.team === 0 ? -1 : 1) * (150 + Math.random() * 80); h.z = 60 + (h.slot - 2) * 40; // already deployed near the lair
    }
    for (const t of G.teams) t.ageAnnounced = { 1: true, 2: true, 3: true, 4: true, 5: true };
    cameraDir.orbit = { a: 0, r: 200, h: 90, cx: 0, cz: 108, follow: () => (G.boss && G.boss.alive ? G.boss : hotspot(G)) };
  } else {
    cameraDir.orbit = null;
    cameraDir.yaw = cameraDir.yawGoal = cameraDir.tilt = cameraDir.tiltGoal = 0;
    const p = G.player;
    cameraDir.snapTo(p.x, p.z);
    // Opening shot: low on the water behind our citadel, into the sunrise, then crane up to play.
    const sx = p.team === 0 ? -1 : 1, V3 = THREE.Vector3;
    const d = 165, pitch = THREE.MathUtils.degToRad(cameraDir.pitchFor(d));
    const endPos = new V3(p.x, Math.sin(pitch) * d, p.z + Math.cos(pitch) * d);
    cameraDir.startCinematic([
      { t: 0, pos: new V3(sx * 790, 9, 70), look: new V3(sx * 560, 14, -10) },
      { t: 2.6, pos: new V3(sx * 735, 24, 105), look: new V3(sx * 600, 30, -20) },
      { t: 4.4, pos: new V3(sx * 690, 70, 150), look: new V3(sx * 640, 6, 0) },
      { t: 6.2, pos: endPos, look: new V3(p.x, 0, p.z) },
    ], { x: p.x, z: p.z });
    cameraDir.locked = true;
    cameraDir.distGoal = cameraDir.dist = 165;
    audio.stinger('matchStart');
    setTimeout(() => hud.announce('ARMADA ASCENSION', `${TEAMS[settings.team].name} · Destroy the enemy citadel`, TEAMS[settings.team].css), 1200);
    setTimeout(() => hud.hint('<kbd>Right-click</kbd> sail / attack &nbsp; <kbd>Q</kbd><kbd>W</kbd><kbd>E</kbd><kbd>R</kbd> abilities at cursor &nbsp; <kbd>T</kbd> advance age', 9000), 4800);
  }
}

/** Where the action is, for the spectator camera. */
function hotspot(g) {
  let best = null, bs = -1;
  for (const h of g.heroes) {
    if (!h.alive) continue;
    let s = 0;
    for (const o of g.heroes) if (o.alive && o.team !== h.team && h.dist(o) < 120) s++;
    if (s > bs) { bs = s; best = h; }
  }
  return best;
}

function toMenu() {
  mode = 'menu';
  $('#howtoBtn').classList.add('hidden'); howtoPending = false;
  $('#menu').classList.remove('hidden');
  $('#ui').classList.add('menuMode');
  startGame(true);
  document.querySelectorAll('#ui > *:not(#modalRoot)').forEach((el) => el.classList.add('hidden'));
  audio.startAmbience();
  audio.startMusic();
}

function play() {
  audio.init();
  mode = 'play';
  $('#menu').classList.add('hidden');
  $('#ui').classList.remove('menuMode');
  startGame(false);
  $('#howtoBtn').classList.remove('hidden');
  howtoPending = !automated && localGet('aa.howto') !== '1';
}

// ---------------------------------------------------------------------------
// Menu wiring
function seg(id, key, val, apply) {
  const box = $(id);
  box.querySelectorAll('button').forEach((b) => {
    b.classList.toggle('on', b.dataset.v === String(val));
    b.onclick = () => {
      audio.init(); audio.play('uiClick');
      box.querySelectorAll('button').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      localSet(key, b.dataset.v);
      apply(b.dataset.v);
    };
    b.onmouseenter = () => audio.play('uiHover');
  });
}
seg('#segDiff', 'aa.diff', settings.difficulty, (v) => (settings.difficulty = v));
seg('#segTeam', 'aa.team', settings.team, (v) => (settings.team = +v));
seg('#segQual', 'aa.quality', settings.quality, (v) => { settings.quality = v; location.search = `?quality=${v}`; });
$('#playBtn').onclick = () => { audio.init(); audio.play('uiClick'); play(); };
// Quick-start card: shown once before your first match (after the opening shot), any time with H.
// The battle holds still while it is open.
let howtoOpen = false, howtoPending = false;
const automated = !!navigator.webdriver || !!params.get('autoplay') || !!params.get('photo');
function showHowTo(on) {
  howtoOpen = on;
  $('#howto').classList.toggle('hidden', !on);
  if (!on) { $('#help').classList.add('hidden'); localSet('aa.howto', '1'); }
  if (on) { hud.aiming = -1; audio.play('uiClick'); }
}
$('#helpBtn').onclick = () => { audio.init(); showHowTo(true); };
$('#howtoGo').onclick = (e) => { e.stopPropagation(); audio.init(); audio.play('uiClick'); showHowTo(false); if (mode === 'menu') play(); };
$('#howtoMore').onclick = (e) => { e.stopPropagation(); audio.play('uiClick'); $('#help').classList.toggle('hidden'); };
$('#howto').addEventListener('pointerdown', (e) => { if (e.target === $('#howto')) showHowTo(false); }); // click outside the card closes it
$('#howtoBtn').onclick = () => { audio.init(); showHowTo(!howtoOpen); };
hud.on('again', () => play());
hud.on('menu', () => { hud.closeModal(); toMenu(); });

// ---------------------------------------------------------------------------
// Player commands
function playerAgeUp() {
  const p = G && G.player;
  if (!p || !p.canAgeUp()) return;
  if (p.gold < p.nextAgeCost()) { audio.play('uiError'); hud.hint(`Need <b>${p.nextAgeCost() - Math.floor(p.gold)}</b> more gold for the ${AGES[p.age].name}`, 2000); return; }
  const opts = AGE_HULLS[p.age + 1];
  if (opts.length === 1) G.ageUp(p, opts[0]);
  else hud.openAgeChoice(opts, (id) => { G.ageUp(p, id); audio.play('uiClick'); });
}
function playerCast(i) {
  const p = G && G.player;
  if (!p || !p.alive) return;
  const ok = cast(G, p, i, mouse.ground.x, mouse.ground.z);
  if (!ok) {
    const ab = p.abilities[i];
    if (ab.minLevel && p.level < ab.minLevel) hud.hint(`${ab.name} unlocks at level ${ab.minLevel}`, 1500);
    audio.play('uiError');
  }
}
hud.on('ageUp', playerAgeUp);
hud.on('buy', (id) => { if (G && G.player && !G.buyUpgrade(G.player, id)) audio.play('uiError'); });
hud.on('castButton', (i) => {
  const ab = G && G.player && G.player.abilities[i];
  if (!ab) return;
  if (ab.target === 'self' || ab.target === 'auto') playerCast(i);
  else { hud.aiming = i; hud.hint('Click the sea to fire · right-click to cancel', 1800); }
});
hud.on('minimapLook', (x, z) => { cameraDir.locked = false; cameraDir.goal.set(x, 0, z); });
hud.on('minimapMove', (x, z) => { if (G && G.player && G.player.alive) { G.player.commandMove(x, z); moveMarker(x, z); } });

function moveMarker(x, z, attack = false) {
  fx.ring(x, z, 1, 7, attack ? 0xff5040 : 0x9dffb0, 0.45, 0.2);
  ocean.decals.add(x, z, 4, 0.8, 1, 0.7, 2);
}

function pickUnit(x, z, enemyOf) {
  let best = null, bd = Infinity;
  for (const u of G.units) {
    if (!u.alive || (enemyOf !== undefined && u.team === enemyOf)) continue;
    const d = Math.hypot(u.x - x, u.z - z);
    if (d < u.radius + 7 && d < bd) { bd = d; best = u; }
  }
  return best;
}

const canvas = R.gl.domElement;
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
canvas.addEventListener('pointermove', (e) => {
  mouse.x = e.clientX; mouse.y = e.clientY;
  cameraDir.mouse.x = e.clientX / window.innerWidth; cameraDir.mouse.y = e.clientY / window.innerHeight; cameraDir.mouse.inside = true;
});
document.addEventListener('pointerleave', () => (cameraDir.mouse.inside = false));
// Orbit: middle-drag (or Shift + left-drag on a trackpad) swings the camera around the focus.
let orbitDrag = null;
canvas.addEventListener('pointerdown', (e) => {
  if (mode === 'play' && (e.button === 1 || (e.button === 0 && e.shiftKey))) {
    orbitDrag = { x: e.clientX, y: e.clientY, id: e.pointerId };
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
    e.preventDefault(); e.stopImmediatePropagation();
    if (!orbitHinted) { orbitHinted = true; hud.hint('Orbiting · press <kbd>C</kbd> to reset the view', 3500); }
  }
}, true);
let orbitHinted = false;
window.addEventListener('pointermove', (e) => {
  if (!orbitDrag) return;
  cameraDir.orbitBy(e.clientX - orbitDrag.x, e.clientY - orbitDrag.y);
  orbitDrag.x = e.clientX; orbitDrag.y = e.clientY;
});
window.addEventListener('pointerup', () => { orbitDrag = null; });
canvas.addEventListener('auxclick', (e) => e.preventDefault());
canvas.addEventListener('mousedown', (e) => { if (e.button === 1) e.preventDefault(); }); // no browser autoscroll on middle-drag
canvas.addEventListener('pointerdown', (e) => {
  audio.init();
  if (mode !== 'play' || !G || !G.player || G.over) return;
  const p = G.player;
  if (hud.aiming >= 0) {
    const i = hud.aiming; hud.aiming = -1;
    if (e.button === 0) playerCast(i);
    return;
  }
  if ((e.button === 2 || e.button === 0) && p.alive) { // left or right click: sail / attack
    const u = pickUnit(mouse.ground.x, mouse.ground.z, p.team);
    if (u) { p.commandAttack(u); moveMarker(u.x, u.z, true); }
    else { p.commandMove(mouse.ground.x, mouse.ground.z); moveMarker(mouse.ground.x, mouse.ground.z); }
  }
});
canvas.addEventListener('wheel', (e) => { cameraDir.zoom(e.deltaY); e.preventDefault(); }, { passive: false });

window.addEventListener('keydown', (e) => {
  if (howtoOpen) { // any key starts (H toggles, Tab/Alt ignored so alt-tab does not dismiss it)
    if (e.key === 'Tab' || e.key === 'Alt' || e.key === 'Shift' || e.key === 'Control' || e.key === 'Meta') return;
    e.preventDefault(); if (!e.repeat) showHowTo(false); return;
  }
  cameraDir.keys[e.key] = true;
  if (mode !== 'play' || !G) return;
  if (e.key.toLowerCase() === 'h' || e.key === 'F1') { e.preventDefault(); showHowTo(true); return; }
  const k = e.key.toLowerCase();
  if (e.ctrlKey && /^[1-5]$/.test(e.key)) { e.preventDefault(); hud.handlers.buy(UPGRADES[+e.key - 1].id); return; }
  if (hud.modalOpen && k === 'escape') { hud.closeModal(); return; }
  if (k === 'escape') { hud.aiming = -1; return; }
  if (e.repeat) return;
  const idx = ['q', 'w', 'e', 'r'].indexOf(k);
  if (idx >= 0) {
    const ab = G.player && G.player.abilities[idx];
    // self / auto-targeted abilities fire instantly; aimed ones show an indicator until release
    if (!ab || ab.target === 'self' || ab.target === 'auto') playerCast(idx);
    else hud.aiming = idx;
    return;
  }
  if (k === 't' || k === 'u') playerAgeUp();
  else if (k === 'g') G.callRally && G.callRally(G.player, mouse.ground.x, mouse.ground.z);
  else if (k === 's') G.player && G.player.stop();
  else if (k === ' ') { cameraDir.locked = true; e.preventDefault(); }
  else if (k === 'y') cameraDir.locked = !cameraDir.locked;
  else if (k === 'c') { cameraDir.resetOrbit(); cameraDir.locked = true; }
  else if (k === 'z' || k === 'x') cameraDir.orbitBy(k === 'z' ? 60 : -60, 0);
  else if (k === 'tab') { e.preventDefault(); hud.toggleScoreboard(true); }
  else if (k === 'alt') { hud.showRange = true; e.preventDefault(); }
  else if (k === 'm') audio.muted = !audio.muted;
  else if (e.key === 'F3') { e.preventDefault(); fpsEl.classList.toggle('hidden'); }
});
window.addEventListener('keyup', (e) => {
  cameraDir.keys[e.key] = false;
  const ui = ['q', 'w', 'e', 'r'].indexOf(e.key.toLowerCase());
  if (ui >= 0 && hud.aiming === ui) { hud.aiming = -1; playerCast(ui); }
  if (e.key === 'Tab') hud.toggleScoreboard(false);
  if (e.key === 'Alt') hud.showRange = false;
});
window.addEventListener('blur', () => { cameraDir.keys = {}; });

// ---------------------------------------------------------------------------
// Frame loop
let lastT = performance.now();
const fpsEl = Object.assign(document.createElement('div'), { id: 'fps', className: 'hidden' });
document.body.appendChild(fpsEl);
let wallTime = 0;
let fpsAcc = 0, fpsN = 0, fps = 60;
const lightCol = new THREE.Color();
// Per-age colour grade: the look escalates with your technology.
const AGE_GRADE = {
  1: { gain: [1.04, 1.0, 0.93], lift: [0.016, 0.01, 0.0], sat: 1.1, con: 1.07, ca: 0.0006 },
  2: { gain: [1.03, 0.99, 0.92], lift: [0.012, 0.009, 0.006], sat: 0.98, con: 1.12, ca: 0.0006 },
  3: { gain: [0.99, 1.0, 1.03], lift: [0.006, 0.01, 0.016], sat: 1.03, con: 1.12, ca: 0.0007 },
  4: { gain: [1.0, 1.01, 1.02], lift: [0.008, 0.01, 0.014], sat: 1.14, con: 1.09, ca: 0.0008 },
  5: { gain: [0.96, 1.0, 1.07], lift: [0.0, 0.012, 0.03], sat: 1.18, con: 1.15, ca: 0.0013 },
};
const gradeCur = { gain: new THREE.Vector3(1, 1, 1), lift: new THREE.Vector3(), sat: 1.1, con: 1.08, ca: 0.0007 };
const _px = new Uint8Array(4);
function syncGPU() { const g = R.gl.getContext(); g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, _px); }
window.__aa = { get G() { return G; }, R, sky, cameraDir, fx, settings, refl, weather, TEAM_RIM, get fps() { return fps; }, howto: (on) => showHowTo(on) };

function frame() {
  requestAnimationFrame(frame);
  const now = performance.now(); const dt = Math.min((now - lastT) / 1000, 0.1); lastT = now;
  if (window.__aa.paused) return;
  R.adapt(dt);
  try { tick(dt, true); } catch (e) { console.error('frame error', e && e.stack || e); }
}
// Test hook: advance n fixed steps, render only the last.
// Test hook: cast player ability i at the nearest enemy captain (showcase harness).
window.__aa.castAt = (i) => {
  const p = G && G.player; if (!p) return false;
  const e = G.heroes.filter((h) => h.alive && h.team !== p.team).sort((a, b) => p.dist2(a) - p.dist2(b))[0];
  p.cds[i] = 0;
  return e ? cast(G, p, i, e.x, e.z) : false;
};
window.__aa.step = (n = 1, dt = 1 / 30) => { for (let i = 0; i < n; i++) tick(dt, i === n - 1); };
function tick(dt, draw) {
  wallTime += dt;
  fpsAcc += dt; fpsN++;
  if (fpsAcc > 1) { fps = fpsN / fpsAcc; fpsAcc = 0; fpsN = 0; if (!fpsEl.classList.contains('hidden')) fpsEl.textContent = `${fps.toFixed(0)} fps · ${(R.gl.getPixelRatio() * 100).toFixed(0)}% res · ${R.gl.info.render.calls} draws`; }
  if (howtoPending && mode === 'play' && !cameraDir.cine && G && G.time > 1) { howtoPending = false; showHowTo(true); }
  if (G && !howtoOpen) G.update(dt);
  const gdt = G ? G.dt : dt;
  const t = G ? G.time : wallTime;

  // camera + listener
  const p = G && G.player;
  cameraDir.update(dt, p && p.alive ? p : null);
  const f = cameraDir.focus;
  if (G) { G.listener.x = f.x; G.listener.z = f.z; G.viewScale = 1 + THREE.MathUtils.smoothstep(cameraDir.dist, 180, 290) * 0.28; }
  audio.setListener(f.x, f.z, cameraDir.dist);

  // time of day: dawn -> dusk across the match
  const tod = mode === 'play' && G ? G.time / MATCH.duration : MENU_TIME;
  sky.setTime(tod, wallTime);
  weather.set(mode === 'play' && G && G.storm > 0);
  weather.update(dt, f, R.camera);
  weather.grade(sky);
  sky.follow(f.x, f.z);
  sky.updateEnv(dt);
  sky.dome.position.copy(R.camera.position);
  R.gl.toneMappingExposure = sky.exposure;
  R.setSun(sky.sunDir, sky.sun.color, mode === 'menu' ? 1.0 : cameraDir.cine ? 0.8 : 0.6);
  R.bloom.strength = cameraDir.cine ? 0.34 : 0.42;
  lightCol.copy(sky.sun.color).multiplyScalar(sky.sun.intensity * 0.28).add(sky.hemi.color.clone().multiplyScalar(0.55));
  particles.setLight(lightCol);
  particles.setScale(R);

  CLOUD.uCloudT.value = wallTime;
  env.update(t);
  birds.update(dt, wallTime);
  wakes.update(gdt, t);
  ocean.update(gdt, t, f.x, f.z, sky);
  fx.update(gdt, t);
  particles.update(gdt);

  // mouse ground point
  const ndc = new THREE.Vector2((mouse.x / window.innerWidth) * 2 - 1, -(mouse.y / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, R.camera);
  raycaster.ray.intersectPlane(waterPlane, mouse.ground);
  hud.cursor = mouse.ground;

  // cinematic grading reacting to player state
  const gu = R.grade.uniforms;
  const ag = AGE_GRADE[(mode === 'play' && p) ? p.age : 1];
  const gk = Math.min(1, dt * 1.2);
  gradeCur.gain.lerp(new THREE.Vector3(...ag.gain), gk); gradeCur.lift.lerp(new THREE.Vector3(...ag.lift), gk);
  gradeCur.sat += (ag.sat - gradeCur.sat) * gk; gradeCur.con += (ag.con - gradeCur.con) * gk; gradeCur.ca += (ag.ca - gradeCur.ca) * gk;
  gu.uGain.value.copy(gradeCur.gain); gu.uLift.value.copy(gradeCur.lift);
  gu.uSat.value = gradeCur.sat; gu.uContrast.value = gradeCur.con; gu.uCA.value = gradeCur.ca;
  R.noShock = mode === 'menu';
  if (p && !params.get('photo')) {
    const hpF = p.alive ? p.hp / p.maxHp : 0;
    gu.uDamage.value += ((hpF < 0.3 && p.alive ? (0.3 - hpF) * 2.5 + Math.sin(wallTime * 6) * 0.08 : 0) - gu.uDamage.value) * Math.min(1, dt * 4);
    gu.uDesat.value += ((p.alive ? 0 : 0.85) - gu.uDesat.value) * Math.min(1, dt * 2);
  } else { gu.uDamage.value = 0; gu.uDesat.value = 0; }

  // audio intensity from nearby combat
  if (G) {
    let heat = 0;
    for (const h of G.heroes) if (h.alive && Math.hypot(h.x - f.x, h.z - f.z) < 200 && h.target && h.target.kind === 'hero') heat += 0.25;
    G.combatHeat = Math.min(1, Math.max(G.combatHeat, heat));
    audio.setIntensity(mode === 'menu' ? 0.35 : G.combatHeat);
    if (mode === 'play' && G.player) { const p = G.player; audio.setShip(p.alive ? p.age : 0, p.alive ? Math.min(1, Math.abs(p.speed || 0) / (p.maxSpeed || p.hull.speed || 20)) : 0); }
  }

  document.body.classList.toggle('cinematic', !!cameraDir.cine && cameraDir.cine.letterbox && mode === 'play');
  if (cameraDir.cine) R.gl.toneMappingExposure *= 0.9;
  if (!draw) return;
  if (refl && refl.uniforms.uReflOn.value) refl.update();
  if (G && mode === 'play') hud.update(G, R.camera, gdt, cameraDir.focus, cameraDir.view);
  R.render(dt, wallTime);
  if (navigator.webdriver) syncGPU(); // captures: never screenshot a half-rasterised software frame
}

await step(92, 'Mustering the fleets');
toMenu();
// warm up shaders with one frame before revealing
R.render(0.016, 0);
await step(100, 'Set sail');
$('#loading').style.opacity = '0';
setTimeout(() => $('#loading').remove(), 900);
if (params.get('autoplay')) play();
requestAnimationFrame(frame);
