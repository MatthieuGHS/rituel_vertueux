import { Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import { cutout } from '../../assets/images'
import { products } from '../../data/products'
import { formatPrice } from '../../lib/format'
import { useCart } from '../../store/cart'
import { ProductName } from '../ui/ProductName'
import { QuantitySelector } from '../ui/QuantitySelector'
import { ResponsiveImage } from '../ui/ResponsiveImage'

/** Lignes du panier, partagées entre le tiroir et la page /panier. */
export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const lines = useCart((state) => state.lines)
  const setQuantity = useCart((state) => state.setQuantity)
  const remove = useCart((state) => state.remove)

  return (
    <ul className="divide-y divide-forest/10">
      {lines.map((line) => {
        const product = products[line.productId]
        return (
          <li key={line.productId} className="flex gap-4 py-5">
            <div
              className="flex h-28 w-20 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: product.theme.bg }}
            >
              <ResponsiveImage
                image={cutout(product.id === 'rebelle' ? 'rebelle-box' : 'reconfort-box')}
                alt=""
                sizes="64px"
                className="w-16"
                imgClassName="object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link to={product.path} onClick={onNavigate} className="text-forest hover:underline">
                    <ProductName product={product} className="text-2xl" />
                  </Link>
                  <p className="text-sm text-ink/75">{formatPrice(product.price)} la boîte de 10 sticks</p>
                </div>
                <p className="label text-lg font-bold tabular-nums text-forest">{formatPrice(product.price * line.quantity)}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <QuantitySelector
                  size="sm"
                  label={`Quantité ${product.name}`}
                  value={line.quantity}
                  min={1}
                  onChange={(value) => setQuantity(product.id, value)}
                />
                <button
                  type="button"
                  onClick={() => remove(product.id)}
                  className="inline-flex size-11 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-cream-deep hover:text-danger"
                >
                  <Trash2 aria-hidden="true" className="size-5" />
                  <span className="sr-only">Retirer {product.name} du panier</span>
                </button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
