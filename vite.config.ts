import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { imagetools } from 'vite-imagetools'

/**
 * Précharge uniquement la police du hero (Fraunces, sous-ensemble latin, axe SOFT).
 * Les autres fontes sont chargées à la demande via font-display: swap.
 */
function preloadHeroFont(): Plugin {
  return {
    name: 'rv:preload-hero-font',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const asset = Object.keys(ctx.bundle ?? {}).find((file) =>
          /fraunces-latin-soft-normal.*\.woff2$/.test(file),
        )
        if (!asset) return []
        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${asset}`, crossorigin: '' },
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}

/**
 * SPA : l'image LCP n'est découverte qu'après l'exécution du JS. Ce plugin injecte un petit
 * script inline qui, selon l'URL (accueil, fiches produit), précharge le chunk de la page et
 * son image LCP avec le même srcset/sizes que <ResponsiveImage>.
 */
function preloadRouteLcp(): Plugin {
  return {
    name: 'rv:preload-route-lcp',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const bundle = ctx.bundle ?? {}
        const chunks = Object.values(bundle).filter((item) => item.type === 'chunk')
        const code = chunks.map((chunk) => chunk.code).join('\n')
        const srcset = (name: string) =>
          code.match(new RegExp(`(/assets/${name}-[\\w-]+\\.avif \\d+w(?:, /assets/${name}-[\\w-]+\\.avif \\d+w)*)`))?.[1]
        const chunkFor = (name: string) => chunks.find((chunk) => chunk.name === name)?.fileName
        const routes = {
          '/': { js: chunkFor('Home'), img: srcset('rebelle-stick'), sizes: '(min-width: 1024px) 12vw, 26vw' },
          '/rituels/rebelle': { js: chunkFor('ProductPage'), img: srcset('rebelle-box'), sizes: '(min-width: 1024px) 28rem, (min-width: 768px) 40vw, 80vw' },
          '/rituels/reconfort': { js: chunkFor('ProductPage'), img: srcset('reconfort-box'), sizes: '(min-width: 1024px) 28rem, (min-width: 768px) 40vw, 80vw' },
        }
        const script = `(function(){var r=${JSON.stringify(routes)}[location.pathname.replace(/\\/$/,'')||'/'];if(!r)return;var h=document.head;if(r.js){var m=document.createElement('link');m.rel='modulepreload';m.href='/'+r.js;h.appendChild(m)}if(r.img){var l=document.createElement('link');l.rel='preload';l.as='image';l.type='image/avif';l.setAttribute('imagesrcset',r.img);l.setAttribute('imagesizes',r.sizes);l.setAttribute('fetchpriority','high');h.appendChild(l)}})()`
        return [{ tag: 'script', children: script, injectTo: 'head' }]
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools(), preloadHeroFont(), preloadRouteLcp()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
  },
})
