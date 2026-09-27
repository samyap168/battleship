import * as THREE from 'three';

// Art-directed analytic sky: gradient + sun disk + mie glow + fbm clouds.
// The same dome is rendered into a PMREM cube so every PBR surface reflects
// the exact sky the player sees. The match runs dawn -> noon -> dusk: the
// civilisation "day" passes as the ages advance.

// Keyframes over normalised match time. Colors are linear-ish HDR.
const KEYS = [
  { t: 0.0, elev: 14, azim: 128, sun: [1.0, 0.7, 0.46], sunI: 2.6, zen: [0.1, 0.2, 0.42], hor: [0.9, 0.66, 0.52], fog: [0.42, 0.46, 0.54], hemiSky: [0.5, 0.55, 0.75], hemiGnd: [0.18, 0.14, 0.12], exposure: 0.95, cloudLit: [1.25, 0.8, 0.6], cloudDark: [0.3, 0.28, 0.38] },
  { t: 0.3, elev: 32, azim: 140, sun: [1.0, 0.9, 0.78], sunI: 3.2, zen: [0.08, 0.22, 0.52], hor: [0.62, 0.74, 0.86], fog: [0.42, 0.52, 0.62], hemiSky: [0.55, 0.65, 0.85], hemiGnd: [0.2, 0.18, 0.15], exposure: 0.85, cloudLit: [1.3, 1.25, 1.2], cloudDark: [0.45, 0.5, 0.6] },
  { t: 0.62, elev: 24, azim: 200, sun: [1.0, 0.82, 0.6], sunI: 3.0, zen: [0.09, 0.2, 0.46], hor: [0.78, 0.7, 0.66], fog: [0.48, 0.52, 0.58], hemiSky: [0.55, 0.6, 0.78], hemiGnd: [0.2, 0.16, 0.13], exposure: 0.88, cloudLit: [1.35, 1.1, 0.9], cloudDark: [0.42, 0.4, 0.48] },
  { t: 0.85, elev: 9, azim: 238, sun: [1.0, 0.55, 0.28], sunI: 2.9, zen: [0.2, 0.16, 0.34], hor: [1.0, 0.54, 0.32], fog: [0.52, 0.36, 0.34], hemiSky: [0.62, 0.46, 0.58], hemiGnd: [0.22, 0.13, 0.1], exposure: 1.0, cloudLit: [1.5, 0.78, 0.45], cloudDark: [0.34, 0.22, 0.32] },
  { t: 1.0, elev: 3.5, azim: 250, sun: [1.0, 0.42, 0.2], sunI: 2.4, zen: [0.17, 0.11, 0.27], hor: [0.98, 0.4, 0.24], fog: [0.42, 0.25, 0.27], hemiSky: [0.52, 0.36, 0.5], hemiGnd: [0.16, 0.09, 0.08], exposure: 1.12, cloudLit: [1.35, 0.55, 0.32], cloudDark: [0.24, 0.14, 0.24] },
];

// Fixed dramatic golden hour for the main menu.
export const MENU_TIME = 0.87;

