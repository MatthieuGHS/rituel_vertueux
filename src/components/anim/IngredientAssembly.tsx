import { useRef, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { cutout } from '../../assets/images/cutouts'
import { ingredients, type IngredientId } from '../../data/ingredients'
import { Container } from '../ui/Container'
import { IngredientIllustration } from '../ui/IngredientIllustration'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { gsap, MEDIA, refreshScrollTriggers, syncLenis, useGSAP } from './gsap'

/** Position finale (desktop) de chaque ingrédient autour des sticks, en % de la scène. */
const layout: Array<{ id: IngredientId; x: number; y: number; side: 'rebelle' | 'reconfort' | 'both' }> = [
  { id: 'framboise', x: 6, y: 6, side: 'rebelle' },
  { id: 'hibiscus', x: 20, y: 36, side: 'rebelle' },
  { id: 'acerola', x: 3, y: 56, side: 'rebelle' },
  { id: 'collagene', x: 22, y: 72, side: 'rebelle' },
  { id: 'banane', x: 78, y: 2, side: 'reconfort' },
  { id: 'cacao', x: 64, y: 26, side: 'reconfort' },
  { id: 'datte', x: 86, y: 34, side: 'reconfort' },
  { id: 'caroube', x: 66, y: 58, side: 'reconfort' },
  { id: 'reishi', x: 86, y: 70, side: 'reconfort' },
  { id: 'avoine', x: 45, y: 84, side: 'both' },
]

/**
 * Assemblage des ingrédients : les illustrations convergent depuis les bords vers les sticks (scrub).
 * L'état final est la mise en page statique : sans animation, tout est déjà en place.
 */
export function IngredientAssembly() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      syncLenis()
      const mm = gsap.matchMedia()
      mm.add(MEDIA.desktop, () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-ingredient]', ref.current)
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '[data-stage]', start: 'top 85%', end: 'center 55%', scrub: 0.6 },
        })
        tl.from('[data-sticks]', { scale: 0.86, autoAlpha: 0.4, ease: 'none' }, 0)
        items.forEach((item) => {
          const x = Number(item.dataset.x ?? 50)
          const y = Number(item.dataset.y ?? 50)
          tl.from(
            item,
            {
              xPercent: (x < 50 ? -1 : 1) * (160 + Math.abs(50 - x) * 4),
              yPercent: (y - 45) * 3,
              rotation: x < 50 ? -35 : 35,
              autoAlpha: 0,
              ease: 'power1.out',
            },
            0,
          )
        })
      })
      mm.add(MEDIA.mobile, () => {
        gsap.from('[data-ingredient]', {
          autoAlpha: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: '[data-stage]', start: 'top 80%', once: true },
        })
      })
      refreshScrollTriggers()
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="overflow-hidden py-20 lg:py-32" aria-labelledby="assemblage-title">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="assemblage-title" className="display-lg">
            Ce qu’il y a dans un stick
          </h2>
          <p className="mt-5 text-lg text-ink/85">
            Des fruits, des fleurs, du cacao, des céréales et une touche de plante : dix ingrédients vedettes, dessinés au
            trait comme sur nos emballages.
          </p>
        </div>

        <div data-stage className="relative mx-auto mt-14 max-w-5xl lg:mt-20 lg:aspect-[16/10]">
          <div
            data-sticks
            className="relative mx-auto flex w-56 justify-center lg:absolute lg:left-1/2 lg:top-[4%] lg:w-[26%] lg:-translate-x-1/2"
          >
            <span aria-hidden="true" className="absolute inset-[10%_0_0] rounded-full bg-cream-deep" />
            <ResponsiveImage
              image={cutout('rebelle-stick')}
              alt="Stick [RE]BELLE"
              sizes="(min-width: 1024px) 8rem, 5.5rem"
              className="relative w-[42%] -rotate-[7deg]"
              imgClassName="object-contain drop-shadow-[0_24px_24px_rgb(43_38_34/0.25)]"
            />
            <ResponsiveImage
              image={cutout('reconfort-stick')}
              alt="Stick [RE]CONFORT"
              sizes="(min-width: 1024px) 8rem, 5.5rem"
              className="relative -ml-[6%] mt-[8%] w-[42%] rotate-[7deg]"
              imgClassName="object-contain drop-shadow-[0_24px_24px_rgb(43_38_34/0.25)]"
            />
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:mt-0 lg:block">
            {layout.map(({ id, x, y, side }) => (
              <li
                key={id}
                data-ingredient
                data-x={x}
                data-y={y}
                style={{ '--x': `${x}%`, '--y': `${y}%` } as CSSProperties}
                className="flex flex-col items-center text-center lg:absolute lg:left-(--x) lg:top-(--y) lg:w-[12%]"
              >
                <Link to={`/ingredients#${id}`} className="group flex flex-col items-center rounded-2xl p-1">
                  <IngredientIllustration
                    id={id}
                    className="size-20 transition-transform duration-300 group-hover:-rotate-6 lg:size-full"
                    strokeWidth={1.6}
                  />
                  <span className="label mt-1 text-lg text-forest">{ingredients[id].name}</span>
                  <span className="text-xs text-ink/75">
                    {side === 'both' ? 'Les deux rituels' : side === 'rebelle' ? '[RE]BELLE' : '[RE]CONFORT'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
