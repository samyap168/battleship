"""Port of makeHull() from src/render/models/shipModels.js: the same hull lines, at high resolution, for Blender."""
import math
import numpy as np

def clamp(x, a, b): return max(a, min(b, x))
def lerp(a, b, t): return a + (b - a) * t
def sst(a, b, x):
    t = clamp((x - a) / (b - a), 0.0, 1.0)
    return t * t * (3 - 2 * t)

class Hull:
    def __init__(self, L=14.6, **o):
        s = dict(L=L, B=L / 4.4, D=L * 0.09, F=L * 0.1, bulwark=L * 0.035, rail=0.1 * (L / 14.6), sheerF=L * 0.06, sheerA=L * 0.07,
                 transom=0.62, bowP=2.1, sternP=2.8, uMax=0.42, rake=0.25, rakeCurve=0.9, overhang=0.28,
                 flareBow=0.15, flareMid=-0.1, nMid=2.6, nBow=1.5, nStern=2.2, forefoot=0.1, sternRise=0.2, ram=0.0, camber=0.06)
        s.update(o); self.s = s
        self.L, self.B, self.D, self.F = s['L'], s['B'], s['D'], s['F']
        self.Ht1 = self.topY(1.0); self.Ht0 = self.topY(0.0)

    def topY(self, u):
        s = self.s
        return self.F + s['bulwark'] + s['sheerF'] * sst(0.45, 1, u) ** 2 + s['sheerA'] * sst(0.4, 0, u) ** 2
    def deckY(self, u): return self.topY(u) - self.s['bulwark']
    def plan(self, u):
        s = self.s
        if u >= s['uMax']:
            t = (u - s['uMax']) / (1 - s['uMax']); return max(0.0, 1 - t ** s['bowP'])
        t = (s['uMax'] - u) / s['uMax']; return 1 - (1 - s['transom']) * t ** s['sternP']
    def halfWL(self, u): return (self.B / 2) * self.plan(u)
    def flare(self, u): return self.s['flareMid'] + self.s['flareBow'] * sst(0.45, 1, u)
    def draft(self, u):
        s = self.s; return self.D * (1 - s['forefoot'] * sst(0.7, 1, u)) * (1 - s['sternRise'] * sst(0.25, 0, u))
    def nexp(self, u):
        s = self.s
        return lerp(s['nMid'], s['nBow'], sst(0.5, 1, u)) if u > 0.5 else lerp(s['nMid'], s['nStern'], sst(0.4, 0, u))
    def zBow(self, y):
        s = self.s
        return self.L / 2 - s['rake'] * (self.Ht1 - y) - s['rakeCurve'] * max(0.0, self.Ht1 - y) ** 2 / (self.Ht1 + self.D) + s['ram'] * math.exp(-(((y + 0.45 * self.D) / (0.3 * self.D)) ** 2))
    def zStern(self, y): return -self.L / 2 + self.s['overhang'] * (self.Ht0 - y)
    def zAt(self, u, y): return lerp(self.zStern(y), self.zBow(y), u)
    def xUp(self, u, y):
        return self.halfWL(u) * (1 + self.flare(u) * clamp(y / self.topY(u), 0, 1) ** 1.5)
    def pLow(self, u, th):
        e = 2 / self.nexp(u)
        x = self.halfWL(u) * math.sin(th) ** e
        y = -self.draft(u) * max(0.0, math.cos(th)) ** e
        return (x, y, self.zAt(u, y))
    def pUp(self, u, y): return (self.xUp(u, y), y, self.zAt(u, y))
    def xTop(self, u): return self.xUp(u, self.topY(u))
    def deckHalf(self, u):
        s = self.s
        return max(0.0, min(self.xTop(u), self.xUp(u, self.deckY(u))) - s['rail'])
