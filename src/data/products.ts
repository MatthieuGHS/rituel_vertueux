import type { IngredientId } from './ingredients'

export type ProductId = 'rebelle' | 'reconfort'

export interface Product {
  id: ProductId
  /** Nom commercial exact, toujours avec les crochets. */
  name: '[RE]BELLE' | '[RE]CONFORT'
  /** Partie après « [RE] », pour la mise en forme. */
  suffix: 'BELLE' | 'CONFORT'
  path: string
  slogan: string
  keywords: string[]
  description: string
  /** Liste d'ingrédients réglementaire, texte exact. */
  ingredientsText: string
  featured: IngredientId[]
  allergens: string
  claim: 'Riche en vitamine C' | 'Riche en fibres'
  ddmMonths: number
  /** Prix de vente conseillé TTC, en centimes. */
  price: number
  flavour: string
  theme: {
    bg: string
    deep: string
    /** Couleur de texte accessible sur le fond de l'univers. */
    ink: string
  }
}

export const PACK = {
  sticks: 10,
  stickWeightG: 18,
  totalWeightG: 210,
  boxesPerCarton: 24,
  waterMl: 250,
  preparation: '1 stick à diluer dans 250 ml d’eau froide ou chaude, puis mélanger.',
  storage: 'À conserver dans un endroit sec, à l’abri de la chaleur, de l’humidité et de la lumière.',
  nutriScore: 'A',
  nutriScoreNote: '*Calculé à partir de la boisson reconstituée.',
  legalName: 'Boisson en poudre à diluer',
} as const

export const products: Record<ProductId, Product> = {
  rebelle: {
    id: 'rebelle',
    name: '[RE]BELLE',
    suffix: 'BELLE',
    path: '/rituels/rebelle',
    slogan: 'Le rituel beauté alliant gourmandise et praticité',
    keywords: ['Douceur acidulée', 'Éclat', 'Énergie'],
    description:
      'Une boisson rose à la framboise et à l’hibiscus, relevée d’acérola et adoucie par l’avoine. Un geste simple, fruité et acidulé, à glisser dans la journée.',
    ingredientsText:
      'Poudre d’hibiscus (38,8 %), collagène bovin (16 %), poudre de framboise 100 % (22,2 %), poudre d’avoine, acérola.',
    featured: ['framboise', 'hibiscus', 'acerola', 'collagene', 'avoine'],
    allergens: 'Contient du gluten (avoine).',
    claim: 'Riche en vitamine C',
    ddmMonths: 16,
    price: 1029,
    flavour: 'Framboise & hibiscus',
    theme: { bg: 'var(--color-rebelle)', deep: 'var(--color-rebelle-deep)', ink: 'var(--color-rebelle-ink)' },
  },
  reconfort: {
    id: 'reconfort',
    name: '[RE]CONFORT',
    suffix: 'CONFORT',
    path: '/rituels/reconfort',
    slogan: 'Le rituel doux pour se sentir bien au quotidien',
    keywords: ['Saveur douce et gourmande', 'Un instant de réconfort', 'Équilibre'],
    description:
      'Une boisson chocolatée à la banane et au cacao, arrondie par la datte et la caroube, avec une touche de reishi. Une pause douce, chaude ou glacée.',
    ingredientsText:
      'Poudre de banane protéinée (38,9 %) [protéine de riz brun, protéine de pois, banane en poudre (11 %), dattes en poudre, protéine de chanvre], cacao en poudre 100 % (22,2 %), poudre d’avoine, poudre de dattes (11 %), poudre de caroube (11 %), reishi (5,6 %).',
    featured: ['banane', 'cacao', 'datte', 'caroube', 'reishi', 'avoine'],
    allergens: 'Contient du gluten (avoine).',
    claim: 'Riche en fibres',
    ddmMonths: 24,
    price: 1006,
    flavour: 'Banane & cacao',
    theme: { bg: 'var(--color-reconfort)', deep: 'var(--color-reconfort-deep)', ink: 'var(--color-forest)' },
  },
}

export const productList: Product[] = [products.rebelle, products.reconfort]

export function otherProduct(id: ProductId): Product {
  return id === 'rebelle' ? products.reconfort : products.rebelle
}

export function isProductId(value: string | undefined): value is ProductId {
  return value === 'rebelle' || value === 'reconfort'
}
