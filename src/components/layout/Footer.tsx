import { Link } from 'react-router'
import { productList } from '../../data/products'
import { InstagramIcon, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../ui/InstagramIcon'
import { Logo } from '../ui/Logo'
import { legalNav, mainNav, secondaryNav } from './nav'

const linkClass = 'inline-flex min-h-10 items-center text-cream/85 transition-colors hover:text-white hover:underline underline-offset-4'

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo className="size-28" textColor="var(--color-cream)" veinColor="var(--color-forest)" />
            <p className="font-display mt-6 max-w-sm text-3xl font-semibold leading-tight text-cream">
              Votre bien-être devient un rituel
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/30 px-4 text-cream transition-colors hover:bg-cream hover:text-forest"
            >
              <InstagramIcon size={20} />
              {INSTAGRAM_HANDLE}
              <span className="sr-only">(Instagram, nouvel onglet)</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <nav aria-label="Les rituels">
              <h2 className="label mb-3 text-[1rem] text-reconfort">Les rituels</h2>
              <ul>
                {productList.map((product) => (
                  <li key={product.id}>
                    <Link to={product.path} className={linkClass}>
                      {product.name}
                    </Link>
                  </li>
                ))}
                {secondaryNav.slice(0, 2).map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="La marque">
              <h2 className="label mb-3 text-[1rem] text-reconfort">La marque</h2>
              <ul>
                {mainNav.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Aide et compte">
              <h2 className="label mb-3 text-[1rem] text-reconfort">Aide & compte</h2>
              <ul>
                {secondaryNav.slice(2).map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/compte" className={linkClass}>
                    Mon compte
                  </Link>
                </li>
                <li>
                  <Link to="/panier" className={linkClass}>
                    Panier
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-6 text-sm text-cream/80 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Rituel Vertueux — site de démonstration, aucune commande réelle.</p>
          <ul className="flex flex-wrap gap-x-6">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
