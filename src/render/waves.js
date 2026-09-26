// Gerstner wave model shared by GPU (ocean + water decals) and CPU (ship
// buoyancy). Keeping one source of truth means hulls sit exactly on the
// rendered surface.

const G = 9.81;

// [dirX, dirZ, wavelength, amplitude, steepness]
export const WAVES = [
  [0.86, 0.5, 71, 0.9, 0.5],
  [0.52, 0.85, 47, 0.55, 0.5],
  [0.99, 0.12, 33, 0.38, 0.55],
  [-0.62, 0.78, 23, 0.26, 0.6],
  [0.71, -0.7, 16.5, 0.17, 0.6],
  [0.2, 0.98, 11.3, 0.1, 0.55],
  [-0.9, -0.43, 7.9, 0.06, 0.5],
];
const N = WAVES.length;

// Precompute k, omega, Q (normalised steepness)
const W = WAVES.map(([dx, dz, L, A, s]) => {
  const len = Math.hypot(dx, dz);
  const k = (2 * Math.PI) / L;
  return { dx: dx / len, dz: dz / len, k, A, w: Math.sqrt(G * k) * 0.55, Q: s / (k * A * N) };
});

export const WAVE_TIME_SCALE = 1.0;
// Global swell multiplier (storms). Shared by GPU (uniform) and CPU sampling.
export const WAVE_UNIFORMS = { uWaveAmp: { value: 1 } };

/** CPU: surface height + normal at world (x,z) and time t. out = {y, nx, ny, nz} */
export function sampleWaves(x, z, t, out = { y: 0, nx: 0, ny: 1, nz: 0 }) {
  // One fixed-point iteration to undo horizontal displacement.
  let px = x, pz = z;
  for (let it = 0; it < 2; it++) {
    let ox = 0, oz = 0;
    const amp = WAVE_UNIFORMS.uWaveAmp.value;
    for (let i = 0; i < N; i++) {
      const w = W[i];
      const c = Math.cos(w.k * (w.dx * px + w.dz * pz) - w.w * t);
      ox += w.Q * w.A * w.dx * c * amp;
      oz += w.Q * w.A * w.dz * c * amp;
    }
    px = x - ox; pz = z - oz;
  }
  let y = 0, nx = 0, ny = 1, nz = 0;
  const amp = WAVE_UNIFORMS.uWaveAmp.value;
  for (let i = 0; i < N; i++) {
    const w = W[i];
    const ph = w.k * (w.dx * px + w.dz * pz) - w.w * t;
    const s = Math.sin(ph), c = Math.cos(ph);
    y += w.A * s * amp;
    const wa = w.k * w.A * amp;
    nx -= w.dx * wa * c;
    nz -= w.dz * wa * c;
    ny -= w.Q * wa * s;
  }
  const l = Math.hypot(nx, ny, nz);
  out.y = y; out.nx = nx / l; out.ny = ny / l; out.nz = nz / l;
  return out;
}

const f = (v) => v.toFixed(6);

/** GLSL: vec3 gerstner(vec2 xz, float t, out vec3 normal, out float height) */
export const WAVES_GLSL = /* glsl */ `
uniform float uWaveAmp;
vec3 gerstnerWave(vec2 xz, float t, inout vec3 nrm) {
  vec3 d = vec3(0.0);
  float A = uWaveAmp;
${W.map((w) => `  {
    vec2 D = vec2(${f(w.dx)}, ${f(w.dz)});
    float ph = ${f(w.k)} * dot(D, xz) - ${f(w.w)} * t;
    float s = sin(ph); float c = cos(ph);
    d.x += ${f(w.Q * w.A)} * A * D.x * c;
    d.z += ${f(w.Q * w.A)} * A * D.y * c;
    d.y += ${f(w.A)} * A * s;
    nrm.x -= D.x * ${f(w.k * w.A)} * A * c;
    nrm.z -= D.y * ${f(w.k * w.A)} * A * c;
    nrm.y -= ${f(w.Q * w.k * w.A)} * A * s;
  }`).join('\n')}
  return d;
}
`;
