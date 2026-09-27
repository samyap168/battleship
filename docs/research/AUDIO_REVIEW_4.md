# Armada Ascension — Audio Review 4

Round 4, same method: offline `OfflineAudioContext` renders through
`preview/analyze.js`, now extended with three Round-4 helpers —
`shipVoiceProbe()` (ctx.suspend()-stepped readout of `Ambience`'s per-age
propulsion gains), `musicArc()` (drives `Music` through a scripted 10-minute
calm→war→finale curve via repeated `setIntensity()`/`scheduleUntil()` calls,
patching `_section()` to log every section's pool/progression/pattern/theme
state — no audio rendered, so it's exact and instant), and `musicLoudness()`
(the same curve, actually rendered through the full mix chain for real RMS
dBFS). A genuine 600s real-time render timed out in this harness (procedural
reverb-heavy audio isn't free to render even offline); the loudness arc below
uses a proportionally-scaled 150s render (same calm/ramp/hold/finale shape,
÷4) cross-checked against the exact 600s `musicArc` section log for shape.

## Scores

**SFX Impact: 9/10 (+0)** — Not targeted this round; `heal`/`capture` are
fixed (see below) but the roster-wide loudness-by-narrative-weight gap
(Round 3 improvement #3) is otherwise untouched.

**Variety/Realism: 9/10 (+0)** — The era≥4 `cannonHeavy` crack is
measurably stronger (`directRecipe`, era4 vs era3, own-band `bandRms` peak):
+2.15 dB in its 5.2kHz/Q1.4 band (was +1 dB in Round 3) and +2.32 dB in the
new 7kHz N-wave-snap band (−3.30 dBFS vs −5.62 dBFS era3 baseline) — a real
fix, but the ship-voice work (change #1) is an ambience *system*, not an SFX
recipe, so it lands in Mix, not here. Net unchanged pending the still-open
Round 3 items (#5 crack — now addressed — but #4 roar/victory width and #7
barrage second-stage guard remain).

**Mix & Spatial: 9/10 (+0 in isolation, but the missing propulsion voice —
the review's own #1 ask — is finally shipped)** — `shipVoiceProbe()`
confirms the layer is real and correctly age-gated: at `speed=1`, age1
(Sail) creak gain 0.0799 (age2–5 ≈0), age2 (Steam) chuff 0.1098, age3/4
(Dreadnought/Airpower-adjacent) turbine 0.0549/0.0550, age5 (Swarm) hum
0.0319 — each layer is silent (≤0.0002) outside its own age. `washG` tracks
speed exactly as coded (0.012 + 0.07·v): 0.0121 at v=0 → 0.082 at v=1;
`chuffLfo` tempo tracks speed exactly (1.2+3.2·v): 1.206 Hz at v=0 → 4.399 Hz
at v=1. Docked to hold at 9 rather than move to 10: rendering the ambience
bed for each age (ocean+wind+ship, 3s window) measures only −34.2…−31.3 dBFS
RMS across all five ages — a 3 dB spread — meaning the per-age propulsion
character is present and correct but sits low enough in the bed that it will
often read as texture, not a distinct "this ship" identity, at normal
listening levels.

**Music/Adaptivity: 8/10 (+0, but the fix is real and the finale is new)** —
The Round-3-identified overuse is fixed: instrumenting the exact `_section()`
boolean (diffing `warSecs` across the call rather than pattern-matching
progressions, which would double-count sections that land on `WAR[0]`
naturally) over a 2400s all-war stress run gives theme fires = 42/126
eligible (`I>0.85`) sections = **0.333 exactly** — matches the coded `%3===1`
gate precisely; over the standard 600s 32-section match it's 7/20 eligible
(35%), down from Round 3's 16/32 (50%) of the *entire* score. But a new,
smaller issue appears at this same scale: the theme override forces
`pi=0` without checking it against the immediately preceding section's own
(possibly-already-`WAR[0]`) pick, so a 600s run shows 1–4 exact back-to-back
progression repeats per run (`Dm-Bb-C-Dm` twice running at sections 14→15,
17→18, 20→21 in one run) — audible as a literal instant replay, not a
"return." The finale is real but not airtight: `setFinale(true)` correctly
switches to the `FINALE` pool, floors drums at level 3 even when `I` is
deliberately dropped to 0.1 (measured `drumLvl=3` throughout), and holds
tempo at exactly 1.18× — confirmed directly. But "horn call every section"
only holds when `I≥0.6`: at `I=0.65` during finale, 9/9 sampled sections got
`plan:'horn'`; at `I=0.3` during finale, only 5/9 did (4 got `'lead'`
instead), because the pre-existing `I<0.6 && !hadLead` lead-instrument branch
in `_section()` is checked *before* the `this.finale` horn branch and isn't
excluded by it. In the real 600s match the Dusk Tide only starts once
`combatHeat`-driven `I` is already high, so this gap is rarely hit — but it
means the spec's "every section" isn't structurally guaranteed.

## Verification table (changes since Round 3)

| # | Change | Status | Measured evidence |
|---|---|---|---|
| 1 | Continuous player ship voice (`Ambience.setShip`, `main.js` per-frame feed) | **Verified** | `shipVoiceProbe`: age1 creak 0.080 / age2 chuff 0.110 / age3–4 turb 0.055 / age5 hum 0.032, each ≈0 off-age; `washG` 0.012→0.082 and `chuffLfo` 1.21→4.40Hz exactly track `speed` 0→1 per the coded formulas; `main.js:408` calls `audio.setShip` unconditionally inside the per-frame update when `mode==='play'` |
| 2 | Theme returns every 3rd war section (was every other), only `I>0.85` | **Verified** | Diffed `warSecs` across `_section()` calls (not string-matching, which would conflate natural `WAR[0]` picks): 42/126 eligible sections over a 2400s all-war run = exactly 0.333; 7/20 over a standard 600s match (was 16/32 = 50% in Round 3) |
| 3 | `heal`/`capture` `lvl` ×0.6 | **Verified** | Source diff: `heal` 3.31→1.99 (×0.601), `capture` 2.57→1.54 (×0.599); rendered isolated peak: heal −13.0 dBFS (was −9.5), capture −11.3 dBFS (was −7.7), both now below `explosionBig` (−11.5 dBFS) |
| 4 | Era≥4 `cannonHeavy` crack stronger (peak 0.95 + 7kHz N-wave snap) | **Verified** | `directRecipe` era4 vs era3, own-band `bandRms` peak: 5.2kHz band +2.15dB (was +1dB in Round 3), new 7kHz highpass band +2.32dB (−3.30 vs −5.62 dBFS) |
| 5 | Music finale for the Dusk Tide (`setFinale`, FINALE pool, drums≥3, horn every section, 1.18× tempo) | **Mostly verified** | `FINALE` pool confirmed selected; drum level floors at 3 even at forced `I=0.1`; tempo locks to 1.18 exactly; horn call fires 9/9 sections at `I=0.65` but only 5/9 at `I=0.3` (lead-branch precedence bug — "every section" not structurally guaranteed at low `I`); `game.js:427` triggers at `t>=480`, `main.js:91` resets `setFinale(false)` at match start |

## Full-match music arc (600s, 32 sections, default calm→war→finale curve)

- **Section variety**: 8 CALM + 17 WAR + 7 FINALE sections. Distinct
  progressions actually used per pool (of the pool's total): CALM 6/8,
  WAR 6–7/7, FINALE 3–4/4 (three repeat runs). Drum level climbs 0→1→2→3→4
  in lockstep with `I`; tempo steps 1→1.12→1.18 exactly at the coded
  thresholds.
- **Repeats**: patterns (`PATS`) never repeat back-to-back (guarded in
  source) across any run. Progressions repeat back-to-back 0–4 times per
  600s run, entirely attributable to the theme override's missing
  adjacent-repeat check (see above) — every observed repeat was a
  natural-pick section immediately followed by a theme-forced `WAR[0]`/
  `FINALE[0]` section.
- **Loudness arc**: a proportionally-scaled (÷4, 150s) real render through
  the full mix (duck/fade/glue-comp/limiter) shows a genuine climb: −29.2
  dBFS at open → mid −27…−25 dBFS through the war ramp → −24.4…−23.3 dBFS
  once the drums floor and horn calls lock in for the finale segment — a
  clean ~6dB arc from hush to peak, congruent with the exact drum-level/
  tempo staircase measured in the full 600s scheduling-only run.
- **Is the finale distinct?** Yes on the numbers that matter most for
  in-game feel — busier drums (floored, can't drop back to level 1–2 even in
  a lull), faster tempo (1.18× vs 1.12× war-cap), a harmonically narrower,
  more insistent pool (4 cadences, all landing on Dm, vs WAR's 7) and a horn
  call in nearly every section — but it is not distinct in raw output
  loudness beyond what the war ramp already reaches, and (per the table
  above) can silently lose its "horn every section" signature if intensity
  ever dips during it.

## Top 8 remaining improvements

1. **Give the ship-voice layer its own audible identity, not just a gated
   texture.** `shipVoiceProbe` shows only a 3dB RMS spread across all five
   ages' full ambience beds (−34.2…−31.3 dBFS) — the propulsion character is
   correct but subtle. In `Ambience.setShip()` (`ambience.js`), add a
   periodic transient tied to `chuffLfo`'s own edges (a real piston "thunk"
   burst on each square-wave rising edge via an `AudioWorklet`-free
   `ScriptProcessor`-free trick: retrigger a short `k.gain` envelope from a
   second oscillator reading `chuffLfo`'s phase) instead of relying purely on
   continuous filtered noise.

2. **Guard the theme override against an immediate repeat.** `_section()`
   (`music.js` ~L240) sets `pi=0` when `theme` fires without checking it
   against `this.lastProg`/`this.lastPool` the way the normal random pick
   already does — measured 1–4 exact back-to-back `WAR[0]`/`FINALE[0]`
   repeats per 600s match. Fold the theme branch into the same do-while
   anti-repeat guard, or skip the theme this cycle (defer `warSecs%3` by one)
   when the natural pick already landed on index 0.

3. **Close the finale's low-intensity horn gap.** In `_section()`'s plan
   logic, the `I < 0.6 && !this.hadLead` lead branch is checked *before*
   `this.finale` — measured 5/9 (not 9/9) horn calls at a forced `I=0.3`
   during the finale. Reorder so `this.finale` short-circuits straight to
   the horn branch, guaranteeing the spec'd "horn call every section"
   regardless of any late-match lull in `combatHeat`.

4. **Calibrate loudness by narrative weight, not just by ear-tuned `lvl`.**
   Still open from Round 3: `heal`/`capture` are fixed, but the roster-wide
   32dB isolated-peak spread (`DEFS` in `sounds.js`) has no `pri`-linked
   floor/ceiling. Derive a target loudness curve from `pri` and re-anchor
   `lvl` against it in one pass.

5. **Widen `roar` and `victory`.** Still untouched since Round 2/3: both
   measure as narrow as ordinary gunfire despite `pri:9`/`10`. Add a
   pri≥8-gated micro-delay/detune double in `play()` (`audio.js`).

6. **A second-stage clarity guard for sustained barrages.** Still open:
   `sfxShelf`'s single low-shelf caps growth but 8 stacked `cannonHeavy`
   still drifts sub-heavy under focus fire. Add a 300–800Hz companion
   band in the same shelf chain (`_build()`/`sfxShelf` wiring in
   `audio.js`).

7. **Make the Dusk Tide's arrival audible in ambience, not just music.**
   `game.js:423` sets `this.duskTide` but nothing in `Ambience` reads it —
   the ocean/wind bed is identical before and after 8:00. Add a `setDusk(on)`
   to `Ambience` (`ambience.js`) that darkens `windBP`'s band and drops gull
   rate, so the *world*, not only the score, signals the endgame.

8. **Widen the theme's melodic lift beyond scale-degree shifts.** The
   climbing `[0,2,4]` lift (`this.shifts`, `music.js` `_section()`) is
   confirmed still working under the new cadence, but with the theme now
   returning less often (every 3rd war section instead of every 2nd), a
   full 600s match only gets 2–3 theme statements to show that climb before
   the finale takes over — barely enough to register as a rising arc. Either
   let the lift continue climbing into the finale's own `WAR0`/`FINALE0`
   returns (`theme` fires there too, per the verification table) instead of
   resetting, or compress the modulo so the climb completes at least once
   per typical match length.
