// Procedural hero + creep ship models.
//
//   buildHeroShip(hullId, teamId)       -> ShipRig
//   buildCreepShip(era, heavy, teamId)  -> ShipRig
//
// Every hull is built ONCE into a template (geometry merged per material, with
// material *names* on the meshes). Each build clones the template (sharing
// geometry) and assigns the cached team materials, so repeated builds are cheap.
//
// Conventions: origin = waterline centre, +Z = bow, +Y = up, starboard = -X,
// port = +X. Turret barrels point +Z at pivot.rotation.y = 0.
//
// The geometry kit (Parts, prism, loft hull ...) is exported at the bottom for
// reuse by structureModels.js / smallModels.js.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { patchMaterial, getMat, pulseMaterials } from './materials.js';

const V3 = THREE.Vector3;
const PI = Math.PI;
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const lerp = (a, b, t) => a + (b - a) * t;
function sst(a, b, x) { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }

// ===========================================================================
// Geometry kit
// ===========================================================================
const _c = new THREE.Color();
const PLACEHOLDER = new THREE.MeshBasicMaterial({ color: 0xff00ff });

export function M(x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = sx, sz = sx) {
  return new THREE.Matrix4().compose(
    new V3(x, y, z),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ')),
    new V3(sx, sy, sz),
  );
}

// Normalise any geometry to non-indexed position/normal/uv/color so it can be merged.
export function prep(geo, color = 0xffffff) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal' && k !== 'uv') g.deleteAttribute(k);
  g.morphAttributes = {};
  g.morphTargetsRelative = false;
  g.clearGroups();
  if (!g.attributes.normal) g.computeVertexNormals();
  const n = g.attributes.position.count;
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n * 2), 2));
  _c.set(color);
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { col[i * 3] = _c.r; col[i * 3 + 1] = _c.g; col[i * 3 + 2] = _c.b; }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return g;
}

// Mirror a (non-indexed) geometry across X, fixing winding + normals.
export function mirrorX(geo) {
  const g = geo.clone();
  const p = g.attributes.position.array, nm = g.attributes.normal.array;
  for (let i = 0; i < p.length; i += 3) { p[i] = -p[i]; nm[i] = -nm[i]; }
  // swap vertex 1 and 2 of every triangle
  for (const key of Object.keys(g.attributes)) {
    const a = g.attributes[key], s = a.itemSize, arr = a.array;
    for (let t = 0; t < a.count; t += 3) {
      for (let k = 0; k < s; k++) {
        const i1 = (t + 1) * s + k, i2 = (t + 2) * s + k;
        const tmp = arr[i1]; arr[i1] = arr[i2]; arr[i2] = tmp;
      }
    }
  }
  return g;
}

export class Parts {
  constructor() { this.map = new Map(); }
  add(mat, geo, color = 0xffffff, matrix = null) {
    const g = prep(geo, color);
    if (matrix) g.applyMatrix4(matrix);
    if (!this.map.has(mat)) this.map.set(mat, []);
    this.map.get(mat).push(g);
    return g;
  }
  addRaw(mat, g) { // already prepped
    if (!this.map.has(mat)) this.map.set(mat, []);
    this.map.get(mat).push(g);
  }
  addMirrored(mat, geo, color, matrix) {
    const g = this.add(mat, geo, color, matrix);
    this.addRaw(mat, mirrorX(g));
  }
  box(mat, w, h, d, x, y, z, color, rx = 0, ry = 0, rz = 0) {
    return this.add(mat, new THREE.BoxGeometry(w, h, d), color, M(x, y, z, rx, ry, rz));
  }
  rbox(mat, w, h, d, r, x, y, z, color, rx = 0, ry = 0, rz = 0) {
    return this.add(mat, new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2, h / 2, d / 2) * 0.999), color, M(x, y, z, rx, ry, rz));
  }
  cyl(mat, rt, rb, h, x, y, z, color, seg = 12, rx = 0, ry = 0, rz = 0, open = false) {
    return this.add(mat, new THREE.CylinderGeometry(rt, rb, h, seg, 1, open), color, M(x, y, z, rx, ry, rz));
  }
  rod(mat, r0, r1, a, b, color, seg = 8) { return this.add(mat, rodGeo(r0, r1, a, b, seg), color); }
  sphere(mat, r, x, y, z, color, ws = 12, hs = 8, sx = 1, sy = sx, sz = sx) {
    return this.add(mat, new THREE.SphereGeometry(r, ws, hs), color, M(x, y, z, 0, 0, 0, sx, sy, sz));
  }
  // Build one mesh per material into `group`.
  build(group, { cast = true, receive = true } = {}) {
    const meshes = [];
    for (const [mat, list] of this.map) {
      const geo = safeMerge(list, mat);
      if (!geo) continue;
      geo.computeBoundingSphere();
      geo.computeBoundingBox();
      const mesh = new THREE.Mesh(geo, PLACEHOLDER);
      mesh.userData.mat = mat;
      mesh.castShadow = cast && !/Glow|Pulse|lantern|lamp|furnace|Beam|nav/.test(mat);
      mesh.receiveShadow = receive;
      mesh.name = mat;
      group.add(mesh);
      meshes.push(mesh);
    }
    this.map.clear();
    return meshes;
  }
}

// Merge prepped parts; if three refuses (attribute mismatch), re-normalise every
// part and retry, logging the offender, and finally drop bad parts instead of throwing.
const REQ = ['position', 'normal', 'uv', 'color'];
function normalisePart(g) {
  let h = g.index ? g.toNonIndexed() : g;
  for (const k of Object.keys(h.attributes)) if (!REQ.includes(k)) h.deleteAttribute(k);
  if (!h.attributes.normal) h.computeVertexNormals();
  const n = h.attributes.position.count;
  if (!h.attributes.uv) h.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n * 2), 2));
  if (!h.attributes.color) h.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(n * 3).fill(1), 3));
  for (const k of REQ) {
    const a = h.attributes[k];
    if (a.isInterleavedBufferAttribute || a.normalized || !(a.array instanceof Float32Array)) {
      const arr = new Float32Array(a.count * a.itemSize);
      for (let i = 0; i < a.count; i++) for (let c = 0; c < a.itemSize; c++) arr[i * a.itemSize + c] = a.getComponent(i, c);
      h.setAttribute(k, new THREE.Float32BufferAttribute(arr, a.itemSize));
    }
  }
  h.morphAttributes = {};
  h.morphTargetsRelative = false;
  h.clearGroups();
  return h;
}
function safeMerge(list, label) {
  if (list.length === 1) return normalisePart(list[0]);
  let geo = mergeGeometries(list, false);
  if (geo) return geo;
  const fixed = list.map(normalisePart);
  geo = mergeGeometries(fixed, false);
  if (geo) { console.warn('[models] merge needed normalisation for material', label); return geo; }
  const ok = [];
  fixed.forEach((g, i) => {
    if (ok.length && !mergeGeometries([ok[0], g], false)) console.warn('[models] dropping mismatching part', i, 'of', label, Object.keys(g.attributes));
    else ok.push(g);
  });
  return ok.length ? (ok.length === 1 ? ok[0] : mergeGeometries(ok, false)) : null;
}

// Cylinder between two points (radius r0 at a, r1 at b).
const _up = new V3(0, 1, 0);
export function rodGeo(r0, r1, a, b, seg = 8) {
  const A = new V3(...a), B = new V3(...b);
  const d = B.clone().sub(A);
  const len = d.length();
  const g = new THREE.CylinderGeometry(r1, r0, len, seg, 1, false);
  const q = new THREE.Quaternion().setFromUnitVectors(_up, d.normalize());
  g.applyMatrix4(new THREE.Matrix4().compose(A.clone().add(B).multiplyScalar(0.5), q, new V3(1, 1, 1)));
  return g;
}

// Build a non-indexed triangle soup with flat normals from a list of triangles.
class Soup {
  constructor() { this.p = []; this.n = []; this.uv = []; }
  tri(a, b, c, want, uvs) {
    const ab = new V3().subVectors(b, a), ac = new V3().subVectors(c, a);
    const n = new V3().crossVectors(ab, ac);
    if (n.lengthSq() < 1e-14) return;
    n.normalize();
    if (want && n.dot(want) < 0) { const t = b; b = c; c = t; n.negate(); if (uvs) uvs = [uvs[0], uvs[2], uvs[1]]; }
    for (const v of [a, b, c]) { this.p.push(v.x, v.y, v.z); this.n.push(n.x, n.y, n.z); }
    if (uvs) for (const u of uvs) this.uv.push(u[0], u[1]);
    else this.uv.push(a.x * 0.25, a.z * 0.25, b.x * 0.25, b.z * 0.25, c.x * 0.25, c.z * 0.25);
  }
  quad(a, b, c, d, want, uvs) {
    this.tri(a, b, c, want, uvs && [uvs[0], uvs[1], uvs[2]]);
    this.tri(a, c, d, want, uvs && [uvs[0], uvs[2], uvs[3]]);
  }
  geo() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    return g;
  }
}

function polyArea(pts) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

// Faceted prism: bottom polygon (plan [x,z] pairs) at y0 -> top polygon at y1.
// Top may be a different polygon with the same vertex count (sloped faces).
export function prism(bottom, y0, top, y1, { cap = true, base = false, sides = true, uvScale = 0.3 } = {}) {
  top = top || bottom;
  if (polyArea(bottom) < 0) { bottom = bottom.slice().reverse(); top = top.slice().reverse(); }
  const s = new Soup();
  const n = bottom.length;
  const cx = bottom.reduce((a, p) => a + p[0], 0) / n, cz = bottom.reduce((a, p) => a + p[1], 0) / n;
  if (sides) {
    let per = 0;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const a = new V3(bottom[i][0], y0, bottom[i][1]), b = new V3(bottom[j][0], y0, bottom[j][1]);
      const c = new V3(top[j][0], y1, top[j][1]), d = new V3(top[i][0], y1, top[i][1]);
      const mid = a.clone().add(b).add(c).add(d).multiplyScalar(0.25);
      const want = new V3(mid.x - cx, 0, mid.z - cz);
      // outward = edge x up for CCW (in x,z with z "down"): compute robustly
      const e = new V3().subVectors(b, a);
      const out = new V3(e.z, 0, -e.x);
      if (out.dot(want) < 0 && want.lengthSq() > 1e-6) out.negate();
      const len = e.length();
      s.quad(a, b, c, d, out.lengthSq() > 0 ? out : want,
        [[per * uvScale, y0 * uvScale], [(per + len) * uvScale, y0 * uvScale], [(per + len) * uvScale, y1 * uvScale], [per * uvScale, y1 * uvScale]]);
      per += len;
    }
  }
  const capPoly = (poly, y, up) => {
    const contour = poly.map((p) => new THREE.Vector2(p[0], p[1]));
    const faces = THREE.ShapeUtils.triangulateShape(contour, []);
    const want = new V3(0, up ? 1 : -1, 0);
    for (const f of faces) {
      const [a, b, c] = f.map((i) => new V3(poly[i][0], y, poly[i][1]));
      s.tri(a, b, c, want, f.map((i) => [poly[i][0] * uvScale, poly[i][1] * uvScale]));
    }
  };
  if (cap) capPoly(top, y1, true);
  if (base) capPoly(bottom, y0, false);
  return s.geo();
}

// Rectangle plan with chamfered corners, centred at (cx, cz).
export function chamferRect(w, l, ch, cx = 0, cz = 0) {
  const x = w / 2, z = l / 2, c = Math.min(ch, x * 0.95, z * 0.95);
  return [[cx - x + c, cz - z], [cx + x - c, cz - z], [cx + x, cz - z + c], [cx + x, cz + z - c], [cx + x - c, cz + z], [cx - x + c, cz + z], [cx - x, cz + z - c], [cx - x, cz - z + c]];
}
export function scalePoly(poly, sx, sz = sx, cx = 0, cz = 0) { return poly.map((p) => [cx + (p[0] - cx) * sx, cz + (p[1] - cz) * sz]); }
export function ngon(n, r, cx = 0, cz = 0, rot = 0, sx = 1, sz = 1) {
  const out = [];
  for (let i = 0; i < n; i++) { const a = rot + (i / n) * PI * 2; out.push([cx + Math.cos(a) * r * sx, cz + Math.sin(a) * r * sz]); }
  return out;
}

// Chamfered block helper: plan w x l centred at (x,z), from y0 to y1, top inset by `slope`.
export function block(w, l, y0, y1, ch = 0.15, slope = 0, x = 0, z = 0, opts) {
  const b = chamferRect(w, l, ch, x, z);
  const t = slope ? chamferRect(Math.max(0.05, w - slope * 2), Math.max(0.05, l - slope * 2), Math.max(0.01, ch - slope * 0.4), x, z) : b;
  return prism(b, y0, t, y1, opts);
}

