# Armada Ascension — Audio Review 2

Round 2, same method: offline `OfflineAudioContext` renders through
`preview/analyze.js` (extended with an echo-network impulse probe, a
music `_step`/`_section` instrumentation probe, and a stacked-voice
masking test), not by ear. All numbers are freshly re-measured.

## Scores

**SFX Impact: 8/10 (+1)** — Rail's round-1 flaw (sub clone of cannon, 97.9%
energy <120 Hz) is gone: 34.6% <120 Hz, 45.6% in 2–6 kHz — reads electric.
The horizon echo, previously token (0.05–0.15), is now structural: an
impulse fed straight into `echoIn` shows 3 discrete repeats at ~0.41 s
spacing decaying ≈−6 dB/hop (0.89 s: −6.4 dB, 1.30 s: −12.4 dB, 1.72 s:
−18.2 dB; theory at fb=0.42: −7.5 dB/hop). A 48-voice mixed barrage still
has zero clipping/NaN (peak −3.07 dBFS). Docked: stacking heavy weapons now
measurably *increases* sub-band concentration (see Mix) — low end risks
turning to mud in a real teamfight.

**Variety/Realism: 8/10 (+1)** — `cannon`'s round-robin is real, not jitter
dressed up: 24 isolated renders span 5.3 dB peak / 587 Hz centroid
(1536–2123 Hz) vs round 1's ~2 dB/175 Hz. But a more serious gap surfaced:
`src/game/combat.js`'s `SHOT` table sends both `shell`/`shell_big` to
`snd: 'cannonHeavy'`, and line 275 (`g.kind==='ball' ? 'cannon' :
'cannonHeavy'`) is the only branch. **Ironclad (Steam), dreadnought,
torpedo (Dreadnoughts) and battleship (Airpower) — 4 of 5 ages — all fire
the byte-identical `cannonHeavy` recipe**; only Sail (`cannon`), the two
Swarms hulls (`pulse`/`laser`) and carrier (`flak`) have their own voice.
The brief's core question ("do weapons from each of the 5 ages sound
distinct?") — no.

**Mix & Spatial: 8/10 (+2)** — Round 1's bug (`V.wet`/`V.echo` tapping
pre-filter, so distance brightened) is fixed: centroid now falls with
range for rail (5946→4519→3011→1335 Hz, d=0→400) and mostly for cannon
(1584→1770→1298→1109 Hz). `combatDuck` is a real, separate sidechain: with
SFX audio silenced (`sfxVol.disconnect()`) but ducking automation still
firing, a 12-shot `cannonHeavy` barrage pulls isolated music RMS from
−22.91→−25.33 dBFS (−2.3 dB) — a deliberate mix move, not limiter
incidence (round 1 measured only 1.16 dB, all limiter). Docked for two new
findings: (a) `cannonHeavy` centroid bumps to 2038 Hz at d=250 between
1567 Hz (d=150) and 672 Hz (d=400) — not fully monotonic; (b) stacking 8
heavy voices raises sub<120 Hz 82.4%→87.4% while mid500-2k falls
2.9%→2.1% — no low-end pile-up guard exists.

