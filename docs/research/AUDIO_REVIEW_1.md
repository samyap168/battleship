# Armada Ascension — Audio Review 1

Procedural WebAudio review of `src/audio/*`. All numbers below were measured
offline (`renderOffline`, `OfflineAudioContext`) with a custom FFT/envelope
harness (`preview/analyze.js`, temporary — not part of the game), not by ear.

## Scores

**SFX Impact: 7/10** — Cannon/explosion/rail land 82–98% of energy below
120 Hz (cannon 84.3%, cannonHeavy 87.3%, explosion 82.4%, explosionBig
84.9%, rail 97.9%), with fast attacks (cannon 21–37 ms, explosionBig
10 ms, rail 46 ms) and long tails (cannon −40 dB point ≈1.3 s past peak,
cannonHeavy ≈1.9 s) — real weight and punch. A 40-shot/21-voice barrage
stays clean: raw peak −2.83 dBFS vs processed −3.62 dBFS, i.e. the
limiter barely has to work. Docked for rail's sub-bass domination and a
token horizon-echo send (`echo: 0.05–0.15` in `DEFS`) that under-sells
open-water scale.

**Variety/Realism: 7/10** — Isolated-render jitter is real, not a loop:
cannon peak −18.25…−16.37 dBFS (≈2 dB) and centroid 1619–1794 Hz across 6
independent renders; rail −13.64…−11.64 dBFS; laser −30.02…−28.88 dBFS.
Weapon ages are mostly well separated: cannon/explosion sub-heavy
(82–87% <120 Hz), laser/pulse mid-band with **zero** sub (laser 80.3% in
500 Hz–2 kHz, 0% <120 Hz), missile dominated by exhaust roar (52.9% in
2–6 kHz), drone swarm sits in 500 Hz–6 kHz (0.3% sub, `Swarm` bus @150).
Docked because rail (97.9% sub) doesn't read as "electric railgun", and
because variation is only continuous pitch/level jitter (`jp`/`jv`,
3–18%) over fixed layers — no structural round-robin, so a barrage keeps
one recognizable "voiceprint" per gun.

**Mix & Spatial: 6/10** — The distance model is sound in principle: gain
follows `(1-dn)^1.6/(1+1.5·dn)` (cannon: 0 dBFS-ref → −21.75 dBFS@150u →
−41.55 dBFS@380u) and reverb/echo sends scale by `√g` not `g`, so wet/dry
ratio correctly rises with range. Compression/limiting is well judged
(above). **But** a concrete bug undercuts "distance = muffled": `V.wet`/
`V.echo` in `audio.js` `play()` tap `V.out` (pre-filter) instead of
`head` (post distance-lowpass), so at range the reverb/echo tail keeps
full brightness while the dry path darkens — measured directly: cannon
centroid **rises** with distance (1764 Hz@0u → 1909@150u → 2191@250u →
2324 Hz@380u) instead of falling. There's also no sidechain ducking of
music under sustained SFX (only stingers duck, `audio.js:249-252`); a
full-intensity score under a 40-shot barrage only adds 1.16 dB RMS over
SFX alone (−18.06 vs −19.22 dBFS) — the master limiter is providing that
"restraint", not a deliberate mix decision.

**Music/Adaptivity: 7/10** — Genuinely adaptive, not a crossfade:
intensity 0.05→0.95 gives +7.4 dB RMS (−28.96→−21.55 dBFS) and +10 dB in
the 50 ms-window max (−24.28→−14.33 dBFS), and spectral balance itself
shifts (sub<120 Hz 31.1%→69.4%, low 120–500 Hz 49.5%→19.4%) as taiko
drums enter and the drone lowpass opens (`droneLP.frequency` 170→430 Hz).
Chord pools swap CALM↔WAR, lead instruments (dizi/erhu/horn) come and go
with intensity. Docked because BPM (`music.js` `BPM = 90`) never moves
with intensity, and `_section()` picks progressions at random with only
a no-immediate-repeat guard — no recurring motif or key movement.

## Top 8 improvements, ranked by impact

1. **Fix the distance-filter bypass** (`audio.js` `play()`, ~L182-190).
   `V.wet`/`V.echo` connect from `V.out` before the distance lowpass;
   reconnect from `head` (post-`lp`), or add a second gentler lowpass on
   the wet/echo taps. Highest-impact, lowest-risk fix — restores the
   "far shots sound muffled" cue measurement shows is currently inverted.

2. **Give `rail` its own spectral identity** in `sounds.js`. The sub
   thump (`V.tone(t,{f:66*p, f1:24*p, ... peak:1.0})`) swamps the
   capacitor-whine layer (`wg`/`trem`/`bp`, peaks 0.3–0.5): 97.9% of
   energy sits under 120 Hz, a spectral clone of `cannon`. Halve the sub
   tone's `peak` to ~0.5, raise the whine/bandpass layers 2–3×; target
   ≤50% sub so the electric snap reads.

3. **Add structural (round-robin) variation to `cannon`/`cannonHeavy`.**
   Today's only variance is `jp`/`jv` jitter (±2 dB / ±10%, measured) over
   one fixed burst stack. Use `pick()` (`synth.js`) to branch between
   2–3 alternate burst-timing/filter-center variants per call.

4. **Sidechain-duck music under sustained SFX, not just stingers.** Add
   an envelope follower on `sfxIn` driving `musicIn.gain` down ~3–4 dB
   during a barrage, mirroring the stinger duck (`audio.js` ~L251).
   Measured busy-fight RMS is only 1.16 dB higher with music playing —
   the limiter, not a mix decision, is currently doing the restraining.

5. **Strengthen the horizon echo for big weapons.** `DEFS.echo` tops out
   at 0.12–0.15 (`cannonHeavy`, `explosionBig`, `hypersonic`) through one
   0.41 s/0.3-feedback delay tap (`audio.js` `echoIn`). Raise to ~0.25–0.3
   and extend feedback/decay for 2–3 audible repeats across the water.

6. **Differentiate black-powder crack from turret-HE thud.** `cannon`
   and `explosion` measure near-identical fingerprints (84.3% vs 82.4%
   sub<120 Hz). In `blast()`/`cannon` (`sounds.js`), add a 15–20 ms
   1.5–3 kHz crackle burst with slight random comb/ring modulation for
   powder-grain grit, distinct from clean modern HE.

7. **Push tempo with intensity** in `music.js`. `BPM` is a hard constant
   (90); only density/timbre change today (sub-band energy 31%→69%,
   measured, but no tempo shift). Scale `STEP` toward ~104 BPM past
   `I > 0.6`, or swap in a double-time `FILL`/`DRUMS` variant.

8. **Give the score a recurring identity.** `_section()` (`music.js`)
   picks `CALM`/`WAR` progressions at random (only a no-repeat guard).
   Anchor one 2-bar hook to `I > 0.8` instead of `pick()`, and modulate
   the drone root up a whole step in long war sections, so a match
   develops a throughline instead of resampling the same chord pool.
