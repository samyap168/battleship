import * as THREE from 'three';
import './ui/style.css';
import { Renderer } from './render/renderer.js';
import { Sky, MENU_TIME } from './render/sky.js';
import { Ocean } from './render/ocean.js';
import { Environment } from './render/environment.js';
import { Particles } from './render/particles.js';
import { FX } from './render/fx.js';
import { ISLANDS, SCENERY, BOUNDS } from './game/map.js';
import { Game, shieldMesh } from './game/game.js';
import { cast } from './game/abilities.js';
import { HUD } from './ui/hud.js';
import { CameraDirector } from './core/camera.js';
import { audio } from './audio/audio.js';
import { CLOUD } from './render/cloudShadow.js';
import { Weather } from './render/weather.js';
import { Birds } from './render/birds.js';
import { SeaLife } from './render/sealife.js';
import { Wakes } from './render/wakes.js';
import { renderThumbnails } from './render/thumbnails.js';
import { WaterReflection, reflectable } from './render/reflection.js';
import { TEAM_RIM, applyTeamRim } from './render/teamRim.js';
import { buildHeroShip, buildCreepShip, HERO_IDS } from './render/models/shipModels.js';
import { MATCH, AGE_HULLS, UPGRADES, AGES, TEAMS } from './core/config.js';

const params = new URLSearchParams(location.search);
const settings = {
  difficulty: params.get('difficulty') || localGet('aa.diff') || 'normal',
  team: +(params.get('team') ?? localGet('aa.team') ?? 0),
  quality: params.get('quality') || localGet('aa.quality') || autoQuality(),
};
/** First launch only (no saved or URL choice): pick a preset the GPU can hold at 60 fps. Integrated and
 *  mobile GPUs start on Medium, phones on Low; dedicated GPUs keep Ultra. The menu always overrides. */
