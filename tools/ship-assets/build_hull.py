"""Blender (bpy) build of a steel hero hull shell (ironclad, dreadnought, torpedo, battleship, carrier): the game's own hull
lines (hulllib.HULLS = the makeHull options of the builder) at high resolution, with riveted plating and weathering maps,
a separate tintable 'team' band, a rail/bead 'trim' mesh and the deck. Superstructure, turrets and funnels stay procedural.
Run: python build_hull.py HULL_ID OUT.glb"""
import sys, math, os
import numpy as np
import bpy, bmesh
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from hulllib import js_hull, HULLS, lerp, clamp
import textures_steel as TS
import textures as T

HID = sys.argv[1]
OUT = sys.argv[2] if len(sys.argv) > 2 else HID + '_hull.glb'
CFG = HULLS[HID]
hull = js_hull(**CFG['js'])
L = hull.L
TEX = os.path.join(HERE, '_tex'); os.makedirs(TEX, exist_ok=True)
def tp(name): return os.path.join(TEX, name)

NU = int(os.environ.get('NU', 150))
NLOW = 20
ROWSTEP = 0.2
us = [0.45 * (i / NU) + 0.55 * (0.5 - 0.5 * math.cos(math.pi * i / NU)) for i in range(NU + 1)]
top = hull.topY
YMIN = -hull.D - 0.08
YMAX = max(top(u) for u in us) + 0.08
# arc length of the topside outline (a mid-height waterline) along the hull: the texture's U axis, in metres
_yr = 0.35 * hull.F
_pts = np.array([[hull.pUp(u, _yr)[0], hull.pUp(u, _yr)[2]] for u in np.linspace(0, 1, 800)])
_seg = np.r_[0, np.cumsum(np.hypot(*np.diff(_pts, axis=0).T))]
STOT = float(_seg[-1])
def arc(u): return float(np.interp(u, np.linspace(0, 1, 800), _seg))
def uv_hull(u, y): return (arc(u) / STOT, (y - YMIN) / (YMAX - YMIN))
def uv_plate(u, y): return (arc(u) / 8.0, y / 4.0)

# ---------------------------------------------------------------- textures
W_, H_ = TS.make_hull(tp(HID + '_hull_a.png'), tp(HID + '_hull_n.png'), S=STOT, ymin=YMIN, ymax=YMAX, zones=CFG['zones'], grey=CFG['grey'], seed=CFG['seed'], strake=CFG['strake'], plate=CFG['plate'])
if not os.path.exists(tp('plate_a.png')): TS.make_plate_tile(tp('plate_a.png'), tp('plate_n.png'))
if CFG['deck'] == 'steel':
    if not os.path.exists(tp('steeldeck_a.png')): TS.make_steel_deck(tp('steeldeck_a.png'), tp('steeldeck_n.png'))
    DECK = ('steeldeck_a.png', 'steeldeck_n.png', 0.78)
else:
    if not os.path.exists(tp('teak_a.png')): T.make_deck(tp('teak_a.png'), tp('teak_n.png'), base=(0.50, 0.43, 0.34))
    DECK = ('teak_a.png', 'teak_n.png', 0.8)

def to_bl(p): return (p[0], -p[2], p[1])          # game (x, y up, z forward) -> Blender Z-up

class Piece:
    def __init__(self): self.v, self.uv, self.f, self.k = [], [], [], []
    def add_grid(self, pts, uvs, flip=False, mirror=False, kind='out'):
        R, C = len(pts), len(pts[0]); base = len(self.v)
        for r in range(R):
            for c in range(C):
                p = pts[r][c]; self.v.append(to_bl((-p[0] if mirror else p[0], p[1], p[2]))); self.uv.append(uvs[r][c])
        for r in range(R - 1):
            for c in range(C - 1):
                a = base + r * C + c; b = a + 1; d = a + C; e = d + 1
                quad = (a, e, b), (a, d, e)
                self.f.extend([q[::-1] for q in quad] if (flip != mirror) else quad); self.k.extend([kind] * 2)

def orient(pc):
    """Wind every face so its normal points where its kind says (out of the hull, up, or in towards the centre line)."""
    V = np.array(pc.v, float)
    by0, by1 = V[:, 1].min() * 0.85, V[:, 1].max() * 0.85
    for i, (f, kind) in enumerate(zip(pc.f, pc.k)):
        a, b, c = V[f[0]], V[f[1]], V[f[2]]
        n = np.cross(b - a, c - a); ctr = (a + b + c) / 3
        if np.linalg.norm(n) < 1e-14: continue
        if kind == 'out': want = ctr - np.array([0.0, clamp(ctr[1], by0, by1), 0.4])
        elif kind == 'up': want = np.array([0.0, 0.0, 1.0])
        else: want = np.array([-math.copysign(1.0, ctr[0] if abs(ctr[0]) > 1e-6 else 1.0), 0.0, 0.0])
        if np.dot(n, want) < 0: pc.f[i] = f[::-1]

