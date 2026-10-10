"""Blender (bpy) build of the frigate hull shell: the game's own hull lines at high resolution, with real planking and
weathering maps, wales and a rub rail. Rigging, sails, cannons and the quarterdeck stay procedural in the game.
Run: python build_frigate.py OUT.glb"""
import sys, math, os
import numpy as np
import bpy, bmesh
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hulllib import Hull, lerp, clamp
import textures as T

OUT = sys.argv[1] if len(sys.argv) > 1 else 'frigate_hull.glb'
HERE = os.path.dirname(os.path.abspath(__file__))
for f in ('hull_albedo.png', 'hull_normal.png', 'deck_albedo.png', 'deck_normal.png'):
    if not os.path.exists(os.path.join(HERE, f)): T.make_hull(os.path.join(HERE, 'hull_albedo.png'), os.path.join(HERE, 'hull_normal.png')); T.make_deck(os.path.join(HERE, 'deck_albedo.png'), os.path.join(HERE, 'deck_normal.png')); break

hull = Hull(14.6)
L = hull.L
YMIN, YMAX = T.YMIN, T.YMAX
NU = 180
us = [0.45 * (i / NU) + 0.55 * (0.5 - 0.5 * math.cos(math.pi * i / NU)) for i in range(NU + 1)]

def to_bl(p): return (p[0], -p[2], p[1])          # game (x, y up, z forward) -> Blender Z-up
def uv_hull(u, y): return (u, (y - YMIN) / (YMAX - YMIN))

class Piece:
    def __init__(self): self.v, self.uv, self.f = [], [], []
    def add_grid(self, pts, uvs, flip=False, mirror=False):
        R, C = len(pts), len(pts[0]); base = len(self.v)
        for r in range(R):
            for c in range(C):
                p = pts[r][c]; self.v.append(to_bl((-p[0] if mirror else p[0], p[1], p[2]))); self.uv.append(uvs[r][c])
        for r in range(R - 1):
            for c in range(C - 1):
                a = base + r * C + c; b = a + 1; d = a + C; e = d + 1
                quad = (a, e, b), (a, d, e)
                self.f.extend([q[::-1] for q in quad] if (flip != mirror) else quad)

def skin_pts(rows_y, fn_low=None, lowrows=None):
    pass

def side_grid(row_defs, fn):
    """row_defs: list of callables u -> parameter q; fn(u, q) -> point"""
    pts, uvs = [], []
    for rd in row_defs:
        prow, urow = [], []
        for u in us:
            q = rd(u); p = fn(u, q); prow.append(p); urow.append(uv_hull(u, p[1]))
        pts.append(prow); uvs.append(urow)
    return pts, uvs

def rows_between(y0, y1, step=0.12):
    a0 = y0(0.5) if callable(y0) else y0; a1 = y1(0.5) if callable(y1) else y1
    n = max(2, int(math.ceil(abs(a1 - a0) / step)) + 1)
    return [(lambda u, t=i / (n - 1): lerp(y0(u) if callable(y0) else y0, y1(u) if callable(y1) else y1, t)) for i in range(n)]

def pup(u, y): return hull.pUp(u, y)
def plow(u, th): return hull.pLow(u, th)
top = hull.topY
BR = [0.0, 0.175, 0.555, 1.095, 1.197]

pieces = {'hull': Piece(), 'team': Piece(), 'deck': Piece(), 'trim': Piece()}

# --- underwater body (copper) : th from 0 (keel) to pi/2 (waterline)
NLOW = 28
low_rows = [(lambda u, th=(j / NLOW) * math.pi / 2: th) for j in range(NLOW + 1)]
pts, uvs = side_grid(low_rows, plow)
for mirror in (False, True): pieces['hull'].add_grid(pts, uvs, flip=False, mirror=mirror)
# --- topsides in zones
def zone(piece, y0, y1):
    rows = rows_between(y0, y1)
    pts, uvs = side_grid(rows, pup)
    for mirror in (False, True): pieces[piece].add_grid(pts, uvs, flip=True, mirror=mirror)
