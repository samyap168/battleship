// Procedural hull weathering for metal/paint materials (no textures):
// object-space panel seams, vertical rust streaks weeping downward, a salt /
// algae band at the waterline, large-scale grime and roughness breakup.
// Chains onto any existing onBeforeCompile (e.g. cloud shadows).

const GLSL = /* glsl */ `
varying vec3 vWxObj;
float wxH(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
float wxN(vec3 p) {
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(wxH(i), wxH(i + vec3(1, 0, 0)), f.x), mix(wxH(i + vec3(0, 1, 0)), wxH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(wxH(i + vec3(0, 0, 1)), wxH(i + vec3(1, 0, 1)), f.x), mix(wxH(i + vec3(0, 1, 1)), wxH(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`;

export function applyWeathering(mat, amount = 1) {
  if (mat.userData.wxPatched) return mat;
  mat.userData.wxPatched = true;
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    sh.uniforms.uWx = { value: amount };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWxObj;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWxObj = position;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>\nuniform float uWx;\n${GLSL}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 p = vWxObj;
  // panel seams: plates ~1.6 long x 0.9 tall
  float sz = abs(fract(p.z / 1.6) - 0.5), sy = abs(fract((p.y + 0.3) / 0.9) - 0.5), sx = abs(fract(p.x / 1.1) - 0.5);
  float seam = max(max(smoothstep(0.465, 0.5, sz), smoothstep(0.46, 0.5, sy) * 0.7), smoothstep(0.47, 0.5, sx) * 0.6);
  // rust streaks: noise stretched vertically, stronger lower on the hull
  float streak = wxN(vec3(p.x * 4.0, p.y * 0.35, p.z * 4.0));
  float rustMask = smoothstep(0.6, 0.88, streak) * (1.0 - smoothstep(1.5, 12.0, p.y) * 0.6) * smoothstep(-0.6, 0.2, p.y);
  float soot = smoothstep(5.0, 11.0, p.y) * smoothstep(0.35, 0.8, wxN(p * 1.7));
  // waterline salt / algae band
  float wl = 1.0 - smoothstep(0.0, 0.55, abs(p.y - 0.15));
  // large-scale grime mottling
  float grime = wxN(p * 0.9) * 0.6 + wxN(p * 3.1) * 0.4;
  vec3 c = diffuseColor.rgb;
  c *= 1.0 - seam * 0.32 * uWx;
  c *= mix(1.0, 0.62 + grime * 0.55, 0.8 * uWx);
  c = mix(c, vec3(0.3, 0.14, 0.06), rustMask * 0.6 * uWx);
  c = mix(c, vec3(0.05), soot * 0.35 * uWx);
  c = mix(c, vec3(0.16, 0.2, 0.14), wl * 0.45 * uWx);
  diffuseColor.rgb = c;
}`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
{
  float g = wxN(vWxObj * 2.3);
  roughnessFactor = clamp(roughnessFactor + (g - 0.5) * 0.25 * uWx + smoothstep(0.62, 0.9, wxN(vec3(vWxObj.x * 4.0, vWxObj.y * 0.35, vWxObj.z * 4.0))) * 0.25 * uWx, 0.05, 1.0);
}`);
  };
  const key = mat.customProgramCacheKey ? mat.customProgramCacheKey.bind(mat) : () => '';
  mat.customProgramCacheKey = () => key() + '|wx';
  mat.needsUpdate = true;
  return mat;
}
