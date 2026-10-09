---
name: polish
description: End-to-end polish pass for Armada Ascension after a feature or change. Runs the regression and multiplayer tests, then fresh-eyes audits (determinism, controls, visuals, audio, compatibility, mobile, performance), fixes what is verified, and pushes. Use when the user says polish, QA, end-to-end test, or "iterate for bugs".
---

# Polish pass (Armada Ascension)

Goal: after a new feature or change, find and fix bugs and rough edges in gameplay, controls, VFX, 3D assets, environment, performance and load handling, and leave the repo green and pushed. This is a bounded loop with an exit report, not an open-ended chase for "10/10": never claim a perfect score; report what was verified and what could not be checked here.

## 0. Read the learnings
Read `.claude/skills/polish/learnings.md` first. Run the checks it lists, skip what it marks as unverifiable here, and spend the most audit effort where its yield log shows the best return.

## 0a. Question the goal, then run it fast
- State a measurable target for this run in one line (for example "no new verified finding in a full audit round, all gates green, a new player sails and fires within 60 s"), and write it at the top of the report. Without one, stop after the round cap.
- Cycle time is the budget: run `npm run test:smoke` (about 30 s) after every edit, and the full gate (step 1) once per round. CI (`.github/workflows/ci.yml`) runs smoke, determinism, two-window multiplayer and the full match on every push: check its result (`gh api repos/<owner>/<repo>/actions/runs`) and treat a red CI as the first thing to fix.
- Delete before you add: if a bug comes from a feature that does not earn its place, remove it; if a fix needs a special case, look for the change that makes the whole class impossible.

## 0b. Setup
- Work on the branch the session names; never open a PR unless asked.
- Serve the built game: `npm run build && npx vite preview --port 5173 --host` (background). Test scripts expect http://localhost:5173 (override with `BASE=`).
- Headless Chromium via Playwright with `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`. Test hooks: `window.__aa` (G, cameraDir, ff, step, howto, play, session(), cmd(), simState, settings, R, hud...). End the intro with `cameraDir.intro=0; cameraDir.cine=null`, ~100 `ff(0.05)`, `document.body.classList.remove('cinematic')`.
- Keep scratch scripts and screenshots outside the repo (the session scratchpad).

## 1. Baseline gate (must pass before and after changes)
Run, and fix any failure before going further (a failing run on a stale build means nothing: check `npm run build` succeeded first):
1. `npm run build`
2. `node tests/determinism.mjs` (same seed, different frame patterns: identical hashes)
3. `node tests/mp.mjs` (two windows; add `FULL=1` for a full match with matching result screens)
4. `node tests/mp_resilience.mjs` (corruption healed, disconnect becomes a bot)
5. `node tests/fullmatch.mjs "&autopilot=1"` (single-player full match, no page errors, end screen shown)
6. Real WebRTC: start a local PeerJS server (`npm i peer` in a scratch dir, `PeerServer({port:9000, host:'0.0.0.0'})`), then `NET=peer node tests/mp.mjs` and `NET=peer node tests/mp_many.mjs 5 30`. This caught a bug that LocalTransport hid (PeerJS refuses JSON messages of 16 KB or more; large messages are chunked in `src/net/transport.js`).

## 2. Look at it
Take screenshots (1280x720, plus 1024x640 and a phone 844x390 / 390x844 with `hasTouch,isMobile` and `?touch=1`) of: mid-match fight, each hull, dusk and squall, Leviathan, citadel, menu, lobby, options, end screen, and the touch HUD. Read them with the image viewer and list concrete defects (overlaps, clipped text, z-fighting, banding, odd colours, unreadable HUD). Fix what is real.

## 3. Fresh-eyes audits (parallel subagents, read-only, verified findings only)
Each agent gets one focus, must trace candidates in code, give file:line + reproduction + minimal fix, discard speculation, max 8 findings. Foci that have each found real bugs:
- Determinism: any sim code reachable from `Game.tick` using Math.random/wall-clock/render state; state mutated but missing from `src/net/state.js`; float-math hazards. All gameplay dice must be `srand/srnd/rnd` from `src/core/rng.js`.
- Multiplayer/session: leaks across matches (timers, cinematics, listeners), host/client leave, kicked peers, message size limits.
- Controls and input: layout-independent hotkeys (`e.code`), stuck keys, modals, Esc, wheel, right-click, touch gestures (tap, drag-orbit, pinch, skill drag-aim, portrait double-tap re-centre).
- Rendering robustness: context loss, dt spikes, adaptive resolution, NaN or black frames; draw calls and triangle counts (Low about 50 calls).
- Audio: limiter, voice caps, mute (M), panning follows camera yaw, missing sounds.
- Compatibility: Safari/Firefox/older engines (inputs `user-select`, build target safari15, WebGL2 message).
- Resource leaks: rematch 5x and compare `renderer.info.memory` (geometries/textures/programs must stay flat).
- Data/numeric: config consistency, undefined lookups, hypot=0, empty paths.

## 4. Fix loop
- Fix verified findings only; keep each fix minimal and match the surrounding code style.
- Anything touching the simulation must keep determinism: rerun steps 1.2-1.4 and the WebRTC test.
- Screenshot UI/visual fixes before and after.
- Update `README.md` when behaviour or tests change.

## 4b. Repeat until quiet
After the fixes, rerun step 1 and then steps 2-3 with *different* audit foci or fresh agents. Stop when a full round (screenshots plus all audits) yields no new verified finding, or after 4 rounds, or when the user says stop. Each round must append to a short running list in the final report (round number, findings fixed, tests green). A round that finds nothing is the exit, not a 10/10 claim.

## 5. Ship
- Commit with a clear message and the trailers the session asks for; push to the session branch. If the repo is mirrored to a Pages repo (battleship `main`, deployed by a workflow), mirror it the same way the session did and check the deploy run (`gh api repos/<owner>/<repo>/actions/runs`).
- Finish with a short report: what was fixed, test results (tick counts, resyncs), and what could not be verified here (public PeerJS broker, strict NATs/TURN, real GPU frame times, real Safari/Firefox, real phones, 10 simultaneous humans). Do not declare a perfect score.

## 6. Retrospective (self-update, mandatory)
Before the final report, improve this skill from what just happened:
1. For every bug found, ask which earlier check should have caught it. If none, add a test under `tests/` or a line in a step above (a regression test beats a note).
2. Add or merge one-line lessons into `learnings.md` (evidence attached), promote repeats into checks, delete stale ones, keep it under 80 lines.
3. Append one line to its yield log: rounds, findings fixed per audit focus, and the biggest time sink. Next run, lean on the focus with the best yield and shrink the one that keeps finding nothing.
4. If a step was slow or flaky, fix the script or remove the step (delete before optimising; automate last).
5. Commit these skill changes in their own commit ("polish: learned ...") so the history shows how the skill improved, and mention them in the report.
