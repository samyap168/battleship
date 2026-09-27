# Armada Ascension — Gameplay Review 3

Round 3, verified against code (`git log` confirms two commits since round 2: `c24b9b4` items 1-7, `115ac77` item 8) and 6 fresh bot-vs-bot autopilot sims (`sim2.mjs` against `localhost:5173`, 600s each, kills 30-27/15-33/19-29/28-39/12-10/16-17). Builds on [`GAMEPLAY_REVIEW_2.md`](GAMEPLAY_REVIEW_2.md).

## Scores

| Category | R2 | R3 | Δ |
|---|---|---|---|
| Moment-to-moment Feel | 8 | 9 | +1 |
| Strategic Depth | 7 | 8 | +1 |
| Ability/Hull Design | 7 | 8 | +1 |
| Pacing & Balance | 7 | 7 | 0 |
| Bot AI | 7 | 7 | 0 |
| Onboarding | 6 | 8 | +2 |

**Feel — 9/10 (+1).** The one Feel gap R2 flagged — era-4+ fortress missiles ignoring the squall — is fixed: `combat.js:292` now passes `turn: G.storm ? 1.8 : 5` into `homing()`, so late-game missile forts lose lock in the rain exactly like the era<4 ballistic branch does. Railgun (`abilities.js:176-181`) now charges 0.3s with a visible `G.fx.beam(...,0.32)` targeting line before it fires, closing the "un-dodgeable DPS king" complaint from both prior rounds. Sim confirms the ambush window matters in practice: 5/6 matches still reached the storm window and objective-panel copy ("ambush window: dive their forts now," `hud.js:248`) now matches what actually happens on both eras.

**Strategic Depth — 8/10 (+1).** `MATCHUP` is no longer a hand-written table that can drift from `COUNTERS` — it's generated from it (`hud.js:36-45`), closing R2's #10 finding that the two had already disagreed on the Carrier/Arsenal pairing. The age-choice modal now also cross-references the *live* enemy comp (`hud.js:185-193` `liveMatch`), addressing R2's #6 exactly: each card shows "Enemy fleet now: N it counters · N that counter it." `COUNTERS` (`config.js:41-48`) is confirmed acyclic — no hull appears in another's list and lists it back, so bots and the human card can never contradict each other on a pairing. Held back from 9: this live count is still a raw tally, not weighted by hull HP/level, so a 1-kill lead reads the same as a 5-kill one.

**Ability/Hull Design — 8/10 (+1).** `minLevel: 2` now gates Main Battery, Radar Salvo and Railgun (`config.js:147,171,194`), so none of the three still unlock at full power the instant a hero re-hulls. Micro Swarm was cut 24→18 drones, cd 9→11 (`config.js:206-207`); Dive Bombers buffed 220→265 dmg, cd 12→11 (`config.js:186-187`). Sim shows this landing: Mothership's kills/instance lead over Carrier shrank from **6.0x (11.9 vs 2.0) in R2 to 3.0x (9.7 vs 3.2) in R3**, and the damage/instance gap shrank from 2.7x to 1.8x (table below). Held back from 9: the gap is narrowed, not closed, and Arsenal (8.2 kills/inst, 72,493 dmg/inst) is now the standout outlier relative to same-tier Battleship (2.9 kills/inst, 45,008 dmg/inst) — see improvements below.

**Pacing & Balance — 7/10 (unchanged).** No changes this round targeted pacing directly. Match shape is consistent with R2: 5/6 sims ran to the 600s cap, kill spreads stayed wide (12-10 to 28-39), and Home Waters/Backdoor Protection (`combat.js:67-84`, unchanged) are still doing the comeback-absorption job noted last round. Not regressed, but nothing here moved the needle either.

**Bot AI — 7/10 (unchanged).** `shop()` (`bot.js:267-284`) is functionally the same counter-pick/anti-3-stack logic as R2, just reading from a table that's now provably consistent. No new sequencing, targeting, or item-budget logic shipped this round. Branch-pick data (below) shows the bots are *under*-picking Mothership (3/17 Age-V picks) relative to how strong it still performs in sim — a signal the counter-pick heuristic doesn't yet weigh "how much does this hull overperform" into its score, only "does it counter what's on screen."

