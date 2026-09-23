/** Détourés (sticks, boîtes) avec transparence, légers : utilisés par le panier global. */
import type { CutoutKey, ImageAsset, Picture } from './types'

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

export function cutout(key: CutoutKey): ImageAsset {
  const path = `./cutouts/${key}.png`
  const picture = stickPictures[path] ?? boxPictures[path]
  if (!picture) throw new Error(`Détouré introuvable : ${key}`)
  return { picture }
}
