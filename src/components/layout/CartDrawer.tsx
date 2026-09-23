import { ShoppingBag, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { cn } from '../../lib/cn'
import { formatPrice } from '../../lib/format'
import { computeTotals } from '../../lib/loyalty'
import { lockScroll } from '../../lib/smooth-scroll'
import { useCart, useCartCount } from '../../store/cart'
import { CartLines } from '../sections/CartLines'
import { ButtonLink } from '../ui/Button'
import { FreeShippingGauge } from '../ui/FreeShippingGauge'

export function CartDrawer() {
  const open = useCart((state) => state.drawerOpen)
  const close = useCart((state) => state.closeDrawer)
  const lines = useCart((state) => state.lines)
  const count = useCartCount()
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const totals = computeTotals(lines)
  const onClose = useCallback(() => close(), [close])
  useFocusTrap(ref, open, onClose)

  useEffect(() => {
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  useEffect(() => {
    close()
    // oxlint-disable-next-line react/exhaustive-effect-dependencies -- déclenché volontairement à chaque changement de route
  }, [pathname, close])

  return (
    <div className={cn('fixed inset-0 z-(--z-drawer)', open ? 'visible' : 'invisible')} inert={!open}>
      <div
        aria-hidden="true"
        onClick={close}
        className={cn('absolute inset-0 bg-ink/45 transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        data-lenis-prevent
        className={cn(
          'absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-(--shadow-drawer) transition-transform duration-500 ease-(--ease-soft)',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-forest/10 px-5 py-4">
          <h2 id="cart-title" className="text-2xl">
            Votre panier <span className="label text-lg text-ink/70">({count})</span>
          </h2>
          <button
            type="button"
            onClick={close}
            className="inline-flex size-11 items-center justify-center rounded-full text-forest hover:bg-cream-deep"
            data-autofocus
          >
            <X aria-hidden="true" className="size-6" />
            <span className="sr-only">Fermer le panier</span>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-cream-deep text-terracotta">
              <ShoppingBag aria-hidden="true" className="size-9" strokeWidth={1.6} />
            </span>
            <p className="font-display text-2xl text-forest">Votre panier est vide</p>
            <p className="text-ink/80">Choisissez votre rituel : [RE]BELLE ou [RE]CONFORT.</p>
            <ButtonLink to="/boutique">Voir la boutique</ButtonLink>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <CartLines />
            </div>
            <div className="space-y-4 border-t border-forest/10 px-5 pb-6 pt-4">
              <FreeShippingGauge productsTotal={totals.productsTotal} />
              <dl className="flex items-baseline justify-between">
                <dt className="text-ink/80">Sous-total</dt>
                <dd className="label text-2xl font-bold tabular-nums text-forest">{formatPrice(totals.productsSubtotal)}</dd>
              </dl>
              <p className="text-sm text-ink/70">Livraison et récompenses fidélité calculées à l’étape suivante.</p>
              <div className="grid gap-2">
                <ButtonLink to="/commande" size="lg">
                  Commander
                </ButtonLink>
                <ButtonLink to="/panier" variant="ghost">
                  Voir le panier détaillé
                </ButtonLink>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
