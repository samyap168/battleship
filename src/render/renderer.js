import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';

// Ground-truth AO restricted to solid geometry: the displaced ocean, sky and all
// transparent / shader-driven effects are excluded from the G-buffer.
class SolidGTAOPass extends GTAOPass {
  _overrideVisibility() {
    super._overrideVisibility();
    const cache = this._visibilityCache;
    this.scene.traverse((o) => {
      if (!o.visible) return;
      if (o.userData.noAO) { o.visible = false; cache.push(o); return; } // whole groups can opt out (gunboats)
      if (!o.isMesh) return;
      const m = o.material;
      if ( (m && (m.transparent || m.isShaderMaterial || m.blending === THREE.AdditiveBlending))) { o.visible = false; cache.push(o); }
    });
  }
}

// Final cinematic pass (runs on display-referred colour after tonemapping):
// shockwave distortion, chromatic aberration, colour grade, vignette,
// damage vignette, desaturation, film grain.
const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uTexel: { value: new THREE.Vector2(1, 1) }, uSharp: { value: 0 },
    uShock: { value: [new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4()] },
    uDamage: { value: 0 },
    uDesat: { value: 0 },
    uLift: { value: new THREE.Vector3(0.012, 0.01, 0.02) },
    uGain: { value: new THREE.Vector3(1.03, 1.0, 0.97) },
    uContrast: { value: 1.08 },
    uSat: { value: 1.12 },
    uVignette: { value: 0.32 },
    uCA: { value: 0.0007 },
    uGrain: { value: 0.018 },
    uFlash: { value: 0 },
    uRain: { value: 0 },
  },
  vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float uTime, uDamage, uDesat, uContrast, uSat, uVignette, uCA, uGrain, uFlash, uRain;
    float gh(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
      float a = gh(i), b = gh(i + vec2(1, 0)), cc = gh(i + vec2(0, 1)), d = gh(i + vec2(1, 1));
      return mix(mix(a, b, f.x), mix(cc, d, f.x), f.y); }
    uniform vec2 uRes; uniform vec2 uTexel; uniform float uSharp; uniform vec4 uShock[4]; uniform vec3 uLift, uGain;
    varying vec2 vUv;
    float rnd(vec2 p){ return gh(floor(p) + vec2(fract(uTime) * 73.1, fract(uTime * 0.7) * 41.3)); }
    void main() {
      vec2 uv = vUv;
      float aspect = uRes.x / uRes.y;
      // Shockwave ring distortion
      for (int i = 0; i < 4; i++) {
        vec4 s = uShock[i];
        if (s.w <= 0.0) continue;
        vec2 d = uv - s.xy; d.x *= aspect;
        float r = length(d);
        float band = 1.0 - smoothstep(0.0, 0.035, abs(r - s.z));
        uv -= normalize(d + 1e-5) * band * s.w * 0.02 * vec2(1.0 / aspect, 1.0);
      }
      vec2 c = uv - 0.5;
      float edge = dot(c, c);
      vec2 off = c * uCA * (1.0 + edge * 6.0) * (1.0 - uRain * 0.85); // thin bright rain streaks would split into rainbow fringes
      vec3 col;
      col.r = texture2D(tDiffuse, uv + off).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - off).b;
      if (uSharp > 0.001) { // below native resolution (adaptive scaling): a light unsharp mask gives hulls and rigging their edges back
        vec3 bl = (texture2D(tDiffuse, uv + vec2(uTexel.x, 0.0)).rgb + texture2D(tDiffuse, uv - vec2(uTexel.x, 0.0)).rgb + texture2D(tDiffuse, uv + vec2(0.0, uTexel.y)).rgb + texture2D(tDiffuse, uv - vec2(0.0, uTexel.y)).rgb) * 0.25;
        col += clamp(col - bl, -0.12, 0.12) * uSharp * 3.0;
      }
      // Grade: lift/gain, contrast around mid grey, saturation
      col = col * uGain + uLift * (1.0 - col);
      col = (col - 0.5) * uContrast + 0.5;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSat * (1.0 - uDesat));
      // Vignette
      float v = (1.0 - smoothstep(0.2, 0.85, length(c * vec2(aspect * 0.8, 1.0))));
      col *= mix(1.0 - uVignette, 1.0, v);
      // Damage vignette
      float dv = smoothstep(0.25, 0.9, length(c * vec2(aspect * 0.7, 1.0)));
      col = mix(col, vec3(0.55, 0.02, 0.02), dv * uDamage * 0.65);
      // squall: wind-driven sheets of rain sweeping across the frame. Two streak layers skewed along the
      // fall, gated by slow gust curtains; kept faint so it reads as weather, not fog
      if (uRain > 0.001) {
        vec2 q = vec2(c.x * aspect, c.y);
        float gust = smoothstep(0.35, 0.85, vn(vec2(q.x * 1.6 + q.y * 0.5 - uTime * 0.9, uTime * 0.21)));
        float st = 0.0;
        for (int i = 0; i < 2; i++) {
          float fi = float(i);
          vec2 p = vec2(q.x + q.y * 0.3, q.y);
          st += smoothstep(0.72, 0.95, vn(vec2(p.x * (170.0 + fi * 90.0), p.y * (2.2 + fi) + uTime * (9.0 + fi * 4.0)))) * (1.0 - fi * 0.35);
        }
        float kk = uRain * (0.35 + 0.65 * gust);
        col = mix(col, vec3(0.62, 0.67, 0.74), gust * uRain * 0.05);   // the curtain itself
        col += vec3(0.55, 0.6, 0.68) * st * kk * 0.07;                  // streaks
      }
      col += uFlash;
      col += (rnd(uv * uRes) - 0.5) * uGrain;
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`,
};

// Screen-space volumetric light shafts (radial blur of bright pixels toward the sun).
const GodRayShader = {
  uniforms: { tDiffuse: { value: null }, uSun: { value: new THREE.Vector2(0.5, 0.5) }, uStrength: { value: 0 }, uTint: { value: new THREE.Color(1, 0.8, 0.6) } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uStrength; uniform vec3 uTint; varying vec2 vUv;
    void main() {
      vec4 base = texture2D(tDiffuse, vUv);
      if (uStrength <= 0.001) { gl_FragColor = base; return; }
      vec2 delta = (vUv - uSun) * (1.0 / 56.0) * 0.9;
      vec2 uv = vUv;
      float decay = 1.0, acc = 0.0;
      for (int i = 0; i < 56; i++) {
        uv -= delta;
        vec3 c = texture2D(tDiffuse, clamp(uv, 0.0, 1.0)).rgb;
        float l = max(dot(c, vec3(0.299, 0.587, 0.114)) - 1.1, 0.0);
        acc += l * decay;
        decay *= 0.965;
      }
      float falloff = 1.0 - smoothstep(0.0, 1.2, length((vUv - uSun) * vec2(1.6, 1.0)));
      gl_FragColor = vec4(base.rgb + uTint * min(acc * uStrength * 0.012, 0.6) * falloff, base.a);
    }`,
};

