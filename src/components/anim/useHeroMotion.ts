import type { RefObject } from 'react'
import { gsap, MEDIA, syncLenis, useGSAP } from './gsap'

/**
 * Hero de l'accueil : titre révélé ligne par ligne au chargement,
 * puis parallax multi-couches au scroll (chaque calque `data-depth` à sa vitesse).
 * Mobile : révélation seule, parallax réduit. Reduced-motion : rien.
 */
export function useHeroMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      syncLenis()
      const mm = gsap.matchMedia()
      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean }
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro
          .from('[data-line]', { yPercent: 110, duration: 0.9, stagger: 0.12 })
          .from('[data-hero-fade]', { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.1 }, '-=0.45')
          .from('[data-depth]', { autoAlpha: 0, scale: 0.9, duration: 0.9, stagger: 0.05 }, 0.1)

        const strength = desktop ? 1 : 0.4
        gsap.utils.toArray<HTMLElement>('[data-depth]').forEach((layer) => {
          const depth = Number(layer.dataset.depth ?? 0)
          gsap.to(layer, {
            yPercent: -depth * 60 * strength,
            ease: 'none',
            scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
          })
        })
        gsap.to('[data-hero-stick]', {
          rotation: 4,
          yPercent: -8 * strength,
          ease: 'none',
          scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope },
  )
}