**Onboarding — 8/10 (+2).** This round closed the three oldest open items across all reviews. Hold-to-aim is now stated in words at 22s (`game.js:422`, moved earlier from R1/R2's 26s, with the rest of the schedule shifted to 40/58/80/120s to make room — `game.js:420-427`). The "Admiral's orders" panel (`hud.js:242-260`, top-left per `style.css:274`) gives a first-time player a persistent answer to "what do I do next": squall/Leviathan countdowns, live states once each is active, age-up progress with a `Press T` call-to-action, and an "Enemy citadel EXPOSED" flag tied to the real `invulnerable` getter (`units.js:364`) rather than a guess. Six contextual coaching tips plus a first-death explainer (`game.js:437-451,310`) cover low hull, enemy-in-range, ultimate-ready, solo-fort-siege, squall, and Leviathan — each fires once, the first time its trigger condition is true. Held back from 9-10: `hint()` (`hud.js:236-241`) and the coaching tips share one HTML slot with no queue (unlike `announce()`'s `annQueue`, `hud.js:212-224`) — a coaching tip firing mid-schedule-hint clobbers it early, and the standalone help screen (`index.html:30-40`) still never mentions the hold/release mechanic in words, so a player who skips the first 22 seconds and only reads Help still won't learn it.

## Verification table (changes 1-9)

| # | Claim | Code location | Verified |
|---|---|---|---|
| 1 | Admiral's orders panel: squall/Leviathan countdowns+live state, age-up progress w/ "Press T", citadel-exposed alert | `hud.js:242-260`, mounted `hud.js:83`, positioned `style.css:274` | ✅ all four rows present; citadel row keys off real `invulnerable` getter (`units.js:364`) |
| 2 | One directed COUNTERS graph, no mutual counters; bots counter-pick from it; age cards derive Strong/Weak text + live enemy-hull tally from it | `config.js:41-48`; `bot.js:267-280` `shop()`; `hud.js:36-45` `MATCHUP`, `hud.js:185-193` `liveMatch`/`openAgeChoice` | ✅ graph is acyclic; `MATCHUP` is `Object.fromEntries` over `COUNTERS`, not a separate table; live count reads `G.heroes` at modal-open time |
| 3 | Railgun 0.3s charge + visible targeting line, dodgeable | `abilities.js:176-181` (`beam` case) | ✅ `G.fx.beam(...,0.32)` telegraph then `G.combat.after(0.3, ...)` fires the hit |
| 4 | `minLevel: 2` on Main Battery, Radar Salvo, Railgun | `config.js:147` `mainbattery`, `:171` `mainbattery2`, `:194` `railgun` | ✅ all three read `minLevel: 2` |
| 5 | Squall cuts missile-fort homing turn 5→1.8 | `combat.js:292` `fireStructure` | ✅ `turn: G.storm ? 1.8 : 5` passed into `this.homing(...)` |
| 6 | Micro Swarm 24→18 drones, cd 9→11; Dive Bombers 220→265 dmg, cd 12→11 | `config.js:206-207` `microswarm`; `:186-187` `divebomb` | ✅ `count:18, cd:11`; `dmg:265, cd:11` |
| 7 | Hold-to-aim hint moved to 22s; schedule reordered | `game.js:420-427` | ✅ hint array now `[9, 22, 40, 58, 80, 120]`, hold-to-aim is the 22s entry, later hints shifted to make room |
| 8 | Contextual one-time coaching (low hull, enemy captain in range, ultimate unlocked, solo fort siege, squall, Leviathan) + first-death explainer | `game.js:437-451` (`tip()` helper + 6 conditions); `game.js:310` (death) | ✅ all 6 `tip(...)` calls present with matching conditions; death coaching fires once via `this.coached.death` |
| 9a | Hit markers + hit/kill sounds, danger rings on enemy barrages (carried from R2) | `combat.js:100-103`; `abilities.js:72` | ✅ unchanged and still correct, re-verified |
| 9b | "Team-bias sims: player on team 1, 3-3 split, no map bias" | `map.js:1-2,8-9,54-63` (`mirrorX`) | ⚠️ **not reproduced as stated.** Map geometry, structures and lane waypoints are genuinely point/x-mirror symmetric in code (a real, verifiable non-bias guarantee), but this round's own 6-sim batch split 2-4 in favor of team 1 with the *default* team assignment (no `?team=1` param used in the claim's harness was findable in the repo). The specific "3-3" result could not be located or independently reproduced — treat the underlying symmetry as verified, the quoted result as unverified. |

## Per-hull balance (final-hull snapshot, 6 sims, R3 vs R2)

| Hull (final) | Instances | Kills/inst R2 | Kills/inst R3 | Dmg/inst R2 | Dmg/inst R3 |
|---|---|---|---|---|---|
| Mothership (Age V) | 3 | 11.9 | **9.7** | 94,073 | 83,158 |
| Arsenal Cruiser (Age V) | 14 | 7.1 | **8.2** | 86,792 | 72,493 |
| Battleship (Age IV) | 21 | 3.5 | 2.9 | 45,632 | 45,008 |
| Carrier (Age IV) | 22 | 2.0 | **3.2** | 34,499 | 45,850 |

