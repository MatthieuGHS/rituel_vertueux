import { cutout } from '../../../assets/images'
import type { Product } from '../../../data/products'
import { Badge } from '../../ui/Badge'
import { ButtonLink } from '../../ui/Button'
import { Price } from '../../ui/Price'
import { ProductName } from '../../ui/ProductName'
import { ResponsiveImage } from '../../ui/ResponsiveImage'

/** Texte d'un rituel, partagé entre la version statique et la version pinnée. */
export function RitualText({ product }: { product: Product }) {
  return (
    <div>
      <h3 className="text-forest">
        <ProductName product={product} className="text-[clamp(3.5rem,2rem+6vw,7.5rem)]" />
      </h3>
      <p className="font-display mt-4 max-w-md text-[clamp(1.4rem,1.1rem+1vw,2rem)] font-semibold leading-tight text-forest">
        {product.slogan}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Mots-clés">
        {product.keywords.map((keyword) => (
          <li key={keyword} className="rounded-full border border-forest/25 bg-cream/55 px-3.5 py-1.5 text-[0.95rem] text-forest">
            {keyword}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Badge tone="forest">{product.claim}</Badge>
        <Price cents={product.price} className="text-2xl font-bold text-forest" />
      </div>
      <ButtonLink to={product.path} className="mt-8" variant="secondary">
        Découvrir {product.name}
      </ButtonLink>
    </div>
  )
}

export function RitualStick({ product, className }: { product: Product; className?: string }) {
  return (
    <ResponsiveImage
      image={cutout(product.id === 'rebelle' ? 'rebelle-stick' : 'reconfort-stick')}
      alt={`Stick ${product.name}`}
      sizes="(min-width: 1024px) 13rem, 34vw"
      className={className}
      imgClassName="object-contain drop-shadow-[0_40px_40px_rgb(43_38_34/0.28)]"
    />
  )
}
