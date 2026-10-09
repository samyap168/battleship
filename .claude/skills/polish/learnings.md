# Polish learnings (the skill reads this first and updates it last)

Rules: one line per lesson, newest at the bottom of its section. Each lesson names the evidence (commit, test, or file). A lesson seen twice becomes a check in SKILL.md or a test in tests/; a lesson not useful for 5 runs gets deleted. Keep this file under 80 lines.

## Checks that found real bugs (keep running them)
- Real transport beats mocks: `NET=peer` WebRTC found the PeerJS 16 KB message limit that LocalTransport hid (9a3389c).
- A failed build leaves a stale dist: confirm `npm run build` succeeded before trusting any test (duplicate import, d15122e).
- Hot-path caches keyed by `G.time` desynced peers; key by a version counter instead (95cf183).
- Wall-clock or render state reaching the sim (squall wave amplitude, rig scale, unseeded `Math.random` in `skyStrike`) breaks determinism: grep reachable code from `Game.tick`.
- Audit agents with ONE narrow focus and a "must trace file:line" rule produced real findings in 8 of 9 areas; broad "review everything" agents did not.
- Screenshot the same scene before and after: visual fixes (rust streaks, strata swirl) were only judged correctly by looking.

## Environment limits (do not spend time here)
- Only Chromium; SwiftShader is slow: tests drive `session.update` by hand and skip drawing.
- More than about 5 software-rendered pages crash or starve the sandbox; 10 humans cannot be tested here.
- Public PeerJS broker, TURN/strict NATs, real GPU frame times, Safari/Firefox, real phones: hand off to a human.

## Yield log (one line per run: date, rounds, findings fixed by focus, time sink)
- 2026-10: 9 audit rounds. Highest yield: determinism (3 bugs), controls (7), multiplayer transport (1 critical), audio (7), compatibility (7). Lowest: data/XSS (0 critical).
