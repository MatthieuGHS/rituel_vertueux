/**
 * Point d'entrée GSAP : n'est importé que par les composants animés (chunks lazy).
 * Enregistre ScrollTrigger + useGSAP et synchronise Lenis avec ScrollTrigger.
 */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '../../lib/smooth-scroll'

gsap.registerPlugin(ScrollTrigger, useGSAP)

let synced = false
export function syncLenis() {
  const lenis = getLenis()
  if (!lenis || synced) return
  lenis.on('scroll', ScrollTrigger.update)
  synced = true
}

/** Conditions partagées par gsap.matchMedia() dans tous les composants animés. */
export const MEDIA = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)',
  motion: '(prefers-reduced-motion: no-preference)',
} as const

export { gsap, ScrollTrigger, useGSAP }
