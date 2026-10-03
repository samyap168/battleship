// Drifting cloud shadows shared by every lit surface (ocean, islands, ships,
// forts). One global uniform object drives all patched materials, so the
// shadows stay coherent across the whole world.

export const CLOUD = {
  uCloudT: { value: 0 },
  uCloudAmt: { value: 0.6 },   // shadow strength (0 = off)
};

export const CLOUD_GLSL = /* glsl */ `
uniform float uCloudT; uniform float uCloudAmt;
float csHash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float csNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(csHash(i), csHash(i + vec2(1, 0)), u.x), mix(csHash(i + vec2(0, 1)), csHash(i + vec2(1, 1)), u.x), u.y);
}
float cloudShadow(vec2 xz) {
  vec2 p = xz * 0.0042 + vec2(uCloudT * 0.011, uCloudT * 0.004);
  float n = csNoise(p) * 0.55 + csNoise(p * 2.1 + 5.3) * 0.3 + csNoise(p * 4.3 - 2.1) * 0.15;
  return 1.0 - smoothstep(0.48, 0.72, n) * uCloudAmt;
}
`;

/** Patch a MeshStandard/Physical material (works with instancing). */
export function applyCloudShadow(mat) {
  if (mat.userData.cloudPatched) return mat;
  mat.userData.cloudPatched = true;
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    Object.assign(sh.uniforms, CLOUD);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vCloudW;')
      .replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
{
  vec4 cw = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  cw = instanceMatrix * cw;
  #endif
  vCloudW = (modelMatrix * cw).xz;
}`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec2 vCloudW;\n${CLOUD_GLSL}`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
{
  float cs = cloudShadow(vCloudW);
  reflectedLight.directDiffuse *= cs;
  reflectedLight.directSpecular *= cs;
}`);
  };
  const key = mat.customProgramCacheKey ? mat.customProgramCacheKey.bind(mat) : () => '';
  mat.customProgramCacheKey = () => key() + '|cloud';
  mat.needsUpdate = true;
  return mat;
}
