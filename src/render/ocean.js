import * as THREE from 'three';
import { WAVES_GLSL, WAVE_UNIFORMS } from './waves.js';
import { applyCloudShadow } from './cloudShadow.js';

const MAX_ISLANDS = 48;

const NOISE_GLSL = /* glsl */ `
float oHash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
float oNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(oHash(i), oHash(i + vec2(1, 0)), u.x), mix(oHash(i + vec2(0, 1)), oHash(i + vec2(1, 1)), u.x), u.y);
}
float oFbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * oNoise(p); p = p * 2.07 + 13.1; a *= 0.5; }
  return v;
}
`;

/** Non-uniform grid: dense near the centre, sparse to the horizon. */
function buildOceanGeometry(segments = 300, radius = 3200) {
  const n = segments + 1;
  const pos = new Float32Array(n * n * 3);
  const map = (u) => radius * (0.07 * u + 0.93 * u * u * u);
  for (let j = 0; j < n; j++) {
    const v = (j / segments) * 2 - 1;
    const z = map(v);
    for (let i = 0; i < n; i++) {
      const u = (i / segments) * 2 - 1;
      const k = (j * n + i) * 3;
      pos[k] = map(u); pos[k + 1] = 0; pos[k + 2] = z;
    }
  }
  const idx = new Uint32Array(segments * segments * 6);
  let p = 0;
  for (let j = 0; j < segments; j++) for (let i = 0; i < segments; i++) {
    const a = j * n + i, b = a + 1, c = a + n, d = c + 1;
    idx[p++] = a; idx[p++] = c; idx[p++] = b;
    idx[p++] = b; idx[p++] = c; idx[p++] = d;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const nrm = new Float32Array(n * n * 3);
  for (let i = 1; i < nrm.length; i += 3) nrm[i] = 1;
  g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  g.setIndex(new THREE.BufferAttribute(idx, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius * 1.5);
  return g;
}

export class Ocean {
  constructor(scene, quality = 'high') {
    this.uniforms = {
      uTime: { value: 0 },
      uIslands: { value: Array.from({ length: MAX_ISLANDS }, () => new THREE.Vector4(1e5, 1e5, 0, 0)) },
      uIslandCount: { value: 0 },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) },
      uSunColor: { value: new THREE.Color(1, 1, 1) },
      uDeep: { value: new THREE.Color(0.004, 0.022, 0.04) },
      uShallow: { value: new THREE.Color(0.02, 0.2, 0.2) },
      uSSS: { value: new THREE.Color(0.03, 0.2, 0.17) },
      uBodyI: { value: 1 },
      tReflect: { value: new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1) },
      uReflMat: { value: new THREE.Matrix4() },
      uReflOn: { value: 0 },
    };
    this.uniforms.tReflect.value.needsUpdate = true;
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.06, metalness: 0.0, envMapIntensity: 1.0 });
    const U = this.uniforms;
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, U, WAVE_UNIFORMS);
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', `#include <common>
uniform float uTime;
varying vec3 vOW; varying float vWaveH; varying vec2 vGrid;
${WAVES_GLSL}`)
        .replace('#include <beginnormal_vertex>', `
vec3 wpos0 = (modelMatrix * vec4(position, 1.0)).xyz;
vec3 gN = vec3(0.0, 1.0, 0.0);
vec3 gD = gerstnerWave(wpos0.xz, uTime, gN);
vec3 objectNormal = normalize(gN);
#ifdef USE_TANGENT
vec3 objectTangent = vec3(1.0, 0.0, 0.0);
#endif`)
        .replace('#include <begin_vertex>', `
vec3 transformed = position + gD;
vWaveH = gD.y; vGrid = wpos0.xz; vOW = wpos0 + gD;`);

      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', `#include <common>
uniform float uTime; uniform vec4 uIslands[${MAX_ISLANDS}]; uniform int uIslandCount;
uniform vec3 uSunDir, uSunColor, uDeep, uShallow, uSSS; uniform float uBodyI;
uniform sampler2D tReflect; uniform mat4 uReflMat; uniform float uReflOn;
varying vec3 vOW; varying float vWaveH; varying vec2 vGrid;
${WAVES_GLSL}
${NOISE_GLSL}`)
        .replace('#include <color_fragment>', `#include <color_fragment>
