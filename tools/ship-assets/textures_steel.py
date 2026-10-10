"""Procedural textures for the steel hero hulls: riveted lapped strakes, welded butt seams, anti-fouling, boot-topping,
waterline grime, rust weeps, chipped paint, plus a neutral tileable plate (team band / rail) and a tread-plate deck.
Hull maps are generated at metre-true scale: U runs along the hull's outline arc length (S metres), V is physical height."""
import numpy as np
from PIL import Image, ImageFilter


def smooth(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def blob(h, w, seed, wx, wy=None):
    """Tileable band-limited noise (FFT), mean 0.5, std ~0.18. wx / wy are feature sizes in pixels."""
    wy = wy or wx
    r = np.random.default_rng(seed).standard_normal((h, w)).astype(np.float32)
    F = np.fft.rfft2(r)
    fy = np.fft.fftfreq(h)[:, None]; fx = np.fft.rfftfreq(w)[None, :]
    sx, sy = wx / 4.0, wy / 4.0
    F = F * np.exp(-2 * np.pi ** 2 * ((fx * sx) ** 2 + (fy * sy) ** 2)).astype(np.float32)
    o = np.fft.irfft2(F, s=(h, w))
    o = (o - o.mean()) / (o.std() + 1e-9) * 0.18 + 0.5
    return np.clip(o, 0, 1).astype(np.float32)


def fbm(h, w, seed, base, octaves=3, aniso=1.0):
    out = 0; tot = 0; a = 1.0
    for o in range(octaves):
        out = out + a * blob(h, w, seed + o * 7, max(2.0, base / 2 ** o), max(2.0, base / 2 ** o * aniso)); tot += a; a *= 0.55
    return out / tot


def hid(a, b, m=997):
    return ((a * 73856093) ^ (b * 19349663)) % m / float(m)


def normal_from_height(hh, strength):
    hh = hh.astype(np.float32)
    gx = (np.roll(hh, -1, 1) - np.roll(hh, 1, 1)) * 0.5
    gy = (np.roll(hh, -1, 0) - np.roll(hh, 1, 0)) * 0.5
    nx, ny, nz = -gx * strength, gy * strength, np.ones_like(hh)
    nl = np.sqrt(nx * nx + ny * ny + nz * nz)
    return np.stack([nx / nl * 0.5 + 0.5, ny / nl * 0.5 + 0.5, nz / nl * 0.5 + 0.5], -1)


def save(arr, path, q=90):
    Image.fromarray((np.clip(arr, 0, 1) * 255 + 0.5).astype(np.uint8)).save(path, quality=q)


def plating(X, Y, strake, plate, rows_period=None, plate_offsets=None, pitch=0.16, y0=-0.2):
    """Lapped strakes (rows of `strake` m) of plates `plate` m long. Returns a dict of metre-space fields."""
    rowf = (Y - y0) / strake
    row = np.floor(rowf).astype(np.int64)
    if rows_period: row = row % rows_period
    fy = rowf % 1.0
    dys = np.minimum(fy, 1 - fy) * strake                           # metres to the nearest strake seam
    off = (plate_offsets[row % len(plate_offsets)] if plate_offsets is not None else (row * 1.7) % plate)
    xf = (X + off) / plate
    col = np.floor(xf).astype(np.int64)
    fz = xf % 1.0
    dzs = np.minimum(fz, 1 - fz) * plate                             # metres to the nearest butt joint
    pid = (row * 131 + col * 17) % 97 / 97.0
    # rivet rows 5 cm inside each strake edge and each butt joint
    rz = ((X + off) % pitch) - pitch / 2
    rv = np.exp(-(((np.sqrt(rz ** 2 + (dys - 0.055) ** 2)) / 0.017) ** 2))
    ry = (Y % pitch) - pitch / 2
    rv = np.maximum(rv, np.exp(-(((np.sqrt(ry ** 2 + (dzs - 0.055) ** 2)) / 0.017) ** 2)))
    return dict(row=row, col=col, dys=dys, dzs=dzs, pid=pid, rivet=rv, fy=fy, fz=fz)


def hull_height(P, strake, plate, n_mid, n_hi):
    lip = smooth(0.0, 0.035, P['dys'])                               # overlapped strake edge: a step, then flat
    groove = 1 - smooth(0.0, 0.012, P['dzs'])                        # butt weld grooves
    sag = np.sin(np.pi * P['fz']) * np.sin(np.pi * P['fy'])          # plate bellies between the frames
    return 0.55 * lip - 0.5 * groove + 0.9 * P['rivet'] + 0.25 * sag + 0.18 * (n_mid - 0.5) + 0.06 * (n_hi - 0.5)


def make_hull(path_a, path_n, *, S, ymin, ymax, zones, grey, bottom=(0.40, 0.11, 0.095), seed=1, strake=1.1, plate=4.0, ppm=96.0, wmax=2560):
    W = int(min(wmax, round(S * ppm / 8) * 8)); H = int(round((ymax - ymin) * ppm / 8) * 8)
    X = ((np.arange(W) + 0.5) / W * S)[None, :]
    Y = (ymin + (1 - (np.arange(H) + 0.5) / H) * (ymax - ymin))[:, None]
    X = np.broadcast_to(X, (H, W)); Y = np.broadcast_to(Y, (H, W))
    n_lo, n_mid, n_hi = fbm(H, W, seed, 90), fbm(H, W, seed + 20, 14), fbm(H, W, seed + 40, 3.5, 2)
    P = plating(X, Y, strake, plate)
    base = np.array(grey, np.float32)[None, None, :]
    tone = (0.86 + 0.26 * P['pid'] + 0.2 * (n_mid - 0.5))[..., None]
    col = base * tone * (0.92 + 0.16 * n_lo[..., None]) * (0.97 + 0.06 * n_hi[..., None])
    # boot-topping / paint zones by physical height
    tide = (blob(H, W, seed + 3, 40, 6) - 0.5) * 0.22
    Yw = Y - tide
    for lo, hi, c in zones:
        m = ((Yw >= lo) & (Yw < hi))[..., None]
        col = np.where(m, np.array(c, np.float32)[None, None, :] * tone * (0.9 + 0.2 * n_lo[..., None]) * 1.0, col)
    # anti-fouling below the waterline: red lead paint with mottling, slime and barnacle crust near the line
    below = (Yw < 0.0)
    red = np.array(bottom, np.float32)[None, None, :] * (0.8 + 0.35 * n_mid[..., None]) * (0.9 + 0.2 * P['pid'][..., None])
    foul = smooth(0.52, 0.78, fbm(H, W, seed + 60, 10, 3)) * smooth(-1.4, -0.05, Yw)
    red = red * (1 - 0.6 * foul[..., None]) + np.array([0.13, 0.17, 0.09], np.float32)[None, None, :] * 0.6 * foul[..., None]
    barn = smooth(0.6, 0.72, n_hi) * smooth(-0.9, -0.05, Yw)
    red = red + 0.12 * barn[..., None]
    col = np.where(below[..., None], red, col)
    # seams and rivets
    seam = np.clip((1 - smooth(0.0, 0.01, P['dys'])) * 0.9 + (1 - smooth(0.0, 0.007, P['dzs'])) * 0.75, 0, 1)
    shadow = (1 - smooth(0.0, 0.045, P['dys'])) * (P['fy'] > 0.5) * 0.18    # shade under the lap above
    col = col * (1 - 0.5 * seam[..., None]) * (1 - shadow[..., None])
    col = col * (1 - 0.35 * P['rivet'][..., None]) + 0.07 * P['rivet'][..., None]
    # waterline grime: tar and algae just above the line, a salt tide-mark above that
    wl = np.exp(-(((Yw - 0.06) / 0.14) ** 2))
    col = col * (1 - 0.5 * wl[..., None] * (0.4 + 0.6 * n_mid[..., None])) + np.array([0.03, 0.07, 0.04], np.float32) * (wl * smooth(0.5, 0.8, n_hi))[..., None]
    salt = np.exp(-(((Yw - 0.55) / 0.3) ** 2)) * smooth(0.55, 0.8, n_mid)
    col = col + 0.07 * salt[..., None]
    # rust weeps running down from the rivets and plate edges, and chipped paint
    stk = blob(H, W, seed + 80, 3.0, 70.0)
    weep = smooth(0.58, 0.8, stk) * (0.4 + 0.6 * smooth(0.0, 0.5, P['rivet'] + 0.25 * (1 - smooth(0, 0.05, P['dys'])))) * smooth(0.25, 0.8, Y)
    weep = weep * (Y > 0.4) * smooth(0.0, 0.3, Y - 0.4)
    col = col * (1 - 0.45 * weep[..., None]) + np.array([0.26, 0.11, 0.05], np.float32) * 0.45 * weep[..., None]
    chip = smooth(0.66, 0.74, n_hi) * (1 - smooth(0.0, 0.09, P['dys'])) * (Y > 0.0)
    col = col * (1 - chip[..., None]) + np.array([0.30, 0.15, 0.09], np.float32) * chip[..., None]
    scuff = smooth(0.7, 0.8, fbm(H, W, seed + 90, 6, 2)) * (Y > 0.0) * smooth(0.0, 0.5, 0.9 - Y)
    col = col + 0.08 * scuff[..., None]
    save(col, path_a)
    hh = hull_height(P, strake, plate, n_mid, n_hi) - 1.0 * below * (0.9 * foul + 0.4 * barn)
    hh = np.asarray(Image.fromarray(((hh - hh.min()) / (np.ptp(hh) + 1e-6) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.5)), np.float32) / 255.0
    save(normal_from_height(hh, 9.0), path_n)
    return W, H


def make_plate_tile(path_a, path_n, seed=5, size=(1024, 512), span=(8.0, 4.0), strake=1.0, plate=4.0):
    """Neutral light-grey plating that tiles: the game tints it with the team colour (and the rail colour)."""
    W, H = size
    X = np.broadcast_to(((np.arange(W) + 0.5) / W * span[0])[None, :], (H, W)); Y = np.broadcast_to(((np.arange(H) + 0.5) / H * span[1])[:, None], (H, W))
    offs = np.array([0.0, 1.3, 2.6, 3.9])
    P = plating(X, Y, strake, plate, rows_period=int(span[1] / strake), plate_offsets=offs, y0=0.0)
    n_lo, n_mid, n_hi = fbm(H, W, seed, 120), fbm(H, W, seed + 20, 16), fbm(H, W, seed + 40, 3.5, 2)
    col = (0.90 + 0.08 * P['pid'] + 0.1 * (n_mid - 0.5))[..., None] * np.ones((H, W, 3), np.float32) * (0.95 + 0.1 * n_lo[..., None])
    seam = np.clip((1 - smooth(0.0, 0.01, P['dys'])) * 0.9 + (1 - smooth(0.0, 0.007, P['dzs'])) * 0.75, 0, 1)
    shadow = (1 - smooth(0.0, 0.045, P['dys'])) * (P['fy'] > 0.5) * 0.15
    col = col * (1 - 0.45 * seam[..., None]) * (1 - shadow[..., None])
    col = col * (1 - 0.3 * P['rivet'][..., None])
    stk = blob(H, W, seed + 80, 3.0, 60.0)
    weep = smooth(0.6, 0.8, stk) * (0.4 + 0.6 * P['rivet'])
    col = col * (1 - 0.3 * weep[..., None])
    col = col * (1 - 0.1 * smooth(0.65, 0.78, n_hi)[..., None])
    save(col, path_a)
    hh = hull_height(P, strake, plate, n_mid, n_hi)
    hh = np.asarray(Image.fromarray(((hh - hh.min()) / (np.ptp(hh) + 1e-6) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.5)), np.float32) / 255.0
    save(normal_from_height(hh, 9.0), path_n)


def make_steel_deck(path_a, path_n, S=512, span=2.0, seed=9):
    """Tread-plate (checker plate) steel deck, 2 m tile: 1 x 2 m plates, welded joints, worn paths and scuffs."""
    ppm = S / span
    X = np.broadcast_to(((np.arange(S) + 0.5) / S * span)[None, :], (S, S)); Y = np.broadcast_to(((np.arange(S) + 0.5) / S * span)[:, None], (S, S))
    pitch = span / 32
    ci, cj = np.floor(X / pitch).astype(int), np.floor(Y / pitch).astype(int)
    cx, cy = (X / pitch) % 1.0 - 0.5, (Y / pitch) % 1.0 - 0.5
    horiz = ((ci + cj) % 2) == 0
    bx, by = np.where(horiz, np.abs(cx) / 0.36, np.abs(cy) / 0.36), np.where(horiz, np.abs(cy) / 0.11, np.abs(cx) / 0.11)
    bar = (1 - smooth(0.7, 1.0, np.maximum(bx, by)))
    n_lo, n_mid, n_hi = fbm(S, S, seed, 70), fbm(S, S, seed + 5, 12), fbm(S, S, seed + 9, 3, 2)
    prow = np.floor(Y / 1.0).astype(int)
    pcol = np.floor((X + prow * 1.0) / 2.0).astype(int)
    pid = (prow * 29 + pcol * 11) % 13 / 13.0
    dy = np.minimum(Y % 1.0, 1 - (Y % 1.0)); dx = np.minimum(((X + prow * 1.0) % 2.0), 2.0 - ((X + prow * 1.0) % 2.0))
    seam = np.clip((1 - smooth(0.0, 0.012, dy)) + (1 - smooth(0.0, 0.012, dx)), 0, 1)
    col = (0.34 + 0.07 * pid + 0.1 * (n_mid - 0.5))[..., None] * np.ones((S, S, 3), np.float32) * (0.95 + 0.1 * n_lo[..., None])
    col = col * (0.82 + 0.3 * bar[..., None])
    col = col * (1 - 0.55 * seam[..., None])
    wear = smooth(0.62, 0.8, n_hi) * bar
    col = col + 0.12 * wear[..., None]
    rust = smooth(0.66, 0.8, fbm(S, S, seed + 40, 20, 2))
    col = col * (1 - 0.3 * rust[..., None]) + np.array([0.20, 0.09, 0.04], np.float32) * 0.3 * rust[..., None]
    save(col * np.array([1.0, 1.02, 1.05], np.float32), path_a)
    hh = 0.8 * bar - 0.8 * seam + 0.1 * (n_hi - 0.5)
    save(normal_from_height(hh, 5.0), path_n)
