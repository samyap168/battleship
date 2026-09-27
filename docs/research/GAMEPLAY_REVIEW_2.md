# Armada Ascension — Gameplay Review 2

Round 2, verified against code and 6 fresh bot-vs-bot autopilot sims (headless, `sim2.mjs` against `localhost:5173`; times 437–600s, kills 12-49/38-19/49-17/32-17/23-31/14-9). Builds on [`GAMEPLAY_REVIEW_1.md`](GAMEPLAY_REVIEW_1.md).

## Scores

**Moment-to-moment Feel — 8/10 (+1).** The squall now scatters fort and creep fire, not just hero guns: `combat.js:297` adds `d*0.06` scatter to `fireStructure`'s ballistic branch and `fireCreep:281` triples its jitter (`rnd(-2,2)*3`) when `G.storm`. New hit-confirm juice (gold-crit / red-sink X markers, `hud.js:575-586`, driven by `combat.js:100-104` `damage()→G.ui.hitMarker` plus a throttled `hitTick`/`killConfirm` sound) gives the player's own hits real feedback for the first time. Gap found in sim/code review: `fireStructure`'s era-4+ branch calls `this.homing(...)` (`combat.js:292`) with no storm term at all — late-game fortress missiles ignore the squall entirely, so the ambush window closes once either team reaches Airpower.

**Strategic Depth — 7/10 (+1).** Age-choice cards now carry one-line counter guidance (`hud.js:38-45` `MATCHUP`, rendered `hud.js:192`), and bots counter-pick branches via `bot.js:10-14` `COUNTERS` + `shop():280-287` (score by counters-hit, switch only if `score(best) > score(pick)+1`, with anti-3-stack logic). Sim data shows this working: pooled across 6 matches, branch picks were `ironclad:60 (all), dreadnought:28, torpedo:32, battleship:29, carrier:29, arsenal:8, mothership:12` — no longer a flat coin flip, several matches show 2:1 splits favoring one branch depending on what the enemy team fielded. Held back from 8: counter-picking is visible in aggregate but still noisy at n=6, and there's no equivalent counter-pick signal shown to the *human* player mid-draft beyond the static card text (it doesn't reference the actual enemy comp on screen).

**Ability/Hull Design — 7/10 (+2).** `mainbattery`/`mainbattery2` cooldowns went 8→13s with damage cut 150→125 / 205→170 (`config.js:136-138,160-162`), and `railgun` (`config.js:183`) is now 300 dmg / 9s cd (still no `minLevel`, still 0 travel-time — see improvements). Torpedo Spread was buffed 230→265 (`config.js:148`) to compensate. Carrier's flak is a real gun now: `combat.js:262` rolls a 55% per-burst chance to call `G.drones.shootDown` + `interceptNear` in a 42-radius, giving its basic attack the anti-air identity the name always promised. Sim cast counts (aggregated) show Main Battery firing 165 times across 6 matches vs. the old 8s-cd expectation of roughly double that — the cooldown nerf is landing as intended.

**Pacing & Balance — 7/10 (+2).** Kill spreads are still wide (12-49, 49-17), but the shape changed: 5 of 6 matches ran to 577-600s (dusk timeout or a hard-fought late siege) rather than round 1's fast 3-4 minute stomps, and even the most lopsided match (12-49) went to the 600s cap instead of ending in an early citadel loss — `combat.js:74-84` Home Waters (up to -30%/-25% dmg taken near forts when behind 6+ kills) and `:67-72` Backdoor Protection (forts take 45% dmg from unescorted heroes) are visibly doing their job of turning kill-snowballs into contested games rather than curb-stomps. Per-hull final-state damage/kills (small samples, see table) still show a wide spread — Mothership finished with ~11.9 kills/instance vs. Carrier's ~2.0 — so hero-level balance, not match-length pacing, is now the main outstanding problem.

**Bot AI — 7/10 (+1).** `tryAbilities` (`bot.js:214-221`) now sorts the 4 ability slots by an `isCC` predicate (`stun`/`slow`/`dash`/`emp`) before the cast loop: CC-first when `prey` is healthy (`hp>55%`), burst-first when it's low. This is a real behavior change verifiable in code, though the sim's cast-count logging can't directly prove sequencing order without hooking cast *timestamps* per-engagement (out of scope this round) — recommend a follow-up hook if this needs hard proof. Branch counter-picking (`bot.js:280-287`) is the same file's second AI upgrade and is externally verified by the sim's branch-pick distribution above.