export const QUALITY = {
  high: { pixelRatio: 1.5, shadows: 2048, bloom: true, smaa: true, ao: true },
  medium: { pixelRatio: 1.0, shadows: 1024, bloom: true, smaa: true },
  low: { pixelRatio: 0.9, shadows: 0, bloom: false, smaa: true }, // SMAA is cheap and the governor sheds it first on a slow GPU: hulls and rigging stay clean on Low
  safe: { pixelRatio: 0.85, shadows: 0, bloom: false, smaa: false }, // compatibility: like Low, plus plain water and no sky-reflection map (set up in main.js)
};

export class Renderer {
  constructor(container, quality = 'high') {
    this.q = QUALITY[quality] || QUALITY.high;
    const r = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', stencil: false, preserveDrawingBuffer: !!navigator.webdriver }); // automation: compositor can always re-present the finished frame
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.q.pixelRatio));
    r.setSize(window.innerWidth, window.innerHeight);
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 0.9;
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.shadowMap.enabled = true; // always on: the sun's castShadow flag is what Low turns off, so the preset can change live
    r.shadowMap.type = THREE.PCFShadowMap;
    r.shadowMap.autoUpdate = false; r.shadowMap.needsUpdate = true; // refreshed every other frame in render()
    container.appendChild(r.domElement);
    this.gl = r;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x88aacc, 0.00042);
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 12000);

    const composer = new EffectComposer(r);
    composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer = composer;
    if (this.q.ao) composer.addPass(this._makeAO());
    // NaN/Inf guard: one bad pixel (undefined math on some GPU drivers) must never reach the
    // bloom mip chain, which smears it across the whole frame as a milky veil. isnan()/isinf()
    // are NOT reliable here: D3D shader compilers (Chrome/Edge on Windows via ANGLE) optimise
    // them away and HLSL min(NaN, x) returns x, turning each NaN into a blinding hotspot. So
    // test the exponent bits directly, which no compiler can fold, and heal bad pixels from
    // their valid neighbours instead of leaving black specks.
    this.nanGuard = new ShaderPass({
      uniforms: { tDiffuse: { value: null }, uTexel: { value: new THREE.Vector2(1 / 1024, 1 / 1024) } },
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: /* glsl */ `uniform sampler2D tDiffuse; uniform vec2 uTexel; varying vec2 vUv;
        bool badF(float x) { return (floatBitsToUint(x) & 0x7f800000u) == 0x7f800000u; }
        bool bad(vec3 c) { return badF(c.r) || badF(c.g) || badF(c.b); }
        vec3 safeC(vec3 c) { return clamp(c, vec3(0.0), vec3(32.0)); }
        void main() {
          vec4 c = texture2D(tDiffuse, vUv);
          if (!bad(c.rgb)) { gl_FragColor = vec4(safeC(c.rgb), 1.0); return; }
          vec3 acc = vec3(0.0); float n = 0.0;
          for (int i = 0; i < 4; i++) {
            vec2 o = vec2(i == 0 ? 1.0 : i == 1 ? -1.0 : 0.0, i == 2 ? 1.0 : i == 3 ? -1.0 : 0.0) * uTexel * 2.0;
            vec3 q = texture2D(tDiffuse, vUv + o).rgb;
            if (!bad(q)) { acc += safeC(q); n += 1.0; }
          }
          gl_FragColor = vec4(n > 0.0 ? acc / n : vec3(0.0), 1.0);
        }`,
    });
    composer.addPass(this.nanGuard);
    this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.42, 0.5, 1.0);
    this.bloom.enabled = this.q.bloom;
    this.bloom.highPassUniforms.smoothWidth.value = 0.45; // soft knee: highlights roll into bloom instead of clipping
    composer.addPass(this.bloom);
    this.rays = new ShaderPass(GodRayShader);
    this.rays.enabled = this.q.bloom;
    composer.addPass(this.rays);
    composer.addPass(new OutputPass());
    this.grade = new ShaderPass(GradeShader);
    composer.addPass(this.grade);
    if (this.q.smaa) { this.smaa = new SMAAPass(); composer.addPass(this.smaa); }

    this.shocks = []; // {x,y (ndc 0..1), t, life, str}
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  _makeAO() {
    this.ao = new SolidGTAOPass(this.scene, this.camera, Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2));
    this.ao.updateGtaoMaterial({ radius: 5.5, distanceExponent: 1.4, thickness: 3, scale: 1.25, samples: 12, distanceFallOff: 1 });
    this.ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
    this.ao.blendIntensity = 0.9;
    return this.ao;
  }

  /** Switch graphics preset live (no reload, the match carries on): builds the passes a higher preset
   *  needs on first use, toggles the rest, and resets what the frame-rate governor had shed. */
  setQuality(name) {
    const q = QUALITY[name]; if (!q) return;
    this.q = q; this.qualityName = name;
    const c = this.composer;
    if (q.ao && !this.ao) c.insertPass(this._makeAO(), 1); // straight after the scene pass
    if (this.ao) this.ao.enabled = !!q.ao && !this.aoBlocked;
    if (q.smaa && !this.smaa) { this.smaa = new SMAAPass(); c.addPass(this.smaa); }
    if (this.smaa) this.smaa.enabled = !!q.smaa && !this.smaaBlocked;
    this.bloom.enabled = !!q.bloom && !this.bloomBlocked; this.rays.enabled = !!q.bloom && !this.bloomBlocked && !this.raysBlocked;
    if (this.sun) {
      const want = q.shadows > 0;
      if (this.sun.castShadow !== want) this.sun.castShadow = want; // programs re-link once, on the next frame
      if (want && this.sun.shadow.mapSize.x !== q.shadows) { this.sun.shadow.mapSize.set(q.shadows, q.shadows); if (this.sun.shadow.map) { this.sun.shadow.map.dispose(); this.sun.shadow.map = null; } }
      this.gl.shadowMap.needsUpdate = true;
    }
    this.strained = false; this.flatHits = 0; this.ftAvg = undefined; this.adaptT = 0;
    this.gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, q.pixelRatio));
    this.resize();
  }

  /** Dynamic resolution: hold frame rate by scaling the internal pixel ratio. */
  adapt(dt) {
    if (this.fixedRes) return;
    this.ftAvg = this.ftAvg === undefined ? dt : this.ftAvg * 0.95 + dt * 0.05;
    this.adaptT = (this.adaptT || 0) + dt;
    if (this.adaptT < 1.5) return;
    this.adaptT = 0;
    const maxPR = Math.min(window.devicePixelRatio || 1, this.q.pixelRatio);
    const cur = this.gl.getPixelRatio();
    let next = cur;
    if (this.ftAvg > 1 / 48) {
      next = Math.max(0.5, cur * 0.85);
      if (cur <= 0.75 && this.ao && this.ao.enabled) { this.ao.enabled = false; next = cur; } // shed AO before going blurrier
      else if (cur <= 0.75 && this.refl && this.refl.uniforms.uReflOn.value) { this.refl.uniforms.uReflOn.value = 0; next = cur; } // then reflections
      else if (cur <= 0.75 && this.sun && this.sun.shadow.mapSize.x > 1024) { // then a quarter of the shadow-map fill
        this.sun.shadow.mapSize.set(1024, 1024); if (this.sun.shadow.map) { this.sun.shadow.map.dispose(); this.sun.shadow.map = null; } next = cur;
      } else if (cur <= 0.75 && this.smaa && this.smaa.enabled) { this.smaa.enabled = false; next = cur; } // then anti-aliasing
      else if (cur <= 0.55 && !this.strained) { this.strained = true; if (this.onStrain) this.onStrain(); } // nothing left to shed: tell the player
    }
    else if (this.ftAvg < 1 / 58 && cur < maxPR) next = Math.min(maxPR, cur * 1.08);
    if (Math.abs(next - cur) > 0.02) { this.gl.setPixelRatio(next); this.resize(); }
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.gl.setSize(w, h);
    this.composer.setPixelRatio && this.composer.setPixelRatio(this.gl.getPixelRatio());
    this.composer.setSize(w, h);
    if (this.ao) this.ao.setSize(Math.round(w / 2), Math.round(h / 2));
    if (this.nanGuard) { const pr = this.gl.getPixelRatio(); this.nanGuard.uniforms.uTexel.value.set(1 / (w * pr), 1 / (h * pr)); }
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.grade.uniforms.uRes.value.set(w, h);
    const gpr = this.gl.getPixelRatio();
    this.grade.uniforms.uTexel.value.set(1 / (w * gpr), 1 / (h * gpr));
    this.grade.uniforms.uSharp.value = Math.min(0.5, Math.max(0, (1 - gpr) * 1.1));
  }

  /** Screen-space shockwave at a world position. */
  shockwave(pos, strength = 1, life = 0.7) {
    if (this.noShock) return; // menu backdrop: screen warps read as glitches
    const v = pos.clone().project(this.camera);
    if (v.z > 1 || Math.abs(v.x) > 1.3 || Math.abs(v.y) > 1.3) return;
    if (this.shocks.length >= 4) this.shocks.shift();
    this.shocks.push({ x: v.x * 0.5 + 0.5, y: v.y * 0.5 + 0.5, t: 0, life, str: strength });
  }

  /** Aim the light shafts at the sun; fade them out when the sun leaves the frame. */
  setSun(sunDir, color, strength = 1) {
    const v = this.camera.position.clone().addScaledVector(sunDir, 3000).project(this.camera);
    const ru = this.rays.uniforms;
    ru.uSun.value.set(v.x * 0.5 + 0.5, v.y * 0.5 + 0.5);
    const off = Math.max(Math.abs(v.x), Math.abs(v.y));
    const vis = v.z < 1 ? 1 - THREE.MathUtils.smoothstep(off, 1.0, 1.9) : 0;
    ru.uStrength.value += (vis * strength - ru.uStrength.value) * 0.1;
    ru.uTint.value.copy(color);
    // 56 taps per pixel: skip the whole pass while the shafts are too faint to see (most top-down play)
    this.rays.enabled = this.q.bloom && this.bloom.enabled && !this.raysBlocked && ru.uStrength.value > 0.04;
  }

  render(dt, time) {
    // Sun shadows at half rate: the sun and hulls move a fraction of a texel per frame,
    // and this removes a full scene's worth of draw calls on alternate frames.
    this.frameN = (this.frameN || 0) + 1;
    if (this.frameN % 2 === 0) this.gl.shadowMap.needsUpdate = true;
    const u = this.grade.uniforms;
    u.uTime.value = time;
    for (let i = this.shocks.length - 1; i >= 0; i--) {
      const s = this.shocks[i];
      s.t += dt;
      if (s.t > s.life) this.shocks.splice(i, 1);
    }
    for (let i = 0; i < 4; i++) {
      const s = this.shocks[i];
      if (!s) { u.uShock.value[i].w = 0; continue; }
      const k = s.t / s.life;
      // fade in as the ring opens: at radius ~0 the distortion band covers a solid disc and reads as a lens
      u.uShock.value[i].set(s.x, s.y, k * 0.28 * s.str, (1 - k) * s.str * THREE.MathUtils.smoothstep(k, 0.06, 0.3));
    }
    u.uFlash.value = Math.max(0, u.uFlash.value - dt * 2.5);
    if (this.safeMode) { this.gl.toneMapping = THREE.ACESFilmicToneMapping; this.gl.render(this.scene, this.camera); this.selfCheck(); return; } // safe mode restored from an earlier launch must still be watched: the cause may be in the scene
    this.composer.render(dt);
    this.selfCheck();
  }

  /** Watchdog for washed-out frames. Some GPU / driver combinations turn the sea (and, through bloom, the whole
   *  frame) into a flat or washed-out cream, which looks like thick fog over everything. This samples the finished
   *  frame; when the picture has gone cream it hunts the culprit, one thing switched off at a time: first the post
   *  passes, then the whole chain, then scene features (reflections, the sky lighting map, finally the sea shader).
   *  Something is blamed only if putting it back brings the wash back, so a bright flash or a coincidence never
   *  costs the player an effect. Confirmed culprits are remembered for the next launch. */
  static FX_PASSES = ['rays', 'bloom', 'nanguard', 'ao', 'smaa'];
  static SCENE_STEPS = ['refl', 'env', 'decals', 'shore', 'sparks', 'sea']; // main.js registers { live(), set(off) } for each in this.sceneSteps

  _fxOff(name, off) {
    if (name === 'rays') this.raysBlocked = off;
    else if (name === 'bloom') { this.bloomBlocked = off; if (this.bloom) this.bloom.enabled = !off && !!this.q.bloom; }
    else if (name === 'nanguard') { if (this.nanGuard) this.nanGuard.enabled = !off; }
    else if (name === 'ao') { this.aoBlocked = off; if (this.ao) this.ao.enabled = !off && !!this.q.ao; }
    else if (name === 'smaa') { this.smaaBlocked = off; if (this.smaa) this.smaa.enabled = !off && !!this.q.smaa; }
    else if (name === 'safe') this.safeMode = off;
    else if (this.sceneSteps && this.sceneSteps[name]) this.sceneSteps[name].set(off);
  }

  _known(n) { return Renderer.FX_PASSES.includes(n) || n === 'safe' || (Renderer.SCENE_STEPS.includes(n) && this.sceneSteps && this.sceneSteps[n]); }

  /** Apply what a previous launch found broken on this machine (an empty list clears everything). */
  restoreFxOff(list) {
    for (const n of Renderer.FX_PASSES) this._fxOff(n, false);
    for (const n of Renderer.SCENE_STEPS) if (this.sceneSteps && this.sceneSteps[n]) this.sceneSteps[n].set(false);
    if (this.fxOff && this.fxOff.includes('safe')) this._fxOff('safe', false); // only the safe flag the watchdog itself set
    this.fxOff = [];
    for (const n of list || []) if (this._known(n)) { this._fxOff(n, true); this.fxOff.push(n); }
  }

  _sample() {
    const g = this.gl.getContext(), W = g.drawingBufferWidth, H = g.drawingBufferHeight, px = new Uint8Array(4);
    let mn = 255, mx = 0, sum = 0, n = 0, warm = 0, white = 0;
    for (let i = 1; i <= 5; i++) for (let j = 1; j <= 4; j++) { // 20 points across the middle of the view
      g.readPixels(Math.floor((W * (i * 0.16 + 0.1))), Math.floor(H * (0.22 + j * 0.13)), 1, 1, g.RGBA, g.UNSIGNED_BYTE, px);
      const l = (px[0] + px[1] + px[2]) / 3; mn = Math.min(mn, l); mx = Math.max(mx, l); sum += l; n++;
      if (l > 165 && px[0] >= px[2] - 12) warm++; // bright and not blue: the sea should be dark teal
      if (Math.min(px[0], px[1], px[2]) >= 222) white++; // pure white: nothing in this game fills a third of the view with it
    }
    const mean = sum / n, spread = mx - mn, warmFrac = warm / n, whiteFrac = white / n;
    return { mean, spread, warmFrac, whiteFrac, bad: (spread < 6 && (mean > 205 || mean < 6)) || (mean > 175 && spread < 60) || warmFrac >= 0.58 || whiteFrac >= 0.3 };
  }

  selfCheck() {
    if (this.noShock) return; // menu backdrop: not worth the risk of a false alarm
    this.checkT = (this.checkT || 0) + 1;
    const wd = this.wd || (this.wd = { state: 'idle', hits: 0, i: 0, wait: 0, cool: 0, fails: 0 });
    if (wd.cool > 0) { wd.cool--; return; }
    if (wd.state === 'idle') {
      const every = this.checkT < 900 ? 8 : this.checkT < 5400 ? 45 : 180; // each look is a pipeline stall: rare once the picture has proven healthy // look hard while the match is starting
      if (this.checkT < 20 || this.checkT % every !== 0) return;
      const r = this._sample();
      wd.hits = r.bad ? wd.hits + 1 : 0;
      if (wd.hits >= 2) { wd.hits = 0; wd.state = 'try'; wd.i = 0; wd.found = null; wd.scene = []; this._tryNext(); }
      return;
    }
    if (--wd.wait > 0) return; // let the changed chain render a few frames first
    const r = this._sample();
    const confirmed = (name, list) => {
      this._fxOff(name, true); for (const n of list) (this.fxOff ||= []).includes(n) || this.fxOff.push(n);
      console.warn('[render] ' + name + ' washed out the picture on this GPU; switched off');
      if (this.onDegrade) this.onDegrade(name, this.fxOff.slice());
      wd.state = 'idle'; wd.cool = 120; wd.hits = 0; wd.fails = 0;
    };
    if (wd.state === 'try') {
      if (!r.bad) { wd.found = wd.cur; this._fxOff(wd.cur, false); wd.state = 'confirm'; wd.wait = 9; } // fixed: put it back to be sure
      else { this._fxOff(wd.cur, false); wd.i++; this._tryNext(); }
    } else if (wd.state === 'confirm') {
      if (r.bad) confirmed(wd.found, [wd.found]); else { wd.state = 'idle'; wd.cool = 120; wd.hits = 0; } // else a passing flash
    } else if (wd.state === 'safe') {
      if (!r.bad) { this.fxOff = ['safe']; console.warn('[render] post-processing washed out the picture; safe render mode'); if (this.onDegrade) this.onDegrade('safe', ['safe']); wd.state = 'idle'; wd.cool = 600; wd.fails = 0; }
      else { this.safeMode = false; wd.state = 'scene'; wd.si = 0; this._sceneNext(); } // not the post chain: try scene features
    } else if (wd.state === 'scene') {
      if (!r.bad) { const last = wd.scene[wd.scene.length - 1]; this._fxOff(last, false); wd.state = 'sceneConfirm'; wd.wait = 9; }
      else { wd.si++; this._sceneNext(); }
    } else if (wd.state === 'sceneConfirm') {
      const last = wd.scene[wd.scene.length - 1];
      if (r.bad) { for (const n of wd.scene.slice(0, -1)) this._fxOff(n, false); confirmed(last, [last]); } // keep only the step that mattered; earlier ones go back on (if they were needed too, the next check finds them)
      else { for (const n of wd.scene) this._fxOff(n, false); wd.state = 'idle'; wd.cool = 120; wd.hits = 0; wd.scene = []; } // transient: undo everything
    }
  }

  _tryNext() {
    const wd = this.wd, list = Renderer.FX_PASSES;
    while (wd.i < list.length) { // skip passes that are already off or not built
      const n = list[wd.i];
      const live = n === 'rays' ? this.rays.enabled : n === 'bloom' ? this.bloom.enabled : n === 'nanguard' ? this.nanGuard.enabled : n === 'ao' ? !!(this.ao && this.ao.enabled) : !!(this.smaa && this.smaa.enabled);
      if (live) { wd.cur = n; this._fxOff(n, true); wd.wait = 6; return; }
      wd.i++;
    }
    wd.state = 'safe'; this.safeMode = true; wd.wait = 6; // no single pass explains it: try the whole chain off
  }

  _sceneNext() { // scene features, switched off cumulatively (reflections, then the sky lighting map, then the sea shader)
    const wd = this.wd, list = Renderer.SCENE_STEPS;
    while (wd.si < list.length) {
      const n = list[wd.si], st = this.sceneSteps && this.sceneSteps[n];
      if (st && st.live()) { wd.scene.push(n); st.set(true); wd.wait = 8; return; }
      wd.si++;
    }
    // nothing helped: undo it all and back off, so a genuinely bright scene is not re-tested every few seconds
    for (const n of wd.scene) this._fxOff(n, false);
    wd.scene = []; wd.state = 'idle'; wd.fails++; wd.cool = Math.min(900 * 2 ** wd.fails, 36000);
    console.warn('[render] washed-out frame persists with every feature off: the scene itself is bright');
    if (this.onSceneWash) this.onSceneWash();
  }
}