// Indexed grid surface from rows of points; smooth normals; orientation fixed by `want`.
export function gridGeo(rows, want, uvFn) {
  const R = rows.length, C = rows[0].length;
  const pos = [], uv = [], idx = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    const p = rows[r][c];
    pos.push(p.x, p.y, p.z);
    const u = uvFn ? uvFn(p, r, c) : [c / (C - 1), r / (R - 1)];
    uv.push(u[0], u[1]);
  }
  let flip = null;
  for (let r = 0; r < R - 1; r++) for (let c = 0; c < C - 1; c++) {
    const a = r * C + c, b = a + 1, d = a + C, e = d + 1;
    if (flip === null) {
      const A = rows[r][c], B = rows[r][c + 1], D = rows[r + 1][c + 1];
      const nn = new V3().crossVectors(new V3().subVectors(B, A), new V3().subVectors(D, A));
      if (nn.lengthSq() > 1e-10) flip = typeof want === 'function' ? nn.dot(want(A)) < 0 : nn.dot(want) < 0;
    }
    idx.push(a, b, e, a, e, d);
  }
  if (flip) for (let i = 0; i < idx.length; i += 3) { const t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// ===========================================================================
// Lofted hull
// ===========================================================================
const HULL_DEFAULTS = {
  L: 20, B: 4, D: 1.5, F: 1.6, bulwark: 0.1, rail: 0.08,
  sheerF: 0.6, sheerA: 0.1, transom: 0.4, bowP: 1.7, sternP: 2.2, uMax: 0.45,
  rake: 0.2, rakeCurve: 0, overhang: 0.3, flareBow: 0.2, flareMid: 0,
  nMid: 3.5, nBow: 1.5, nStern: 2.5, forefoot: 0.35, sternRise: 0.3, ram: 0,
  camber: 0.04, nu: 44, nLow: 7, rowStep: 0.35,
  hullMat: 'steel', bottomColor: 0x7c2a24, bands: null, deckMat: 'teak', deckColor: 0xffffff,
  deckUV: 0.25, sideUV: [1 / 6, 1 / 5], railColor: null, deckInset: 0,
};

export function makeHull(P, opts) {
  const s = { ...HULL_DEFAULTS, ...opts };
  const { L, B, D, F } = s;
  const topY = (u) => F + s.bulwark + s.sheerF * Math.pow(sst(0.45, 1, u), 2) + s.sheerA * Math.pow(sst(0.4, 0, u), 2);
  const deckY = (u) => topY(u) - s.bulwark;
  const plan = (u) => {
    if (u >= s.uMax) { const t = (u - s.uMax) / (1 - s.uMax); return Math.max(0, 1 - Math.pow(t, s.bowP)); }
    const t = (s.uMax - u) / s.uMax; return 1 - (1 - s.transom) * Math.pow(t, s.sternP);
  };
  const halfWL = (u) => (B / 2) * plan(u);
  const flare = (u) => s.flareMid + s.flareBow * sst(0.45, 1, u);
  const draft = (u) => D * (1 - s.forefoot * sst(0.7, 1, u)) * (1 - s.sternRise * sst(0.25, 0, u));
  const nexp = (u) => (u > 0.5 ? lerp(s.nMid, s.nBow, sst(0.5, 1, u)) : lerp(s.nMid, s.nStern, sst(0.4, 0, u)));
  const Ht1 = topY(1), Ht0 = topY(0);
  const zBow = (y) => L / 2 - s.rake * (Ht1 - y) - s.rakeCurve * Math.pow(Math.max(0, Ht1 - y), 2) / (Ht1 + D) + s.ram * Math.exp(-Math.pow((y + 0.45 * D) / (0.3 * D), 2));
  const zStern = (y) => -L / 2 + s.overhang * (Ht0 - y);
  const zAt = (u, y) => lerp(zStern(y), zBow(y), u);
  const xUp = (u, y) => halfWL(u) * (1 + flare(u) * Math.pow(clamp(y / topY(u), 0, 1), 1.5));
  const pLow = (u, th) => {
    const e = 2 / nexp(u);
    const x = halfWL(u) * Math.pow(Math.sin(th), e);
    const y = -draft(u) * Math.pow(Math.max(0, Math.cos(th)), e);
    return new V3(x, y, zAt(u, y));
  };
  const pUp = (u, y) => new V3(xUp(u, y), y, zAt(u, y));
  const normalFD = (fn, u, q, q0, q1) => {
    const du = 1e-3, dq = (q1 - q0) * 1e-3;
    const ua = clamp(u - du, 0, 1), ub = clamp(u + du, 0, 1);
    const qa = clamp(q - dq, q0, q1), qb = clamp(q + dq, q0, q1);
    const Pu = fn(ub, q).sub(fn(ua, q));
    const Pq = fn(u, qb).sub(fn(u, qa));
    const n = new V3().crossVectors(Pq, Pu);
    if (n.lengthSq() < 1e-14) return new V3(1, 0, 0);
    return n.normalize();
  };

  // u samples (denser at the ends)
  const us = [];
  for (let i = 0; i <= s.nu; i++) { const t = i / s.nu; us.push(0.45 * t + 0.55 * (0.5 - 0.5 * Math.cos(PI * t))); }

  const [ku, kv] = s.sideUV;
  const skin = (rowsDef, fn, qLo, qHi) => {
    // rowsDef: array of q(u) functions
    const pos = [], nrm = [], uv = [], idx = [];
    const C = us.length;
    for (let r = 0; r < rowsDef.length; r++) {
      for (let c = 0; c < C; c++) {
        const u = us[c], q = rowsDef[r](u);
        const p = fn(u, q);
        const n = normalFD(fn, u, q, qLo(u), qHi(u));
        pos.push(p.x, p.y, p.z); nrm.push(n.x, n.y, n.z); uv.push(p.z * ku, p.y * kv);
      }
    }
    for (let r = 0; r < rowsDef.length - 1; r++) for (let c = 0; c < C - 1; c++) {
      const a = r * C + c, b = a + 1, d = a + C, e = d + 1;
      idx.push(a, e, b, a, d, e);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(nrm, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    return g;
  };
  const addBoth = (mat, g, color) => { const a = P.add(mat, g, color); P.addRaw(mat, mirrorX(a)); };

  // --- underwater body
  const lowRows = [];
  for (let j = 0; j <= s.nLow; j++) { const th = (j / s.nLow) * PI / 2; lowRows.push(() => th); }
  addBoth(s.hullMat, skin(lowRows, pLow, () => 0, () => PI / 2), s.bottomColor);

  // --- topsides in bands
  const bands = s.bands || [{ to: -0.0001, mat: s.hullMat, color: 0xffffff }];
  const res = (v, u) => (v < 0 ? topY(u) + v : Math.min(v, topY(u)));
  let prevTo = () => 0;
  bands.forEach((band, bi) => {
    const from = prevTo;
    const to = bi === bands.length - 1 ? (u) => topY(u) : (u) => res(band.to, u);
    const span = to(0.5) - from(0.5);
    const nr = Math.max(2, Math.ceil(span / s.rowStep) + 1);
    const rows = [];
    for (let r = 0; r < nr; r++) { const t = r / (nr - 1); rows.push((u) => lerp(from(u), to(u), t)); }
    addBoth(band.mat || s.hullMat, skin(rows, pUp, () => 0, (u) => topY(u)), band.color ?? 0xffffff);
    prevTo = to;
  });

  // --- deck
  const xTop = (u) => xUp(u, topY(u));
  const deckHalf = (u) => (s.bulwark > 0 ? Math.max(0, Math.min(xTop(u), xUp(u, deckY(u))) - s.rail) : xTop(u)) - s.deckInset;
  {
    const cols = [-1, -0.5, 0, 0.5, 1];
    const rows = us.map((u) => cols.map((c) => {
      const h = Math.max(0, deckHalf(u));
      const y = deckY(u) + s.camber * (1 - c * c) - (s.bulwark > 0 ? 0 : 0.0);
      return new V3(c * h, y, zAt(u, deckY(u)));
    }));
    P.add(s.deckMat, gridGeo(rows, new V3(0, 1, 0), (p) => [p.z * s.deckUV, p.x * s.deckUV]), s.deckColor);
  }
  // --- rail cap + inner bulwark
  if (s.bulwark > 0) {
    const cap = [], inner = [];
    for (const u of us) {
      const yt = topY(u), yd = deckY(u) - 0.02;
      const xo = xTop(u), xi = Math.max(0, xo - s.rail), xd = Math.max(0, deckHalf(u));
      const zt = zAt(u, yt), zd = zAt(u, deckY(u));
      cap.push([new V3(xo, yt, zt), new V3(xi, yt, zt)]);
      inner.push([new V3(xi, yt, zt), new V3(xd, yd, zd)]);
    }
    const tr = (a) => [a.map((p) => p[0]), a.map((p) => p[1])];
    const rc = s.railColor ?? bands[bands.length - 1].color ?? 0xffffff;
    const rm = bands[bands.length - 1].mat || s.hullMat;
    addBoth(rm, gridGeo(tr(cap), new V3(0, 1, 0), (p) => [p.z * ku, p.x * kv]), rc);
    addBoth(rm, gridGeo(tr(inner), new V3(-1, 0.2, 0), (p) => [p.z * ku, p.y * kv]), rc);
  }
  // --- transom
  if (s.transom > 0.02) {
    const outline = [];
    for (let j = 0; j <= s.nLow; j++) outline.push(pLow(0, (j / s.nLow) * PI / 2));
    const yt = topY(0);
    for (let r = 1; r <= 6; r++) outline.push(pUp(0, (r / 6) * yt));
    const full = outline.concat(outline.slice(1, -1).reverse().map((p) => new V3(-p.x, p.y, p.z)));
    // mirrored part must close the loop: add the top-left point
    full.push(new V3(-outline[outline.length - 1].x, yt, outline[outline.length - 1].z));
    const loop = outline.concat([new V3(-outline[outline.length - 1].x, yt, outline[outline.length - 1].z)])
      .concat(outline.slice(1, -1).reverse().map((p) => new V3(-p.x, p.y, p.z)));
    const contour = loop.map((p) => new THREE.Vector2(p.x, p.y));
    const faces = THREE.ShapeUtils.triangulateShape(contour, []);
    const soup = new Soup();
    const want = new V3(0, 0, -1);
    for (const f of faces) soup.tri(loop[f[0]], loop[f[1]], loop[f[2]], want, f.map((i) => [loop[i].x * ku, loop[i].y * kv]));
    const tb = bands.find((b) => !b.mat || b.mat === s.hullMat) || bands[0];
    P.add(s.hullMat, soup.geo(), s.transomColor ?? (bands.length > 1 ? bands[1].color ?? 0xffffff : tb.color ?? 0xffffff));
    if (s.bulwark > 0) {
      const xi = Math.max(0, xTop(0) - s.rail), zt = zStern(yt) + s.rail;
      const soup2 = new Soup();
      soup2.quad(new V3(-xi, deckY(0) - 0.02, zt), new V3(xi, deckY(0) - 0.02, zt), new V3(xi, yt, zt), new V3(-xi, yt, zt), new V3(0, 0, 1));
      soup2.quad(new V3(-xTop(0), yt, zStern(yt)), new V3(xTop(0), yt, zStern(yt)), new V3(xi, yt, zt), new V3(-xi, yt, zt), new V3(0, 1, 0));
      P.add(s.hullMat, soup2.geo(), s.railColor ?? bands[bands.length - 1].color ?? 0xffffff);
    }
  }

  // --- lookup tables
  const tab = us.map((u) => ({ u, z: zAt(u, deckY(u)), y: deckY(u), half: Math.max(0, deckHalf(u)), top: topY(u), outer: xTop(u) }));
  const find = (z) => {
    if (z <= tab[0].z) return { ...tab[0] };
    for (let i = 1; i < tab.length; i++) if (tab[i].z >= z) {
      const a = tab[i - 1], b = tab[i], t = (z - a.z) / (b.z - a.z || 1);
      return { u: lerp(a.u, b.u, t), z, y: lerp(a.y, b.y, t), half: lerp(a.half, b.half, t), top: lerp(a.top, b.top, t), outer: lerp(a.outer, b.outer, t) };
    }
    return { ...tab[tab.length - 1] };
  };
  return {
    spec: s,
    deckAt: find,
    // outer skin point + outward normal (starboard is -X, so side=-1 is starboard)
    sideAt(z, y, side = 1) {
      const u = find(z).u;
      const p = pUp(u, y);
      const n = normalFD(pUp, u, y, 0, topY(u));
      return { p: new V3(side * p.x, p.y, p.z), n: new V3(side * n.x, n.y, n.z) };
    },
    zBowDeck: zBow(topY(1)), zSternDeck: zStern(topY(0)),
    zBowWL: zBow(0), zSternWL: zStern(0),
    topY, deckY, xUp, zAt,
  };
}

// ===========================================================================
// Cloth: sails + flags with morph targets (animated per instance, geometry shared)
// ===========================================================================
// Bilinear sail patch: c00 = head-left, c10 = head-right, c01 = foot-left, c11 = foot-right.
// Bulges along `dir` by b0 (slack) .. b1 (full, morph target 0).
function sailPatch(c00, c10, c01, c11, dir, b0, b1, uvRect = [0, 0, 1, 1], nx = 8, ny = 6, shapeFn) {
  const shape = shapeFn || ((xn, yn) => (1 - xn * xn) * Math.pow(Math.sin(yn * PI * 0.6), 0.85));
  const build = (b) => {
    const pos = [], uv = [], idx = [];
    for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) {
      const s = i / nx, t = j / ny;
      const top = new V3().lerpVectors(c00, c10, s), bot = new V3().lerpVectors(c01, c11, s);
      const p = new V3().lerpVectors(top, bot, t);
      p.addScaledVector(dir, b * shape(s * 2 - 1, t, s));
      pos.push(p.x, p.y, p.z);
      uv.push(lerp(uvRect[0], uvRect[2], s), lerp(uvRect[3], uvRect[1], t));
    }
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const a = j * (nx + 1) + i, b2 = a + 1, c = a + nx + 1, d = c + 1;
      idx.push(a, c, b2, b2, c, d);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  };
  const g0 = build(b0), g1 = build(b1);
  // orient normals toward the bulge direction for consistent lighting
  const n0 = g0.attributes.normal;
  if (n0.getX(Math.floor(n0.count / 2)) * dir.x + n0.getY(Math.floor(n0.count / 2)) * dir.y + n0.getZ(Math.floor(n0.count / 2)) * dir.z < 0) {
    for (const g of [g0, g1]) { const a = g.attributes.normal.array; for (let i = 0; i < a.length; i++) a[i] = -a[i]; }
  }
  const dp = g1.attributes.position.array.slice(), dn = g1.attributes.normal.array.slice();
  const p0 = g0.attributes.position.array, q0 = g0.attributes.normal.array;
  for (let i = 0; i < dp.length; i++) { dp[i] -= p0[i]; dn[i] -= q0[i]; }
  g0.morphAttributes.position = [new THREE.Float32BufferAttribute(dp, 3)];
  g0.morphAttributes.normal = [new THREE.Float32BufferAttribute(dn, 3)];
  g0.morphTargetsRelative = true;
  const n = g0.attributes.position.count;
  g0.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(n * 3).fill(1), 3));
  return g0;
}

// Flag in the YZ plane, hoisted at (x,y,z) (top of the hoist), streaming toward -Z.
// Two morph targets (sin / cos) give a travelling wave.
function flagGeo(x, y, z, len, h, taper = 0, amp = 0.18, waves = 1.3, dirZ = -1) {
  len *= 1.35; h *= 1.35; // oversized for readability: cloth folds must resolve at gameplay zoom
  const nx = 10, ny = 3;
  const pos = [], uv = [], idx = [], m1 = [], m2 = [];
  for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) {
    const s = i / nx, t = j / ny;
    const hh = h * (1 - taper * s);
    pos.push(x, y - (h - hh) * 0.5 - t * hh, z + dirZ * s * len);
    uv.push(s, 1 - t);
    const k = s * waves * PI * 2;
    const a = amp * len * s;
    m1.push(a * Math.sin(k), 0, 0); m2.push(a * Math.cos(k), 0, 0);
  }
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const a = j * (nx + 1) + i, b = a + 1, c = a + nx + 1, d = c + 1;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  g.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(pos.length).fill(1), 3));
  g.morphAttributes.position = [new THREE.Float32BufferAttribute(m1, 3), new THREE.Float32BufferAttribute(m2, 3)];
  g.morphTargetsRelative = true;
  return g;
}

function clothMesh(group, geos, mat, role) {
  if (!geos.length) return null;
  const geo = geos.length === 1 ? geos[0] : mergeGeometries(geos, false);
  if (!geo) { console.warn('[models] cloth merge failed for', role); return null; }
  geo.morphTargetsRelative = true; // mergeGeometries drops this flag
  geo.computeBoundingSphere();
  // morph targets can push vertices outside the base bounds
  geo.boundingSphere.radius *= 1.3;
  const mesh = new THREE.Mesh(geo, PLACEHOLDER);
  mesh.userData.mat = mat;
  mesh.userData.rig = role;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = role;
  mesh.morphTargetInfluences = new Array(geo.morphAttributes.position.length).fill(0);
  group.add(mesh);
  return mesh;
}

// ===========================================================================
// Colour palette (sRGB hex, multiplied with white-based VC materials)
// ===========================================================================
const C = {
  hull: 0x7a838c, hullDark: 0x59626b, sup: 0x9aa3ab, supLight: 0xb3bac0, dark: 0x454b52, black: 0x1d1f22,
  gun: 0x6d767f, deckSteel: 0x5b6269, red: 0x7c2a24, boot: 0x1b1d20, white: 0xe4e4df, buff: 0xc8a466,
  navy: 0x3d4c5e, woodDark: 0x6a5140, woodMid: 0xa88a6c, woodPale: 0xd8c4a6, rope: 0x2a221c, copper: 0xd4885a,
  ironBlack: 0x2a2c30, graphite: 0x4c535b, graphiteDark: 0x30353b, olive: 0x6e7560,
};

// VC materials used by the ship builders (white-based so the colour attribute is the colour).
const VC_WHITE = new Set(['steel', 'iron', 'stealth', 'stealthDark', 'rubber', 'paint', 'darksteel']);
export function shipMat(name, teamId) {
  if (VC_WHITE.has(name)) return getWhiteVC(name);
  return getMat(name, teamId, true);
}
const whiteVC = new Map();
function getWhiteVC(name) {
  let m = whiteVC.get(name);
  if (!m) {
    m = patchMaterial(getMat(name, -1, true).clone(), name);
    m.color.set(0xffffff);
    m.name = name + ':vcwhite';
    whiteVC.set(name, m);
  }
  return m;
}

// ===========================================================================
// Equipment builders
// ===========================================================================
function funnel(P, rig, { x = 0, y0, z, h, rx, rz, rake = 0.08, body = C.sup, band = true, cap = C.black, bandMat = 'team', mat = 'steel' }) {
  const sh = Math.tan(rake);
  const shear = new THREE.Matrix4().set(1, 0, 0, 0, 0, 1, 0, 0, 0, -sh, 1, 0, 0, 0, 0, 1);
  const seg = (y1, y2, m, col, rr = 1) => {
    const g = new THREE.CylinderGeometry(1, 1, y2 - y1, 20, 1, true);
    g.applyMatrix4(new THREE.Matrix4().makeScale(rx * rr, 1, rz * rr));
    g.translate(0, (y1 + y2) / 2, 0);
    g.applyMatrix4(shear);
    g.translate(x, y0, z);
    P.add(m, g, col);
  };
  const hb = band ? h * 0.72 : h * 0.86;
  seg(-0.3, hb, mat, body);
  if (band) seg(hb, h * 0.86, bandMat, 0xffffff, 1.0);
  seg(h * 0.86, h, mat, cap, 1.0);
  // rim + inner dark
  const rim = new THREE.TorusGeometry(1, 0.06, 4, 20);
  rim.rotateX(PI / 2); rim.applyMatrix4(new THREE.Matrix4().makeScale(rx, 1, rz));
  rim.translate(0, h, 0); rim.applyMatrix4(shear); rim.translate(x, y0, z);
  P.add(mat, rim, C.black);
  const disc = new THREE.CircleGeometry(1, 20);
  disc.rotateX(-PI / 2); disc.applyMatrix4(new THREE.Matrix4().makeScale(rx * 0.98, 1, rz * 0.98));
  disc.translate(0, h - 0.25, 0); disc.applyMatrix4(shear); disc.translate(x, y0, z);
  P.add(mat, disc, 0x0a0a0a);
  // steam pipe
  P.rod(mat, 0.05, 0.05, [x + rx * 0.7, y0 + 0.3, z - rz * 0.9 - sh * 0.3], [x + rx * 0.7, y0 + h + 0.25, z - rz * 0.9 - sh * (h + 0.25)], C.dark, 6);
  const e = new THREE.Object3D();
  e.position.set(x, y0 + h + 0.1, z - sh * h);
  e.userData.rig = 'stack';
  rig.add(e);
  return e;
}

function markerAt(parent, role, x, y, z, extra = {}) {
  const o = new THREE.Object3D();
  o.position.set(x, y, z);
  o.userData.rig = role;
  Object.assign(o.userData, extra);
  parent.add(o);
  return o;
}