// --- per-pixel wave normal
vec3 wN = vec3(0.0, 1.0, 0.0);
gerstnerWave(vGrid, uTime, wN);
float camDist = length(cameraPosition - vOW);
float detailFade = 1.0 - smoothstep(180.0, 900.0, camDist);
// high-frequency detail ripples (normal only): golden-angle directions avoid grid-like interference
for (int i = 0; i < 10; i++) {
  float fi = float(i);
  float ang = fi * 2.39996 + 0.7;
  vec2 D = vec2(cos(ang), sin(ang));
  float L = 7.5 * pow(0.78, fi);
  float k = 6.2831 / L;
  float ph = k * dot(D, vOW.xz) - sqrt(9.81 * k) * 0.75 * uTime + fi * 1.93;
  float slope = 0.3 * (L * 0.03) * k * detailFade * (0.6 + 0.4 * sin(fi * 3.1 + uTime * 0.3));
  wN.xz -= D * slope * cos(ph) * 0.35;
}
wN = normalize(wN);
vec3 V = normalize(cameraPosition - vOW);

// --- islands: shore distance
float shoreD = 1e4, foamD = 1e4;
for (int i = 0; i < ${MAX_ISLANDS}; i++) {
  if (i >= uIslandCount) break;
  vec4 isl = uIslands[i];
  float d = length(vOW.xz - isl.xy) - isl.z;
  shoreD = min(shoreD, d);
  if (isl.w > 0.5) foamD = min(foamD, d); // round fort/port islets: analytic surf
}
float n1 = oFbm(vOW.xz * 0.12 + vec2(uTime * 0.05, -uTime * 0.03));
float n2 = oFbm(vOW.xz * 0.45 - vec2(uTime * 0.11, uTime * 0.07));
float shoreFoam = (1.0 - smoothstep(0.0, 3.5 + n1 * 4.0, foamD));
shoreFoam *= smoothstep(0.35, 0.75, 0.5 + 0.5 * sin(shoreD * 0.9 - uTime * 1.6 + n1 * 6.0) + n2 * 0.4);
shoreFoam = max(shoreFoam * 0.85, (1.0 - smoothstep(0.0, 1.4, foamD)) * smoothstep(0.3, 0.6, n2 + 0.2));
float shallow = 1.0 - smoothstep(-6.0, 30.0, shoreD);
// whitecaps: only the tallest crests, gathered in wind-driven clusters (sparse in calm, rife in the squall)
float capField = smoothstep(0.38, 0.72, oFbm(vOW.xz * 0.018 + vec2(uTime * 0.01, 0.0)));
float crest = smoothstep(1.45, 2.5, vWaveH + n1 * 0.7) * smoothstep(0.58, 0.9, n2) * 0.7 * mix(0.25, 1.0, capField);
float foam = clamp(shoreFoam + crest * 0.8, 0.0, 1.0);
vec3 waterAlbedo = mix(uDeep, uShallow * 0.6, shallow * 0.8);
diffuseColor.rgb = mix(waterAlbedo, vec3(0.92, 0.95, 0.97), foam);
`)
        .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(0.075 + (1.0 - detailFade) * 0.12, 0.85, foam);`)
        .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
normal = normalize((viewMatrix * vec4(wN, 0.0)).xyz);`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
// Subsurface scattering: light through wave crests toward the viewer
float sunUp = clamp(uSunDir.y * 3.0, 0.0, 1.0);
vec2 sunH = normalize(uSunDir.xz + 1e-4);
float back = pow(clamp(dot(-V.xz, sunH) * 0.5 + 0.5, 0.0, 1.0), 3.0);
float thick = clamp(vWaveH * 0.55 + 0.45, 0.0, 1.4);
vec3 sss = uSSS * uSunColor * (0.25 + back * 1.4) * thick * sunUp * (1.0 - foam);
sss += uShallow * uSunColor * shallow * 0.18 * sunUp;
totalEmissiveRadiance += sss * (0.35 + 0.65 * pow(1.0 - max(dot(wN, V), 0.0), 2.0));
// Water-body scattering: seen from above the sea is lit from within, not by reflection.
float facing = max(dot(wN, V), 0.0);
vec3 body = vec3(0.006, 0.042, 0.058) * (0.45 + 0.9 * sunUp) * (0.6 + 0.4 * facing) * uBodyI;
body = mix(body, uShallow * 0.35, shallow * 0.6);
totalEmissiveRadiance += body * (1.0 - foam);`)
        .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
