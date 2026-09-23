import { CheckCircle2, Info } from 'lucide-react'
import { Navigate } from 'react-router'
import { OrderSummary } from '../components/sections/OrderSummary'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { products } from '../data/products'
import { formatDate, formatNumber } from '../lib/format'
import { useSeo } from '../lib/seo'
import { useLedger, useOrders } from '../store/orders'

export default function Confirmation() {
  useSeo('Commande confirmée', 'Récapitulatif de votre commande de démonstration Rituel Vertueux.')
  const order = useOrders((state) => state.placed.find((o) => o.number === state.lastOrderNumber))
  const ledger = useLedger(order?.accountEmail ?? undefined)

  if (!order) return <Navigate to="/boutique" replace />

  return (
    <Container size="narrow" className="pb-24 pt-10 lg:pt-16">
      <CheckCircle2 aria-hidden="true" className="size-14 text-success" />
      <h1 className="display-lg mt-4">Merci {order.customer.firstName}, votre commande est enregistrée</h1>
      <p className="mt-4 text-lg text-ink/90">
        Commande <strong className="label text-xl text-forest">{order.number}</strong> du {formatDate(order.date)}.
      </p>

      <p className="mt-6 flex items-start gap-3 rounded-2xl bg-reconfort p-5 text-forest" role="note">
        <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        Rappel : ceci est un site de démonstration. Rien n’a été réellement commandé, payé ni expédié.
      </p>

      <section className="mt-10 rounded-(--radius-card) bg-cream-deep p-6 sm:p-8" aria-labelledby="recap-title">
        <h2 id="recap-title" className="text-2xl">
          Récapitulatif
        </h2>
        <ul className="mt-4 space-y-1">
          {order.lines.map((line) => (
            <li key={line.productId}>
              {line.quantity} × {products[line.productId].name}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <OrderSummary totals={order.totals} reward={order.reward} />
        </div>
        <p className="mt-5 text-sm text-ink/80">
          Livraison {order.shippingMethod === 'relais' ? 'en point relais' : 'à domicile'} : {order.customer.address}, {order.customer.postalCode}{' '}
          {order.customer.city}.
        </p>
      </section>

      {order.accountEmail ? (
        <section className="mt-6 rounded-(--radius-card) bg-forest p-6 text-cream sm:p-8" aria-labelledby="points-title">
          <h2 id="points-title" className="text-2xl text-cream">
            +{formatNumber(order.pointsEarned)} points gagnés
          </h2>
          <p className="mt-2 text-cream/85">
            {order.pointsSpent > 0 && `${formatNumber(order.pointsSpent)} points utilisés pour votre récompense. `}
            Nouveau solde : <strong className="text-cream">{formatNumber(ledger.balance)} points</strong>.
          </p>
          <ButtonLink to="/compte" variant="light" className="mt-5">
            Voir mon compte
          </ButtonLink>
        </section>
      ) : (
        <p className="mt-6 text-ink/85">
          Commande passée en invité : aucun point n’a été crédité. Connectez-vous au compte de démonstration pour tester le programme de fidélité.
        </p>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink to="/">Retour à l’accueil</ButtonLink>
        <ButtonLink to="/recettes" variant="secondary">
          Idées de recettes
        </ButtonLink>
      </div>
    </Container>
  )
}