// Turret styles. Returns the pivot Object3D (meshes + muzzle markers as children).
// Barrels point +Z. Origin = turret ring on the deck/barbette top.
function turret(root, idx, { style = 'battle', x = 0, y = 0, z = 0, ry = 0, w = 2, l = 2.4, h = 0.8, n = 2, blen = 3.5, br = 0.11, sp = 0.6, teamRoof = true, scale = 1 }) {
  const pivot = new THREE.Object3D();
  pivot.position.set(x, y, z);
  pivot.rotation.y = ry;
  pivot.userData.rig = 'turret';
  pivot.userData.idx = idx;
  const P = new Parts();
  const muzzles = [];
  const barrelRow = (by, bz, len, r, count, spacing, col = C.gun, bags = true, mat = 'steel') => {
    for (let i = 0; i < count; i++) {
      const bx = (i - (count - 1) / 2) * spacing;
      if (bags) P.cyl(mat, r * 1.9, r * 2.1, 0.45, bx, by, bz + 0.1, C.dark, 10, PI / 2);
      P.rod(mat, r * 1.15, r * 0.82, [bx, by, bz], [bx, by, bz + len], col, 10);
      P.rod(mat, r * 1.12, r * 1.12, [bx, by, bz + len - 0.22], [bx, by, bz + len], C.dark, 10);
      muzzles.push([bx, by, bz + len + 0.05]);
    }
  };
  if (style === 'battle') {
    const b = [[-w / 2, -0.55 * l], [w / 2, -0.55 * l], [w / 2, 0.22 * l], [0.34 * w, 0.48 * l], [-0.34 * w, 0.48 * l], [-w / 2, 0.22 * l]];
    const t = [[-0.46 * w, -0.5 * l], [0.46 * w, -0.5 * l], [0.46 * w, 0.14 * l], [0.3 * w, 0.28 * l], [-0.3 * w, 0.28 * l], [-0.46 * w, 0.14 * l]];
    P.add('steel', prism(b, 0, t, h), C.sup);
    P.cyl('steel', w * 0.52, w * 0.55, 0.3, 0, -0.1, 0, C.hullDark, 20);
    if (teamRoof) P.add('team', prism(scalePoly(t, 0.82, 0.82, 0, -0.1 * l), h, null, h + 0.04, { sides: true }), 0xffffff);
    // rangefinder hood + periscope hoods
    P.box('steel', w * 1.18, 0.22, 0.3, 0, h * 0.7, -0.35 * l, C.dark);
    P.box('steel', 0.22, 0.14, 0.3, -w * 0.25, h + 0.05, 0.02 * l, C.dark);
    P.box('steel', 0.22, 0.14, 0.3, w * 0.25, h + 0.05, 0.02 * l, C.dark);
    barrelRow(h * 0.42, 0.36 * l, blen, br, n, sp);
  } else if (style === 'gun') { // single shielded destroyer mount
    const b = [[-w / 2, -0.5 * l], [w / 2, -0.5 * l], [w / 2, 0.15 * l], [0.25 * w, 0.5 * l], [-0.25 * w, 0.5 * l], [-w / 2, 0.15 * l]];
    const t = [[-0.42 * w, -0.45 * l], [0.42 * w, -0.45 * l], [0.42 * w, 0.05 * l], [0.2 * w, 0.22 * l], [-0.2 * w, 0.22 * l], [-0.42 * w, 0.05 * l]];
    P.add('steel', prism(b, 0, t, h), C.sup);
    P.cyl('steel', w * 0.5, w * 0.5, 0.2, 0, -0.05, 0, C.hullDark, 16);
    if (teamRoof) P.add('team', prism(scalePoly(t, 0.8, 0.8), h, null, h + 0.03), 0xffffff);
    barrelRow(h * 0.45, 0.3 * l, blen, br, n, sp, C.gun, false);
  } else if (style === 'cannon') { // age of sail/steam pivot cannon on a turntable
    P.cyl('iron', w * 0.5, w * 0.55, 0.14, 0, 0.07, 0, C.woodDark, 16);
    P.box('iron', w * 0.55, 0.28, l * 0.7, 0, 0.28, -0.05, 0x5a4030);
    for (let i = 0; i < n; i++) {
      const bx = (i - (n - 1) / 2) * sp;
      const pts = [[0, -0.35], [br * 1.7, -0.33], [br * 1.9, -0.1], [br * 1.6, 0.2], [br * 1.2, blen * 0.8], [br * 1.45, blen * 0.9], [br * 1.4, blen], [br * 0.6, blen]];
      const g = new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), 12);
      g.rotateX(PI / 2);
      P.add('iron', g, C.ironBlack, M(bx, 0.5, 0.0));
      muzzles.push([bx, 0.5, blen + 0.05]);
    }
  } else if (style === 'rail') { // arsenal railgun
    const b = [[-w / 2, -0.5 * l], [w / 2, -0.5 * l], [w * 0.42, 0.3 * l], [0, 0.5 * l], [-w * 0.42, 0.3 * l]];
    const t = [[-w * 0.3, -0.45 * l], [w * 0.3, -0.45 * l], [w * 0.22, 0.15 * l], [0, 0.26 * l], [-w * 0.22, 0.15 * l]];
    P.add('stealth', prism(b, 0, t, h), C.graphite);
    P.add('teamGlow', prism(scalePoly(t, 0.5, 0.5, 0, -0.1 * l), h, null, h + 0.03), 0xffffff);
    const by = h * 0.5, gap = 0.16;
    for (const sx of [-1, 1]) {
      P.box('stealth', 0.2, 0.34, blen, sx * (gap / 2 + 0.1), by, 0.2 * l + blen / 2, C.graphiteDark);
      P.box('stealth', 0.26, 0.4, 0.5, sx * (gap / 2 + 0.13), by, 0.2 * l + blen * 0.25, C.graphite);
      P.box('stealth', 0.26, 0.4, 0.5, sx * (gap / 2 + 0.13), by, 0.2 * l + blen * 0.6, C.graphite);
    }
    P.box('teamGlow', gap * 0.9, 0.1, blen * 0.96, 0, by, 0.2 * l + blen / 2, 0xffffff);
    muzzles.push([0, by, 0.2 * l + blen + 0.1]);
  } else if (style === 'laser') { // drone mothership / USV laser dome
    const dome = new THREE.SphereGeometry(w * 0.5, 10, 6, 0, PI * 2, 0, PI / 2);
    P.add('stealth', dome, C.graphite, M(0, 0, 0, 0, 0, 0, 1, h / (w * 0.5), 1));
    P.cyl('stealth', w * 0.52, w * 0.56, 0.2, 0, 0.0, 0, C.graphiteDark, 10);
    P.add('stealth', block(w * 0.36, l * 0.5, h * 0.35, h * 0.8, 0.05, 0.03, 0, l * 0.3), C.graphiteDark);
    P.rod('stealth', br * 1.6, br * 1.2, [0, h * 0.6, l * 0.3], [0, h * 0.6, l * 0.3 + blen], C.graphiteDark, 8);
    P.cyl('teamGlow', br * 1.3, br * 1.3, 0.12, 0, h * 0.6, l * 0.3 + blen, 0xffffff, 8, PI / 2);
    P.add('teamGlow', new THREE.TorusGeometry(w * 0.5, 0.04, 4, 16), 0xffffff, M(0, 0.12, 0, PI / 2));
    muzzles.push([0, h * 0.6, l * 0.3 + blen + 0.12]);
  } else if (style === 'missile') { // box launcher
    P.cyl('steel', w * 0.4, w * 0.45, 0.25, 0, 0.1, 0, C.hullDark, 12);
    P.box('steel', w * 0.25, 0.5, 0.5, 0, 0.45, 0, C.dark);
    const bw = w, bh = h * 0.6, bl = l;
    P.add('steel', new RoundedBoxGeometry(bw, bh, bl, 1, 0.05), C.sup, M(0, h * 0.75, 0, -0.35, 0, 0));
    for (let i = 0; i < n; i++) {
      const bx = (i - (n - 1) / 2) * (bw / n);
      const fy = h * 0.75 + Math.sin(0.35) * bl / 2, fz = Math.cos(0.35) * bl / 2 + 0.01;
      P.add('steel', new THREE.CircleGeometry(bw / n * 0.36, 10), C.black, M(bx, fy, fz, -0.35));
      muzzles.push([bx, fy + 0.1, fz + 0.2]);
    }
  } else if (style === 'twin5') { // 5-inch dual-purpose twin mount (enclosed)
    const b = chamferRect(w, l, w * 0.3, 0, -0.05 * l);
    const t = chamferRect(w * 0.84, l * 0.8, w * 0.25, 0, -0.1 * l);
    P.add('steel', prism(b, 0, t, h), C.sup);
    if (teamRoof) P.add('team', prism(scalePoly(t, 0.7, 0.7, 0, -0.1 * l), h, null, h + 0.03), 0xffffff);
    barrelRow(h * 0.5, 0.35 * l, blen, br, n, sp, C.gun, false);
  }
  P.build(pivot);
  pivot.scale.setScalar(scale);
  muzzles.forEach((m, i) => markerAt(pivot, 'muzzle', m[0], m[1], m[2], { turret: idx, i }));
  root.add(pivot);
  return pivot;
}

// Spinning radar: a group with its own mesh (rig role 'spin').
function radar(root, { x, y, z, style = 'bed', size = 1, speed = 2.2, mat = 'steel', col = C.dark }) {
  const g = new THREE.Object3D();
  g.position.set(x, y, z);
  g.userData.rig = 'spin';
  g.userData.speed = speed;
  const P = new Parts();
  if (style === 'bed') { // WWII bedspring
    P.cyl(mat, 0.05 * size, 0.07 * size, 0.4 * size, 0, 0.2 * size, 0, col, 6);
    P.box(mat, 1.6 * size, 0.7 * size, 0.08 * size, 0, 0.6 * size, 0.1 * size, col);
    for (let i = -3; i <= 3; i++) P.box(mat, 0.03 * size, 0.78 * size, 0.14 * size, i * 0.24 * size, 0.6 * size, 0.12 * size, C.black);
  } else if (style === 'bar') { // slotted bar radar
    P.cyl(mat, 0.06 * size, 0.08 * size, 0.3 * size, 0, 0.15 * size, 0, col, 6);
    P.box(mat, 1.8 * size, 0.16 * size, 0.2 * size, 0, 0.36 * size, 0, col);
    P.box(mat, 1.7 * size, 0.06 * size, 0.24 * size, 0, 0.36 * size, 0.02 * size, C.black);
  } else if (style === 'dish') {
    const d = new THREE.SphereGeometry(0.6 * size, 12, 6, 0, PI * 2, 0, PI * 0.35);
    P.add(mat, d, col, M(0, 0.55 * size, 0.2 * size, PI / 2 + 0.3, 0, 0));
    P.cyl(mat, 0.05 * size, 0.07 * size, 0.5 * size, 0, 0.25 * size, 0, col, 6);
  } else if (style === 'ring') { // sensor ring (stealth ships)
    P.add(mat, new THREE.CylinderGeometry(0.5 * size, 0.6 * size, 0.3 * size, 8, 1), col, M(0, 0.15 * size, 0));
    P.add('teamGlow', new THREE.BoxGeometry(0.9 * size, 0.06 * size, 0.1 * size), 0xffffff, M(0, 0.32 * size, 0.42 * size));
    P.box(mat, 1.4 * size, 0.1 * size, 0.3 * size, 0, 0.4 * size, 0, col);
  }
  P.build(g);
  root.add(g);
  return g;
}

function flagMarker(flags, x, y, z, len, h, taper = 0, amp) { flags.push(flagGeo(x, y, z, len, h, taper, amp)); }

// Pole mast with yard + light.
function poleMast(P, x, y0, z, h, { r = 0.07, yard = 1.4, yardY = 0.75, col = C.dark, top = true, mat = 'steel' } = {}) {
  P.rod(mat, r, r * 0.5, [x, y0, z], [x, y0 + h, z], col, 6);
  if (yard) P.rod(mat, r * 0.5, r * 0.5, [x - yard / 2, y0 + h * yardY, z], [x + yard / 2, y0 + h * yardY, z], col, 5);
  if (top) P.sphere('lantern', r * 0.9, x, y0 + h + r * 0.4, z, 0xffffff, 6, 4);
}

// Small boat (lofted), placed on deck.
function boat(P, x, y, z, len, col = C.white, ry = 0, mat = 'steel') {
  const bP = new Parts();
  makeHull(bP, {
    L: len, B: len * 0.32, D: len * 0.12, F: len * 0.1, bulwark: 0.05, rail: 0.03, sheerF: 0.05, sheerA: 0.05,
    transom: 0.5, bowP: 1.8, sternP: 2, rake: 0.3, overhang: 0.2, nu: 14, nLow: 3, rowStep: 1,
    hullMat: mat, bottomColor: col, bands: [{ to: -0.0001, color: col }], deckMat: mat, deckColor: C.woodMid, camber: 0,
  });
  const m = M(x, y + len * 0.12, z, 0, ry, 0);
  for (const [mt, list] of bP.map) for (const g of list) { g.applyMatrix4(m); P.addRaw(mt, g); }
}

// Anti-aircraft quad mount (static)
function aaMount(P, x, y, z, ry = 0, s = 1) {
  P.add('steel', new THREE.CylinderGeometry(0.42 * s, 0.46 * s, 0.3 * s, 10, 1, true), C.sup, M(x, y + 0.15 * s, z));
  P.cyl('steel', 0.4 * s, 0.4 * s, 0.05, x, y + 0.03, z, C.deckSteel, 10);
  P.box('steel', 0.36 * s, 0.22 * s, 0.3 * s, x, y + 0.3 * s, z, C.dark, 0, ry);
  for (let i = 0; i < 4; i++) {
    const bx = (i - 1.5) * 0.08 * s;
    const c = Math.cos(ry), sn = Math.sin(ry);
    P.rod('steel', 0.025 * s, 0.02 * s, [x + bx * c, y + 0.35 * s, z - bx * sn], [x + bx * c + sn * 0.7 * s, y + 0.55 * s, z - bx * sn + c * 0.7 * s], C.black, 5);
  }
}

// Secondary casemate/deck mount (static twin)
function secMount(P, x, y, z, ry, s = 1) {
  const g = block(0.7 * s, 0.8 * s, 0, 0.35 * s, 0.18 * s, 0.05 * s);
  P.add('steel', g, C.sup, M(x, y, z, 0, ry));
  const c = Math.cos(ry), sn = Math.sin(ry);
  for (const bx of [-0.12 * s, 0.12 * s]) P.rod('steel', 0.04 * s, 0.035 * s, [x + bx * c + sn * 0.3 * s, y + 0.18 * s, z - bx * sn + c * 0.3 * s], [x + bx * c + sn * 1.2 * s, y + 0.2 * s, z - bx * sn + c * 1.2 * s], C.gun, 6);
}

// Small parked plane (static) - carrier deck / catapult
function plane(P, x, y, z, ry = 0, s = 1, col = C.navy, folded = false) {
  const m = M(x, y, z, 0, ry, 0, s);
  const add = (mat, g, c) => P.add(mat, g, c, m);
  const fus = new THREE.CylinderGeometry(0.1, 0.16, 1.5, 8); fus.rotateX(PI / 2);
  add('steel', fus, col);
  const nose = new THREE.SphereGeometry(0.16, 8, 6); nose.translate(0, 0, 0.75); add('steel', nose, C.dark);
  add('steel', new THREE.BoxGeometry(0.1, 0.02, 0.5).translate(0, 0.1, 0.75), C.black); // prop
  const wingSpan = folded ? 0.7 : 1.8;
  add('steel', new THREE.BoxGeometry(wingSpan, 0.05, 0.38).translate(0, -0.02, 0.2), col);
  if (folded) {
    add('steel', new THREE.BoxGeometry(0.05, 0.55, 0.32).translate(0.36, 0.25, 0.2), col);
    add('steel', new THREE.BoxGeometry(0.05, 0.55, 0.32).translate(-0.36, 0.25, 0.2), col);
  }
  add('steel', new THREE.BoxGeometry(0.62, 0.04, 0.22).translate(0, 0.02, -0.62), col);
  add('team', new THREE.BoxGeometry(0.04, 0.3, 0.26).translate(0, 0.17, -0.64), 0xffffff);
  add('glass', new THREE.SphereGeometry(0.09, 8, 5, 0, PI * 2, 0, PI / 2).scale(1, 1, 2).translate(0, 0.1, 0.25), 0xffffff);
}

// Deck stripe (team), laid on the deck surface via the hull lookup.
function deckStripe(P, hull, z0, z1, width, x = 0, mat = 'team', col = 0xffffff, thick = 0.05) {
  const steps = Math.max(2, Math.ceil(Math.abs(z1 - z0) / 1.2));
  for (let i = 0; i < steps; i++) {
    const za = lerp(z0, z1, i / steps), zb = lerp(z0, z1, (i + 1) / steps);
    const d = hull.deckAt((za + zb) / 2);
    const cam = hull.spec.camber * (1 - Math.pow(x / Math.max(0.1, d.half), 2));
    P.box(mat, width, thick, Math.abs(zb - za) + 0.02, x, d.y + cam + thick / 2 + 0.005, (za + zb) / 2, col);
  }
}
// Diagonal air-recognition stripes on the foredeck
function recognitionStripes(P, hull, zc, count, gap, w = 0.35, ang = 0.5, mat = 'team') {
  for (let i = 0; i < count; i++) {
    const z = zc + (i - (count - 1) / 2) * gap;
    const d = hull.deckAt(z);
    const len = d.half * 2 / Math.cos(ang) * 0.92;
    P.box(mat, len, 0.05, w, 0, d.y + hull.spec.camber * 0.5 + 0.04, z, 0xffffff, 0, ang, 0);
  }
}
// Deck-following slab covering [z0,z1] of the deck at width fraction frac
function deckSlab(P, hull, z0, z1, frac, y, mat, col) {
  const pts = [];
  const N = 10;
  for (let i = 0; i <= N; i++) { const z = lerp(z0, z1, i / N); pts.push([hull.deckAt(z).half * frac, z]); }
  for (let i = N; i >= 0; i--) { const z = lerp(z0, z1, i / N); pts.push([-hull.deckAt(z).half * frac, z]); }
  return pts;
}

function ventCowl(P, x, y, z, s = 1, ry = 0) {
  P.cyl('steel', 0.09 * s, 0.09 * s, 0.6 * s, x, y + 0.3 * s, z, C.sup, 8);
  const t = new THREE.TorusGeometry(0.14 * s, 0.08 * s, 6, 8, PI / 2);
  P.add('steel', t, C.sup, M(x, y + 0.6 * s, z + 0.14 * s, 0, ry + PI / 2, 0));
  P.add('rubber', new THREE.CircleGeometry(0.08 * s, 8), 0x080808, M(x, y + 0.74 * s, z + 0.141 * s + 0.14 * s, 0, ry));
}

// ===========================================================================
// Hero designs
// ===========================================================================
function newCtx() {
  const root = new THREE.Group();
  const rig = new THREE.Group(); // markers live directly under root
  return { root, P: new Parts(), sails: [], flags: [], turretCount: 0 };
}

function finishCtx(ctx, info) {
  const { root, P } = ctx;
  P.build(root);
  clothMesh(root, ctx.sails, 'sail', 'sails');
  clothMesh(root, ctx.flags, 'flag', 'flag');
  root.userData.info = info;
  return root;
}

