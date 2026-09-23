import { Award, Gift, Package } from 'lucide-react'
import { Link } from 'react-router'
import { AccountNav } from '../components/sections/AccountNav'
import { LoyaltyProgress } from '../components/sections/LoyaltyProgress'
import { OrderCard } from '../components/sections/OrderCard'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { formatNumber } from '../lib/format'
import { availableRewards, levelFor } from '../lib/loyalty'
import { useSeo } from '../lib/seo'
import { useAuth } from '../store/auth'
import { useAccountOrders, useLedger } from '../store/orders'

export default function Compte() {
  useSeo('Mon compte', 'Tableau de bord du compte de démonstration : solde de points, niveau de fidélité et dernières commandes.')
  const session = useAuth((state) => state.session)!
  const orders = useAccountOrders(session.email)
  const ledger = useLedger(session.email)
  const { current, next } = levelFor(ledger.lifetime)
  const rewards = availableRewards(ledger.balance)

  return (
    <Container className="pb-24 pt-10 lg:pt-16">
      <h1 className="display-lg">Bonjour {session.profile.firstName}</h1>
      <p className="mt-3 text-lg text-ink/85">Compte de démonstration, données fictives.</p>
      <div className="mt-8">
        <AccountNav />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <section className="rounded-(--radius-card) bg-reconfort p-7 lg:col-span-2" aria-labelledby="solde-title">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 id="solde-title" className="label text-lg text-forest">
                Solde de points
              </h2>
              <p className="label mt-1 text-6xl font-bold tabular-nums text-forest">{formatNumber(ledger.balance)}</p>
            </div>
            <div className="rounded-2xl bg-cream px-5 py-3 text-right">
              <p className="label text-sm text-ink/75">Niveau</p>
              <p className="font-display text-2xl font-semibold text-forest">{current.name}</p>
              <p className="text-xs text-ink/75">
                {next ? `${formatNumber(next.min - ledger.lifetime)} pts cumulés avant ${next.name}` : 'Niveau maximum atteint'}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <LoyaltyProgress balance={ledger.balance} />
          </div>
          <p className="text-sm text-forest">
            {formatNumber(ledger.lifetime)} points cumulés depuis l’ouverture du compte, {formatNumber(ledger.spent)} utilisés.
          </p>
        </section>

        <section className="flex flex-col rounded-(--radius-card) bg-cream-deep p-7" aria-labelledby="recompenses-title">
          <Gift aria-hidden="true" className="size-7 text-terracotta-dark" />
          <h2 id="recompenses-title" className="mt-3 text-2xl">
            {rewards.length > 0 ? `${rewards.length} récompense${rewards.length > 1 ? 's' : ''} disponible${rewards.length > 1 ? 's' : ''}` : 'Aucune récompense pour l’instant'}
          </h2>
          <ul className="mt-3 space-y-1 text-ink/90">
            {rewards.map((reward) => (
              <li key={reward.id}>{reward.title}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink/75">Une récompense par commande, à choisir au moment de commander.</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            <ButtonLink to="/boutique">Commander</ButtonLink>
            <ButtonLink to="/compte/fidelite" variant="ghost">
              Détails
            </ButtonLink>
          </div>
        </section>
      </div>

      <section className="mt-14" aria-labelledby="dernieres-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="dernieres-title" className="display-md flex items-center gap-3">
            <Package aria-hidden="true" className="size-8 text-terracotta" />
            Dernières commandes
          </h2>
          <Link to="/compte/commandes" className="font-medium text-terracotta-dark underline underline-offset-4">
            Tout l’historique ({orders.length})
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {orders.slice(0, 2).map((order) => (
            <li key={order.number}>
              <OrderCard order={order} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 flex flex-wrap items-center gap-4 rounded-(--radius-card) border-2 border-dashed border-forest/20 p-6" aria-label="Profil">
        <Award aria-hidden="true" className="size-6 text-terracotta-dark" />
        <p className="text-ink/90">
          {session.profile.firstName} {session.profile.lastName}, {session.profile.email}, {session.profile.address}, {session.profile.postalCode}{' '}
          {session.profile.city}
        </p>
      </section>
    </Container>
  )
}
