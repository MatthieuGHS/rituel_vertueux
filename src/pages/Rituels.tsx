import { Link } from 'react-router'
import { photo } from '../assets/images/photos'
import { Reveal } from '../components/anim/Reveal'
import { PageHero } from '../components/sections/PageHero'
import { Badge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { IngredientIllustration } from '../components/ui/IngredientIllustration'
import { Price } from '../components/ui/Price'
import { ProductName } from '../components/ui/ProductName'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { ingredients } from '../data/ingredients'
import { PACK, productList } from '../data/products'
import { formatPrice } from '../lib/format'
import { useSeo } from '../lib/seo'

const studio = {
  rebelle: { image: photo('rebelle-studio'), alt: 'Stick [RE]BELLE posé à plat sur fond rose, entouré de framboises et d’une fleur d’hibiscus' },
  reconfort: { image: photo('reconfort-studio'), alt: 'Stick [RE]CONFORT incliné sur fond jaune' },
}

export default function Rituels() {
  useSeo(
    'La gamme',
    'Découvrez les deux rituels Rituel Vertueux : [RE]BELLE framboise-hibiscus, riche en vitamine C, et [RE]CONFORT banane-cacao, riche en fibres.',
  )

  return (
    <>
      <PageHero
        title="Deux rituels, un même geste"
        intro={
          <p>
            Un stick à diluer dans 250 ml d’eau froide ou chaude. À vous de choisir votre humeur : fruitée et acidulée avec
            [RE]BELLE, douce et chocolatée avec [RE]CONFORT.
          </p>
        }
      />

      <Container className="grid gap-8 pb-20 md:grid-cols-2">
        {productList.map((product) => (
          <Reveal as="article" key={product.id} className="flex flex-col overflow-hidden rounded-(--radius-card)" >
            <div style={{ backgroundColor: product.theme.bg }} className="flex flex-1 flex-col">
              <ResponsiveImage
                image={studio[product.id].image}
                alt={studio[product.id].alt}
                sizes="(min-width: 768px) 34rem, 92vw"
                className="aspect-[4/3]"
                layout="fill"
              />
              <div className="flex flex-1 flex-col gap-5 p-6 sm:p-9">
                <h2 className="text-forest">
                  <ProductName product={product} className="text-6xl" />
                </h2>
                <p className="font-display -mt-1 text-2xl font-semibold leading-snug text-forest">{product.slogan}</p>
                <p className="text-ink">{product.description}</p>
                <ul className="flex flex-wrap gap-3" aria-label="Ingrédients vedettes">
                  {product.featured.map((id) => (
                    <li key={id} className="flex flex-col items-center gap-1 rounded-2xl bg-cream/70 px-3 py-2">
                      <IngredientIllustration id={id} className="size-10 text-terracotta-dark" />
                      <span className="text-xs font-medium text-forest">{ingredients[id].name}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                  <Badge tone="forest">{product.claim}</Badge>
                  <Price cents={product.price} className="text-3xl font-bold text-forest" />
                </div>
                <ButtonLink to={product.path} variant="secondary" className="self-start">
                  Voir la fiche {product.name}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        ))}
      </Container>

      <section className="bg-cream-deep py-20 lg:py-28" aria-labelledby="comparatif-title">
        <Container>
          <h2 id="comparatif-title" className="display-md">
            En un coup d’œil
          </h2>
          <div className="mt-10 overflow-x-auto rounded-(--radius-card) bg-cream" tabIndex={0} role="region" aria-labelledby="comparatif-title">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-forest/15">
                  <th scope="col" className="w-1/4 p-5">
                    <span className="sr-only">Caractéristique</span>
                  </th>
                  {productList.map((product) => (
                    <th key={product.id} scope="col" className="p-5">
                      <Link to={product.path} className="text-forest hover:text-terracotta-dark">
                        <ProductName product={product} className="text-3xl" />
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="[&_td]:p-5 [&_td]:align-top [&_th]:p-5 [&_th]:align-top [&_tr]:border-b [&_tr]:border-forest/10">
                <tr>
                  <th scope="row" className="label text-base text-ink/80">Saveur</th>
                  {productList.map((p) => <td key={p.id}>{p.flavour}</td>)}
                </tr>
                <tr>
                  <th scope="row" className="label text-base text-ink/80">Allégation</th>
                  {productList.map((p) => <td key={p.id}>{p.claim}</td>)}
                </tr>
                <tr>
                  <th scope="row" className="label text-base text-ink/80">Ingrédients vedettes</th>
                  {productList.map((p) => (
                    <td key={p.id}>{p.featured.map((id) => ingredients[id].name).join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="label text-base text-ink/80">Format</th>
                  {productList.map((p) => (
                    <td key={p.id}>
                      {PACK.sticks} sticks de {PACK.stickWeightG} g
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="label text-base text-ink/80">Allergènes</th>
                  {productList.map((p) => <td key={p.id}>{p.allergens}</td>)}
                </tr>
                <tr>
                  <th scope="row" className="label text-base text-ink/80">Prix</th>
                  {productList.map((p) => <td key={p.id} className="label text-xl font-bold text-forest">{formatPrice(p.price)}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  )
}
