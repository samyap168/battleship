# Armada Ascension — Audio Review 6

Method: same `renderOffline` harness as Review 5, against the live dev server
at `http://localhost:5198/preview/audio.html` (Playwright/chromium,
`--autoplay-policy=no-user-gesture-required`), plus three purpose-built
scripts for this round (kept in the scratchpad, not the repo):
`sfxlvl.mjs` (peak/RMS/maxShort/nonFinite per sound, full mix chain),
`haas.mjs` (renders each sound centred and compares L+R sum energy against
L−R difference energy — a small sum−diff gap means real inter-channel
decorrelation, i.e. audible width), `submerged.mjs` (0.25 s-windowed
high-frequency proxy — RMS of the first sample difference — with and without
`setSubmerged(true)`), `themelift.mjs` (calls `Music._section()` directly
40x at `I=0.95`/no finale and logs `themeN`/`shifts` per call), and
`citadelduck.mjs` (90 Hz one-pole-lowpassed RMS of `citadelFall` alone vs.
`citadelFall` + `stinger('victory')` in the 2.2–3.4 s window Review 5
flagged).

## Scores

**SFX Design: 9/10** — `hullGroan` (`sounds.js:630`) is a genuinely
composed 3.4 s arc: three detuned sawtooths bending under a slow LFO through
two resonant bandpasses (frame groan), six random crackle bursts (timbers),
a swept pink-noise lowpass burst (water rushing in), and nine randomly-timed
bubble blips tailing out to 5.2 s — it doesn't just reuse the `explosion`/
`towerDown` vocabulary, it's its own instrument. `whaleBlow` (`sounds.js:652`)
layers a swept bandpass "PFFHH" over a lowpassed brown-noise body and a
sub tone, with a quiet return in-breath at +1.25 s — reads as an actual
exhale, not a generic burst. `whaleSong` (`sounds.js:663`) is the most
interesting new recipe: three detuned oscillators (fundamental + octave +
sub-octave) through a moving-centre-frequency bandpass "throat" with slow
vibrato, ending in a distant high answering cry sent to reverb only
(`dest: V.wet`) — legitimately sounds like something singing underwater
half a kilometre away. All three are well inside the established headroom
band (see level table) with 0 non-finite samples across every render in
this review. Docked one point only because none of the three break new
sonic ground technique-wise — they're excellent applications of the same
formant/bandpass/LFO toolkit the roster already had, not a new idea.

