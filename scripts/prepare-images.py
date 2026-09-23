"""Prépare les images retenues à l'inventaire (docs/photos/INVENTAIRE.md).

Sources brutes : docs/photos/ (non versionnées). Sorties : src/assets/images/.
- photos/ : JPEG q90, largeur max 1280 px (vite-imagetools génère ensuite AVIF/WebP).
- cutouts/ : PNG avec alpha, détourés par flood-fill depuis les bords (fond studio blanc).
Usage : python3 scripts/prepare-images.py
"""
import os
import unicodedata
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
CUTOUTS = {0: 'rebelle-stick', 1: 'reconfort-stick', 2: 'rebelle-box', 3: 'reconfort-box'}

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
