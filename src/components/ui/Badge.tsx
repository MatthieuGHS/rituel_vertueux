import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface BadgeProps {
  children: ReactNode
  tone?: 'cream' | 'forest' | 'rebelle' | 'reconfort' | 'outline'
  className?: string
}

const tones = {
  cream: 'bg-cream text-forest',
  forest: 'bg-forest text-cream',
  rebelle: 'bg-cream text-rebelle-ink',
  reconfort: 'bg-cream text-forest',
  outline: 'border border-current',
}

/** Étiquette courte en capitales condensées (allégation, niveau, statut). */
export function Badge({ children, tone = 'cream', className }: BadgeProps) {
  return (
    <span className={cn('label inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[0.95rem]', tones[tone], className)}>
      {children}
    </span>
  )
}
