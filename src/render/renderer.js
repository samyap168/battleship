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
  },
  vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float uTime, uDamage, uDesat, uContrast, uSat, uVignette, uCA, uGrain, uFlash;
    uniform vec2 uRes; uniform vec4 uShock[4]; uniform vec3 uLift, uGain;
    varying vec2 vUv;
    float rnd(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + uTime * 7.13) * 43758.5453); }
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
      vec2 off = c * uCA * (1.0 + edge * 6.0);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + off).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - off).b;
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
  low: { pixelRatio: 0.85, shadows: 0, bloom: false, smaa: false },
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
    r.shadowMap.enabled = this.q.shadows > 0;
    r.shadowMap.type = THREE.PCFShadowMap;
    r.shadowMap.autoUpdate = false; r.shadowMap.needsUpdate = true; // refreshed every other frame in render()
    container.appendChild(r.domElement);
    this.gl = r;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x88aacc, 0.00042);
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 12000);

    const composer = new EffectComposer(r);
    composer.addPass(new RenderPass(this.scene, this.camera));
    if (this.q.ao) {
      this.ao = new SolidGTAOPass(this.scene, this.camera, Math.round(window.innerWidth / 2), Math.round(window.innerHeight / 2));
      this.ao.updateGtaoMaterial({ radius: 5.5, distanceExponent: 1.4, thickness: 3, scale: 1.25, samples: 12, distanceFallOff: 1 });
      this.ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
      this.ao.blendIntensity = 0.9;
      composer.addPass(this.ao);
    }
    // NaN/Inf guard: one bad pixel (undefined math on some GPU drivers) must never poison the
    // bloom mip chain, which would smear it across the whole frame
    composer.addPass(new ShaderPass({
      uniforms: { tDiffuse: { value: null } },
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `uniform sampler2D tDiffuse; varying vec2 vUv;
        void main() { vec4 c = texture2D(tDiffuse, vUv);
          bool bad = any(isnan(c)) || any(isinf(c));
          gl_FragColor = bad ? vec4(0.0, 0.0, 0.0, 1.0) : vec4(min(c.rgb, vec3(64.0)), c.a); }`,
    }));
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
    if (this.q.smaa) composer.addPass(new SMAAPass());
    this.composer = composer;

    this.shocks = []; // {x,y (ndc 0..1), t, life, str}
    window.addEventListener('resize', () => this.resize());
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
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.grade.uniforms.uRes.value.set(w, h);
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
      u.uShock.value[i].set(s.x, s.y, k * 0.28 * s.str, (1 - k) * s.str);
    }
    u.uFlash.value = Math.max(0, u.uFlash.value - dt * 2.5);
    if (this.safeMode) { this.gl.toneMapping = THREE.ACESFilmicToneMapping; this.gl.render(this.scene, this.camera); return; }
    this.composer.render(dt);
    this.selfCheck();
  }

  /** Watchdog: if the post-processing chain ever collapses the frame to one flat colour
   *  (driver bug, unsupported render-target format), fall back to direct rendering. */
  selfCheck() {
    this.checkT = (this.checkT || 0) + 1;
    if (this.checkT % 45 !== 0 || this.checkT < 180 || this.safeMode) return;
    const g = this.gl.getContext(), W = g.drawingBufferWidth, H = g.drawingBufferHeight, px = new Uint8Array(4);
    let mn = [255, 255, 255], mx = [0, 0, 0];
    for (let i = 1; i <= 4; i++) for (let j = 1; j <= 3; j++) {
      g.readPixels(Math.floor((W * i) / 5), Math.floor((H * (j + 0.6)) / 5), 1, 1, g.RGBA, g.UNSIGNED_BYTE, px);
      for (let c = 0; c < 3; c++) { mn[c] = Math.min(mn[c], px[c]); mx[c] = Math.max(mx[c], px[c]); }
    }
    const spread = Math.max(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]);
    const mean = (mn[0] + mn[1] + mn[2] + mx[0] + mx[1] + mx[2]) / 6;
    const failureLike = spread < 6 && (mean > 205 || mean < 6); // washed-out or black, not just calm sea
    this.flatHits = failureLike ? (this.flatHits || 0) + 1 : 0;
    if (this.flatHits >= 3) {
      this.safeMode = true;
      console.warn('[render] post-processing produced a flat frame; switching to safe render mode');
      if (this.onSafeMode) this.onSafeMode();
    }
  }
}
