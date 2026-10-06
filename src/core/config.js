// Central balance + content data. Everything tunable lives here so design
// iteration never requires touching systems code.

export const TEAMS = [
  { id: 0, name: 'Azure Dominion', short: 'Azure', color: 0x2f9bff, glow: 0x5fc4ff, css: '#4db4ff' },
  { id: 1, name: 'Crimson Hegemony', short: 'Crimson', color: 0xff3b2f, glow: 0xff7a3d, css: '#ff5a4a' },
];

export const MATCH = {
  duration: 600,          // 10 minute matches
  firstWave: 12,          // seconds until the first creep wave
  waveInterval: 30,
  passiveGold: 5,         // gold per second per player
  startGold: 200,
  respawnBase: 5,
  respawnPerAge: 2.5,
  fountainHeal: 0.12,     // fraction of max hp per second at home fountain
  maxLevel: 12,
};

export const MAP = {
  halfW: 720,
  halfH: 470,
  baseX: 640,             // citadel x (mirrored)
  laneZ: 330,             // top / bottom lane offset
};

// Civilization ages. Every hero advances independently (by spending gold),
// but the team era (median age) upgrades creeps + structures for the whole team.
export const AGES = [
  { id: 1, name: 'Age of Sail', short: 'Sail', cost: 0, blurb: 'Timber hulls, canvas and black powder.' },
  { id: 2, name: 'Age of Steam', short: 'Steam', cost: 600, blurb: 'Iron plating and coal-fired engines.' },
  { id: 3, name: 'Age of Dreadnoughts', short: 'Dreadnought', cost: 1300, blurb: 'Big-gun turrets and the torpedo.' },
  { id: 4, name: 'Age of Airpower', short: 'Airpower', cost: 2200, blurb: 'Flight decks, radar and cruise missiles.' },
  { id: 5, name: 'Age of Swarms', short: 'Swarm', cost: 3000, blurb: 'Railguns, lasers and autonomous drone swarms.' },
];

// Hulls available at each age. Ages 3-5 offer a branching choice.
// Directed counter graph (rock-paper-scissors between branches). Bots counter-pick
// from it and the age-choice cards generate their matchup lines from it.
export const COUNTERS = {
  torpedo: ['dreadnought', 'battleship', 'arsenal'], // assassin torpedoes gut slow capital ships
  dreadnought: ['ironclad', 'frigate'],        // heavy salvos crush the older fleet
  battleship: ['carrier', 'mothership'],        // flak umbrella shreds air wings and drones
  carrier: ['dreadnought', 'torpedo'],          // air strikes from beyond gun range
  arsenal: ['carrier', 'battleship'],           // point-defense swats air wings; the railgun outranges capital ships
  mothership: ['arsenal', 'dreadnought', 'torpedo'], // swarms saturate point defense and overwhelm ships without anti-air
};
// Damage multiplier a hull deals to the hulls it counters (combat.js). Late game forms a triangle:
// Arsenal > Battleship > Mothership > Arsenal.
export const COUNTER_BONUS = 1.2;

export const AGE_HULLS = {
  1: ['frigate'],
  2: ['ironclad'],
  3: ['dreadnought', 'torpedo'],
  4: ['battleship', 'carrier'],
  5: ['arsenal', 'mothership'],
};