reflectedLight.directSpecular *= 0.32; // soften the sun road so combat stays readable
if (uReflOn > 0.5) {
  // planar reflection (islands, forts, ships, explosions, sky) replaces the env-map reflection
  vec4 rc = uReflMat * vec4(vOW.x, 0.0, vOW.z, 1.0);
  vec2 ruv = rc.xy / rc.w + wN.xz * 0.022 * mix(0.4, 1.0, clamp(V.y * 1.6, 0.0, 1.0)); // mild wobble, calmer at grazing angles so hulls mirror crisply
  vec3 refl = texture2D(tReflect, clamp(ruv, 0.001, 0.999)).rgb;
  float F = (0.03 + 0.97 * pow(1.0 - max(dot(wN, V), 0.0), 4.0)) * (1.0 - foam);
  reflectedLight.indirectSpecular = refl * F * 1.3;
  // energy conservation: where the water mirrors, it scatters less -> true-colour reflections
  reflectedLight.directDiffuse *= 1.0 - F; reflectedLight.indirectDiffuse *= 1.0 - F;
  totalEmissiveRadiance *= 1.0 - F * 0.85;
}`)
        .replace('#include <opaque_fragment>', `#include <opaque_fragment>
gl_FragColor.rgb = min(gl_FragColor.rgb, vec3(1.35)); // tame sun-glint fireflies before bloom`);
    };
    mat.customProgramCacheKey = () => 'ocean-v3';
    applyCloudShadow(mat);
    this.material = mat;
    this.mesh = new THREE.Mesh(buildOceanGeometry(quality === 'low' ? 170 : quality === 'medium' ? 240 : 300), mat);
    this.mesh.receiveShadow = true;
    this.mesh.frustumCulled = false;
    this.mesh.userData.noAO = true;
    this.mesh.renderOrder = -1;
    scene.add(this.mesh);

    this.decals = new WaterDecals(scene, U);
  }

  enableReflection(u) {
    this.uniforms.tReflect.value = u.tReflect.value;
    this.uniforms.uReflMat.value = u.uReflMat.value;
    this.uniforms.uReflOn.value = 1;
    u.uReflOn = this.uniforms.uReflOn; // one toggle for both
  }

  setIslands(list) { this.islands = list; this.cullT = 0; }

  /** Only islands near the camera focus go to the shader (the loop is per pixel). */
  cullIslands(fx, fz) {
    const list = this.islands || [];
    const arr = this.uniforms.uIslands.value;
    let n = 0;
    for (const o of list) {
      if (n >= MAX_ISLANDS) break;
      if (Math.abs(o.x - fx) > 460 + o.r || Math.abs(o.z - fz) > 380 + o.r) continue;
      arr[n++].set(o.x, o.z, o.r, o.natural ? 0 : 1);
    }
    this.uniforms.uIslandCount.value = n;
  }

  update(dt, t, focusX, focusZ, sky) {
    this.uniforms.uTime.value = t;
    this.cullT = (this.cullT || 0) - dt;
    if (this.cullT <= 0) { this.cullT = 0.25; this.cullIslands(focusX, focusZ); }
    const snap = 4;
    this.mesh.position.set(Math.round(focusX / snap) * snap, 0, Math.round(focusZ / snap) * snap);
    if (sky) {
      this.uniforms.uSunDir.value.copy(sky.sunDir);
      this.uniforms.uSunColor.value.copy(sky.sun.color).multiplyScalar(sky.sun.intensity * 0.45);
      this.uniforms.uBodyI.value = Math.min(1.2, 0.25 + sky.sun.intensity / 3.4);
    }
    this.decals.update(dt, t);
  }
}

