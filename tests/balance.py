import json, sys, collections, math
rows=[]
for f in sys.argv[1:]:
    for line in open(f):
        line=line.strip()
        if line.startswith('{') and 'runTeamParam' in line: rows.append(json.loads(line))
wins=collections.Counter(r['winner'] for r in rows); ends=collections.Counter(r['endReason'] for r in rows)
n=len(rows); w1=wins[1]
print(f"matches {n} team wins {dict(wins)} (team1 {w1/n:.1%}, 95% CI +/-{1.96*math.sqrt(0.25/n):.1%}) ends {dict(ends)}")
pw=sum(1 for r in rows if r['winner']==r['playerTeam']); print(f"player-team wins {pw}/{n}")
lead=[r for r in rows if r['kills'][0]!=r['kills'][1]]
conv=sum(1 for r in lead if (r['kills'][1]>r['kills'][0])==(r['winner']==1))
print(f"kill leader wins {conv}/{len(lead)}")
big=[r for r in lead if abs(r['kills'][0]-r['kills'][1])>=15]
print(f"kill lead >=15 converts {sum(1 for r in big if (r['kills'][1]>r['kills'][0])==(r['winner']==1))}/{len(big)}")
T=collections.defaultdict(lambda: [0,0,0,0])
for r in rows:
    for k,v in r.get('HX',{}).items():
        a=T[k]; a[0]+=v['secs']; a[1]+=v['kills']; a[2]+=v['deaths']; a[3]+=v['dmg']
print(f"{'hull':12s} {'hull-min':>9s} {'kills/min':>9s} {'deaths/min':>10s} {'dmg/min':>8s} {'K/D':>5s}")
for k,(s,ki,de,dm) in sorted(T.items(), key=lambda x:-x[1][0]):
    m=max(s/60,1e-9); print(f"{k:12s} {m:9.1f} {ki/m:9.3f} {de/m:10.3f} {dm/m:8.0f} {ki/max(1,de):5.2f}")