// gun.kind: ball | shell | flak | laser | pulse
export const HULLS = {
  frigate: {
    name: 'Ship-of-the-Line Frigate', age: 1, role: 'Brawler',
    desc: 'Three-masted man-o-war. Broadside cannons and chain shot.',
    hp: 950, armor: 0.0, speed: 26, turn: 1.6, radius: 7,
    guns: { range: 58, dmg: 30, cd: 1.3, count: 2, kind: 'ball', speed: 95 },
    abilities: ['chainshot', 'fullsail', 'grapeshot', 'bombard'],
  },
  ironclad: {
    name: 'Steam Ironclad', age: 2, role: 'Bruiser',
    desc: 'Armoured casemate ram powered by coal. Explosive shells.',
    hp: 1550, armor: 0.1, speed: 25, turn: 1.5, radius: 8,
    guns: { range: 64, dmg: 44, cd: 1.25, count: 2, kind: 'shell', speed: 110 },
    abilities: ['he_shell', 'steamsurge', 'ram', 'mortar'],
  },
  dreadnought: {
    name: 'Dreadnought', age: 3, role: 'Artillery',
    desc: 'All-big-gun battleship. Devastating salvos at long range.',
    hp: 2450, armor: 0.2, speed: 23, turn: 1.2, radius: 10,
    guns: { range: 78, dmg: 72, cd: 1.5, count: 3, kind: 'shell', speed: 125 },
    abilities: ['mainbattery', 'smoke', 'plating', 'fullbroadside'],
  },
  torpedo: {
    name: 'Torpedo Cruiser', age: 3, role: 'Assassin',
    desc: 'Fast, lean hunter. Torpedo spreads and depth charges.',
    hp: 2150, armor: 0.15, speed: 31, turn: 1.9, radius: 8,
    guns: { range: 66, dmg: 50, cd: 1.0, count: 2, kind: 'shell', speed: 120 },
    abilities: ['torpspread', 'afterburn', 'depthcharge', 'wolfpack'],
  },
  battleship: {
    name: 'Fast Battleship', age: 4, role: 'Artillery',
    desc: 'Radar-guided main battery, flak and cruise missiles.',
    hp: 3450, armor: 0.25, speed: 23, turn: 1.15, radius: 11,
    guns: { range: 86, dmg: 104, cd: 1.6, count: 3, kind: 'shell', speed: 140 },
    abilities: ['mainbattery2', 'flak', 'damagecontrol', 'cruise'],
  },
  carrier: {
    name: 'Fleet Carrier', age: 4, role: 'Controller',
    desc: 'Floating airfield. Launches fighter squadrons and dive bombers.',
    hp: 3000, armor: 0.18, speed: 24, turn: 1.1, radius: 12,
    guns: { range: 72, dmg: 50, cd: 0.9, count: 2, kind: 'flak', speed: 150 },
    abilities: ['fighters', 'divebomb', 'damagecontrol', 'airwing'],
  },
  arsenal: {
    name: 'Arsenal Cruiser', age: 5, role: 'Artillery',
    desc: 'Stealth-hulled railgun platform with vertical launch missiles.',
    hp: 3950, armor: 0.25, speed: 25, turn: 1.3, radius: 11,
    guns: { range: 96, dmg: 128, cd: 1.4, count: 2, kind: 'pulse', speed: 260 },
    abilities: ['railgun', 'pointdefense', 'salvo', 'hypersonic'],
  },
  mothership: {
    name: 'Drone Mothership', age: 5, role: 'Swarm',
    desc: 'Autonomous hive-carrier. Blots out the sky with tactical drones.',
    hp: 3700, armor: 0.2, speed: 25, turn: 1.2, radius: 12,
    guns: { range: 82, dmg: 64, cd: 0.8, count: 2, kind: 'laser', speed: 0 },
    abilities: ['microswarm', 'aegis', 'emp', 'hivestorm'],
  },
};

