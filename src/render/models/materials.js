// Shared, cached PBR materials + procedural canvas textures for every model.
// Nothing here is created per frame: every getMat() call with the same key
// returns the same material instance.
//
//   getMat(name, teamId?, vertexColors?)
//
// `teamId` only matters for team-dependent materials (team, teamGlow, teamPulse,
// sail, flag). Use -1 / undefined for a neutral (white / grey) version.
// `vertexColors` (default false) returns a variant that multiplies the base
// color by the geometry's `color` attribute; the procedural models use this to
// bake tint variations into merged meshes.
import * as THREE from 'three';
import { applyCloudShadow, CLOUD } from '../cloudShadow.js';
import { applyWeathering } from '../weathering.js';
const WEATHER = { steel: 1, darksteel: 0.9, iron: 1.1, paint: 0.8, white: 0.55, stealth: 0.35, stealthDark: 0.35, teamMetal: 0.6, team: 0.5 };
import { TEAMS } from '../../core/config.js';

const cache = new Map();
const texCache = new Map();

const NEUTRAL = { color: 0xd8dde2, glow: 0xdff4ff };
export function teamInfo(teamId) {
  return teamId != null && teamId >= 0 && TEAMS[teamId] ? TEAMS[teamId] : NEUTRAL;
}

// ---------------------------------------------------------------------------
// Deterministic RNG so textures look identical on every load.
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return [c, c.getContext('2d')];
}

