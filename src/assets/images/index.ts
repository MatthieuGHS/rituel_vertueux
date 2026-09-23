/**
 * Registre des images optimisées (vite-imagetools).
 * - photos/ : AVIF + WebP en 480 / 960 / 1280 px (jamais agrandies au-delà de la source) + LQIP 24 px inline.
 * - cutouts/ : détourés avec transparence (AVIF/WebP alpha), tailles adaptées à leur affichage réel.
 * Sources : docs/photos (voir docs/photos/INVENTAIRE.md), préparées par scripts/prepare-images.py.
 */

export interface Picture {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

export interface ImageAsset {
  picture: Picture
  /** Placeholder flou (data URI) pour les photos, absent pour les détourés. */
  lqip?: string
}

export type PhotoKey =
  | 'duo-cuisine'
  | 'duo-cuisine-portrait'
  | 'rebelle-box-stick'
  | 'rebelle-collage'
  | 'rebelle-cuisine'
  | 'rebelle-gourde'
  | 'rebelle-ingredients'
  | 'rebelle-plage'
  | 'rebelle-plaisir'
  | 'rebelle-podium'
  | 'rebelle-poudre'
  | 'rebelle-sac'
  | 'rebelle-smoothie'
  | 'rebelle-sport'
  | 'rebelle-studio'
  | 'reconfort-box-stick'
  | 'reconfort-box-studio'
  | 'reconfort-bureau'
  | 'reconfort-bureau-main'
  | 'reconfort-collage'
  | 'reconfort-flatlay'
  | 'reconfort-glace-mer'
  | 'reconfort-gourde'
  | 'reconfort-ingredients-jaune'
  | 'reconfort-ingredients'
  | 'reconfort-plage'
  | 'reconfort-plaisir'
  | 'reconfort-poudre'
  | 'reconfort-sac'
  | 'reconfort-smoothie'
  | 'reconfort-sport'
  | 'reconfort-studio'
  | 'reconfort-versement'

export type CutoutKey = 'rebelle-stick' | 'reconfort-stick' | 'rebelle-box' | 'reconfort-box'

const photoPictures = import.meta.glob<Picture>('./photos/*.jpg', {
  query: { w: '480;960;1280', format: 'avif;webp', quality: '62', as: 'picture' },
  import: 'default',
  eager: true,
})

const photoLqips = import.meta.glob<string>('./photos/*.jpg', {
  query: { w: '24', format: 'webp', quality: '40', inline: '' },
  import: 'default',
  eager: true,
})

const stickPictures = import.meta.glob<Picture>('./cutouts/*-stick.png', {
  query: { w: '160;320;540', format: 'avif;webp', quality: '70', as: 'picture' },
  import: 'default',
  eager: true,
})

const boxPictures = import.meta.glob<Picture>('./cutouts/*-box.png', {
  query: { w: '360;720;960', format: 'avif;webp', quality: '70', as: 'picture' },
  import: 'default',
  eager: true,
})

export function photo(key: PhotoKey): ImageAsset {
  const path = `./photos/${key}.jpg`
  const picture = photoPictures[path]
  if (!picture) throw new Error(`Image introuvable : ${key}`)
  return { picture, lqip: photoLqips[path] }
}

export function cutout(key: CutoutKey): ImageAsset {
  const path = `./cutouts/${key}.png`
  const picture = stickPictures[path] ?? boxPictures[path]
  if (!picture) throw new Error(`Détouré introuvable : ${key}`)
  return { picture }
}
