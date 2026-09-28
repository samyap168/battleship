import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { applyCloudShadow } from './cloudShadow.js';

// Ambient sea life: now and then a humpback cow and her calf surface in open
// water near the view. They blow, roll along the surface, then arch their
// backs and dive with their flukes raised, trailing water from the tail.
// Purely cosmetic: nothing in the sim knows the whales exist.

const L = 18;            // adult length (world units; game scale, like the ships, not true scale)
const DUR = 10.5;        // one surfacing, rise to last drip
const rnd = (a, b) => a + Math.random() * (b - a);
const ease = (x) => x * x * (3 - 2 * x);
const clamp01 = (x) => Math.min(1, Math.max(0, x));

const DARK = [0.035, 0.05, 0.068], PALE = [0.42, 0.46, 0.49];

function paint(g, fn) {
  const p = g.attributes.position, c = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) { const col = fn(p.getX(i), p.getY(i), p.getZ(i)); c.set(col, i * 3); }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  return g;
}
const mix = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

// flat wing-like slab from an outline in the XZ plane
function slab(outline, thick) {
  const s = new THREE.Shape(outline.map(([x, z]) => new THREE.Vector2(x, z)));
  const g = new THREE.ExtrudeGeometry(s, { depth: thick, bevelEnabled: true, bevelThickness: thick * 0.5, bevelSize: thick * 0.6, bevelSegments: 2, curveSegments: 6 });
  g.translate(0, 0, -thick / 2);
  g.rotateX(Math.PI / 2); // outline y -> world +z, extrusion -> world y
  return g;
}

function whaleGeometry() {
  const R = 1.55;
  // body: lathe profile from tail stock (u=0) to the rounded rostrum (u=1)
  const prof = [];
  for (let i = 0; i <= 28; i++) {
    const u = i / 28;
    let r = u < 0.62 ? 0.1 + 0.9 * Math.pow(Math.sin((u / 0.62) * Math.PI / 2), 1.35) : Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.62) / 0.4, 2.4)));
    if (u > 0.985) r *= 0.4;
    prof.push(new THREE.Vector2(Math.max(0.02, r * R), (u - 0.5) * L));
  }
  let body = new THREE.LatheGeometry(prof, 22);
  body.rotateX(Math.PI / 2); // lathe Y (length) -> +Z (head forward)
  // flatten: broad back, flatter belly, and a low head that dips toward the rostrum
  {
    const p = body.attributes.position;
    for (let i = 0; i < p.count; i++) {
      let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const u = z / L + 0.5;
      y *= y < 0 ? 0.72 : 0.86;
      x *= 1.12;
      if (u > 0.7) y -= (u - 0.7) * 1.6 * (y > 0 ? 1 : 0.4);
      if (y > 0) y += 0.24 * Math.exp(-Math.pow((u - 0.38) / 0.08, 2)); // the hump the dorsal fin sits on
      // tubercle knobs along the top of the head
      if (u > 0.74 && y > 0.25 && Math.abs(x) < 0.7) y += 0.06 * Math.max(0, Math.sin(z * 9.0) * Math.sin(x * 11.0));
      p.setXYZ(i, x, y, z);
    }
    body = body.toNonIndexed();
    body.deleteAttribute('uv');
    body.computeVertexNormals();
  }
  paint(body, (x, y, z) => {
    const u = z / L + 0.5;
    // pale belly with dark throat grooves on the front half
    let k = clamp01((-y - 0.15) / 0.55);
    if (u > 0.5 && y < -0.2) k *= 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(x * 16.0));
    const mottle = 0.85 + 0.3 * Math.abs(Math.sin(x * 3.1 + z * 1.7) * Math.sin(z * 2.3));
    return mix(DARK, PALE, k).map((v) => v * mottle);
  });

  // small hooked dorsal fin, two thirds of the way back
  const dorsal = slab([[0, 1.1], [0, -0.9], [0.42, -1.05], [0.3, -0.35]], 0.16); // low hooked fin on a long hump
  dorsal.rotateZ(Math.PI / 2);
  dorsal.translate(0, 0.95, -L * 0.12);
  paint(dorsal, () => DARK);

  // flukes: broad, swept, notched in the middle, pale underneath
  const half = [[0, 0.4], [1.3, 0.05], [2.7, -0.75], [3.35, -1.45], [2.4, -1.35], [1.3, -1.25], [0.35, -1.55], [0, -1.3]];
  const fl = slab([...half, ...half.slice(1, -1).reverse().map(([x, z]) => [-x, z])], 0.14);
  fl.translate(0, 0, -L * 0.5 + 0.25);
  paint(fl, (x, y) => (y < 0 ? mix(PALE, DARK, 0.25) : DARK));

  // long pectoral flippers (the humpback signature): white, knobbed leading edge
  const pec = [];
  for (const sx of [-1, 1]) {
    const g = slab([[0, 0.55], [1.2, 0.35], [2.6, 0.05], [4.4, -0.35], [4.8, -0.6], [3.2, -0.55], [1.4, -0.4], [0, -0.45]].map(([x, z]) => [x * sx, z]), 0.12);
    g.rotateZ(-sx * 0.55); // droop outward and down
    g.rotateY(sx * 0.35);
    g.translate(sx * 1.35, -0.55, L * 0.2);
    paint(g, (x, y) => mix(PALE, DARK, y > -0.6 ? 0.35 : 0));
    pec.push(g);
  }
  for (const g of [dorsal, fl, ...pec]) { if (g.index) g.copy(g.toNonIndexed()); g.deleteAttribute('uv'); g.computeVertexNormals(); }
  return mergeGeometries([body, dorsal, fl, ...pec]);
}

