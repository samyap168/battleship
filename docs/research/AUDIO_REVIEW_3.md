# Armada Ascension — Audio Review 3

Round 3, same method: offline `OfflineAudioContext` renders through
`preview/analyze.js` (extended this round with a biquad `bandRms` narrow-band/
short-window probe, a `directRecipe` helper that calls a `RECIPES[name]` fn
with fixed pitch/no jitter for clean A/B, and `ctx.suspend()`-stepped reads of
live gain-automation nodes like `combatDuck`/`uiDuck`/`sfxShelf`), not by ear.

## Scores

**SFX Impact: 9/10 (+1)** — The low-end guard is real and directly observed,
not inferred: reading `sfxShelf.gain.value` via `ctx.suspend()` through an
8-shot `cannonHeavy` barrage shows 0 → −2.66 → −4.2 dB (holds at the −4.2 dB
sub-shelf cap for the barrage's duration) → recovers to −0.27 dB by 1.6 s
after — exactly the coded `Math.min(7, max(0,heavy-2)*1.4)` curve. `hitTick`/
`killConfirm` measurably cut through a 24-voice mixed barrage (+2.3 dB in
hitTick's 4.2 kHz band, +3.3 dB RMS for killConfirm). Docked: isolated peak
level across the roster spans 32 dB (`hitTick` −37.9 dBFS → `roar` −6.0 dBFS)
with no consistent narrative-weight curve — `heal` (−9.5 dBFS) and `capture`
(−7.7 dBFS) peak louder than `explosionBig` (−10.1 dBFS).

**Variety/Realism: 9/10 (+1)** — `thunder` is now acoustically distinct from
`explosionBig`, not a pitched clone: attack 19.95 ms vs 8.98 ms (no sharp
crack), tail 3.21 s vs 1.81 s, spectral balance 43.5%/55.3% sub/low-mid vs
91.6%/7.8% (thunder reads as rumble, not blast), and it's far wider (stereo
corr 0.572 vs 0.779). `cannonHeavy`'s era branch is real: with jitter removed
(`directRecipe`), era ≤2's valve hiss adds +16.5 dB in the >4.8 kHz band
(−34.7 vs −51.2 dBFS), its iron ring adds +6–7 dB at 318 Hz; era ≥4's long
whump adds +2.8–3 dB sustained sub<60 Hz. Docked: the era ≥4 supersonic crack
is the weak layer — only +1 dB in its own 5.2 kHz band above baseline,
masked by the shared white/pink bursts already occupying that band. Also:
still no continuous per-age engine/sail propulsion voice (see improvements).

**Mix & Spatial: 9/10 (+1)** — Three separate sidechain stages, all verified
by direct automation readout (not just output-level inference). `uiDuck`:
a `uiClick` pulls the battle bed to 0.6 by 20–90 ms, recovering to 0.97 by
300 ms — matches the "~90 ms" spec. `combatDuck`: naive scripted-loop probing
gave a false plateau (an `OfflineAudioContext` before `startRendering()` never
advances `currentTime`, so `.value` reads stole the wrong scheduled target);
re-tested with `ctx.suspend()` stepping real time between shots, a rapid
`rail` barrage drives it 1 → 0.721 → 0.52 → 0.431 → holds the coded 0.42
floor; the same test on `cannon` (pri 3) reaches the same floor one hit later
and dips shallower per-hit (0.768 vs 0.721 after hit 2) — confirms both
"accumulates" and "deeper for pri≥5." Docked: `roar` and `victory` — the
match's two most important one-shot moments — get no extra spatial treatment
and measure as narrow as routine gunfire (stereo corr 0.865 for `roar` vs.
0.759–0.834 for `cannon`/`cannonHeavy`).

**Music/Adaptivity: 8/10 (+0)** — The climbing theme is real and cleanly
instrumented (patched `_section()`, logged `warSecs`/`shifts` over 8
sections at I=0.85): the theme returns at sections 1, 3, 5, 7 with lift
+0, +2, +4, +0 scale degrees exactly matching `[0,2,4][(warSecs>>1)%3]`.
But a new problem outweighs the fix at match scale: scheduling a full 600 s
(10-min) war-intensity match, `WAR[0]` fires in **16 of 32 sections — 50%**
of the entire war score. Round 2 docked the theme for never recurring; it
now recurs so often it *is* the war music. Net score unchanged.

## Verification table (changes since Round 2)

| # | Change | Status | Measured evidence |
|---|---|---|---|
| 1 | Per-age `cannonHeavy` voices (`era` from `combat.js`) | **Verified** | Era≤2 hiss +16.5 dB (>4.8kHz), ring +6–7 dB (318Hz); era≥4 whump +2.8–3 dB (sub<60Hz); crack only +1 dB (weak) |
| 2 | Dedicated `thunder` recipe | **Verified** | Attack 20ms vs 9ms, tail 3.2s vs 1.8s, sub/low-mid 43.5/55.3% vs 91.6/7.8%, corr 0.57 vs 0.78 (vs `explosionBig`) |
| 3 | `sfxShelf` low-end guard (150Hz lowshelf, −7dB max) | **Verified** | Direct `gain.value` readout: 0→−2.66→−4.2dB across an 8-shot barrage, recovers to −0.27dB after |
| 4 | `uiDuck` micro-duck (0.6, ~90ms) | **Verified** | `uiDuck.gain` 1→0.66 (20ms)→0.60 (50-90ms)→0.97 (300ms) around a `uiClick` |
| 5 | `combatDuck` accumulates, floor 0.42, deeper for pri≥5 | **Verified** | Real-time-stepped probe: rail (pri7) barrage 1→0.72→0.52→0.43→floor 0.42; cannon (pri3) reaches same floor 1 hit later, shallower per-hit dip |
| 6 | Theme climbs +0/+2/+4 scale degrees | **Verified** (new issue) | `shifts` lift exactly [0,2,4] cycling on successive theme returns — but theme recurs in 16/32 (50%) sections of a 600s war match |
| 7 | `hitTick`/`killConfirm`, non-positional, pri 9/10 | **Verified** | Called with no `x`/`z` in `combat.js:104` (non-positional); +2.3dB (hitTick, 4.2kHz band) / +3.3dB RMS (killConfirm) over a 24-voice bed |

## Top 8 remaining improvements

1. **Give the player ship a continuous per-age engine/propulsion voice.**
   Today `engineBoost` (`sounds.js`) is a one-shot fired only from
   `abilities.js` on ability use; `Ambience` (`ambience.js`) has surf/wind/
   storm loops but nothing bound to the hull. Add a looping bed in
   `Ambience` — creaking timber + `sailFlap`-style flutter (Sail), piston
   chug (Steam), turbine/prop whine (Dreadnought+) — crossfaded on
   `hero.age`, gated by speed, mirroring the existing `_loop()` pattern.

2. **Tame the war theme's new overuse.** Measured 16/32 (50%) sections of a
   600s I=0.85 match hit `WAR[0]` (`music.js` `_section()`, the
   `(this.warSecs=...)%2===1` gate). Throttle to every 3rd–4th eligible war
   section, or rotate the anchor across 2–3 hooks (`WAR[0]`, `WAR[4]`) so
   the throughline doesn't crowd out the rest of the war pool.

3. **Calibrate loudness by narrative weight, not just by ear-tuned `lvl`.**
   Isolated peak spans 32 dB roster-wide with no weight curve: `heal`
   (−9.5 dBFS) and `capture` (−7.7 dBFS) peak louder than `explosionBig`
   (−10.1 dBFS) despite being minor utility feedback. Add a `pri`-linked
   loudness target in `DEFS` (`sounds.js`) and re-derive `lvl` from it.

4. **Widen the two biggest one-shot moments.** `roar` (Leviathan) and the
   `victory` stinger measure as narrow as ordinary gunfire (corr 0.865 vs.
   0.76–0.83 for `cannon`/`cannonHeavy`) despite `pri:9`/`10`. Add a short
   micro-delay/detune double specifically for pri≥8 one-shots in `play()`
   (`audio.js`) instead of relying only on the shared reverb send for width.

5. **Strengthen the era≥4 supersonic crack.** It's the weakest of the four
   new per-age layers: +1 dB in its own 5.2kHz/Q1.4 band vs. era3 baseline
   (`RECIPES.cannonHeavy`, `sounds.js` ~L149), buried under the shared white/
   pink bursts occupying the same band. Move it to 7–9kHz or extend past
   20ms so it isn't masked by the common transient.

6. **Add a match-progression ambience layer.** `Ambience.start()`
   (`ambience.js`) is static (ocean/wind + `setStorm()`); `game.js` already
   tracks `this.duskTide` as an endgame flag but nothing in audio reads it.
   Tie ambience color/density (gull rate, wind brightness, a distant-bell or
   dusk-hush cue) to match time or `duskTide` for a felt day-to-dusk arc.

7. **A second-stage guard for prolonged barrages.** `sfxShelf` caps stacking
   growth but doesn't fully arrest it: 8 stacked `cannonHeavy` still moves
   sub<120% from 87.8%→91% even with the shelf active (was 82.4%→87.4%
   unguarded in Round 2). Consider a steeper high-heavy-count curve or a
   second mid-band (300–800Hz) lift so clarity holds under focus fire, not
   just fewer-dB-worse mud.

8. **Extend the pri-loudness link to UI/feedback specifically.** `hitTick`
   only gains +2.3 dB in its own band under a 24-voice bed versus
   `killConfirm`'s +3.3 dB RMS — both `pri:9/10` but tuned inconsistently
   relative to `uiClick`'s existing headroom margin (Round 2 improvement
   #5). Fold `hitTick`/`killConfirm` into the same calibration pass as #3.
