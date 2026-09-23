import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { useSeo } from '../lib/seo'
import { useAuth } from '../store/auth'
import { useCart } from '../store/cart'
import { useOrders } from '../store/orders'

export default function Confidentialite() {
  useSeo('Confidentialité', 'Politique de confidentialité du site de démonstration Rituel Vertueux : aucune donnée n’est transmise, tout reste dans votre navigateur.')
  const [cleared, setCleared] = useState(false)

  const clearAll = () => {
    useCart.getState().clear()
    useAuth.getState().logout()
    useOrders.getState().resetDemo()
    setCleared(true)
  }

  return (
    <Container size="narrow" className="pb-24 pt-10 lg:pt-16">
      <h1 className="display-lg">Confidentialité</h1>
      <div className="prose-rv mt-8 text-lg">
        <p>Ce site de démonstration ne possède ni serveur applicatif, ni base de données. Aucune donnée personnelle n’est transmise.</p>
        <h2>Ce qui est stocké</h2>
        <p>Pour simuler une boutique, trois informations sont enregistrées dans le stockage local (localStorage) de votre navigateur :</p>
        <ul>
          <li>le contenu de votre panier ;</li>
          <li>votre session sur le compte de démonstration ;</li>
          <li>les commandes fictives passées pendant la démo.</li>
        </ul>
        <p>Les formulaires de contact et distributeur n’envoient rien : ils affichent seulement un message de confirmation.</p>
        <h2>Cookies et mesure d’audience</h2>
        <p>Aucun cookie, aucun traceur, aucun outil de mesure d’audience.</p>
        <h2>Effacer vos données</h2>
        <p>Vous pouvez effacer à tout moment les données de démonstration enregistrées dans ce navigateur.</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button variant="secondary" onClick={clearAll}>
          Effacer les données de démo
        </Button>
        <p role="status" className="text-success">
          {cleared && 'Panier, session et commandes de démonstration effacés.'}
        </p>
      </div>
    </Container>
  )
}
