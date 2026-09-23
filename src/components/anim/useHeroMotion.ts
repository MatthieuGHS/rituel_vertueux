import { useEffect, type RefObject } from 'react'

/**
 * Hero de l'accueil. Le titre est révélé ligne par ligne en CSS (classe `.hero-line`,
 * sans attendre le JS). Le parallax multi-couches (calques `data-depth`) arrive ensuite
 * avec GSAP, chargé à la demande pour ne pas retarder l'affichage (LCP).
 */
export function useHeroMotion(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let cancelled = false
    let revert: (() => void) | undefined
    import('./gsap').then(({ gsap, MEDIA, syncLenis }) => {
      const root = scope.current
      if (cancelled || !root) return
      syncLenis()
      const mm = gsap.matchMedia(root)
      mm.add({ desktop: MEDIA.desktop, mobile: MEDIA.mobile }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean }
        const strength = desktop ? 1 : 0.4
        const scrollTrigger = { trigger: root, start: 'top top', end: 'bottom top', scrub: true }
        gsap.utils.toArray<HTMLElement>('[data-depth]', root).forEach((layer) => {
          gsap.to(layer, { yPercent: -Number(layer.dataset.depth ?? 0) * 60 * strength, ease: 'none', scrollTrigger })
        })
        gsap.to(root.querySelector('[data-hero-stick]'), { rotation: 4, yPercent: -8 * strength, ease: 'none', scrollTrigger })
      })
      revert = () => mm.revert()
    })
    return () => {
      cancelled = true
      revert?.()
    }
  }, [scope])
}
