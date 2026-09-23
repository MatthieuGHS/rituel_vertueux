import { Container } from '../components/ui/Container'
import { useSeo } from '../lib/seo'

export default function MentionsLegales() {
  useSeo('Mentions légales', 'Mentions légales du site de démonstration Rituel Vertueux (informations fictives).')
  return (
    <Container size="narrow" className="pb-24 pt-10 lg:pt-16">
      <h1 className="display-lg">Mentions légales</h1>
      <div className="prose-rv mt-8 text-lg">
        <p>
          Ce site est un <strong>projet de démonstration</strong> réalisé dans un cadre pédagogique. Aucun produit n’est
          vendu, aucune commande n’est expédiée et aucun paiement n’est collecté.
        </p>
        <h2>Éditeur</h2>
        <p>
          Rituel Vertueux (marque fictive)
          <br />
          Adresse : 1 rue de l’Exemple, 00000 Ville-Démo
          <br />
          SIRET : 000 000 000 00000 (fictif)
          <br />
          Contact : via la page Contact du site
        </p>
        <h2>Directeur de la publication</h2>
        <p>Équipe projet Rituel Vertueux (fictif).</p>
        <h2>Hébergement</h2>
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les visuels, logos et textes présentés sur ce site ont été créés pour le projet. Toute réutilisation hors du
          cadre de ce projet est à éviter.
        </p>
        <h2>Nutri-Score</h2>
        <p>*Calculé à partir de la boisson reconstituée.</p>
      </div>
    </Container>
  )
}
