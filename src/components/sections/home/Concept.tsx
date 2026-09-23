import { Leaf, Sparkles, Heart } from 'lucide-react'
import { photo } from '../../../assets/images/photos'
import { Reveal } from '../../anim/Reveal'
import { Container } from '../../ui/Container'
import { ResponsiveImage } from '../../ui/ResponsiveImage'

const pillars = [
  {
    icon: Heart,
    title: 'Gourmand',
    text: 'Framboise acidulée ou banane-cacao : des saveurs que l’on a envie de retrouver chaque jour.',
  },
  {
    icon: Leaf,
    title: 'Naturel',
    text: 'Des fruits, des fleurs, des céréales et des plantes réduits en poudre, listés sans détour sur chaque boîte.',
  },
  {
    icon: Sparkles,
    title: 'Fonctionnel',
    text: 'Riche en vitamine C pour [RE]BELLE, riche en fibres pour [RE]CONFORT. Un format stick qui se glisse partout.',
  },
]

export function Concept() {
  return (
    <section className="bg-cream-deep py-20 lg:py-32" aria-labelledby="concept-title">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <ResponsiveImage
            image={photo('duo-cuisine')}
            alt="Les boîtes [RE]BELLE et [RE]CONFORT posées sur un plan de travail lumineux, entourées de framboises, bananes, dattes et smoothies"
            sizes="(min-width: 1024px) 34rem, 92vw"
            className="rounded-(--radius-card)"
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <h2 id="concept-title" className="display-md">
              Rituel Vertueux, c’est une gamme de boissons fonctionnelles en sticks, pensée pour associer plaisir et
              bien-être au quotidien.
            </h2>
          </Reveal>
          <Reveal as="ul" stagger className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="flex size-12 items-center justify-center rounded-full bg-terracotta text-white">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
                </span>
                <h3 className="label mt-4 text-2xl font-bold text-forest">{title}</h3>
                <p className="mt-2 text-ink/85">{text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
