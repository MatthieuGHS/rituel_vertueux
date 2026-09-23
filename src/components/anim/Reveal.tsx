import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, MEDIA, syncLenis, useGSAP } from './gsap'

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
 * Le contenu est visible par défaut : l'état initial n'est posé que si JS et le mouvement sont autorisés.
 */
export function Reveal({ children, as: Tag = 'div', className, stagger = false, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      syncLenis()
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        const el = ref.current
        if (!el) return
        const targets = stagger ? Array.from(el.children) : el
        gsap.from(targets, {
          autoAlpha: 0,
          y: 18,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          stagger: stagger ? 0.08 : 0,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
