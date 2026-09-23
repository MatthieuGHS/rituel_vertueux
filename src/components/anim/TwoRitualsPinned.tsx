import { useRef } from 'react'
import { products } from '../../data/products'
import { RitualStick, RitualText } from '../sections/home/RitualChapter'
import { gsap, MEDIA, refreshScrollTriggers, syncLenis, useGSAP } from './gsap'

/**
 * « Les deux rituels » (desktop, mouvement autorisé) : section pinnée.
 * Au scroll, le fond passe crème → rose → jaune (fondu de calques, opacity uniquement),
 * le stick [RE]BELLE pivote puis laisse place à [RE]CONFORT, les textes se relaient en fondu.
 */
export default function TwoRitualsPinned() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      syncLenis()
      const mm = gsap.matchMedia()
      mm.add(MEDIA.desktop, () => {
        const q = gsap.utils.selector(ref)
        gsap.set(q('[data-layer="rebelle"], [data-layer="reconfort"]'), { autoAlpha: 0 })
        gsap.set(q('[data-stick="rebelle"]'), { autoAlpha: 0, yPercent: 30, rotation: -20 })
        gsap.set(q('[data-stick="reconfort"]'), { autoAlpha: 0, rotation: -160, scale: 0.7 })
        gsap.set(q('[data-text]'), { autoAlpha: 0, y: 30 })

        // Entrée avant le pin : le fond passe du crème au rose, [RE]BELLE apparaît.
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'top top', scrub: 0.6 },
          })
          .to(q('[data-layer="rebelle"]'), { autoAlpha: 1, duration: 1 })
          .to(q('[data-stick="rebelle"]'), { autoAlpha: 1, yPercent: 0, rotation: -8, duration: 1, ease: 'power2.out' }, '<')
          .to(q('[data-text="rebelle"]'), { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '<0.3')

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        })

        // Valeurs de départ explicites (fromTo, immediateRender: false) : l'entrée ci-dessus
        // modifie ces éléments après la création de cette timeline.
        const later = { immediateRender: false }
        tl.to({}, { duration: 0.6 })
          .fromTo(
            q('[data-stick="rebelle"]'),
            { rotation: -8, scale: 1, autoAlpha: 1, yPercent: 0 },
            { rotation: 170, scale: 0.7, autoAlpha: 0, duration: 1.1, ease: 'power1.in', ...later },
          )
          .fromTo(q('[data-text="rebelle"]'), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -30, duration: 0.5, ...later }, '<')
          .fromTo(q('[data-layer="reconfort"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ...later }, '<0.2')
          .fromTo(
            q('[data-stick="reconfort"]'),
            { autoAlpha: 0, rotation: -160, scale: 0.7 },
            { autoAlpha: 1, rotation: 8, scale: 1, duration: 1.1, ease: 'power2.out', ...later },
            '<0.3',
          )
          .fromTo(q('[data-text="reconfort"]'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', ...later }, '<0.5')
          .to({}, { duration: 0.8 })
      })
      refreshScrollTriggers()
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="relative h-dvh min-h-[40rem] overflow-hidden bg-cream">
      <div data-layer="rebelle" aria-hidden="true" className="absolute inset-0 bg-rebelle" />
      <div data-layer="reconfort" aria-hidden="true" className="absolute inset-0 bg-reconfort" />
      <div
        aria-hidden="true"
        className="absolute left-[8%] top-1/2 aspect-square w-[36vw] max-w-[34rem] -translate-y-1/2 rounded-(--radius-blob) bg-cream/35"
      />
      <div className="relative mx-auto grid h-full max-w-6xl grid-cols-[0.85fr_1.15fr] items-center gap-12 px-8">
        <div className="relative h-[78%]">
          <div data-stick="rebelle" className="absolute inset-0 flex items-center justify-center">
            <RitualStick product={products.rebelle} className="h-full w-auto max-w-none" />
          </div>
          <div data-stick="reconfort" className="absolute inset-0 flex items-center justify-center">
            <RitualStick product={products.reconfort} className="h-full w-auto max-w-none" />
          </div>
        </div>
        <div className="relative grid">
          <div data-text="rebelle" className="col-start-1 row-start-1">
            <RitualText product={products.rebelle} />
          </div>
          <div data-text="reconfort" className="col-start-1 row-start-1">
            <RitualText product={products.reconfort} />
          </div>
        </div>
      </div>
    </div>
  )
}
