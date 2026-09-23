import type { ProductId } from './products'

export type IngredientId =
  | 'framboise'
  | 'hibiscus'
  | 'acerola'
  | 'collagene'
  | 'banane'
  | 'cacao'
  | 'datte'
  | 'caroube'
  | 'reishi'
  | 'avoine'

export interface Ingredient {
  id: IngredientId
  name: string
  products: ProductId[]
  /** Deux à trois lignes, sobres, sans allégation santé. */
  text: string
}

export const ingredients: Record<IngredientId, Ingredient> = {
  framboise: {
    id: 'framboise',
    name: 'Framboise',
    products: ['rebelle'],
    text: 'Le fruit rouge qui signe [RE]BELLE. Séchée puis réduite en poudre, la framboise apporte sa couleur vive et sa douceur acidulée.',
  },
  hibiscus: {
    id: 'hibiscus',
    name: 'Hibiscus',
    products: ['rebelle'],
    text: 'Fleur tropicale traditionnellement infusée, l’hibiscus donne à la boisson sa teinte rosée et une note légèrement acidulée.',
  },
  acerola: {
    id: 'acerola',
    name: 'Acérola',
    products: ['rebelle'],
    text: 'Petite cerise des Antilles et d’Amérique du Sud. Elle contribue à l’allégation « riche en vitamine C » de [RE]BELLE.',
  },
  collagene: {
    id: 'collagene',
    name: 'Collagène',
    products: ['rebelle'],
    text: 'Protéine d’origine bovine (16 % de la recette). Neutre en goût, elle se dissout sans laisser de texture.',
  },
  banane: {
    id: 'banane',
    name: 'Banane',
    products: ['reconfort'],
    text: 'Base de [RE]CONFORT, associée à des protéines végétales (riz brun, pois, chanvre). Elle donne une texture ronde et une douceur naturelle.',
  },
  cacao: {
    id: 'cacao',
    name: 'Cacao',
    products: ['reconfort'],
    text: 'Du cacao 100 % en poudre, pour une note chocolatée franche. C’est la cabosse que l’on retrouve dessinée sur le stick.',
  },
  datte: {
    id: 'datte',
    name: 'Datte',
    products: ['reconfort'],
    text: 'Fruit du palmier-dattier, séché au soleil. Il arrondit la recette de ses notes de caramel.',
  },
  caroube: {
    id: 'caroube',
    name: 'Caroube',
    products: ['reconfort'],
    text: 'Gousse d’un arbre méditerranéen, torréfiée puis moulue. Son goût rappelle le cacao, en plus doux.',
  },
  reishi: {
    id: 'reishi',
    name: 'Reishi',
    products: ['reconfort'],
    text: 'Champignon utilisé depuis des siècles dans les traditions asiatiques. Présent à 5,6 %, il apporte une note boisée discrète.',
  },
  avoine: {
    id: 'avoine',
    name: 'Avoine',
    products: ['rebelle', 'reconfort'],
    text: 'La céréale commune aux deux rituels. En poudre, elle donne du corps à la boisson. Elle contient du gluten.',
  },
}

export const ingredientList: Ingredient[] = Object.values(ingredients)
