// Foliage shading for the instanced tree crowns: breaks the low-poly blobs
// into leaf clumps (cellular noise in object space: each cell is a clump with
// its own tint, lit dome and dark gaps between clumps), plus a sun-through-
// leaves translucency glow. Bark (warm vertex colour) is left untouched.
const GLSL = /* glsl */`
varying vec3 vLfP; varying float vLeaf;
vec3 lfH3(vec3 p) { vec3 p3 = fract(p * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yxz + 33.33); return fract((p3.xxy + p3.yxx) * p3.zyx); }
// 2x2x2 cellular: returns (F1, F2, cell hash)
vec3 lfCell(vec3 p) {
  vec3 b = floor(p - 0.5), f = p - b;
  float f1 = 9.0, f2 = 9.0, id = 0.0;
  for (int i = 0; i < 2; i++) for (int j = 0; j < 2; j++) for (int k = 0; k < 2; k++) {
    vec3 o = vec3(float(i), float(j), float(k));
    vec3 h = lfH3(b + o);
    vec3 d = o + 0.15 + h * 0.7 - f;
    float dd = dot(d, d);
    if (dd < f1) { f2 = f1; f1 = dd; id = h.x; } else if (dd < f2) f2 = dd;
  }
  return vec3(sqrt(f1), sqrt(f2), id);
}
`;

export function applyFoliage(mat, scale = 1.9) {
  if (mat.userData.lfPatched) return mat;
  mat.userData.lfPatched = true;
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLfP; varying float vLeaf;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
vLfP = position * ${scale.toFixed(3)};
#ifdef USE_COLOR
vLeaf = color.r > color.g * 1.3 ? 0.0 : 1.0;
#else
vLeaf = 1.0;
#endif`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>\n${GLSL}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float lfDome = 1.0, lfGap = 0.0;
if (vLeaf > 0.5) {
  vec3 fine = lfCell(vLfP * 4.2);                         // individual leaf sparkle
  vec3 c = lfCell(vLfP + (fine.x - 0.5) * 0.35);          // warped: clumps have ragged edges
  lfGap = 1.0 - smoothstep(0.0, 0.5, c.y - c.x);          // soft crevices between clumps
  lfDome = 1.0 - smoothstep(0.0, 0.9, c.x);               // clumps are lit domes
  float tint = c.z;
  diffuseColor.rgb *= mix(0.84, 1.14, tint) * (0.55 + 0.6 * lfDome) * (1.0 - lfGap * 0.35) * (0.74 + fine.x * 0.48);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(1.25, 1.12, 0.6), smoothstep(0.82, 1.0, tint) * 0.6); // sun-scorched clumps
} else {
  // bark: its own brown (instance tint is for the leaves), with vertical fibre streaks
  float fib = lfH3(floor(vec3(vLfP.x * 9.0, vLfP.y * 0.8, vLfP.z * 9.0))).x;
  diffuseColor.rgb = vec3(0.2, 0.14, 0.09) * (0.75 + fib * 0.4);
}`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
if (vLeaf > 0.5) roughnessFactor = clamp(roughnessFactor - lfDome * 0.18 + lfGap * 0.2, 0.3, 1.0);`)
      .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
#if NUM_DIR_LIGHTS > 0
if (vLeaf > 0.5) {
  // translucency: sunlight scattering through backlit leaves toward the eye
  vec3 Ls = directionalLights[0].direction;
  float back = pow(max(dot(normalize(vViewPosition), -Ls), 0.0), 3.0);
  float wrap = max(dot(-normal, Ls), 0.0);
  reflectedLight.directDiffuse += directionalLights[0].color * diffuseColor.rgb * vec3(0.9, 1.1, 0.35) * (back * 0.9 + wrap * 0.25) * lfDome * (1.0 - lfGap) * 0.55;
}
#endif`);
  };
  const key = mat.customProgramCacheKey ? mat.customProgramCacheKey.bind(mat) : () => '';
  mat.customProgramCacheKey = () => key() + '|lf';
  mat.needsUpdate = true;
  return mat;
}

// Ground detail for the island terrain (vertex-coloured, no textures):
// world-space grass mottling + speckle on flats, sedimentary strata and
// grain on cliffs, so close shots don't read as flat-shaded plastic.
export function applyTerrainDetail(mat) {
  if (mat.userData.tdPatched) return mat;
  mat.userData.tdPatched = true;
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    if (prev) prev(sh, r);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vTdW; varying vec3 vTdN;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvTdW = (modelMatrix * vec4(position, 1.0)).xyz; vTdN = normalize(mat3(modelMatrix) * normal);');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vTdW; varying vec3 vTdN;
float tdH(vec3 p) { vec3 p3 = fract(p * 0.1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y) * p3.z); }
float tdN(vec3 p) { vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(tdH(i), tdH(i + vec3(1, 0, 0)), f.x), mix(tdH(i + vec3(0, 1, 0)), tdH(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(tdH(i + vec3(0, 0, 1)), tdH(i + vec3(1, 0, 1)), f.x), mix(tdH(i + vec3(0, 1, 1)), tdH(i + vec3(1, 1, 1)), f.x), f.y), f.z); }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  vec3 p = vTdW;
  float tFlat = smoothstep(0.55, 0.85, vTdN.y);
  float m1 = tdN(p * 0.18), m2 = tdN(p * 0.7), sp = tdN(p * 3.1);
  // flats: patchy grass, darker tufts, sun-bleached spots
  vec3 g = diffuseColor.rgb * (0.78 + m1 * 0.3) * (0.85 + m2 * 0.25) * (0.88 + sp * 0.2);
  g = mix(g, g * vec3(1.18, 1.1, 0.7), smoothstep(0.62, 0.8, m1) * 0.5);
  // cliffs: wavy strata bands + grain
  // each outcrop gets its own dip and bed spacing (low-frequency noise over the map), so strata never
  // line up at the same heights across towers like a tiled texture
  vec2 cell = p.xz * 0.006;
  float dipA = tdN(vec3(cell, 3.1)) * 6.283, dip = 0.08 + tdN(vec3(cell, 7.7)) * 0.3;
  float freq = 0.5 + tdN(vec3(cell, 11.3)) * 0.65; // beds 5 to 12 m thick: finer bands read as a fingerprint, not rock
  float bph = (p.y + dot(p.xz, vec2(cos(dipA), sin(dipA))) * dip) * freq + tdN(p * 0.07) * 1.4 + tdN(vec3(cell, 5.3)) * 40.0; // gentle undulation: strong warping reads as a fingerprint
  // bands thinner than a pixel average out instead of shimmering into moire (distant cliffs)
  float band = sin(bph) * (1.0 - smoothstep(0.7, 2.2, fwidth(bph)));
  float erode = 0.88 + 0.12 * tdN(vec3(p.x * 0.55, p.y * 0.05, p.z * 0.55)); // vertical weathering streaks break up the horizontal beds
  vec3 c = diffuseColor.rgb * (0.86 + 0.14 * smoothstep(-0.2, 0.9, band)) * erode * (0.82 + m2 * 0.2 + sp * 0.14);
  c *= 1.0 - smoothstep(0.93, 1.0, abs(band)) * 0.18 * step(band, 0.0);
  diffuseColor.rgb = mix(c, g, tFlat);
}`);
  };
  const key = mat.customProgramCacheKey ? mat.customProgramCacheKey.bind(mat) : () => '';
  mat.customProgramCacheKey = () => key() + '|td';
  mat.needsUpdate = true;
  return mat;
}
