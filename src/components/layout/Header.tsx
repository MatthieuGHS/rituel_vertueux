import { Menu, ShoppingBag, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { cn } from '../../lib/cn'
import { useAuth } from '../../store/auth'
import { useCart, useCartCount } from '../../store/cart'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'
import { mainNav } from './nav'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const count = useCartCount()
  const openDrawer = useCart((state) => state.openDrawer)
  const loggedIn = useAuth((state) => state.session !== null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-(--z-header) transition-[background-color,box-shadow,backdrop-filter] duration-300',
          scrolled ? 'bg-cream/85 shadow-[0_1px_0_rgb(43_38_34/0.08)] backdrop-blur-md' : 'bg-cream/0',
        )}
      >
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link to="/" className="-ml-1 flex shrink-0 items-center rounded-full p-1" aria-label="Rituel Vertueux, accueil">
            <Logo variant="full" decorative className="hidden size-[4.5rem] lg:block" />
            <Logo variant="mark" decorative className="size-10 lg:hidden" />
          </Link>

          <nav aria-label="Navigation principale" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'relative inline-flex min-h-11 items-center rounded-full px-4 text-[0.975rem] font-medium transition-colors',
                        isActive ? 'text-terracotta-dark' : 'text-forest hover:bg-cream-deep',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <span aria-hidden="true" className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-terracotta" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <NavLink
              to="/compte"
              aria-label={loggedIn ? 'Mon compte' : 'Se connecter à mon compte'}
              className={({ isActive }) =>
                cn(
                  'relative inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-cream-deep',
                  isActive ? 'text-terracotta-dark' : 'text-forest',
                )
              }
            >
              <UserRound aria-hidden="true" className="size-[1.4rem]" strokeWidth={1.8} />
              {loggedIn && (
                <span aria-hidden="true" className="absolute right-2 top-2 size-2 rounded-full bg-terracotta ring-2 ring-cream" />
              )}
            </NavLink>
            <button
              type="button"
              onClick={openDrawer}
              data-cart-icon
              aria-label={count > 0 ? `Ouvrir le panier, ${count} article${count > 1 ? 's' : ''}` : 'Ouvrir le panier, vide'}
              className="relative inline-flex size-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-cream-deep"
            >
              <ShoppingBag aria-hidden="true" className="size-[1.4rem]" strokeWidth={1.8} data-cart-glyph />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="label absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-terracotta-dark px-1 text-[0.8rem] font-bold leading-5 text-white"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              ref={burgerRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-cream-deep lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              onClick={() => setMenuOpen(true)}
            >
              <Menu aria-hidden="true" className="size-6" strokeWidth={1.8} />
              <span className="sr-only">Ouvrir le menu</span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
