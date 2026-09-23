import { useRef } from 'react'
import { photo } from '../../assets/images/photos'
import type { PhotoKey } from '../../assets/images/types'
import { Container } from '../ui/Container'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { gsap, MEDIA, refreshScrollTriggers, syncLenis, useGSAP } from './gsap'

const moments: Array<{ title: string; text: string; image: PhotoKey; alt: string }> = [
  {
    title: 'Le matin',
    text: 'Un verre rose ou doré pour commencer la journée en douceur.',
    image: 'rebelle-cuisine',
    alt: 'Boîte et stick [RE]BELLE à côté d’un verre rose dans une cuisine baignée de soleil',
  },
  {
    title: 'Au bureau',
    text: 'Entre deux réunions, un stick dans la gourde et c’est prêt.',
    image: 'reconfort-bureau',
    alt: 'Stick [RE]CONFORT posé sur un bureau entre un ordinateur, un carnet et une tasse de café',
  },
  {
    title: 'Après le sport',
    text: 'Une boisson gourmande à glisser dans le sac de sport.',
    image: 'reconfort-sport',
    alt: 'Stick [RE]CONFORT sur une serviette de sport à côté d’un shaker et d’un haltère',
  },
  {
    title: 'En déplacement',
    text: 'Le format stick se loge dans un sac, une poche, une trousse.',
    image: 'reconfort-sac',
    alt: 'Main glissant un stick [RE]CONFORT dans un sac à main en cuir',
  },
  {
    title: 'À la plage',
    text: 'Version glacée, face à la mer, pour les après-midi d’été.',
    image: 'rebelle-plage',
    alt: 'Stick [RE]BELLE glissé dans le nœud d’un maillot de bain, serviette rayée rose au bord de la piscine',
  },
]

/**
 * Moments de vie : galerie à scroll horizontal pinné sur desktop,
 * carrousel natif (scroll-snap + swipe) sur mobile et en reduced-motion.
 */
export function MomentsGallery() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      syncLenis()
      const mm = gsap.matchMedia()
      mm.add(MEDIA.desktop, () => {
        const track = ref.current?.querySelector<HTMLElement>('[data-track]')
        if (!track) return
        const distance = () => track.scrollWidth - window.innerWidth + 64
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-pin]',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
      })
      refreshScrollTriggers()
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-cream-deep" aria-labelledby="moments-title">
      <div data-pin className="overflow-hidden py-20 lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:py-0">
        <Container size="wide">
          <h2 id="moments-title" className="display-lg max-w-3xl">
            Un rituel qui vous suit partout
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink/85">
            Chaud le matin, glacé l’été, dans une gourde ou un shaker : le rituel s’adapte à vos journées.
          </p>
        </Container>
        <div
          className="mt-10 snap-x snap-mandatory overflow-x-auto scroll-px-4 pb-4 scrollbar-none lg:snap-none lg:overflow-visible lg:pb-0"
          tabIndex={0}
          aria-label="Moments de vie, faire défiler horizontalement"
          role="region"
        >
          <ul data-track className="flex w-max gap-4 px-4 sm:gap-6 sm:px-6 lg:gap-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            {moments.map((moment) => (
              <li key={moment.title} className="w-[78vw] max-w-[22rem] shrink-0 snap-start lg:w-[26rem] lg:max-w-none">
                <ResponsiveImage
                  image={photo(moment.image)}
                  alt={moment.alt}
                  sizes="(min-width: 1024px) 26rem, 78vw"
                  className="aspect-[4/5] rounded-(--radius-card)"
                  layout="fill"
                />
                <h3 className="label mt-4 text-2xl font-bold text-forest">{moment.title}</h3>
                <p className="mt-1 text-ink/85">{moment.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