function toTex(c, { repeat = true, srgb = true, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.needsUpdate = true;
  return t;
}

function hsl(h, s, l) { return `hsl(${h},${s}%,${l}%)`; }

// Horizontal planks: rows along the texture U axis (so planks run along U).
function plankTexture(key, { w = 512, h = 512, rows = 16, hue = 28, sat = 45, light = 34, jitter = 7, seam = 'rgba(20,10,5,0.85)', seamW = 2, grain = 0.10, seed = 7 }) {
  if (texCache.has(key)) return texCache.get(key);
  const [c, g] = canvas(w, h);
  const r = rng(seed);
  const rh = h / rows;
  for (let i = 0; i < rows; i++) {
    // each row is made of 2-3 boards with butt joints
    let x = -r() * w * 0.5;
    while (x < w) {
      const len = w * (0.35 + r() * 0.45);
      const l = light + (r() - 0.5) * jitter * 2;
      g.fillStyle = hsl(hue + (r() - 0.5) * 6, sat + (r() - 0.5) * 10, l);
      g.fillRect(x, i * rh, len, rh);
      // grain streaks
      for (let k = 0; k < 10; k++) {
        const yy = i * rh + r() * rh;
        g.strokeStyle = `rgba(${r() < 0.5 ? '40,20,8' : '255,230,190'},${grain * r()})`;
        g.lineWidth = 0.6 + r() * 1.2;
        g.beginPath();
        g.moveTo(x, yy);
        const amp = r() * 1.6;
        for (let xx = x; xx <= x + len; xx += 16) g.lineTo(xx, yy + Math.sin(xx * 0.03 + k) * amp);
        g.stroke();
      }
      // knot
      if (r() < 0.18) {
        const kx = x + r() * len, ky = i * rh + rh * 0.5;
        g.fillStyle = 'rgba(40,20,8,0.35)';
        g.beginPath(); g.ellipse(kx, ky, 5 + r() * 5, 2 + r() * 2, 0, 0, Math.PI * 2); g.fill();
      }
      g.fillStyle = seam;
      g.fillRect(x + len - 1, i * rh, seamW * 0.75, rh);
      x += len;
    }
    g.fillStyle = seam;
    g.fillRect(0, i * rh, w, seamW);
  }
  const t = toTex(c);
  texCache.set(key, t);
  return t;
}

function woodTex() {
  return plankTexture('wood', { rows: 16, hue: 26, sat: 48, light: 30, jitter: 5, seamW: 2, grain: 0.14, seed: 11 });
}
function teakTex() {
  return plankTexture('teak', { rows: 20, hue: 32, sat: 20, light: 44, jitter: 2.5, seam: 'rgba(40,30,20,0.55)', seamW: 1.4, grain: 0.05, seed: 23 });
}

function stoneTex() {
  const key = 'stone';
  if (texCache.has(key)) return texCache.get(key);
  const [c, g] = canvas(512, 512);
  const r = rng(99);
  g.fillStyle = '#3a3733'; g.fillRect(0, 0, 512, 512);
  const rows = 8, rh = 512 / rows;
  for (let i = 0; i < rows; i++) {
    let x = (i % 2) * -40 - r() * 30;
    while (x < 512) {
      const bw = 70 + r() * 60;
      const l = 62 + (r() - 0.5) * 14;
      g.fillStyle = hsl(36 + (r() - 0.5) * 10, 10 + r() * 6, l);
      g.fillRect(x + 2, i * rh + 2, bw - 4, rh - 4);
      for (let k = 0; k < 40; k++) {
        g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},${0.05 * r()})`;
        g.fillRect(x + r() * bw, i * rh + r() * rh, 2 + r() * 8, 2 + r() * 6);
      }
      // weathering at the bottom of each block
      const grd = g.createLinearGradient(0, i * rh, 0, i * rh + rh);
      grd.addColorStop(0, 'rgba(0,0,0,0)'); grd.addColorStop(1, 'rgba(30,25,15,0.18)');
      g.fillStyle = grd; g.fillRect(x + 2, i * rh + 2, bw - 4, rh - 4);
      x += bw;
    }
  }
  const t = toTex(c);
  texCache.set(key, t);
  return t;
}

// Plate steel with subtle panel seams + grime (grey-scale, tinted by material color).
function plateTex() {
  const key = 'plate';
  if (texCache.has(key)) return texCache.get(key);
  const [c, g] = canvas(512, 512);
  const r = rng(5);
  g.fillStyle = '#d6d6d6'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 900; i++) {
    g.fillStyle = `rgba(${r() < 0.6 ? '0,0,0' : '255,255,255'},${0.035 * r()})`;
    g.fillRect(r() * 512, r() * 512, 4 + r() * 30, 2 + r() * 14);
  }
  g.strokeStyle = 'rgba(0,0,0,0.22)'; g.lineWidth = 2;
  for (let y = 0; y <= 512; y += 128) { g.beginPath(); g.moveTo(0, y); g.lineTo(512, y); g.stroke(); }
  for (let row = 0; row < 4; row++) {
    for (let x = (row % 2) * 96; x <= 512; x += 192) { g.beginPath(); g.moveTo(x, row * 128); g.lineTo(x, row * 128 + 128); g.stroke(); }
  }
  // rust streaks
  for (let i = 0; i < 14; i++) {
    const x = r() * 512, y = r() * 512;
    const grd = g.createLinearGradient(x, y, x, y + 60);
    grd.addColorStop(0, 'rgba(90,50,20,0.10)'); grd.addColorStop(1, 'rgba(90,50,20,0)');
    g.fillStyle = grd; g.fillRect(x, y, 3, 60);
  }
  const t = toTex(c, { srgb: true });
  texCache.set(key, t);
  return t;
}

// Carrier flight deck. U = across (0..1 port->starboard), V = along (0 stern .. 1 bow).
function flightDeckTex() {
  const key = 'flightdeck';
  if (texCache.has(key)) return texCache.get(key);
  const W = 512, H = 2048;
  const [c, g] = canvas(W, H);
  const r = rng(41);
  g.fillStyle = '#44484d'; g.fillRect(0, 0, W, H);
  // non-skid noise + tyre marks
  for (let i = 0; i < 5000; i++) {
    g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},${0.04 * r()})`;
    g.fillRect(r() * W, r() * H, 2 + r() * 10, 2 + r() * 10);
  }
  for (let i = 0; i < 40; i++) {
    g.strokeStyle = `rgba(10,10,10,${0.08 + r() * 0.1})`; g.lineWidth = 3 + r() * 4;
    const x = W * (0.35 + r() * 0.3), y = H * (0.45 + r() * 0.5);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 40, y - 150 - r() * 200); g.stroke();
  }
  // plate seams across
  g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 2;
  for (let y = 0; y < H; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  // deck edge lines
  g.fillStyle = '#e8e8e0';
  g.fillRect(14, 0, 6, H); g.fillRect(W - 20, 0, 6, H);
  // dashed centreline
  for (let y = 60; y < H - 60; y += 90) g.fillRect(W / 2 - 5, y, 10, 50);
  // yellow taxi lines
  g.strokeStyle = '#e5b92e'; g.lineWidth = 5;
  g.beginPath(); g.moveTo(W * 0.2, H * 0.05); g.lineTo(W * 0.2, H * 0.95); g.stroke();
  // catapults at the bow (top of canvas)
  g.fillStyle = 'rgba(15,15,15,0.8)';
  g.fillRect(W * 0.34, 20, 8, H * 0.2); g.fillRect(W * 0.62, 20, 8, H * 0.18);
  g.fillStyle = '#e5b92e';
  g.fillRect(W * 0.34 - 12, H * 0.2, 32, 6); g.fillRect(W * 0.62 - 12, H * 0.18, 32, 6);
  // elevators (outlined squares)
  g.strokeStyle = '#d8d8cf'; g.lineWidth = 4;
  g.strokeRect(W * 0.36, H * 0.30, W * 0.28, W * 0.26);
  g.strokeRect(W * 0.36, H * 0.62, W * 0.28, W * 0.26);
  // landing area: red/white round-down stripes at stern (bottom)
  for (let i = 0; i < 10; i++) {
    g.fillStyle = i % 2 ? '#e8e8e0' : '#b82a22';
    g.fillRect(i * W / 10, H - 28, W / 10, 28);
  }
  // wire arresting cables
  g.fillStyle = 'rgba(210,210,200,0.8)';
  for (let i = 0; i < 4; i++) g.fillRect(W * 0.18, H * 0.86 + i * 34, W * 0.64, 3);
  // big bow deck number
  g.save();
  g.translate(W / 2, H * 0.08);
  g.fillStyle = '#e8e8e0';
  g.font = 'bold 150px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('07', 0, 0);
  g.restore();
  const t = toTex(c, { repeat: false, aniso: 16 });
  texCache.set(key, t);
  return t;
}

function drawEmblem(g, teamId, cx, cy, s, fg) {
  g.save();
  g.translate(cx, cy);
  g.fillStyle = fg;
  if (teamId === 0) {
    // five-point star
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5;
      const rr = i % 2 ? s * 0.42 : s;
      g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    g.closePath(); g.fill();
  } else if (teamId === 1) {
    // sun disc with rays
    g.beginPath(); g.arc(0, 0, s * 0.45, 0, Math.PI * 2); g.fill();
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6;
      g.beginPath();
      g.moveTo(Math.cos(a - 0.12) * s * 0.55, Math.sin(a - 0.12) * s * 0.55);
      g.lineTo(Math.cos(a) * s * 1.05, Math.sin(a) * s * 1.05);
      g.lineTo(Math.cos(a + 0.12) * s * 0.55, Math.sin(a + 0.12) * s * 0.55);
      g.fill();
    }
  } else {
    g.beginPath(); g.arc(0, 0, s * 0.5, 0, Math.PI * 2); g.fill();
  }
  g.restore();
}

