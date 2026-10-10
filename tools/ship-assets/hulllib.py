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
        if s['bulwark'] <= 0: return max(0.0, self.xTop(u))     # no bulwark: the deck runs out to the edge (makeHull: deckInset 0)
        return max(0.0, min(self.xTop(u), self.xUp(u, self.deckY(u))) - s['rail'])


# ---------------------------------------------------------------- hero hull parameter sets
# The options each builder in shipModels.js passes to makeHull (HULL_DEFAULTS filled in), so the Blender hull has the
# game's exact lines. If a builder's makeHull options change, change them here and rebuild.
JS_DEFAULTS = dict(L=20, B=4, D=1.5, F=1.6, bulwark=0.1, rail=0.08, sheerF=0.6, sheerA=0.1, transom=0.4, bowP=1.7, sternP=2.2, uMax=0.45,
                   rake=0.2, rakeCurve=0, overhang=0.3, flareBow=0.2, flareMid=0, nMid=3.5, nBow=1.5, nStern=2.5, forefoot=0.35,
                   sternRise=0.3, ram=0, camber=0.04)

def js_hull(**o):
    s = dict(JS_DEFAULTS); s.update(o)
    return Hull(**s)

def hexrgb(h): return ((h >> 16 & 255) / 255.0, (h >> 8 & 255) / 255.0, (h & 255) / 255.0)

# band boundaries: ('abs', y) metres above the waterline or ('top', dy) relative to the sheer line; the last band runs to the sheer.
# zones: texture colour bands by physical height (lo, hi, srgb); everything above the last zone is plain hull grey.
STEEL_BOOT = hexrgb(0x1b1d20)
def steel_bands(team=True):
    b = [('abs', 0.28, 'hull'), ('top', -0.5 if team else 0.0, 'hull')]
    if team: b += [('top', -0.2, 'team'), ('top', 0.0, 'hull')]
    return b

HULLS = {
    'ironclad': dict(
        js=dict(L=17.2, B=3.5, D=1.5, F=0.75, bulwark=0.08, rail=0.08, sheerF=0.05, sheerA=0.1, transom=0.35, bowP=1.5, sternP=2.2,
                uMax=0.48, rake=-0.35, overhang=0.35, flareBow=0.05, flareMid=0.02, nMid=3.6, nBow=1.6, nStern=2.4, forefoot=0.05,
                ram=0.9, camber=0.03),
        bands=[('abs', 0.18, 'hull'), ('abs', 0.5, 'hull'), ('top', 0.0, 'team')],
        zones=[(0.0, 0.18, hexrgb(0x202224)), (0.18, 0.5, hexrgb(0x33363a))], grey=(0.40, 0.43, 0.46),
        deck='steel', deckTint=(0.95, 0.98, 1.0), rail=hexrgb(0x2a2c2f), railTeam=True, seed=11, strake=0.9, plate=3.4),
    'dreadnought': dict(
        js=dict(L=25.6, B=4.6, D=1.8, F=1.7, bulwark=0.12, rail=0.06, sheerF=0.7, sheerA=0.1, transom=0.3, bowP=1.6, sternP=2.3, uMax=0.47,
                rake=0.04, overhang=0.55, flareBow=0.22, flareMid=0.0, nMid=4.2, nBow=1.4, nStern=2.4, forefoot=0.12),
        bands=steel_bands(), zones=[(0.0, 0.28, STEEL_BOOT)], grey=(0.50, 0.55, 0.60),
        deck='teak', rail=hexrgb(0x7a838c), seed=23, strake=1.1, plate=4.0),
    'torpedo': dict(
        js=dict(L=21.4, B=3.5, D=1.2, F=1.25, bulwark=0.1, rail=0.05, sheerF=0.9, sheerA=0.05, transom=0.55, bowP=1.45, sternP=2.0, uMax=0.5,
                rake=0.75, rakeCurve=0.4, overhang=0.12, flareBow=0.4, flareMid=0.02, nMid=3.4, nBow=1.3, nStern=3, forefoot=0.3, sternRise=0.25),
        bands=steel_bands(), zones=[(0.0, 0.28, STEEL_BOOT)], grey=(0.52, 0.57, 0.63),
        deck='steel', deckTint=(0.98, 1.0, 1.0), rail=hexrgb(0x5e6872), seed=37, strake=0.9, plate=3.2),
    'battleship': dict(
        js=dict(L=29.4, B=5.3, D=2.1, F=1.9, bulwark=0.12, rail=0.06, sheerF=0.9, sheerA=0.15, transom=0.4, bowP=1.35, sternP=2.1, uMax=0.5,
                rake=0.35, rakeCurve=0.25, overhang=0.25, flareBow=0.42, flareMid=0.0, nMid=4.5, nBow=1.35, nStern=2.6, forefoot=0.18),
        bands=steel_bands(), zones=[(0.0, 0.28, STEEL_BOOT)], grey=(0.50, 0.55, 0.60),
        deck='teak', rail=hexrgb(0x7a838c), seed=41, strake=1.2, plate=4.4),
    'carrier': dict(
        js=dict(L=32.0, B=4.9, D=2.0, F=2.3, bulwark=0.0, sheerF=0.35, sheerA=0.1, transom=0.62, bowP=1.5, sternP=2.2, uMax=0.5,
                rake=0.45, rakeCurve=0.3, overhang=0.55, flareBow=0.45, flareMid=0.05, nMid=4.2, nBow=1.3, nStern=3, forefoot=0.18, camber=0),
        bands=steel_bands(team=False), zones=[(0.0, 0.28, STEEL_BOOT)], grey=(0.52, 0.57, 0.62),
        deck='steel', deckTint=(1.0, 1.0, 1.0), rail=hexrgb(0x7a838c), seed=53, strake=1.2, plate=4.6),
}
