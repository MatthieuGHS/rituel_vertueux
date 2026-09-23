import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../../store/auth'

/** Protège les routes /compte/* : redirige vers la connexion en mémorisant la destination. */
export function RequireAuth() {
  const session = useAuth((state) => state.session)
  const location = useLocation()
  if (!session) {
    return <Navigate to="/compte/connexion" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}