def side_grid(row_defs, fn, uvf=uv_hull):
    pts, uvs = [], []
    for rd in row_defs:
        prow, urow = [], []
        for u in us:
            q = rd(u); p = fn(u, q); prow.append(p); urow.append(uvf(u, p[1]))
        pts.append(prow); uvs.append(urow)
    return pts, uvs

def rows_between(y0, y1, step=ROWSTEP):
    a0 = y0(0.5); a1 = y1(0.5)
    n = max(2, int(math.ceil(abs(a1 - a0) / step)) + 1)
    return [(lambda u, t=i / (n - 1): lerp(y0(u), y1(u), t)) for i in range(n)]

def pup(u, y): return hull.pUp(u, y)
def plow(u, th): return hull.pLow(u, th)
def band_y(b):
    kind, v = b[0], b[1]
    return (lambda u: min(v, top(u))) if kind == 'abs' else (lambda u: top(u) + v)

pieces = {'hull': Piece(), 'team': Piece(), 'deck': Piece(), 'trim': Piece()}

# ---------------------------------------------------------------- underwater body
low_rows = [(lambda u, th=(j / NLOW) * math.pi / 2: th) for j in range(NLOW + 1)]
pts, uvs = side_grid(low_rows, plow)
for mirror in (False, True): pieces['hull'].add_grid(pts, uvs, mirror=mirror)

# ---------------------------------------------------------------- topsides in bands (the same boundaries the builder uses)
prev = lambda u: 0.0
beads = []
bands = CFG['bands']
for bi, b in enumerate(bands):
    to = (lambda u: top(u)) if bi == len(bands) - 1 else band_y(b)
    rows = rows_between(prev, to)
    pts, uvs = side_grid(rows, pup, uv_plate if b[2] == 'team' else uv_hull)
    for mirror in (False, True): pieces[b[2]].add_grid(pts, uvs, mirror=mirror)
    if b[2] == 'team':
        beads += [prev, to]
    prev = to

# ---------------------------------------------------------------- deck
cols = [-1, -0.5, 0, 0.5, 1]
dpts, duvs = [], []
for u in us:
    h = hull.deckHalf(u); row, urow = [], []
    for c in cols:
        y = hull.deckY(u) + hull.s['camber'] * (1 - c * c); z = hull.zAt(u, hull.deckY(u))
        row.append((c * h, y, z)); urow.append((z * 0.5, c * h * 0.5))
    dpts.append(row); duvs.append(urow)
pieces['deck'].add_grid(dpts, duvs, kind='up')

# ---------------------------------------------------------------- rail cap and inner bulwark (trim mesh, rail colour)
if hull.s['bulwark'] > 0:
    cap, inner, capuv, inneruv = [], [], [], []
    for u in us:
        yt, yd = top(u), hull.deckY(u) - 0.02
        xo = hull.xTop(u); xi = max(0, xo - hull.s['rail']); xd = max(0.0, hull.deckHalf(u))
        zt, zd = hull.zAt(u, yt), hull.zAt(u, hull.deckY(u))
        cap.append(((xo, yt, zt), (xi, yt, zt))); inner.append(((xi, yt, zt), (xd, yd, zd)))
        s_ = arc(u) / 8.0
        capuv.append(((s_, yt / 4.0), (s_, yt / 4.0 - 0.02))); inneruv.append(((s_, yt / 4.0), (s_, yd / 4.0)))
    tr = lambda a: [[p[0] for p in a], [p[1] for p in a]]
    rp = 'team' if CFG.get('railTeam') else 'trim'      # the ironclad's rail is built from its team band material
    for mirror in (False, True):
        pieces[rp].add_grid(tr(cap), tr(capuv), mirror=mirror, kind='up')
        pieces[rp].add_grid(tr(inner), tr(inneruv), mirror=mirror, kind='in')

# ---------------------------------------------------------------- weld beads along the team band edges
def normal_at(u, y):
    du, dy = 1e-3, 1e-3
    a = np.array(pup(min(1, u + du), y)) - np.array(pup(max(0, u - du), y)); b = np.array(pup(u, y + dy)) - np.array(pup(u, y - dy))
    n = np.cross(b, a); l = np.linalg.norm(n)
    if l < 1e-9: return np.array([1.0, 0, 0])
    n /= l
    return n if n[0] >= 0 else -n
def moulding(y_of_u, half=0.02, bump=0.02):
    prof = [(-half, 0.0), (-half * 0.6, bump * 0.65), (0.0, bump), (half * 0.6, bump * 0.65), (half, 0.0)]
    pts, uvs = [], []
    for dy, off in prof:
        row, urow = [], []
        for u in us:
            y = y_of_u(u) + dy; p = np.array(pup(u, y)) + normal_at(u, y) * off
            row.append(tuple(p)); urow.append((arc(u) / 8.0, 0.5))
        pts.append(row); uvs.append(urow)
    return pts, uvs
for yfn in beads:
    if yfn(0.5) < 0.05: continue
    p_, u_ = moulding(lambda u, f=yfn: min(f(u), top(u) - 0.02))
    for mirror in (False, True): pieces['trim'].add_grid(p_, u_, mirror=mirror)

