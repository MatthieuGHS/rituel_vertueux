import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Anime les enfants directs en cascade plutôt que le bloc entier. */
  stagger?: boolean
  delay?: number
}

/**
 * Apparition sobre (fondu + léger translate) au scroll.
 * GSAP est chargé à la demande (hors chemin critique) ; un bloc déjà visible au moment
 * où GSAP arrive n'est pas animé, pour ne jamais masquer un contenu déjà affiché.
 */
export function Reveal({ children, as: Tag = 'div', className, stagger = false, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    let cancelled = false
    let revert: (() => void) | undefined
    import('./gsap').then(({ gsap, MEDIA, syncLenis }) => {
      const el = ref.current
      if (cancelled || !el) return
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
      syncLenis()
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap.from(stagger ? Array.from(el.children) : el, {
          autoAlpha: 0,
          y: 18,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
      revert = () => mm.revert()
    })
    return () => {
      cancelled = true
      revert?.()
    }
  }, [stagger, delay])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