**Onboarding — 6/10 (unchanged).** No onboarding-specific changes were in this round's scope (hold-to-aim explanation, hint timing) — item #8 from Round 1 is still open. The new hit-marker/hit-tick feedback (`combat.js:100-104`) incidentally helps a first-time player understand "I am doing damage," but that's Feel, not a taught mechanic.

| Category | R1 | R2 | Δ |
|---|---|---|---|
| Moment-to-moment Feel | 7 | 8 | +1 |
| Strategic Depth | 6 | 7 | +1 |
| Ability/Hull Design | 5 | 7 | +2 |
| Pacing & Balance | 5 | 7 | +2 |
| Bot AI | 6 | 7 | +1 |
| Onboarding | 6 | 6 | 0 |

## Verification table

| Change | Claimed | Code location | Verified |
|---|---|---|---|
| Main Battery cd/dmg | 8→13, 150→125 | `config.js:136-138` `mainbattery` | ✅ `cd:13, dmg:125` |
| Radar Salvo cd/dmg | 13, 205→170 | `config.js:160-162` `mainbattery2` | ✅ `cd:13, dmg:170` |
| Railgun cd/dmg | 9, 300 | `config.js:183` `railgun` | ✅ `cd:9, dmg:300` |
| Torpedo Spread dmg | 230→265 | `config.js:148` `torpspread` | ✅ `dmg:265` |
| Squall scatters forts/creeps | fireStructure/fireCreep | `combat.js:281,297` | ✅ but era≥4 fort missiles (`:292` `homing()`) get no scatter |
| Bots: CC-first on healthy, burst-first on weak | tryAbilities | `bot.js:214-221` | ✅ `isCC` sort by `healthy` flag |
| Bots: counter-pick age branches | COUNTERS, shop() | `bot.js:10-14, 280-287` | ✅ score-by-counters, +1 threshold, anti-3-stack |
| Matchup lines on age cards | MATCHUP | `hud.js:38-45,192` | ✅ 6 hulls, strong/weak line each |
| Carrier flak shoots drones/missiles | combat.js | `combat.js:262` | ✅ 55% chance/burst, `shootDown`+`interceptNear`, r=42 |
| GDD economy synced | heroGold etc. | `config.js:237` vs `GDD.md:65,108-118` | ✅ 190+50/age, assist ~135, all comeback numbers match prose |
| Hit markers + sounds | damage→hitMarker | `combat.js:100-104`, `hud.js:234,575-586` | ✅ gold crit / red sink / white normal, throttled tick+killConfirm |
| Barrage telegraph in danger red | abilities.js | `abilities.js:71-72` | ✅ `hostile ? 0xff3a2a` ring vs. team-glow for allied |
| Catch-up stipend | +gold behind median age | `game.js:396-400` | ✅ `1+0.6*gap` passive gold mult |
| Home waters | dmg reduction trailing team | `combat.js:74-84` | ✅ up to -30% hero / -25% structure dmg taken, behind≥6 |
| Harbour repairs | regen near citadel | `game.js:402` | ✅ +6%/s hp within 90u of own citadel |
| Spawn guard | invuln on respawn | `game.js:493` | ✅ 3s `spawnGuard`, checked in `combat.js:55` |
| Shutdown bounty | +90/streak lvl | `game.js:272-273` | ✅ `victimStreak>=3 ? 90*victimStreak` |
| Backdoor protection | reduced dmg unescorted | `combat.js:67-72` | ✅ ×0.45 unless allied creep within 95u |

## Per-hull balance (final-hull snapshot, 6 sims)

Caveat: `dmgDealt`/`kills` are lifetime totals attributed to whatever hull a hero ended the match on, so this favors hulls reached later by heroes who were already ahead — read as "how strong is finishing the match on this hull," not isolated hull DPS.

| Hull (final) | Instances | Total kills | Kills/instance | Total dmg | Dmg/instance |
|---|---|---|---|---|---|
| Mothership (Age V) | 12 | 143 | **11.9** | 1,128,877 | 94,073 |
| Arsenal Cruiser (Age V) | 8 | 57 | 7.1 | 694,333 | 86,792 |
| Battleship (Age IV) | 22 | 76 | 3.5 | 1,003,894 | 45,632 |
| Carrier (Age IV) | 16 | 32 | **2.0** | 551,980 | 34,499 |
| Torpedo Cruiser (Age III) | 2 | 2 | 1.0 | 38,919 | 19,460 |

