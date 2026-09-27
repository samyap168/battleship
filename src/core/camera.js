import * as THREE from 'three';
import { BOUNDS } from '../game/map.js';

const smooth = (a, b, k) => a + (b - a) * k;

export class CameraDirector {
  constructor(camera) {
    this.cam = camera;
    this.focus = new THREE.Vector3(0, 0, 0);
    this.goal = new THREE.Vector3();
    this.dist = 150; this.distGoal = 150;
    this.locked = true;
    this.trauma = 0;
    this.t = 0;
    this.intro = 0;
    this.orbit = null; // menu orbit
    this.keys = {};
    this.mouse = { x: 0.5, y: 0.5, inside: false };
    this.yaw = 0; this.yawGoal = 0;   // player orbit around the focus (middle-drag / shift-drag)
    this.tilt = 0; this.tiltGoal = 0; // pitch offset in degrees
  }

  addTrauma(a, x, z) {
    const d = Math.hypot(x - this.focus.x, z - this.focus.z);
    const fall = Math.max(0, 1 - d / 260);
    this.trauma = Math.min(1, this.trauma + a * fall * fall);
  }

  /** Orbit the gameplay camera: dx/dy in screen pixels. */
  orbitBy(dx, dy) {
    this.yawGoal -= dx * 0.006;
    this.tiltGoal = THREE.MathUtils.clamp(this.tiltGoal + dy * 0.18, -30, 22);
  }
  resetOrbit() { this.yawGoal = Math.round(this.yaw / (Math.PI * 2)) * Math.PI * 2; this.tiltGoal = 0; }

  /** Gameplay pitch (degrees) for a zoom distance: 40-60 deg tactical, swinging low past 85. */
  pitchFor(dist) {
    const zoomK = (dist - 85) / (290 - 85), lowK = THREE.MathUtils.smoothstep(85 - dist, 0, 40);
    return zoomK >= 0 ? smooth(40, 60, zoomK) : smooth(40, 16, lowK);
  }

  zoom(delta) { this.distGoal = THREE.MathUtils.clamp(this.distGoal * (1 + delta * 0.0012), 45, 290); }

  /** Keyframed cinematic: [{ t, pos: Vector3, look: Vector3 }], ends at the gameplay pose. */
  startCinematic(keys, end, opts = {}) {
    this.cine = { keys, end, t: 0, dur: keys[keys.length - 1].t, letterbox: opts.letterbox !== false, follow: opts.follow };
    this.onCineEnd = opts.onEnd || null;
    this.intro = 0;
  }

  startIntro(from, to) {
    this.intro = 4.2;
    this.introFrom = from.clone();
    this.introTo = to.clone();
  }

  /** view footprint on the water, for the minimap rectangle */
  get view() {
    // true ground footprint (a rotated trapezoid once the player orbits): screen corners cast onto the sea
    const cam = this.cam, pts = [];
    cam.updateMatrixWorld();
    const o = cam.position, v = (this._vv ||= new THREE.Vector3());
    for (const [nx, ny] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      v.set(nx, ny, 0.5).unproject(cam).sub(o).normalize();
      const t = v.y < -0.02 ? Math.min(-o.y / v.y, 900) : 900; // above the horizon: cap the far edge
      pts.push({ x: o.x + v.x * t, z: o.z + v.z * t });
    }
    return { w: this.dist * 1.45 * cam.aspect * 0.95, h: this.dist * 1.1, pts };
  }

