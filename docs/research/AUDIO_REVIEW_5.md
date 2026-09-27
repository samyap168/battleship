# Armada Ascension — Audio Review 5

Method: `renderOffline` through `preview/audio.html`'s live dev server (Playwright,
chromium, `--autoplay-policy=no-user-gesture-required`), using dynamic
`import('/src/audio/audio.js')` to get a raw `Engine` for `ctx.suspend()`-timed
stinger scheduling and frozen-bed A/B ambience renders. All 39 `SOUND_NAMES`
and all 8 `STINGER_NAMES` rendered both raw and through the full mix chain;
music driven via the same `_section()`-patch/no-audio technique as Round 4.

## Scores

**SFX Impact: 9/10 (+0)** — Zero non-finite samples across all 39 SFX (raw
and mixed) and all 8 stingers. `citadelFall` peaks -3.2dBFS mixed / -2.8dBFS
raw — safely inside the same headroom band as `explosionBig`/`cannonHeavy` —
and its overlap with the victory/defeat stinger clips nothing (`maxShortDb`
-6.4/-7.7dBFS, peak ≤-2.9dBFS). But the roster-wide `pri`-loudness gap (R3/4
#4) is unchanged: within the single `pri:10` tier, mixed RMS spans
-70.4dBFS (`uiHover`) to -16.8dBFS (`citadelFall`), 54dB in one nominal
priority bucket.

**Variety/Realism: 9/10 (+0)** — `_shipEvents` gives each age real, distinct,
*speed-reactive* content: a frozen-bed (surf/wind swells held constant) A/B
of ship-on vs ship-off shows the whole-bed RMS lifting +4.41dB (age1, bow
slap) to +8.20dB (age4, diesel knock) at v=0.9, vs only +1.31 to +3.49dB at
v=0.2 — a real, per-age, tempo-linked identity, not just filtered noise.
`citadelFall`'s 7s arc (detonation → 22-hit decaying masonry cascade → 196Hz
bell toll clang → 150Hz water-clank → sea-surge burst) is genuinely
distinct from `towerDown`. Unchanged: `roar`/`victory` are still no wider
than ordinary gunfire (R2/3 #5, untouched again this round).

**Mix & Spatial: 9/10 (+0 — one new problem measured, alongside a genuine
win)** — The ship voice's idle audibility is the real gap: at v=0.2 it only
lifts the bed 1.3–3.5dB (age-dependent) vs 4.4–8.2dB at v=0.9, so "my ship"
reads clearly underway but nearly vanishes stationary or crawling. New this
round: `citadelFall` + the victory/defeat stinger at the game's exact +2.2s
offset (`game.js:endMatch`) collide in the sub-bass. `citadelFall`'s
"ground-shaking sub" tone (46→22Hz, 1.2s hold, 3.2s decay) is still ringing
at t=2.2–3.4s: isolated, that window measures -22.2dBFS in a 90Hz-lowpass
band; with the stinger's opening gong/taiko landing in the same window it
jumps to -15.3dBFS (victory) / -19.0dBFS (defeat) — a 3–7dB uncontrolled
low-end pile-up right at the match's emotional peak, because `stinger()`
(`audio.js`) only ducks `musicIn`, never `sfxIn`/`sfxRevIn` where
`citadelFall` itself lives. No clipping results (limiter/compressor absorb
it), but it's unmanaged, not designed.

**Music/Adaptivity: 9/10 (+1 — both R4 open items now verified fixed)** —
Diffing `_section()` over a 2400s all-war (`I=0.9`) run: 0/126 back-to-back
progression repeats (R4 #2's guard now checks `lastPool`/`lastProg` before
forcing `pi=0`; was 1–4 per 600s). The finale horn gap (R4 #3) is closed:
`_section()`'s lead-branch now excludes `!this.finale`, and forcing `I=0.3`
through 22 post-finale sections gives horn on 22/22 (was 5/9). Drum floor
(3) and 1.18× tempo lock still hold exactly. Remaining open items: theme's
melodic lift still resets before completing (R4 #8) and `roar`/`victory`
width (R2/3 #5).

## Verification table

| # | Change | Status | Measured evidence |
|---|---|---|---|
| a | `Ambience._shipEvents` per-age rhythmic one-shots | **Verified, with a gap** | Frozen-bed A/B: whole-bed RMS +4.4…+8.2dB at v=0.9 across ages 1–4 (distinct per-age character, tempo-linked); only +1.3…+3.5dB at v=0.2 — barely emergent at idle. Silent in menu/sunk confirmed by code path (`AudioSystem.setShip` only called when `mode==='play' && G.player`; `age=0` short-circuits `_shipEvents`) |
| b | `citadelFall` SFX + victory/defeat stinger ~2.2s later | **Verified, unmanaged overlap** | No clipping/non-finite (peak ≤-2.9dBFS, `maxShort` -6.4/-7.7dBFS); but 90Hz-band RMS in the 2.2–3.4s window rises from -22.2dBFS (citadel alone) to -15.3/-19.0dBFS once the stinger lands — `stinger()` ducks only `musicIn`, not `sfxIn` |
| c1 | Theme override adjacent-repeat guard (R4 #2) | **Verified fixed** | 0/126 back-to-back progression repeats over 2400s all-war |
| c2 | Finale horn gap (R4 #3) | **Verified fixed** | 22/22 post-finale sections get `horn` at forced `I=0.3` (was 5/9) |

## Top 6 improvements

1. **`audio.js:stinger`** — no duck of `sfxIn` when a stinger fires, so
   `citadelFall`'s still-ringing sub tone collides with the victory/defeat
   gong (measured +7dB low-band pile-up at t=2.2–3.4s). Add a symmetric,
   short `sfxIn`/`sfxShelf` duck (~-4dB, 0.15s) alongside the existing
   `musicIn` duck when `pri>=8`.
2. **`ambience.js:_shipEvents`** — idle/slow ship voice only +1.3–3.5dB
   above the bed. Raise each age's floor term (e.g. age1's
   `peak: 0.05 + v*0.1` → `0.09 + v*0.08`) so the ship reads even at rest.
3. **`sounds.js:DEFS`** — `pri:10` alone spans 54dB (-70.4 to -16.8dBFS).
   Split `pri` (voice-stealing) from a separate loudness-weight field with
   its own floor/ceiling, per R3/4 #4.
4. **`audio.js:play`** — `roar`/`victory` still no wider than gunfire
   despite `pri:9/10`. Add a `pri>=8`-gated micro-delay/detune double.
5. **`music.js:_section`** — theme's `[0,2,4]` melodic lift still resets
   before a 600s match completes it even once. Let it continue through the
   finale's own theme returns instead of resetting.
6. **`ambience.js`** — `game.js:425`'s `duskTide` flag still has no
   `Ambience.setDusk()` reader (grepped: absent). Add one to darken `windBP`
   and drop gull rate once the endgame timer trips.