No hero finished a match on Frigate/Ironclad/Dreadnought in this sample — all 60 heroes across 6 matches advanced past Age III by the final snapshot, consistent with the GDD's ~90s/210s/330s age pacing. Mothership's 11.9 kills/instance vs. Carrier's 2.0 (both Age IV/V, same rough playtime window) is the sharpest imbalance signal in the data, echoing the aggregate cast counts (`Micro Swarm` cast 103 times, `Hive Storm` 31 times — a 24-drone and an 80-drone AoE burst landing often).

## Top 10 remaining improvements

1. **Give era-4+ fortress missiles storm scatter.** `combat.js:292` calls `this.homing(s,'missile',...)` with no accuracy penalty; add an `acc` or `turn` reduction term scaled by `G.storm` (mirror the `ss = G.storm ? d*0.06 : 0` used in the era<4 branch at `:297`) so the squall still matters once either team reaches Airpower.
2. **Investigate Mothership vs. Carrier kill-rate gap.** `config.js:195-197` `microswarm` (24 drones, 48 dmg, 9s cd) and `:203-205` `hivestorm` (80 drones, 42 dmg, 55s cd, `minLevel:3`) are landing 11.9 kills/hero-instance in sim vs. Carrier's 2.0; cut `microswarm.count` 24→18 or raise its `cd` 9→11, or buff Carrier's `divebomb` (`config.js:175-177`, currently 220 dmg/4 bombers/12s cd) toward parity.
3. **Give `railgun` a wind-up.** Still 0 travel-time (`type:'beam'`, `config.js:183`) — add a 0.25-0.3s telegraph (a thin line-preview via `abilities.js`'s beam case) so it can be dodged like every other skillshot, consistent with how `hypersonic` already telegraphs via `abilities.js:65-66`.
4. **Gate `mainbattery`/`mainbattery2`/`railgun` with `minLevel`.** None of the three carry a `minLevel` (`config.js:136,160,183`), unlike every other hull's ultimate (`fullbroadside`, `wolfpack`, `cruise`, `airwing`, `hypersonic`, `hivestorm` all have `minLevel:3`). Adding `minLevel:2` to the Age III/IV/V basic-Q abilities would stagger their availability instead of unlocking full power at hull-swap.
5. **Teach hold-to-aim explicitly (carried over from R1, still open).** `game.js:417-425`'s hint schedule never states the mechanic in words; insert it at the ~26s hint slot.
6. **Show the live enemy comp on the age-choice card, not just static MATCHUP text.** `hud.js:38-45` is a fixed lookup table; cross-reference `G.heroes` (enemy `hullId`s) the way `bot.js:281-282` already does, and bold whichever MATCHUP line actually matches what's on screen, e.g. "▲ Strong vs Ironclads (2 on enemy team)."
7. **Track ability-cast sequencing directly, not just counts.** Add a lightweight `G.events.on('cast', ...)` timestamp log keyed by `(hero.id, engagementId)` so a future sim run can prove CC-before-burst ordering empirically rather than only via code read of `bot.js:217-221`.
8. **Torpedo Cruiser sample is too thin to validate the R1 buff.** Only 2/60 heroes finished a match on Torpedo Cruiser in this sim batch (everyone advances past Age III quickly); if the design intent for #3's `torpspread` 230→265 buff was to keep Dreadnought/Torpedo a real Age III trade-off, add a short forced-hold sim (cap `MATCH.duration` at ~250s) to compare Age III hulls head-to-head before they age out of the sample.
9. **Home Waters/Backdoor Protection are now strong enough to fully absorb kill-snowball into a scoreline loss.** Match 0 (12-49 kills) still went the full 600s and was *won* by the 49-kill team on the clock, not lost by them to a stomp — good for pacing, but check `docs/GDD.md §11` scoring formula (`3×structures + kills + citadeldmg/1000`) isn't now rewarding a team that "only" trades kills without pushing; consider weighting structures higher if timeouts become common at higher win-rate skew.
10. **Sync `MATCHUP` (`hud.js:38-45`) against `COUNTERS` (`bot.js:10-14`) — they've already drifted.** `COUNTERS.carrier` lists `arsenal` as something Carrier counters, but the HUD's carrier card omits Arsenal from "Strong vs" and instead tells the player Carrier is "Weak to... Arsenal lasers" (matching `COUNTERS.arsenal: ['carrier', ...]` from the other side) — the two hand-written tables now disagree on who beats whom in that pairing. Derive one from the other (e.g., generate `MATCHUP` text from `COUNTERS` at build time) so bots and the human-facing card can never disagree again.
