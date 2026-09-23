import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigation } from 'react-router'
import { scrollToTop, startSmoothScroll, stopSmoothScroll } from '../../lib/smooth-scroll'
import { cn } from '../../lib/cn'
import { CartDrawer } from './CartDrawer'
import { DemoBanner } from './DemoBanner'
import { Footer } from './Footer'
import { Header } from './Header'

export function RootLayout() {
  const { pathname } = useLocation()
  const navigation = useNavigation()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    startSmoothScroll()
    return () => stopSmoothScroll()
  }, [])

  // Remonte en haut de page et place le focus sur le contenu à chaque changement de route.
  useEffect(() => {
    scrollToTop()
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    mainRef.current?.focus({ preventScroll: true })
    // oxlint-disable-next-line react/exhaustive-effect-dependencies -- déclenché volontairement à chaque changement de route
  }, [pathname])

  return (
    <>
      <a
        href="#contenu"
        className="label fixed left-4 top-2 z-[100] -translate-y-24 rounded-full bg-forest px-5 py-3 text-cream transition-transform focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-terracotta transition-transform duration-500',
          navigation.state === 'loading' ? 'scale-x-75' : 'scale-x-0',
        )}
      />
      <DemoBanner />
      <Header />
      <main id="contenu" ref={mainRef} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