**Mix & Dynamics: 7/10 (+1 on the R5 stinger fix, −1 new: Haas leak)** —
Two real developments cancel out. First, the win: Review 5's #1 finding
(`citadelFall`'s sub tone piling up uncontrolled under the victory/defeat
gong, +7 dB in the 2.2–3.4 s window) is now fixed. `audio.js:298-300` ducks
`sfxIn` by ~4 dB whenever a `pri>=8` stinger fires, symmetric with the
existing `musicIn` duck. Re-measured with `citadelduck.mjs`: the 90 Hz-band
window that was -22.2 dBFS alone and jumped to -15.3/-19.0 dBFS with the
stinger in R5 now moves only -24.4 → -23.3 dBFS (+1.1 dB) — managed, not
just absorbed by the limiter. Second, a new problem this round: the
priority-9 Haas-widening gate (`audio.js:200`, `if (def.pri >= 9 && !isUI...)`)
is keyed only on `pri`, and three non-"biggest-moment" sounds happen to
share `pri:9`/`10` with `roar`/`citadelFall`: `hitTick` (`sounds.js:29`,
`pri:9`), `killConfirm` (`sounds.js:30`, `pri:10`), and `levelUp`
(`sounds.js:43`, `pri:9`). `hitTick` fires on every landed hit, throttled to
only 0.07 s (`combat.js:116`) — up to ~14×/s in sustained combat — and is
called *without* `x`/`z` (non-positional), so every tick spins up two extra
gain→delay→panner chains for a dry combat-feedback tick, not a cinematic
moment. Measured directly: `killConfirm` and `levelUp` show the same narrow
sum/diff gap (8.9 dB, 8.6 dB) as `roar` (8.4 dB) and `citadelFall` (5.1 dB),
confirming the extra copies really are being built and mixed in, against
sounds like `towerDown`/`cannonHeavy`/`death` that correctly sit at
11.8–14.0 dB (effectively mono). Not audibly catastrophic and no clipping
results, but it's unmanaged CPU/graph churn on the single highest-frequency
gameplay sound in the roster, and a real deviation from the feature's own
stated intent ("the *biggest* moments... get width" — `audio.js:198`).
Separately, the pre-existing `pri`-loudness split (R3/4/5 #open item) is
untouched this round and wasn't in scope to re-verify.

**Spatialisation: 8/10 (+1 for `setSubmerged`, held back by the Haas leak
above)** — `setSubmerged` (`audio.js:264`) sits correctly on the shared SFX
bus: `sfxVol` (which every SFX/UI/ambience/stinger send ultimately reaches)
feeds `subFilter` before `subGain`/`preMaster`, while `musicVol` connects
straight to `preMaster` and bypasses it entirely — so the muffle is SFX-only
as specified, not the whole mix. Measured with a high-frequency proxy
(`submerged.mjs`): eight `cannon` shots fired over 4 s show a steadily
widening gap between the "on" and "off" runs, from ~0 dB in the first 0.25 s
window to -13…-23 dB by 0.75–1.3 s, consistent with the coded 1.3 s
exponential ramp to 380 Hz. All three reset paths are wired and each one was
independently confirmed in code: match start (`Game` constructor,
`game.js:70`, guarded with "never inherit a muffled mix from the last
match"), match end (`endMatch`, `game.js:359`), and respawn
(`respawnHero`, `game.js:566`, gated on `h === this.player`) — and the
in-page menu/rematch flow (`main.js:startGame`→`toMenu`/`play`) always
reconstructs by calling into the same `Game` constructor, so there's no
route back to the menu or a new match that leaves the mix stuck muffled.
The Haas widening itself measures real and correct for the sounds it's
meant for (`roar`, `citadelFall`) — see the SFX Design/Mix notes — but its
overreach onto `hitTick`/`killConfirm`/`levelUp` is a spatialisation bug as
much as a mix one: those hard L/R copies bypass the distance lowpass
entirely (`audio.js:200-205` connects straight from `V.out`, no `cutoff`
filter node), so for a would-be-muffled distant sound the wide copies would
ring brighter than the darkened dry path — moot for `hitTick`/`levelUp`
(non-positional, no cutoff anyway) but worth knowing if `pri:9`+ is ever
given to something with real range.

**Music: 9/10 (+1, R4/R5 open item now resolved)** — The theme's melodic
lift is fixed exactly as R5's improvement #5 suggested. `music.js:249`
rebuilds `this.shifts` fresh on every `_section()` call (not cumulative),
and `music.js:252` computes `lift = [0, 2, 4][Math.min(2, themeN - 1)]` from
a `themeN` counter that only resets on `setFinale(false)` — not on
`setFinale(true)` — so the climb continues straight through the finale's
own theme returns instead of resetting, per the comment at `music.js:250-251`
directly acknowledging and fixing the old bug. Verified by calling
`Music._section()` 40× directly at `I=0.95` with `finale=false`: the theme
occurrences (every 3rd section) landed lifts of exactly
`0, +2, +4, +4, +4, +4, ...` — climbs a step, holds at the top, never
resets or falls back to `+2` on later returns. The rest of Review 5's music
verification (progression-repeat guard, finale horn gap) wasn't in scope
this round and wasn't touched in the diff.

**Ambience: 9/10** — Dusk mode (`ambience.js:100-101`, `setDusk`) is wired
correctly through `AudioSystem.setFinale` (`audio.js:420`,
`e.ambience.setDusk && e.ambience.setDusk(this._finale)`) and triggered by
the match's actual dusk-tide event (`game.js:427-431`, `t >= 480`) — this
closes Review 5's improvement #6, which found the flag existed with no
reader at all. The implementation matches its own doc comment ("a lower,
gustier wind and the gulls fall quiet", `ambience.js:100`) precisely:
`windBP.frequency` is scaled ×0.7 (darker/lower, `ambience.js:149`),
`windG.gain` is scaled ×1.35 (louder gusts, `ambience.js:150`), and
`nextGull` scheduling is stretched ×2.5 (far sparser calls, `ambience.js:157`)
— three independent, well-chosen parameter moves rather than one blanket
knob. `whaleBlow`/`whaleSong` (triggered from `sealife.js:165` and `:194`,
routed through `main.js:101`'s `onSound` callback into `audio.play`) add
real incidental-life texture without needing any sim awareness
("Purely cosmetic: nothing in the sim knows the whales exist",
`sealife.js:8`). Held to 9 rather than 10 only because Dusk mode is the only
ambience state that's context-reactive; there's still no calm/idle vs.
active-combat distinction in the ambience bed itself (unchanged from R5).

## Verification table

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | `whaleBlow`/`whaleSong` recipes, played by `sealife.js` | **Landed** | `sounds.js:55-56` (DEFS), `sounds.js:652`/`663` (recipes), `sealife.js:165` (`whaleSong` on song-start), `sealife.js:194` (`whaleBlow` on each blow, quieter 2nd blow), wired via `main.js:101` (`sealife.onSound = (n,x,z,vol) => audio.play(n,{x,z,vol})`). Rendered clean: peak -14.6/-20.2 dBFS, 0 non-finite. |
| 2 | `hullGroan` recipe, played ~1.1 s into `sinkFx` | **Landed** | `sounds.js:54` (DEFS), `sounds.js:630` (recipe: bending frames, timber crackle, water-rush burst, 9 bubble blips), `game.js:607` — `if (at(1.1)) this.audio.play('hullGroan', ...)`, exact 1.1 s offset as specified. Peak -10.7 dBFS, 0 non-finite; full sinking sequence (hullGroan + 2×explosion + splash) mixed peaks -11.3 dBFS, no clipping. |
| 3 | "Submerged" SFX-bus low-pass sweeping to 380 Hz, restored on respawn/match start/end | **Landed** | `audio.js:264` (`setSubmerged`, exponential ramp to 380 Hz over 1.3 s / back to 20 kHz over 0.9 s); bus placement confirmed correct — `sfxVol`→`subFilter`→`subGain`→`preMaster`, `musicVol` bypasses it (`audio.js:91-125`). Trigger: `game.js:608`, `at(3.2)`, gated `u === this.player`. Reset paths confirmed: match start `game.js:70`, match end `game.js:359`, respawn `game.js:566`. Measured: high-frequency proxy drops -13…-23 dB by 0.75-1.3 s post-trigger vs. the un-submerged control. |
| 4a | Haas widening for `pri >= 9` | **Landed, with overreach** | `audio.js:198-206`. Measured real decorrelation for `roar` (sum−diff gap 8.4 dB) and `citadelFall` (5.1 dB) vs. mono-ish `towerDown`/`cannonHeavy`/`death` (11.8-14.0 dB) — works as designed for the two sounds it names in its own comment. But the same `pri>=9` gate also silently catches `hitTick`, `killConfirm`, `levelUp` (`sounds.js:29,30,43`), which are not positional "biggest moments" — `killConfirm`/`levelUp` measured the same narrow gap (8.9/8.6 dB) as `roar`. See Mix & Dynamics. |
| 4b | Armada theme key lift 0 → +2 → +4 | **Landed** | `music.js:249` (fresh `shifts` per section), `music.js:252` (`lift = [0,2,4][min(2, themeN-1)]`, `themeN` persists across `setFinale(true)`, only resets on `setFinale(false)`). Directly called `_section()` 40× at forced `I=0.95`: theme-return lifts came back `0, +2, +4, +4, +4, ...` exactly, holding at top, continuing through simulated finale. |
| 4c | Ambience Dusk mode | **Landed** | `ambience.js:101` (`setDusk`), read at `ambience.js:148-157` (windBP ×0.7 freq, windG ×1.35 gain, gull interval ×2.5). Wired: `audio.js:420` (`setFinale` → `ambience.setDusk`), triggered `game.js:427-431` at `t>=480`. Directly closes R5 improvement #6 ("no `Ambience.setDusk()` reader"). |

## Level table (measured, full mix chain, `renderOffline`, 8 s)

| Sound | pri | peak dBFS | RMS dBFS | maxShort dBFS | nonFinite |
|---|---|---|---|---|---|
| whaleBlow | 2 | -14.6 | -40.1 | -24.9 | 0 |
| whaleSong | 1 | -20.2 | -36.6 | -27.9 | 0 |
| hullGroan | 6 | -10.7 | -29.5 | -19.0 | 0 |
| cannon | 3 | -17.9 | -41.7 | -23.9 | 0 |
| cannonHeavy | 5 | -7.7 | -31.1 | -15.7 | 0 |
| explosion | 4 | -12.5 | -36.0 | -19.5 | 0 |
| explosionBig | 7 | -9.1 | -32.4 | -16.2 | 0 |
| death | 8 | -9.5 | -32.2 | -17.2 | 0 |
| splash | 1 | -13.2 | -41.4 | -24.2 | 0 |
| roar | 9 | -4.1 | -24.1 | -11.1 | 0 |
| sailFlap | 1 | -10.5 | -43.0 | -22.1 | 0 |
| citadelFall | 10 | -3.1 | -17.2 | -8.4 | 0 |

`whaleBlow`/`whaleSong` land in a sensible ambient-life tier — clearly
quieter than any combat sound, `whaleSong` quietest of all (fits "distant
song"). `hullGroan` sits comfortably between `explosion` (-12.5) and
`explosionBig`/`death` (-9.1/-9.5), appropriate for a mid-weight staged
sinking cue that isn't meant to out-shout the actual detonations layered
over it in the same sequence.

Haas sum/diff decorrelation (centred render, `haas.mjs`; smaller gap =
more audible width):

| Sound | pri | Haas-eligible? | sum−diff gap (dB) |
|---|---|---|---|
| citadelFall | 10 | yes | 5.1 |
| roar | 9 | yes | 8.4 |
| levelUp | 9 | yes (unintended) | 8.6 |
| killConfirm | 10 | yes (unintended) | 8.9 |
| hitTick | 9 | yes (unintended) | 11.2 |
| towerDown | 8 | no | 11.8 |
| cannonHeavy | 5 | no | 13.1 |
| death | 8 | no | 13.8 |
| explosionBig | 7 | no | 14.0 |

## Top 8 improvements

1. **`audio.js:200`** — the Haas-widening gate (`def.pri >= 9 && !isUI`)
   also catches `hitTick`, `killConfirm`, `levelUp` (`sounds.js:29,30,43`),
   none of them "biggest moments." `hitTick` fires up to ~14×/s in combat
   (`combat.js:116`, 0.07 s throttle) and is non-positional, so every tick
   now spins up two extra gain→delay→panner chains for no audible width
   benefit (measured gap 11.2 dB — nearly as narrow as `citadelFall`'s
   5.1 dB, confirming the copies are really firing). Add an explicit
   `wide: true` flag to `DEFS` (set only on `roar`/`citadelFall`) and gate
   on that instead of reusing `pri`. Expected effect: removes ~14 wasted
   node-chains/sec from sustained combat with zero perceptual loss, and
   restores the feature's own stated intent.
2. **`audio.js:298-300`** — the new stinger→`sfxIn` duck is a flat -4 dB
   regardless of stinger duration; it's already a clear improvement (R5's
   +7 dB pile-up is now +1.1 dB), but the duck window (`Math.min(2.5, dur*0.4)`)
   is shorter than `citadelFall`'s own sub-tone decay (3.2 s) for the
   victory/defeat stingers specifically. Worth widening the hold slightly
   for `pri:9` stingers so the recovery ramp doesn't re-open under the
   still-ringing sub tail. Expected effect: a few more dB of headroom in
   that exact window with no downside elsewhere.
3. **`sounds.js:44/45/46` vs. `sounds.js:55/56`** — `gold`/`uiClick`/
   `uiHover` sit at `lvl:3.51/4.73/6.84` while `whaleBlow`/`whaleSong` sit
   at `lvl:0.55/0.3`; both pairs are reasonable in isolation, but it
   reconfirms the R3/4/5 open item that `pri` and loudness-weight are
   conflated — `whaleSong` (`pri:1`) and `splash` (`pri:1`) are 5+ dB apart
   in RMS despite the same nominal tier. Not new this round, but the new
   recipes are more data points for splitting `pri` (voice-stealing) from a
   separate loudness-weight field, as previously recommended.
4. **`sealife.js:194`** — `whaleBlow`'s second blow is only quieter via
   `vol: bi ? 0.75 : 1`, but both blows use the exact same recipe
   (`sounds.js:652`) with no pitch variety (`jp: 0.06` gives only ±6%
   jitter). Two blows from the same animal 2.7 s apart
   (`A.blows = [1.5, 4.2]`) sound close to identical. A wider `jp` (e.g.
   0.1) or a slight recipe-side variation on the second call would sell
   "the same whale breathing twice" rather than "the same sample twice."
5. **`music.js:252`** — the lift array `[0, 2, 4]` is a good fix, but the
   `Math.min(2, themeN - 1)` clamp means every theme return past the 3rd
   is acoustically identical (`+4` forever, `themeN` growing unbounded in
   the background). Over a long match (measured `themeN` reaching 14 by
   section 39 in the forced-war test) that's ~10+ identical high-lift
   returns. Consider one more step (e.g. `[0, 2, 4, 5]`, or a slow vibrato/
   register alternation once `themeN > 3`) so very long matches don't
   plateau on a single fixed interval for most of their runtime.
6. **`ambience.js:150`** — Dusk's `windG.gain` multiplier (`×1.35`) and
   `windBP.frequency` multiplier (`×0.7`) are applied every time
   `nextWind` ticks (every 3-7 s), each restarting a 2.5 s
   `setTargetAtTime` ramp from whatever the wind happened to be doing —
   correct, but the *first* dusk tick after `setFinale(true)` fires can
   land mid-ramp from the pre-dusk value, so the gustier/darker character
   phases in gradually (up to ~7 s latency) rather than at the moment the
   dusk-tide event lands. If the dusk transition is meant to read as a
   discrete beat (matching the visual/gameplay dusk-tide trigger at
   `game.js:428`), force an immediate `nextWind = now` inside `setDusk(true)`
   so the darker wind character is audible within one `update()` tick.
7. **`sounds.js:645`** — `hullGroan`'s "water rushing in" burst
   (`kind:'pink', sweep 2.5s, peak 0.3`) and its "air venting" burst
   (`f:2600, peak 0.08`) both start close together (t+0.3/t+0.5) and are
   the only two elements sent to `[V.out, V.wet]`/dry-only respectively —
   the air-venting layer at peak 0.08 is 12 dB below the water-rush layer
   and easy to lose under the timber crackles. A small peak bump (0.08 →
   0.12-0.14) would make the two textures (water in vs. air out) more
   distinguishable, matching the recipe's own comment intent.
8. **`audio.js:204`** — the Haas copies connect `V.out` straight to their
   own gain/delay/panner with no distance lowpass (`cutoff` is only applied
   to the dry `head` and reverb/echo sends via `sendDest`, `audio.js:194/215`).
   Currently moot since `roar`/`citadelFall` are usually heard close-in, but
   if `wide:true` (improvement #1) is ever extended to another sound with a
   large `range`, a distant instance would have a duller dry path than its
   own hard-panned copies. Route the Haas gain nodes through the same
   `cutoff` filter as `head` when one exists, for consistency.

## Broken

Nothing crash-level or NaN-producing found this round: all four new
items (`whaleBlow`, `whaleSong`, `hullGroan`, `setSubmerged`) rendered with
`nonFinite: 0` across every test, including the full staged-sinking
sequence and stacked whale-song/blow overlaps. No stuck states: `setSubmerged`
is reliably reset on every code path back to a non-submerged mix (match
start, match end, respawn, and the in-page menu/rematch flow, which always
re-enters through the `Game` constructor). No clipping: the loudest new
combination tested (`hullGroan` + 2× `explosion` + `splash` in the actual
`sinkFx` timing) peaks at -11.3 dBFS mixed, comfortably under the limiter's
-3 dBFS threshold. The one real issue is the Haas-widening scope leak onto
`hitTick`/`killConfirm`/`levelUp` (Top 8 #1) — not a crash or audio glitch,
but genuine unnecessary WebAudio graph churn (2 extra gain+delay+panner
node chains per call) on the single most frequent, non-positional gameplay
sound in the roster, running against the feature's own documented intent.
