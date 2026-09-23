import { X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { cn } from '../../lib/cn'
import { lockScroll } from '../../lib/smooth-scroll'
import { InstagramIcon, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../ui/InstagramIcon'
import { Logo } from '../ui/Logo'
import { mainNav, secondaryNav } from './nav'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

/** Menu plein écran (mobile/tablette). Animation CSS : transform + opacity, en cascade. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const close = useCallback(() => onClose(), [onClose])
  useFocusTrap(ref, open, close)

  useEffect(() => {
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  // Ferme le menu quand la route change.
  const lastPath = useRef(pathname)
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname
      onClose()
    }
  }, [pathname, onClose])

  const links = [...mainNav, ...secondaryNav]

  return (
    <div
      id="menu-mobile"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        'fixed inset-0 z-(--z-menu) flex flex-col overflow-y-auto bg-forest text-cream transition-[opacity,visibility] duration-300 lg:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
      data-lenis-prevent
    >
      <div className="flex h-18 items-center justify-between px-4 sm:px-6">
        <Logo variant="mark" decorative className="size-10" veinColor="var(--color-forest)" />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-11 items-center justify-center rounded-full text-cream hover:bg-cream/10"
          data-autofocus
        >
          <X aria-hidden="true" className="size-6" />
          <span className="sr-only">Fermer le menu</span>
        </button>
      </div>
      <nav aria-label="Navigation mobile" className="flex flex-1 flex-col justify-center px-6 py-8 sm:px-10">
        <ul className="space-y-1">
          {links.map((item, index) => (
            <li
              key={item.to}
              className={cn(
                'transition-[transform,opacity] duration-500 ease-(--ease-soft)',
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
              )}
              style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'font-display inline-flex min-h-12 items-center text-[2.1rem] leading-tight font-semibold sm:text-5xl',
                    isActive ? 'text-rebelle' : 'text-cream',
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-between border-t border-cream/15 px-6 py-5 text-sm sm:px-10">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-cream">
          <InstagramIcon size={20} />
          {INSTAGRAM_HANDLE}
        </a>
        <span className="text-cream/80">Votre bien-être devient un rituel</span>
      </div>
    </div>
  )
}