**Music/Adaptivity: 8/10 (+1)** — Both features confirmed by instrumented
probes, not inferred. Tempo: at I=0.9 bar cadence locks to
2.381 s/16 steps (`STEP/1.12`, effective 100.8 BPM), vs 2.667 s (90 BPM) at
I=0.3, changing only on `step%16===0`. Theme: `WAR[0]` (`Dm-Bb-C-Dm`)
recurs at war sections 1 and 3 of 4 (odd `warSecs`) with `plan.kind==='horn'`
both times, from logging `_section()` over 90 s at I=0.85. Docked: the
theme never modulates — same progression/register each time, so a long war
stretch repeats instead of building (improvement #8).

## Verification table

| # | Change | Status | Measured evidence |
|---|---|---|---|
| 1 | `sendDest` distance lowpass on sends | **Verified** (caveat) | Centroid falls with range: rail 5946→1335 Hz, cannon 1584→1109 Hz (d=0→380); `cannonHeavy` has one bump at d=250 (2038 Hz) |
| 2 | `combatDuck` sidechain | **Verified** | Isolated music RMS −22.91→−25.33 dBFS (−2.3 dB) under a 12-shot `cannonHeavy` barrage, SFX audio muted |
| 3 | Echo fb 0.42, sends 0.24–0.28 | **Verified** | Impulse into `echoIn`: 3 repeats @0.41 s spacing, ≈−6 dB/hop (theory −7.5 dB) |
| 4 | `cannon` 3-variant round-robin + crackle | **Verified** | Peak spread 5.3 dB / centroid 587 Hz over 24 renders (was 2 dB/175 Hz); crackle burst present in `RECIPES.cannon` |
| 5 | `rail` less sub, louder whine/zap, lvl 1.7 | **Verified** | sub<120 Hz 97.9%→34.6%; hi2k-6k 45.6%; isolated peak ≈−15.8 dBFS |
| 6 | Tempo ×1.12, recurring WAR[0] theme | **Verified** | Cadence 2.667 s→2.381 s (I 0.3→0.9), only at bar lines; WAR[0] recurs on odd `warSecs` w/ horn |

## Top 8 remaining improvements

1. **Fix the 4-ages-1-sound collision.** `combat.js`'s `SHOT` table
   (`shell`/`shell_big`→`snd:'cannonHeavy'`) and line 275 mean ironclad,
   dreadnought, torpedo, battleship share one recipe. Tag `play()` options
   with `era` and branch `RECIPES.cannonHeavy(V)` the way `cannon`'s `rr`
   already branches burst centers — steam era leans on valve-hiss/brown
   noise, airpower era layers a sharper `flak`-style crack.

2. **Give thunder its own recipe.** `weather.js` fires
   `audio.play('explosionBig', {pitch:0.45})` for lightning. Measured 90%
   vs 86.4% sub<120 Hz, identical envelope to a real blast — storm vs.
   combat is acoustically confusable. Add a `thunder` `DEFS`/`RECIPES`
   entry: filtered `brown` noise, multi-second decay, no crackle/mid
   transient.

3. **Add a low-end guard against barrage masking.** Stacking 8 sub-heavy
   voices raised sub<120 Hz 82.4%→87.4%, shrank mid500-2k 2.9%→2.1%
   (measured). In `Engine.play()`, add a lowshelf on `sfxIn` that ducks a
   few dB <150 Hz once concurrent `pri>=4` voices cross a threshold,
   generalizing the existing per-name density term
   (`base /= 1 + 0.12*same`).

4. **Deepen `combatDuck` for sustained fire.** Its cap
   (`Math.min(0.4, 0.2+base*g*0.15)`, `audio.js` L198) only reached −2.3 dB
   measured net. Raise the ceiling toward ~0.55 and let depth accumulate
   across overlapping `pri>=5` hits (rail/hypersonic/explosionBig) instead
   of a hard cap, so focus fire visibly buries the score.

5. **Give UI its own headroom margin.** `uiClick` gained only +3.1 dB peak
   over a 24-voice battle bed despite `pri:10`/`lvl:4.73`. Add a fast
   (~80 ms) micro-duck on `sfxIn` triggered from `uiClick`/`uiHover`/
   `uiError`, mirroring the `combatDuck` pattern already in `play()`.

6. **Smooth the mid-range distance bump on `cannonHeavy`.** Centroid rose
   1567→2038 Hz between d=150 and d=250 before collapsing at d=400 — the
   `sendDest` lowpass (`audio.js` L190) isn't monotonic mid-range. Tighten
   the `cutoff` ramp or reuse `elp`'s single-stage lowpass instead of the
   `cutoff*1.15` companion filter.

7. **Add a continuous distant-thunder ambience bed.** `Ambience.start()`'s
   storm block (`ambience.js`) only has `rainG`/`galeG`; thunder exists
   only as the per-strike hit (#2). Add a slow-swelling low-passed
   brown-noise "rolling thunder" layer gated by `setStorm(v)`, independent
   of strike timing.

8. **Modulate the recurring theme instead of repeating it literally.**
   `_section()` (`music.js` ~L234) revisits `WAR[0]` verbatim every other
   war section. Transpose `this.shifts`/root up a step each time `theme`
   triggers (track `(this.warSecs/2)|0 % N`) so a long war stretch builds
   instead of resampling the identical hook.
