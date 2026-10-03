import * as THREE from 'three';
import { WAVES_GLSL, WAVE_UNIFORMS } from './waves.js';

// Continuous wake ribbons behind ships. Each tracked ship keeps a short path
// history. The strip widens with age (Kelvin-like spread), has a churned
// centre and bright V-arm edges, rides the Gerstner surface and fades with age.
const SAMPLES = 44, MAX_TRAILS = 80; // every captain + a full late-game gunboat fleet (at 40 some ships had no ribbon, only dotted foam)

export class Wakes {
  constructor(scene) {
    const vcount = MAX_TRAILS * SAMPLES * 2;
    this.pos = new Float32Array(vcount * 3);
    this.dat = new Float32Array(vcount * 4); // across(-1..1), age01, alongDist, strength
    const idx = [];
    for (let t = 0; t < MAX_TRAILS; t++) for (let i = 0; i < SAMPLES - 1; i++) {
      const a = (t * SAMPLES + i) * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    const g = new THREE.BufferGeometry();
    this.pAttr = new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage);
    this.dAttr = new THREE.BufferAttribute(this.dat, 4).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('position', this.pAttr);
    g.setAttribute('aWake', this.dAttr);
    g.setIndex(idx);
    this.geo = g;
    this.uniforms = { uTime: { value: 0 }, ...WAVE_UNIFORMS };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: /* glsl */ `
        uniform float uTime; attribute vec4 aWake; varying vec4 vW; varying vec2 vXZ;
        ${WAVES_GLSL}
        void main() {
          vW = aWake; vec3 p = position; vec3 n = vec3(0.0, 1.0, 0.0);
          p += gerstnerWave(p.xz, uTime, n); p.y += 0.2; vXZ = p.xz;
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        uniform float uTime; varying vec4 vW; varying vec2 vXZ;
        float h(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
        vec2 h2(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
        float nz(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(h(i), h(i + vec2(1, 0)), u.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), u.x), u.y); }
        // cellular foam: F2-F1 is small along the bubble walls -> lacy web
        float web(vec2 p) {
          vec2 i = floor(p), f = fract(p); float f1 = 8.0, f2 = 8.0;
          for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
            vec2 o = vec2(float(x), float(y)); vec2 r = o + h2(i + o) - f; float d = dot(r, r);
            if (d < f1) { f2 = f1; f1 = d; } else if (d < f2) f2 = d;
          }
          return 1.0 - smoothstep(0.0, 0.22, sqrt(f2) - sqrt(f1));
        }
        void main() {
          float x = abs(vW.x), age = vW.y, str = vW.w;
          if (str <= 0.001) discard;
          vec2 q = vXZ + vec2(nz(vXZ * 0.2 + uTime * 0.05), nz(vXZ * 0.2 - 7.0)) * 3.0; // warped: no grid feel
          float big = nz(q * 0.16 + uTime * 0.04) * 0.6 + nz(q * 0.5 - uTime * 0.12) * 0.4;
          float w1 = web(q * 0.85 + vec2(uTime * 0.15, 0.0)), w2 = web(q * 2.3 - uTime * 0.2);
          float arms = smoothstep(0.55, 0.95, x) * (1.0 - smoothstep(0.88, 1.0, x));            // bright V-arm edges
          float churn = (1.0 - smoothstep(0.0, 0.55, x)) * (1.0 - smoothstep(0.0, 0.6, age)); // prop wash
          float cover = arms * 0.9 + churn + (1.0 - x * 0.7) * 0.35;
          // young foam is dense; with age it erodes to a breaking web, then to scattered patches
          float erode = age * 0.95;
          float dense = 1.0 - smoothstep(0.0, 0.35, age);
          float fpatch = smoothstep(0.3, 0.75, nz(q * 0.33 - uTime * 0.07));        // foam gathers in drifting clumps
          float lace = (w1 * 0.55 + w2 * 0.3 + fpatch * 0.35) * mix(0.3 + 0.55 * (1.0 - smoothstep(0.1, 0.6, age)), 1.0, fpatch) * smoothstep(erode - 0.1, erode + 0.25, big + w1 * 0.2);
          float foam = cover * mix(lace, 0.85 + big * 0.15, dense * churn);
          float a = foam * mix(1.0, 0.35, smoothstep(0.15, 0.7, age)) * (1.0 - age) * str * smoothstep(0.0, 0.04, age) * 0.85; // bright fresh wash, faint old lace
          // aerated water under the foam: a faint turquoise glow in the fresh wash
          vec3 glow = vec3(0.25, 0.62, 0.6) * churn * str * (1.0 - age) * 0.22;
          gl_FragColor = vec4(vec3(0.92, 0.96, 0.98) * a + glow, min(1.0, a * 0.9));
        }`,
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
      blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    });
    this.mesh = new THREE.Mesh(g, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
    scene.add(this.mesh);
    this.trails = new Map(); // unit id -> { pts: [{x,z,t,w,s}], slot }
    this.free = Array.from({ length: MAX_TRAILS }, (_, i) => MAX_TRAILS - 1 - i);
    this.time = 0;
  }

  /** Feed a ship's stern position each frame. */
  track(id, x, z, yaw, beam, speed01, alive) {
    let tr = this.trails.get(id);
    if (!tr) {
      if (!this.free.length) return;
      tr = { pts: [], slot: this.free.pop(), last: -1 };
      this.trails.set(id, tr);
    }
    tr.seen = this.time;
    if (!alive) return;
    if (this.time - tr.last > 0.1) {
      tr.last = this.time;
      tr.pts.unshift({ x, z, t: this.time, w: beam, s: speed01 });
      if (tr.pts.length > SAMPLES) tr.pts.pop();
    } else if (tr.pts.length) { const p = tr.pts[0]; p.x = x; p.z = z; p.s = speed01; }
  }

  update(dt, t) {
    this.time = t;
    this.uniforms.uTime.value = t;
    const life = SAMPLES * 0.1;
    for (const [id, tr] of this.trails) {
      if (t - tr.seen > 2) { this.clearSlot(tr.slot); this.free.push(tr.slot); this.trails.delete(id); continue; }
      const P = this.pos, D = this.dat;
      let dist = 0;
      for (let i = 0; i < SAMPLES; i++) {
        const o = (tr.slot * SAMPLES + i) * 2;
        const p = tr.pts[Math.min(i, tr.pts.length - 1)];
        if (!p) { D[o * 4 + 3] = D[(o + 1) * 4 + 3] = 0; continue; }
        const q = tr.pts[Math.min(i + 1, tr.pts.length - 1)] || p;
        const r = tr.pts[Math.max(i - 1, 0)] || p;
        let dx = r.x - q.x, dz = r.z - q.z;
        const l = Math.hypot(dx, dz) || 1;
        dx /= l; dz /= l;
        const age = Math.min(1, (t - p.t) / life);
        const half = p.w * 0.45 + age * (6 + p.w * 1.2);
        const nx = -dz * half, nz = dx * half;
        P[o * 3] = p.x + nx; P[o * 3 + 1] = 0; P[o * 3 + 2] = p.z + nz;
        P[(o + 1) * 3] = p.x - nx; P[(o + 1) * 3 + 1] = 0; P[(o + 1) * 3 + 2] = p.z - nz;
        if (i > 0) dist += Math.hypot(p.x - r.x, p.z - r.z);
        const str = i >= tr.pts.length - 1 ? 0 : Math.min(1, p.s * 1.4);
        D[o * 4] = -1; D[o * 4 + 1] = age; D[o * 4 + 2] = dist; D[o * 4 + 3] = str;
        D[(o + 1) * 4] = 1; D[(o + 1) * 4 + 1] = age; D[(o + 1) * 4 + 2] = dist; D[(o + 1) * 4 + 3] = str;
      }
    }
    this.pAttr.needsUpdate = true;
    this.dAttr.needsUpdate = true;
  }

  clearSlot(slot) {
    for (let i = 0; i < SAMPLES * 2; i++) this.dat[(slot * SAMPLES * 2 + i) * 4 + 3] = 0;
  }
}
