import { formatPrice } from '../../lib/format'
import { cn } from '../../lib/cn'

export function Price({ cents, className }: { cents: number; className?: string }) {
  return <span className={cn('label tabular-nums', className)}>{formatPrice(cents)}</span>
}