const skyVert = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize((modelMatrix * vec4(position, 0.0)).xyz);
  vec4 p = projectionMatrix * viewMatrix * vec4((modelMatrix * vec4(position, 1.0)).xyz, 1.0);
  gl_Position = p.xyww; // at far plane
}
`;

const skyFrag = /* glsl */ `
uniform vec3 uSunDir, uSunColor, uZenith, uHorizon, uCloudLit, uCloudDark;
uniform float uTime, uSunI, uCloudMul;
varying vec3 vDir;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec3 d = normalize(vDir);
  float h = max(d.y, 0.0);
  float mu = dot(d, uSunDir);
  // Base gradient with a warm horizon band
  vec3 col = mix(uHorizon, uZenith, pow(max(h, 0.0), 0.45));
  // Horizon haze toward the sun
  float sunSide = 0.5 + 0.5 * mu;
  col += uSunColor * pow(max(sunSide, 0.0), 6.0) * (1.0 - h) * 0.55;
  // Mie glow + disk
  col += uSunColor * pow(max(mu, 0.0), 48.0) * 0.5 * uSunI * 0.2;
  col += uSunColor * pow(max(mu, 0.0), 600.0) * 1.4;
  col += uSunColor * smoothstep(0.99955, 0.99975, mu) * 9.0;

  // Clouds: project onto a plane
  if (d.y > 0.0) {
    vec2 uv = d.xz / (d.y + 0.12) * 1.3 + vec2(uTime * 0.004, uTime * 0.0015);
    float n = fbm(uv * 1.4);
    float cov = smoothstep(0.48, 0.78, n);
    float thick = smoothstep(0.5, 0.95, fbm(uv * 1.4 + 3.1));
    // Light from the sun: sample towards sun for self shadow
    float ns = fbm(uv * 1.4 + uSunDir.xz * 0.08);
    float lit = clamp(1.0 - (ns - n) * 5.0, 0.0, 1.0);
    vec3 cc = mix(uCloudDark, uCloudLit, lit * (1.0 - thick * 0.5));
    cc += uSunColor * pow(max(mu, 0.0), 12.0) * 1.5 * (1.0 - thick); // silver lining
    float fade = smoothstep(0.0, 0.18, d.y);
    col = mix(col, cc, cov * fade * 0.9 * uCloudMul);
  } else {
    col = mix(uHorizon * 0.6, uHorizon * 0.25, clamp(-d.y * 4.0, 0.0, 1.0));
  }
  // soft-clip the sky before bloom so the sun reads as a disk + halo, not a blown-out wall
  col = col / (1.0 + max(max(col.r, col.g), col.b) * 0.12);
  gl_FragColor = vec4(col, 1.0);
}
`;

function lerpArr(a, b, t) { return a.map((v, i) => v + (b[i] - v) * t); }

export class Sky {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;
    this.uniforms = {
      uSunDir: { value: new THREE.Vector3(0, 1, 0) },
      uSunColor: { value: new THREE.Color() },
      uZenith: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
      uCloudLit: { value: new THREE.Color() },
      uCloudDark: { value: new THREE.Color() },
      uTime: { value: 0 },
      uSunI: { value: 1 },
      uCloudMul: { value: 1 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms, vertexShader: skyVert, fragmentShader: skyFrag,
      side: THREE.BackSide, depthWrite: false, fog: false,
    });
    this.dome = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), mat);
    this.dome.scale.setScalar(5000);
    this.dome.frustumCulled = false;
    this.dome.renderOrder = -10;
    scene.add(this.dome);

    // Separate small scene for PMREM environment capture
    this.envScene = new THREE.Scene();
    const envDome = new THREE.Mesh(this.dome.geometry, mat);
    envDome.scale.setScalar(50);
    this.envScene.add(envDome);
    this.pmrem = new THREE.PMREMGenerator(renderer);
    this.envRT = null;
    this.envTimer = 0;

    this.sun = new THREE.DirectionalLight(0xffffff, 3);
    this.sun.castShadow = true;
    const sc = this.sun.shadow.camera;
    sc.left = -170; sc.right = 170; sc.top = 170; sc.bottom = -170; sc.near = 10; sc.far = 900;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.6;
    this.sun.shadow.radius = 3;
    scene.add(this.sun, this.sun.target);

    this.hemi = new THREE.HemisphereLight(0x8899bb, 0x332211, 0.6);
    scene.add(this.hemi);

    this.state = {};
    this.fogColor = new THREE.Color();
    this.setTime(0, 0);
  }

  /** tNorm 0..1 over the match. */
  setTime(tNorm, seconds) {
    tNorm = Math.min(Math.max(tNorm, 0), 1);
    let i = 0;
    while (i < KEYS.length - 2 && tNorm > KEYS[i + 1].t) i++;
    const a = KEYS[i], b = KEYS[i + 1];
    const k = THREE.MathUtils.smoothstep(tNorm, a.t, b.t);
    const s = {};
    for (const key of Object.keys(a)) s[key] = Array.isArray(a[key]) ? lerpArr(a[key], b[key], k) : a[key] + (b[key] - a[key]) * k;
    this.state = s;
    const el = THREE.MathUtils.degToRad(s.elev), az = THREE.MathUtils.degToRad(s.azim);
    const dir = new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az));
    const u = this.uniforms;
    u.uSunDir.value.copy(dir);
    u.uSunColor.value.setRGB(...s.sun);
    u.uZenith.value.setRGB(...s.zen);
    u.uHorizon.value.setRGB(...s.hor);
    u.uCloudLit.value.setRGB(...s.cloudLit);
    u.uCloudDark.value.setRGB(...s.cloudDark);
    u.uSunI.value = s.sunI;
    u.uTime.value = seconds;
    this.sunDir = dir;
    this.sun.color.setRGB(...s.sun);
    this.sun.intensity = s.sunI;
    this.hemi.color.setRGB(...s.hemiSky);
    this.hemi.groundColor.setRGB(...s.hemiGnd);
    this.hemi.intensity = 0.55;
    this.fogColor.setRGB(...s.fog);
    if (this.scene.fog) this.scene.fog.color.copy(this.fogColor);
    this.exposure = s.exposure;
  }

  /** Keep the shadow frustum centred on the camera focus. */
  follow(x, z) {
    const d = this.sunDir;
    this.sun.position.set(x + d.x * 400, d.y * 400 + 20, z + d.z * 400);
    this.sun.target.position.set(x, 0, z);
    this.sun.target.updateMatrixWorld();
  }

  updateEnv(dt, force = false) {
    this.envTimer -= dt;
    if (!force && this.envTimer > 0) return;
    this.envTimer = 4;
    const old = this.envRT;
    this.uniforms.uCloudMul.value = 0.35; // softer cloud reflections on water
    this.envRT = this.pmrem.fromScene(this.envScene, 0, 0.1, 200);
    this.uniforms.uCloudMul.value = 1;
    this.scene.environment = this.envRT.texture;
    if (old) old.dispose();
  }
}