function autoQuality() {
  if (navigator.webdriver) return 'high'; // automation renders the reference look
  try {
    const touchSmall = matchMedia('(pointer: coarse)').matches && Math.min(screen.width, screen.height) < 820;
    if (touchSmall) return 'low';
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return 'low';
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    if (/SwiftShader|llvmpipe|Software|Basic Render/i.test(name)) return 'low';
    if (/Intel|UHD|Iris|Mali|Adreno|PowerVR|Vivante|Apple GPU/i.test(name) && !/Arc/i.test(name)) return 'medium';
  } catch (e) { /* unknown GPU: keep the full look, adaptive quality protects the frame rate */ }
  return 'high';
}
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
R.onStrain = () => { try { if (settings.quality !== 'low') hud.hint('Your GPU is working hard · for a smoother battle choose <b>' + (settings.quality === 'high' ? 'Medium' : 'Low') + '</b> graphics in the menu', 8000); } catch (e) { /* hud not ready */ } };
R.onSafeMode = () => { try { hud.hint('Graphics compatibility mode enabled for your GPU (post effects off) · choose <b>Low</b> graphics in the menu if it persists', 9000); } catch (e) { /* hud not ready */ } };
// GPUs without float render targets can't run the HDR post chain: start in safe mode
if (!(R.gl.extensions.has('EXT_color_buffer_float') || R.gl.extensions.has('EXT_color_buffer_half_float'))) R.safeMode = true;
if (params.get('safe') === '1') R.safeMode = true; // automated captures: keep full quality, no load shedding
const scene = R.scene;
await step(22, 'Painting the sky');
const sky = new Sky(R.gl, scene);
R.sun = sky.sun; // adaptive quality can halve the shadow map on a struggling GPU
R.setQuality(settings.quality); // applies the preset to the sun (Low: no shadow casting)
// Things a previous launch proved broken on this GPU stay off (restored once the scene exists, below); the watchdog finds new ones within a second.
let sceneWashActed = false;
R.onSceneWash = () => { // not the post chain: something in the scene itself is washing the view out. Low removes reflections and shadows, the usual suspects.
  if (sceneWashActed || settings.quality === 'low') return;
  sceneWashActed = true; applyQuality('low');
  try { hud.hint('The 3D view was washed out on your GPU, so graphics were set to <b>Low</b>. <kbd>Esc</kbd> → Graphics to change.', 9000); } catch { /* hud not up yet */ }
};
R.onDegrade = (name, list) => {
  localSet('aa.fxoff', list.join(','));
  const label = { rays: 'light shafts', bloom: 'bloom glow', nanguard: 'the NaN guard', ao: 'ambient occlusion', smaa: 'anti-aliasing', safe: 'all post-processing', refl: 'water reflections', env: 'sky lighting', decals: 'wake and foam marks', shore: 'shoreline foam', sparks: 'smoke and spark effects', sea: 'the water shader (plain water instead)' }[name] || name;
  try { hud.hint(`Your GPU washed out the picture, so <b>${label}</b> ${name === 'safe' ? 'is' : 'was'} switched off. <kbd>Esc</kbd> → Graphics to try again.`, 9000); } catch { /* hud not up yet */ }
};
sky.setTime(MENU_TIME, 0);
sky.updateEnv(0, true);
await step(40, 'Raising the tides');
const ocean = new Ocean(scene, settings.quality === 'safe' ? 'low' : settings.quality);
ocean.setQuality(settings.quality === 'safe' ? 'low' : settings.quality);
await step(58, 'Charting the archipelago');
const env = new Environment(scene, ISLANDS, SCENERY);
const birds = new Birds(scene, ISLANDS);
const wakes = new Wakes(scene);
const particles = new Particles(scene);
const fx = new FX(scene, particles, ocean.decals, R);
const sealife = new SeaLife(scene, ISLANDS, fx);
sealife.onSound = (n, x, z, vol, pitch = 1) => audio.play(n, { x, z, vol, pitch });
sealife.clear = (x, z) => { // whales keep clear of the fleets
  if (!G) return true;
  for (const L of [G.heroes, G.creeps, G.structures]) for (const u of L) if (u.alive !== false && Math.hypot(u.x - x, u.z - z) < 34) return false;
  return true;
};
// Planar reflections on Ultra: tag reflection-worthy objects onto layer 2.
let refl = null;
function makeReflections() {
  refl = new WaterReflection(R.gl, scene, R.camera, 1 / 2);
  ocean.enableReflection(refl.uniforms);
  R.refl = refl;
  [sky.dome, sky.sun, sky.hemi, env.group, birds.mesh, fx.p.add.points, fx.p.alpha.points, fx.debris, ...fx.lights, ...fx.beams].forEach(reflectable);
}
if (settings.quality === 'high' && params.get('refl') !== '0') makeReflections();
const cameraDir = new CameraDirector(R.camera);
fx.onShake = (a, x, z) => cameraDir.addTrauma(a, x, z);
const hud = new HUD($('#ui'), $('#overlay'));
// Scene-level switches the GPU watchdog can pull when the picture washes out (post passes are handled inside the renderer).
R.sceneSteps = {
  refl: { live: () => !!(refl && refl.uniforms.uReflOn.value), set: (off) => { if (refl) refl.uniforms.uReflOn.value = off ? 0 : (settings.quality === 'high' ? 1 : 0); } },
  env: { live: () => !sky.envBlocked && !!scene.environment, set: (off) => { sky.envBlocked = off; scene.environment = off ? null : (sky.envRT ? sky.envRT.texture : null); } },
  decals: { live: () => ocean.decals.mesh.visible, set: (off) => { ocean.decals.mesh.visible = !off; } },
  shore: { live: () => env.shore.visible, set: (off) => { env.shore.visible = !off; } },
  sparks: { live: () => fx.p.alpha.points.visible || fx.p.add.points.visible, set: (off) => { fx.p.alpha.points.visible = !off; fx.p.add.points.visible = !off; } },
  sea: { live: () => ocean.mesh.material === ocean.fullMat, set: (off) => ocean.setSafe(off) },
};
if (localGet('aa.fxv') !== '3') { localSet('aa.fxoff', ''); localSet('aa.fxv', '3'); } // verdicts from the older, weaker detector blamed the wrong things (bloom, post chain): start afresh
R.restoreFxOff([...new Set([...(localGet('aa.fxoff') || '').split(',').filter(Boolean), ...(settings.quality === 'safe' ? ['sea', 'env'] : [])])]);
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
  if (worldGroup) {
    scene.remove(worldGroup);
    // free the previous match's GPU buffers (geometries re-upload on demand if a cached one is reused)
    worldGroup.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.isInstancedMesh) o.dispose(); });
  }
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
  // The last citadel falls: a slow-motion swing low around the collapsing fortress, then a slow orbit
  // over the burning ruin behind the victory / defeat screen.
  G.events.on('citadelFall', (c) => {
    if (spectate) return;
    const V3 = THREE.Vector3, sx = -Math.sign(c.x) || 1;
    const P = (dx, y, dz) => new V3(c.x + sx * dx, y, c.z + dz);
    cameraDir.startCinematic([
      { t: 0, pos: P(200, 84, 96), look: new V3(c.x, 16, c.z) },
      { t: 1.8, pos: P(118, 24, -64), look: new V3(c.x, 14, c.z) },
      { t: 3.8, pos: P(150, 44, -150), look: new V3(c.x, 8, c.z) },
    ], { x: c.x, z: c.z }, { onEnd: () => { cameraDir.orbit = { a: Math.atan2(-150, sx * 150), r: 212, h: 44, cx: c.x, cz: c.z }; } });
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
    const d = 150, pitch = THREE.MathUtils.degToRad(cameraDir.pitchFor(d));
    const endPos = new V3(p.x, Math.sin(pitch) * d, p.z + Math.cos(pitch) * d);
    // Prologue: a slow push across the dawn water toward the ENEMY citadel ("destroy the enemy citadel"),
    // then a hard cut home. A key pair 0.01 s apart is a cut. Any key or click skips the whole opening.
    const ex = -sx * 640;
    cameraDir.startCinematic([
      { t: 0, pos: new V3(ex + sx * 210, 10, 78), look: new V3(ex, 20, 0) },
      { t: 2.3, pos: new V3(ex + sx * 150, 16, 58), look: new V3(ex, 22, 0) },
      { t: 2.31, pos: new V3(sx * 790, 9, 70), look: new V3(sx * 560, 14, -10) },
      { t: 4.9, pos: new V3(sx * 735, 24, 105), look: new V3(sx * 600, 30, -20) },
      { t: 6.7, pos: new V3(sx * 690, 70, 150), look: new V3(sx * 640, 6, 0) },
      { t: 8.5, pos: endPos, look: new V3(p.x, 0, p.z) },
    ], { x: p.x, z: p.z }, { onEnd: () => { openingSkippable = false; } });
    openingSkippable = true;
    cameraDir.locked = true;
    cameraDir.distGoal = cameraDir.dist = 150; // close enough that your hull reads as a ship, not a marker
    audio.stinger('matchStart');
    setTimeout(() => hud.announce('ARMADA ASCENSION', `${TEAMS[settings.team].name} · Destroy the enemy citadel`, TEAMS[settings.team].css), 1200);
    setTimeout(() => hud.hint('<kbd>Click</kbd> sail / attack &nbsp; <kbd>Q</kbd><kbd>W</kbd><kbd>E</kbd><kbd>R</kbd> abilities at cursor &nbsp; <kbd>T</kbd> advance age &nbsp; <kbd>H</kbd> how to play', 9000), 7000);
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
  $('#howtoBtn').classList.add('hidden'); $('#optBtn').classList.add('hidden'); howtoPending = false; if (optionsOpen) showOptions(false);
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
  $('#howtoBtn').classList.remove('hidden'); $('#optBtn').classList.remove('hidden');
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

// ---------------------------------------------------------------------------
// Options (Esc / gear): graphics quality applies live, so the match carries on where it was.
const QUALITY_NOTE = {
  low: 'Fastest. No shadows, bloom or anti-aliasing; for older laptops and integrated graphics.',
  medium: 'Balanced. Shadows, bloom and smooth edges.',
  high: 'Best looking. Adds water reflections, ambient occlusion and a sharper image; needs a decent graphics card.',
  safe: 'Compatibility. Plain water, no sky-reflection map, no post effects. Use this if the sea looks white or cream on your graphics card.',
};
let optionsOpen = false, quitArmed = 0;
function applyQuality(name) {
  const was = settings.quality;
  settings.quality = name; localSet('aa.quality', name);
  R.restoreFxOff(name === 'safe' ? ['sea', 'env'] : []); localSet('aa.fxoff', name === 'safe' ? 'sea,env' : ''); // a deliberate change gets a fresh look (the watchdog re-tests it); Compatibility starts with plain water and no sky map
  R.setQuality(name); ocean.setQuality(name === 'safe' ? 'low' : name);
  const wantRefl = name === 'high' && params.get('refl') !== '0';
  if (wantRefl && !refl) {
    makeReflections();
    if (G) { G.reflect = reflectable; for (const u of G.units) if (u.rig) reflectable(u.rig.root); if (G.boss && G.boss.rig) reflectable(G.boss.rig.root); } // ships already afloat join the mirror too
  }
  if (refl) refl.uniforms.uReflOn.value = wantRefl && !(R.fxOff || []).includes('refl') ? 1 : 0;
  if (was !== name && G && mode === 'play') hud.hint(`Graphics: <b>${name === 'high' ? 'Ultra' : name === 'medium' ? 'Medium' : name === 'safe' ? 'Compatibility' : 'Low'}</b>`, 1800);
}
function syncOptions() {
  document.querySelectorAll('#optQual button').forEach((b) => b.classList.toggle('on', b.dataset.v === settings.quality));
  $('#optQualNote').textContent = QUALITY_NOTE[settings.quality] + ' Switching can pause the picture for a moment while shaders rebuild.';
  const v = audio.volume;
  $('#optMaster').value = Math.round(v.master * 100); $('#optMusic').value = Math.round(v.music * 100); $('#optSfx').value = Math.round(v.sfx * 100);
  document.querySelectorAll('#optFps button').forEach((b) => b.classList.toggle('on', (b.dataset.v === '1') === !fpsEl.classList.contains('hidden')));
  quitArmed = 0; $('#optQuit').textContent = 'QUIT TO MENU'; $('#optQuit').classList.remove('confirm');
}
function showOptions(on) {
  if (on && (mode !== 'play' || !G || howtoOpen)) return;
  optionsOpen = on;
  $('#options').classList.toggle('hidden', !on);
  if (on) { hud.aiming = -1; syncOptions(); audio.init(); audio.play('uiClick'); }
}
$('#optBtn').onclick = () => { audio.init(); showOptions(!optionsOpen); };
$('#optResume').onclick = () => { audio.play('uiClick'); showOptions(false); };
$('#optHow').onclick = () => { showOptions(false); showHowTo(true); };
$('#options').addEventListener('pointerdown', (e) => { if (e.target === $('#options')) showOptions(false); });
document.querySelectorAll('#optQual button').forEach((b) => {
  b.onclick = () => { audio.play('uiClick'); applyQuality(b.dataset.v); syncOptions(); };
  b.onmouseenter = () => audio.play('uiHover');
});
document.querySelectorAll('#optFps button').forEach((b) => {
  b.onclick = () => { audio.play('uiClick'); fpsEl.classList.toggle('hidden', b.dataset.v !== '1'); localSet('aa.fps', b.dataset.v); syncOptions(); };
});
for (const [id, key] of [['#optMaster', 'master'], ['#optMusic', 'music'], ['#optSfx', 'sfx']]) {
  $(id).addEventListener('input', (e) => { const v = e.target.value / 100; audio.setVolume({ [key]: v }); localSet('aa.vol.' + key, String(v)); });
  $(id).addEventListener('change', () => audio.play('uiClick'));
}
$('#optQuit').onclick = () => { // two clicks: a stray click must not throw away the match
  if (!quitArmed) { quitArmed = 1; $('#optQuit').textContent = 'CLICK AGAIN TO ABANDON THE MATCH'; $('#optQuit').classList.add('confirm'); return; }
  showOptions(false); hud.closeModal(); toMenu();
};
{ // remembered volumes and overlay
  const vol = {};
  for (const k of ['master', 'music', 'sfx']) { const v = parseFloat(localGet('aa.vol.' + k)); if (Number.isFinite(v)) vol[k] = Math.max(0, Math.min(1, v)); }
  if (Object.keys(vol).length) audio.setVolume(vol);
}
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
// Clicking a skill icon fires it. Self / auto skills go off at once; aimed skills fire at the best target
  // (your current target, else the nearest enemy captain, else the nearest enemy), or dead ahead if the sea is
  // empty. Shift+click keeps the manual route: click the sea to place the shot.
function smartAim(p) {
  const RNG = 150;
  let t = p.target && p.target.alive && p.target.team !== p.team && p.dist(p.target) < RNG ? p.target : null;
  if (!t) {
    let bd = Infinity;
    for (const u of G.units) {
      if (!u.alive || u.team === p.team || u.targetable === false) continue;
      const d = p.dist(u); if (d > RNG) continue;
      const w = d * (u.kind === 'hero' ? 0.6 : 1); // captains first
      if (w < bd) { bd = w; t = u; }
    }
  }
  if (t) return [t.x + (t.vx || 0) * 0.4, t.z + (t.vz || 0) * 0.4];
  return [p.x + Math.sin(p.yaw) * 70, p.z + Math.cos(p.yaw) * 70];
}
hud.on('castButton', (i, manual) => {
  const p = G && G.player, ab = p && p.abilities[i];
  if (!ab || !p.alive) return;
  if (ab.target === 'self' || ab.target === 'auto') { playerCast(i); return; }
  if (manual) { hud.aiming = i; hud.hint('Click the sea to fire · right-click to cancel', 1800); return; }
  const [ax, az] = smartAim(p);
  if (!cast(G, p, i, ax, az)) {
    if (ab.minLevel && p.level < ab.minLevel) hud.hint(`${ab.name} unlocks at level ${ab.minLevel}`, 1500);
    audio.play('uiError');
  } else if (!castHinted) { castHinted = true; hud.hint('Skills fire at the best target · <kbd>Shift</kbd>+click to aim by hand', 3500); }
});
let castHinted = false;
hud.on('minimapLook', (x, z) => { cameraDir.locked = false; cameraDir.goal.set(x, 0, z); });
hud.on('minimapMove', (x, z) => { if (G && G.player && G.player.alive) { G.player.commandMove(x, z); moveMarker(x, z); } });

// Cursor -> a point on the sea. A ray that points above the horizon (zoomed in low, cursor over the sky) never meets
// the water, which used to leave the previous click point in place, so the upper part of the screen could not be clicked.
// Now it aims at the far sea in that direction, and every point is kept inside the playable map.
const _gn = new THREE.Vector2(), _gh = new THREE.Vector3();
function groundAt(cx, cy) {
  _gn.set((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(_gn, R.camera);
  const ray = raycaster.ray, cam = ray.origin;
  let ok = ray.intersectPlane(waterPlane, _gh) && _gh.distanceTo(cam) < 2400;
  if (!ok) { // sky, or a grazing ray that lands absurdly far away: head for the sea along the ray's heading
    const hx = ray.direction.x, hz = ray.direction.z, hl = Math.hypot(hx, hz) || 1;
    _gh.set(cam.x + (hx / hl) * 1400, 0, cam.z + (hz / hl) * 1400);
  }
  mouse.ground.set(THREE.MathUtils.clamp(_gh.x, -BOUNDS.x, BOUNDS.x), 0, THREE.MathUtils.clamp(_gh.z, -BOUNDS.z, BOUNDS.z));
}

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
let rightDrag = null; // right button: a quick click still sails / attacks (on release), a drag orbits the camera
canvas.addEventListener('pointerdown', (e) => {
  if (mode === 'play' && e.button === 2 && G && !G.over && hud.aiming < 0 && !(openingSkippable && cameraDir.cine)) {
    rightDrag = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, moved: false, id: e.pointerId };
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
  }
  if (mode === 'play' && (e.button === 1 || (e.button === 0 && e.shiftKey && hud.aiming < 0))) {
    orbitDrag = { x: e.clientX, y: e.clientY, id: e.pointerId };
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
    e.preventDefault(); e.stopImmediatePropagation();
    if (!orbitHinted) { orbitHinted = true; hud.hint('Orbiting · press <kbd>C</kbd> to reset the view', 3500); }
  }
}, true);
let orbitHinted = false;
window.addEventListener('pointermove', (e) => {
  if (rightDrag) {
    if (!rightDrag.moved && Math.hypot(e.clientX - rightDrag.sx, e.clientY - rightDrag.sy) > 6) {
      rightDrag.moved = true; cameraDir.orbiting = true;
      if (!orbitHinted) { orbitHinted = true; hud.hint('Orbiting · right-drag to look around your ship · <kbd>C</kbd> resets the view', 3500); }
    }
    if (rightDrag.moved) { cameraDir.orbitBy(e.clientX - rightDrag.x, e.clientY - rightDrag.y); }
    rightDrag.x = e.clientX; rightDrag.y = e.clientY;
    return;
  }
  if (!orbitDrag) return;
  cameraDir.orbitBy(e.clientX - orbitDrag.x, e.clientY - orbitDrag.y);
  orbitDrag.x = e.clientX; orbitDrag.y = e.clientY;
});
window.addEventListener('pointerup', (e) => {
  orbitDrag = null;
  if (rightDrag && e.button === 2) {
    const d = rightDrag; rightDrag = null; cameraDir.orbiting = false;
    if (!d.moved && mode === 'play' && G && G.player && !G.over) commandAtCursor(e); // a plain right-click: sail / attack
  }
});
window.addEventListener('pointercancel', () => { orbitDrag = null; rightDrag = null; cameraDir.orbiting = false; });
canvas.addEventListener('auxclick', (e) => e.preventDefault());
canvas.addEventListener('mousedown', (e) => { if (e.button === 1) e.preventDefault(); }); // no browser autoscroll on middle-drag
canvas.addEventListener('pointerdown', (e) => {
  audio.init();
  if (skipOpening()) return;
  if (mode !== 'play' || !G || !G.player || G.over) return;
  const p = G.player;
  if (hud.aiming >= 0) {
    const i = hud.aiming; hud.aiming = -1;
    if (e.button === 0) playerCast(i);
    return;
  }
  if (e.button === 0) commandAtCursor(e); // left click: sail / attack at once (right click acts on release, so a drag can orbit)
});
function commandAtCursor(e) {
  const p = G && G.player;
  if (!p || !p.alive) return;
  if (e) { mouse.x = e.clientX; mouse.y = e.clientY; groundAt(mouse.x, mouse.y); } // the exact spot clicked, not last frame's
  const u = pickUnit(mouse.ground.x, mouse.ground.z, p.team);
  if (u) { p.commandAttack(u); moveMarker(u.x, u.z, true); }
  else { p.commandMove(mouse.ground.x, mouse.ground.z); moveMarker(mouse.ground.x, mouse.ground.z); }
}
canvas.addEventListener('wheel', (e) => { cameraDir.zoom(e.deltaY); e.preventDefault(); }, { passive: false });

let openingSkippable = false;
function skipOpening() {
  if (!openingSkippable || !cameraDir.cine || mode !== 'play') return false;
  openingSkippable = false;
  const C = cameraDir.cine; C.t = C.dur; // lands on the gameplay pose next frame
  return true;
}
window.addEventListener('keydown', (e) => {
  if (skipOpening()) { e.preventDefault(); return; }
  if (howtoOpen) { // any key starts (H toggles, Tab/Alt ignored so alt-tab does not dismiss it)
    if (e.key === 'Tab' || e.key === 'Alt' || e.key === 'Shift' || e.key === 'Control' || e.key === 'Meta') return;
    e.preventDefault(); if (!e.repeat) showHowTo(false); return;
  }
  if (optionsOpen) { if (e.key === 'Escape') { e.preventDefault(); showOptions(false); } return; }
  cameraDir.keys[e.key] = true;
  if (mode !== 'play' || !G) return;
  if (e.key.toLowerCase() === 'h' || e.key === 'F1') { e.preventDefault(); showHowTo(true); return; }
  const k = e.key.toLowerCase();
  if (e.ctrlKey && /^[1-5]$/.test(e.key)) { e.preventDefault(); hud.handlers.buy(UPGRADES[+e.key - 1].id); return; }
  if (e.ctrlKey || e.metaKey) return; // browser chords (Ctrl+R, Cmd+C...) must not fire abilities
  if (hud.modalOpen && k === 'escape') { if (!G.over) hud.closeModal(); return; } // the result screen lives in the modal root: Esc must not delete SAIL AGAIN
  if (k === 'escape') { if (hud.aiming >= 0) hud.aiming = -1; else showOptions(true); return; }
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
window.addEventListener('blur', () => { // alt-tab with something held: let go of everything
  cameraDir.keys = {}; hud.showRange = false; hud.aiming = -1; if (hud.toggleScoreboard) hud.toggleScoreboard(false);
  orbitDrag = null; rightDrag = null; cameraDir.orbiting = false;
});

// ---------------------------------------------------------------------------
// Frame loop
let lastT = performance.now();
// What the player's GPU is, for the F3 line (the first thing needed when a driver misbehaves)
const gpuInfo = (() => {
  try {
    const g = R.gl.getContext(), e = g.getExtension('WEBGL_debug_renderer_info');
    const name = String(e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER)).replace(/^ANGLE \(/, '').replace(/, or similar\)$|\)$/, '').slice(0, 90);
    const hp = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.HIGH_FLOAT);
    return `${name} · highp ${hp ? hp.precision : '?'} · half-float RT ${R.gl.extensions.has('EXT_color_buffer_half_float') || R.gl.extensions.has('EXT_color_buffer_float') ? 'yes' : 'NO'}`;
  } catch { return 'gpu ?'; }
})();
const fpsEl = Object.assign(document.createElement('div'), { id: 'fps', className: 'hidden' });
document.body.appendChild(fpsEl);
if (localGet('aa.fps') === '1') fpsEl.classList.remove('hidden');
let wallTime = 0;
let fpsAcc = 0, fpsN = 0, fps = 60;
const lightCol = new THREE.Color();
// Per-age colour grade: the look escalates with your technology.
const AGE_GRADE = {
  1: { gain: [1.04, 1.0, 0.93], lift: [0.016, 0.01, 0.0], sat: 1.1, con: 1.07, ca: 0.0006 },
  2: { gain: [1.03, 0.99, 0.92], lift: [0.012, 0.009, 0.006], sat: 0.98, con: 1.12, ca: 0.0006 },
  3: { gain: [0.99, 1.0, 1.03], lift: [0.006, 0.01, 0.016], sat: 1.03, con: 1.12, ca: 0.0007 },
  4: { gain: [1.0, 1.01, 1.02], lift: [0.008, 0.01, 0.014], sat: 1.14, con: 1.09, ca: 0.0008 },
  5: { gain: [0.96, 1.0, 1.07], lift: [0.0, 0.012, 0.03], sat: 1.18, con: 1.15, ca: 0.001 },
};
const gradeCur = { gain: new THREE.Vector3(1, 1, 1), lift: new THREE.Vector3(), sat: 1.1, con: 1.08, ca: 0.0007 };
const _px = new Uint8Array(4);
function syncGPU() { const g = R.gl.getContext(); g.readPixels(0, 0, 1, 1, g.RGBA, g.UNSIGNED_BYTE, _px); }
window.__aa = { get G() { return G; }, R, sky, cameraDir, fx, settings, get refl() { return refl; }, weather, TEAM_RIM, get fps() { return fps; }, howto: (on) => showHowTo(on), sealife,
  // test fast-forward: advance the sim AND age its effects (plain G.update leaves every spray puff frozen in place)
  ff: (dt) => { G.update(dt); const t = G.time; wakes.update(dt, t); fx.update(dt, t); particles.update(dt); ocean.decals.update(dt, t); } };

// GPU context loss (driver reset, laptop GPU switch, tab memory pressure): cancel the event so the browser
// may restore the context, hold the match still behind a notice, and resume the moment it comes back.
let gpuLost = false;
{
  const note = document.createElement('div');
  note.id = 'gpuNote'; note.className = 'hidden';
  note.innerHTML = '<div><b>Graphics driver reset</b><br>Hold on, restoring the view. Your match is paused.</div>';
  document.body.appendChild(note);
  const cv = R.gl.domElement;
  cv.addEventListener('webglcontextlost', (e) => { e.preventDefault(); gpuLost = true; note.classList.remove('hidden'); console.warn('[gpu] context lost'); });
  cv.addEventListener('webglcontextrestored', () => {
    gpuLost = false; note.classList.add('hidden'); lastT = performance.now(); console.warn('[gpu] context restored');
    // GPU-side resources are gone: rebuild the lighting environment and shadow map now rather than on their slow timers
    try { sky.updateEnv(0, true); R.gl.shadowMap.needsUpdate = true; } catch (e) { console.warn('[gpu] rebuild', e); }
  });
}
function frame() {
  requestAnimationFrame(frame);
  const now = performance.now(); const dt = Math.min((now - lastT) / 1000, 0.1); lastT = now;
  if (window.__aa.paused || gpuLost) return;
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
  if (fpsAcc > 1) { fps = fpsN / fpsAcc; fpsAcc = 0; fpsN = 0; if (!fpsEl.classList.contains('hidden')) { const off = [R.ao && !R.ao.enabled && 'AO', R.refl && !R.refl.uniforms.uReflOn.value && 'reflections', R.sun && R.sun.shadow.mapSize.x < 2048 && R.q.shadows >= 2048 && 'shadow detail', R.smaa && !R.smaa.enabled && 'AA', R.safeMode && 'post FX', ...(R.fxOff || []).map((n) => 'GPU-blocked ' + n)].filter(Boolean);
    fpsEl.textContent = `${fps.toFixed(0)} fps · ${(R.gl.getPixelRatio() * 100).toFixed(0)}% res · ${R.gl.info.render.calls} draws${off.length ? ' · off: ' + off.join(', ') : ''} · ${gpuInfo}`; } }
  if (howtoPending && mode === 'play' && !cameraDir.cine && G && G.time > 1) { howtoPending = false; showHowTo(true); }
  if (G && !howtoOpen && !optionsOpen) G.update(dt);
  const gdt = G ? G.dt : dt;
  const t = G ? G.time : wallTime;

  // camera + listener
  const p = G && G.player;
  cameraDir.update(dt, p && p.alive ? p : null);
  const f = cameraDir.focus;
  if (G) { G.listener.x = f.x; G.listener.z = f.z; G.viewScale = 1.15 + THREE.MathUtils.smoothstep(cameraDir.dist, 160, 290) * 0.25; /* captains always read a size above gunboats */ }
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
  if (mode === 'play') sealife.update(gdt, t, f, cameraDir.yaw); // not in the menu showreel: its orbit camera can't frame them
  wakes.update(gdt, t);
  ocean.update(gdt, t, f.x, f.z, sky);
  fx.update(gdt, t);
  particles.update(gdt);

  // mouse ground point
  groundAt(mouse.x, mouse.y);
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
// warm up shaders with one frame before revealing (hidden, rarely-shown meshes included, so the
// first whale sighting doesn't hitch on a shader compile)
for (const m of sealife.meshes) { m.visible = true; m.frustumCulled = false; }
// every hull and gunboat era for both fleets, rigged exactly as the game rigs them: age-ups otherwise
// compile ~8 new programs mid-match (tens of ms each on D3D), right in the middle of a Reforging
const warm = new THREE.Group();
for (const team of [0, 1]) {
  for (const id of HERO_IDS) { const r = buildHeroShip(id, team); applyTeamRim(r.root, team); warm.add(r.root); }
  for (let era = 1; era <= 5; era++) for (const heavy of [false, true]) { const r = buildCreepShip(era, heavy, team); applyTeamRim(r.root, team, 2.2); warm.add(r.root); }
}
warm.add(shieldMesh(0x9fd8ff));
warm.traverse((o) => { o.frustumCulled = false; });
scene.add(warm);
// and the effects first seen at an age-up / big kill (their shader programs compile on first use)
try { const wp = new THREE.Vector3(cameraDir.focus.x, 4, cameraDir.focus.z); fx.ageUp(wp, 0x9fd8ff); fx.megaExplosion(wp, 20); fx.emp(wp.x, wp.z, 20); } catch (e) { console.warn('[warmup]', e); }
// compile in parallel where the driver allows (KHR_parallel_shader_compile): the loading bar keeps moving and the
// tab does not freeze for the several seconds a D3D driver needs to build ~100 programs one after another
await step(84, 'Compiling shaders');
try { await Promise.race([R.gl.compileAsync(scene, R.camera), new Promise((r) => setTimeout(r, 25000))]); } catch (e) { console.warn('[warmup] async compile', e); }
await step(90, 'Compiling shaders');
R.render(0.016, 0); // a real frame (reflections, AO, shadows) compiles exactly the variants play uses
scene.remove(warm);
for (const m of sealife.meshes) { m.visible = false; m.frustumCulled = true; }
await step(100, 'Set sail');
$('#loading').style.opacity = '0';
setTimeout(() => $('#loading').remove(), 900);
if (params.get('autoplay')) play();
requestAnimationFrame(frame);
