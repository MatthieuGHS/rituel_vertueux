import { useCallback } from 'react'
import { cutout } from '../assets/images'
import type { ProductId } from '../data/products'
import { prefersReducedMotion } from '../lib/smooth-scroll'
import { useCart } from '../store/cart'

/**
 * Ajoute au panier puis ouvre le tiroir. Si le mouvement est autorisé, le stick
 * « vole » d'abord vers l'icône panier (GSAP chargé à la demande).
 */
export function useAddToCart() {
  const add = useCart((state) => state.add)
  const openDrawer = useCart((state) => state.openDrawer)

  return useCallback(
    async (productId: ProductId, quantity: number, source?: HTMLElement | null) => {
      add(productId, quantity)
      if (source && !prefersReducedMotion()) {
        try {
          const { flyToCart } = await import('../components/anim/flyToCart')
          const stick = cutout(productId === 'rebelle' ? 'rebelle-stick' : 'reconfort-stick')
          await flyToCart(stick.picture.img.src, source.getBoundingClientRect())
        } catch {
          // L'animation est décorative : en cas d'échec, on ouvre simplement le tiroir.
        }
      }
      openDrawer()
    },
    [add, openDrawer],
  )
}
