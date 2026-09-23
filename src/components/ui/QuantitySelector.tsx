import { Minus, Plus } from 'lucide-react'
import { cn } from '../../lib/cn'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label: string
  size?: 'md' | 'sm'
  className?: string
}

export function QuantitySelector({ value, onChange, min = 1, max = 24, label, size = 'md', className }: QuantitySelectorProps) {
  const btn = cn(
    'inline-flex items-center justify-center rounded-full text-forest transition-colors hover:bg-cream disabled:opacity-40',
    size === 'md' ? 'size-11' : 'size-10',
  )
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('inline-flex items-center rounded-full border-2 border-forest/15 bg-white/60 p-0.5', className)}
    >
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Diminuer la quantité">
        <Minus aria-hidden="true" className="size-4" />
      </button>
      <output aria-live="polite" className={cn('label min-w-8 text-center font-bold tabular-nums text-forest', size === 'md' ? 'text-xl' : 'text-lg')}>
        {value}
      </output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Augmenter la quantité">
        <Plus aria-hidden="true" className="size-4" />
      </button>
    </div>
  )
}
