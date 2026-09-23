import { ShoppingBag } from 'lucide-react'
import { CartLines } from '../components/sections/CartLines'
import { OrderSummary } from '../components/sections/OrderSummary'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { FreeShippingGauge } from '../components/ui/FreeShippingGauge'
import { computeTotals } from '../lib/loyalty'
import { useSeo } from '../lib/seo'
import { useCart } from '../store/cart'

export default function Panier() {
  useSeo('Panier', 'Votre panier Rituel Vertueux : quantités, sous-total et frais de livraison. Site de démonstration, aucune commande réelle.')
  const lines = useCart((state) => state.lines)
  const totals = computeTotals(lines)

  return (
    <Container className="pb-24 pt-10 lg:pt-16">
      <h1 className="display-lg">Votre panier</h1>
      {lines.length === 0 ? (
        <div className="mt-12 flex flex-col items-start gap-5 rounded-(--radius-card) bg-cream-deep p-10">
          <ShoppingBag aria-hidden="true" className="size-10 text-terracotta" strokeWidth={1.6} />
          <p className="font-display text-2xl text-forest">Votre panier est vide.</p>
          <p className="text-ink/85">Commencez par choisir votre rituel.</p>
          <ButtonLink to="/boutique">Voir la boutique</ButtonLink>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <section aria-label="Articles">
            <CartLines />
          </section>
          <aside className="space-y-5 self-start rounded-(--radius-card) bg-cream-deep p-6 sm:p-8 lg:sticky lg:top-28" aria-labelledby="recap-title">
            <h2 id="recap-title" className="text-2xl">
              Récapitulatif
            </h2>
            <FreeShippingGauge productsTotal={totals.productsTotal} />
            <OrderSummary totals={totals} />
            <p className="text-sm text-ink/75">Les récompenses fidélité s’appliquent à l’étape suivante, une fois connecté.</p>
            <ButtonLink to="/commande" size="lg" className="w-full">
              Passer commande
            </ButtonLink>
          </aside>
        </div>
      )}
    </Container>
  )
}
