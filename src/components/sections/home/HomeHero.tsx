import { useRef } from 'react'
import { cutout } from '../../../assets/images'
import type { IngredientId } from '../../../data/ingredients'
import { useHeroMotion } from '../../anim/useHeroMotion'
import { ButtonLink } from '../../ui/Button'
import { Container } from '../../ui/Container'
import { IngredientIllustration } from '../../ui/IngredientIllustration'
import { ResponsiveImage } from '../../ui/ResponsiveImage'

/** Ingrédients flottants autour des sticks : position (%), taille, rotation et profondeur de parallax. */
const floaters: Array<{ id: IngredientId; x: number; y: number; size: number; rotate: number; depth: number }> = [
  { id: 'framboise', x: 4, y: 12, size: 17, rotate: -12, depth: 0.9 },
  { id: 'hibiscus', x: 70, y: 4, size: 19, rotate: 8, depth: 0.5 },
  { id: 'cacao', x: 76, y: 58, size: 18, rotate: 18, depth: 0.8 },
  { id: 'banane', x: 0, y: 64, size: 20, rotate: -20, depth: 0.6 },
  { id: 'avoine', x: 58, y: 80, size: 14, rotate: 10, depth: 1.1 },
  { id: 'acerola', x: 24, y: 86, size: 12, rotate: -6, depth: 0.4 },
]

export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  useHeroMotion(ref)
  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-6 lg:pb-24 lg:pt-10" data-hero>
      <Container size="wide" className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10">
          <h1 className="display-xl text-forest" data-hero-title>
            <span className="block overflow-hidden pb-[0.08em]"><span className="block" data-line>Votre bien-être</span></span>
            <span className="block overflow-hidden pb-[0.08em]"><span className="block" data-line>devient</span></span>
            <span className="block overflow-hidden pb-[0.08em]"><span className="block text-terracotta" data-line>un rituel</span></span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink/90 sm:text-xl" data-hero-fade>
            Deux boissons fonctionnelles en sticks, [RE]BELLE et [RE]CONFORT, pour associer plaisir et bien-être au
            quotidien. Un stick, 250&nbsp;ml d’eau, et c’est prêt.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-hero-fade>
            <ButtonLink to="/rituels" size="lg">
              Découvrir les rituels
            </ButtonLink>
            <ButtonLink to="/boutique" size="lg" variant="secondary">
              Boutique
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] sm:max-w-[30rem] lg:max-w-none" aria-hidden="true">
          <div
            data-depth="0.25"
            className="absolute inset-[8%_4%_6%_10%] rounded-(--radius-blob) bg-rebelle"
          />
          <div
            data-depth="0.45"
            className="absolute right-[2%] top-[4%] size-[38%] rounded-full bg-reconfort"
          />
          {floaters.map((f) => (
            <div
              key={f.id}
              data-depth={f.depth}
              className="absolute"
              style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${f.size}%`, rotate: `${f.rotate}deg` }}
            >
              <IngredientIllustration id={f.id} className="h-auto w-full text-terracotta-dark" strokeWidth={1.5} />
            </div>
          ))}
          <div data-depth="0.12" className="absolute left-[46%] top-[7%] w-[23%] rotate-[14deg]">
            <ResponsiveImage
              image={cutout('reconfort-stick')}
              alt=""
              sizes="(min-width: 1024px) 11vw, 24vw"
              className="drop-shadow-[0_30px_30px_rgb(43_38_34/0.25)]"
              imgClassName="object-contain"
            />
          </div>
          <div data-hero-stick className="absolute left-[27%] top-[4%] w-[25%] -rotate-[8deg]">
            <ResponsiveImage
              image={cutout('rebelle-stick')}
              alt=""
              priority
              sizes="(min-width: 1024px) 12vw, 26vw"
              className="drop-shadow-[0_34px_34px_rgb(43_38_34/0.3)]"
              imgClassName="object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