// ---------------------------------------------------------------- frigate
function buildFrigate(ctx, { L = 14.6, scale = 1, masts = 3, creep = false } = {}) {
  const { root, P } = ctx;
  const B = L / 4.4;
  const hull = makeHull(P, {
    L, B, D: L * 0.09, F: L * 0.1, bulwark: L * 0.035, rail: 0.1 * (L / 14.6), sheerF: L * 0.06, sheerA: L * 0.07,
    transom: 0.62, bowP: 2.1, sternP: 2.8, uMax: 0.42, rake: 0.25, rakeCurve: 0.9, overhang: 0.28,
    flareBow: 0.15, flareMid: -0.1, nMid: 2.6, nBow: 1.5, nStern: 2.2, forefoot: 0.1, sternRise: 0.2,
    camber: 0.06, hullMat: 'wood', bottomColor: C.copper, deckMat: creep ? 'wood' : 'teak', deckColor: creep ? C.woodPale : 0xffffff,
    sideUV: [1 / 5, 1 / 4.2],
    bands: [
      { to: L * 0.012, color: 0x4a3a2c },
      { to: L * 0.038, color: 0xffffff },
      { to: L * 0.075, mat: 'team', color: 0xffffff },
      { to: L * 0.082, color: 0x3a2a1f },
      { to: -0.0001, color: 0x8a6a50 },
    ],
    railColor: 0x5a4030,
  });
  const k = L / 14.6;
  const IRON = creep ? 'wood' : 'iron', LAMP = creep ? 'wood' : 'lantern';
  const d0 = hull.deckAt(0);
  // gunports + broadside cannons
  const broadside = [];
  const ports = creep ? 3 : 6;
  const gy = L * 0.057;
  for (let i = 0; i < ports; i++) {
    const z = lerp(-L * 0.28, L * 0.28, ports === 1 ? 0.5 : i / (ports - 1));
    for (const side of [-1, 1]) {
      const sa = hull.sideAt(z, gy, side);
      const ang = Math.atan2(sa.n.x, sa.n.z);
      P.box(IRON, 0.42 * k, 0.36 * k, 0.1, sa.p.x + sa.n.x * 0.02, gy, sa.p.z + sa.n.z * 0.02, 0x101010, 0, ang);
      const tip = sa.p.clone().addScaledVector(sa.n, 0.55 * k);
      P.rod(creep ? 'wood' : 'iron', 0.08 * k, 0.07 * k, [sa.p.x - sa.n.x * 0.2, gy, sa.p.z - sa.n.z * 0.2], [tip.x, gy, tip.z], creep ? 0x303030 : C.ironBlack, 8);
      broadside.push(markerAt(root, 'broadside', tip.x + sa.n.x * 0.05, gy, tip.z + sa.n.z * 0.05, { side }));
      // open lid in team colour above port
      if (!creep) P.box('team', 0.44 * k, 0.05, 0.3 * k, sa.p.x + sa.n.x * 0.15, gy + 0.24 * k, sa.p.z + sa.n.z * 0.15, 0xffffff, 0, ang);
    }
  }
  // stern castle (quarterdeck)
  const zs = hull.zSternDeck;
  const qz0 = zs + 0.08, qz1 = zs + L * 0.24;
  const qh = L * 0.06;
  const qPlan = [];
  const N = 8;
  for (let i = 0; i <= N; i++) { const z = lerp(qz0, qz1, i / N); const d = hull.deckAt(z); qPlan.push([d.half + hull.spec.rail * 0.5, z]); }
  for (let i = N; i >= 0; i--) { const z = lerp(qz0, qz1, i / N); const d = hull.deckAt(z); qPlan.push([-(d.half + hull.spec.rail * 0.5), z]); }
  const qy0 = hull.deckAt(qz1).y - 0.05, qTop = hull.deckAt(qz0).y + qh;
  P.add('wood', prism(qPlan, qy0, null, qTop, { cap: false }), 0x8a6a50);
  P.add(creep ? 'wood' : 'teak', prism(scalePoly(qPlan, 0.97, 1, 0, 0), qTop - 0.02, null, qTop, { sides: false }), creep ? C.woodPale : 0xffffff);
  // castle rail + posts
  const railPlan = scalePoly(qPlan, 1, 1);
  for (let i = 0; i < railPlan.length - 1; i++) {
    if (i === N) continue; // skip front edge
    const a = railPlan[i], b = railPlan[i + 1];
    P.rod('wood', 0.04 * k, 0.04 * k, [a[0], qTop + 0.35 * k, a[1]], [b[0], qTop + 0.35 * k, b[1]], 0x4a3424, 5);
  }
  for (let i = 0; i < railPlan.length; i += 2) P.rod('wood', 0.03 * k, 0.03 * k, [railPlan[i][0], qTop, railPlan[i][1]], [railPlan[i][0], qTop + 0.35 * k, railPlan[i][1]], 0x4a3424, 4);
  // front bulkhead door + stairs
  P.box('wood', 0.5 * k, 0.6 * k, 0.05, 0, qy0 + 0.35 * k, qz1 + 0.02, 0x3a2a1c);
  // stern windows (glow) + gallery
  const sw = hull.deckAt(qz0).half * 1.6;
  const wz = hull.zAt(0, qTop - qh * 0.45) - 0.03;
  for (let i = 0; i < (creep ? 3 : 5); i++) {
    const n = creep ? 3 : 5;
    const x = (i - (n - 1) / 2) * (sw / n);
    P.box(LAMP, sw / n * 0.62, qh * 0.35, 0.06, x, qTop - qh * 0.45, wz - 0.02, 0xffffff);
    P.box('wood', sw / n * 0.12, qh * 0.5, 0.1, x + sw / n * 0.5, qTop - qh * 0.45, wz - 0.03, 0x3a2a1c);
  }
  P.box('wood', sw * 1.05, 0.08 * k, 0.4 * k, 0, qTop - qh * 0.8, wz - 0.2 * k, 0x5a4030);
  if (!creep) {
    // stern lanterns
    for (const [lx, ls] of [[0, 1.25], [-sw * 0.45, 1], [sw * 0.45, 1]]) {
      const lz = qz0 + 0.25;
      P.rod(IRON, 0.03, 0.03, [lx, qTop, lz], [lx, qTop + 0.7 * ls * k, lz], C.ironBlack, 5);
      P.add(LAMP, new THREE.OctahedronGeometry(0.17 * ls * k, 0), 0xffffff, M(lx, qTop + 0.85 * ls * k, lz, 0, 0, 0, 1, 1.4, 1));
      P.cyl('brass', 0.02, 0.12 * ls * k, 0.12 * k, lx, qTop + 1.07 * ls * k, lz, 0xffffff, 6);
    }
  } else {
    P.add(LAMP, new THREE.OctahedronGeometry(0.16 * k, 0), 0xffffff, M(0, qTop + 0.55 * k, qz0 + 0.2, 0, 0, 0, 1, 1.4, 1));
    P.rod('wood', 0.03, 0.03, [0, qTop, qz0 + 0.2], [0, qTop + 0.4 * k, qz0 + 0.2], 0x302018, 4);
  }
  // deck furniture
  const dy = (z) => hull.deckAt(z).y + hull.spec.camber;
  P.box('wood', 1.0 * k, 0.22 * k, 1.1 * k, 0, dy(L * 0.19) + 0.1 * k, L * 0.19, 0x5a4030); // grating hatch
  P.box(IRON, 0.8 * k, 0.05, 0.9 * k, 0, dy(L * 0.19) + 0.22 * k, L * 0.19, 0x1a1410);
  P.box('wood', 1.2 * k, 0.22 * k, 1.4 * k, 0, dy(-L * 0.12) + 0.1 * k, -L * 0.12, 0x5a4030);
  P.box(IRON, 1.0 * k, 0.05, 1.2 * k, 0, dy(-L * 0.12) + 0.22 * k, -L * 0.12, 0x1a1410);
  P.cyl('wood', 0.22 * k, 0.28 * k, 0.5 * k, 0, dy(-L * 0.2) + 0.25 * k, -L * 0.2, 0x6a4a34, 10); // capstan
  if (!creep) {
    boat(P, 0, dy(-L * 0.01), -L * 0.01 + 0.2, 2.1 * k, 0x6a4a34, 0, 'wood');
    // ship's wheel on the quarterdeck
    P.add('wood', new THREE.TorusGeometry(0.28, 0.04, 5, 12), 0x4a3020, M(0, qTop + 0.4, qz1 - 0.5));
    // deck carronades
    for (const side of [-1, 1]) for (const z of [L * 0.33, -L * 0.34]) {
      const d = hull.deckAt(z);
      const x = side * (d.half - 0.45 * k);
      const yy = z < -L * 0.2 ? qTop : dy(z);
      P.box('wood', 0.35 * k, 0.2 * k, 0.5 * k, x, yy + 0.1 * k, z, 0x5a4030);
      P.rod(IRON, 0.08 * k, 0.07 * k, [x, yy + 0.28 * k, z], [x + side * 0.7 * k, yy + 0.3 * k, z], C.ironBlack, 8);
    }
  }
  // --- masts, yards and sails
  const mastDefs = masts === 3
    ? [{ z: L * 0.27, h: L * 0.72, s: 0.9 }, { z: L * 0.02, h: L * 0.82, s: 1.0 }, { z: -L * 0.235, h: L * 0.6, s: 0.76, spanker: true }]
    : masts === 2
      ? [{ z: L * 0.2, h: L * 0.78, s: 0.95 }, { z: -L * 0.1, h: L * 0.82, s: 1.0, spanker: true }]
      : [{ z: L * 0.08, h: L * 0.9, s: 1.0, spanker: true }];
  const yardW = L * 0.46;
  const tops = [];
  for (const md of mastDefs) {
    const base = dy(md.z) - 0.05;
    const H = md.h;
    P.rod('wood', 0.17 * k, 0.1 * k, [0, base - 0.3, md.z], [0, base + H * 0.58, md.z], 0x6a4a34, 10);
    P.rod('wood', 0.1 * k, 0.05 * k, [0, base + H * 0.55, md.z], [0, base + H, md.z], 0x6a4a34, 8);
    // fighting top
    P.box('wood', 0.9 * k * md.s, 0.08, 0.7 * k * md.s, 0, base + H * 0.56, md.z - 0.05, 0x4a3424);
    P.box('wood', 0.5 * k * md.s, 0.05, 0.3 * k * md.s, 0, base + H * 0.84, md.z, 0x4a3424);
    const ys = [0.28, 0.54, 0.79].map((f) => base + H * f);
    const ws = [yardW * md.s, yardW * md.s * 0.8, yardW * md.s * 0.58];
    const sailFoot = [base + H * 0.07, ys[0] + 0.1, ys[1] + 0.1];
    const firstSquare = md.spanker ? 1 : 0;
    for (let yi = 0; yi < 3; yi++) {
      P.rod('wood', 0.07 * k, 0.07 * k, [-ws[yi] / 2, ys[yi], md.z + 0.12], [ws[yi] / 2, ys[yi], md.z + 0.12], 0x3a2a1c, 6);
      if (yi < firstSquare) continue;
      const topW = ws[yi] * 0.93, botW = yi === 0 ? ws[0] * 1.02 : ws[yi - 1] * 0.95;
      const hTop = ys[yi] - 0.05, hBot = sailFoot[yi];
      const crest = (!creep && md.s === 1.0 && yi === 0) || (creep && yi === firstSquare);
      const zc = md.z + 0.2;
      ctx.sails.push(sailPatch(
        new V3(-topW / 2, hTop, zc), new V3(topW / 2, hTop, zc),
        new V3(-botW / 2, hBot, zc + 0.15), new V3(botW / 2, hBot, zc + 0.15),
        new V3(0, 0, 1), 0.25 * k, 0.95 * k * (yi === 0 ? 1.1 : 0.9),
        crest ? [0.5, 0, 1, 1] : [0, 0, 0.5, 1], 8, 6));
    }
    if (md.spanker) {
      // gaff spanker aft of the mast
      const gy0 = base + H * 0.07, gy1 = base + H * 0.5;
      const aft = L * 0.2 * md.s;
      P.rod('wood', 0.06 * k, 0.05 * k, [0, gy0 + 0.4, md.z - 0.15], [0, gy0 + 0.35, md.z - aft - 0.3], 0x3a2a1c, 6); // boom
      P.rod('wood', 0.05 * k, 0.04 * k, [0, gy1, md.z - 0.15], [0, gy1 + 0.9 * k, md.z - aft], 0x3a2a1c, 6); // gaff
      ctx.sails.push(sailPatch(
        new V3(0, gy1 - 0.1, md.z - 0.2), new V3(0, gy1 + 0.8 * k, md.z - aft),
        new V3(0, gy0 + 0.5, md.z - 0.2), new V3(0, gy0 + 0.45, md.z - aft - 0.2),
        new V3(-1, 0, 0), 0.15 * k, 0.55 * k, [0.02, 0.05, 0.48, 0.95], 6, 6,
        (xn, yn, s) => Math.sin(PI * s) * Math.sin(PI * clamp(yn, 0, 1)) + 0.0));
    }
    // shrouds (tarred rope) to the chains
    const d = hull.deckAt(md.z);
    for (const side of [-1, 1]) for (const dz of [-0.35, 0, 0.35]) {
      P.rod('wood', 0.022 * k, 0.022 * k, [side * (d.outer + 0.1), d.top - 0.05, md.z + dz * k - 0.3], [side * 0.18 * k, base + H * 0.55, md.z - 0.05], C.rope, 3);
    }
    tops.push({ z: md.z, y: base + H, base, H });
  }
  // fore-and-aft stays between mast tops
  for (let i = 0; i < tops.length - 1; i++) {
    P.rod('wood', 0.025 * k, 0.025 * k, [0, tops[i + 1].y - 0.2, tops[i + 1].z], [0, tops[i].base + tops[i].H * 0.56, tops[i].z], C.rope, 3);
  }
  // bowsprit + jibs
  const bowZ = hull.zBowDeck;
  const bowY = hull.deckAt(bowZ - 0.3).y + 0.2;
  const tip = new V3(0, bowY + 1.3 * k, bowZ + 2.4 * k);
  P.rod('wood', 0.12 * k, 0.06 * k, [0, bowY - 0.25, bowZ - 1.4 * k], [tip.x, tip.y, tip.z], 0x4a3424, 8);
  P.add('wood', new THREE.ConeGeometry(0.2 * k, 0.8 * k, 8), 0xd8b070, M(0, bowY - 0.25 * k, bowZ + 0.05, 0.9, 0, 0)); // figurehead
  const fm = tops[0];
  P.rod('wood', 0.025 * k, 0.025 * k, [tip.x, tip.y, tip.z], [0, fm.base + fm.H * 0.8, fm.z], C.rope, 3);
  ctx.sails.push(sailPatch(
    new V3(0, fm.base + fm.H * 0.62, fm.z + 0.2), new V3(0, fm.base + fm.H * 0.62, fm.z + 0.2),
    new V3(0, bowY + 0.35, fm.z + 0.6 * k), new V3(0, tip.y - 0.05, tip.z - 0.15),
    new V3(1, 0, 0), 0.12 * k, 0.5 * k, [0.02, 0.05, 0.48, 0.95], 6, 6,
    (xn, yn, s) => Math.sin(PI * clamp(yn, 0, 1)) * Math.sin(PI * s) * yn));
  if (!creep) {
    ctx.sails.push(sailPatch(
      new V3(0, fm.base + fm.H * 0.52, fm.z + 0.25), new V3(0, fm.base + fm.H * 0.52, fm.z + 0.25),
      new V3(0, bowY + 0.3, fm.z + 0.4 * k), new V3(0, bowY + 0.75 * k, bowZ + 0.9 * k),
      new V3(-1, 0, 0), 0.1 * k, 0.4 * k, [0.02, 0.05, 0.48, 0.95], 6, 5,
      (xn, yn, s) => Math.sin(PI * clamp(yn, 0, 1)) * Math.sin(PI * s) * yn));
  }
  // flags: long pennant at main masthead + ensign on stern staff
  const mm = tops[Math.min(1, tops.length - 1)];
  ctx.flags.push(flagGeo(0, mm.y + 0.05, mm.z - 0.05, (creep ? 1.6 : 3.2) * k, 0.45 * k, 0.85, 0.12, 1.6));
  if (!creep) {
    P.rod('wood', 0.04, 0.03, [0, qTop, qz0 + 0.05], [0, qTop + 1.9 * k, qz0 - 0.35 * k], 0x4a3424, 5);
    ctx.flags.push(flagGeo(0, qTop + 1.85 * k, qz0 - 0.4 * k, 1.5 * k, 0.9 * k, 0, 0.14, 1.1));
  }
  // chase guns (turrets)
  const turrets = [];
  const tz = [L * 0.36, -L * 0.1];
  if (!creep) {
    turrets.push(turret(root, 0, { style: 'cannon', x: 0, y: dy(tz[0]), z: tz[0], w: 0.9 * k, l: 1.0 * k, n: 1, blen: 1.25 * k, br: 0.09 * k }));
    turrets.push(turret(root, 1, { style: 'cannon', x: 0, y: qTop, z: qz1 - 1.2 * k, ry: PI, w: 0.9 * k, l: 1.0 * k, n: 1, blen: 1.25 * k, br: 0.09 * k }));
  } else {
    turrets.push(turret(root, 0, { style: 'cannon', x: 0, y: dy(tz[0]), z: tz[0], w: 0.9 * k, l: 1.0 * k, n: 1, blen: 1.2 * k, br: 0.09 * k }));
  }
  markerAt(root, 'engine', 0, 0.05, hull.zSternWL - 0.1);
  markerAt(root, 'launch', 0, dy(0) + 0.5, L * 0.3);
  return { hull, length: L + 2.4 * k, beam: B, height: tops[Math.min(1, tops.length - 1)].y };
}

