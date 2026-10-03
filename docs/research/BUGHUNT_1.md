# BUGHUNT 1: adversarial bug hunt

Scope: src/main.js, src/game/*, src/ui/hud.js, src/render/wakes.js, src/core/camera.js, src/audio/audio.js, CSS.
Method: code reading plus Playwright runs against the built game (scratch scripts only, no repo files changed).
Line numbers were taken from the tree at the time of the hunt (other edits may shift them by a few lines).

Severity: crash / wrong behaviour / minor.

Things I tried that held up: 150 random key presses (Esc, H, Tab, F1, T, Q/W/E/R, S, G, Y, C, Z, X, Space, Alt, M, F3, modifiers, arrows)
in menu, play, options and end states raised no page errors. Five consecutive matches through menu -> play -> end -> "SAIL AGAIN"
ran clean. A full 600 s autopilot match shows flat geometry (272), textures (30) and JS heap (103 MB after gc). Scene object count
tracks creep count only, so there is no in-match leak. `G.dangers`, particle and ring pools, `combat.list` and `timers` all stay bounded.

---------------------------------------------------------------------------------------------------

## VERIFIED (reproduced in the harness)

### V1. wrong behaviour (very visible): no wake ribbons for any ship after returning from the menu showreel or a previous match
- `src/render/wakes.js:88` (`if (!this.free.length) return;`) and `:106` (`if (t - tr.seen > 2)` eviction).
- `Wakes` is a single instance for the whole page, but it is driven by `G.time` (`main.js` tick: `wakes.update(gdt, t)` where `t = G.time`),
  and `G.time` restarts at 0 every match. Trails of the old game have `tr.seen` around 330 to 600, so `t - tr.seen` is negative and they are
  never evicted. Their slots stay allocated until the new match's clock passes the old `seen` value.
- Repro: load the menu, let the showreel run, click SET SAIL.
  - Menu: `trails: 80, free: 0` (all 80 slots in use).
  - Match at t=10 s and t=30 s: still `trails: 80, free: 0`, and none of the 10 captains owns a trail (`0000000000`).
  - The same happens after every "SAIL AGAIN" (the old match leaves `seen` near 600, so a new match never reaches it).
- Effect: ship wake ribbons are missing for essentially the whole match, apart from the cosmetic dotted foam.
- Fix: add `Wakes.reset()` that clears `trails`, refills `free` and zeroes the `dat` alpha channel, and call it at the top of `startGame()`
  (`main.js:156`). Defence in depth: evict also when `t < tr.seen - 1`.

### V2. wrong behaviour: Esc on the end screen destroys it, leaving no way to play again
- `src/main.js:540`: `if (hud.modalOpen && k === 'escape') { hud.closeModal(); return; }`. `modalOpen` is true for `#end` too, because the end
  screen lives in `#modalRoot`.
- Repro: win or lose, press Esc. `#end` is gone (verified). The second Esc opens Options, where QUIT TO MENU needs two clicks
  (`#optQuit`, verified). "SAIL AGAIN" is unreachable. A keyboard-spamming player at match end hits this easily.
- Fix: in the Esc branch, only close the modal if it is the age-choice (`hud.modalOpen && !G.over`). When `G.over`, ignore Esc or route it to
  `hud.handlers.menu`.

### V3. wrong behaviour: end screen does not fit 1280x650 or 800x600, so the buttons are off-screen and unreachable
- `src/ui/style.css:173` (`#end`, no overflow handling), `:174` (96 px title), `:178` (`.panel` min-width 760 px) plus the MVP card and a 14-row scoreboard.
- Measured: `#end` content `scrollHeight` is 737 px at 1280x650 and 712 px at 800x600. The "SAIL AGAIN" button spans y=627..685 at 650 px high
  and y=602..660 at 600 px high. The title is clipped at y=-87 / -112. `#end` has no scroll, so the buttons cannot be reached.
- Fix: `#end { overflow-y: auto; justify-content: flex-start; padding: 16px 0; }`, plus `@media (max-height: 760px) { #end h1 { font-size: 56px } #end td { padding: 2px 10px } .mvp { display:none } }`.
  Keep the buttons `position: sticky; bottom: 0`.

### V4. wrong behaviour: clicking on an island strands the ship at the shore at full throttle
- `src/game/map.js:188`: `pts[pts.length - 1] = { x: tx, z: tz };` (and `:183`, `if (!found) return [{x:tx,z:tz}]`).
  The final waypoint is the raw click point even when it is inside an obstacle.
- Repro: `p.commandMove(island.x, island.z)`, then 30 simulated seconds. The ship sits at distance 58 from a r=52 island (the collision shell)
  with `speed: 26` (maximum), `moveX` still set and `path.length: 1`, for the whole 30 s (and indefinitely). Arrival needs a 6 unit radius that can never be reached,
  so the hull keeps pushing at the shore, wake and funnel smoke at full speed. The camera stays locked to a jittering ship.
- Fix: snap the goal to a free spot. In `findPath`, when the click is blocked use `this.center(goal)` (nearest free cell) as the final waypoint
  instead of `tx,tz`, and drop the same assignment for the `!found` fallback. Alternatively clamp to `o.r + u.radius + pad` along the
  centre-to-click ray.

### V5. wrong behaviour: the menu showreel can end by itself and put an end screen behind the main menu
- `src/game/game.js:433` (`timeUp()`) and `:362-365` (`endMatch`). The showreel `Game` (spectate, `G.time = 329.5`) is a normal match, so it runs to
  600 s (about 4.5 min of idling on the menu) or until a citadel falls.
- Repro: stepped the menu game to the end: `over: true`, `#end` present, menu visible. The ghost of the scoreboard shows through the menu
  (`menu_end.png`), the victory / defeat stinger plays, and `hud.endScreen` ran with `G.player === undefined`.
- Fix: in `endMatch`, `if (this.opts.spectate) { restart the showreel (call a main.js callback), return; }`. Cheaper: in `main.js` `frame()`, if
  `mode==='menu' && G.over` then `startGame(true)`.

### V6. wrong behaviour: HUD collides at 800x600 (and is tight at 1280x650)
- `src/ui/style.css:184-187` has width-only breakpoints and nothing keyed on height.
- Screenshot (800x600, `hud_800.png`): the objectives panel sits on top of the top bar (hides the Azure score and age), the portrait overlaps
  the minimap, and the Armory (250 px wide, full height) covers the gold box and the "Advance to age" button, so you cannot read gold or press the
  age-up button.
- 1280x650 is acceptable, but the Armory and portrait nearly touch the topbar.
- Fix: below 900 px wide or 700 px high, collapse `#shop` to icons only (or hide it behind a toggle), move `#objectives` below the top bar, and
  shrink the minimap further. Test at 800x600.

### V7. minor: per-match GPU object leak (about 4 geometries and 1 texture per match)
- `renderer.info.memory`, matches 1 to 5: geometries 309, 314, 318, 322, 326 at match end; textures 32, 33, 34, 35, 36. Programs flat from match 3.
- Sources: `src/game/leviathan.js:16-47` (`scaleTexture()` makes a new 256x256 CanvasTexture every `new Leviathan`, plus `serpentMaterials()` and about 8 geometries,
  `:84-87`); `game.js:53` / `:27` (new ShaderMaterial per hero ring and shield); `combat.js:42-44` (mine geometry and material); instanced
  meshes in `Combat` and `Drones` never `dispose()`d. Nothing in `src` disposes per-match resources (`startGame` only does `scene.remove(worldGroup)`).
- Impact is small (a 10 match session adds roughly 3 MB GPU), but unbounded and avoidable.
- Fix: cache `serpentMaterials` and the geometries at module level, create the ring / shield materials once and share the uniforms by clone,
  and add `Game.dispose()` that traverses `worldGroup` and disposes geometries / materials / instance buffers not marked shared. Call it
  from `startGame` before `scene.remove`.

---------------------------------------------------------------------------------------------------

## SUSPECTED (argued from code, not reproduced end to end)

### S1. wrong behaviour: input state not reset on focus loss
- `src/main.js:570`: `window.addEventListener('blur', () => { cameraDir.keys = {}; });` resets only the camera keys.
  `hud.showRange` (Alt held, `:559`), the scoreboard (Tab held, `:558`), `hud.aiming` (Q/W/E/R held, `:548`), `orbitDrag` and `rightDrag` (with
  `cameraDir.orbiting`) are not reset. Alt+Tab to another app delivers the Alt/Tab keyup there, so the attack-range ring or the scoreboard
  stays up (and aiming stays armed) until the key is pressed again. With the scoreboard stuck, `hud.update` keeps rebuilding its HTML every
  20 frames.
- Fix: in the blur handler also `hud.showRange=false; hud.aiming=-1; hud.toggleScoreboard(false); orbitDrag=null; rightDrag=null; cameraDir.orbiting=false;`.

### S2. wrong behaviour: Shift held while placing a manually aimed skill starts an orbit instead of casting
- `src/main.js:467`: the capture-phase pointerdown handler treats `button 0 && shiftKey` as orbit and calls `stopImmediatePropagation()` before the aiming
  branch (`:504`). The advertised flow is "Shift+click the skill icon, then click the sea". A player who keeps Shift held for the second click
  (natural) orbits and the aim stays armed.
- Fix: skip the orbit branch when `hud.aiming >= 0`.

### S3. minor: tap / click-to-cast uses the previous frame's cursor position
- `src/main.js:506`: `playerCast(i)` uses `mouse.ground`, which is only refreshed in `tick` (`groundAt` at `:680`); `commandAtCursor` recomputes it from the event
  (`:514`) but the aiming click does not. On touch (no hover) the cast goes to the last known mouse position.
- Fix: call `mouse.x = e.clientX; mouse.y = e.clientY; groundAt(mouse.x, mouse.y);` in the aiming branch of the pointerdown handler.

### S4. minor: stale scheduled messages from a previous match
- `src/main.js:229-230` (`setTimeout` for the opening banner at 1.2 s and the controls hint at 7 s) and `src/game/game.js:312` (death coaching, 2.5 s) are never
  cancelled. If the player quits or restarts within about 7 s, the banner and hint appear in the new game or behind the menu.
  `HUD.annQueue`, `hintQ` and the `floats` / `dmgAcc` / `goldAcc` / `hitMarks` / `pings` are also not cleared in `mount()` (`hud.js:74`), so queued
  announcements from the old match can show in the next.
- Fix: keep the timeout ids and `clearTimeout` in `startGame`; reset the HUD queues in `mount()`.

### S5. minor: "SUNK" overlay can appear after the match is over
- `src/game/game.js:221` (`kill()` has no `this.over` guard) and `:311`. After `endMatch` the sim keeps running (towers, creeps, projectiles). If the player is sunk after
  the end screen is up, `ui.death()` writes "SUNK ... Recommissioning in 0s" into `#deathRoot`, plays the warning stinger and triggers slow-mo and shake, and
  respawns are disabled (`:524`) so it never clears.
- Fix: `if (this.over && u === this.player) skip ui.death`; also stop `fireGuns` of structures and creeps at `over`.

### S6. minor: instance counts can exceed buffer capacity
- `src/game/combat.js:403-404` and `:413`; `src/game/drones.js:118-119` and `:135-136`. `counts[key]++` increments even when the instance is skipped for
  being over the cap, then `im.count = counts[k]`. If the cap is ever exceeded (micro swarms, cap 900, many launches; hypersonic cap 8; torpedoes 150)
  `count` is larger than the allocated `instanceMatrix`, which WebGL rejects with an out-of-range draw error for that mesh.
- Fix: `im.count = Math.min(counts[k], CAP)`.

### S7. minor: dead bots keep shopping, including ageing up, every frame
- `src/game/ai/bot.js:23`: `if (!h.alive) { this.state = 'lane'; this.shop(); return; }` runs before the think-timer throttle. A dead bot can call
  `G.ageUp` (`game.js:173`, no `alive` check) and plays the age-up VFX / sound / announcement at the wreck, and builds the new hull for a hidden ship.
  The player can do the same: `playerAgeUp` (`main.js:368`) has no `p.alive` check, so T while sunk starts the Reforging cinematic and slow-mo.
- Fix: guard `ageUp()` with `if (!h.alive) return false`, and `shop()` once per think tick.

### S8. minor: keyboard handling swallows browser shortcuts
- `src/main.js:529` (`skipOpening` consumes every key for the first 8.5 s, including F5, F11 and Ctrl+R) and `:530-532` (any key closes the how-to card with `preventDefault`).
  Ctrl/Meta chords also trigger abilities (`Ctrl+Q`, `Cmd+S` -> `S` stops the ship; `Ctrl+R` casts R while the page reloads) because the
  letter keys do not check `e.ctrlKey || e.metaKey`.
- Fix: return early from the keydown handler when `e.ctrlKey || e.metaKey` (except the Ctrl+1..5 shop chord), and do not `preventDefault` in the skip / how-to branches.

### S9. minor: right-click on HUD panels opens the browser context menu
- `src/main.js:453` registers `contextmenu` `preventDefault` on the canvas only. Right-clicking the shop, command bar or any other `pointer-events:auto` panel opens the
  native menu mid-battle.
- Fix: `document.addEventListener('contextmenu', e => { if (mode==='play') e.preventDefault(); })`.

### S10. minor: GC churn from `Hero.abilities` getter
- `src/game/units.js:172`: `get abilities()` builds 4 new objects on every access. It is called per frame by the HUD cooldown loop, `canCast`, the bots (several times
  per think) and `cast`. Cache per hull in `setHull`.

---------------------------------------------------------------------------------------------------

## Checked and found fine (for the record)
- Right-drag orbit vs right-click command: command is issued on release only if the pointer moved less than 6 px; aiming right-click cancels without a command.
- Skill icon clicks: self/auto skills fire instantly, aimed skills use `smartAim`; cooldown is only consumed on a successful `cast`.
- Cooldown / gold / XP / respawn / age-up: no division by zero found (`cdMax >= 0.65*cd`, `shareXp` guards empty `near`, `findPath` guards unreachable goals).
- Array mutation during iteration: the combat timer and projectile loops iterate backwards; `G.creeps` / `G.units` are only spliced after the visual pass.
- Audio: voices are pruned and disconnected, per-sound and global voice caps hold, `setSubmerged(false)` is reset on new match and at `endMatch`.
