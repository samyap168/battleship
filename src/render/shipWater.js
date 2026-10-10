import * as THREE from 'three';
import { WAVES_GLSL, WAVE_UNIFORMS } from './waves.js';
import { applyCloudShadow } from './cloudShadow.js';

// Ships sitting IN the sea rather than on it:
//  1. ONE instanced plane draws a soft contact shadow / ambient-occlusion pool plus a thin foam ring hugging the
//     hull at the waterline (bow wave and stern wash grow with speed) under every hull. It rides the same Gerstner
//     surface as the ocean and the foam decals, writes no depth, and is NOT on the reflection layer, so the mirror
//     pass never sees it as a dark blob. One draw call for the whole fleet.
//  2. wetTwin() gives each ship material a per-material twin with a wet waterline band (darker, glossier, fading
//     ~0.4 m up the hull), a gentle ambient fill so hulls do not vanish in the Realistic look, a sun-side rim
//     and cloud shadows (GLB hull materials had none).
// Presentation only: Math.random / local noise, never the seeded sim RNG.

export const SHIP_LIGHT = {
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uSunCol: { value: new THREE.Color(1, 1, 1) },
  uFill: { value: 0.1 },   // ambient lift (x albedo)
  uRim: { value: 0.35 },   // sun-side rim strength
  uFx: { value: 1 },       // master gain for the wet band / fill / rim (0 = the old flat look; used by A/B shots)
};
const POOL_U = { uTime: { value: 0 }, uFoam: { value: new THREE.Color(0.92, 0.96, 0.98) }, uDark: { value: 0.55 }, ...WAVE_UNIFORMS };

/** Called each frame by the ocean (which already owns the sky and the sea look). */
export function updateShipLight(t, sky, real) {
  POOL_U.uTime.value = t;
  if (!sky) return;
  SHIP_LIGHT.uSunDir.value.copy(sky.sunDir);
  const si = sky.sun.intensity;
  SHIP_LIGHT.uSunCol.value.copy(sky.sun.color).multiplyScalar(Math.min(1.4, si * 0.35));
  const day = Math.min(1, 0.3 + si / 3.2);
  SHIP_LIGHT.uFill.value = (0.07 + 0.09 * real) * (0.55 + 0.45 * day); // Realistic is darker: lift the hulls more
  SHIP_LIGHT.uRim.value = (0.28 + 0.2 * real) * day;
  POOL_U.uFoam.value.setRGB(0.92, 0.96, 0.98).multiplyScalar(0.3 + 0.7 * day);
  POOL_U.uDark.value = 0.55 - 0.15 * real; // the sea is already dark in Realistic: a softer pool
}