// ---------------------------------------------------------------- ironclad
function buildIronclad(ctx) {
  const { root, P } = ctx;
  const L = 17.2, B = 3.5;
  const hull = makeHull(P, {
    L, B, D: 1.5, F: 0.75, bulwark: 0.08, rail: 0.08, sheerF: 0.05, sheerA: 0.1, transom: 0.35, bowP: 1.5, sternP: 2.2,
    uMax: 0.48, rake: -0.35, overhang: 0.35, flareBow: 0.05, flareMid: 0.02, nMid: 3.6, nBow: 1.6, nStern: 2.4, forefoot: 0.05,
    ram: 0.9, camber: 0.03, hullMat: 'steel', bottomColor: C.red, deckMat: 'steel', deckColor: 0x4c4f52,
    bands: [{ to: 0.18, color: 0x202224 }, { to: 0.5, color: 0x33363a }, { to: -0.0001, mat: 'team', color: 0xffffff }],
    railColor: 0x2a2c2f, sideUV: [1 / 5, 1 / 5],
  });
  const dy = (z) => hull.deckAt(z).y;
  // casemate: sloped armoured box with chamfered ends
  const cz0 = -5.0, cz1 = 4.6, cw = 2.9;
  const cy0 = dy(0) - 0.02, ch = 1.5;
  const bot = [[-cw / 2, cz0 + 0.6], [-cw / 2 + 0.6, cz0], [cw / 2 - 0.6, cz0], [cw / 2, cz0 + 0.6], [cw / 2, cz1 - 1.0], [cw / 2 - 0.9, cz1], [-cw / 2 + 0.9, cz1], [-cw / 2, cz1 - 1.0]];
  const inset = ch / Math.tan(0.62);
  const tw = cw / 2 - inset * 0.5;
  const top = [[-tw, cz0 + 0.9], [-tw + 0.4, cz0 + 0.6], [tw - 0.4, cz0 + 0.6], [tw, cz0 + 0.9], [tw, cz1 - 1.3], [tw - 0.5, cz1 - 0.75], [-tw + 0.5, cz1 - 0.75], [-tw, cz1 - 1.3]];
  P.add('steel', prism(bot, cy0, top, cy0 + ch, { cap: false }), 0x3d4145);
  P.add('steel', prism(top, cy0 + ch - 0.01, null, cy0 + ch + 0.02, { sides: false }), 0x2a2c2f);
  // roof grating stripes
  for (let z = cz0 + 1.1; z < cz1 - 1.2; z += 0.45) P.box('iron', tw * 2 - 0.2, 0.04, 0.08, 0, cy0 + ch + 0.03, z, 0x1a1a1a);
  // gunports on sloped sides (broadside)
  const slope = Math.atan2(ch, inset * 0.5);
  for (const side of [-1, 1]) for (let i = 0; i < 4; i++) {
    const z = lerp(cz0 + 1.6, cz1 - 2.0, i / 3);
    const px = side * (cw / 2 - inset * 0.25), py = cy0 + ch * 0.5;
    P.box('iron', 0.1, 0.36, 0.5, px, py, z, 0x0a0a0a, 0, 0, side * (PI / 2 - slope));
    P.rod('iron', 0.1, 0.09, [px - side * 0.2, py, z], [px + side * 0.7, py - 0.06, z], C.ironBlack, 8);
    markerAt(root, 'broadside', px + side * 0.8, py - 0.06, z, { side });
  }
  // pilot house
  P.add('steel', prism(ngon(8, 0.45, 0, cz1 - 1.5, PI / 8), cy0 + ch, ngon(8, 0.38, 0, cz1 - 1.5, PI / 8), cy0 + ch + 0.55), 0x3d4145);
  P.add('brass', prism(ngon(8, 0.39, 0, cz1 - 1.5, PI / 8), cy0 + ch + 0.35, ngon(8, 0.39, 0, cz1 - 1.5, PI / 8), cy0 + ch + 0.45, { cap: false }), 0xffffff);
  P.add('steel', prism(ngon(8, 0.3, 0, cz1 - 1.5, PI / 8), cy0 + ch + 0.55, ngon(8, 0.05, 0, cz1 - 1.5, PI / 8), cy0 + ch + 0.75), 0x2a2c2f);
  // funnels
  const fy = cy0 + ch;
  funnel(P, root, { z: 0.6, y0: fy, h: 2.8, rx: 0.42, rz: 0.42, rake: 0.1, body: 0x2c2e31, cap: 0x121314 });
  funnel(P, root, { z: -1.6, y0: fy, h: 2.5, rx: 0.4, rz: 0.4, rake: 0.1, body: 0x2c2e31, cap: 0x121314 });
  // furnace vents: glowing grates between funnels
  for (const x of [-0.7, 0.7]) {
    P.box('iron', 0.5, 0.12, 1.2, x, fy + 0.08, -0.5, 0x1a1a1a);
    for (let i = 0; i < 4; i++) P.box('furnace', 0.36, 0.06, 0.14, x, fy + 0.13, -0.95 + i * 0.3, 0xffffff);
  }
  // ventilators, brass bell, boats
  ventCowl(P, 0.9, fy, 2.0, 1.0, 0); ventCowl(P, -0.9, fy, 2.0, 1.0, 0);
  P.sphere('brass', 0.12, 0, fy + 0.2, 2.6, 0xffffff, 8, 6);
  boat(P, 0, fy + 0.02, -3.4, 1.8, 0x7a6048, 0, 'steel');
  // fore + aft deck: bollards, anchor, hatches
  for (const z of [6.6, -6.4]) for (const x of [-0.8, 0.8]) P.cyl('iron', 0.1, 0.12, 0.25, x, dy(z) + 0.12, z, C.ironBlack, 8);
  P.box('iron', 0.8, 0.1, 0.6, 0, dy(5.8) + 0.05, 5.8, 0x252525);
  // mast with signal yard + flag
  poleMast(P, 0, fy, -3.0, 3.2, { r: 0.07, yard: 1.3, col: 0x2c2e31 });
  ctx.flags.push(flagGeo(0, fy + 3.1, -3.1, 1.1, 0.65, 0, 0.16));
  P.rod('steel', 0.04, 0.03, [0, dy(-8), -8.0], [0, dy(-8) + 1.6, -8.3], 0x2c2e31, 5);
  ctx.flags.push(flagGeo(0, dy(-8) + 1.55, -8.35, 1.0, 0.6, 0, 0.16));
  // team: air-recognition stripes on fore deck
  recognitionStripes(P, hull, 6.3, 2, 0.8, 0.3, 0.5);
  // pivot guns (turrets) fore and aft on casemate roof
  const t0 = turret(root, 0, { style: 'cannon', x: 0, y: fy + 0.02, z: cz1 - 2.4, w: 0.95, l: 1.1, n: 1, blen: 1.9, br: 0.13 });
  const t1 = turret(root, 1, { style: 'cannon', x: 0, y: fy + 0.02, z: cz0 + 1.3, ry: PI, w: 0.95, l: 1.1, n: 1, blen: 1.9, br: 0.13 });
  // running lights
  P.sphere('lantern', 0.1, 0.5, fy + 0.5, cz1 - 1.5, 0xffffff, 6, 4);
  P.sphere('lantern', 0.1, -0.5, fy + 0.5, cz1 - 1.5, 0xffffff, 6, 4);
  markerAt(root, 'engine', 0, 0.05, hull.zSternWL);
  markerAt(root, 'launch', 0, fy + 0.5, 0);
  return { hull, length: L + 0.6, beam: B, height: fy + 3.3 };
}

// ---------------------------------------------------------------- dreadnought
function steelBands(top = true, team = true, extra = 0) {
  const b = [{ to: 0.28, color: C.boot }, { to: team ? -0.5 - extra : -0.0001, color: C.hull }];
  if (team) { b.push({ to: -0.2, mat: 'team', color: 0xffffff }); b.push({ to: -0.0001, color: C.hull }); }
  return b;
}

function buildDreadnought(ctx) {
  const { root, P } = ctx;
  const L = 25.6, B = 4.6;
  const hull = makeHull(P, {
    L, B, D: 1.8, F: 1.7, bulwark: 0.12, rail: 0.06, sheerF: 0.7, sheerA: 0.1, transom: 0.3, bowP: 1.6, sternP: 2.3, uMax: 0.47,
    rake: 0.04, overhang: 0.55, flareBow: 0.22, flareMid: 0.0, nMid: 4.2, nBow: 1.4, nStern: 2.4, forefoot: 0.12,
    hullMat: 'steel', bottomColor: C.red, deckMat: 'teak', bands: steelBands(), railColor: C.hull,
  });
  const dy = (z) => hull.deckAt(z).y + hull.spec.camber;
  // barbettes + turrets
  const tdefs = [
    { z: 8.3, lift: 0, ry: 0 }, { z: 5.2, lift: 0.95, ry: 0 },
    { z: -6.6, lift: 0.95, ry: PI }, { z: -9.5, lift: 0, ry: PI },
  ];
  tdefs.forEach((t, i) => {
    const y = dy(t.z) + t.lift;
    P.cyl('steel', 1.08, 1.12, t.lift + 0.35, 0, dy(t.z) + (t.lift + 0.35) / 2 - 0.2, t.z, C.sup, 24);
    turret(root, i, { style: 'battle', x: 0, y: y + 0.15, z: t.z, ry: t.ry, w: 2.0, l: 2.5, h: 0.85, n: 2, blen: 4.0, br: 0.12, sp: 0.7 });
  });
  // forward superstructure + bridge
  const fz = 2.6, y0 = dy(fz);
  P.add('steel', block(2.8, 2.0, y0 - 0.05, y0 + 1.1, 0.4, 0.05, 0, fz), C.sup);
  P.add('steel', block(2.0, 1.3, y0 + 1.1, y0 + 1.9, 0.3, 0.05, 0, fz + 0.2), C.supLight);
  P.add('glass', block(2.02, 1.32, y0 + 1.55, y0 + 1.75, 0.3, 0, 0, fz + 0.2, { cap: false }), 0xffffff);
  P.box('steel', 3.4, 0.08, 0.5, 0, y0 + 1.9, fz + 0.5, C.sup); // bridge wings
  P.add('steel', prism(ngon(8, 0.55, 0, fz + 0.95, 0), y0 + 1.1, ngon(8, 0.5, 0, fz + 0.95, 0), y0 + 1.65), C.dark); // conning tower
  // tripod
  const tz = fz - 0.6, tb = y0 + 1.9, tt = y0 + 8.2;
  P.rod('steel', 0.14, 0.1, [0, tb - 1, tz], [0, tt, tz], C.sup, 8);
  P.rod('steel', 0.1, 0.07, [0.9, y0, tz - 1.4], [0, tt - 0.3, tz], C.sup, 6);
  P.rod('steel', 0.1, 0.07, [-0.9, y0, tz - 1.4], [0, tt - 0.3, tz], C.sup, 6);
  P.add('steel', block(1.2, 1.0, tt - 0.2, tt + 0.55, 0.25, 0.08, 0, tz), C.supLight);
  P.add('glass', block(1.22, 1.02, tt + 0.15, tt + 0.35, 0.25, 0, 0, tz, { cap: false }), 0xffffff);
  P.rod('steel', 0.06, 0.04, [0, tt + 0.55, tz], [0, tt + 3.0, tz], C.dark, 6);
  P.rod('steel', 0.04, 0.04, [-1.1, tt + 1.9, tz], [1.1, tt + 1.9, tz], C.dark, 5);
  P.sphere('lantern', 0.09, 0, tt + 3.05, tz, 0xffffff, 6, 4);
  ctx.flags.push(flagGeo(0, tt + 2.9, tz - 0.05, 1.3, 0.75, 0, 0.16));
  // midships deckhouse + funnels
  const mz = -1.0, my = dy(mz);
  P.add('steel', block(2.6, 5.0, my - 0.05, my + 0.9, 0.35, 0.03, 0, mz), C.sup);
  funnel(P, root, { z: 0.6, y0: my + 0.9, h: 3.8, rx: 0.55, rz: 0.85, rake: 0.05 });
  funnel(P, root, { z: -2.3, y0: my + 0.9, h: 3.5, rx: 0.55, rz: 0.85, rake: 0.05 });
  for (const x of [-1, 1]) for (const z of [-0.8, 1.6, -3.2]) ventCowl(P, x * 0.9, my + 0.9, z, 1.1, x > 0 ? 0 : PI);
  // boats + davits
  for (const x of [-1.55, 1.55]) {
    boat(P, x, dy(-1) + 0.2, -0.6, 1.9, C.white, 0, 'steel');
    boat(P, x, dy(-1) + 0.2, -2.8, 1.7, 0x6a5040, 0, 'steel');
  }
  // aft superstructure + mainmast
  const az = -4.4, ay = dy(az);
  P.add('steel', block(2.0, 1.6, ay - 0.05, ay + 1.0, 0.3, 0.05, 0, az), C.sup);
  P.add('steel', block(1.2, 0.9, ay + 1.0, ay + 1.5, 0.2, 0.05, 0, az), C.supLight);
  poleMast(P, 0, ay + 1.5, az + 0.2, 3.5, { r: 0.09, yard: 1.6, col: C.sup });
  // secondary guns in casemates
  for (const side of [-1, 1]) for (const z of [3.0, 0.8, -1.4, -3.6]) {
    const sa = hull.sideAt(z, hull.deckAt(z).y - 0.35, side);
    P.box('steel', 0.4, 0.4, 0.8, sa.p.x - side * 0.1, sa.p.y, z, C.hullDark);
    P.rod('steel', 0.05, 0.045, [sa.p.x, sa.p.y, z], [sa.p.x + side * 0.9, sa.p.y, z + 0.1], C.gun, 6);
  }
  // anchors + hawse
  for (const side of [-1, 1]) {
    const sa = hull.sideAt(10.8, hull.deckAt(10.8).y - 0.5, side);
    P.box('steel', 0.5, 0.5, 0.12, sa.p.x + side * 0.02, sa.p.y, sa.p.z, C.black, 0, Math.atan2(sa.n.x, sa.n.z));
  }
  P.box('steel', 0.6, 0.12, 1.4, 0, dy(10.3) + 0.06, 10.3, C.dark); // capstans / chain deck
  // team: stripes on the bow
  recognitionStripes(P, hull, 10.6, 2, 0.75, 0.3, 0.55);
  deckStripe(P, hull, -11.7, -10.6, 1.4, 0);
  markerAt(root, 'engine', -0.8, 0.05, hull.zSternWL + 0.4);
  markerAt(root, 'engine', 0.8, 0.05, hull.zSternWL + 0.4);
  markerAt(root, 'launch', 0, my + 1.2, -1);
  return { hull, length: L + 0.3, beam: B, height: tt + 3.1 };
}

// ---------------------------------------------------------------- torpedo cruiser
function buildTorpedo(ctx) {
  const { root, P } = ctx;
  const L = 21.4, B = 3.5;
  const hull = makeHull(P, {
    L, B, D: 1.2, F: 1.25, bulwark: 0.1, rail: 0.05, sheerF: 0.9, sheerA: 0.05, transom: 0.55, bowP: 1.45, sternP: 2.0, uMax: 0.5,
    rake: 0.75, rakeCurve: 0.4, overhang: 0.12, flareBow: 0.4, flareMid: 0.02, nMid: 3.4, nBow: 1.3, nStern: 3, forefoot: 0.3, sternRise: 0.25,
    hullMat: 'steel', bottomColor: C.red, deckMat: 'darksteel', deckColor: 0x505860, bands: steelBands(), railColor: 0x5e6872,
  });
  const dy = (z) => hull.deckAt(z).y + hull.spec.camber;
  const hullCol = 0x5e6872;
  // bridge
  const bz = 4.4, by = dy(bz);
  P.add('steel', block(2.0, 1.8, by - 0.05, by + 0.8, 0.5, 0.05, 0, bz), C.sup);
  P.add('steel', block(1.5, 1.1, by + 0.8, by + 1.45, 0.4, 0.12, 0, bz + 0.15), C.supLight);
  P.add('glass', block(1.44, 1.04, by + 1.1, by + 1.3, 0.38, 0, 0, bz + 0.15, { cap: false }), 0xffffff);
  P.box('steel', 2.6, 0.06, 0.4, 0, by + 0.82, bz + 0.5, C.sup);
  // raked mast with searchlight
  P.rod('steel', 0.08, 0.05, [0, by + 1.4, bz - 0.4], [0, by + 5.2, bz - 1.2], C.sup, 6);
  P.rod('steel', 0.04, 0.04, [-0.9, by + 3.8, bz - 0.9], [0.9, by + 3.8, bz - 0.9], C.dark, 5);
  P.sphere('lantern', 0.08, 0, by + 5.25, bz - 1.2, 0xffffff, 6, 4);
  ctx.flags.push(flagGeo(0, by + 4.9, bz - 1.25, 1.2, 0.65, 0, 0.18));
  // funnels (strongly raked)
  const my = dy(0);
  P.add('steel', block(1.6, 5.4, my - 0.05, my + 0.5, 0.3, 0.03, 0, 0.1), C.sup);
  funnel(P, root, { z: 1.3, y0: my + 0.5, h: 2.7, rx: 0.42, rz: 0.72, rake: 0.25 });
  funnel(P, root, { z: -1.1, y0: my + 0.5, h: 2.5, rx: 0.42, rz: 0.72, rake: 0.25 });
  // torpedo tube mounts (triple) - static, angled out
  for (const [z, ang] of [[-3.3, 0.55], [-5.4, -0.55]]) {
    const y = dy(z);
    P.cyl('steel', 0.55, 0.6, 0.18, 0, y + 0.09, z, C.dark, 14);
    for (let i = -1; i <= 1; i++) {
      const c = Math.cos(ang), s = Math.sin(ang), ox = i * 0.26;
      const a = [ox * c - 1.2 * s, y + 0.4, -ox * s - 1.2 * c], b = [ox * c + 1.3 * s, y + 0.4, -ox * s + 1.3 * c];
      P.rod('steel', 0.13, 0.13, [a[0], a[1], a[2] + z], [b[0], b[1], b[2] + z], C.sup, 10);
      P.add('steel', new THREE.CircleGeometry(0.1, 10), C.black, M(b[0] + s * 0.01, b[1], b[2] + z + c * 0.01, 0, ang));
    }
    P.box('steel', 0.6, 0.35, 0.5, 0, y + 0.35, z, C.supLight, 0, ang);
  }
  // aft deckhouse
  P.add('steel', block(1.4, 1.4, dy(-7.2) - 0.05, dy(-7.2) + 0.6, 0.3, 0.05, 0, -7.1), C.sup);
  // depth charge racks
  for (const x of [-0.9, 0.9]) for (let i = 0; i < 4; i++) P.cyl('rubber', 0.14, 0.14, 0.3, x, dy(-10) + 0.22, -9.3 - i * 0.32, 0x1a1a1a, 8, 0, 0, PI / 2);
  // team: long centreline stripe + bow chevrons
  deckStripe(P, hull, 6.6, 9.8, 0.5, 0);
  recognitionStripes(P, hull, 8.2, 2, 0.8, 0.28, 0.6);
  deckStripe(P, hull, -10.1, -8.3, 0.35, 0);
  // guns
  turret(root, 0, { style: 'gun', x: 0, y: dy(6.2) + 0.05, z: 6.2, w: 1.2, l: 1.5, h: 0.7, n: 1, blen: 2.3, br: 0.1 });
  const ay = dy(-8.3);
  turret(root, 1, { style: 'gun', x: 0, y: ay + 0.05, z: -8.3, ry: PI, w: 1.2, l: 1.5, h: 0.7, n: 1, blen: 2.3, br: 0.1 });
  // small AA
  aaMount(P, 0.95, my + 0.5, -2.4, 0, 0.8); aaMount(P, -0.95, my + 0.5, -2.4, 0, 0.8);
  for (const x of [-0.7, 0.7]) markerAt(root, 'engine', x, 0.05, hull.zSternWL + 0.3);
  markerAt(root, 'launch', 0, dy(-4.4) + 0.5, -4.4);
  return { hull, length: L + 0.9, beam: B, height: by + 5.2 };
}

