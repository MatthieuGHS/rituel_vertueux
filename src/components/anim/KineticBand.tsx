import { useRef } from 'react'
import { gsap, MEDIA, ScrollTrigger, syncLenis, useGSAP } from './gsap'

const PHRASE = 'Plaisir & gourmandise'
const REPEAT = 4

/**
 * Typo cinétique : « Plaisir & gourmandise » en vague (Fraunces, crème sur jaune),
 * défilement continu dont la vitesse suit celle du scroll. Décoratif (aria-hidden) ;
 * la phrase est lisible par les lecteurs d'écran une seule fois.
 */
export function KineticBand() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      syncLenis()
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        const loop = gsap.to('[data-track]', { xPercent: -50, duration: 28, ease: 'none', repeat: -1 })
        const wave = gsap.to('[data-letter]', {
          y: -14,
          duration: 1.1,
          ease: 'sine.inOut',
          stagger: { each: 0.07, repeat: -1, yoyo: true },
        })
        let resetTimer: ReturnType<typeof setTimeout> | undefined
        const trigger = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            loop.paused(!self.isActive)
            wave.paused(!self.isActive)
          },
          onUpdate: (self) => {
            const velocity = self.getVelocity()
            const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(velocity) / 450)
            gsap.to(loop, { timeScale: velocity < 0 ? -boost : boost, duration: 0.25, overwrite: true })
            clearTimeout(resetTimer)
            resetTimer = setTimeout(() => gsap.to(loop, { timeScale: velocity < 0 ? -1 : 1, duration: 0.8 }), 160)
          },
        })
        return () => {
          clearTimeout(resetTimer)
          trigger.kill()
        }
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  const letters = Array.from(PHRASE)
  const unit = (key: number) => (
    <span key={key} className="flex shrink-0 items-center pr-[0.5em]">
      {letters.map((char, i) => (
        <span
          key={i}
          data-letter
          className="inline-block will-change-transform"
          style={{ transform: `translateY(${Math.sin((i / letters.length) * Math.PI * 2) * 10}px)` }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
      <span className="mx-[0.4em] inline-block size-[0.28em] rounded-full bg-terracotta" />
    </span>
  )

  return (
    <section ref={ref} className="overflow-hidden bg-reconfort py-10 lg:py-14" aria-label={PHRASE}>
      <p className="sr-only">{PHRASE}</p>
      <div
        data-track
        aria-hidden="true"
        className="font-display flex w-max whitespace-nowrap text-[clamp(3.2rem,2rem+6vw,8.5rem)] font-extrabold leading-[1.15] text-cream [text-shadow:0_2px_0_var(--color-reconfort-deep)]"
        style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}
      >
        {Array.from({ length: REPEAT * 2 }, (_, i) => unit(i))}
      </div>
    </section>
  )
}
