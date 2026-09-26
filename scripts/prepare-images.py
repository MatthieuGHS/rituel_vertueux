"""Prépare les images retenues à l'inventaire (docs/photos/INVENTAIRE.md).

Sources brutes : docs/photos/ (non versionnées). Sorties : src/assets/images/.
- photos/ : JPEG q90, largeur max 1280 px (vite-imagetools génère ensuite AVIF/WebP).
- cutouts/ : PNG avec alpha.
  Sticks : détourés par flood-fill depuis les bords (fond studio blanc).
  Boîtes : PNG détourés fournis par la cliente (docs/photos/pnged/), simplement nettoyés.
Usage : python3 scripts/prepare-images.py
"""
import os
import unicodedata

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = 'docs/photos'
OUT = 'src/assets/images'

# fichier source -> (nom livré, recadrage (gauche, haut, droite, bas) en fraction ou None)
PHOTOS = {
    "ChatGPT Image 16 sept. 2026 à 13_12_40.png": ("reconfort-studio", None),
    "ChatGPT Image 16 sept. 2026 à 13_12_48.png": ("reconfort-ingredients-jaune", None),
    "ChatGPT Image 16 sept. 2026 à 13_12_53.png": ("reconfort-smoothie", None),
    "ChatGPT Image 16 sept. 2026 à 13_20_26.png": ("reconfort-box-stick", None),
    "ChatGPT Image 16 sept. 2026 à 13_21_46.png": ("reconfort-bureau", None),
    "ChatGPT Image 16 sept. 2026 à 13_21_52.png": ("reconfort-bureau-main", None),
    "ChatGPT Image 16 sept. 2026 à 13_22_54.png": ("reconfort-versement", None),
    "ChatGPT Image 16 sept. 2026 à 13_22_57.png": ("reconfort-poudre", None),
    "ChatGPT Image 16 sept. 2026 à 13_24_55.png": ("duo-cuisine", None),
    "ChatGPT Image 16 sept. 2026 à 13_25_06.png": ("duo-cuisine-portrait", None),
    "ChatGPT Image 16 sept. 2026 à 13_26_25.png": ("reconfort-sac", None),
    "ChatGPT Image 16 sept. 2026 à 13_33_11.png": ("reconfort-gourde", None),
    "ChatGPT Image 16 sept. 2026 à 13_40_12.png": ("reconfort-sport", None),
    "ChatGPT Image 16 sept. 2026 à 13_40_15.png": ("rebelle-sport", None),
    "ChatGPT Image 16 sept. 2026, 13_03_56.png": ("rebelle-ingredients", None),
    "ChatGPT Image 16 sept. 2026, 13_05_59.png": ("rebelle-studio", None),
    "ChatGPT Image 16 sept. 2026, 13_07_45.png": ("rebelle-podium", None),
    "ChatGPT Image 16 sept. 2026, 13_08_38.png": ("rebelle-poudre", None),
    "ChatGPT Image 16 sept. 2026, 13_11_59.png": ("rebelle-cuisine", None),
    "ChatGPT Image 16 sept. 2026, 13_21_46.png": ("rebelle-smoothie", None),
    "ChatGPT Image 16 sept. 2026, 13_26_36.png": ("rebelle-sac", None),
    "ChatGPT Image 16 sept. 2026, 13_29_29.png": ("rebelle-gourde", None),
    "ChatGPT Image 17 sept. 2026 à 11_25_52.png": ("rebelle-collage", None),
    "ChatGPT Image 17 sept. 2026 à 11_26_26.png": ("reconfort-flatlay", None),
    "ChatGPT Image 17 sept. 2026 à 11_28_39.png": ("reconfort-collage", None),
    "ChatGPT Image 17 sept. 2026 à 11_34_15.png": ("reconfort-glace-mer", (0, 0.33, 1, 1)),  # retire l'encart texte « Ingrédients »
    "ChatGPT Image 17 sept. 2026 à 11_36_41.png": ("reconfort-plage", None),
    "ChatGPT Image 17 sept. 2026 à 11_38_19.png": ("rebelle-plaisir", None),
    "ChatGPT Image 17 sept. 2026 à 11_39_08.png": ("rebelle-plage", None),
    "ChatGPT Image 17 sept. 2026 à 11_40_33.png": ("reconfort-plaisir", None),
}

# Sticks : visuels studio fond blanc, détourés ici.
STICKS = {
    "ChatGPT Image 16 sept. 2026 à 12_51_54.png": "rebelle-stick",
    "ChatGPT Image 16 sept. 2026 à 12_53_14.png": "reconfort-stick",
}

# Boîtes : PNG détourés fournis par la cliente.
BOXES = {
    'pnged/ChatGPT Image 25 sept. 2026 à 11_27_06.png': 'rebelle-box',
    'pnged/ChatGPT Image 25 sept. 2026 à 11_28_15.png': 'reconfort-box',
}


def src(filename: str) -> str:
    """Chemin de la source ; tolère les écarts de normalisation Unicode (« à » NFC/NFD)."""
    path = os.path.join(SRC, filename)
    if os.path.exists(path):
        return path
    folder, name = os.path.split(path)
    wanted = unicodedata.normalize('NFC', name)
    for candidate in os.listdir(folder):
        if unicodedata.normalize('NFC', candidate) == wanted:
            return os.path.join(folder, candidate)
    raise FileNotFoundError(path)


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


def clean_cutout(im: Image.Image) -> Image.Image:
    """Normalise un PNG déjà détouré : l'intérieur exporté à ~99 % d'opacité redevient opaque,
    les pixels quasi invisibles deviennent transparents, puis recadrage au plus près du sujet."""
    rgba = np.asarray(im.convert('RGBA')).copy()
    alpha = rgba[..., 3]
    alpha[alpha >= 245] = 255
    alpha[alpha <= 8] = 0
    out = Image.fromarray(rgba, 'RGBA')
    return out.crop(out.getchannel('A').getbbox())


for filename, (name, crop) in PHOTOS.items():
    im = Image.open(src(filename)).convert('RGB')
    if crop:
        w, h = im.size
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    if im.width > 1280:
        im = im.resize((1280, round(im.height * 1280 / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, 'photos', f'{name}.jpg'), quality=90, optimize=True)
    print(name, im.size)

for filename, name in STICKS.items():
    out = detour(Image.open(src(filename)))
    out.save(os.path.join(OUT, 'cutouts', f'{name}.png'), optimize=True)
    print(name, out.size)

for filename, name in BOXES.items():
    out = clean_cutout(Image.open(src(filename)))
    out.save(os.path.join(OUT, 'cutouts', f'{name}.png'), optimize=True)
    print(name, out.size)
