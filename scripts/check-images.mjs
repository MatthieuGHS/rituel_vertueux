// Vérifie qu'aucune image livrée (dist/) ne dépasse le budget de poids.
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'

const DIST = 'dist'
const LIMIT_KB = 250
const IMAGE_EXT = new Set(['.avif', '.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'])

if (!existsSync(DIST)) {
  console.error('dist/ introuvable : lancez `npm run build` avant `npm run images:check`.')
  process.exit(1)
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const images = walk(DIST).filter((file) => IMAGE_EXT.has(extname(file).toLowerCase()))
const tooBig = images
  .map((file) => ({ file, kb: statSync(file).size / 1024 }))
  .filter(({ kb }) => kb > LIMIT_KB)
  .sort((a, b) => b.kb - a.kb)

const totalKb = images.reduce((sum, file) => sum + statSync(file).size / 1024, 0)
console.log(`${images.length} images livrées, ${Math.round(totalKb)} Ko au total, budget ${LIMIT_KB} Ko/image.`)

if (tooBig.length > 0) {
  console.error(`\n${tooBig.length} image(s) au-dessus du budget :`)
  for (const { file, kb } of tooBig) console.error(`  ${Math.round(kb)} Ko  ${file}`)
  process.exit(1)
}
console.log('OK : toutes les images respectent le budget.')