// ---------------------------------------------------------------- battleship
function buildBattleship(ctx) {
  const { root, P } = ctx;
  const L = 29.4, B = 5.3;
  const hull = makeHull(P, {
    L, B, D: 2.1, F: 1.9, bulwark: 0.12, rail: 0.06, sheerF: 0.9, sheerA: 0.15, transom: 0.4, bowP: 1.35, sternP: 2.1, uMax: 0.5,
    rake: 0.35, rakeCurve: 0.25, overhang: 0.25, flareBow: 0.42, flareMid: 0.0, nMid: 4.5, nBow: 1.35, nStern: 2.6, forefoot: 0.18,
    hullMat: 'steel', bottomColor: C.red, deckMat: 'teak', bands: steelBands(), railColor: C.hull,
  });
  const dy = (z) => hull.deckAt(z).y + hull.spec.camber;
  const tdefs = [{ z: 9.4, lift: 0, ry: 0 }, { z: 5.9, lift: 1.2, ry: 0 }, { z: -9.3, lift: 0, ry: PI }];
  tdefs.forEach((t, i) => {
    const y = dy(t.z) + t.lift;
    P.cyl('steel', 1.4, 1.45, t.lift + 0.35, 0, dy(t.z) + (t.lift + 0.35) / 2 - 0.2, t.z, C.sup, 28);
    turret(root, i, { style: 'battle', x: 0, y: y + 0.15, z: t.z, ry: t.ry, w: 2.7, l: 3.2, h: 1.05, n: 3, blen: 5.0, br: 0.13, sp: 0.72 });
  });
  // tiered superstructure
  const y0 = dy(0);
  P.add('steel', block(3.6, 8.2, y0 - 0.05, y0 + 1.0, 0.8, 0.05, 0, -0.3), C.sup);
  P.add('steel', block(2.9, 6.0, y0 + 1.0, y0 + 1.9, 0.6, 0.05, 0, -0.1), C.sup);
  // forward tower
  const fz = 2.6;
  P.add('steel', prism(ngon(8, 1.1, 0, fz, PI / 8, 1, 1.05), y0 + 1.9, ngon(8, 1.0, 0, fz, PI / 8, 1, 1.0), y0 + 3.2), C.sup);
  P.add('steel', block(3.0, 1.6, y0 + 3.2, y0 + 3.6, 0.5, 0.0, 0, fz + 0.2), C.supLight); // bridge
  P.add('glass', block(2.2, 1.3, y0 + 3.6, y0 + 3.85, 0.4, 0.0, 0, fz + 0.2, { cap: false }), 0xffffff);
  P.add('steel', block(2.2, 1.3, y0 + 3.85, y0 + 4.05, 0.4, 0.0, 0, fz + 0.2), C.supLight);
  P.add('steel', prism(ngon(8, 0.8, 0, fz - 0.1, PI / 8), y0 + 4.05, ngon(8, 0.7, 0, fz - 0.1, PI / 8), y0 + 5.4), C.sup);
  P.add('steel', block(1.9, 1.0, y0 + 5.4, y0 + 5.75, 0.3, 0.0, 0, fz), C.supLight);
  P.add('glass', block(1.5, 0.8, y0 + 5.75, y0 + 5.95, 0.25, 0.0, 0, fz, { cap: false }), 0xffffff);
  P.add('steel', block(1.5, 0.8, y0 + 5.95, y0 + 6.15, 0.25, 0.0, 0, fz), C.supLight);
  // main director with rangefinder arms
  P.add('steel', block(1.0, 1.1, y0 + 6.15, y0 + 6.8, 0.2, 0.08, 0, fz), C.sup);
  P.box('steel', 2.2, 0.18, 0.22, 0, y0 + 6.55, fz - 0.2, C.dark);
  // tower mast + radar
  P.rod('steel', 0.1, 0.07, [0, y0 + 6.8, fz - 0.3], [0, y0 + 8.4, fz - 0.4], C.sup, 6);
  P.rod('steel', 0.05, 0.05, [-1.2, y0 + 7.8, fz - 0.4], [1.2, y0 + 7.8, fz - 0.4], C.dark, 5);
  radar(root, { x: 0, y: y0 + 8.4, z: fz - 0.4, style: 'bed', size: 1.0, speed: 1.8 });
  // funnel
  funnel(P, root, { z: -1.2, y0: y0 + 1.9, h: 3.3, rx: 0.8, rz: 1.25, rake: 0.08 });
  // aft tower + mainmast
  const az = -3.4;
  P.add('steel', prism(ngon(8, 0.65, 0, az, PI / 8), y0 + 1.9, ngon(8, 0.55, 0, az, PI / 8), y0 + 3.6), C.sup);
  P.add('steel', block(1.0, 0.9, y0 + 3.6, y0 + 4.1, 0.2, 0.08, 0, az), C.supLight);
  P.box('steel', 1.8, 0.16, 0.2, 0, y0 + 3.9, az - 0.2, C.dark);
  P.rod('steel', 0.08, 0.05, [0, y0 + 4.1, az], [0, y0 + 6.6, az - 0.3], C.sup, 6);
  P.rod('steel', 0.04, 0.04, [-1, y0 + 5.6, az - 0.2], [1, y0 + 5.6, az - 0.2], C.dark, 5);
  P.sphere('lantern', 0.08, 0, y0 + 6.65, az - 0.3, 0xffffff, 6, 4);
  ctx.flags.push(flagGeo(0, y0 + 6.4, az - 0.35, 1.4, 0.8, 0, 0.16));
  // secondary 5-inch twins (static) on deckhouse
  for (const side of [-1, 1]) for (const z of [2.2, -0.2, -2.6]) secMount(P, side * 1.55, y0 + 1.0, z, side > 0 ? PI / 2 - 0.2 : -PI / 2 + 0.2, 1.1);
  // AA quad mounts
  for (const side of [-1, 1]) {
    for (const z of [3.4, 0.9, -1.8, -4.0]) aaMount(P, side * 1.25, y0 + 1.9, z * 0.9, side > 0 ? 0.3 : -0.3, 0.8);
    for (const z of [-5.6, -6.6]) aaMount(P, side * (hull.deckAt(z).half - 0.6), dy(z), z, side > 0 ? 1.2 : -1.2, 0.8);
    aaMount(P, side * (hull.deckAt(11.8).half - 0.45), dy(11.8), 11.8, side > 0 ? 0.6 : -0.6, 0.7);
  }
  // catapult + floatplane at the stern
  const cz = -12.3, cy = dy(cz);
  P.cyl('steel', 0.3, 0.3, 0.3, 1.2, cy + 0.15, cz, C.dark, 10);
  P.box('steel', 0.3, 0.12, 3.2, 1.2, cy + 0.36, cz + 0.2, C.dark, 0, 0.4);
  plane(P, 1.1 + Math.sin(0.4) * 0.3, cy + 0.6, cz + 0.3, 0.4, 0.9, C.navy);
  P.box('steel', 0.3, 1.2, 0.3, -1.3, cy + 0.6, cz + 0.4, C.sup); P.rod('steel', 0.05, 0.05, [-1.3, cy + 1.2, cz + 0.4], [-0.2, cy + 2.2, cz - 0.4], C.dark, 5);
  // anchors + chain deck
  for (const side of [-1, 1]) {
    const sa = hull.sideAt(12.4, hull.deckAt(12.4).y - 0.6, side);
    P.box('steel', 0.55, 0.55, 0.12, sa.p.x + side * 0.02, sa.p.y, sa.p.z, C.black, 0, Math.atan2(sa.n.x, sa.n.z));
  }
  P.box('steel', 0.8, 0.1, 1.6, 0, dy(11.6) + 0.05, 11.6, C.dark);
  // team markings
  recognitionStripes(P, hull, 12.3, 2, 0.75, 0.3, 0.55);
  deckStripe(P, hull, -13.9, -12.9, 1.6, 0);
  for (const x of [-1.2, -0.4, 0.4, 1.2]) markerAt(root, 'engine', x, 0.05, hull.zSternWL + 0.5);
  markerAt(root, 'launch', 1.2, cy + 0.6, cz + 1.8);
  return { hull, length: L + 0.9, beam: B, height: y0 + 9.2 };
}

// ---------------------------------------------------------------- carrier
function buildCarrier(ctx) {
  const { root, P } = ctx;
  const L = 32.0, B = 4.9;
  const hull = makeHull(P, {
    L, B, D: 2.0, F: 2.3, bulwark: 0.0, sheerF: 0.35, sheerA: 0.1, transom: 0.62, bowP: 1.5, sternP: 2.2, uMax: 0.5,
    rake: 0.45, rakeCurve: 0.3, overhang: 0.55, flareBow: 0.45, flareMid: 0.05, nMid: 4.2, nBow: 1.3, nStern: 3, forefoot: 0.18,
    hullMat: 'steel', bottomColor: C.red, deckMat: 'steel', deckColor: C.deckSteel, bands: steelBands(true, false), camber: 0,
  });
  // hangar box
  const hy0 = 2.0, hy1 = 3.6;
  const hp = [];
  const N = 12;
  for (let i = 0; i <= N; i++) { const z = lerp(-14.2, 13.2, i / N); hp.push([Math.min(hull.deckAt(z).half, 2.55) - 0.05, z]); }
  for (let i = N; i >= 0; i--) { const z = lerp(-14.2, 13.2, i / N); hp.push([-(Math.min(hull.deckAt(z).half, 2.55) - 0.05), z]); }
  P.add('steel', prism(hp, hy0, null, hy1, { cap: false }), C.hull);
  // hangar openings (dark bays) along both sides
  for (const side of [-1, 1]) for (let i = 0; i < 6; i++) {
    const z = -10 + i * 3.8;
    if (side < 0 && z > -4 && z < 5) continue; // island side, closed
    P.box('rubber', 0.08, 0.9, 2.4, side * 2.52, (hy0 + hy1) / 2 + 0.05, z, 0x0e1012);
  }
  // flight deck slab (UV 0..1 across/along for the markings texture)
  const deckY = 3.8, T = 0.25;
  const zf0 = -16.4, zf1 = 16.4;
  const halfW = (z) => {
    const t = (z - zf0) / (zf1 - zf0);
    const bowTaper = t > 0.8 ? 1 - Math.pow((t - 0.8) / 0.2, 2) * 0.55 : 1;
    const sternTaper = t < 0.04 ? 0.92 + 0.08 * (t / 0.04) : 1;
    return 3.7 * bowTaper * sternTaper;
  };
  const outline = [];
  const NS = 24;
  for (let i = 0; i <= NS; i++) { const z = lerp(zf0, zf1, i / NS); outline.push([halfW(z), z]); }
  for (let i = NS; i >= 0; i--) { const z = lerp(zf0, zf1, i / NS); outline.push([-halfW(z), z]); }
  const deckG = prism(outline, deckY - T, null, deckY, { cap: true, base: true });
  { // remap top-face UVs
    const p = deckG.attributes.position, uv = deckG.attributes.uv, n = deckG.attributes.normal;
    for (let i = 0; i < p.count; i++) {
      if (n.getY(i) > 0.9) uv.setXY(i, (3.7 - p.getX(i)) / 7.4, (p.getZ(i) - zf0) / (zf1 - zf0));
      else uv.setXY(i, 0.02, 0.5);
    }
  }
  P.add('flightDeck', deckG, 0xffffff);
  // deck supports under the overhang
  for (let z = -14; z <= 14; z += 2.8) for (const side of [-1, 1]) {
    const hx = Math.min(hull.deckAt(z).half, 2.55);
    P.rod('steel', 0.06, 0.06, [side * (hx - 0.1), hy1 - 0.6, z], [side * (halfW(z) - 0.3), deckY - T, z], C.hullDark, 4);
  }
  // catwalks + AA tubs on the deck edges
  for (const side of [-1, 1]) {
    P.box('steel', 0.4, 0.08, 20, side * (3.7 + 0.2), deckY - 0.3, -2, C.dark);
    for (const z of [-12, -8, 7.5, 11]) aaMount(P, side * (3.7 + 0.35), deckY - 0.3, z, side > 0 ? 1.4 : -1.4, 0.75);
  }
  // island (starboard = -X)
  const ix = -3.05, iz = 1.0;
  P.add('steel', block(1.25, 6.4, deckY - 0.02, deckY + 1.3, 0.35, 0.05, ix, iz), C.sup);
  P.add('steel', block(1.1, 4.4, deckY + 1.3, deckY + 2.3, 0.3, 0.05, ix, iz + 0.8), C.sup);
  P.add('steel', block(1.3, 2.2, deckY + 2.3, deckY + 2.7, 0.3, 0.0, ix, iz + 1.8), C.supLight);
  P.add('glass', block(1.1, 2.0, deckY + 2.7, deckY + 2.95, 0.28, 0.0, ix, iz + 1.8, { cap: false }), 0xffffff);
  P.add('steel', block(1.1, 2.0, deckY + 2.95, deckY + 3.15, 0.28, 0.0, ix, iz + 1.8), C.supLight);
  P.add('steel', block(0.8, 1.0, deckY + 3.15, deckY + 3.7, 0.18, 0.06, ix, iz + 2.0), C.sup);
  funnel(P, root, { x: ix, z: iz - 0.8, y0: deckY + 2.3, h: 2.0, rx: 0.5, rz: 1.1, rake: 0.18 });
  // tripod mast + radar
  const mz = iz + 0.9, my = deckY + 3.15;
  P.rod('steel', 0.08, 0.06, [ix, my, mz], [ix, my + 3.6, mz], C.sup, 6);
  P.rod('steel', 0.06, 0.05, [ix + 0.45, my, mz - 0.6], [ix, my + 3.0, mz], C.sup, 5);
  P.rod('steel', 0.06, 0.05, [ix - 0.45, my, mz - 0.6], [ix, my + 3.0, mz], C.sup, 5);
  P.rod('steel', 0.04, 0.04, [ix - 1.1, my + 2.4, mz], [ix + 1.1, my + 2.4, mz], C.dark, 5);
  radar(root, { x: ix, y: my + 3.6, z: mz, style: 'bed', size: 1.1, speed: 1.6 });
  radar(root, { x: ix, y: my + 0.55, z: iz + 2.6, style: 'dish', size: 0.6, speed: -0.9 });
  ctx.flags.push(flagGeo(ix, my + 3.3, mz - 0.1, 1.3, 0.75, 0, 0.16));
  // parked aircraft (aft) + 2 at the catapults
  const planes = [[-1.9, -13.0], [-0.6, -13.2], [0.7, -13.0], [2.0, -13.2], [-1.3, -11.0], [0.0, -11.2], [1.3, -11.0], [2.2, -8.8], [1.0, -8.8]];
  planes.forEach(([x, z], i) => plane(P, x, deckY + 0.18, z, 0, 1.0, C.navy, i % 3 === 1));
  plane(P, -1.2, deckY + 0.18, 11.5, 0, 1.0, C.navy);
  // team deck markings: bow landing arrow + edge stripes
  const tm = (w, l, x, z, ry = 0) => P.box('team', w, 0.04, l, x, deckY + 0.02, z, 0xffffff, 0, ry);
  tm(0.35, 6, 3.35, -2); tm(0.35, 6, 2.95, -10.5);
  tm(0.35, 4.5, -3.35, -12); tm(0.35, 4, -3.35, 8.8);
  tm(0.5, 2.4, -0.55, 13.8, 0.6); tm(0.5, 2.4, 0.55, 13.8, -0.6);
  tm(0.5, 2.4, -0.55, 12.4, 0.6); tm(0.5, 2.4, 0.55, 12.4, -0.6);
  // deck edge lights
  for (let z = -15; z <= 15; z += 2.5) for (const side of [-1, 1]) P.box('lantern', 0.08, 0.05, 0.08, side * (halfW(z) - 0.1), deckY + 0.02, z, 0xffffff);
  // guns (twin 5-inch) at the island fore + aft
  turret(root, 0, { style: 'twin5', x: -3.0, y: deckY, z: iz + 4.4, w: 1.0, l: 1.3, h: 0.6, n: 2, blen: 1.7, br: 0.07, sp: 0.35 });
  turret(root, 1, { style: 'twin5', x: -3.0, y: deckY, z: iz - 3.9, ry: PI, w: 1.0, l: 1.3, h: 0.6, n: 2, blen: 1.7, br: 0.07, sp: 0.35 });
  for (const x of [-1.4, -0.5, 0.5, 1.4]) markerAt(root, 'engine', x, 0.05, hull.zSternWL + 0.8);
  markerAt(root, 'launch', 0.4, deckY + 0.4, 15.4);
  return { hull, length: 33.8, beam: 7.4, height: my + 4.2 };
}

