import type { ElementType } from 'react'
import type { Product } from '../../data/products'
import { cn } from '../../lib/cn'

interface ProductNameProps {
  product: Product
  as?: ElementType
  className?: string
}

/** Nom produit exact : « [RE]BELLE » / « [RE]CONFORT », jamais suivi d'un sous-titre. */
export function ProductName({ product, as: Tag = 'span', className }: ProductNameProps) {
  return (
    <Tag className={cn('font-label font-bold uppercase leading-[0.9] tracking-[0.01em]', className)}>
      [RE]
      {product.suffix}
    </Tag>
  )
}
