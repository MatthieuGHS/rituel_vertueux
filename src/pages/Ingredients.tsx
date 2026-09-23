import { Link } from 'react-router'
import { photo } from '../assets/images/photos'
import { Reveal } from '../components/anim/Reveal'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'
import { IngredientIllustration } from '../components/ui/IngredientIllustration'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { ingredientList } from '../data/ingredients'
import { products, type ProductId } from '../data/products'
import { useSeo } from '../lib/seo'

const groups: Array<{ id: ProductId | 'commun'; title: string }> = [
  { id: 'rebelle', title: 'Dans [RE]BELLE' },
  { id: 'reconfort', title: 'Dans [RE]CONFORT' },
  { id: 'commun', title: 'Dans les deux rituels' },
]

export default function Ingredients() {
  useSeo(
    'Ingrédients',
    'Framboise, hibiscus, acérola, collagène, banane, cacao, datte, caroube, reishi, avoine : les ingrédients vedettes des rituels [RE]BELLE et [RE]CONFORT.',
  )

  return (
    <>
      <PageHero
        title="Des ingrédients que l’on reconnaît"
        intro={
          <p>
            Fruits, fleurs, céréales, cacao et plantes, réduits en poudre. Voici les ingrédients vedettes de nos deux
            rituels. La liste complète figure sur chaque fiche produit.
          </p>
        }
        image={photo('reconfort-flatlay')}
        imageAlt="Stick [RE]CONFORT à plat entouré de rondelles de banane, de carrés de chocolat, de dattes, de gousses de caroube et de reishi"
      />

      {groups.map((group) => {
        const items = ingredientList.filter((ingredient) =>
          group.id === 'commun' ? ingredient.products.length > 1 : ingredient.products.length === 1 && ingredient.products[0] === group.id,
        )
        const tone = group.id === 'commun' ? 'var(--color-cream-deep)' : products[group.id].theme.bg
        return (
          <section key={group.id} aria-labelledby={`groupe-${group.id}`} className="py-16 lg:py-24" style={{ backgroundColor: group.id === 'reconfort' ? 'var(--color-cream)' : undefined }}>
            <Container>
              <h2 id={`groupe-${group.id}`} className="display-md">
                {group.title}
              </h2>
              <Reveal as="ul" stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((ingredient) => (
                  <li key={ingredient.id} id={ingredient.id} className="scroll-mt-28">
                    <article className="flex h-full gap-5 rounded-(--radius-card) p-6" style={{ backgroundColor: tone }}>
                      <span className="flex size-24 shrink-0 items-center justify-center rounded-full bg-cream">
                        <IngredientIllustration id={ingredient.id} className="size-16" />
                      </span>
                      <div>
                        <h3 className="label text-2xl font-bold text-forest">{ingredient.name}</h3>
                        <p className="mt-2 text-ink">{ingredient.text}</p>
                      </div>
                    </article>
                  </li>
                ))}
              </Reveal>
            </Container>
          </section>
        )
      })}

      <section className="pb-20 lg:pb-28" aria-label="Ambiance">
        <Container className="grid gap-6 md:grid-cols-2">
          <ResponsiveImage
            image={photo('rebelle-ingredients')}
            alt="Stick [RE]BELLE entouré de fleurs d’hibiscus, de framboises, d’acérolas et de flocons d’avoine"
            sizes="(min-width: 768px) 34rem, 92vw"
            className="aspect-[4/5] rounded-(--radius-card)"
            layout="fill"
          />
          <div className="flex flex-col justify-center gap-5 rounded-(--radius-card) bg-forest p-8 text-cream sm:p-12">
            <p className="font-display text-3xl font-semibold leading-tight text-cream">
              Aucune allégation au-delà de ce que dit l’étiquette : [RE]BELLE est riche en vitamine C, [RE]CONFORT est riche en fibres.
            </p>
            <p className="text-cream/85">Les deux recettes contiennent du gluten (avoine).</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/rituels/rebelle" className="font-medium text-rebelle underline underline-offset-4">Fiche [RE]BELLE</Link>
              <Link to="/rituels/reconfort" className="font-medium text-reconfort underline underline-offset-4">Fiche [RE]CONFORT</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
