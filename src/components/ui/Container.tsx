import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ContainerProps {
  as?: ElementType
  className?: string
  children: ReactNode
  size?: 'default' | 'narrow' | 'wide'
}

const widths = { default: 'max-w-6xl', narrow: 'max-w-3xl', wide: 'max-w-7xl' }

export function Container({ as: Tag = 'div', className, children, size = 'default' }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', widths[size], className)}>{children}</Tag>
}