zone('hull', 0.0, BR[2]); zone('team', BR[2], BR[3]); zone('hull', BR[3], lambda u: top(u))

# --- deck
cols = [-1, -0.5, 0, 0.5, 1]
dpts, duvs = [], []
for u in us:
    h = hull.deckHalf(u); row, urow = [], []
    for c in cols:
        y = hull.deckY(u) + hull.s['camber'] * (1 - c * c); z = hull.zAt(u, hull.deckY(u))
        row.append((c * h, y, z)); urow.append((z * 0.5, c * h * 0.5))
    dpts.append(row); duvs.append(urow)
pieces['deck'].add_grid(dpts, duvs, flip=False)

# --- rail cap and inner bulwark
cap, inner, capuv, inneruv = [], [], [], []
for u in us:
    yt, yd = top(u), hull.deckY(u) - 0.02
    xo = hull.xTop(u); xi = max(0, xo - hull.s['rail']); xd = max(0.0, hull.deckHalf(u))
    zt, zd = hull.zAt(u, yt), hull.zAt(u, hull.deckY(u))
    cap.append(((xo, yt, zt), (xi, yt, zt))); inner.append(((xi, yt, zt), (xd, yd, zd)))
    capuv.append((uv_hull(u, yt), uv_hull(u, yt - 0.01))); inneruv.append((uv_hull(u, yt), uv_hull(u, yd)))
def tr(a): return [[p[0] for p in a], [p[1] for p in a]]
for mirror in (False, True):
    pieces['hull'].add_grid(tr(cap), tr(capuv), flip=False, mirror=mirror)
    pieces['hull'].add_grid(tr(inner), tr(inneruv), flip=True, mirror=mirror)

# --- wales and rub rail: half-round mouldings that stand proud of the planking
def normal_at(u, y):
    du, dy = 1e-3, 1e-3
    a = np.array(pup(min(1, u + du), y)) - np.array(pup(max(0, u - du), y)); b = np.array(pup(u, y + dy)) - np.array(pup(u, y - dy))
    n = np.cross(b, a); l = np.linalg.norm(n)
    if l < 1e-9: return np.array([1.0, 0, 0])
    n /= l
    return n if n[0] >= 0 else -n
def moulding(y_of_u, half=0.05, bump=0.04):
    prof = [(-half, 0.0), (-half * 0.6, bump * 0.65), (0.0, bump), (half * 0.6, bump * 0.65), (half, 0.0)]
    pts, uvs = [], []
    for dy, off in prof:
        row, urow = [], []
        for u in us:
            y = y_of_u(u) + dy; p = np.array(pup(u, y)) + normal_at(u, y) * off
            row.append(tuple(p)); urow.append((u, 0.5))
        pts.append(row); uvs.append(urow)
    return pts, uvs
for yfn, hf in ((lambda u: BR[2], 0.055), (lambda u: BR[3], 0.07), (lambda u: top(u) - 0.55 * hull.s['bulwark'], 0.05), (lambda u: 0.02, 0.04)):
    p_, u_ = moulding(yfn, hf)
    for mirror in (False, True): pieces['trim'].add_grid(p_, u_, flip=True, mirror=mirror)

# --- transom (flat stern plate)
outline = [hull.pLow(0.0, (j / NLOW) * math.pi / 2) for j in range(NLOW + 1)] + [hull.pUp(0.0, (r / 8) * top(0.0)) for r in range(1, 9)]
loop = outline + [(-outline[-1][0], top(0.0), outline[-1][2])] + [(-p[0], p[1], p[2]) for p in reversed(outline[1:-1])]
# triangulate with a fan from the centre of the loop (the plate is convex enough at this resolution)
cx = 0.0; cy = np.mean([p[1] for p in loop]); cz = np.mean([p[2] for p in loop])
tp = pieces['hull']; base = len(tp.v)
tp.v.append(to_bl((cx, cy, cz))); tp.uv.append((0.5 + cx / L * 1.0 * 0 + 0.5 * 0, (cy - YMIN) / (YMAX - YMIN)))
tp.uv[-1] = (0.15, (cy - YMIN) / (YMAX - YMIN))
for p in loop:
    tp.v.append(to_bl(p)); tp.uv.append((0.02 + (p[0] / L) * 1.0 + 0.10, (p[1] - YMIN) / (YMAX - YMIN)))
