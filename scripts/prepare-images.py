"""Prépare les images retenues à l'inventaire (docs/photos/INVENTAIRE.md).

Sources brutes : docs/photos/ (non versionnées). Sorties : src/assets/images/.
- photos/ : JPEG q90, largeur max 1280 px (vite-imagetools génère ensuite AVIF/WebP).
- cutouts/ : PNG avec alpha. Sticks : flood-fill depuis les bords (fond studio blanc).
  Boîtes : masque couleur (l'ombre portée grise est exclue) → enveloppe convexe → tracé anticrénelé.
Usage : python3 scripts/prepare-images.py
"""
import os
import unicodedata
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = 'docs/photos'
OUT = 'src/assets/images'
files = sorted(f for f in os.listdir(SRC) if not f.endswith(('.svg', '.md')))

def src(idx: int) -> str:
    return os.path.join(SRC, files[idx])

# index inventaire -> (nom livré, recadrage (gauche, haut, droite, bas) en fraction ou None)
PHOTOS = {
    5: ('reconfort-studio', None),
    6: ('reconfort-ingredients-jaune', None),
    7: ('reconfort-smoothie', None),
    8: ('reconfort-box-studio', None),
    9: ('reconfort-box-stick', None),
    10: ('reconfort-bureau', None),
    11: ('reconfort-bureau-main', None),
    12: ('reconfort-versement', None),
    13: ('reconfort-poudre', None),
    14: ('duo-cuisine', None),
    15: ('duo-cuisine-portrait', None),
    17: ('reconfort-sac', None),
    18: ('reconfort-ingredients', None),
    19: ('reconfort-gourde', None),
    20: ('reconfort-sport', None),
    21: ('rebelle-sport', None),
    22: ('rebelle-ingredients', None),
    24: ('rebelle-studio', None),
    25: ('rebelle-podium', None),
    26: ('rebelle-poudre', None),
    27: ('rebelle-box-stick', None),
    28: ('rebelle-cuisine', None),
    29: ('rebelle-smoothie', None),
    31: ('rebelle-sac', None),
    32: ('rebelle-gourde', None),
    35: ('rebelle-collage', None),
    36: ('reconfort-flatlay', None),
    38: ('reconfort-collage', None),
    40: ('reconfort-glace-mer', (0, 0.33, 1, 1)),  # retire l'encart texte « Ingrédients »
    41: ('reconfort-plage', None),
    44: ('rebelle-plaisir', None),
    45: ('rebelle-plage', None),
    46: ('reconfort-plaisir', None),
}
CUTOUTS = {0: 'rebelle-stick', 1: 'reconfort-stick'}
BOXES = {2: 'rebelle-box', 3: 'reconfort-box'}

def detour(im: Image.Image) -> Image.Image:
    im = im.convert('RGB')
    w, h = im.size
    work = im.copy()
    marker = (1, 254, 1)
    for pt in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)]:
        if work.getpixel(pt) != marker:
            ImageDraw.floodfill(work, pt, marker, thresh=18)
    mask = Image.new('L', (w, h), 255)
    px, mp = work.load(), mask.load()
    for y in range(h):
        for x in range(w):
            if px[x, y] == marker:
                mp[x, y] = 0
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    out = im.convert('RGBA')
    out.putalpha(mask)
    return out.crop(mask.getbbox())

def convex_hull(points):
    points = sorted(set(points))
    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lower, upper = [], []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]


def detour_box(im: Image.Image, supersample: int = 4, inset: float = 1.2) -> Image.Image:
    """Une boîte vue de 3/4 a une silhouette convexe : on détoure par enveloppe convexe.

    Masque = pixels saturés (carton coloré) ou nettement plus sombres que le fond ;
    l'ombre portée (grise, peu saturée, claire) est exclue. Le polygone est tracé en
    suréchantillonnage pour des bords nets et anticrénelés, légèrement rétracté (inset)
    pour ne garder aucun liseré de fond.
    """
    rgb = im.convert('RGB')
    a = np.asarray(rgb).astype(int)
    h, w, _ = a.shape
    border = np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]])
    bg = np.median(border, axis=0)
    saturation = a.max(axis=2) - a.min(axis=2)
    darker = (bg.mean() - a.mean(axis=2))
    mask = (saturation > 30) | (darker > 90)
    # plus grande composante connexe (via Pillow) pour ignorer les poussières
    m_img = Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(5))
    mask = np.asarray(m_img) > 0
    ys, xs = np.nonzero(mask)
    rows = {}
    for x, y in zip(xs, ys):
        lo, hi = rows.get(y, (x, x))
        rows[y] = (min(lo, x), max(hi, x))
    pts = [(lo, y) for y, (lo, hi) in rows.items()] + [(hi + 1, y) for y, (lo, hi) in rows.items()]
    hull = convex_hull(pts)
    cx = sum(p[0] for p in hull) / len(hull)
    cy = sum(p[1] for p in hull) / len(hull)
    def shrink(p):
        dx, dy = p[0] - cx, p[1] - cy
        dist = (dx * dx + dy * dy) ** 0.5 or 1
        return (p[0] - dx / dist * inset, p[1] - dy / dist * inset)
    hull = [shrink(p) for p in hull]
    big = Image.new('L', (w * supersample, h * supersample), 0)
    ImageDraw.Draw(big).polygon([(x * supersample, y * supersample) for x, y in hull], fill=255)
    alpha = big.resize((w, h), Image.LANCZOS)
    out = rgb.convert('RGBA')
    out.putalpha(alpha)
    return out.crop(alpha.getbbox())


for idx, (name, crop) in PHOTOS.items():
    im = Image.open(src(idx)).convert('RGB')
    if crop:
        w, h = im.size
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    if im.width > 1280:
        im = im.resize((1280, round(im.height * 1280 / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, 'photos', f'{name}.jpg'), quality=90, optimize=True)
    print(name, im.size)

for idx, name in CUTOUTS.items():
    out = detour(Image.open(src(idx)))
    out.save(os.path.join(OUT, 'cutouts', f'{name}.png'), optimize=True)
    print(name, out.size)

for idx, name in BOXES.items():
    out = detour_box(Image.open(src(idx)))
    out.save(os.path.join(OUT, 'cutouts', f'{name}.png'), optimize=True)
    print(name, out.size)
