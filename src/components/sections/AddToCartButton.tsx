import { ShoppingBag } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Product } from '../../data/products'
import { useAddToCart } from '../../hooks/useAddToCart'
import { Button } from '../ui/Button'

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  size?: 'md' | 'lg'
  className?: string
  label?: string
  variant?: 'primary' | 'secondary' | 'light'
}

export function AddToCartButton({ product, quantity = 1, size = 'md', className, label = 'Ajouter au panier', variant = 'primary' }: AddToCartButtonProps) {
  const addToCart = useAddToCart()
  const ref = useRef<HTMLButtonElement>(null)
  const [busy, setBusy] = useState(false)

  return (
    <Button
      ref={ref}
      size={size}
      variant={variant}
      className={className}
      disabled={busy}
      aria-label={`${label} : ${product.name}${quantity > 1 ? `, ${quantity} boîtes` : ''}`}
      onClick={async () => {
        setBusy(true)
        await addToCart(product.id, quantity, ref.current)
        setBusy(false)
      }}
    >
      <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={2} />
      {label}
    </Button>
  )
}