function css(hex) { return '#' + hex.toString(16).padStart(6, '0'); }

// Sail atlas: left half = plain panelled sail with a team band, right half = the
// same with the team crest. The UV v axis is 0 at the foot, 1 at the head.
function sailTex(teamId) {
  const key = 'sail:' + teamId;
  if (texCache.has(key)) return texCache.get(key);
  const W = 512, H = 256;
  const [c, g] = canvas(W, H);
  const r = rng(3);
  const team = teamInfo(teamId);
  for (let half = 0; half < 2; half++) {
    const x0 = half * 256;
    const grd = g.createLinearGradient(0, 0, 0, H);
    grd.addColorStop(0, '#e9dfc6'); grd.addColorStop(1, '#d6c7a4');
    g.fillStyle = grd; g.fillRect(x0, 0, 256, H);
    // vertical cloth panels
    for (let x = 0; x < 256; x += 21) {
      g.fillStyle = `rgba(90,70,40,${0.10 + r() * 0.06})`;
      g.fillRect(x0 + x, 0, 1.5, H);
      g.fillStyle = `rgba(255,250,235,${0.05 + r() * 0.05})`;
      g.fillRect(x0 + x + 2, 0, 8, H);
    }
    // reef bands
    g.fillStyle = 'rgba(90,70,40,0.18)';
    g.fillRect(x0, H * 0.2, 256, 2); g.fillRect(x0, H * 0.32, 256, 2);
    // grime near the foot
    const gg = g.createLinearGradient(0, H * 0.75, 0, H);
    gg.addColorStop(0, 'rgba(80,60,30,0)'); gg.addColorStop(1, 'rgba(80,60,30,0.2)');
    g.fillStyle = gg; g.fillRect(x0, 0, 256, H);
    if (teamId != null && teamId >= 0) {
      g.fillStyle = css(team.color);
      g.fillRect(x0, H * 0.64, 256, H * 0.12);
      g.fillStyle = 'rgba(255,255,255,0.35)';
      g.fillRect(x0, H * 0.64, 256, 3); g.fillRect(x0, H * 0.76 - 3, 256, 3);
      if (half === 1) {
        g.fillStyle = css(team.color);
        g.beginPath(); g.arc(x0 + 128, H * 0.38, 46, 0, Math.PI * 2); g.fill();
        g.strokeStyle = '#f4ecd8'; g.lineWidth = 5; g.stroke();
        drawEmblem(g, teamId, x0 + 128, H * 0.38, 30, '#f7f0dc');
      }
    }
    // border rope
    g.strokeStyle = 'rgba(90,70,40,0.5)'; g.lineWidth = 4;
    g.strokeRect(x0 + 2, 2, 252, H - 4);
  }
  const t = toTex(c, { repeat: false });
  texCache.set(key, t);
  return t;
}