// --------------------------------------------------------------------- contact pool + foam ring
const MAX = 160;
const POOL_VS = /* glsl */ `
uniform float uTime; attribute vec4 aP; attribute vec2 aR; varying vec2 vQ; varying vec4 vP; varying vec2 vXZ; varying vec2 vR;
${WAVES_GLSL}
void main() {
  vQ = position.xz * 2.0; vP = aP; vR = aR;
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vec3 n = vec3(0.0, 1.0, 0.0); vec3 d = gerstnerWave(wp.xz, uTime, n);
  wp.xz += d.xz; wp.y = 0.13 + d.y; vXZ = wp.xz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;
const POOL_FS = /* glsl */ `
uniform float uTime; uniform vec3 uFoam; uniform float uDark; varying vec2 vQ; varying vec4 vP; varying vec2 vXZ; varying vec2 vR;
float h(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float nz(vec2 p) { vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), u.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), u.x), u.y); }
void main() {
  float alpha = vP.x, spd = vP.y;
  vec2 q = vQ * vR;                                                    // hull space: 1 = beam edge / bow tip
  float reach = min(vR.x, pow(vR.y, 1.15)) * 0.97;                    // where the plane runs out
  float pw = q.y > 0.0 ? 2.3 : 3.2;                                   // pointed bow, blunt stern
  float e = sqrt(q.x * q.x + pow(abs(q.y), pw));                      // 1.0 on the waterline outline
  float bow = smoothstep(0.1, 0.95, q.y), stern = smoothstep(-0.2, -0.95, q.y);
  // ambient-occlusion pool: darkest hugging the hull, easing out; the ocean's own albedo does the rest
  float pool = (1.0 - smoothstep(0.9, reach, e)) * uDark + (1.0 - smoothstep(1.0, 1.5, e)) * 0.42;
  // waterline foam ring with torn lace, scrolling slowly; bow wave and stern wash swell with speed
  float n = nz(vXZ * 1.7 + uTime * 0.25 + vP.z) * 0.6 + nz(vXZ * 5.0 - uTime * 0.6) * 0.4;
  float outer = 1.26 + 0.1 * n + (bow * 0.42 + stern * 0.5) * spd;
  float ring = smoothstep(0.97, 1.03, e) * (1.0 - smoothstep(outer - 0.2, outer, e));
  float amt = 0.6 + spd * 0.4 + (bow + stern) * spd * 0.5;
  float foam = ring * smoothstep(0.12, 0.5, n + amt * 0.35) * min(1.0, amt);
  vec3 col = mix(vec3(0.008, 0.02, 0.028), uFoam, foam);
  gl_FragColor = vec4(col, max(pool * (1.0 - foam), foam * 0.9) * alpha);
}`;

class ShipPools {
  constructor() {
    const g = new THREE.PlaneGeometry(1, 1, 4, 4); g.rotateX(-Math.PI / 2);
    this.aP = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 4), 4).setUsage(THREE.DynamicDrawUsage);
    this.aR = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 2), 2).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('aP', this.aP); g.setAttribute('aR', this.aR);
    const m = new THREE.ShaderMaterial({
      uniforms: POOL_U, vertexShader: POOL_VS, fragmentShader: POOL_FS,
      transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4,
    });
    this.mesh = new THREE.InstancedMesh(g, m, MAX);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.count = 0; this.mesh.frustumCulled = false; this.mesh.renderOrder = 1;
    this.mesh.castShadow = this.mesh.receiveShadow = false; // (and no layer 2: never in the planar reflection)
    this.mesh.name = 'shipPools';
    this.mesh.onBeforeRender = () => this.sync();
    this.items = new Set();
    this._m = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._p = new THREE.Vector3(); this._s = new THREE.Vector3(); this._up = new THREE.Vector3(0, 1, 0);
  }
  add(root, length, beam, height, cz) {
    const pw = 1.6 + beam * 0.15, pl = 1.0 + length * 0.1; // metres of pool beyond the hull each side / end
    const it = { root, length, beam, height, cz, w: beam + 2 * pw, l: length + 2 * pl, rx: (beam + 2 * pw) / beam, rz: (length + 2 * pl) / length, speed: 0, idle: 0, seed: Math.random() * 50 };
    this.items.add(it); return it;
  }
  /** Rewrite the instance matrices from the rigs' world transforms (flat on the sea: pitch and roll are ignored). */
  sync() {
    let n = 0, sceneTop = this.mesh; while (sceneTop.parent) sceneTop = sceneTop.parent;
    for (const it of this.items) {
      const r = it.root;
      let vis = true, top = r;
      for (let o = r; o; o = o.parent) { if (!o.visible) vis = false; top = o; }
      if (top !== sceneTop) { if (++it.idle > 1800) this.items.delete(it); continue; } // not in the world scene (yet, any more, or a detached warm-up group)
      it.idle = 0;
      if (!vis || n >= MAX) continue;
      const w = r.matrixWorld.elements;
      const sc = Math.hypot(w[8], w[9], w[10]) || 1;
      const yaw = Math.atan2(w[8], w[10]);
      const fx = w[8] / sc, fz = w[10] / sc;
      this._p.set(w[12] + fx * it.cz * sc, 0, w[14] + fz * it.cz * sc);
      this._q.setFromAxisAngle(this._up, yaw);
      this._s.set(it.w * sc, 1, it.l * sc);
      this._m.compose(this._p, this._q, this._s);
      this.mesh.setMatrixAt(n, this._m);
      const sunk = 1 - THREE.MathUtils.smoothstep(-w[13], 2, 2 + it.height * 0.35); // fades as a sinking hull drops
      this.aP.setXYZW(n, sunk, it.speed, it.seed, 0); this.aR.setXY(n, it.rx, it.rz);
      n++;
    }
    this.mesh.count = n;
    this.mesh.instanceMatrix.needsUpdate = true; this.aP.needsUpdate = true; this.aR.needsUpdate = true;
  }
}
export const SHIP_POOLS = new ShipPools();

// --------------------------------------------------------------------- wet hull twins
const WET_VS_COMMON = 'varying vec3 vWetP;';
const twins = new Map();

/** Per-material twin with the waterline wet band, ambient fill, sun rim and cloud shadows. Cached per source material. */
export function wetTwin(m) {
  if (!m.isMeshStandardMaterial || m.transparent || m.side === THREE.DoubleSide || m.blending !== THREE.NormalBlending) return m;
  if (m.emissiveIntensity > 0 && m.emissive && m.emissive.getHex() !== 0) return m; // lamps, glass, pulsing team glow stay shared
  let t = twins.get(m.uuid);
  if (t) return t;
  t = m.clone();
  t.userData = {};
  const prev = m.onBeforeCompile, prevKey = m.customProgramCacheKey.bind(m);
  t.onBeforeCompile = prev ? (sh, r) => prev.call(m, sh, r) : () => {};
  t.customProgramCacheKey = () => prevKey() + '|prevOwn';
  if (!m.userData.cloudPatched) applyCloudShadow(t); // hull GLB materials were never cloud-shadowed
  const prev2 = t.onBeforeCompile, key2 = t.customProgramCacheKey.bind(t);
  t.onBeforeCompile = (sh, r) => {
    prev2.call(t, sh, r);
    Object.assign(sh.uniforms, SHIP_LIGHT);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>\n${WET_VS_COMMON}`)
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWetP = position;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vWetP; uniform vec3 uSunDir; uniform vec3 uSunCol; uniform float uFill; uniform float uRim; uniform float uFx;`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float wetK = 0.0;
{
  // wet band: ragged upper edge (~0.15 .. 0.55 m above the waterline), darker and glossier
  float jag = (sin(vWetP.z * 3.1) + sin(vWetP.x * 5.3 + vWetP.z * 1.7) + sin(vWetP.z * 9.7 - vWetP.x * 2.1) * 0.5) * 0.05;
  wetK = (1.0 - smoothstep(0.1, 0.6, vWetP.y + jag)) * uFx;
  diffuseColor.rgb *= mix(1.0, 0.4, wetK);
}`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, min(roughnessFactor, 0.14), wetK * 0.9);`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  vec3 wn = inverseTransformDirection(normal, viewMatrix);
  reflectedLight.indirectDiffuse += diffuseColor.rgb * uFill * uFx * (0.55 + 0.45 * (wn.y * 0.5 + 0.5)); // ambient fill: hulls never vanish
  vec3 Lv = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);
  float fr = 1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
  float rim = fr * fr * fr * clamp(dot(normal, Lv) + 0.25, 0.0, 1.0);
  reflectedLight.directSpecular += uSunCol * rim * uRim * uFx * cloudShadow(vCloudW);   // gentle sun-side rim, shaded by clouds like everything else
  reflectedLight.directSpecular += uSunCol * wetK * pow(clamp(dot(reflect(-Lv, normal), normalize(vViewPosition)), 0.0, 1.0), 24.0) * 0.5 * cloudShadow(vCloudW); // wet glint
}`);
  };
  t.customProgramCacheKey = () => key2() + '|wet';
  t.needsUpdate = true;
  twins.set(m.uuid, t);
  return t;
}

/** Called from instantiate(): wet materials + the contact-pool entry. */
export function outfitShip(rig, tmpl) {
  rig.root.traverse((o) => { if (o.isMesh && o.material && !Array.isArray(o.material)) o.material = wetTwin(o.material); });
  let cz = tmpl._poolCz;
  if (cz === undefined) { const b = new THREE.Box3().setFromObject(tmpl.root); cz = tmpl._poolCz = (b.min.z + b.max.z) * 0.5; }
  rig.pool = SHIP_POOLS.add(rig.root, rig.length, rig.beam, rig.height, cz);
  return rig.pool;
}
