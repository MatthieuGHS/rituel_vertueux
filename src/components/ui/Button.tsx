import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light'
type Size = 'md' | 'lg'

/**
 * Libellés en Barlow Condensed 700 ≥ 19 px : texte « large » au sens WCAG,
 * ce qui rend le blanc sur terracotta (3,7:1) conforme.
 */
const base =
  'label inline-flex items-center justify-center gap-2 rounded-full font-bold text-[1.2rem] tracking-[0.07em] transition-[background-color,color,border-color,transform] duration-200 ease-(--ease-soft) active:scale-[0.97] disabled:opacity-45 disabled:active:scale-100'

const variants: Record<Variant, string> = {
  primary: 'bg-terracotta text-white hover:bg-terracotta-dark',
  secondary: 'border-2 border-forest text-forest hover:bg-forest hover:text-cream',
  ghost: 'text-forest underline-offset-4 hover:underline',
  light: 'bg-cream text-forest hover:bg-white',
}

const sizes: Record<Size, string> = {
  md: 'min-h-12 px-6',
  lg: 'min-h-14 px-8',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
  ref?: Ref<HTMLButtonElement>
}

export function Button({ variant = 'primary', size = 'md', className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />
}

interface ButtonLinkProps extends LinkProps {
  variant?: Variant
  size?: Size
}

export function ButtonLink({ variant = 'primary', size = 'md', className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, size, typeof className === 'string' ? className : undefined)} {...props} />
}
