import { AccountNav } from '../components/sections/AccountNav'
import { OrderCard } from '../components/sections/OrderCard'
import { Container } from '../components/ui/Container'
import { useSeo } from '../lib/seo'
import { useAuth } from '../store/auth'
import { useAccountOrders } from '../store/orders'

export default function CompteCommandes() {
  useSeo('Mes commandes', 'Historique détaillé des commandes du compte de démonstration Rituel Vertueux.')
  const session = useAuth((state) => state.session)!
  const orders = useAccountOrders(session.email)
  return (
    <Container className="pb-24 pt-10 lg:pt-16">
      <h1 className="display-lg">Mes commandes</h1>
      <div className="mt-8">
        <AccountNav />
      </div>
      <p className="mt-8 text-ink/85">
        {orders.length} commande{orders.length > 1 ? 's' : ''}, de la plus récente à la plus ancienne. Toutes sont fictives.
      </p>
      <ul className="mt-6 space-y-5">
        {orders.map((order) => (
          <li key={order.number}>
            <OrderCard order={order} detailed />
          </li>
        ))}
      </ul>
    </Container>
  )
}
