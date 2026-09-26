import * as THREE from 'three';
import { TEAMS } from '../core/config.js';

// Faction rim light for captains' ships: a Fresnel glow in the team colour so
// friend/foe reads by silhouette (through smoke, at fleet zoom), not just by a
// thin hull stripe. Each shared hull material gets one per-team twin that
// reuses the original shader patches (same program, different uniform).
export const TEAM_RIM = [0, 1].map((t) => ({ value: new THREE.Color(TEAMS[t].color).multiplyScalar(0.5) }));
const twins = new Map();

function twin(m, team) {
  const key = m.uuid + ':' + team;
  let t = twins.get(key);
  if (t) return t;
  t = m.clone();
  const prev = m.onBeforeCompile, prevKey = m.customProgramCacheKey.bind(m);
  t.userData = { ...m.userData };
  t.onBeforeCompile = (sh, r) => {
    if (prev) prev.call(m, sh, r);
    sh.uniforms.uTeamRim = TEAM_RIM[team];
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform vec3 uTeamRim;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  float fr = 1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
  totalEmissiveRadiance += uTeamRim * (fr * fr) * 1.5;
}`);
  };
  t.customProgramCacheKey = () => prevKey() + '|rim';
  twins.set(key, t);
  return t;
}

export function applyTeamRim(root, team) {
  if (!TEAM_RIM[team]) return root;
  root.traverse((o) => {
    if (!o.isMesh || !o.material || Array.isArray(o.material)) return;
    const m = o.material;
    if (!m.isMeshStandardMaterial || m.transparent || m.side === THREE.DoubleSide || m.blending !== THREE.NormalBlending) return;
    o.material = twin(m, team);
  });
  return root;
}
