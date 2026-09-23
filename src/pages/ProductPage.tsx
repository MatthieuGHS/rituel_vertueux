import { Clock, Droplets, Package, ShieldAlert, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { photo } from '../assets/images/photos'
import { cutout } from '../assets/images/cutouts'
import type { PhotoKey } from '../assets/images/types'
import { Reveal } from '../components/anim/Reveal'
import { AddToCartButton } from '../components/sections/AddToCartButton'
import { Badge } from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { IngredientIllustration } from '../components/ui/IngredientIllustration'
import { NutriScore } from '../components/ui/NutriScore'
import { Price } from '../components/ui/Price'
import { ProductName } from '../components/ui/ProductName'
import { QuantitySelector } from '../components/ui/QuantitySelector'
import { ResponsiveImage } from '../components/ui/ResponsiveImage'
import { ingredients } from '../data/ingredients'
import { isProductId, otherProduct, PACK, products, type ProductId } from '../data/products'
import { formatPrice } from '../lib/format'
import { SHIPPING } from '../lib/loyalty'
import { useSeo } from '../lib/seo'
import NotFound from './NotFound'

const ambiance: Record<ProductId, Array<{ key: PhotoKey; alt: string }>> = {
  rebelle: [
    { key: 'rebelle-ingredients', alt: 'Stick [RE]BELLE entouré de fleurs d’hibiscus, de framboises, d’acérolas et de flocons d’avoine' },
    { key: 'rebelle-collage', alt: 'Stick [RE]BELLE sur un collage de framboises, d’hibiscus, d’eau pétillante rosée et d’avoine' },
  ],
  reconfort: [
    { key: 'reconfort-ingredients-jaune', alt: 'Stick [RE]CONFORT sur fond jaune avec une banane, une cabosse de cacao, des dattes et de l’avoine' },
    { key: 'reconfort-collage', alt: 'Stick [RE]CONFORT sur un collage de banane, de cacao, de reishi et de flocons d’avoine' },
  ],
}

export default function ProductPage() {
  const { slug } = useParams()
  if (!isProductId(slug)) return <NotFound />
  return <ProductView id={slug} key={slug} />
}

function ProductView({ id }: { id: ProductId }) {
  const product = products[id]
  const other = otherProduct(id)
  const [quantity, setQuantity] = useState(1)
  useSeo(
    product.name,
    `${product.name} : ${product.slogan.toLowerCase()}. ${product.flavour}, ${product.claim.toLowerCase()}. Boîte de 10 sticks, ${formatPrice(product.price)}.`,
  )

  const facts = [
    { icon: Droplets, title: 'Préparation', text: PACK.preparation },
    { icon: Clock, title: 'Durabilité minimale', text: `${product.ddmMonths} mois (DDM).` },
    { icon: Package, title: 'Conservation', text: PACK.storage },
    { icon: ShieldAlert, title: 'Allergènes', text: product.allergens },
  ]

  return (
    <>
      <section style={{ backgroundColor: product.theme.bg }} className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute -left-24 top-10 aspect-square w-[34rem] max-w-[90vw] rounded-(--radius-blob) bg-cream/35"
        />
        <Container className="relative grid items-center gap-10 pb-16 pt-8 md:grid-cols-2 lg:pb-24 lg:pt-12">
          <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <ResponsiveImage
              image={cutout(id === 'rebelle' ? 'rebelle-box' : 'reconfort-box')}
              alt={`Boîte ${product.name}, 10 sticks de 18 g`}
              priority
              sizes="(min-width: 1024px) 28rem, (min-width: 768px) 40vw, 80vw"
              imgClassName="object-contain drop-shadow-[0_40px_40px_rgb(43_38_34/0.28)]"
            />
          </div>
          <div>
            <nav aria-label="Fil d’Ariane" className="text-sm text-forest/85">
              <ol className="flex flex-wrap gap-1.5">
                <li><Link to="/" className="underline-offset-4 hover:underline">Accueil</Link> /</li>
                <li><Link to="/rituels" className="underline-offset-4 hover:underline">Rituels</Link> /</li>
                <li aria-current="page">{product.name}</li>
              </ol>
            </nav>
            <h1 className="mt-4 text-forest">
              <ProductName product={product} className="text-[clamp(4rem,2.5rem+6vw,8rem)]" />
            </h1>
            <p className="font-display mt-3 text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] font-semibold leading-tight text-forest">
              {product.slogan}
            </p>
            <p className="mt-5 max-w-lg text-lg text-ink">{product.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge tone="forest">{product.claim}</Badge>
              <span className="text-forest">{PACK.sticks} sticks de {PACK.stickWeightG} g</span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Price cents={product.price} className="text-4xl font-bold text-forest" />
              <QuantitySelector label={`Quantité de boîtes ${product.name}`} value={quantity} onChange={setQuantity} min={1} max={24} />
              <AddToCartButton product={product} quantity={quantity} size="lg" />
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-forest">
              <Truck aria-hidden="true" className="size-4" />
              Livraison {formatPrice(SHIPPING.fee)}, offerte dès {formatPrice(SHIPPING.freeFrom)} d’achat.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="vedettes-title">
        <Container>
          <h2 id="vedettes-title" className="display-md">
            Les ingrédients vedettes
          </h2>
          <Reveal as="ul" stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {product.featured.map((ingredientId) => (
              <li key={ingredientId}>
                <Link
                  to={`/ingredients#${ingredientId}`}
                  className="flex h-full flex-col items-center rounded-(--radius-card) bg-cream-deep p-5 text-center transition-colors hover:bg-white"
                >
                  <IngredientIllustration id={ingredientId} className="size-20" />
                  <span className="label mt-3 text-xl font-bold text-forest">{ingredients[ingredientId].name}</span>
                </Link>
              </li>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream-deep py-20 lg:py-28" aria-labelledby="composition-title">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="composition-title" className="display-md">
              Composition
            </h2>
            <p className="label mt-6 text-base text-ink/80">{PACK.legalName}</p>
            <h3 className="mt-6 text-xl">Ingrédients</h3>
            <p className="mt-2 max-w-2xl text-lg leading-relaxed">{product.ingredientsText}</p>
            <p className="mt-4 font-semibold text-forest">{product.allergens}</p>
            <div className="mt-8 w-44">
              <NutriScore />
            </div>
          </div>
          <dl className="grid gap-4 self-start sm:grid-cols-2 lg:grid-cols-1">
            {facts.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-cream p-5">
                <dt className="label flex items-center gap-3 text-lg font-bold text-forest">
                  <Icon aria-hidden="true" className="size-6 shrink-0 text-terracotta-dark" />
                  {title}
                </dt>
                <dd className="mt-1 pl-9 text-ink/90">{text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-label={`Univers ${product.name}`} className="py-20 lg:py-28">
        <Container className="grid gap-6 md:grid-cols-2">
          {ambiance[id].map((item) => (
            <Reveal key={item.key}>
              <ResponsiveImage
                image={photo(item.key)}
                alt={item.alt}
                sizes="(min-width: 768px) 34rem, 92vw"
                className="aspect-[4/5] rounded-(--radius-card)"
                layout="fill"
              />
            </Reveal>
          ))}
        </Container>
      </section>

      <section style={{ backgroundColor: other.theme.bg }} className="overflow-hidden" aria-labelledby="autre-title">
        <Container className="grid items-center gap-8 py-16 md:grid-cols-[1fr_auto] lg:py-20">
          <div>
            <h2 id="autre-title" className="display-md">
              Découvrir l’autre rituel
            </h2>
            <p className="mt-4 text-forest">
              <ProductName product={other} className="text-4xl" />
            </p>
            <p className="font-display mt-2 max-w-md text-xl text-forest">{other.slogan}</p>
            <ButtonLink to={other.path} variant="secondary" className="mt-6">
              Voir {other.name}
            </ButtonLink>
          </div>
          <ResponsiveImage
            image={cutout(other.id === 'rebelle' ? 'rebelle-stick' : 'reconfort-stick')}
            alt=""
            sizes="9rem"
            className="mx-auto w-28 rotate-12 md:w-36"
            imgClassName="object-contain drop-shadow-[0_30px_30px_rgb(43_38_34/0.25)]"
          />
        </Container>
      </section>
    </>
  )
}
