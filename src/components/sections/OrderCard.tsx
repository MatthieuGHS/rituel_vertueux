import { products } from '../../data/products'
import { formatDate, formatPrice } from '../../lib/format'
import { getReward } from '../../lib/loyalty'
import type { Order } from '../../store/orders'
import { OrderSummary } from './OrderSummary'

export function OrderCard({ order, detailed = false }: { order: Order; detailed?: boolean }) {
  const count = order.lines.reduce((sum, line) => sum + line.quantity, 0)
  return (
    <article className="rounded-(--radius-card) bg-cream-deep p-6 sm:p-7">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="label text-2xl font-bold text-forest">{order.number}</h3>
        <p className="text-sm text-ink/80">
          <time dateTime={order.date}>{formatDate(order.date)}</time>
        </p>
      </header>
      <p className="mt-2 text-ink/90">
        {order.lines.map((line) => `${line.quantity} × ${products[line.productId].name}`).join(', ')}
        {order.reward?.id === 'freeBox' && order.reward.productId && `, + 1 ${products[order.reward.productId].name} offerte`}
      </p>
      {!detailed && (
        <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span>
            {count} boîte{count > 1 ? 's' : ''}, <strong className="font-semibold">{formatPrice(order.totals.total)}</strong>
          </span>
          <span className="text-success">+{order.pointsEarned} pts</span>
          {order.pointsSpent > 0 && <span className="text-ink/80">−{order.pointsSpent} pts ({getReward(order.reward!.id).title})</span>}
        </p>
      )}
      {detailed && (
        <div className="mt-5 grid gap-6 md:grid-cols-[1fr_1fr]">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Articles de la commande {order.number}</caption>
            <thead>
              <tr className="border-b border-forest/15 text-ink/75">
                <th scope="col" className="py-2 font-medium">Article</th>
                <th scope="col" className="py-2 text-right font-medium">Qté</th>
                <th scope="col" className="py-2 text-right font-medium">Montant</th>
              </tr>
            </thead>
            <tbody>
              {order.lines.map((line) => (
                <tr key={line.productId} className="border-b border-forest/10">
                  <td className="py-2">{products[line.productId].name}</td>
                  <td className="py-2 text-right tabular-nums">{line.quantity}</td>
                  <td className="py-2 text-right tabular-nums">{formatPrice(products[line.productId].price * line.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <OrderSummary totals={order.totals} reward={order.reward} />
            <p className="mt-4 text-sm">
              <span className="text-success">+{order.pointsEarned} points gagnés</span>
              {order.pointsSpent > 0 && (
                <span className="text-ink/80">, {order.pointsSpent} points utilisés ({getReward(order.reward!.id).title})</span>
              )}
            </p>
            <p className="mt-1 text-sm text-ink/75">
              Livraison {order.shippingMethod === 'relais' ? 'en point relais' : 'à domicile'}, {order.customer.city}.
            </p>
          </div>
        </div>
      )}
    </article>
  )
}
