import { LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { cn } from '../../lib/cn'
import { useAuth } from '../../store/auth'

const links = [
  { to: '/compte', label: 'Tableau de bord', end: true },
  { to: '/compte/commandes', label: 'Mes commandes', end: false },
  { to: '/compte/fidelite', label: 'Fidélité', end: false },
]

export function AccountNav() {
  const logout = useAuth((state) => state.logout)
  const navigate = useNavigate()
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest/15 pb-4">
      <nav aria-label="Espace client">
        <ul className="flex flex-wrap gap-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'inline-flex min-h-11 items-center rounded-full px-5 font-medium transition-colors',
                    isActive ? 'bg-forest text-cream' : 'text-forest hover:bg-cream-deep',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button
        type="button"
        onClick={() => {
          logout()
          navigate('/compte/connexion', { replace: true, state: { loggedOut: true } })
        }}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-danger/40 px-5 font-medium text-danger transition-colors hover:bg-danger hover:text-white"
      >
        <LogOut aria-hidden="true" className="size-4" />
        Se déconnecter
      </button>
    </div>
  )
}
