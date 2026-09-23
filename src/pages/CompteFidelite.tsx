import { Check, Lock } from 'lucide-react'
import { AccountNav } from '../components/sections/AccountNav'
import { LoyaltyProgress } from '../components/sections/LoyaltyProgress'
import { Container } from '../components/ui/Container'
import { formatDate, formatNumber } from '../lib/format'
import { levelFor, LOYALTY } from '../lib/loyalty'
import { cn } from '../lib/cn'
import { useSeo } from '../lib/seo'
import { useAuth } from '../store/auth'
import { useAccountOrders, useLedger } from '../store/orders'

export default function CompteFidelite() {
  useSeo('Programme de fidélité', 'Règles du programme de fidélité Rituel Vertueux : 10 points par euro, récompenses à 250, 500 et 1 000 points, niveaux Découverte, Initié et Vertueux.')
  const session = useAuth((state) => state.session)!
  const orders = useAccountOrders(session.email)
  const ledger = useLedger(session.email)
  const { current } = levelFor(ledger.lifetime)

  return (
    <Container className="pb-24 pt-10 lg:pt-16">
      <h1 className="display-lg">Programme de fidélité</h1>
      <div className="mt-8">
        <AccountNav />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-(--radius-card) bg-reconfort p-7" aria-labelledby="solde-title">
          <h2 id="solde-title" className="label text-lg text-forest">
            Votre solde
          </h2>
          <p className="label mt-1 text-6xl font-bold tabular-nums text-forest">{formatNumber(ledger.balance)} pts</p>
          <div className="mt-6">
            <LoyaltyProgress balance={ledger.balance} />
          </div>
        </section>
        <section className="rounded-(--radius-card) bg-cream-deep p-7" aria-labelledby="regles-title">
          <h2 id="regles-title" className="text-2xl">
            Comment ça marche
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/90">
            <li>{LOYALTY.pointsPerEuro} points par euro dépensé en produits, après remise et hors livraison (arrondi à l’inférieur).</li>
            <li>Une seule récompense par commande. Les points sont déduits à la validation.</li>
            <li>Votre niveau dépend du total de points gagnés, même après utilisation.</li>
            <li>Les commandes en invité ne rapportent pas de points.</li>
          </ul>
        </section>
      </div>

      <section className="mt-14" aria-labelledby="recompenses-title">
        <h2 id="recompenses-title" className="display-md">
          Récompenses
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {LOYALTY.rewards.map((reward) => {
            const unlocked = ledger.balance >= reward.cost
            return (
              <li key={reward.id} className={cn('rounded-(--radius-card) p-6', unlocked ? 'bg-forest text-cream' : 'border-2 border-dashed border-forest/25')}>
                <p className={cn('label flex items-center gap-2 text-lg font-bold', unlocked ? 'text-reconfort' : 'text-ink/75')}>
                  {unlocked ? <Check aria-hidden="true" className="size-5" /> : <Lock aria-hidden="true" className="size-5" />}
                  {formatNumber(reward.cost)} points
                  <span className="sr-only">{unlocked ? ', disponible' : ', verrouillée'}</span>
                </p>
                <h3 className={cn('mt-3 text-2xl', unlocked && 'text-cream')}>{reward.title}</h3>
                <p className={cn('mt-2', unlocked ? 'text-cream/85' : 'text-ink/85')}>{reward.description}</p>
                {!unlocked && <p className="mt-3 text-sm text-ink/80">Encore {formatNumber(reward.cost - ledger.balance)} points.</p>}
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="niveaux-title">
        <h2 id="niveaux-title" className="display-md">
          Niveaux
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {LOYALTY.levels.map((level, index) => {
            const nextLevel = LOYALTY.levels[index + 1]
            const isCurrent = level.id === current.id
            return (
              <li key={level.id} aria-current={isCurrent ? 'step' : undefined} className={cn('rounded-(--radius-card) p-6', isCurrent ? 'bg-rebelle' : 'bg-cream-deep')}>
                <p className="label text-sm text-ink/80">
                  {nextLevel ? `${formatNumber(level.min)} à ${formatNumber(nextLevel.min - 1)} pts cumulés` : `${formatNumber(level.min)} pts cumulés et plus`}
                </p>
                <h3 className="mt-2 text-2xl">{level.name}</h3>
                {isCurrent && <p className="mt-2 font-medium text-forest">Votre niveau actuel ({formatNumber(ledger.lifetime)} pts cumulés)</p>}
              </li>
            )
          })}
        </ol>
      </section>

      <section className="mt-14" aria-labelledby="historique-title">
        <h2 id="historique-title" className="display-md">
          Historique des points
        </h2>
        <div className="mt-6 overflow-x-auto rounded-(--radius-card) bg-cream-deep" tabIndex={0} role="region" aria-labelledby="historique-title">
          <table className="w-full min-w-[32rem] text-left">
            <thead>
              <tr className="border-b border-forest/15 text-sm text-ink/75">
                <th scope="col" className="p-4 font-medium">Commande</th>
                <th scope="col" className="p-4 font-medium">Date</th>
                <th scope="col" className="p-4 text-right font-medium">Gagnés</th>
                <th scope="col" className="p-4 text-right font-medium">Utilisés</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.number} className="border-b border-forest/10 last:border-0">
                  <td className="label p-4 font-bold text-forest">{order.number}</td>
                  <td className="p-4">{formatDate(order.date)}</td>
                  <td className="p-4 text-right tabular-nums text-success">+{order.pointsEarned}</td>
                  <td className="p-4 text-right tabular-nums">{order.pointsSpent ? `−${order.pointsSpent}` : '—'}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-forest">
                <th scope="row" colSpan={2} className="p-4 text-left">Solde</th>
                <td className="p-4 text-right tabular-nums">+{formatNumber(ledger.lifetime)}</td>
                <td className="p-4 text-right tabular-nums">−{formatNumber(ledger.spent)} = {formatNumber(ledger.balance)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </Container>
  )
}
