# Armada Ascension — Audio Review 4

Round 4, same method: offline `OfflineAudioContext` renders through
`preview/analyze.js`, extended with `shipVoiceProbe()` (ctx.suspend()-stepped
readout of `Ambience`'s per-age propulsion gains), `musicArc()` (drives
`Music` through a scripted 10-min calm→war→finale curve via repeated
`setIntensity()`/`scheduleUntil()`, patching `_section()` to log every
section's pool/progression/pattern/theme state — no audio rendered, exact
and instant), and `musicLoudness()` (same curve, actually rendered for real
RMS dBFS). A genuine 600s real-time render timed out in this harness; the
loudness arc uses a proportionally-scaled 150s render (÷4) cross-checked
against the exact 600s `musicArc` section log.

## Scores

**SFX Impact: 9/10 (+0)** — Not targeted this round beyond `heal`/`capture`
(fixed, see table); the roster-wide loudness-by-weight gap (R3 #3) stands.

**Variety/Realism: 9/10 (+0)** — Era≥4 `cannonHeavy` crack is measurably
stronger (`directRecipe` era4 vs era3, own-band `bandRms` peak): +2.15dB in
its 5.2kHz/Q1.4 band (was +1dB in R3) and +2.32dB in the new 7kHz N-wave-snap
band (−3.30 vs −5.62 dBFS). Real fix, but R3's #4 (roar/victory width) and
#7 (barrage clarity) are still open, so net unchanged.

**Mix & Spatial: 9/10 (+0, but the review's own top ask is finally shipped)**
— `shipVoiceProbe` confirms the ship-voice layer is real and age-gated: at
`speed=1`, age1 creak 0.0799 (others ≈0), age2 chuff 0.1098, age3/4 turbine
0.0549/0.0550, age5 hum 0.0319 — each ≤0.0002 off-age. `washG` tracks speed
exactly as coded (0.012+0.07·v): 0.0121→0.082 over v=0→1; `chuffLfo` tempo
tracks speed exactly (1.2+3.2·v): 1.21→4.40Hz. Docked: rendering the full
ambience bed per age (ocean+wind+ship) measures only −34.2…−31.3 dBFS RMS
across all five ages — correct character, but a 3dB spread that reads as
texture more than a distinct "this ship" identity at normal volume.

**Music/Adaptivity: 8/10 (+0 — the fix is real, the finale is new but not
airtight)** — Theme overuse is fixed: diffing `warSecs` across `_section()`
calls (not string-matching, which would double-count natural `WAR[0]`
picks) over a 2400s all-war run gives 42/126 eligible (`I>0.85`) sections =
**0.333 exactly**, matching the coded `%3===1` gate; over a standard 600s
match it's 7/20 (35%), down from R3's 16/32 (50% of the *entire* score). New,
smaller issue: the override forces `pi=0` without checking the immediately
preceding section's own pick, so 1–4 exact back-to-back progression repeats
appear per 600s run (`Dm-Bb-C-Dm` twice running, sections 14→15 in one run).
The finale is real: `FINALE` pool selected, drums floor at level 3 even at a
forced `I=0.1`, tempo locks to exactly 1.18×. But "horn every section" only
holds at `I≥0.6` — 9/9 sampled sections got `horn` at `I=0.65`, only 5/9 at
`I=0.3` (the pre-existing `I<0.6` lead-branch runs *before* the finale check
and isn't excluded by it). Rare in practice (Dusk Tide starts when `I` is
already high) but not structurally guaranteed.

## Verification table (changes since Round 3)

| # | Change | Status | Measured evidence |
|---|---|---|---|
| 1 | Continuous player ship voice (`Ambience.setShip`, per-frame feed) | **Verified** | age1 creak 0.080/age2 chuff 0.110/age3–4 turb 0.055/age5 hum 0.032, ≈0 off-age; `washG` 0.012→0.082, `chuffLfo` 1.21→4.40Hz track speed exactly; `main.js:408` calls `audio.setShip` unconditionally each frame in play mode |
| 2 | Theme returns every 3rd war section (was 2nd), only `I>0.85` | **Verified** | `warSecs`-diffed: 42/126 over 2400s all-war = 0.333 exact; 7/20 over 600s match (was 16/32=50%) |
| 3 | `heal`/`capture` `lvl` ×0.6 | **Verified** | Source diff: heal 3.31→1.99 (×0.601), capture 2.57→1.54 (×0.599); rendered peak: heal −13.0dBFS (was −9.5), capture −11.3dBFS (was −7.7), both now below `explosionBig` (−11.5) |
| 4 | Era≥4 crack stronger (peak 0.95 + 7kHz N-wave snap) | **Verified** | 5.2kHz band +2.15dB (was +1dB); new 7kHz band +2.32dB (−3.30 vs −5.62 dBFS) |
| 5 | Music finale (`setFinale`, FINALE pool, drums≥3, horn/section, 1.18× tempo) | **Mostly verified** | Pool/drum-floor/tempo confirmed exact; horn fires 9/9 at I=0.65 but 5/9 at I=0.3 (lead-branch precedence gap); `game.js:427` triggers at t≥480, `main.js:91` resets at match start |

## Full-match music arc (600s, 32 sections)

- **Variety**: 8 CALM + 17 WAR + 7 FINALE sections. Distinct progressions
  used per pool (of pool total, 3 repeat runs): CALM 6/8, WAR 6–7/7, FINALE
  3–4/4. Drum level climbs 0→1→2→3→4 and tempo steps 1→1.12→1.18 exactly
  at the coded `I` thresholds.
- **Repeats**: patterns never repeat back-to-back (source-guarded).
  Progressions repeat back-to-back 0–4 times per 600s run, entirely from the
  theme override's missing adjacent-repeat check (improvement #2).
- **Loudness arc**: a ÷4-scaled 150s real render through the full mix (duck/
  fade/glue-comp/limiter) climbs −29.2 dBFS at open → −27…−25 through the
  war ramp → −24.4…−23.3 once drums floor and horn locks in for the finale
  segment — a clean ~6dB hush-to-peak arc, congruent with the exact drum/
  tempo staircase from the full 600s scheduling log.
- **Is the finale distinct?** Yes on what matters for feel — drums can't
  drop back below level 3, tempo is capped highest (1.18×), the pool is
  narrower and more insistent (4 Dm-anchored cadences vs WAR's 7), horn
  nearly every section — but not distinct in raw loudness beyond what the
  war ramp already reaches, and it can lose its "horn every section"
  signature if intensity dips (see table).

## Top 8 remaining improvements

1. **Give the ship voice its own audible identity.** Only a 3dB RMS spread
   across all five ages' full ambience beds (−34.2…−31.3 dBFS). In
   `Ambience.setShip()` (`ambience.js`), add a periodic transient keyed to
   `chuffLfo`'s own rising edges — a short `k.gain` envelope retriggered
   from the LFO's phase — instead of relying on continuous filtered noise.

2. **Guard the theme override against an immediate repeat.** `_section()`
   forces `pi=0` on `theme` without checking `this.lastProg`/`lastPool` —
   1–4 exact back-to-back repeats per 600s match. Fold it into the same
   do-while anti-repeat guard, or defer `warSecs%3` by one cycle when the
   natural pick already landed on index 0.

3. **Close the finale's low-intensity horn gap.** Reorder `_section()`'s
   plan logic so `this.finale` short-circuits straight to the horn branch,
   ahead of the `I<0.6` lead check — measured 5/9 vs the spec's 9/9.

4. **Calibrate loudness by narrative weight.** Still open from R3: the
   32dB roster-wide isolated-peak spread (`DEFS`, `sounds.js`) has no
   `pri`-linked floor/ceiling despite `heal`/`capture` now being fixed.

5. **Widen `roar` and `victory`.** Still untouched since R2/3: as narrow as
   ordinary gunfire despite `pri:9`/`10`. Add a pri≥8-gated micro-delay/
   detune double in `play()` (`audio.js`).

6. **A second-stage clarity guard for sustained barrages.** `sfxShelf`'s
   single low-shelf still lets 8 stacked `cannonHeavy` drift sub-heavy. Add
   a 300–800Hz companion band alongside it in `audio.js`.

7. **Make the Dusk Tide audible in ambience, not just music.**
   `game.js:423` sets `this.duskTide` but nothing in `Ambience` reads it.
   Add `setDusk(on)` (`ambience.js`) to darken `windBP` and drop gull rate.

8. **Widen the theme's melodic lift.** The `[0,2,4]` climb (`this.shifts`)
   still works, but at every-3rd-section cadence a 600s match only gets
   2–3 statements to show it before the finale takes over — barely a rising
   arc. Let the lift continue into the finale's own theme returns instead
   of resetting, or compress the modulo so it completes at least once.
