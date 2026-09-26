// Minimal inline SVG icon set for abilities / upgrades (stroke-based, crisp at any DPI).
const S = (body) => `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const ICONS = {
  projectile: S('<path d="M8 40 L34 14"/><path d="M26 12 L36 12 L36 22"/><circle cx="12" cy="36" r="3" fill="currentColor"/>'),
  chain: S('<circle cx="14" cy="24" r="6"/><circle cx="34" cy="24" r="6"/><path d="M20 24 H28"/><path d="M6 12 l6 4 M42 12 l-6 4" opacity=".6"/>'),
  grapeshot: S('<path d="M8 24 L40 10 M8 24 L42 24 M8 24 L40 38"/><circle cx="8" cy="24" r="3" fill="currentColor"/>'),
  barrage: S('<circle cx="24" cy="26" r="14"/><path d="M24 6 V16 M24 36 V44 M4 26 H14 M34 26 H44"/><circle cx="24" cy="26" r="3" fill="currentColor"/>'),
  volley: S('<path d="M6 36 Q18 6 30 20 M10 40 Q24 10 38 24 M14 44 Q30 16 44 30"/>'),
  speed: S('<path d="M10 12 L22 24 L10 36 M24 12 L36 24 L24 36"/>'),
  shield: S('<path d="M24 6 L40 12 V24 C40 34 32 40 24 43 C16 40 8 34 8 24 V12 Z"/>'),
  heal: S('<path d="M24 10 V38 M10 24 H38"/><circle cx="24" cy="24" r="18" opacity=".45"/>'),
  dash: S('<path d="M6 24 H34 M26 14 L38 24 L26 34"/><path d="M6 14 H16 M6 34 H16" opacity=".6"/>'),
  smoke: S('<path d="M12 34 C4 34 4 24 12 24 C12 14 26 12 28 20 C34 14 44 20 38 28 C44 32 40 38 34 36 Z"/>'),
  mines: S('<circle cx="24" cy="26" r="9"/><path d="M24 11 V17 M24 35 V41 M9 26 H15 M33 26 H39 M13 15 L17 19 M31 33 L35 37 M35 15 L31 19 M17 33 L13 37"/>'),
  homing: S('<path d="M8 40 C8 20 30 30 34 12"/><path d="M28 10 L36 10 L36 18"/><circle cx="38" cy="36" r="4"/>'),
  swarm: S('<circle cx="12" cy="14" r="3" fill="currentColor"/><circle cx="24" cy="10" r="3" fill="currentColor"/><circle cx="36" cy="16" r="3" fill="currentColor"/><circle cx="18" cy="26" r="3" fill="currentColor"/><circle cx="32" cy="28" r="3" fill="currentColor"/><circle cx="24" cy="38" r="3" fill="currentColor"/>'),
  fighter: S('<path d="M24 6 L28 20 L42 26 L28 28 L26 40 L24 36 L22 40 L20 28 L6 26 L20 20 Z"/>'),
  beam: S('<path d="M6 30 H42" stroke-width="5"/><path d="M6 30 H42" stroke="#fff" stroke-width="1.5"/><path d="M14 18 L20 24 L16 24 L22 30" opacity=".7"/>'),
  pointdefense: S('<circle cx="24" cy="24" r="16" stroke-dasharray="4 4"/><circle cx="24" cy="24" r="5"/><path d="M24 24 L38 12"/>'),
  emp: S('<path d="M26 4 L14 26 H24 L20 44 L34 20 H24 Z"/>'),
  ageup: S('<path d="M24 6 L36 22 H28 V40 H20 V22 H12 Z"/>'),
  plating: S('<path d="M24 6 L40 12 V24 C40 34 32 40 24 43 C16 40 8 34 8 24 V12 Z"/><path d="M16 22 H32 M16 30 H32" opacity=".6"/>'),
  gunnery: S('<circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="4" fill="currentColor"/><path d="M24 4 V12 M24 36 V44 M4 24 H12 M36 24 H44"/>'),
  engines: S('<circle cx="24" cy="24" r="8"/><path d="M24 6 V12 M24 36 V42 M6 24 H12 M36 24 H42 M11 11 L15 15 M33 33 L37 37 M37 11 L33 15 M15 33 L11 37"/>'),
  reload: S('<path d="M38 16 A16 16 0 1 0 40 28"/><path d="M40 8 V17 H31"/>'),
  repair: S('<path d="M30 8 A9 9 0 0 0 22 20 L8 34 L14 40 L28 26 A9 9 0 0 0 40 18 L34 22 L28 20 L26 14 Z"/>'),
};

export function abilityIcon(ab) {
  if (ab.id === 'chainshot') return ICONS.chain;
  if (ab.id === 'grapeshot') return ICONS.grapeshot;
  if (ab.type === 'buff') return ab.speedMul ? ICONS.speed : ab.healPct ? ICONS.heal : ICONS.shield;
  if (ab.type === 'swarm') return ab.drone === 'micro' ? ICONS.swarm : ICONS.fighter;
  if (ab.model === 'emp') return ICONS.emp;
  return ICONS[ab.type] || ICONS.projectile;
}