// Flat quads on the water surface (wakes, foam rings, splash marks).
// The vertex shader applies the same Gerstner displacement so decals ride the waves.
const DECAL_MAX = 2400;
export class WaterDecals {
  constructor(scene, oceanUniforms) {
    // subdivided so big rings/slicks follow the swell instead of slicing into it
    const geo = new THREE.PlaneGeometry(1, 1, 6, 6);
    geo.rotateX(-Math.PI / 2);
    this.a0 = new Float32Array(DECAL_MAX * 4); // x, z, rot, size
    this.a1 = new Float32Array(DECAL_MAX * 4); // age01, kind, alpha, grow
    const ig = new THREE.InstancedBufferGeometry();
    ig.index = geo.index;
    ig.attributes.position = geo.attributes.position;
    ig.attributes.uv = geo.attributes.uv;
    this.attr0 = new THREE.InstancedBufferAttribute(this.a0, 4).setUsage(THREE.DynamicDrawUsage);
    this.attr1 = new THREE.InstancedBufferAttribute(this.a1, 4).setUsage(THREE.DynamicDrawUsage);
    ig.setAttribute('aD0', this.attr0);
    ig.setAttribute('aD1', this.attr1);
    ig.instanceCount = 0;
    this.geo = ig;
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: oceanUniforms.uTime, ...WAVE_UNIFORMS },
      vertexShader: /* glsl */ `
        uniform float uTime;
        attribute vec4 aD0; attribute vec4 aD1;
        varying vec2 vUv; varying vec4 vD1;
        ${WAVES_GLSL}
        void main() {
          vUv = uv; vD1 = aD1;
          float s = aD0.w * (1.0 + aD1.w * aD1.x);
          float c = cos(aD0.z), sn = sin(aD0.z);
          vec2 lp = vec2(position.x * c - position.z * sn, position.x * sn + position.z * c) * s;
          vec2 wp = aD0.xy + lp;
          vec3 n = vec3(0.0, 1.0, 0.0);
          vec3 d = gerstnerWave(wp, uTime, n);
          vec3 p = vec3(wp.x, 0.12 + s * 0.006, wp.y) + d;
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        varying vec2 vUv; varying vec4 vD1;
        float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
        float nz(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
          return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y); }
        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float r = length(p);
          float age = vD1.x; float kind = vD1.y;
          float n = nz(vUv * 7.0 + vD1.z * 13.0) * 0.6 + nz(vUv * 17.0) * 0.4;
          float a;
          if (kind < 0.5) {         // foam blob
            a = (1.0 - smoothstep(0.25, 1.0, r + n * 0.45)) * smoothstep(0.25, 0.55, n + (1.0 - age) * 0.5);
          } else if (kind < 1.5) {  // expanding ring
            // torn, lacy foam front with a faint churned interior
            float n2 = nz(vUv * 23.0 + age * 3.0 + vD1.z * 5.0);
            float rr = r + (n - 0.5) * 0.18;
            float band = 1.0 - smoothstep(0.0, 0.13 + age * 0.12, abs(rr - 0.74));
            float lace = smoothstep(0.3, 0.72, n2 * 0.55 + n * 0.45 + (1.0 - age) * 0.28);
            float inner = (1.0 - smoothstep(0.15, 0.75, r)) * smoothstep(0.4, 0.8, n2) * 0.22 * (1.0 - age);
            a = band * lace * 1.15 + inner;
          } else {                  // dark scorch / oil slick
            a = (1.0 - smoothstep(0.1, 1.0, r + n * 0.5)) * 0.8;
            gl_FragColor = vec4(vec3(0.02, 0.018, 0.016), a * vD1.z * (1.0 - age));
            return;
          }
          a *= vD1.z * (1.0 - age) * (1.0 - age * 0.3);
          gl_FragColor = vec4(vec3(0.9, 0.95, 0.98), a);
        }`,
      transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4,
    });
    this.mesh = new THREE.Mesh(ig, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
    scene.add(this.mesh);
    this.life = new Float32Array(DECAL_MAX);
    this.age = new Float32Array(DECAL_MAX);
    this.count = 0;
  }

  /** kind: 0 foam, 1 ring, 2 scorch */
  add(x, z, size, life, kind = 0, alpha = 1, grow = 1, rot = Math.random() * 6.28) {
    let i;
    if (this.count < DECAL_MAX) i = this.count++;
    else { // replace the oldest-ish
      i = (Math.random() * DECAL_MAX) | 0;
    }
    const o = i * 4;
    this.a0[o] = x; this.a0[o + 1] = z; this.a0[o + 2] = rot; this.a0[o + 3] = size;
    this.a1[o] = 0; this.a1[o + 1] = kind; this.a1[o + 2] = alpha; this.a1[o + 3] = grow;
    this.life[i] = life; this.age[i] = 0;
  }

  update(dt) {
    let n = this.count;
    for (let i = 0; i < n; i++) {
      this.age[i] += dt;
      const a01 = this.age[i] / this.life[i];
      if (a01 >= 1) { // swap-remove
        n--;
        if (i !== n) {
          this.a0.copyWithin(i * 4, n * 4, n * 4 + 4);
          this.a1.copyWithin(i * 4, n * 4, n * 4 + 4);
          this.life[i] = this.life[n]; this.age[i] = this.age[n];
          i--;
        }
        continue;
      }
      this.a1[i * 4] = a01;
    }
    this.count = n;
    this.geo.instanceCount = n;
    this.attr0.needsUpdate = true;
    this.attr1.needsUpdate = true;
    this.attr0.addUpdateRange(0, n * 4);
    this.attr1.addUpdateRange(0, n * 4);
  }
}
