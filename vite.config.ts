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

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools(), preloadHeroFont()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
  },
})
