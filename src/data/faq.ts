export interface FaqItem {
  question: string
  answer: string
}

export interface FaqGroup {
  id: string
  title: string
  items: FaqItem[]
}

export const faq: FaqGroup[] = [
  {
    id: 'preparation',
    title: 'Préparation',
    items: [
      {
        question: 'Comment préparer un stick ?',
        answer: 'Versez 1 stick de 18 g dans 250 ml d’eau froide ou chaude, puis mélangez. Un shaker ou une gourde fonctionnent aussi très bien.',
      },
      {
        question: 'Peut-on utiliser du lait ou une boisson végétale ?',
        answer: 'Oui. La préparation de référence est à l’eau, mais vous pouvez varier les plaisirs : retrouvez nos idées sur la page Recettes.',
      },
      {
        question: 'Combien de sticks par jour ?',
        answer: 'Un stick correspond à une boisson. Nous conseillons un stick par jour, dans le cadre d’une alimentation variée et équilibrée.',
      },
    ],
  },
  {
    id: 'conservation',
    title: 'Conservation',
    items: [
      {
        question: 'Comment conserver les sticks ?',
        answer: 'À conserver dans un endroit sec, à l’abri de la chaleur, de l’humidité et de la lumière.',
      },
      {
        question: 'Quelle est la date de durabilité minimale ?',
        answer: '[RE]BELLE : 16 mois. [RE]CONFORT : 24 mois. La date figure sur chaque boîte.',
      },
    ],
  },
  {
    id: 'allergenes',
    title: 'Allergènes',
    items: [
      {
        question: 'Les boissons contiennent-elles des allergènes ?',
        answer: 'Oui : les deux recettes contiennent du gluten (avoine). La liste complète des ingrédients est disponible sur chaque fiche produit.',
      },
      {
        question: 'Y a-t-il des ingrédients d’origine animale ?',
        answer: '[RE]BELLE contient du collagène bovin. Consultez la liste complète des ingrédients de chaque rituel sur sa fiche.',
      },
    ],
  },
  {
    id: 'livraison',
    title: 'Livraison',
    items: [
      {
        question: 'Combien coûte la livraison ?',
        answer: 'La livraison coûte 4,90 € et elle est offerte dès 30 € d’achat (montant des produits après remise). Sur ce site de démonstration, aucune commande n’est expédiée.',
      },
      {
        question: 'Quels sont les modes de livraison ?',
        answer: 'Livraison à domicile ou en point relais, au même tarif.',
      },
    ],
  },
  {
    id: 'fidelite',
    title: 'Fidélité',
    items: [
      {
        question: 'Comment gagner des points ?',
        answer: 'Chaque euro dépensé en produits (après remise, hors livraison) rapporte 10 points, arrondis à l’inférieur.',
      },
      {
        question: 'Quelles récompenses puis-je obtenir ?',
        answer: '250 points : −5 % sur les produits. 500 points : livraison offerte. 1 000 points : une boîte offerte au choix. Une seule récompense par commande.',
      },
      {
        question: 'À quoi servent les niveaux ?',
        answer: 'Votre niveau dépend du total de points gagnés depuis la création du compte : Découverte (0 à 499), Initié (500 à 1 499), Vertueux (1 500 et plus).',
      },
    ],
  },
  {
    id: 'demo',
    title: 'Compte de démonstration',
    items: [
      {
        question: 'Ce site est-il une vraie boutique ?',
        answer: 'Non. Il s’agit d’un site de démonstration : aucune commande n’est réellement passée, aucun paiement n’est demandé et aucune donnée n’est envoyée.',
      },
      {
        question: 'Comment tester l’espace client ?',
        answer: 'Connectez-vous avec l’adresse demo@rituelvertueux.fr et le mot de passe motdepasse. Le compte contient déjà trois commandes et des points de fidélité.',
      },
      {
        question: 'Où sont stockées mes informations ?',
        answer: 'Uniquement dans le stockage local de votre navigateur (panier, session, commandes de démonstration). Rien n’est transmis à un serveur.',
      },
    ],
  },
]