n = len(loop)
for i in range(n):
    tp.f.append((base, base + 1 + i, base + 1 + (i + 1) % n))   # stern faces -Z (game): winding checked below

# --- build Blender objects
bpy.ops.wm.read_factory_settings(use_empty=True)
def img(name, fname, srgb):
    im = bpy.data.images.load(os.path.join(HERE, fname)); im.name = name
    im.colorspace_settings.name = 'sRGB' if srgb else 'Non-Color'; return im
def make_mat(name, albedo=None, normal=None, color=(1, 1, 1, 1), rough=0.7, metal=0.0, uvscale=None):
    m = bpy.data.materials.new(name); m.use_nodes = True
    bsdf = m.node_tree.nodes['Principled BSDF']; bsdf.inputs['Roughness'].default_value = rough; bsdf.inputs['Metallic'].default_value = metal
    bsdf.inputs['Base Color'].default_value = color
    if albedo:
        t = m.node_tree.nodes.new('ShaderNodeTexImage'); t.image = img(name + '_a', albedo, True); m.node_tree.links.new(t.outputs['Color'], bsdf.inputs['Base Color'])
    if normal:
        t2 = m.node_tree.nodes.new('ShaderNodeTexImage'); t2.image = img(name + '_n', normal, False)
        nm = m.node_tree.nodes.new('ShaderNodeNormalMap'); nm.inputs['Strength'].default_value = 1.0
        m.node_tree.links.new(t2.outputs['Color'], nm.inputs['Color']); m.node_tree.links.new(nm.outputs['Normal'], bsdf.inputs['Normal'])
    return m
mats = {
    'hull': make_mat('hull', 'hull_albedo.png', 'hull_normal.png', rough=0.74),
    'team': make_mat('team', 'hull_albedo.png', 'hull_normal.png', rough=0.62),
    'deck': make_mat('deck', 'deck_albedo.png', 'deck_normal.png', rough=0.82),
    'trim': make_mat('trim', None, None, color=(0.045, 0.032, 0.026, 1), rough=0.55),
}
for name, pc in pieces.items():
    if not pc.f: continue
    me = bpy.data.meshes.new(name); me.from_pydata(pc.v, [], pc.f); me.update()
    uvl = me.uv_layers.new(name='UVMap')
    for poly in me.polygons:
        for li, vi in zip(poly.loop_indices, poly.vertices): uvl.data[li].uv = pc.uv[vi]
    ob = bpy.data.objects.new(name, me); bpy.context.scene.collection.objects.link(ob)
    # orient every face outward: flip a polygon if its normal points toward the object's own centre line
    bm = bmesh.new(); bm.from_mesh(me); bm.normal_update()
    centre = np.array([0.0, 0.0, 0.9])   # roughly the hull's inside (Blender coords: x, -z, y)
    if name != 'deck':
        for f in bm.faces:
            c = np.array(f.calc_center_median()); nrm = np.array(f.normal)
            if np.dot(nrm, c - np.array([0.0, c[1], 0.9 if c[2] > 0.5 else 0.0])) < 0 and name != 'trim':
                f.normal_flip()
    else:
        for f in bm.faces:
            if f.normal[2] < 0: f.normal_flip()
    bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = True
    me.materials.append(mats[name])
bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', export_yup=True, export_image_format='JPEG', export_jpeg_quality=88, export_apply=True)
print('exported', OUT, os.path.getsize(OUT) // 1024, 'KB', {k: len(v.f) for k, v in pieces.items()})
