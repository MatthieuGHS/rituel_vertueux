import { lazy, Suspense } from 'react'
import { productList } from '../../../data/products'
import { useMediaQuery } from '../../../hooks/useReducedMotion'
import { Container } from '../../ui/Container'
import { RitualStick, RitualText } from './RitualChapter'

const TwoRitualsPinned = lazy(() => import('../../anim/TwoRitualsPinned'))

/** Version statique : deux chapitres empilés (mobile, reduced-motion, fallback). */
function TwoRitualsStatic() {
  return (
    <div>
      {productList.map((product, index) => (
        <div key={product.id} style={{ backgroundColor: product.theme.bg }} className="overflow-hidden py-16 lg:py-24">
          <Container className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div className={index % 2 === 1 ? 'md:order-2' : undefined}>
              <RitualStick product={product} className={`mx-auto w-32 sm:w-40 ${index % 2 ? 'rotate-[8deg]' : '-rotate-[8deg]'}`} />
            </div>
            <RitualText product={product} />
          </Container>
        </div>
      ))}
    </div>
  )
}

export function TwoRituals() {
  const pinned = useMediaQuery('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
  return (
    <section aria-labelledby="rituels-title">
      <Container className="py-16 text-center lg:py-24">
        <h2 id="rituels-title" className="display-lg">
          Deux rituels, selon vos envies
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink/85">
          L’un est rose, fruité et acidulé. L’autre est doré, chocolaté et tout en douceur. Même geste, deux humeurs.
        </p>
      </Container>
      {pinned ? (
        <Suspense fallback={<TwoRitualsStatic />}>
          <TwoRitualsPinned />
        </Suspense>
      ) : (
        <TwoRitualsStatic />
      )}
    </section>
  )
}
