import { CupSoda, Flame, Snowflake } from 'lucide-react'
import { photo, type PhotoKey } from '../assets/images'
import { Reveal } from '../components/anim/Reveal'
import { PageHero } from '../components/sections/PageHero'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { PACK } from '../data/products'
import { cn } from '../lib/cn'
import { useSeo } from '../lib/seo'

const modes = [
  { icon: Flame, title: 'Chaud', text: 'Eau chaude, non bouillante. [RE]CONFORT prend des airs de chocolat chaud, [RE]BELLE d’infusion rosée.' },
  { icon: CupSoda, title: 'Froid', text: 'Eau fraîche, un shaker ou une gourde : le plus simple pour la journée.' },
  { icon: Snowflake, title: 'Glacé', text: 'Diluez dans un fond d’eau, puis versez sur des glaçons. Idéal l’été.' },
]

const moments: Array<{ title: string; text: string; image: PhotoKey; alt: string }> = [
  {
    title: 'Le matin',
    text: 'Au petit-déjeuner, à côté d’un fruit ou d’un bol de flocons. Un geste lumineux pour démarrer.',
    image: 'duo-cuisine-portrait',
    alt: 'Les boîtes [RE]BELLE et [RE]CONFORT dans une cuisine ensoleillée avec des smoothies',
  },
  {
    title: 'Au bureau',
    text: 'Un stick dans le tiroir, une gourde sur le bureau : la pause qui coupe l’après-midi.',
    image: 'reconfort-bureau-main',
    alt: 'Main tenant un stick [RE]CONFORT au-dessus d’un bureau avec ordinateur et tasse de café',
  },
  {
    title: 'Au sport',
    text: 'Dans le sac, à côté de la serviette. À préparer au shaker après la séance.',
    image: 'rebelle-sport',
    alt: 'Stick [RE]BELLE à côté d’un shaker rose et d’un haltère dans une salle de sport',
  },
  {
    title: 'En déplacement',
    text: 'Le stick se glisse partout : sac à main, valise, poche de veste.',
    image: 'rebelle-sac',
    alt: 'Main sortant un stick [RE]BELLE d’un sac à main posé sur un bureau',
  },
  {
    title: 'À la plage',
    text: 'Dans une bouteille d’eau fraîche, face à la mer. Le rituel suit l’été.',
    image: 'reconfort-glace-mer',
    alt: 'Verre glacé chocolaté et stick [RE]CONFORT sur un muret face à la Méditerranée',
  },
]

export default function LeRituel() {
  useSeo(
    'Le rituel au quotidien',
    'Comment préparer [RE]BELLE et [RE]CONFORT : chaud, froid ou glacé, et à quels moments de la journée les savourer.',
  )

  return (
    <>
      <PageHero
        title="Le rituel au quotidien"
        intro={<p>{PACK.preparation} Ensuite, c’est vous qui décidez du moment et de la température.</p>}
        image={photo('reconfort-gourde')}
        imageAlt="Stick [RE]CONFORT versé dans une gourde isotherme, sur un bureau"
        tone="deep"
      />

      <section className="py-20 lg:py-28" aria-labelledby="preparation-title">
        <Container>
          <h2 id="preparation-title" className="display-md">
            Chaud, froid ou glacé
          </h2>
          <Reveal as="ul" stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {modes.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-(--radius-card) bg-cream-deep p-7">
                <span className="flex size-14 items-center justify-center rounded-full bg-terracotta text-white">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-2xl">{title}</h3>
                <p className="mt-2 text-ink/90">{text}</p>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28" aria-labelledby="moments-title">
        <Container>
          <h2 id="moments-title" className="display-md">
            Cinq moments pour un stick
          </h2>
          <div className="mt-12 space-y-16 lg:space-y-24">
            {moments.map((moment, index) => (
              <Reveal key={moment.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <ResponsiveImage
                  image={photo(moment.image)}
                  alt={moment.alt}
                  sizes="(min-width: 768px) 34rem, 92vw"
                  className={cn('aspect-[4/3] rounded-(--radius-card)', index % 2 === 1 && 'md:order-2')}
                  layout="fill"
                />
                <div>
                  <h3 className="display-md">{moment.title}</h3>
                  <p className="mt-4 max-w-md text-lg text-ink/90">{moment.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-20 flex flex-wrap gap-3">
            <ButtonLink to="/recettes">Voir les recettes</ButtonLink>
            <ButtonLink to="/boutique" variant="secondary">
              Boutique
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