export class SeaLife {
  constructor(scene, islands, fx) {
    this.fx = fx; this.islands = islands;
    this.clear = null;        // optional (x, z) => bool supplied by the game: keep away from ships
    this.onSound = null;      // (name, x, z, vol)
    const geo = whaleGeometry();
    this.whales = [];
    for (let i = 0; i < 2; i++) {
      const u = { uBend: { value: 0 } };
      const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.52, metalness: 0.0, envMapIntensity: 0.7 });
      mat.onBeforeCompile = (sh) => {
        sh.uniforms.uBend = u.uBend;
        sh.vertexShader = sh.vertexShader
          .replace('#include <common>', '#include <common>\nuniform float uBend;')
          // arch the back (peduncle) as the whale rolls into a dive; also flex the tail stock gently
          .replace('#include <begin_vertex>', `#include <begin_vertex>
float bu = clamp(-transformed.z / ${(L * 0.5).toFixed(2)}, 0.0, 1.0);
transformed.y += uBend * (sin(bu * 3.14159) * 0.9 - bu * bu * 1.2);`);
      };
      mat.customProgramCacheKey = () => 'whale-v1';
      applyCloudShadow(mat);
      const m = new THREE.Mesh(geo, mat);
      m.visible = false;
      m.castShadow = false; m.receiveShadow = true;
      m.rotation.order = 'YXZ';
      scene.add(m);
      this.whales.push({ mesh: m, u, scale: i ? 0.55 : 1, delay: i ? 0.9 : 0, side: i ? 1 : 0 });
    }
    this.meshes = this.whales.map((w) => w.mesh); // not reflectable: the mirror pass has no clip plane and would show the submerged body
    this.next = rnd(18, 30);  // first sighting comes early so people notice
    this.active = null;
    this._v = new THREE.Vector3();
  }

  _openWater(x, z) {
    if (Math.abs(x) > 700 || Math.abs(z) > 420) return false;
    for (const I of this.islands) if (Math.hypot(x - I.x, z - I.z) < I.r + 28) return false;
    return !this.clear || this.clear(x, z);
  }

  _spawn(focus, yaw) {
    // somewhere in the upper half of the view, not dead centre (that's where the fighting is)
    for (let tries = 0; tries < 24; tries++) {
      const a = yaw + rnd(-0.9, 0.9), d = rnd(30, 62);
      const x = focus.x - Math.sin(a) * d, z = focus.z - Math.cos(a) * d; // camera looks along -(sin yaw, cos yaw)
      const h = Math.random() * Math.PI * 2;
      const ex = x + Math.sin(h) * 34, ez = z + Math.cos(h) * 34;
      if (this._openWater(x, z) && this._openWater(ex, ez)) {
        this.active = { x, z, h, t: 0, blows: [1.5, 4.2], song: Math.random() < 0.6 };
        for (const w of this.whales) { w.mesh.visible = true; w.dripAt = 0; w.foamAt = 0; w.blown = 0; }
        return true;
      }
    }
    return false;
  }

  update(dt, t, focus, yaw = 0) {
    if (!this.active) {
      this.next -= dt;
      if (this.next <= 0 && !this._spawn(focus, yaw)) this.next = 4;
      return;
    }
    const A = this.active;
    A.t += dt;
    const sh = Math.sin(A.h), ch = Math.cos(A.h);
    if (A.song && A.t - dt < 0.2 && A.t >= 0.2 && this.onSound) this.onSound('whaleSong', A.x, A.z, 1);
    let alive = false;
    for (const w of this.whales) {
      const s = w.scale, tau = A.t - w.delay, ls = L * s;
      if (tau < 0 || tau > DUR) { w.mesh.visible = false; if (tau < 0) alive = true; continue; }
      alive = true; w.mesh.visible = true;
      // calf swims tucked in at the cow's flank, slightly behind
      const ox = w.side ? ch * 4.2 - sh * 3 : 0, oz = w.side ? -sh * 4.2 - ch * 3 : 0;
      const run = 2.6 * Math.min(tau, 6.2) + 0.9 * Math.max(0, tau - 6.2);
      let x = A.x + ox + sh * run, z = A.z + oz + ch * run;
      // depth of the body axis and pitch (nose up +)
      let cy, pitch, roll = 0, bend = 0;
      const sy = -0.88 * s; // only the long dark back breaks the surface
      if (tau < 1.6) { const k = ease(tau / 1.6); cy = -5 * s + k * (5 * s + sy); pitch = 0.28 - 0.26 * k; }
      else if (tau < 5.2) { const k = (tau - 1.6) / 3.6; cy = sy + Math.sin(k * Math.PI * 2) * 0.1 * s; pitch = 0.02 * Math.sin(k * 6.28); roll = Math.sin(k * Math.PI) * 0.35 * (w.side ? -1 : 1); }
      else if (tau < 8.0) { const k = ease((tau - 5.2) / 2.8); cy = sy - k * 4.6 * s; pitch = -1.22 * k; bend = Math.sin(k * Math.PI) * 1.0 + k * 0.25; }
      else { const k = (tau - 8.0) / (DUR - 8.0); cy = sy - 4.6 * s - k * 9 * s; pitch = -1.22 - 0.3 * k; bend = 0.25 * (1 - k); }
      const wy = this.fx.waterY(x, z);
      w.mesh.position.set(x, wy + cy, z);
      w.mesh.rotation.set(-pitch, A.h, roll);
      w.mesh.scale.setScalar(s);
      w.u.uBend.value = bend;

      // blow: a bushy column from the blowhole, then a slow-drifting mist
      const bi = w.blown;
      if (bi < A.blows.length && tau >= A.blows[bi] + (w.side ? 0.4 : 0)) {
        w.blown++;
        const bx = x + sh * ls * 0.27, bz = z + ch * ls * 0.27, by = wy + 0.6 * s;
        this._blow(bx, by, bz, s * (bi ? 0.8 : 1));
        if (this.onSound && !w.side) this.onSound('whaleBlow', bx, bz, bi ? 0.75 : 1);
      }
      // white water where the back breaks the surface
      if (tau > 1.0 && tau < 7.0 && tau > w.foamAt) {
        w.foamAt = tau + 0.35;
        const back = tau < 5.2 ? 0 : -(tau - 5.2) * 1.6 * s;
        this.fx.decals.add(x + sh * back, z + ch * back, 3.2 * s + Math.random() * 1.5, 3.5, 0, 0.55, 1.4);
      }
      if (!w.side && tau > 1.25 && tau - dt <= 1.25) { this.fx.decals.add(x, z, 7, 4, 1, 0.3, 2.2); this.onSound && this.onSound('splash', x, z, 0.45); }
      // flukes: sheets of water pouring off the trailing edge while the tail is up
      if (tau > 6.5 && tau < 9.4 && tau > w.dripAt) {
        w.dripAt = tau + 0.05;
        const cp = Math.cos(-pitch), sp = Math.sin(-pitch);
        // tail tip in world space: body axis rotated by pitch, then heading
        const back = ls * 0.5 + 0.8 * s;
        const tx = x - sh * back * cp, tz = z - ch * back * cp, ty = wy + cy + back * sp;
        if (ty > wy + 0.3) this._drip(tx, ty, tz, sh, ch, s);
        if (!w.side && tau > 7.2 && !w.slapped) { w.slapped = true; this.fx.decals.add(tx, tz, 9, 7, 0, 0.35, 1.8); } // the "fluke print" slick
      }
    }
    if (!alive || A.t > DUR + 1.5) {
      for (const w of this.whales) { w.mesh.visible = false; w.slapped = false; }
      this.active = null;
      this.next = rnd(55, 95);
    }
  }

  _blow(x, y, z, s) {
    const P = this.fx.p;
    for (let i = 0; i < 26; i++) {
      const a = Math.random() * 6.283, r = rnd(0, 1.2) * s;
      P.alpha.emit({ x: x + Math.cos(a) * r * 0.3, y, z: z + Math.sin(a) * r * 0.3, vx: Math.cos(a) * r + 0.6, vy: rnd(12, 21) * s, vz: Math.sin(a) * r,
        life: rnd(1.3, 2.1), s0: rnd(0.8, 1.4) * s, s1: rnd(4, 6.5) * s, r: 0.9, g: 0.93, b: 0.96, a0: 0.5, a1: 0, kind: 3, grav: 9, drag: 0.9 });
    }
    for (let i = 0; i < 5; i++) {
      P.alpha.emit({ x: x + rnd(-1, 1), y: y + rnd(6, 9) * s, z: z + rnd(-1, 1), vx: rnd(0.6, 1.6), vy: rnd(0.2, 0.8), vz: rnd(-0.5, 0.5),
        life: rnd(2.4, 3.4), s0: 3 * s, s1: rnd(8, 11) * s, r: 0.86, g: 0.89, b: 0.92, a0: 0.16, a1: 0, kind: 1, drag: 0.5 });
    }
  }

  _drip(x, y, z, sh, ch, s) {
    const P = this.fx.p, span = 3.2 * s;
    for (let i = 0; i < 3; i++) {
      const o = rnd(-span, span), ex = ch * o, ez = -sh * o; // spread along the fluke span
      P.alpha.emit({ x: x + ex, y: y - rnd(0, 0.6), z: z + ez, vx: rnd(-0.3, 0.3), vy: rnd(-1, 0.5), vz: rnd(-0.3, 0.3),
        life: rnd(0.6, 1.0), s0: rnd(0.35, 0.7) * s, s1: rnd(1.2, 2) * s, r: 0.9, g: 0.94, b: 0.98, a0: 0.55, a1: 0, kind: 3, grav: 22 });
    }
  }
}