  update(dt, target) {
    this.t += dt;
    const cam = this.cam;
    if (this.orbit) {
      // slow cinematic drift for the menu / spectator
      const o = this.orbit;
      o.a += dt * 0.035;
      if (o.follow && o.follow()) {
        const f = o.follow();
        o.cx = smooth(o.cx, f.x, dt * 0.3); o.cz = smooth(o.cz, f.z, dt * 0.3);
      }
      const x = o.cx + Math.cos(o.a) * o.r, z = o.cz + Math.sin(o.a) * o.r;
      cam.position.set(x, o.h + Math.sin(this.t * 0.2) * 6, z);
      cam.lookAt(o.cx, 4, o.cz);
      this.focus.set(o.cx, 0, o.cz);
      return;
    }
    if (this.cine) {
      const C = this.cine;
      C.t += dt;
      const k = C.keys;
      let i = 0;
      while (i < k.length - 2 && C.t > k[i + 1].t) i++;
      const a = k[i], b = k[i + 1];
      const u = THREE.MathUtils.clamp((C.t - a.t) / (b.t - a.t), 0, 1);
      const e = u * u * (3 - 2 * u);
      cam.position.lerpVectors(a.pos, b.pos, e);
      this._look = (this._look || new THREE.Vector3()).lerpVectors(a.look, b.look, e);
      if (C.follow) { const f = C.follow(); cam.position.x += f.x; cam.position.z += f.z; this._look.x += f.x; this._look.z += f.z; }
      cam.lookAt(this._look);
      this.focus.set(this._look.x, 0, this._look.z);
      if (C.t >= C.dur) {
        this.cine = null; const e2 = C.follow ? C.follow() : C.end; this.snapTo(e2.x, e2.z);
        if (this.onCineEnd) { const f = this.onCineEnd; this.onCineEnd = null; f(); }
      }
      return;
    }
    if (this.intro > 0) {
      this.intro -= dt;
      const k = 1 - Math.max(0, this.intro) / 4.2;
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      this.focus.lerpVectors(this.introFrom, this.introTo, e);
      const d = smooth(520, this.dist, e);
      const pitch = THREE.MathUtils.degToRad(smooth(30, 56, e));
      const yaw = smooth(-0.9, 0, e);
      cam.position.set(this.focus.x + Math.sin(yaw) * Math.cos(pitch) * d, Math.sin(pitch) * d, this.focus.z + Math.cos(yaw) * Math.cos(pitch) * d);
      cam.lookAt(this.focus);
      return;
    }
    // follow / free pan
    const pan = 340 * dt * (this.dist / 160);
    let px = 0, pz = 0;
    if (this.keys.ArrowLeft) px -= 1; if (this.keys.ArrowRight) px += 1;
    if (this.keys.ArrowUp) pz -= 1; if (this.keys.ArrowDown) pz += 1;
    if (this.mouse.inside && !this.locked) {
      const m = 0.012;
      if (this.mouse.x < m) px -= 1; if (this.mouse.x > 1 - m) px += 1;
      if (this.mouse.y < m) pz -= 1; if (this.mouse.y > 1 - m) pz += 1;
    }
    if (px || pz) {
      // pan in screen space: rotate by the orbit so 'up' is always away from the camera
      const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
      this.locked = false; this.goal.x += (px * cy + pz * sy) * pan; this.goal.z += (-px * sy + pz * cy) * pan;
    }
    else if (this.locked && target) {
      // lead the camera slightly in the direction of travel
      this.goal.set(target.x + (target.vx || 0) * 0.35 - Math.sin(this.yaw) * 6, 0, target.z + (target.vz || 0) * 0.35 - Math.cos(this.yaw) * 6);
    }
    this.goal.x = THREE.MathUtils.clamp(this.goal.x, -BOUNDS.x - 60, BOUNDS.x + 60);
    this.goal.z = THREE.MathUtils.clamp(this.goal.z, -BOUNDS.z - 40, BOUNDS.z + 60);
    const k = 1 - Math.exp(-dt * (this.locked ? 5 : 10));
    this.focus.lerp(this.goal, k);
    this.dist = smooth(this.dist, this.distGoal, 1 - Math.exp(-dt * 8));
    // tactical view from 85 up (44-62 deg); zooming in past that swings down to a
    // low 'photo' angle just above the swell, looking toward the horizon
    const lowK = THREE.MathUtils.smoothstep(85 - this.dist, 0, 40);
    const ko = 1 - Math.exp(-dt * 10);
    this.yaw = smooth(this.yaw, this.yawGoal, ko); this.tilt = smooth(this.tilt, this.tiltGoal, ko);
    const basePitch = this.pitchFor(this.dist);
    const pitch = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(basePitch + this.tilt, 12, 84));
    const lookY = lowK * 9;
    const hor = Math.cos(pitch) * this.dist;
    let x = this.focus.x + Math.sin(this.yaw) * hor, y = Math.sin(pitch) * this.dist, z = this.focus.z + Math.cos(this.yaw) * hor;
    // trauma shake (squared for a punchy falloff)
    this.trauma = Math.max(0, this.trauma - dt * 1.6);
    const s = this.trauma * this.trauma;
    const n = (f, o) => Math.sin(this.t * f + o) * 0.6 + Math.sin(this.t * f * 2.3 + o * 3.1) * 0.4;
    x += n(37, 0) * s * 4; y += n(41, 1) * s * 3; z += n(33, 2) * s * 4;
    cam.position.set(x, y, z);
    cam.lookAt(this.focus.x + n(29, 4) * s * 1.5, lookY, this.focus.z + n(31, 5) * s * 1.5);
    cam.rotateZ(n(23, 6) * s * 0.03);
  }

  snapTo(x, z) { this.goal.set(x, 0, z); this.focus.set(x, 0, z); }
}
