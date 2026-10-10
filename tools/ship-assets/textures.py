"""Procedural hull textures for the frigate: planked, tarred and weathered wood, copper sheathing, teak deck.
All maps are generated at metre-true scale from physical coordinates (z along the hull, y up)."""
import numpy as np
from PIL import Image, ImageFilter

rng = np.random.default_rng(7)
W, H = 2048, 512
L = 14.6
YMIN, YMAX = -1.35, 3.05            # V=0 at YMIN (below keel), V=1 at YMAX
PORT_Z = [(-0.28 * L) + (0.56 * L) * i / 5 for i in range(6)]
PORT_Y = 0.057 * L

def noise2(h, w, scale, seed):
    r = np.random.default_rng(seed)
    gh, gw = max(2, int(h / scale) + 2), max(2, int(w / scale) + 2)
    g = r.random((gh, gw)).astype(np.float32)
    im = Image.fromarray((g * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
    return np.asarray(im, np.float32) / 255.0

def fbm(h, w, base, seed, octaves=4):
    out = np.zeros((h, w), np.float32); amp = 1.0; tot = 0
    for o in range(octaves):
        out += amp * noise2(h, w, max(2, base / (2 ** o)), seed + o); tot += amp; amp *= 0.5
    return out / tot

def smooth(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)

def make_hull(path_albedo, path_normal):
    # physical coordinates for every pixel
    U = (np.arange(W) + 0.5) / W
    V = 1 - (np.arange(H) + 0.5) / H           # image row 0 is the top (V=1)
    z = (U - 0.5) * L                          # approx along-hull metres
    y = YMIN + V * (YMAX - YMIN)
    Z, Y = np.meshgrid(z, y)
    n_lo, n_mid, n_hi = fbm(H, W, 40, 1), fbm(H, W, 9, 2), fbm(H, W, 3, 3)

    # --- planking: rows 0.24 m tall, butt joints every ~2.6 m staggered per row
    plank_h = 0.24
    row = np.floor((Y - YMIN) / plank_h)
    in_row = ((Y - YMIN) / plank_h) % 1.0
    stagger = (row * 1.37) % 2.6
    col = np.floor((Z + stagger) / 2.6)
    in_col = ((Z + stagger) / 2.6) % 1.0
    seam_y = 1 - smooth(0.0, 0.09, in_row) * smooth(0.0, 0.09, 1 - in_row)      # horizontal caulked seams
    seam_x = 1 - smooth(0.0, 0.012, in_col) * smooth(0.0, 0.012, 1 - in_col)    # butt joints
    seam = np.clip(seam_y + seam_x, 0, 1)
    plank_id = (row * 131 + col * 17) % 97 / 97.0
    tone = 0.82 + 0.28 * plank_id + 0.18 * (n_mid - 0.5)
    grain = 0.5 + 0.5 * np.sin((Z * 38 + n_lo * 9 + plank_id * 40) * 1.0)
    grain = grain * 0.5 + fbm(H, W, 2, 5, 2) * 0.5
    wood = tone * (0.86 + 0.18 * grain)

    # --- colour zones (y in metres above the waterline)
    cream = np.array([0.62, 0.52, 0.34]); tar = np.array([0.06, 0.05, 0.045]); tan = np.array([0.44, 0.31, 0.20])
    dark = np.array([0.075, 0.06, 0.05]); grey = np.array([0.72, 0.72, 0.72])
    copper = np.array([0.62, 0.36, 0.22]); verdi = np.array([0.20, 0.42, 0.34])
    col_img = np.zeros((H, W, 3), np.float32)
    def zone(lo, hi, c):
        m = ((Y >= lo) & (Y < hi))[..., None]; return m, np.asarray(c, np.float32)
    # underwater: copper sheathing in 0.35 x 1.2 m plates with verdigris
    plate_y = ((Y - YMIN) / 0.35) % 1.0; plate_x = ((Z + (np.floor((Y - YMIN) / 0.35) % 2) * 0.6) / 1.2) % 1.0
    plate_edge = 1 - smooth(0.0, 0.05, plate_y) * smooth(0.0, 0.05, 1 - plate_y) * smooth(0.0, 0.02, plate_x) * smooth(0.0, 0.02, 1 - plate_x)
    plate_id = (np.floor((Y - YMIN) / 0.35) * 53 + np.floor((Z + (np.floor((Y - YMIN) / 0.35) % 2) * 0.6) / 1.2) * 29) % 61 / 61.0
    cu = copper[None, None, :] * (0.7 + 0.5 * plate_id[..., None]) * (1 - 0.35 * plate_edge[..., None])
    cu = cu * (1 - 0.55 * smooth(0.45, 0.8, n_mid)[..., None]) + verdi[None, None, :] * 0.55 * smooth(0.45, 0.8, n_mid)[..., None]
    under = (Y < 0.0)[..., None]
    zones = [(0.0, 0.175, tar), (0.175, 0.555, cream), (0.555, 1.095, grey), (1.095, 1.197, dark), (1.197, 9.0, tan)]
    col_img = np.where(under, cu, 0)
    for lo, hi, c in zones:
        m = ((Y >= lo) & (Y < hi))[..., None]
        col_img = np.where(m, wood[..., None] * c[None, None, :] * (1.0 if lo > 0.17 else 1.4), col_img)
    # seams darken everything above the waterline (the copper has its own plate seams)
    above = (Y >= 0.0)[..., None]
    col_img = np.where(above, col_img * (1 - 0.55 * seam[..., None]), col_img)

    # --- weathering
    # tar / algae at the waterline, salt crust just above it
    wl = np.exp(-((Y - 0.02) / 0.12) ** 2)
    col_img = col_img * (1 - 0.45 * wl[..., None] * (0.5 + 0.5 * n_mid[..., None])) + np.array([0.04, 0.09, 0.05]) * 0.5 * (wl * smooth(0.5, 0.8, n_hi))[..., None]
    salt = np.exp(-((Y - 0.32) / 0.25) ** 2) * smooth(0.55, 0.8, n_mid)
    col_img = col_img + 0.10 * salt[..., None]
    # rust and tar weeps below each gunport and chain plate
    streak = np.zeros((H, W), np.float32)
    for pz in PORT_Z:
        wxp = np.exp(-(((Z - pz) / 0.14) ** 2))
        fall = smooth(PORT_Y - 0.9, PORT_Y - 0.1, Y) * (Y < PORT_Y - 0.15)
        streak = np.maximum(streak, wxp * fall * (0.5 + 0.5 * fbm(H, W, 3, 11))[..., 0:] if False else wxp * fall * (0.55 + 0.45 * n_hi))
    col_img = col_img * (1 - 0.5 * streak[..., None]) + np.array([0.20, 0.08, 0.04]) * 0.35 * streak[..., None]
    # sun fade and big grime patches
    col_img = col_img * (0.88 + 0.22 * n_lo[..., None])
    # gunport openings: darker panel so the (code-built) port boxes sit in a worn frame
    for pz in PORT_Z:
        pm = (np.abs(Z - pz) < 0.26) & (np.abs(Y - PORT_Y) < 0.23)
        pm = pm[..., None]
        col_img = np.where(pm, col_img * 0.62, col_img)
    col_img = np.clip(col_img, 0, 1)

    # --- normal / height: seams are grooves, planks slightly crowned, grain relief, copper plate lips
    height = (-0.9 * seam * (Y >= 0.0) + 0.25 * np.sin(in_row * np.pi) * (Y >= 0.0) + 0.15 * (grain - 0.5) - 0.7 * plate_edge * under[..., 0] + 0.2 * (n_hi - 0.5))
    height = Image.fromarray(((height - height.min()) / (np.ptp(height) + 1e-6) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    h = np.asarray(height, np.float32) / 255.0
    gx = np.roll(h, -1, 1) - np.roll(h, 1, 1); gy = np.roll(h, -1, 0) - np.roll(h, 1, 0)
    strength = 5.0
    nx, ny, nz = -gx * strength, gy * strength, np.ones_like(h)
    nl = np.sqrt(nx * nx + ny * ny + nz * nz)
    nrm = np.stack([(nx / nl) * 0.5 + 0.5, (ny / nl) * 0.5 + 0.5, (nz / nl) * 0.5 + 0.5], -1)
    Image.fromarray((col_img * 255).astype(np.uint8)).save(path_albedo, quality=90)
    Image.fromarray((nrm * 255).astype(np.uint8)).save(path_normal)

def make_deck(path_albedo, path_normal, S=512):
    # tile covers 2 m x 2 m: planks run along the ship (x of the tile)
    y = (np.arange(S) + 0.5) / S * 2.0; x = (np.arange(S) + 0.5) / S * 2.0
    X, Y = np.meshgrid(x, y)
    pw = 0.14
    row = np.floor(Y / pw); inr = (Y / pw) % 1.0
    off = (row * 0.71) % 1.9
    col = np.floor((X + off) / 1.9); inc = ((X + off) / 1.9) % 1.0
    seam = np.clip((1 - smooth(0, 0.07, inr) * smooth(0, 0.07, 1 - inr)) + (1 - smooth(0, 0.008, inc) * smooth(0, 0.008, 1 - inc)), 0, 1)
    pid = (row * 31 + col * 7) % 29 / 29.0
    g = fbm(S, S, 4, 21, 3); gr = 0.5 + 0.5 * np.sin((X * 90 + g * 8 + pid * 30))
    base = np.array([0.58, 0.44, 0.27])
    c = base[None, None, :] * (0.78 + 0.32 * pid[..., None]) * (0.85 + 0.2 * gr[..., None]) * (0.9 + 0.15 * g[..., None])
    c = c * (1 - 0.7 * seam[..., None])
    h = -seam + 0.15 * gr
    hh = (h - h.min()) / (np.ptp(h) + 1e-6)
    gx = np.roll(hh, -1, 1) - np.roll(hh, 1, 1); gy = np.roll(hh, -1, 0) - np.roll(hh, 1, 0)
    nx, ny, nz = -gx * 4, gy * 4, np.ones_like(hh); nl = np.sqrt(nx * nx + ny * ny + nz * nz)
    Image.fromarray((np.clip(c, 0, 1) * 255).astype(np.uint8)).save(path_albedo, quality=90)
    Image.fromarray((np.stack([nx / nl, ny / nl, nz / nl], -1) * 0.5 + 0.5).__mul__(255).astype(np.uint8)).save(path_normal)

if __name__ == '__main__':
    make_hull('hull_albedo.png', 'hull_normal.png'); make_deck('deck_albedo.png', 'deck_normal.png')
    print('textures written')
