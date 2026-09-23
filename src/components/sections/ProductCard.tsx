import { Link } from 'react-router'
import { cutout } from '../../assets/images'
import type { Product } from '../../data/products'
import { Badge } from '../ui/Badge'
import { Price } from '../ui/Price'
import { ProductName } from '../ui/ProductName'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { AddToCartButton } from './AddToCartButton'

interface ProductCardProps {
  product: Product
  headingLevel?: 'h2' | 'h3'
}

/** Carte produit (boutique, gamme, accueil) : boîte détourée sur fond d'univers. */
export function ProductCard({ product, headingLevel: Heading = 'h2' }: ProductCardProps) {
  const box = cutout(product.id === 'rebelle' ? 'rebelle-box' : 'reconfort-box')
  return (
    <article className="group flex flex-col overflow-hidden rounded-(--radius-card) bg-cream-deep">
      <Link
        to={product.path}
        className="relative flex aspect-[5/4] items-end justify-center overflow-hidden"
        style={{ backgroundColor: product.theme.bg }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <span
          className="absolute -bottom-1/4 left-1/2 aspect-square w-[85%] -translate-x-1/2 rounded-full opacity-60"
          style={{ backgroundColor: product.theme.deep }}
        />
        <ResponsiveImage
          image={box}
          alt=""
          sizes="(min-width: 1024px) 16rem, 45vw"
          className="relative mb-[-3%] w-[34%] transition-transform duration-500 ease-(--ease-soft) group-hover:-translate-y-2 group-hover:rotate-[-2deg]"
          imgClassName="object-contain drop-shadow-[0_24px_30px_rgb(43_38_34/0.28)]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Heading>
            <Link to={product.path} className="text-forest hover:text-terracotta-dark">
              <ProductName product={product} className="text-4xl sm:text-5xl" />
            </Link>
          </Heading>
          <Price cents={product.price} className="text-3xl font-bold text-forest" />
        </div>
        <p className="font-display text-xl leading-snug text-forest">{product.slogan}</p>
        <p className="text-ink/85">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="forest">{product.claim}</Badge>
          <Badge tone="outline" className="text-ink/80">10 sticks de 18 g</Badge>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          <AddToCartButton product={product} />
          <Link to={product.path} className="inline-flex min-h-12 items-center px-2 font-medium text-terracotta-dark underline-offset-4 hover:underline">
            Voir la fiche
          </Link>
        </div>
      </div>
    </article>
  )
}