// Ability definitions. `type` selects the implementation in game/abilities.js.
// target: 'point' (ground-targeted), 'dir' (skillshot direction), 'self', 'auto'.
export const ABILITIES = {
  // ---- Age of Sail
  chainshot: { name: 'Chain Shot', type: 'projectile', target: 'dir', cd: 7, range: 95,
    dmg: 95, speed: 120, count: 1, spread: 0, radius: 3, slow: 0.45, slowDur: 2.2, model: 'chain',
    desc: 'Fire spinning chained balls that shred rigging, slowing the target.' },
  fullsail: { name: 'Full Sail', type: 'buff', target: 'self', cd: 12, speedMul: 1.65, dur: 3.2,
    desc: 'Catch the wind: +65% speed for 3s.' },
  grapeshot: { name: 'Grapeshot', type: 'projectile', target: 'dir', cd: 8, range: 55,
    dmg: 26, speed: 140, count: 9, spread: 0.7, radius: 2.5, model: 'ball',
    desc: 'A scatter-blast of iron shot in a wide cone.' },
  bombard: { name: 'Bombard', type: 'barrage', target: 'point', cd: 38, range: 120, minLevel: 3,
    dmg: 70, count: 12, area: 20, radius: 7, delay: 0.9, spreadTime: 1.4, model: 'ball',
    desc: 'Every gun fires at once, raining a dozen shots on an area.' },

  // ---- Age of Steam
  he_shell: { name: 'High-Explosive Shell', type: 'projectile', target: 'dir', cd: 7, range: 110,
    dmg: 170, speed: 130, count: 1, spread: 0, radius: 12, model: 'shell_big',
    desc: 'A shell that detonates on impact, damaging everything nearby.' },
  steamsurge: { name: 'Steam Surge', type: 'buff', target: 'self', cd: 12, speedMul: 1.7, dmgTaken: 0.8, dur: 3,
    desc: 'Overpressure the boilers: +70% speed and 20% damage reduction.' },
  ram: { name: 'Iron Ram', type: 'dash', target: 'dir', cd: 11, range: 50, dmg: 190, stun: 0.9, radius: 10,
    desc: 'Charge forward, ramming and stunning ships in your path.' },
  mortar: { name: 'Mortar Barrage', type: 'barrage', target: 'point', cd: 40, range: 140, minLevel: 3,
    dmg: 85, count: 16, area: 26, radius: 8, delay: 1.1, spreadTime: 2.0, model: 'shell',
    desc: 'High-arc mortars saturate an area for 2 seconds.' },

  // ---- Dreadnought
  mainbattery: { name: 'Main Battery', type: 'barrage', target: 'point', cd: 13, range: 125, minLevel: 2,
    dmg: 125, count: 6, area: 12, radius: 8, delay: 0.7, spreadTime: 0.35, model: 'shell_big',
    desc: 'A six-gun salvo from the 12-inch turrets.' },
  smoke: { name: 'Smoke Screen', type: 'smoke', target: 'self', cd: 18, dur: 4.5, radius: 32,
    desc: 'Deploy smoke. Allied ships inside cannot be targeted by guns or towers.' },
  plating: { name: 'Belt Armour', type: 'buff', target: 'self', cd: 14, shield: 650, dur: 4,
    desc: 'Brace the belt armour: absorb 650 damage for 4s.' },
  fullbroadside: { name: 'Full Broadside', type: 'volley', target: 'auto', cd: 45, range: 100, minLevel: 3,
    dmg: 115, count: 18, radius: 7, spreadTime: 1.5, model: 'shell_big',
    desc: 'Unload every barrel at all enemies within range.' },

  // ---- Torpedo Cruiser
  torpspread: { name: 'Torpedo Spread', type: 'projectile', target: 'dir', cd: 8, range: 150,
    dmg: 265, speed: 72, count: 3, spread: 0.32, radius: 8, model: 'torpedo',
    desc: 'Launch three torpedoes in a fan.' },
  afterburn: { name: 'Flank Speed', type: 'buff', target: 'self', cd: 10, speedMul: 1.9, dur: 2.5,
    desc: 'Emergency flank speed: +90% for 2.5s.' },
  depthcharge: { name: 'Mine Field', type: 'mines', target: 'self', cd: 14, count: 5, dmg: 190, radius: 13, dur: 22,
    desc: 'Drop proximity mines in your wake.' },
  wolfpack: { name: 'Wolfpack', type: 'homing', target: 'auto', cd: 45, range: 140, minLevel: 3,
    dmg: 210, count: 10, speed: 80, radius: 8, model: 'torpedo',
    desc: 'Ten homing torpedoes hunt every enemy nearby.' },

  // ---- Battleship
  mainbattery2: { name: 'Radar Salvo', type: 'barrage', target: 'point', cd: 13, range: 145, minLevel: 2,
    dmg: 188, count: 7, area: 14, radius: 9, delay: 0.6, spreadTime: 0.3, model: 'shell_big',
    desc: 'Radar-directed seven-gun salvo.' },
  flak: { name: 'Flak Umbrella', type: 'pointdefense', target: 'self', cd: 16, dur: 4.5, radius: 45,
    desc: 'Shred incoming drones, aircraft and missiles around you.' },
  damagecontrol: { name: 'Damage Control', type: 'buff', target: 'self', cd: 18, healPct: 0.33, dur: 4,
    desc: 'Repair crews restore 33% hull over 4s.' },
  cruise: { name: 'Cruise Missiles', type: 'homing', target: 'auto', cd: 45, range: 210, minLevel: 3,
    dmg: 270, count: 8, speed: 115, radius: 11, model: 'missile',
    desc: 'Vertical-launch cruise missiles strike 8 targets.' },

  // ---- Carrier
  fighters: { name: 'Fighter Squadron', type: 'swarm', target: 'point', cd: 14, range: 140,
    count: 6, drone: 'fighter', dur: 14, dmg: 18, fireCd: 0.35, radius: 0,
    desc: 'Launch six fighters that strafe enemies near the target.' },
  divebomb: { name: 'Dive Bombers', type: 'swarm', target: 'point', cd: 11, range: 170,
    count: 4, drone: 'bomber', dur: 6, dmg: 265, radius: 15,
    desc: 'Bombers dive on the target area.' },
  airwing: { name: 'Air Wing Alpha', type: 'swarm', target: 'point', cd: 50, range: 190, minLevel: 3,
    count: 16, drone: 'fighter', extra: { drone: 'bomber', count: 6 }, dur: 18, dmg: 20, fireCd: 0.3, radius: 15,
    desc: 'Launch the full air wing: 16 fighters and 6 bombers.' },

  // ---- Arsenal Cruiser
  railgun: { name: 'Railgun', type: 'beam', target: 'dir', cd: 12, range: 230, dmg: 255, minLevel: 2, width: 5,
    desc: 'Hypervelocity slug pierces everything in a line.' },
  pointdefense: { name: 'Point Defense Lasers', type: 'pointdefense', target: 'self', cd: 15, dur: 5, radius: 55, laser: true,
    desc: 'Laser CIWS vaporises drones and missiles nearby.' },
  salvo: { name: 'VLS Salvo', type: 'homing', target: 'auto', cd: 10, range: 155,
    dmg: 95, count: 12, speed: 130, radius: 6, model: 'missile',
    desc: 'Ripple-fire 12 missiles from vertical launch cells.' },
  hypersonic: { name: 'Hypersonic Strike', type: 'barrage', target: 'point', cd: 50, range: 420, minLevel: 3,
    dmg: 950, count: 1, area: 0, radius: 42, delay: 1.6, spreadTime: 0, model: 'hypersonic',
    desc: 'A Mach-8 glide vehicle obliterates a wide area after 1.6s.' },

  // ---- Drone Mothership
  microswarm: { name: 'Micro Swarm', type: 'swarm', target: 'point', cd: 11, range: 150,
    count: 18, drone: 'micro', dur: 8, dmg: 43, radius: 5,
    desc: 'Release 18 kamikaze micro-drones that seek enemies.' },
  aegis: { name: 'Aegis Drones', type: 'buff', target: 'self', cd: 16, shield: 850, dur: 6, drones: 6,
    desc: 'Six shield drones orbit your hull, absorbing 850 damage.' },
  emp: { name: 'EMP Drone', type: 'projectile', target: 'dir', cd: 14, range: 130,
    dmg: 150, speed: 110, count: 1, spread: 0, radius: 30, stun: 1.6, model: 'emp',
    desc: 'An EMP drone detonates, stunning and silencing an area.' },
  hivestorm: { name: 'Hive Storm', type: 'swarm', target: 'point', cd: 55, range: 200, minLevel: 3,
    count: 80, drone: 'micro', dur: 10, dmg: 42, radius: 5,
    desc: 'Eighty tactical drones blot out the sun over the target area.' },
};

