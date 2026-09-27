// Procedural sea fortifications + ports, each on its own rocky islet.
//
//   buildStructure(kind: 'outer'|'inner'|'citadel', teamId)
//     -> { root, turret: { pivot, muzzles }, top, beacon, setEra(era), update(dt, time) }
//   buildPort() -> { root, setOwner(teamId | -1), update(dt, time) }
//
// Origin = sea level at the islet centre, +Z = the side facing the map centre
// (gates / quays face +Z). turret.pivot.rotation.y = 0 aims +Z. setEra() swaps
// the weapon (1-2 cannon battery, 3 steel turret, 4-5 missile/radar array) and
// refills turret.muzzles IN PLACE (same array object).
import * as THREE from 'three';
import {
  Parts, M, prep, prism, ngon, scalePoly, chamferRect, block, flagGeo, clothMesh, turret, radar, markerAt, shipMat,
} from './shipModels.js';
import { pulseMaterials } from './materials.js';

const PI = Math.PI;
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const lerp = (a, b, t) => a + (b - a) * t;
function sst(a, b, x) { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }

// ---------------------------------------------------------------- noise
function hash(i, j, seed) {
  let h = Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(seed, 982451653);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
function vnoise(x, y, seed) {
  const i = Math.floor(x), j = Math.floor(y);
  const fx = x - i, fy = y - j;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash(i, j, seed), b = hash(i + 1, j, seed), c = hash(i, j + 1, seed), d = hash(i + 1, j + 1, seed);
  return lerp(lerp(a, b, u), lerp(c, d, u), v) * 2 - 1;
}
function fbm(x, y, seed, oct = 4) {
  let s = 0, a = 0.5, f = 1;
  for (let o = 0; o < oct; o++) { s += a * vnoise(x * f, y * f, seed + o * 17); f *= 2.03; a *= 0.5; }
  return s;
}

// ---------------------------------------------------------------- islet
const COL = {
  wetSand: new THREE.Color(0x8f7d5c), sand: new THREE.Color(0xd6c291), rock: new THREE.Color(0x77726a),
  rockDark: new THREE.Color(0x4f4b46), grass: new THREE.Color(0x5b7a37), moss: new THREE.Color(0x6f8a45),
};
function islet(P, { R, top = 1.4, flatR = R * 0.5, seed = 1, rough = 1 }) {
  const nr = 24, ns = 84;
  const pos = [], uv = [], idx = [];
  const flatF = flatR / R;
  for (let i = 0; i <= nr; i++) {
    const t = i / nr;
    const r = t * R * 1.12;
    for (let j = 0; j < ns; j++) {
      const th = (j / ns) * PI * 2;
      const cx = Math.cos(th), sz = Math.sin(th);
      const edge = R * (1 + 0.13 * fbm(cx * 1.4 + seed, sz * 1.4 - seed, seed, 3));
      const tn = r / edge;
      let x = cx * r, z = sz * r;
      let y;
      if (tn <= flatF) {
        y = top + 0.12 * fbm(x * 0.25, z * 0.25, seed + 5, 2);
      } else if (tn <= 1) {
        const s = (tn - flatF) / (1 - flatF);
        const base = lerp(top, -2.6, Math.pow(sst(0, 1, s), 1.25));
        const bump = fbm(x * 0.32, z * 0.32, seed + 9, 4) * 1.1 * rough * Math.sin(PI * clamp(s * 1.1, 0, 1));
        y = base + bump + 0.25 * sst(0.3, 0.6, s) * fbm(x * 0.9, z * 0.9, seed + 3, 2);
      } else {
        y = -2.6 - (tn - 1) * 12;
      }
      const jit = tn > flatF ? 0.35 : 0;
      x += jit * vnoise(x * 0.7, z * 0.7, seed + 11); z += jit * vnoise(z * 0.7, x * 0.7, seed + 13);
      pos.push(x, y, z);
      uv.push(x * 0.2, z * 0.2);
    }
  }
  for (let i = 0; i < nr; i++) for (let j = 0; j < ns; j++) {
    const a = i * ns + j, b = i * ns + ((j + 1) % ns), c = a + ns, d = b + ns;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  // make sure normals point up (winding check)
  if (g.attributes.normal.getY(ns * 2) < 0) {
    for (let i = 0; i < idx.length; i += 3) { const tmp = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = tmp; }
    g.setIndex(idx); g.computeVertexNormals();
  }
  const n = g.attributes.normal, p = g.attributes.position;
  const col = new Float32Array(p.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), ny = n.getY(i);
    const nz = fbm(x * 0.5, z * 0.5, seed + 21, 2) * 0.5 + 0.5;
    if (y < 0.1) c.copy(COL.wetSand).lerp(COL.rockDark, sst(-0.5, -2.5, y) * 0.5);
    else if (y < 0.55 && ny > 0.6) c.copy(COL.sand).lerp(COL.wetSand, sst(0.4, 0.1, y));
    else if (ny < 0.78) c.copy(COL.rock).lerp(COL.rockDark, clamp(0.78 - ny, 0, 0.5) * 1.6 * nz);
    else c.copy(COL.grass).lerp(COL.moss, nz).lerp(COL.rock, sst(0.9, 0.78, ny) * 0.7);
    const v = 0.88 + 0.24 * vnoise(x * 1.7, z * 1.7, seed + 31);
    col[i * 3] = c.r * v; col[i * 3 + 1] = c.g * v; col[i * 3 + 2] = c.b * v;
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  P.addRaw('rock', g.toNonIndexed());
  // boulders around the shore
  let k = 0;
  const count = Math.round(R * 0.9);
  for (let b = 0; b < count; b++) {
    const th = hash(b, 7, seed) * PI * 2;
    const rr = R * lerp(0.72, 1.02, hash(b, 9, seed));
    const s = lerp(0.6, 1.8, hash(b, 11, seed)) * (R / 15);
    const bg = new THREE.IcosahedronGeometry(1, 1);
    const bp = bg.attributes.position;
    for (let v = 0; v < bp.count; v++) {
      const f = 1 + 0.28 * vnoise(bp.getX(v) * 2 + b, bp.getY(v) * 2 + bp.getZ(v) * 1.3, seed + 41);
      bp.setXYZ(v, bp.getX(v) * f, bp.getY(v) * f * 0.7, bp.getZ(v) * f);
    }
    bg.computeVertexNormals();
    const shade = hash(b, 13, seed) > 0.5 ? 0x6e6a62 : 0x5a5650;
    P.add('rock', bg, shade, M(Math.cos(th) * rr, -0.1 + hash(b, 15, seed) * 0.4, Math.sin(th) * rr, hash(b, 17, seed) * 3, hash(b, 19, seed) * 3, 0, s, s, s));
    k++;
  }
}

// ---------------------------------------------------------------- helpers
const STONE = 0xffffff, STONE_DARK = 0xa8a298, STONE_TOP = 0x8c867c, SLATE = 0x3e4650, TERRACOTTA = 0x9a4a32;

function merlons(P, poly, y, { h = 0.7, w = 0.6, gap = 0.55, t = 0.45, inset = 0.25, mat = 'stone', col = STONE_DARK } = {}) {
  const n = poly.length;
  for (let i = 0; i < n; i++) {
    const a = poly[i], b = poly[(i + 1) % n];
    const dx = b[0] - a[0], dz = b[1] - a[1];
    const len = Math.hypot(dx, dz);
    const ang = Math.atan2(dx, dz);
    const nx = dz / len, nz = -dx / len; // one normal; pick the one pointing away from centroid
    const cx = (a[0] + b[0]) / 2, cz = (a[1] + b[1]) / 2;
    const s = cx * nx + cz * nz > 0 ? -1 : 1; // inward
    const count = Math.max(1, Math.floor(len / (w + gap)));
    for (let k = 0; k < count; k++) {
      const f = (k + 0.5) / count;
      const x = a[0] + dx * f + nx * s * inset, z = a[1] + dz * f + nz * s * inset;
      P.box(mat, t, h, w, x, y + h / 2, z, col, 0, ang);
    }
  }
}

function roof(P, w, l, h, x, y, z, ry = 0, col = SLATE, mat = 'paint') {
  const b = [[-w / 2, -l / 2], [w / 2, -l / 2], [w / 2, l / 2], [-w / 2, l / 2]];
  const t = [[-0.01, -l / 2 + 0.02], [0.01, -l / 2 + 0.02], [0.01, l / 2 - 0.02], [-0.01, l / 2 - 0.02]];
  P.add(mat, prism(b, 0, t, h, { cap: false, uvScale: 0.5 }), col, M(x, y, z, 0, ry, 0));
}

function coneRoof(P, r, h, x, y, z, seg = 10, mat = 'team', col = 0xffffff) {
  P.add(mat, new THREE.ConeGeometry(r, h, seg, 1), col, M(x, y + h / 2, z));
}

function roundTower(P, x, z, r, y0, y1, { roofH = 0, roofMat = 'team', crenel = true, seg = 10 } = {}) {
  P.add('stone', prism(ngon(seg, r * 1.06, x, z), y0, ngon(seg, r, x, z), y1, { uvScale: 0.14 }), STONE);
  P.add('stone', prism(ngon(seg, r, x, z), y1, ngon(seg, r * 1.12, x, z), y1 + 0.45, { uvScale: 0.14 }), STONE_DARK);
  if (roofH) coneRoof(P, r * 1.18, roofH, x, y1 + 0.45, z, seg, roofMat);
  else if (crenel) merlons(P, ngon(seg, r * 1.12, x, z), y1 + 0.45, { w: 0.45, gap: 0.45, h: 0.6, inset: 0.2 });
  // arrow slits
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * PI * 2 + 0.4;
    P.box('rubber', 0.18, 0.8, 0.1, x + Math.cos(a) * r * 1.01, lerp(y0, y1, 0.55), z + Math.sin(a) * r * 1.01, 0x111111, 0, -a + PI / 2);
  }
}

// Eastern (Crimson Hegemony) architecture: concave pagoda roofs, white plaster, red lacquer.
const LACQUER = 0x8e2418, PLASTER = 0xe6ddcc, TILE = 0x2e343a;
function pagodaRoof(P, w, y, h, cx = 0, cz = 0) {
  const e = chamferRect(w, w, 0.3, cx, cz), m = scalePoly(e, 0.72, 0.72, cx, cz), t = scalePoly(e, 0.26, 0.26, cx, cz);
  P.add('paint', prism(e, y, m, y + h * 0.24, { base: true, uvScale: 0.3 }), TILE);     // flat flared eave
  P.add('paint', prism(m, y + h * 0.24, t, y + h, { uvScale: 0.3 }), TILE);             // steep upper roof
  P.add('team', prism(t, y + h, scalePoly(t, 0.55, 0.55, cx, cz), y + h + 0.3), 0xffffff); // ridge cap in the fleet's colour
  const r = w / 2 - 0.25;                                                                // gilded upswept corner horns
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) P.rod('brass', 0.13, 0.05, [cx + sx * r * 0.92, y + 0.12, cz + sz * r * 0.92], [cx + sx * (r + 0.75), y + 0.95, cz + sz * (r + 0.75)], 0xd9b25a, 5);
}
function pagodaTower(P, x, z, w, y1) {
  P.add('stone', prism(chamferRect(w + 1.0, w + 1.0, 0.3, x, z), 0.4, chamferRect(w, w, 0.3, x, z), y1 - 3.2, { uvScale: 0.14 }), STONE_DARK); // battered base
  const body = chamferRect(w * 0.84, w * 0.84, 0.2, x, z);
  P.add('paint', prism(body, y1 - 3.2, body, y1, { uvScale: 0.2 }), PLASTER);
  for (const [dx, dz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) P.box('paint', 0.3, 3.2, 0.3, x + dx * w * 0.42, y1 - 1.6, z + dz * w * 0.42, LACQUER);
  for (const a of [0, PI / 2, PI, -PI / 2]) P.box('lantern', 0.7, 0.8, 0.1, x + Math.sin(a) * (w * 0.42 + 0.03), y1 - 1.6, z + Math.cos(a) * (w * 0.42 + 0.03), 0xffffff, 0, a); // one lit window per face
  pagodaRoof(P, w * 1.5, y1, 2.6, x, z);
}
function easternKeep(P) {
  const b0 = chamferRect(17, 17, 0.6);
  P.add('stone', prism(b0, 1.6, scalePoly(b0, 0.82), 10, { uvScale: 0.12 }), STONE_DARK); // battered stone base (ishigaki)
  P.add('stone', prism(scalePoly(b0, 0.82), 10, scalePoly(b0, 0.84), 10.4, { uvScale: 0.12 }), STONE_TOP);
  // [body width, y0, y1, roof width, roof height]: four stacked storeys, each under its own flared roof
  const tiers = [[12.6, 10.4, 14.4, 17.4, 4.4], [9.4, 16.0, 19.6, 13.4, 3.6], [6.8, 21.2, 24.4, 10.0, 3.0], [4.6, 25.6, 28.6, 7.4, 3.6]];
  for (const [w, y0, y1, rw, rh] of tiers) {
    const body = chamferRect(w, w, 0.25);
    P.add('paint', prism(body, y0, body, y1, { uvScale: 0.2 }), PLASTER);
    const hw = w / 2;
    for (const [px, pz] of [[hw, hw], [hw, -hw], [-hw, hw], [-hw, -hw], [0, hw], [0, -hw], [hw, 0], [-hw, 0]]) P.box('paint', 0.38, y1 - y0, 0.38, px, (y0 + y1) / 2, pz, LACQUER);
    P.add('paint', prism(scalePoly(body, 1.04), y1 - 0.55, scalePoly(body, 1.04), y1, {}), LACQUER); // lacquered band under the eaves
    for (const a of [0, PI / 2, PI, -PI / 2]) for (const dx of (w > 8 ? [-w * 0.24, w * 0.24] : [0])) {
      const c = Math.cos(a), sn = Math.sin(a);
      P.box('lantern', w > 8 ? 1.1 : 0.8, (y1 - y0) * 0.34, 0.1, sn * (hw + 0.03) + c * dx, (y0 + y1) / 2, c * (hw + 0.03) - sn * dx, 0xffffff, 0, a);
    }
    pagodaRoof(P, rw, y1, rh);
  }
  // hanging war banners on the first storey
  for (const a of [0, PI / 2, PI, -PI / 2]) P.add('team', new THREE.BoxGeometry(2.2, 3.4, 0.08), 0xffffff, M(Math.sin(a) * 6.42, 12.2, Math.cos(a) * 6.42, 0, a, 0));
  // lacquered gun terrace for the battery (pivot at y 24.5, z 4.3)
  P.box('paint', 5.6, 0.45, 3.6, 0, 24.2, 4.6, LACQUER);
  for (const x of [-2.4, 2.4]) P.box('paint', 0.4, 3.4, 0.4, x, 22.5, 6.1, LACQUER);
}

function lampPost(P, x, y, z, h = 2.2) {
  P.rod('iron', 0.07, 0.05, [x, y, z], [x, y + h, z], 0x2a2c30, 6);
  P.add('lantern', new THREE.OctahedronGeometry(0.22, 0), 0xffffff, M(x, y + h + 0.2, z, 0, 0, 0, 1, 1.4, 1));
  P.cyl('iron', 0.02, 0.2, 0.15, x, y + h + 0.5, z, 0x2a2c30, 6);
}

// Weapon variants for a structure (children of the turret pivot).
function weaponVariants(pivot, { z = 0, s = 1 }) {
  const variants = [];
  const mk = (eraMin, eraMax, build) => {
    const g = new THREE.Group();
    g.userData.eraMin = eraMin; g.userData.eraMax = eraMax;
    build(g);
    pivot.add(g);
    variants.push(g);
  };
  mk(1, 2, (g) => {
    const P = new Parts();
    P.cyl('wood', 1.3 * s, 1.35 * s, 0.2 * s, 0, 0.1 * s, z, 0x7a5a40, 16);
    P.box('wood', 0.5 * s, 0.5 * s, 0.5 * s, 0.9 * s, 0.45 * s, z - 0.6 * s, 0x6a4a34);
    P.cyl('wood', 0.2 * s, 0.2 * s, 0.45 * s, -0.95 * s, 0.42 * s, z - 0.5 * s, 0x6a4a34, 8);
    P.build(g);
    turret(g, 0, { style: 'cannon', x: -0.45 * s, y: 0.18 * s, z, w: 0.9 * s, l: 1.0 * s, n: 1, blen: 1.9 * s, br: 0.15 * s });
    turret(g, 0, { style: 'cannon', x: 0.45 * s, y: 0.18 * s, z, w: 0.9 * s, l: 1.0 * s, n: 1, blen: 1.9 * s, br: 0.15 * s });
  });
  mk(3, 3, (g) => {
    const P = new Parts();
    P.cyl('steel', 1.2 * s, 1.3 * s, 0.35 * s, 0, 0.17 * s, z, 0x6a737c, 20);
    P.build(g);
    turret(g, 0, { style: 'battle', x: 0, y: 0.35 * s, z, w: 1.9 * s, l: 2.2 * s, h: 0.85 * s, n: 2, blen: 3.2 * s, br: 0.12 * s, sp: 0.6 * s });
  });
  mk(4, 5, (g) => {
    const P = new Parts();
    P.cyl('steel', 1.2 * s, 1.3 * s, 0.3 * s, 0, 0.15 * s, z, 0x6a737c, 20);
    P.rod('steel', 0.08 * s, 0.06 * s, [0, 0.3 * s, z - 0.9 * s], [0, 2.2 * s, z - 0.9 * s], 0x4a5058, 6);
    P.build(g);
    turret(g, 0, { style: 'missile', x: 0, y: 0.3 * s, z: z + 0.25 * s, w: 1.3 * s, l: 1.3 * s, h: 1.1 * s, n: 3 });
    radar(g, { x: 0, y: 2.2 * s, z: z - 0.9 * s, style: 'bar', size: 1.1 * s, speed: 2.5 });
  });
  return variants;
}

// Bake + clone machinery (shared with ports)
const templates = new Map();
function template(key, fn) {
  if (templates.has(key)) return templates.get(key);
  const root = new THREE.Group();
  const ctx = { root, P: new Parts(), flags: [] };
  const info = fn(ctx);
  ctx.P.build(root);
  clothMesh(root, ctx.flags, 'flag', 'flag');
  const t = { root, info };
  templates.set(key, t);
  return t;
}

function assemble(t, teamId) {
  const root = t.root.clone(true);
  let pivot = null, top = null, beacon = null;
  const spin = [], bob = [], flags = [], variants = [];
  root.traverse((o) => {
    if (o.isMesh) {
      o.material = shipMat(o.userData.mat, teamId);
      if (o.userData.rig === 'flag') flags.push(o);
    }
    const r = o.userData.rig;
    if (r === 'spin') spin.push(o);
    else if (r === 'bob') bob.push(o);
    else if (r === 'top') top = o;
    else if (r === 'beacon') beacon = o;
    else if (r === 'spivot') pivot = o;
    if (o.userData.eraMin) variants.push(o);
  });
  return { root, pivot, top, beacon, spin, bob, flags, variants };
}

function animate(parts, dt, time, phase) {
  pulseMaterials(time);
  for (const o of parts.spin) o.rotation.y += dt * o.userData.speed;
  for (const o of parts.bob) o.position.y = o.userData.baseY + Math.sin(time * 1.3 + phase) * o.userData.amp;
  const w = time * 4 + phase;
  for (const f of parts.flags) { f.morphTargetInfluences[0] = Math.cos(w) * 0.8; f.morphTargetInfluences[1] = -Math.sin(w) * 0.8; }
}

// ---------------------------------------------------------------- outer: fortified lighthouse
function buildOuter(ctx) {
  const { root, P } = ctx;
  islet(P, { R: 13, top: 1.3, flatR: 6.2, seed: 3 });
  // bastion platform
  const oct = ngon(8, 5.6, 0, 0, PI / 8);
  P.add('stone', prism(oct, 0.6, scalePoly(oct, 0.92), 3.4, { uvScale: 0.14 }), STONE);
  P.add('stone', prism(scalePoly(oct, 0.92), 3.4, null, 3.45, { sides: false }), STONE_TOP);
  merlons(P, scalePoly(oct, 0.92), 3.45, { w: 0.7, gap: 0.6 });
  P.add('stone', prism(scalePoly(oct, 1.02), 0.4, scalePoly(oct, 0.98), 1.0, { uvScale: 0.14 }), STONE_DARK);
  // steps to the water (+Z)
  for (let i = 0; i < 5; i++) P.box('stone', 2.2, 0.35, 0.8, 0, 0.9 + i * 0.5, 7.0 - i * 0.5, STONE_DARK);
  P.box('rubber', 1.3, 1.5, 0.1, 0, 2.3, 5.2, 0x151515, 0.12, 0, 0);
  // tower sections with team bands
  const sec = [
    [2.5, 2.2, 3.4, 8.2, 'stone', STONE], [2.2, 2.15, 8.2, 9.4, 'team', 0xffffff], [2.15, 1.9, 9.4, 13.2, 'stone', STONE],
    [1.9, 1.86, 13.2, 14.4, 'team', 0xffffff], [1.86, 1.75, 14.4, 15.5, 'stone', STONE],
  ];
  for (const [r0, r1, y0, y1, m, c] of sec) P.add(m, prism(ngon(8, r0, 0, 0, PI / 8), y0, ngon(8, r1, 0, 0, PI / 8), y1, { cap: false, uvScale: 0.14 }), c);
  for (const y of [5.5, 11.2]) for (const a of [0.4, 2.2, 4.0]) P.box('rubber', 0.25, 0.8, 0.1, Math.cos(a) * 2.28 - (y > 10 ? Math.cos(a) * 0.2 : 0), y, Math.sin(a) * 2.28 - (y > 10 ? Math.sin(a) * 0.2 : 0), 0x111111, 0, -a + PI / 2);
  // corbelled gallery
  P.add('stone', prism(ngon(8, 1.75, 0, 0, PI / 8), 15.5, ngon(8, 2.9, 0, 0, PI / 8), 16.2, { uvScale: 0.14 }), STONE_DARK);
  const gal = ngon(16, 2.85);
  for (let i = 0; i < gal.length; i++) {
    const a = gal[i], b = gal[(i + 1) % gal.length];
    P.rod('iron', 0.05, 0.05, [a[0], 16.85, a[1]], [b[0], 16.85, b[1]], 0x2a2c30, 4);
    P.rod('iron', 0.04, 0.04, [a[0], 16.2, a[1]], [a[0], 16.85, a[1]], 0x2a2c30, 4);
  }
  // lamp room + roof
  P.add('iron', prism(ngon(8, 1.1, 0, 0, PI / 8), 16.2, null, 16.6), 0x30343a);
  P.add('lantern', prism(ngon(8, 0.98, 0, 0, PI / 8), 16.6, null, 18.1, { cap: false }), 0xffffff);
  for (const p of ngon(8, 1.0, 0, 0, PI / 8)) P.rod('iron', 0.05, 0.05, [p[0], 16.6, p[1]], [p[0], 18.1, p[1]], 0x2a2c30, 4);
  if (ctx.team === 1) pagodaRoof(P, 3.3, 18.1, 1.5); // Crimson lighthouse wears a pagoda cap
  else P.add('iron', prism(ngon(8, 1.25, 0, 0, PI / 8), 18.1, ngon(8, 0.15, 0, 0, PI / 8), 19.5), 0x3e5a4e);
  P.sphere('brass', 0.22, 0, 19.7, 0, 0xffffff, 10, 6);
  P.rod('iron', 0.03, 0.03, [0, 19.8, 0], [0, 20.8, 0], 0x2a2c30, 4);
  // rotating lamp: bright core + two light beams
  const lamp = new THREE.Group();
  lamp.position.set(0, 17.35, 0);
  lamp.userData.rig = 'spin'; lamp.userData.speed = 1.1;
  const LP = new Parts();
  LP.add('lamp', new THREE.OctahedronGeometry(0.42, 1), 0xffffff);
  for (const s of [-1, 1]) {
    const cone = new THREE.CylinderGeometry(0.25, 1.5, 9, 16, 1, true);
    cone.translate(0, 4.9, 0);
    LP.add('lightBeam', cone, 0xffffff, M(0, 0, 0, s * PI / 2, 0, 0));
  }
  LP.build(lamp, { cast: false, receive: false });
  root.add(lamp);
  // turret battery on the gallery (rotates around the lamp room)
  const pivot = new THREE.Object3D();
  pivot.position.set(0, 16.2, 0);
  pivot.userData.rig = 'spivot';
  root.add(pivot);
  weaponVariants(pivot, { z: 1.95, s: 0.85 });
  // lanterns on the bastion
  for (const a of [PI / 8 + PI / 2, PI / 8 + PI]) lampPost(P, Math.cos(a) * 4.4, 3.45, Math.sin(a) * 4.4, 1.4);
  // flag
  P.rod('iron', 0.06, 0.05, [3.6, 3.45, -3.6], [3.6, 9.5, -3.6], 0x2a2c30, 6);
  ctx.flags.push(flagGeo(3.6, 9.4, -3.65, 2.4, 1.5, 0, 0.14));
  markerAt(root, 'beacon', 0, 17.35, 0);
  markerAt(root, 'top', 0, 22.5, 0);
  return { height: 22 };
}

// ---------------------------------------------------------------- inner: coastal fortress
function buildInner(ctx) {
  const { root, P } = ctx;
  islet(P, { R: 15, top: 1.3, flatR: 8.8, seed: 7 });
  // hexagonal star fort
  const star = [];
  for (let i = 0; i < 12; i++) { const a = (i / 12) * PI * 2 + PI / 12; star.push([Math.cos(a) * (i % 2 ? 6.6 : 8.9), Math.sin(a) * (i % 2 ? 6.6 : 8.9)]); }
  P.add('stone', prism(star, 0.5, scalePoly(star, 0.94), 5.4, { uvScale: 0.14 }), STONE);
  P.add('stone', prism(scalePoly(star, 0.94), 5.4, null, 5.45, { sides: false }), STONE_TOP);
  P.add('stone', prism(scalePoly(star, 1.03), 0.3, scalePoly(star, 1.0), 1.2, { uvScale: 0.14 }), STONE_DARK);
  merlons(P, scalePoly(star, 0.94), 5.45, { w: 0.7, gap: 0.6 });
  // gate (+Z) + steps
  P.box('rubber', 2.0, 2.4, 0.2, 0, 2.2, 6.25, 0x141414, 0.08);
  P.box('team', 2.1, 0.5, 0.25, 0, 3.7, 6.3, 0xffffff, 0.08);
  for (let i = 0; i < 4; i++) P.box('stone', 3.0, 0.35, 0.8, 0, 0.7 + i * 0.35, 8.6 - i * 0.7, STONE_DARK);
  // keep
  const kp = chamferRect(6.6, 6.6, 0.3);
  P.add('stone', prism(kp, 5.4, scalePoly(kp, 0.93), 15, { uvScale: 0.14 }), STONE);
  P.add('stone', prism(scalePoly(kp, 0.93), 15, scalePoly(kp, 1.0), 15.5, { uvScale: 0.14 }), STONE_DARK);
  // banners on the keep faces
  for (const [x, z, ry] of [[0, 3.3, 0], [0, -3.3, PI], [3.3, 0, PI / 2], [-3.3, 0, -PI / 2]]) {
    const g = new THREE.BoxGeometry(1.5, 4.2, 0.06);
    P.add('team', g, 0xffffff, M(x * 1.0, 11.2, z * 1.0, -0.035, ry, 0));
    P.add('brass', new THREE.CylinderGeometry(0.05, 0.05, 1.8, 6), 0xffffff, M(x * 1.02, 13.35, z * 1.02, 0, ry, PI / 2));
  }
  for (const [x, z] of [[1.6, 3.2], [-1.6, 3.2], [3.2, -1.6], [-3.2, 1.6]]) P.box('rubber', 0.3, 1.0, 0.1, x, 8, z, 0x111111, 0, Math.abs(x) > 3 ? PI / 2 : 0);
  // corner towers with team roofs
  for (const [x, z] of [[3.3, 3.3], [-3.3, 3.3], [3.3, -3.3], [-3.3, -3.3]]) {
    if (ctx.team === 1) { roundTower(P, x, z, 1.25, 5.4, 16.8, { crenel: false }); pagodaRoof(P, 3.4, 17.25, 1.7, x, z); } // Crimson: pagoda caps
    else roundTower(P, x, z, 1.25, 5.4, 16.8, { roofH: 2.8 });
  }
  // bastion point towers (smaller, crenellated)
  for (let i = 0; i < 12; i += 2) roundTower(P, star[i][0] * 0.93, star[i][1] * 0.93, 0.9, 5.4, 7.0, { crenel: true, seg: 8 });
  // upper tower
  const up = chamferRect(4.4, 4.4, 0.25);
  P.add('stone', prism(up, 15.5, scalePoly(up, 0.96), 20.5, { uvScale: 0.14 }), STONE);
  P.add('stone', prism(scalePoly(up, 0.96), 20.5, scalePoly(up, 1.06), 21.0, { uvScale: 0.14 }), STONE_DARK);
  merlons(P, scalePoly(up, 1.06), 21.0, { w: 0.55, gap: 0.5, h: 0.6 });
  for (const [x, z] of [[0, 2.15], [0, -2.15], [2.15, 0], [-2.15, 0]]) P.box('rubber', 0.3, 1.1, 0.1, x, 18.2, z, 0x111111, 0, Math.abs(x) > 1 ? PI / 2 : 0);
  // courtyard buildings
  for (const [x, z, ry] of [[-5.4, 0.3, PI / 6], [5.2, 0.8, -PI / 6], [0.4, -5.4, PI / 2]]) {
    P.add('stone', block(1.8, 2.8, 5.4, 6.6, 0.05, 0, 0, 0, { uvScale: 0.14 }), STONE_DARK, M(x, 0, z, 0, ry));
    roof(P, 2.1, 3.0, 1.0, x, 6.6, z, ry, TERRACOTTA);
  }
  // flag on a corner tower
  P.rod('iron', 0.06, 0.05, [-3.3, 19.6, -3.3], [-3.3, 24.2, -3.3], 0x2a2c30, 6);
  ctx.flags.push(flagGeo(-3.3, 24.1, -3.35, 2.6, 1.6, 0, 0.14));
  // weapon on the upper tower roof
  const pivot = new THREE.Object3D();
  pivot.position.set(0, 21.0, 0);
  pivot.userData.rig = 'spivot';
  root.add(pivot);
  weaponVariants(pivot, { z: 0, s: 1.0 });
  // braziers (warm lights) on the walls
  for (let i = 1; i < 12; i += 3) lampPost(P, star[i][0] * 0.9, 5.45, star[i][1] * 0.9, 1.2);
  const br = new THREE.Object3D();
  markerAt(root, 'beacon', -3.3, 24.2, -3.3);
  markerAt(root, 'top', 0, 26.5, 0);
  return { height: 26 };
}

// ---------------------------------------------------------------- citadel
function buildCitadel(ctx) {
  const { root, P } = ctx;
  islet(P, { R: 30, top: 1.5, flatR: 23.5, seed: 11, rough: 1.3 });
  // curtain walls between 8 bastion towers
  const NB = 8, RB = 21;
  const bast = [];
  for (let i = 0; i < NB; i++) { const a = (i / NB) * PI * 2 + PI / 8; bast.push([Math.cos(a) * RB, Math.sin(a) * RB]); }
  for (let i = 0; i < NB; i++) {
    const a = bast[i], b = bast[(i + 1) % NB];
    const dx = b[0] - a[0], dz = b[1] - a[1], len = Math.hypot(dx, dz);
    const ang = Math.atan2(dx, dz);
    const cx = (a[0] + b[0]) / 2, cz = (a[1] + b[1]) / 2;
    const seg = [[-1.4, -len / 2], [1.4, -len / 2], [1.4, len / 2], [-1.4, len / 2]];
    const segT = [[-1.1, -len / 2], [1.1, -len / 2], [1.1, len / 2], [-1.1, len / 2]];
    P.add('stone', prism(seg, 0.5, segT, 8.0, { uvScale: 0.12 }), STONE, M(cx, 0, cz, 0, ang));
    P.add('stone', prism(segT, 8.0, null, 8.05, { sides: false }), STONE_TOP, M(cx, 0, cz, 0, ang));
    // crenellations on the outer edge
    const nx = cx / Math.hypot(cx, cz), nz = cz / Math.hypot(cx, cz);
    const count = Math.floor(len / 1.3);
    for (let k = 0; k < count; k++) {
      const f = (k + 0.5) / count - 0.5;
      const x = cx + dx * f + nx * 0.85, z = cz + dz * f + nz * 0.85;
      P.box('stone', 0.5, 0.8, 0.7, x, 8.45, z, STONE_DARK, 0, ang);
    }
  }
  for (let i = 0; i < NB; i++) {
    const [x, z] = bast[i];
    const isGate = i === 1 || i === 2; // flank +Z
    if (ctx.team === 1) pagodaTower(P, x, z, 5.4, isGate ? 12.5 : 10.5);
    else roundTower(P, x, z, 3.0, 0.4, isGate ? 12.5 : 10.5, { roofH: 4.2, seg: 12 });
    lampPost(P, x * 0.86, 8.05, z * 0.86, 1.3);
  }
  // gatehouse (+Z)
  P.add('stone', block(7, 4, 0.5, 11, 0.4, 0.2, 0, RB * Math.cos(PI / 8) + 0.4, { uvScale: 0.12 }), STONE);
  P.box('rubber', 3.2, 4.5, 0.2, 0, 2.8, RB * Math.cos(PI / 8) + 2.45, 0x121212);
  P.box('team', 4.4, 1.1, 0.25, 0, 5.8, RB * Math.cos(PI / 8) + 2.45, 0xffffff);
  merlons(P, chamferRect(7.2, 4.2, 0.4, 0, RB * Math.cos(PI / 8) + 0.4), 11, { w: 0.6, gap: 0.6 });
  // harbour quay (+Z)
  const qz0 = RB + 2, qz1 = 36;
  P.add('stone', prism(chamferRect(8, qz1 - qz0, 0.6, 0, (qz0 + qz1) / 2), -1.5, null, 1.3, { uvScale: 0.12 }), STONE_DARK);
  for (let z = qz0 + 2; z < qz1; z += 3.5) for (const x of [-3.6, 3.6]) {
    P.cyl('iron', 0.2, 0.25, 0.5, x, 1.55, z, 0x2a2c30, 8);
  }
  for (const x of [-3.4, 3.4]) lampPost(P, x, 1.3, qz1 - 1, 2.6);
  // inner ward paving
  P.add('stone', prism(ngon(24, 19.5), 1.2, ngon(24, 19.2), 1.8, { uvScale: 0.12 }), STONE_TOP);
  // houses in the ward
  const hs = [[-11, 6, 0.3], [-13, -4, 1.2], [11, 7, -0.4], [13, -3, 2.0], [-6, -13, 0.8], [6, -13, -0.7], [-8, 12, 0.2], [8, 12, -0.3]];
  hs.forEach(([x, z, ry], i) => {
    P.add('stone', block(3.2, 4.4, 1.8, 3.9, 0.05, 0, 0, 0, { uvScale: 0.14 }), i % 2 ? STONE : STONE_DARK, M(x, 0, z, 0, ry));
    roof(P, 3.6, 4.6, 1.8, x, 3.9, z, ry, i % 3 ? SLATE : TERRACOTTA);
  });
  if (ctx.team === 1) easternKeep(P);
  else {
    // tiered keep
    const t1 = chamferRect(16, 16, 1.2);
    P.add('stone', prism(t1, 1.8, scalePoly(t1, 0.94), 14, { uvScale: 0.12 }), STONE);
    P.add('stone', prism(scalePoly(t1, 0.94), 14, scalePoly(t1, 0.98), 14.6, { uvScale: 0.12 }), STONE_DARK);
    merlons(P, scalePoly(t1, 0.98), 14.6, { w: 0.8, gap: 0.8, h: 0.8 });
    for (const [x, z] of [[7.4, 7.4], [-7.4, 7.4], [7.4, -7.4], [-7.4, -7.4]]) roundTower(P, x, z, 1.8, 13, 19.5, { roofH: 3.2 });
    const t2 = chamferRect(11, 11, 0.9);
    P.add('stone', prism(t2, 14.5, scalePoly(t2, 0.95), 24, { uvScale: 0.12 }), STONE);
    P.add('stone', prism(scalePoly(t2, 0.95), 24, scalePoly(t2, 1.0), 24.5, { uvScale: 0.12 }), STONE_DARK);
    merlons(P, scalePoly(t2, 1.0), 24.5, { w: 0.7, gap: 0.7, h: 0.7 });
    const t3 = chamferRect(7, 7, 0.7);
    P.add('stone', prism(t3, 24.4, scalePoly(t3, 0.94), 32, { uvScale: 0.12 }), STONE);
    P.add('stone', prism(scalePoly(t3, 0.94), 32, scalePoly(t3, 1.05), 32.6, { uvScale: 0.12 }), STONE_DARK);
    // big team banners on tier 1 + 2
    for (const [r, y, h, w] of [[8.0, 9.5, 6, 2.6], [5.5, 20, 5, 2.0]]) for (const a of [0, PI / 2, PI, -PI / 2]) {
      P.add('team', new THREE.BoxGeometry(w, h, 0.08), 0xffffff, M(Math.sin(a) * r * 0.985, y, Math.cos(a) * r * 0.985, -0.03, a, 0));
    }
    // windows (warm)
    for (const a of [0, PI / 2, PI, -PI / 2]) for (const dx of [-2.2, 2.2]) {
      const c = Math.cos(a), s = Math.sin(a);
      P.box('lantern', 0.5, 1.3, 0.1, s * 3.35 + c * dx * 0.7, 28, c * 3.35 - s * dx * 0.7, 0xffffff, 0, a);
    }
  }
  // crystal pedestal
  P.add('stone', prism(ngon(8, 2.8, 0, 0, PI / 8), 32.6, ngon(8, 1.8, 0, 0, PI / 8), 35, { uvScale: 0.14 }), STONE_DARK);
  P.add('teamMetal', prism(ngon(8, 1.9, 0, 0, PI / 8), 35, ngon(8, 2.2, 0, 0, PI / 8), 35.6), 0xffffff);
  for (let i = 0; i < 4; i++) {
    const a = i * PI / 2 + PI / 4;
    P.rod('brass', 0.18, 0.08, [Math.cos(a) * 2.0, 35.4, Math.sin(a) * 2.0], [Math.cos(a) * 1.2, 39.5, Math.sin(a) * 1.2], 0xffffff, 6);
  }
  // beacon crystal (bobbing + spinning) with halo rings + light column
  const crystal = new THREE.Group();
  crystal.position.set(0, 40.5, 0);
  crystal.userData.rig = 'bob'; crystal.userData.baseY = 40.5; crystal.userData.amp = 0.5;
  const spinC = new THREE.Group(); spinC.userData.rig = 'spin'; spinC.userData.speed = 0.5;
  crystal.add(spinC);
  const CP = new Parts();
  const oct = new THREE.OctahedronGeometry(1, 0);
  CP.add('teamGlow', oct, 0xffffff, M(0, 0, 0, 0, 0, 0, 2.3, 4.6, 2.3));
  for (let i = 0; i < 4; i++) {
    const a = i * PI / 2;
    CP.add('teamGlow', new THREE.OctahedronGeometry(1, 0), 0xffffff, M(Math.cos(a) * 3.2, -1.5, Math.sin(a) * 3.2, 0, a, 0.3, 0.5, 1.3, 0.5));
  }
  CP.build(spinC, { cast: false });
  const ringG = new THREE.Group(); ringG.userData.rig = 'spin'; ringG.userData.speed = -0.9;
  crystal.add(ringG);
  const RP = new Parts();
  RP.add('teamPulse', new THREE.TorusGeometry(4.2, 0.14, 6, 48), 0xffffff, M(0, 0, 0, PI / 2 + 0.2, 0, 0));
  RP.add('teamPulse', new THREE.TorusGeometry(3.4, 0.1, 6, 40), 0xffffff, M(0, 0.6, 0, PI / 2 - 0.3, 0.8, 0));
  RP.build(ringG, { cast: false });
  root.add(crystal);
  const BP = new Parts();
  BP.add('teamBeam', new THREE.CylinderGeometry(1.0, 1.6, 36, 16, 1, true), 0xffffff, M(0, 40.5 + 18, 0));
  BP.build(root, { cast: false, receive: false });
  // flags on the gate towers
  for (const i of [1, 2]) {
    const [x, z] = bast[i];
    P.rod('iron', 0.08, 0.06, [x, 16.5, z], [x, 21.5, z], 0x2a2c30, 6);
    ctx.flags.push(flagGeo(x, 21.4, z - 0.05, 3.2, 2.0, 0, 0.14));
  }
  // weapon platform on the tier-2 roof, facing +Z in front of tier 3
  const pivot = new THREE.Object3D();
  pivot.position.set(0, 24.5, 0);
  pivot.userData.rig = 'spivot';
  root.add(pivot);
  weaponVariants(pivot, { z: 4.3 / 1.5, s: 1.5 });
  markerAt(root, 'beacon', 0, 40.5, 0);
  markerAt(root, 'top', 0, 48, 0);
  return { height: 46 };
}

const STRUCT_BUILDERS = { outer: buildOuter, inner: buildInner, citadel: buildCitadel };

export function buildStructure(kind = 'outer', teamId = 0) {
  const fn = STRUCT_BUILDERS[kind] || buildOuter;
  // forts are per-faction architecture (Azure: European stone; Crimson: pagoda castles)
  const t = template('struct:' + kind + ':' + teamId, (ctx) => { ctx.team = teamId; return fn(ctx); });
  const parts = assemble(t, teamId);
  const muzzles = [];
  const turretRig = { pivot: parts.pivot, muzzles };
  let era = 0;
  const phase = Math.random() * 10;
  const rig = {
    root: parts.root,
    turret: turretRig,
    top: parts.top,
    beacon: parts.beacon,
    era: 1,
    setEra(e) {
      e = clamp(Math.round(e) || 1, 1, 5);
      if (e === era) return;
      era = e; rig.era = e;
      muzzles.length = 0;
      for (const v of parts.variants) {
        const on = e >= v.userData.eraMin && e <= v.userData.eraMax;
        v.visible = on;
        if (on) v.traverse((o) => { if (o.userData.rig === 'muzzle') muzzles.push(o); });
      }
    },
    update(dt, time) { animate(parts, dt, time, phase); },
  };
  rig.setEra(1);
  rig.update(0, 0);
  return rig;
}

// ---------------------------------------------------------------- port
function buildPortTemplate(ctx) {
  const { root, P } = ctx;
  islet(P, { R: 18, top: 1.2, flatR: 10.5, seed: 17, rough: 0.8 });
  // stone quay edge + wooden pier to +Z
  P.add('stone', prism(chamferRect(9, 3, 0.4, 2.5, 10.5), -1.5, null, 1.35, { uvScale: 0.14 }), STONE_DARK);
  const pier = (x0, x1, z0, z1) => {
    const w = x1 - x0, l = z1 - z0;
    P.add('teak', prism(chamferRect(w, l, 0.05, (x0 + x1) / 2, (z0 + z1) / 2), 1.05, null, 1.3, { uvScale: 0.35 }), 0xb09070);
    for (let z = z0 + 0.6; z < z1; z += 2.0) for (const x of [x0 + 0.25, x1 - 0.25]) P.cyl('wood', 0.2, 0.22, 3.4, x, -0.6, z, 0x5a4030, 8);
    for (const x of [x0 + 0.1, x1 - 0.1]) P.box('wood', 0.16, 0.2, l, x, 1.38, (z0 + z1) / 2, 0x5a4030);
  };
  pier(1.0, 4.2, 11.5, 25);
  pier(-5.0, 1.0, 21.8, 24.6);
  // mooring bollards + lamps
  for (const z of [14, 18, 22]) P.cyl('iron', 0.15, 0.18, 0.4, 4.0, 1.5, z, 0x2a2c30, 8);
  lampPost(P, 4.0, 1.3, 24.6, 2.4); lampPost(P, -4.6, 1.3, 24.2, 2.4); lampPost(P, 1.2, 1.3, 11.8, 2.4);
  // warehouses
  const wh = (x, z, ry, w, l, h, roofCol) => {
    P.add('stone', block(w, l, 1.0, 1.0 + h * 0.45, 0.05, 0, 0, 0, { uvScale: 0.16 }), STONE_DARK, M(x, 0, z, 0, ry));
    P.add('wood', block(w * 0.98, l * 0.98, 1.0 + h * 0.45, 1.0 + h, 0.05, 0, 0, 0, { cap: false, uvScale: 0.25 }), 0x9a7858, M(x, 0, z, 0, ry));
    roof(P, w + 0.4, l + 0.4, h * 0.45, x, 1.0 + h, z, ry, roofCol);
    P.add('rubber', new THREE.BoxGeometry(w * 0.4, h * 0.55, 0.1), 0x1a1410, M(x, 0, z, 0, ry).multiply(M(0, 1.0 + h * 0.3, l / 2 + 0.02)));
  };
  wh(-5.2, -2.5, 0.1, 5.2, 7.5, 3.4, TERRACOTTA);
  wh(-5.8, 6.2, -0.15, 4.2, 5.0, 3.0, SLATE);
  wh(3.8, -6.2, 0.35, 4.6, 5.6, 3.2, TERRACOTTA);
  // crane (painted steel) at the pier root
  const cx = 2.6, cz = 13.8, cy = 1.3;
  const Y = 0xc7982a;
  for (const [dx, dz] of [[-0.9, -0.9], [0.9, -0.9], [-0.9, 0.9], [0.9, 0.9]]) P.rod('paint', 0.12, 0.1, [cx + dx * 1.2, cy, cz + dz * 1.2], [cx + dx * 0.5, cy + 4.5, cz + dz * 0.5], Y, 6);
  for (const y of [1.5, 3.0]) {
    const f = 1 - y / 4.5 * 0.58;
    const r = 1.08 * f;
    P.rod('paint', 0.06, 0.06, [cx - r, cy + y, cz - r], [cx + r, cy + y, cz + r], Y, 4);
    P.rod('paint', 0.06, 0.06, [cx + r, cy + y, cz - r], [cx - r, cy + y, cz + r], Y, 4);
  }
  P.add('paint', block(1.6, 1.8, cy + 4.5, cy + 5.8, 0.15, 0.05, cx, cz), Y);
  P.add('glass', block(1.62, 0.5, cy + 5.0, cy + 5.5, 0.1, 0, cx, cz + 0.7, { cap: false }), 0xffffff);
  P.box('paint', 1.2, 0.8, 1.0, cx, cy + 5.2, cz - 1.3, 0x5a5a5a);
  const jt = [cx + 0.0, cy + 9.5, cz + 7.5];
  P.rod('paint', 0.16, 0.1, [cx - 0.35, cy + 5.6, cz + 0.6], jt, Y, 6);
  P.rod('paint', 0.16, 0.1, [cx + 0.35, cy + 5.6, cz + 0.6], jt, Y, 6);
  P.rod('paint', 0.06, 0.06, [cx, cy + 7.0, cz], jt, Y, 4);
  P.rod('paint', 0.1, 0.1, [cx, cy + 5.8, cz], [cx, cy + 7.1, cz], Y, 6);
  P.rod('rubber', 0.025, 0.025, jt, [jt[0], cy + 2.4, jt[2]], 0x151515, 3);
  P.box('iron', 0.35, 0.35, 0.35, jt[0], cy + 2.2, jt[2], 0x2a2c30);
  P.box('wood', 1.3, 0.9, 1.3, jt[0], cy + 1.5, jt[2], 0x8a6a48);
  // cargo: crates + barrels
  const r = (i, k) => (Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1;
  for (let i = 0; i < 14; i++) {
    const x = -1.5 + Math.abs(r(i, 1)) * 5, z = 3 + Math.abs(r(i, 2)) * 6.5;
    const s = 0.7 + Math.abs(r(i, 3)) * 0.5;
    if (i % 3) P.box('wood', s, s, s, x, 1.25 + s / 2, z, i % 2 ? 0x9a7650 : 0x7a5a3a, 0, r(i, 4) * 3);
    else P.cyl('wood', 0.35, 0.35, 0.9, x, 1.7, z, 0x6a4a30, 10);
  }
  // cannon emplacement + small watch tower
  roundTower(P, 7.5, 3.5, 1.3, 1.0, 5.2, { roofH: 1.8, roofMat: 'paint', seg: 8 });
  // central flag pole with the ownership flag
  P.cyl('stone', 0.8, 1.0, 0.6, 0, 1.5, 1.5, STONE_DARK, 10);
  P.rod('iron', 0.1, 0.07, [0, 1.6, 1.5], [0, 11.5, 1.5], 0xd8d8d8, 8);
  P.sphere('brass', 0.18, 0, 11.6, 1.5, 0xffffff, 8, 6);
  ctx.flags.push(flagGeo(0, 11.4, 1.45, 3.6, 2.2, 0, 0.13));
  markerAt(root, 'top', 0, 13, 1.5);
  return { height: 12 };
}

export function buildPort() {
  const t = template('port', buildPortTemplate);
  const parts = assemble(t, -1);
  const phase = Math.random() * 10;
  let owner = null;
  const rig = {
    root: parts.root,
    top: parts.top,
    owner: -1,
    setOwner(teamId) {
      const o = teamId != null && teamId >= 0 ? teamId : -1;
      if (o === owner) return;
      owner = o; rig.owner = o;
      for (const f of parts.flags) f.material = o >= 0 ? shipMat('flag', o) : shipMat('flagNeutral', -1);
    },
    update(dt, time) { animate(parts, dt, time, phase); },
  };
  rig.setOwner(-1);
  rig.update(0, 0);
  return rig;
}