// ---------------------------------------------------------------- arsenal cruiser
function buildArsenal(ctx) {
  const { root, P } = ctx;
  const L = 27.8, B = 5.4;
  const hull = makeHull(P, {
    L, B, D: 1.9, F: 1.9, bulwark: 0, sheerF: 0.05, sheerA: 0.0, transom: 0.7, bowP: 1.25, sternP: 2.6, uMax: 0.45,
    rake: -0.85, overhang: -0.25, flareBow: -0.1, flareMid: -0.22, nMid: 5, nBow: 1.2, nStern: 4, forefoot: 0.0, sternRise: 0.1,
    nu: 20, nLow: 3, rowStep: 1.0, camber: 0,
    hullMat: 'stealth', bottomColor: C.graphiteDark, deckMat: 'stealthDark', deckColor: C.graphiteDark,
    bands: [{ to: 0.12, mat: 'teamGlow', color: 0xffffff }, { to: -0.32, color: C.graphite }, { to: -0.22, mat: 'teamGlow', color: 0xffffff }, { to: -0.0001, color: C.graphite }],
    transomColor: C.graphite,
  });
  const dy = (z) => hull.deckAt(z).y;
  // faceted tumblehome deckhouse
  const y0 = dy(-2);
  const bot = [[-2.1, -8.2], [2.1, -8.2], [2.3, -6.8], [2.3, -0.2], [1.2, 2.3], [-1.2, 2.3], [-2.3, -0.2], [-2.3, -6.8]];
  const top = [[-1.4, -7.4], [1.4, -7.4], [1.55, -6.4], [1.55, -1.0], [0.8, 0.6], [-0.8, 0.6], [-1.55, -1.0], [-1.55, -6.4]];
  P.add('stealth', prism(bot, y0 - 0.05, top, y0 + 2.6), C.graphite);
  const top2b = [[-1.2, -5.6], [1.2, -5.6], [1.3, -1.4], [0.6, 0.1], [-0.6, 0.1], [-1.3, -1.4]];
  const top2t = [[-0.8, -5.0], [0.8, -5.0], [0.85, -1.8], [0.4, -0.8], [-0.4, -0.8], [-0.85, -1.8]];
  P.add('stealth', prism(top2b, y0 + 2.6, top2t, y0 + 4.0), C.graphite);
  // bridge glass band on upper tier
  P.add('glass', prism(scalePoly(top2b, 1.01, 1.01, 0, -2.5), y0 + 2.62, scalePoly(top2b, 0.9, 0.93, 0, -2.5), y0 + 3.0, { cap: false }), 0xffffff);
  // AESA panels + emissive seams
  for (const side of [-1, 1]) {
    P.box('stealthDark', 0.06, 1.2, 1.6, side * 1.93, y0 + 1.4, -3.2, C.graphiteDark, 0, 0, side * 0.29);
    P.box('teamGlow', 0.05, 0.05, 6.8, side * 2.29, y0 + 0.08, -3.4, 0xffffff);
    P.box('teamGlow', 0.05, 0.05, 5.6, side * 1.52, y0 + 2.58, -3.6, 0xffffff);
  }
  P.box('teamGlow', 2.4, 0.05, 0.05, 0, y0 + 0.08, 2.32, 0xffffff);
  // sensor mast
  P.add('stealth', prism(ngon(6, 0.5, 0, -3.2, 0), y0 + 4.0, ngon(6, 0.18, 0, -3.2, 0), y0 + 6.0), C.graphite);
  radar(root, { x: 0, y: y0 + 6.0, z: -3.2, style: 'ring', size: 1.0, speed: 2.4, mat: 'stealth', col: C.graphite });
  // VLS: forward 5x6 grid + aft 4x4
  const vls = (zc, nx, nz) => {
    const cell = 0.52, gap = 0.1, w = nx * (cell + gap), l = nz * (cell + gap);
    const yv = dy(zc);
    P.box('stealthDark', w + 0.3, 0.08, l + 0.3, 0, yv + 0.04, zc, C.graphiteDark);
    for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) {
      const x = (i - (nx - 1) / 2) * (cell + gap), z = zc + (j - (nz - 1) / 2) * (cell + gap);
      P.box('stealth', cell, 0.1, cell, x, yv + 0.12, z, (i + j) % 3 ? C.graphite : 0x4a5058);
    }
    for (let i = 0; i <= nx; i++) P.box('teamGlow', 0.03, 0.03, l, (i - nx / 2) * (cell + gap), yv + 0.1, zc, 0xffffff);
  };
  vls(5.6, 5, 6);
  vls(-10.2, 4, 3);
  // railgun (turret 0) forward, laser CIWS (turret 1) aft on the deckhouse
  turret(root, 0, { style: 'rail', x: 0, y: dy(9.6) + 0.05, z: 9.6, w: 2.3, l: 3.0, h: 0.95, blen: 5.6 });
  turret(root, 1, { style: 'laser', x: 0, y: y0 + 2.6, z: -6.6, ry: PI, w: 1.1, l: 1.2, h: 0.7, blen: 1.0, br: 0.08 });
  // team emissive bow chevrons
  const bd = dy(12);
  P.box('teamGlow', 1.6, 0.04, 0.14, -0.55, bd + 0.03, 12.2, 0xffffff, 0, 0.7);
  P.box('teamGlow', 1.6, 0.04, 0.14, 0.55, bd + 0.03, 12.2, 0xffffff, 0, -0.7);
  for (const x of [-1.3, 1.3]) markerAt(root, 'engine', x, 0.05, hull.zSternWL + 0.3);
  markerAt(root, 'launch', 0, dy(5.6) + 0.3, 5.6);
  return { hull, length: hull.zBowWL - hull.zSternWL, beam: B, height: y0 + 6.4 };
}

// ---------------------------------------------------------------- drone mothership
function buildMothership(ctx) {
  const { root, P } = ctx;
  const L = 34, B = 5.2;
  const hull = makeHull(P, {
    L, B, D: 2.0, F: 2.1, bulwark: 0, sheerF: 0.2, sheerA: 0.0, transom: 0.7, bowP: 1.3, sternP: 2.4, uMax: 0.45,
    rake: -0.6, overhang: -0.15, flareBow: 0.0, flareMid: -0.18, nMid: 5, nBow: 1.2, nStern: 4, forefoot: 0.0,
    nu: 20, nLow: 3, rowStep: 1.0, camber: 0,
    hullMat: 'stealth', bottomColor: C.graphiteDark, deckMat: 'stealthDark', deckColor: C.graphiteDark,
    bands: [{ to: 0.14, mat: 'teamGlow', color: 0xffffff }, { to: -0.0001, color: C.graphite }], transomColor: C.graphite,
  });
  // outrigger hulls
  for (const side of [-1, 1]) {
    const oP = new Parts();
    const oh = makeHull(oP, {
      L: 19, B: 1.5, D: 1.1, F: 1.6, bulwark: 0, sheerF: 0.1, sheerA: 0, transom: 0.6, bowP: 1.3, sternP: 2.4, uMax: 0.45,
      rake: -0.6, overhang: -0.1, flareBow: 0, flareMid: -0.15, nMid: 4, nBow: 1.2, nStern: 3, forefoot: 0, nu: 14, nLow: 2, rowStep: 1, camber: 0,
      hullMat: 'stealth', bottomColor: C.graphiteDark, deckMat: 'stealthDark', deckColor: C.graphiteDark, bands: [{ to: 0.12, mat: 'teamGlow', color: 0xffffff }, { to: -0.0001, color: C.graphite }], transomColor: C.graphite,
    });
    const m = M(side * 5.3, 0, -4);
    for (const [mt, list] of oP.map) for (const g of list) { g.applyMatrix4(m); P.addRaw(mt, g); }
    markerAt(root, 'engine', side * 5.3, 0.05, -4 + oh.zSternWL + 0.2);
  }
  // wing deck joining the hulls
  const wy = 2.05;
  const wing = [[-6.1, -12.8], [6.1, -12.8], [6.1, 3.5], [3.8, 7.5], [-3.8, 7.5], [-6.1, 3.5]];
  const wingTop = scalePoly(wing, 0.98, 0.98, 0, -2.6);
  P.add('stealth', prism(scalePoly(wing, 0.92, 0.95, 0, -2.6), wy - 0.9, wing, wy - 0.2, { cap: false, base: true }), C.graphite);
  P.add('stealthDark', prism(wing, wy - 0.2, wingTop, wy + 0.15, { cap: true }), C.graphiteDark);
  P.add('teamGlow', prism(wing, wy - 0.26, null, wy - 0.18, { cap: false }), 0xffffff);
  // central hive: faceted hexagonal hangar with glowing bays
  const hz = -3.5, hb = wy + 0.15;
  const hexB = ngon(6, 1, 0, hz, PI / 6, 3.6, 7.2);
  const hexT = ngon(6, 1, 0, hz, PI / 6, 2.6, 5.8);
  P.add('stealth', prism(hexB, hb, hexT, hb + 2.9), C.graphite);
  const hexT2 = ngon(6, 1, 0, hz - 0.3, PI / 6, 1.7, 3.6);
  P.add('stealth', prism(scalePoly(hexT, 0.92, 0.95, 0, hz), hb + 2.9, hexT2, hb + 4.1), 0x4a5058);
  // hangar bay doors (glowing) on the long faces
  for (const side of [-1, 1]) for (let i = 0; i < 3; i++) {
    const z = hz - 3.2 + i * 3.2;
    const x = side * 3.2;
    const tilt = side * 0.34;
    P.box('stealthDark', 0.1, 1.9, 2.4, x + side * 0.02, hb + 1.2, z, C.graphiteDark, 0, 0, tilt);
    P.box('teamPulse', 0.06, 1.5, 2.0, x + side * 0.08, hb + 1.2, z, 0xffffff, 0, 0, tilt);
  }
  // front + rear bay (large)
  P.box('teamPulse', 2.6, 1.4, 0.06, 0, hb + 1.0, hz + 6.9, 0xffffff, -0.33, 0, 0);
  P.box('teamPulse', 2.6, 1.4, 0.06, 0, hb + 1.0, hz - 6.9, 0xffffff, 0.33, 0, 0);
  // hive roof: launch deck with glowing ring pad
  const ry = hb + 4.1;
  P.add('teamGlow', new THREE.RingGeometry(0.9, 1.05, 24), 0xffffff, M(0, ry + 0.02, hz - 0.3, -PI / 2));
  P.add('teamGlow', new THREE.RingGeometry(0.3, 0.38, 16), 0xffffff, M(0, ry + 0.02, hz - 0.3, -PI / 2));
  // spire + spinning halo rings
  const sz = hz - 0.3;
  const rings = new THREE.Object3D();
  rings.position.set(0, ry, sz);
  rings.userData.rig = 'spin'; rings.userData.speed = 0.6;
  const rP = new Parts();
  rP.add('teamPulse', new THREE.TorusGeometry(2.2, 0.08, 6, 36), 0xffffff, M(0, 1.2, 0, PI / 2));
  rP.add('teamPulse', new THREE.TorusGeometry(1.6, 0.07, 6, 30), 0xffffff, M(0, 2.1, 0, PI / 2 + 0.25));
  for (let i = 0; i < 6; i++) { const a = i * PI / 3; rP.add('stealth', new THREE.BoxGeometry(0.14, 0.14, 0.5), C.graphite, M(Math.cos(a) * 2.2, 1.2, Math.sin(a) * 2.2, 0, -a)); }
  rP.build(rings);
  root.add(rings);
  // antenna array aft
  const ay = wy + 0.15;
  const ants = [[-1.8, -10.5, 4.2], [-0.6, -11.3, 5.2], [0.6, -11.3, 5.0], [1.8, -10.5, 4.0], [0, -9.4, 3.4], [-3.4, -11.8, 2.6], [3.4, -11.8, 2.6]];
  for (const [x, z, h] of ants) {
    P.rod('stealth', 0.09, 0.04, [x, ay, z], [x, ay + h, z], C.graphite, 5);
    P.sphere('teamGlow', 0.11, x, ay + h + 0.08, z, 0xffffff, 6, 4);
    P.rod('stealth', 0.03, 0.03, [x - 0.4, ay + h * 0.7, z], [x + 0.4, ay + h * 0.7, z], C.graphiteDark, 4);
  }
  P.add('stealth', prism(ngon(6, 0.8, 0, -10.6, 0), ay, ngon(6, 0.6, 0, -10.6, 0), ay + 0.5), C.graphiteDark);
  const dish = new THREE.SphereGeometry(0.9, 12, 6, 0, PI * 2, 0, PI * 0.3);
  P.add('stealth', dish, C.graphite, M(2.6, ay + 1.3, -8.8, 0.5, 0.6, 0));
  P.rod('stealth', 0.08, 0.08, [2.6, ay, -8.8], [2.6, ay + 1.1, -8.8], C.graphite, 5);
  // drone racks on the wing deck (rows of parked drones on glowing pads)
  for (const side of [-1, 1]) for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) {
    const x = side * (4.3 + r * 1.0), z = -10.0 + i * 2.2;
    P.box('stealthDark', 0.8, 0.06, 0.8, x, wy + 0.18, z, 0x30353b);
    P.add('teamGlow', new THREE.RingGeometry(0.3, 0.36, 12), 0xffffff, M(x, wy + 0.22, z, -PI / 2));
    // little quad drone
    P.box('stealth', 0.5, 0.1, 0.12, x, wy + 0.3, z, 0x5a6068, 0, PI / 4);
    P.box('stealth', 0.5, 0.1, 0.12, x, wy + 0.3, z, 0x5a6068, 0, -PI / 4);
    P.box('stealth', 0.18, 0.14, 0.18, x, wy + 0.32, z, 0x7a8088);
  }
  // bow: forward deck + laser turret
  const bd = hull.deckAt(11).y;
  P.add('teamGlow', prism([[-0.1, 7.6], [0.1, 7.6], [0.1, 15.5], [-0.1, 15.5]], bd + 0.0, null, bd + 0.04, { sides: false }), 0xffffff);
  turret(root, 0, { style: 'laser', x: 0, y: hull.deckAt(11.5).y + 0.05, z: 11.5, w: 1.6, l: 1.6, h: 0.9, blen: 1.4, br: 0.1 });
  turret(root, 1, { style: 'laser', x: 0, y: ry, z: hz - 4.6, ry: PI, w: 1.2, l: 1.2, h: 0.7, blen: 1.0, br: 0.08 });
  for (const x of [-1.2, 1.2]) markerAt(root, 'engine', x, 0.05, hull.zSternWL + 0.2);
  markerAt(root, 'launch', 0, ry + 0.4, sz);
  return { hull, length: hull.zBowWL - Math.min(hull.zSternWL, -4 - 9.5), beam: 12.4, height: ry + 3 };
}

// ===========================================================================
// Creeps (<= 4 draw calls each)
// ===========================================================================
function buildCreepSail(ctx, heavy) {
  const L = heavy ? 9.4 : 6.9;
  const info = buildFrigate(ctx, { L, masts: heavy ? 2 : 1, creep: true });
  // creeps: flags are static team pennants merged into 'team' (no flag mesh)
  return info;
}

function buildCreepSteam(ctx, heavy) {
  const { root, P } = ctx;
  const L = heavy ? 10.6 : 7.8, B = L / 4.6;
  const hull = makeHull(P, {
    L, B, D: L * 0.08, F: L * 0.07, bulwark: 0.12, rail: 0.06, sheerF: L * 0.02, sheerA: L * 0.03, transom: 0.4, bowP: 1.6, sternP: 2.2,
    uMax: 0.45, rake: 0.05, overhang: 0.45, flareBow: 0.1, nMid: 3, nBow: 1.5, forefoot: 0.1, nu: 30, nLow: 5,
    hullMat: 'steel', bottomColor: C.red, deckMat: 'steel', deckColor: 0xa08058,
    bands: [{ to: 0.1, color: C.boot }, { to: -0.25, color: 0x25272a }, { to: -0.0001, mat: 'team', color: 0xffffff }], railColor: 0x25272a,
  });
  const dy = (z) => hull.deckAt(z).y + hull.spec.camber;
  const k = L / 7.8;
  // deckhouse + wheelhouse (buff / white)
  P.add('steel', block(1.1 * k, 2.0 * k, dy(-0.3) - 0.05, dy(-0.3) + 0.5 * k, 0.2, 0.03, 0, -0.3 * k), C.white);
  P.add('steel', block(0.8 * k, 0.7 * k, dy(0.6) + 0.5 * k, dy(0.6) + 0.95 * k, 0.12, 0.03, 0, 0.4 * k), C.white);
  P.box('steel', 0.82 * k, 0.12 * k, 0.72 * k, 0, dy(0.6) + 0.8 * k, 0.4 * k, 0x1a2530);
  const fy = dy(-0.3) + 0.5 * k;
  const stacks = heavy ? [-0.5, -1.4] : [-0.8];
  for (const z of stacks) funnel(P, root, { z: z * k, y0: fy, h: 1.6 * k, rx: 0.2 * k, rz: 0.2 * k, rake: 0.1, body: C.buff, cap: C.black });
  // furnace glow grates
  for (const z of stacks) P.box('furnace', 0.26 * k, 0.05, 0.2 * k, 0.4 * k, fy + 0.02, z * k, 0xffffff);
  // mast
  P.rod('steel', 0.04 * k, 0.03 * k, [0, fy, 0.9 * k], [0, fy + 2.3 * k, 0.9 * k], 0x2a2c2f, 5);
  P.rod('steel', 0.025 * k, 0.025 * k, [-0.4 * k, fy + 1.7 * k, 0.9 * k], [0.4 * k, fy + 1.7 * k, 0.9 * k], 0x2a2c2f, 4);
  P.add('team', flagGeoStatic(0, fy + 2.2 * k, 0.85 * k, 0.8 * k, 0.45 * k), 0xffffff);
  // stern awning
  P.box('steel', 0.9 * k, 0.04, 1.0 * k, 0, dy(-2.6 * k) + 0.7 * k, -2.6 * k, C.white);
  for (const x of [-0.4, 0.4]) for (const z of [-2.2, -3.0]) P.rod('steel', 0.02, 0.02, [x * k, dy(z * k), z * k], [x * k, dy(z * k) + 0.7 * k, z * k], 0x2a2c2f, 3);
  turret(root, 0, { style: 'cannon', x: 0, y: dy(2.4 * k), z: 2.4 * k, w: 0.8 * k, l: 0.9 * k, n: 1, blen: 1.2 * k, br: 0.09 * k });
  markerAt(root, 'engine', 0, 0.05, hull.zSternWL);
  markerAt(root, 'launch', 0, fy, 0);
  return { hull, length: L + 0.3, beam: B, height: fy + 2.3 * k };
}

