import { photo, type PhotoKey } from '../../../assets/images'
import { Reveal } from '../../anim/Reveal'
import { Container } from '../../ui/Container'
import { ResponsiveImage } from '../../ui/ResponsiveImage'

const gestures: Array<{ title: string; text: string; image: PhotoKey; alt: string }> = [
  {
    title: 'Ouvrez un stick',
    text: '18 g de poudre, dosés pour une boisson.',
    image: 'rebelle-poudre',
    alt: 'Poudre rose s’écoulant d’un stick [RE]BELLE ouvert',
  },
  {
    title: 'Versez dans 250 ml d’eau',
    text: 'Froide ou chaude, selon la saison et l’envie.',
    image: 'reconfort-versement',
    alt: 'Stick [RE]CONFORT versé dans un verre de boisson chocolatée',
  },
  {
    title: 'Mélangez et savourez',
    text: 'À la cuillère, au shaker ou directement dans la gourde.',
    image: 'rebelle-gourde',
    alt: 'Stick [RE]BELLE versé dans une gourde rose, sur un bureau',
  },
]

export function ThreeGestures() {
  return (
    <section className="py-20 lg:py-32" aria-labelledby="gestes-title">
      <Container>
        <Reveal>
          <h2 id="gestes-title" className="display-lg max-w-2xl">
            Le rituel en 3 gestes
          </h2>
        </Reveal>
        <Reveal as="ol" stagger className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
          {gestures.map((gesture, index) => (
            <li key={gesture.title} className={index === 1 ? 'md:mt-16' : undefined}>
              <div className="relative">
                <ResponsiveImage
                  image={photo(gesture.image)}
                  alt={gesture.alt}
                  sizes="(min-width: 768px) 30vw, 92vw"
                  className="aspect-[3/4] rounded-(--radius-card)"
                  layout="fill"
                />
                <span
                  aria-hidden="true"
                  className="font-display absolute -bottom-6 left-5 flex size-16 items-center justify-center rounded-full bg-terracotta text-3xl font-bold text-white"
                >
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-10 text-2xl">
                <span className="sr-only">Étape {index + 1} : </span>
                {gesture.title}
              </h3>
              <p className="mt-2 text-ink/85">{gesture.text}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
