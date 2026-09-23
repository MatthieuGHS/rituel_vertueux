import { Truck } from 'lucide-react'
import { formatPrice } from '../../lib/format'
import { remainingForFreeShipping, SHIPPING } from '../../lib/loyalty'

/** Jauge « Plus que X € pour la livraison offerte » (calculée sur les produits après remise). */
export function FreeShippingGauge({ productsTotal }: { productsTotal: number }) {
  const remaining = remainingForFreeShipping(productsTotal)
  const progress = Math.min(1, productsTotal / SHIPPING.freeFrom)
  return (
    <div className="rounded-2xl bg-cream-deep p-4">
      <p className="flex items-center gap-2 text-[0.95rem] text-forest" aria-live="polite">
        <Truck aria-hidden="true" className="size-5 shrink-0 text-terracotta-dark" />
        {remaining > 0 ? (
          <span>
            Plus que <strong className="font-semibold">{formatPrice(remaining)}</strong> pour la livraison offerte
          </span>
        ) : (
          <strong className="font-semibold">Livraison offerte</strong>
        )}
      </p>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-white"
        role="progressbar"
        aria-label="Progression vers la livraison offerte"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className="h-full origin-left rounded-full bg-terracotta transition-transform duration-500 ease-(--ease-soft)"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  )
}
