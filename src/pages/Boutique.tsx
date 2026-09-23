import { useSearchParams } from 'react-router'
import { photo } from '../assets/images/photos'
import { PageHero } from '../components/sections/PageHero'
import { ProductCard } from '../components/sections/ProductCard'
import { Container } from '../components/ui/Container'
import { isProductId, productList } from '../data/products'
import { formatPrice } from '../lib/format'
import { SHIPPING } from '../lib/loyalty'
import { cn } from '../lib/cn'
import { useSeo } from '../lib/seo'

export default function Boutique() {
  useSeo('Boutique', `Commandez [RE]BELLE et [RE]CONFORT, boîtes de 10 sticks. Livraison offerte dès ${formatPrice(SHIPPING.freeFrom)}. Site de démonstration, aucune commande réelle.`)
  const [params, setParams] = useSearchParams()
  const raw = params.get('rituel') ?? undefined
  const filter = isProductId(raw) ? raw : 'all'
  const visible = productList.filter((product) => filter === 'all' || product.id === filter)

  const options = [{ id: 'all', label: 'Tous les rituels' }, ...productList.map((p) => ({ id: p.id, label: p.name }))]

  return (
    <>
      <PageHero
        title="Boutique"
        intro={
          <p>
            Boîtes de 10 sticks de 18 g. Livraison {formatPrice(SHIPPING.fee)}, offerte dès {formatPrice(SHIPPING.freeFrom)} d’achat.
            Chaque commande rapporte des points de fidélité.
          </p>
        }
        image={photo('duo-cuisine')}
        imageAlt="Les boîtes [RE]BELLE et [RE]CONFORT sur un plan de travail ensoleillé"
      />
      <Container className="pb-24">
        <div role="group" aria-label="Filtrer par rituel" className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setParams(option.id === 'all' ? {} : { rituel: option.id }, { replace: true, preventScrollReset: true })}
              className={cn(
                'label min-h-11 rounded-full border-2 px-5 text-lg font-bold transition-colors',
                filter === option.id ? 'border-forest bg-forest text-cream' : 'border-forest/25 text-forest hover:border-forest',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {visible.length} produit{visible.length > 1 ? 's' : ''} affiché{visible.length > 1 ? 's' : ''}
        </p>
        <div className={cn('mt-10 grid gap-6', visible.length > 1 && 'md:grid-cols-2')}>
          {visible.map((product) => (
            <div key={product.id} className={visible.length === 1 ? 'mx-auto w-full max-w-xl' : undefined}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}
