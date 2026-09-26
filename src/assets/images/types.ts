/**
 * Types du registre d'images (vite-imagetools).
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
  | 'reconfort-bureau'
  | 'reconfort-bureau-main'
  | 'reconfort-collage'
  | 'reconfort-flatlay'
  | 'reconfort-glace-mer'
  | 'reconfort-gourde'
  | 'reconfort-ingredients-jaune'
  | 'reconfort-plage'
  | 'reconfort-plaisir'
  | 'reconfort-poudre'
  | 'reconfort-sac'
  | 'reconfort-smoothie'
  | 'reconfort-sport'
  | 'reconfort-studio'
  | 'reconfort-versement'

export type CutoutKey = 'rebelle-stick' | 'reconfort-stick' | 'rebelle-box' | 'reconfort-box'