# ---------------------------------------------------------------- transom (flat stern plate), triangulated as a fan
outline = [hull.pLow(0.0, (j / NLOW) * math.pi / 2) for j in range(NLOW + 1)] + [hull.pUp(0.0, (r / 8) * top(0.0)) for r in range(1, 9)]
loop = outline + [(-outline[-1][0], top(0.0), outline[-1][2])] + [(-p[0], p[1], p[2]) for p in reversed(outline[1:-1])]
tpc = pieces['hull']; base = len(tpc.v)
cy = float(np.mean([p[1] for p in loop])); cz = float(np.mean([p[2] for p in loop]))
tpc.v.append(to_bl((0.0, cy, cz))); tpc.uv.append((0.5, (cy - YMIN) / (YMAX - YMIN)))
for p in loop:
    tpc.v.append(to_bl(p)); tpc.uv.append((0.5 + p[0] / STOT, (p[1] - YMIN) / (YMAX - YMIN)))
n = len(loop)
for i in range(n): tpc.f.append((base, base + 1 + i, base + 1 + (i + 1) % n)); tpc.k.append('out')

for pc in pieces.values():
    if pc.f: orient(pc)

# ---------------------------------------------------------------- Blender objects
bpy.ops.wm.read_factory_settings(use_empty=True)
def img(name, fname, srgb):
    im = bpy.data.images.load(tp(fname)); im.name = name
    im.colorspace_settings.name = 'sRGB' if srgb else 'Non-Color'; return im
def make_mat(name, albedo, normal, color=(1, 1, 1, 1), rough=0.6, metal=0.0, nstrength=1.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    bsdf = m.node_tree.nodes['Principled BSDF']; bsdf.inputs['Roughness'].default_value = rough; bsdf.inputs['Metallic'].default_value = metal
    bsdf.inputs['Base Color'].default_value = color
    nt = m.node_tree
    if albedo:
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = img(albedo, albedo, True)
        if color != (1, 1, 1, 1):    # tint: texture x colour factor (exports as baseColorFactor)
            mix = nt.nodes.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.blend_type = 'MULTIPLY'; mix.inputs['Factor'].default_value = 1.0
            nt.links.new(t.outputs['Color'], mix.inputs['A']); mix.inputs['B'].default_value = color; nt.links.new(mix.outputs['Result'], bsdf.inputs['Base Color'])
        else: nt.links.new(t.outputs['Color'], bsdf.inputs['Base Color'])
    if normal:
        t2 = nt.nodes.new('ShaderNodeTexImage'); t2.image = img(normal, normal, False)
        nm = nt.nodes.new('ShaderNodeNormalMap'); nm.inputs['Strength'].default_value = nstrength
        nt.links.new(t2.outputs['Color'], nm.inputs['Color']); nt.links.new(nm.outputs['Normal'], bsdf.inputs['Normal'])
    return m
rc = tuple(min(1.0, c * 1.3) for c in CFG['rail'])
dt = CFG.get('deckTint', (1, 1, 1))
mats = {
    'hull': make_mat('hull', HID + '_hull_a.png', HID + '_hull_n.png', rough=0.62, metal=0.25),
    'team': make_mat('team', 'plate_a.png', 'plate_n.png', rough=0.45, metal=0.2),
    'deck': make_mat('deck', DECK[0], DECK[1], color=(dt[0], dt[1], dt[2], 1) if CFG['deck'] == 'steel' else (1, 1, 1, 1), rough=DECK[2], metal=0.15 if CFG['deck'] == 'steel' else 0.0),
    'trim': make_mat('trim', 'plate_a.png', 'plate_n.png', color=(rc[0], rc[1], rc[2], 1), rough=0.55, metal=0.25),
}
for name, pc in pieces.items():
    if not pc.f: continue
    me = bpy.data.meshes.new(name); me.from_pydata(pc.v, [], pc.f); me.update()
    uvl = me.uv_layers.new(name='UVMap')
    for poly in me.polygons:
        for li, vi in zip(poly.loop_indices, poly.vertices): uvl.data[li].uv = pc.uv[vi]
    bm = bmesh.new(); bm.from_mesh(me)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bm.normal_update()
    for e in bm.edges:
        e.smooth = not (len(e.link_faces) == 2 and e.calc_face_angle(0.0) > math.radians(42))
    for f in bm.faces: f.smooth = True
    bm.to_mesh(me); bm.free()
    ob = bpy.data.objects.new(name, me); bpy.context.scene.collection.objects.link(ob)
    me.materials.append(mats[name])
bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', export_yup=True, export_image_format='JPEG', export_jpeg_quality=int(os.environ.get('JQ', 84)), export_apply=True)
print('exported', OUT, os.path.getsize(OUT) // 1024, 'KB', {k: len(v.f) for k, v in pieces.items()}, 'tex', W_, H_, 'STOT', round(STOT, 2))