No hero finished on Frigate/Ironclad/Dreadnought/Torpedo Cruiser this round either — same caveat as R2, all heroes age past Age III before the sample is taken. Mothership/Carrier parity clearly improved (kill ratio 6.0x→3.0x, damage ratio 2.7x→1.8x — the intended target of R2 improvement #2). The new sharpest imbalance is **Arsenal vs Battleship at the same Age IV/V tier gap**: Arsenal outkills and outdamages Battleship by a wider margin than Mothership now beats Carrier, and it wasn't touched this round. Branch-pick data (pooled): `ironclad:60(all), dreadnought:32, torpedo:28, carrier:32, battleship:28, arsenal:14, mothership:3` — bots are choosing Arsenal over Mothership 4.7:1 at Age V, i.e. correctly avoiding the hull that (per this table) still slightly overperforms, but landing on the *other* current outlier instead.

## Top 10 remaining improvements toward "exceptional"

1. **Close the Arsenal/Battleship gap, the new sharpest imbalance.** Arsenal is doing 8.2 kills/inst and 72,493 dmg/inst vs Battleship's 2.9 / 45,008 at the same relative tier. Cut `railgun` `dmg` (`config.js:194`) from 300 to ~250-260, or raise its `cd` 9→11 to match the Micro Swarm treatment, or buff `mainbattery2` (`config.js:171`, currently `dmg:170`) toward ~185-195.
2. **Give `hint()` a queue.** `hud.js:236-241` overwrites the single hint slot with no buffering, unlike `announce()`'s `annQueue` (`hud.js:212-224`). A contextual coaching tip firing mid-display (e.g. "enemy captain in range" at second 24) clobbers the hold-to-aim hint two seconds into its 7s window. Route both through one queue so a new player never loses a scheduled hint to a contextual one.
3. **Teach hold-to-aim in the static Help screen too.** `index.html:33` still just says "fire abilities at the cursor" — a player who skips the first 22s of hints (e.g. tabs away, or reads Help before playing) never sees the hold/release mechanic stated. Add one line: "Hold to aim, release to fire."
4. **Weight the live enemy-comp count in the age-choice modal by threat, not raw tally.** `hud.js:190-192` `liveMatch` counts hulls 1:1; a low-level, low-hp Ironclad counts the same as a fed one. Weight by `(level+1)` or `hp/maxHp` so "2 it counters" reflects an actual advantage, not just a headcount.
5. **Feed hull over/under-performance back into the bot's counter-pick score.** `bot.js:275` `score(id)` only counts direct counters on screen; add a small bonus/penalty term from a rolling per-hull win-rate stat (or hardcode current known outliers) so bots stop under-picking Mothership (3/17 Age-V picks despite leading kills/inst) purely because the counter-pick math doesn't know it's still strong.
6. **Add a small forced-hold sim mode to validate Age III hulls before they age out.** Neither R2 nor R3's sample includes a single hero finishing on Dreadnought, Torpedo Cruiser, Frigate or Ironclad — cap `MATCH.duration` (`config.js`, `MATCH`) at ~250s for a dedicated balance-check run so Age III trade-offs (Torpedo Spread's 265 dmg buff, chiefly) can be measured instead of assumed.
7. **Surface the "Enemy citadel EXPOSED" alert with sound, not just the panel.** `hud.js:257` only updates the silent Admiral's-orders row; a first-time player watching their own minimap/HUD center, not the top-left corner, can miss the moment a push becomes winnable. Pair it with a one-shot `G.audio.stinger` or `announce()` call the first time either citadel becomes exposed per match.
8. **Reduce or explain the 5/6-of-6 timeout rate (unchanged from R2 improvement #9).** Kill spreads are still wide (12-10 to 28-39) with 5/6 matches hitting the 600s cap; `docs/GDD.md §11`'s scoring formula still hasn't been revisited to check whether a kill-trading team can out-time-out a pushing team.
9. **Tighten Age-V sample size before trusting the Mothership/Arsenal numbers further.** This round's Age-V instances are 3 (Mothership) and 14 (Arsenal) out of 60 heroes — enough to see direction, not enough to size the next nerf precisely. Run a larger (~15-20 match) batch focused only on Age IV→V before making further `microswarm`/`railgun` number changes.
10. **Give the objective panel's storm/Leviathan rows a "last called out X seconds ago" de-dupe with the coaching tips.** `game.js:448-449`'s `storm`/`boss` coaching tips and the panel's own storm/boss rows (`hud.js:247-251`) currently say almost the same thing through two different UI channels at once (a hint box and a persistent panel) the instant either event starts — consolidate to avoid a "why am I being told this twice" first impression.