// Shop upgrades carry over through every age.
export const UPGRADES = [
  { id: 'plating', name: 'Hull Plating', icon: '🛡', max: 5, cost: [150, 250, 350, 450, 550], desc: '+10% max hull per level' },
  { id: 'gunnery', name: 'Gunnery', icon: '🎯', max: 5, cost: [150, 250, 350, 450, 550], desc: '+10% weapon & ability damage' },
  { id: 'engines', name: 'Engines', icon: '⚙', max: 5, cost: [120, 200, 280, 360, 440], desc: '+6% speed per level' },
  { id: 'reload', name: 'Reload Drills', icon: '⟳', max: 5, cost: [150, 250, 350, 450, 550], desc: '-7% cooldowns & reload' },
  { id: 'repair', name: 'Repair Crews', icon: '✚', max: 5, cost: [120, 200, 280, 360, 440], desc: '+0.4% hull regen /s' },
];

export const CREEPS = {
  light: { hp: 300, dmg: 16, cd: 1.2, range: 46, speed: 21, radius: 4, gold: 40, xp: 45 },
  heavy: { hp: 620, dmg: 30, cd: 1.6, range: 55, speed: 19, radius: 5.5, gold: 72, xp: 80 },
  eraScale: 0.42, // +42% hp/dmg per team era above 1
};

export const STRUCTURES = {
  outer: { hp: 5600, dmg: 100, cd: 1.2, range: 82, armor: 0.3, radius: 9, gold: 220 },
  inner: { hp: 7600, dmg: 125, cd: 1.2, range: 86, armor: 0.35, radius: 10, gold: 280 },
  citadel: { hp: 18000, dmg: 200, cd: 1.0, range: 100, armor: 0.4, radius: 22, gold: 0 },
  scalePerMin: 0.07,
};

export const PORTS = {
  captureTime: 5,
  radius: 32,
  goldPerSec: 2, // per player of owning team
};

export const REWARDS = {
  heroGold: 190, heroGoldPerAge: 50, assistGold: 90, streakGold: 50,
  heroXp: 160, heroXpPerLevel: 40,
  xpShareRadius: 110,
};

export const BOT_NAMES = [
  'Nelson', 'Yamamoto', 'Zheng He', 'Drake', 'Tōgō', 'Nimitz', 'Barbarossa', 'Yi Sun-sin',
  'de Ruyter', 'Cochrane', 'Farragut', 'Jervis', 'Halsey', 'Ching Shih', 'Tromp', 'Themistocles',
];

export const DIFFICULTY = {
  easy: { react: 0.9, aim: 0.55, abilityRate: 0.35, aggression: 0.35, goldMul: 0.85 },
  normal: { react: 0.5, aim: 0.8, abilityRate: 0.65, aggression: 0.55, goldMul: 1.0 },
  hard: { react: 0.25, aim: 0.95, abilityRate: 0.95, aggression: 0.75, goldMul: 1.15 },
};