function flagTex(teamId) {
  const key = 'flag:' + teamId;
  if (texCache.has(key)) return texCache.get(key);
  const [c, g] = canvas(128, 64);
  const team = teamInfo(teamId);
  const neutral = !(teamId != null && teamId >= 0);
  g.fillStyle = neutral ? '#d9dcdf' : css(team.color);
  g.fillRect(0, 0, 128, 64);
  g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(0, 56, 128, 8);
  g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(0, 0, 128, 6);
  if (!neutral) drawEmblem(g, teamId, 42, 32, 18, '#ffffff');
  else { g.fillStyle = '#9aa0a6'; g.fillRect(20, 26, 88, 12); }
  const t = toTex(c, { repeat: false });
  texCache.set(key, t);
  return t;
}

// 4x1 emissive mask: u in [0,0.25) black, [0.5,0.75) white. Small models map
// their glowing parts to u=0.625 and the rest to u=0.125.
export function emissiveMaskTex() {
  const key = 'emask';
  if (texCache.has(key)) return texCache.get(key);
  const data = new Uint8Array([0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255]);
  const t = new THREE.DataTexture(data, 4, 1);
  t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestFilter;
  t.needsUpdate = true;
  texCache.set(key, t);
  return t;
}

// ---------------------------------------------------------------------------
const DEFS = {
  wood: (t) => ({ color: 0xffffff, map: woodTex(), bumpMap: woodTex(), bumpScale: 1.2, roughness: 0.78, metalness: 0.0 }),
  darkwood: () => ({ color: 0x8a6a50, map: woodTex(), roughness: 0.7, metalness: 0.0 }),
  teak: () => ({ color: 0xd8d0c4, map: teakTex(), bumpMap: teakTex(), bumpScale: 0.8, roughness: 0.72, metalness: 0.0 }),
  sail: (t) => ({ color: 0xb4ab98, map: sailTex(t), roughness: 0.92, metalness: 0.0, side: THREE.DoubleSide }),
  iron: () => ({ color: 0x2c2e33, roughness: 0.42, metalness: 0.75 }),
  steel: () => ({ color: 0x8a939c, map: plateTex(), roughness: 0.55, metalness: 0.35 }),
  darksteel: () => ({ color: 0x4a5058, map: plateTex(), roughness: 0.5, metalness: 0.4 }),
  rubber: () => ({ color: 0x141517, roughness: 0.92, metalness: 0.0 }),
  brass: () => ({ color: 0xd2a84e, roughness: 0.28, metalness: 1.0 }),
  glass: () => ({ physical: true, color: 0x0b1620, roughness: 0.06, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05, emissive: 0x0a2230, emissiveIntensity: 0.6 }),
  stealth: () => ({ color: 0x3b4046, roughness: 0.58, metalness: 0.45, flatShading: true }),
  stealthDark: () => ({ color: 0x24282d, roughness: 0.5, metalness: 0.5, flatShading: true }),
  flightDeck: () => ({ color: 0xffffff, map: flightDeckTex(), roughness: 0.82, metalness: 0.1 }),
  team: (t) => ({ color: teamInfo(t).color, roughness: 0.45, metalness: 0.2 }),
  teamMetal: (t) => ({ color: teamInfo(t).color, roughness: 0.3, metalness: 0.8 }),
  teamGlow: (t) => ({ color: 0x000000, emissive: teamInfo(t).glow, emissiveIntensity: 2.3, roughness: 0.4, metalness: 0.0, toneMapped: true }),
  teamPulse: (t) => ({ color: 0x000000, emissive: teamInfo(t).glow, emissiveIntensity: 3.0, roughness: 0.4, metalness: 0.0 }),
  lantern: () => ({ color: 0x201008, emissive: 0xffa84a, emissiveIntensity: 4.5, roughness: 0.5 }),
  furnace: () => ({ color: 0x100500, emissive: 0xff4d12, emissiveIntensity: 4.0, roughness: 0.6 }),
  lamp: () => ({ color: 0x202020, emissive: 0xfff2d0, emissiveIntensity: 6.0, roughness: 0.3 }),
  navRed: () => ({ color: 0x200000, emissive: 0xff2020, emissiveIntensity: 5.0 }),
  navGreen: () => ({ color: 0x002000, emissive: 0x20ff50, emissiveIntensity: 5.0 }),
  white: () => ({ color: 0xe6e4de, roughness: 0.6, metalness: 0.05 }),
  paint: () => ({ color: 0xffffff, roughness: 0.6, metalness: 0.1 }),
  stone: () => ({ color: 0xffffff, map: stoneTex(), bumpMap: stoneTex(), bumpScale: 1.5, roughness: 0.9, metalness: 0.0 }),
  rock: () => ({ color: 0xffffff, roughness: 0.95, metalness: 0.0, vc: true }),
  flag: (t) => ({ color: 0xffffff, map: flagTex(t), roughness: 0.85, metalness: 0.0, side: THREE.DoubleSide }),
  flagNeutral: () => ({ color: 0xffffff, map: flagTex(-1), roughness: 0.85, metalness: 0.0, side: THREE.DoubleSide }),
  lightBeam: () => ({ basic: true, color: 0xfff0c8, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
  teamBeam: (t) => ({ basic: true, color: teamInfo(t).glow, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
};

const TEAM_DEP = new Set(['team', 'teamMetal', 'teamGlow', 'teamPulse', 'sail', 'flag', 'teamBeam']);

export const MATERIAL_NAMES = Object.keys(DEFS);

/** Re-apply shader patches (cloud shadows, weathering) -- needed after Material.clone(). */
export function patchMaterial(m, name) {
  m.userData = {};
  applyCloudShadow(m);
  if (WEATHER[name]) applyWeathering(m, WEATHER[name]);
  return m;
}

export function getMat(name, teamId, vertexColors = false) {
  if (!DEFS[name]) throw new Error('Unknown material ' + name);
  const t = TEAM_DEP.has(name) ? (teamId != null && teamId >= 0 ? teamId : -1) : -1;
  const key = name + ':' + t + ':' + (vertexColors ? 1 : 0);
  let m = cache.get(key);
  if (m) return m;
  const def = { ...DEFS[name](t) };
  const physical = def.physical; delete def.physical;
  const basic = def.basic; delete def.basic;
  const vc = def.vc; delete def.vc;
  if (vertexColors || vc) def.vertexColors = true;
  if (basic) m = new THREE.MeshBasicMaterial(def);
  else if (physical) m = new THREE.MeshPhysicalMaterial(def);
  else m = new THREE.MeshStandardMaterial(def);
  if (!basic) applyCloudShadow(m);
  if (!basic && WEATHER[name]) applyWeathering(m, WEATHER[name]);
  if (name === 'flag' || name === 'flagNeutral') applyClothFolds(m);
  if (name === 'teamBeam') applySoftBeam(m);
  m.name = key;
  cache.set(key, m);
  return m;
}

// Emissive pulse for the shared 'teamPulse' materials. Idempotent in `time`, so
// every model can call it from its update() without compounding.
let lastPulse = -1;
export function pulseMaterials(time) {
  if (time === lastPulse) return;
  lastPulse = time;
  const k = 2.4 + 1.6 * (0.5 + 0.5 * Math.sin(time * 3.1));
  for (const [key, m] of cache) if (key.startsWith('teamPulse:')) m.emissiveIntensity = k;
}

// Cloth folds for flags/pennants: morph-target flutter doesn't update normals, so
// without this the cloth shades as one flat painted plank. Travelling fold bands
// (in step with the flutter), soft sheen on the crests, a darker weathered fly end.
function applyClothFolds(m) {
  const prev = m.onBeforeCompile;
  m.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    sh.uniforms.uClothT = CLOUD.uCloudT;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying float vClothPh;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n{ vec4 cw = modelMatrix * vec4(position, 1.0); vClothPh = dot(cw.xz, vec2(0.071, 0.113)); } // each flag on its own phase');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uClothT; varying float vClothPh;')
      .replace('#include <map_fragment>', `#include <map_fragment>
#ifdef USE_MAP
{
  vec2 cu = vMapUv;
  float tt = uClothT + vClothPh * 6.2831;
  // band-limited: folds fade out once a cycle gets close to a pixel (distant flags stay clean, no shimmer)
  float fw = fwidth(cu.x);
  float a1 = 1.0 - smoothstep(0.05, 0.18, fw * 6.0), a2 = 1.0 - smoothstep(0.05, 0.18, fw * 12.0);
  float fold = sin(cu.x * 6.0 - tt * 5.0 + sin(cu.y * 2.5 + tt) * 1.1) * a1;
  float fold2 = sin(cu.x * 12.0 - tt * 8.0 + cu.y * 3.0) * a2;
  float shade = 0.7 + 0.24 * fold + 0.07 * fold2;
  diffuseColor.rgb *= shade * mix(1.0, 0.72, smoothstep(0.55, 1.0, cu.x));   // folds + sun-faded, sooty fly end
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11))), 0.18); // weathered dye
}
#endif`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
#ifdef USE_MAP
roughnessFactor = clamp(roughnessFactor - 0.22 * smoothstep(0.6, 1.0, sin(vMapUv.x * 6.0 - (uClothT + vClothPh * 6.2831) * 5.0)), 0.3, 1.0);
#endif`);
  };
  const key = m.customProgramCacheKey ? m.customProgramCacheKey.bind(m) : () => '';
  m.customProgramCacheKey = () => key() + '|cloth';
  m.needsUpdate = true;
}

// Volumetric-looking light column: edges fade with the view angle (no hard quad
// silhouette), the shaft thins out toward the sky and blooms at its base.
function applySoftBeam(m) {
  m.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vBmN; varying vec3 vBmV; varying float vBmY;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvBmN = normalize(normalMatrix * normal); vBmV = -mvPosition.xyz; vBmY = position.y;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vBmN; varying vec3 vBmV; varying float vBmY;')
      .replace('#include <alphamap_fragment>', `#include <alphamap_fragment>
{
  float facing = abs(dot(normalize(vBmN), normalize(vBmV)));
  float core = pow(max(facing, 0.0), 2.2);                                   // bright centre, soft falloff to the edges
  float along = (1.0 - smoothstep(52.0, 76.5, vBmY)) * smoothstep(40.5, 43.5, vBmY);
  // HDR-safe team identity: saturate the team hue and keep the stacked additive layers
  // under the bloom knee, so the column stays blue/red instead of washing to white
  vec3 hue = diffuseColor.rgb / max(max(diffuseColor.r, diffuseColor.g), max(diffuseColor.b, 1e-3));
  diffuseColor.rgb = mix(hue * hue, hue, 0.35) * 0.8;
  diffuseColor.a *= core * along * 1.05;
  diffuseColor.rgb *= 1.0 + (1.0 - smoothstep(40.5, 50.0, vBmY)) * 0.6; // brighter base, same hue
}`);
  };
  m.customProgramCacheKey = () => 'softbeam';
  m.needsUpdate = true;
}