// static waving-shaped flag for creeps (no morph)
function flagGeoStatic(x, y, z, len, h) {
  const g = flagGeo(x, y, z, len, h, 0.2, 0.12, 1.2);
  const p = g.attributes.position.array, m = g.morphAttributes.position[0].array;
  for (let i = 0; i < p.length; i++) p[i] += m[i] * 0.8;
  g.morphAttributes = {};
  g.computeVertexNormals();
  const out = g.toNonIndexed();
  // double-sided: add a reversed copy
  const back = mirrorBack(out);
  return mergeGeometries([prep(out), prep(back)]);
}
function mirrorBack(g) {
  const b = g.clone();
  const n = b.attributes.normal.array;
  for (let i = 0; i < n.length; i++) n[i] = -n[i];
  for (const key of Object.keys(b.attributes)) {
    const a = b.attributes[key], s = a.itemSize, arr = a.array;
    for (let t = 0; t < a.count; t += 3) for (let k = 0; k < s; k++) {
      const i1 = (t + 1) * s + k, i2 = (t + 2) * s + k; const tmp = arr[i1]; arr[i1] = arr[i2]; arr[i2] = tmp;
    }
  }
  return b;
}

function buildCreepDestroyer(ctx, heavy) {
  const { root, P } = ctx;
  const L = heavy ? 11 : 8, B = L / 5.4;
  const k = L / 8;
  const hull = makeHull(P, {
    L, B, D: 0.6 * k, F: 0.62 * k, bulwark: 0.06, rail: 0.04, sheerF: 0.45 * k, sheerA: 0.02, transom: 0.55, bowP: 1.45, sternP: 2,
    uMax: 0.5, rake: 0.6, rakeCurve: 0.3, overhang: 0.1, flareBow: 0.35, nMid: 3.4, nBow: 1.3, forefoot: 0.3, nu: 30, nLow: 5, rowStep: 0.5,
    hullMat: 'steel', bottomColor: C.red, deckMat: 'steel', deckColor: C.deckSteel,
    bands: [{ to: 0.12, color: C.boot }, { to: -0.2, color: C.hull }, { to: -0.0001, mat: 'team', color: 0xffffff }], railColor: C.hull,
  });
  const dy = (z) => hull.deckAt(z).y + hull.spec.camber;
  const bz = 1.6 * k;
  P.add('steel', block(0.95 * k, 1.1 * k, dy(bz) - 0.05, dy(bz) + 0.45 * k, 0.25 * k, 0.03, 0, bz), C.sup);
  P.add('steel', block(0.75 * k, 0.6 * k, dy(bz) + 0.45 * k, dy(bz) + 0.8 * k, 0.2 * k, 0.05, 0, bz + 0.1 * k), C.supLight);
  P.add('glass', block(0.72 * k, 0.56 * k, dy(bz) + 0.6 * k, dy(bz) + 0.72 * k, 0.19 * k, 0, 0, bz + 0.1 * k, { cap: false }), 0xffffff);
  P.rod('steel', 0.04 * k, 0.03 * k, [0, dy(bz) + 0.8 * k, bz - 0.2 * k], [0, dy(bz) + 2.6 * k, bz - 0.5 * k], C.sup, 5);
  P.rod('steel', 0.02 * k, 0.02 * k, [-0.4 * k, dy(bz) + 2.0 * k, bz - 0.4 * k], [0.4 * k, dy(bz) + 2.0 * k, bz - 0.4 * k], C.dark, 4);
  const fy = dy(0) + 0.05;
  P.add('steel', block(0.8 * k, 2.6 * k, fy - 0.1, fy + 0.25 * k, 0.15 * k, 0.02, 0, -0.4 * k), C.sup);
  const stacks = heavy ? [0.3, -0.9] : [-0.2];
  for (const z of stacks) funnel(P, root, { z: z * k, y0: fy + 0.25 * k, h: 1.2 * k, rx: 0.2 * k, rz: 0.34 * k, rake: 0.18 });
  // torpedo tubes
  const tz = -1.9 * k, ty = dy(tz);
  for (let i = -1; i <= 1; i++) P.rod('steel', 0.07 * k, 0.07 * k, [i * 0.15 * k - 0.4 * k, ty + 0.18 * k, tz - 0.6 * k], [i * 0.15 * k + 0.4 * k, ty + 0.18 * k, tz + 0.6 * k], C.sup, 6);
  P.cyl('steel', 0.3 * k, 0.32 * k, 0.1 * k, 0, ty + 0.05 * k, tz, C.dark, 10);
  if (heavy) turret(root, 0, { style: 'gun', x: 0, y: dy(2.6 * k), z: 2.6 * k, w: 0.8 * k, l: 1.0 * k, h: 0.45 * k, n: 2, blen: 1.3 * k, br: 0.05 * k, sp: 0.2 * k, teamRoof: false });
  else turret(root, 0, { style: 'gun', x: 0, y: dy(2.6 * k), z: 2.6 * k, w: 0.7 * k, l: 0.9 * k, h: 0.42 * k, n: 1, blen: 1.2 * k, br: 0.06 * k, teamRoof: false });
  deckStripe(P, hull, -3.3 * k, -2.6 * k, 0.7 * k, 0);
  recognitionStripes(P, hull, 3.3 * k, 1, 0.5, 0.2 * k, 0.6);
  markerAt(root, 'engine', 0, 0.05, hull.zSternWL);
  markerAt(root, 'launch', 0, fy + 0.4, -1.2 * k);
  return { hull, length: L + 0.4 * k, beam: B, height: dy(bz) + 2.6 * k };
}

function buildCreepMissile(ctx, heavy) {
  const { root, P } = ctx;
  const L = heavy ? 11 : 8, B = L / 5.0;
  const k = L / 8;
  const hull = makeHull(P, {
    L, B, D: 0.5 * k, F: 0.6 * k, bulwark: 0.05, rail: 0.04, sheerF: 0.25 * k, sheerA: 0.0, transom: 0.72, bowP: 1.35, sternP: 2.4,
    uMax: 0.45, rake: 0.8, rakeCurve: 0.2, overhang: 0.0, flareBow: 0.35, flareMid: 0.05, nMid: 3, nBow: 1.2, forefoot: 0.35, sternRise: 0.4, nu: 28, nLow: 5, rowStep: 0.5,
    hullMat: 'steel', bottomColor: C.red, deckMat: 'steel', deckColor: 0x5a6068,
    bands: [{ to: 0.08, color: C.boot }, { to: -0.18, color: 0x6c757e }, { to: -0.0001, mat: 'team', color: 0xffffff }], railColor: 0x6c757e,
  });
  const dy = (z) => hull.deckAt(z).y + hull.spec.camber;
  const sz = 0.6 * k, sy = dy(sz);
  const sb = [[-0.7 * k, -1.2 * k], [0.7 * k, -1.2 * k], [0.75 * k, 0.5 * k], [0.4 * k, 1.4 * k], [-0.4 * k, 1.4 * k], [-0.75 * k, 0.5 * k]];
  const st = scalePoly(sb, 0.8, 0.82, 0, 0);
  P.add('steel', prism(sb, sy - 0.05, st, sy + 0.55 * k), 0x8f98a0);
  P.add('steel', prism(scalePoly(st, 0.98, 0.98), sy + 0.28 * k, scalePoly(st, 0.93, 0.93), sy + 0.42 * k, { cap: false }), 0x10181f);
  P.add('steel', prism(scalePoly(st, 0.7, 0.6, 0, -0.3 * k), sy + 0.55 * k, scalePoly(st, 0.4, 0.4, 0, -0.3 * k), sy + 1.3 * k), 0x8f98a0);
  // missile canisters aft (angled boxes)
  for (const side of [-1, 1]) for (let i = 0; i < (heavy ? 2 : 1); i++) {
    const z = -1.9 * k - i * 0.7 * k;
    P.add('steel', new RoundedBoxGeometry(0.34 * k, 0.34 * k, 1.5 * k, 1, 0.04), 0xa5adb4, M(side * 0.34 * k, dy(z) + 0.35 * k, z, -0.25, side * 0.15, 0));
    P.add('steel', new THREE.CircleGeometry(0.12 * k, 8), C.black, M(side * 0.34 * k + side * 0.11 * k, dy(z) + 0.53 * k, z + 0.73 * k, -0.25, side * 0.15));
  }
  // team deck marking
  deckStripe(P, hull, 2.0 * k, 3.4 * k, 0.28 * k, 0);
  radar(root, { x: 0, y: sy + 1.3 * k, z: 0.2 * k, style: 'bar', size: 0.6 * k, speed: 3 });
  turret(root, 0, { style: 'gun', x: 0, y: dy(2.4 * k), z: 2.4 * k, w: 0.6 * k, l: 0.75 * k, h: 0.38 * k, n: 1, blen: 0.9 * k, br: 0.05 * k, teamRoof: false });
  for (const x of [-0.4, 0.4]) markerAt(root, 'engine', x * k, 0.05, hull.zSternWL);
  markerAt(root, 'launch', 0, dy(-2 * k) + 0.6 * k, -2 * k);
  return { hull, length: L + 0.5 * k, beam: B, height: sy + 1.8 * k };
}

function buildCreepUSV(ctx, heavy) {
  const { root, P } = ctx;
  const L = heavy ? 11 : 8, B = L / 4.8;
  const k = L / 8;
  const hull = makeHull(P, {
    L, B, D: 0.45 * k, F: 0.55 * k, bulwark: 0, sheerF: 0.05, sheerA: 0.0, transom: 0.75, bowP: 1.2, sternP: 3,
    uMax: 0.42, rake: -0.35, overhang: -0.1, flareBow: 0, flareMid: -0.25, nMid: 5, nBow: 1.2, nStern: 4, forefoot: 0, nu: 14, nLow: 2, rowStep: 1, camber: 0,
    hullMat: 'stealth', bottomColor: C.graphiteDark, deckMat: 'stealth', deckColor: 0x30353a,
    bands: [{ to: 0.07, mat: 'teamGlow', color: 0xffffff }, { to: -0.12, color: C.graphite }, { to: -0.06, mat: 'teamGlow', color: 0xffffff }, { to: -0.0001, color: C.graphite }], transomColor: C.graphite,
  });
  const dy = (z) => hull.deckAt(z).y;
  // faceted sensor pod
  const pz = -0.3 * k, py = dy(pz);
  const pb = [[-0.65 * k, -1.4 * k], [0.65 * k, -1.4 * k], [0.7 * k, 0.4 * k], [0, 1.4 * k], [-0.7 * k, 0.4 * k]];
  const pt = [[-0.35 * k, -1.1 * k], [0.35 * k, -1.1 * k], [0.38 * k, 0.1 * k], [0, 0.6 * k], [-0.38 * k, 0.1 * k]];
  P.add('stealth', prism(pb, py - 0.05, pt, py + 0.55 * k), 0x4a5058);
  P.add('teamGlow', prism(scalePoly(pt, 0.6, 0.6, 0, -0.3 * k), py + 0.55 * k, null, py + 0.58 * k, { sides: false }), 0xffffff);
  P.add('teamGlow', new THREE.BoxGeometry(0.9 * k, 0.05 * k, 0.05 * k), 0xffffff, M(0, py + 0.3 * k, 0.72 * k, 0, 0, 0));
  P.add('stealth', prism(ngon(5, 0.12 * k, 0, -0.8 * k), py + 0.55 * k, ngon(5, 0.05 * k, 0, -0.8 * k), py + 1.4 * k), C.graphite);
  P.sphere('teamGlow', 0.07 * k, 0, py + 1.45 * k, -0.8 * k, 0xffffff, 6, 4);
  // bow chevrons
  const bd = dy(2.4 * k);
  P.box('teamGlow', 0.8 * k, 0.03, 0.08 * k, -0.25 * k, bd + 0.02, 2.4 * k, 0xffffff, 0, 0.7);
  P.box('teamGlow', 0.8 * k, 0.03, 0.08 * k, 0.25 * k, bd + 0.02, 2.4 * k, 0xffffff, 0, -0.7);
  // waterjet housings
  for (const x of [-0.45, 0.45]) P.box('stealth', 0.3 * k, 0.3 * k, 0.5 * k, x * k, 0.12 * k, hull.zSternWL + 0.1, C.graphiteDark);
  turret(root, 0, { style: 'laser', x: 0, y: dy(1.8 * k), z: 1.8 * k, w: 0.62 * k, l: 0.7 * k, h: 0.38 * k, blen: 0.6 * k, br: 0.045 * k });
  for (const x of [-0.45, 0.45]) markerAt(root, 'engine', x * k, 0.05, hull.zSternWL - 0.1);
  markerAt(root, 'launch', 0, py + 0.8 * k, pz);
  return { hull, length: hull.zBowWL - hull.zSternWL, beam: B, height: py + 1.5 * k };
}

// ===========================================================================
// Templates + rig assembly
// ===========================================================================
const HERO_BUILDERS = {
  frigate: (ctx) => buildFrigate(ctx),
  ironclad: buildIronclad,
  dreadnought: buildDreadnought,
  torpedo: buildTorpedo,
  battleship: buildBattleship,
  carrier: buildCarrier,
  arsenal: buildArsenal,
  mothership: buildMothership,
};
const CREEP_BUILDERS = { 1: buildCreepSail, 2: buildCreepSteam, 3: buildCreepDestroyer, 4: buildCreepMissile, 5: buildCreepUSV };

const templates = new Map();

function makeTemplate(key, fn) {
  if (templates.has(key)) return templates.get(key);
  const ctx = newCtx();
  const info = fn(ctx);
  // creep sail ships: fold the flag cloth into a static team pennant to keep <= 4 draws
  if (key.startsWith('creep') && ctx.flags.length) {
    for (const g of ctx.flags) {
      const p = g.attributes.position.array, m = g.morphAttributes.position[0].array;
      for (let i = 0; i < p.length; i++) p[i] += m[i] * 0.8;
      g.morphAttributes = {}; g.computeVertexNormals();
      const ni = g.toNonIndexed();
      ctx.P.addRaw('team', prep(ni)); ctx.P.addRaw('team', prep(mirrorBack(ni)));
    }
    ctx.flags = [];
  }
  const root = finishCtx(ctx, info);
  const box = new THREE.Box3().setFromObject(root);
  const t = {
    root,
    length: info.length,
    beam: info.beam,
    height: Math.max(info.height || 0, box.max.y),
    draws: 0,
  };
  root.traverse((o) => { if (o.isMesh) t.draws++; });
  templates.set(key, t);
  return t;
}

function instantiate(t, teamId) {
  const root = t.root.clone(true);
  const rig = {
    root, length: t.length, beam: t.beam, height: t.height,
    turrets: [], broadside: [], stacks: [], engines: [], launch: null,
    drawCalls: t.draws,
  };
  const spinners = [], cloth = [], flags = [];
  const turretMap = new Map();
  const muzzles = [];
  root.traverse((o) => {
    if (o.isMesh) {
      o.material = shipMat(o.userData.mat, teamId);
      if (o.userData.rig === 'sails') cloth.push(o);
      if (o.userData.rig === 'flag') flags.push(o);
    }
    const r = o.userData.rig;
    if (r === 'turret') turretMap.set(o.userData.idx, { pivot: o, muzzles: [] });
    else if (r === 'muzzle') muzzles.push(o);
    else if (r === 'broadside') rig.broadside.push(o);
    else if (r === 'stack') rig.stacks.push(o);
    else if (r === 'engine') rig.engines.push(o);
    else if (r === 'launch') rig.launch = o;
    else if (r === 'spin') spinners.push(o);
  });
  for (const m of muzzles) turretMap.get(m.userData.turret)?.muzzles.push(m);
  rig.turrets = [...turretMap.keys()].sort((a, b) => a - b).map((k) => turretMap.get(k));
  if (!rig.launch) rig.launch = markerAt(root, 'launch', 0, 1, 0);
  const phase = Math.random() * 10;
  rig.update = (dt, time, speed01 = 0) => {
    pulseMaterials(time);
    const s = clamp(speed01, 0, 1);
    for (const m of cloth) m.morphTargetInfluences[0] = 0.25 + 0.75 * s + 0.07 * Math.sin(time * 1.9 + phase);
    const w = time * (4 + 3 * s) + phase;
    const a = 0.5 + 0.5 * s;
    for (const f of flags) { f.morphTargetInfluences[0] = Math.cos(w) * a; f.morphTargetInfluences[1] = -Math.sin(w) * a; }
    for (const o of spinners) o.rotation.y += dt * o.userData.speed;
  };
  rig.update(0, 0, 0);
  return rig;
}

export function buildHeroShip(hullId, teamId = 0) {
  const fn = HERO_BUILDERS[hullId];
  if (!fn) throw new Error('Unknown hull ' + hullId);
  return instantiate(makeTemplate('hero:' + hullId, fn), teamId);
}

export function buildCreepShip(era = 1, heavy = false, teamId = 0) {
  const e = clamp(Math.round(era) || 1, 1, 5);
  const fn = CREEP_BUILDERS[e];
  return instantiate(makeTemplate('creep:' + e + ':' + (heavy ? 1 : 0), (ctx) => fn(ctx, heavy)), teamId);
}

export const HERO_IDS = Object.keys(HERO_BUILDERS);

// Re-exports for the other model modules.
export { Soup, sailPatch, flagGeo, clothMesh, turret, radar, funnel, markerAt, poleMast, C as PALETTE, instantiate as _instantiate };
