import type { ReactNode } from 'react'
import { products } from '../../data/products'
import { formatPrice } from '../../lib/format'
import { getReward, type AppliedReward, type OrderTotals } from '../../lib/loyalty'

interface OrderSummaryProps {
  totals: OrderTotals
  reward?: AppliedReward | null
  showPoints?: boolean
  children?: ReactNode
}

/** Récapitulatif des montants (panier, commande, confirmation, historique). */
export function OrderSummary({ totals, reward, showPoints = false, children }: OrderSummaryProps) {
  return (
    <dl className="space-y-3 text-[0.975rem]">
      <div className="flex justify-between gap-4">
        <dt className="text-ink/85">Produits</dt>
        <dd className="tabular-nums">{formatPrice(totals.productsSubtotal)}</dd>
      </div>
      {totals.discount > 0 && (
        <div className="flex justify-between gap-4 text-success">
          <dt>Remise fidélité (−5 %)</dt>
          <dd className="tabular-nums">−{formatPrice(totals.discount)}</dd>
        </div>
      )}
      {reward?.id === 'freeBox' && reward.productId && (
        <div className="flex justify-between gap-4 text-success">
          <dt>1 boîte {products[reward.productId].name} offerte</dt>
          <dd className="tabular-nums">{formatPrice(0)}</dd>
        </div>
      )}
      <div className="flex justify-between gap-4">
        <dt className="text-ink/85">
          Livraison
          {totals.freeShippingReason === 'reward' && ' (récompense fidélité)'}
          {totals.freeShippingReason === 'threshold' && ' (offerte dès 30 €)'}
        </dt>
        <dd className="tabular-nums">{totals.shipping === 0 ? 'Offerte' : formatPrice(totals.shipping)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4 border-t border-forest/15 pt-3">
        <dt className="font-semibold text-forest">Total TTC</dt>
        <dd className="label text-3xl font-bold tabular-nums text-forest">{formatPrice(totals.total)}</dd>
      </div>
      {showPoints && (
        <div className="flex justify-between gap-4 text-sm text-ink/80">
          <dt>Points fidélité</dt>
          <dd>
            +{totals.pointsEarned} pts
            {reward && ` · −${getReward(reward.id).cost} pts utilisés`}
          </dd>
        </div>
      )}
      {children}
    </dl>
  )
}
