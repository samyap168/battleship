# Armada Ascension — Gameplay Review 4

Round 4, verified against code and 8 fresh bot-vs-bot autopilot sims (`sim4.mjs`, extending R1-3's `sim2.mjs` with hooks for end-reason, telegraph-hit tracking and per-run team assignment, against `localhost:5173`; 4 default + 4 with `&team=1`). Times 388-600s, kills 14-14/18-13/40-23/26-38/3-23/14-24/34-24/31-33. Builds on [`GAMEPLAY_REVIEW_3.md`](GAMEPLAY_REVIEW_3.md).

## Scores

| Category | R3 | R4 | Δ |
|---|---|---|---|
| Moment-to-moment Feel | 9 | 9 | 0 |
| Strategic Depth | 8 | 8 | 0 |
| Ability/Hull Design | 8 | 8 | 0 |
| Pacing & Balance | 7 | 8 | +1 |
| Bot AI | 7 | 8 | +1 |
| Onboarding | 8 | 9 | +1 |

**Feel — 9/10 (unchanged).** Enemy barrage rings now read orange (`abilities.js:74`, `0xff8a00`) instead of blending into Crimson's red glow — a real, verified fix. But it's half-done: the hypersonic branch two lines up (`abilities.js:65-67`) still hardcodes `0xff4030`/`0xff8060` with no `hostile` check at all, so Arsenal's ultimate sky-strike is unaffected and still can blend with a Crimson viewer's own team color. Held at 9, not 10, for that gap plus the stale Help copy (below).

**Strategic Depth — 8/10 (unchanged).** The Dusk Tide is a forced environmental event, not a player choice, so it sharpens pacing more than it adds a new decision layer; the counter-pick and live-match-read systems that earned R3 its 8 are untouched this round. `hud.js:187-192` `liveMatch` still counts enemy hulls 1:1 with no HP/level weighting (R3 improvement #4, still open).

**Ability/Hull Design — 8/10 (unchanged).** Railgun cut 300→255 dmg, cd 9→10 (`config.js:194`); Radar Salvo buffed 170→188 dmg (`config.js:171-172`) — both confirmed in code and aimed squarely at R3's Arsenal/Battleship gap. Sim data shows the tuning undershot: Arsenal (n=15) still leads Battleship (n=31) **8.6 vs 3.23 kills/instance (2.66x, was 2.83x in R3)** and the damage ratio actually widened, **72,977 vs 43,300 (1.68x, was 1.61x)**. Directionally right, magnitude wrong.

**Pacing & Balance — 8/10 (+1).** The Dusk Tide (`game.js:411-418`, `combat.js:67,72,372`) is doing real work: timeout endings fell from R3's 5/6 (83%) to **5/8 (62.5%)** this round, and 2 of the 3 citadel finishes (494s, 548s) landed specifically inside the post-480s Dusk Tide window rather than as pre-480s snowballs. Held back from 9: 3 of those 5 timeout games still finished within an 11-point score margin (`finalScore` diffs of 3, 6, 11), so the tide swings some stalemates but still lets close games coast to a near-tie at the buzzer.

**Bot AI — 8/10 (+1).** Both claimed upgrades are real and land in sim. Dodge: `G.dangers` is pushed on every barrage/hypersonic cast (`abilities.js:65,72`) and `bot.js:38-48` steps a hero out of any hostile zone before retreat logic runs, gated by `Math.random() < this.d.aim` (line 42). Hooking `G.combat.damage` against live `G.dangers` zones, hero-damage events that occur while any strike is telegraphed land inside a hostile zone about **50% of the time (4,263/8,498)** — bots are dodging plenty but far from perfectly, which reads as intended (a reaction check, not a guarantee). Focus-fire/peel: `bot.js:73` adds `Math.min(2, alliesShooting) * 0.3` (max +0.6, exactly as claimed) and line 74 adds a flat +0.45 to peel for an ally under attack — both verified in code. Held back from 9: this round's data resurfaces a genuine update-order bug the new peel logic exposes (see "Player-side win rate" below) — a real regression risk alongside the improvement.

**Onboarding — 9/10 (+1).** `hud.js:237-248` gives hints a real FIFO queue (`hintQ`) instead of clobbering the visible one, closing R3 improvement #2 exactly. `index.html:33` now states "hold to aim, release to fire" in words, and `index.html:41`'s counter sentence is a faithful restatement of `COUNTERS` (`config.js:41-48`) — both close R3 improvements #3 and (indirectly) #10. Held back from 10: `index.html:34` still says "**Red rings** on the water are incoming enemy salvos" — but as of this round's item 7, those rings are orange (`abilities.js:74`). The Help screen contradicts what the player will actually see.

## Verification table (changes 1-7)

| # | Claim | Code location | Verified |
|---|---|---|---|
| 1 | Bots dodge telegraphed strike zones; `G.dangers` pushed on barrage/hypersonic cast; dodge before retreat, reaction = `d.aim` | `abilities.js:65,72`; `bot.js:38-48` (`Math.random() < this.d.aim`, line 42) | ✅ exact; sim confirms live dodging (50% in-zone hit rate, not 0% or 100%) |
| 2 | Focus-fire up to +0.6, peel +0.45 | `bot.js:73` (`Math.min(2,·)*0.3`), `bot.js:74` (`+= 0.45`) | ✅ both constants match exactly |
| 3a | Dusk waves carry 2 heavy gunboats | `combat.js:372` `heavies = this.duskTide ? 2 : 1` | ✅ |
| 3b | Forts take ×1.7 dmg | `combat.js:67` | ✅ |
| 3c | Backdoor protection lifts | `combat.js:72` | ✅ |
| 3d | Announced to the player | `game.js:412-417` (`announce`+`stinger('enemyAge')`+`feed`) | ✅ |
| 4 | Hint queue; Help covers hold-to-aim, danger rings, counters | `hud.js:237-248`; `index.html:33,34,41` | ✅ queue; ✅ hold-to-aim; ⚠️ danger-ring line is stale ("Red" vs. now-orange); ✅ counters match `COUNTERS` |
| 5 | Citadel-exposed announce+stinger once/citadel; dusk forts ×5 (was ×3) in `timeUp`; duplicate storm/boss tips removed | `game.js:459-465`; `game.js:509` (`towersLost * 5`, comment still says "x3", `GDD.md:35` says 5×); `game.js:457` | ✅ all three; code comment at `game.js:508` is stale |
| 6 | Railgun 255/10s cd; Radar Salvo 188 dmg | `config.js:194`; `config.js:171-172` | ✅ `dmg:255,cd:10`; `dmg:188` |
| 7 | Enemy barrage rings orange `0xff8a00` | `abilities.js:74` | ⚠️ true for the `barrage`/non-hyper branch only; the `isHyper` branch (`abilities.js:65-67`, Arsenal's ultimate) still hardcodes reddish `0xff4030`/`0xff8060` with no `hostile` check |

## Balance table (final-hull snapshot, 8 sims, R4 vs R3)

| Hull (final) | Instances | Kills/inst R3 | Kills/inst R4 | Dmg/inst R3 | Dmg/inst R4 |
|---|---|---|---|---|---|
| Mothership (Age V) | 2 | 9.7 | **13.5** | 83,158 | 99,349 |
| Arsenal Cruiser (Age V) | 15 | 8.2 | 8.6 | 72,493 | 72,977 |
| Battleship (Age IV) | 31 | 2.9 | 3.23 | 45,008 | 43,300 |
| Carrier (Age IV) | 27 | 3.2 | 4.19 | 45,850 | 45,149 |
| Dreadnought (Age III) | 3 | — | 0.33 | — | 16,039 |
| Torpedo Cruiser (Age III) | 2 | — | 1.0 | — | 19,697 |

Age III hulls appear in the sample for the first time (thin: n=3, n=2) courtesy of one early stomp (match 5, 3-23 kills, decided at 388s before the Dusk Tide even fired) where the losing team never left Age III — a real, if small, data point that early snowball can still lock a team out of the Age IV/V power spike entirely. Pooled branch picks: `ironclad:80(all), dreadnought:43, torpedo:37, carrier:40, battleship:35, arsenal:15, mothership:2` — bots are still avoiding Mothership 7.5:1 vs. Arsenal at Age V despite Mothership now leading kills/instance by a wider margin than last round (R3 improvement #5, still open).

## Player-side win rate — still skewed, and a concrete cause found

The player's side won **7/8 (87.5%)** this round (3/4 on default `team=0`, 4/4 on forced `team=1`), continuing R3's 17/24 (70.8%). Raw team wins (independent of who's "player") were 3-5 in favor of team 1 — and the map is genuinely mirror-symmetric (`map.js:8-9` `mirrorX`, `STRUCTURE_LAYOUT` team-1 rows are `{...t, x: -t.x}`), so this isn't map bias. Auditing every `G.player`/`isPlayer` read in `game.js`/`combat.js`/`abilities.js` turned up nothing that changes outcomes at the default `normal` difficulty — the one candidate, `h.gold += MATCH.passiveGold * dt * (h.isPlayer ? 1 : this.diff.goldMul) * ...` (`game.js:404`), is a no-op because `DIFFICULTY.normal.goldMul === 1.0` (`config.js:260`); everything else gated on `G.player` (combat.js:57,101,112,118) is cosmetic (float text, hit markers, feed pings).

The likely real culprit is **update order interacting with this round's new peel logic**: `this.bots` is built team-0-then-team-1 (`game.js:107-117`) and iterated in that same fixed order every tick (`game.js:473` `for (const b of this.bots) b.update(dt)`). `bot.js:74`'s peel check reads the *enemy's* `attackOrder` (`e.attackOrder === a`) — since team 0's bots run first each tick, team 1's bots always score peel/focus-fire against team 0's **already-updated-this-tick** targeting, while team 0 always scores against team 1's **stale, previous-tick** targeting. That's a real, one-tick information edge for team 1 baked into iteration order, and it lines up with this round's data (team 1 winning 5/8 raw). Sample size (n=7-8, n=24) is still too small to fully separate this from noise, so treat it as a strong lead, not a proven root cause.

## Top 10 remaining improvements toward "exceptional"

1. **Fix the update-order asymmetry behind the win-rate skew.** Snapshot each hero's `attackOrder` before the bot loop (`game.js:473`) — e.g. `const snap = new Map(G.heroes.map(h => [h, h.attackOrder]))` — and have `bot.js:73-74`'s cross-team reads use the snapshot, not the live (mid-tick-mutated) value. Cheapest alternative: alternate which team's bots update first each tick.
2. **Make the hypersonic strike ring hostile-aware.** `abilities.js:65-67` needs the same `hostile = G.player && h.team !== G.player.team` check already used at line 73, swapping the fixed `0xff4030`/`0xff8060` for `hostile ? 0xff8a00 : G.teamGlow(h.team)`.
3. **Fix the stale Help-screen line.** `index.html:34` says "Red rings" — change to "Orange rings" (or drop the color name and just say "enemy salvo zones") now that `abilities.js:74` ships orange.
4. **Feed hull over/under-performance into the bot counter-pick score.** `bot.js:290` `score(id)` still only counts direct counters on screen; Mothership is still picked 2:177 vs. every other Age-V option pooled despite leading kills/instance 13.5 to Arsenal's 8.6 this round.
5. **Keep tuning Arsenal vs. Battleship — this round's pass undershot.** Kills/inst ratio only moved 2.83x→2.66x and the damage ratio *widened* 1.61x→1.68x. Try cutting `railgun` (`config.js:194`) cd 10→12, or buffing `mainbattery2` (`config.js:171-172`) `count` 6→7.
6. **Weight the live enemy-comp count in the age-choice modal by threat.** `hud.js:187-192` `liveMatch` is still a raw 1:1 tally (R3 improvement #4, unaddressed) — weight by `(level+1)` or hp fraction.
7. **Add a forced-hold sim mode to validate Age III hulls before they age out.** This round's one early-stomp match (3-23 kills, decided at 388s, `ages:"3333344444"`) is the first Dreadnought/Torpedo data point in 3 review rounds and it's a snowball artifact, not a clean read; cap `MATCH.duration` (`config.js`) at ~250s for a dedicated Age III balance run.
8. **Fix the stale scoring comment.** `game.js:508`'s comment still reads "structures destroyed x3 + kills" even though line 509 now multiplies by 5 (matching `GDD.md:35`'s "5 × structures destroyed") — a one-line comment fix so the next tuning pass doesn't get misled by its own code.
9. **Make the Dusk Tide's push scale with time, not just switch on at 480s.** 3 of this round's 5 timeout games still finished within an 11-point score margin — step the fort multiplier from 1.7x at 8:00 toward ~2.2x by 9:30 (`combat.js:67`) so a truly stalled match doesn't coast to a near-tie.
10. **Run a larger, evenly-split balance-regression batch before trusting the win-rate finding further.** n=8 (this round) and n=24 (R3) both show the player/team-1 side over-winning, consistent with improvement #1's mechanism, but neither sample is big enough to rule out noise; script ~50 matches split 25/25 across `&team=0`/`&team=1` and diff the win rate before/after #1 ships.
