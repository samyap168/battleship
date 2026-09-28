# Balance Sim 1: 48 bot matches, per-hull exposure accounting

Harness: `tests/balance.mjs` (three parallel batches of 16, alternating which team the autopilot player is on), aggregated by `tests/balance.py`.
Unlike earlier sims, kills, deaths and damage are credited to the hull a captain held **at that moment**, and rates are per minute spent in that hull.
Final-hull snapshots (Reviews 1-5) left Age II-III hulls with almost no data, because every captain ages past them.

```
matches 48 team wins {1: 23, 0: 25} (team1 47.9%, 95% CI +/-14.1%) ends {'citadel': 38, 'time': 10}
player-team wins 19/48
kill leader wins 39/46
kill lead >=15 converts 13/14
hull          hull-min kills/min deaths/min  dmg/min   K/D
ironclad        1071.8     0.438      0.757     1411  0.58
dreadnought      647.0     0.666      0.507     3007  1.31
torpedo          564.5     0.501      0.882     2752  0.57
frigate          531.3     0.307      0.418      495  0.73
carrier          396.3     0.987      0.611     5441  1.62
battleship       320.0     0.653      0.344     5285  1.90
mothership        51.1     1.526      0.607     8977  2.52
arsenal           49.4     0.951      0.486    10248  1.96
```

## Findings

- **Team fairness is fixed.** 25-23 (team 1 47.9%, 95% CI +/-14%). The coin-flip update order removed the old skew.
- **Kills convert.** The kill leader wins 39/46; a lead of 15+ kills converts 13/14.
- **Endings.** 38 citadel falls, 10 timeouts (21%).
- **Age III gap.** At similar damage per minute (2752 vs 3007), the Torpedo Cruiser dies 74% more often than the Dreadnought (0.88 vs 0.51 deaths/min; K/D 0.57 vs 1.31). Its effective HP was 72% of the Dreadnought's. Change: hp 1950 -> 2150, armour 0.12 -> 0.15 (+14% effective HP). It stays the fragile, fast assassin.
- **Age IV** is healthy. The Carrier trades survivability for kills (0.99 kills/min, K/D 1.62); the Battleship is the reverse (0.65, 1.90).
- **Age V** has only about 50 hull-minutes each, too little to tune on. The Mothership leads on kills (1.53 vs 0.95/min) at similar damage. Watch it next batch.
- **Autopilot player's team** won 19/48 (p about 0.07). The autopilot slot is slightly weaker than a bot. It only matters for showreels, since a human replaces it in play.
