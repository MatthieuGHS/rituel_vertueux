import Lenis from 'lenis'

/**
 * Instance Lenis partagée. GSAP n'est pas importé ici (il reste dans les composants animés) :
 * la synchronisation Lenis ↔ ScrollTrigger se fait dans components/anim/gsap.ts.
 */
let lenis: Lenis | null = null

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function startSmoothScroll(): Lenis | null {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: true })
  return lenis
}

export function stopSmoothScroll() {
  lenis?.destroy()
  lenis = null
}

export function getLenis(): Lenis | null {
  return lenis
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

/** Bloque le défilement de la page (tiroir, menu plein écran). */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
