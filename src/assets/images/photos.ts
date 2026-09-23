/**
 * Photos : AVIF + WebP en 480 / 960 / 1280 px + LQIP 24 px inline.
 * Module séparé des détourés pour que les LQIP restent hors du bundle initial.
 */
import type { ImageAsset, Picture, PhotoKey } from './types'

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

export function photo(key: PhotoKey): ImageAsset {
  const path = `./photos/${key}.jpg`
  const picture = photoPictures[path]
  if (!picture) throw new Error(`Image introuvable : ${key}`)
  return { picture, lqip: photoLqips[path] }
}

