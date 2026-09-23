import type { ProductId } from './products'
import type { PhotoKey } from '../assets/images/types'

export interface Recipe {
  id: string
  title: string
  product: ProductId
  temperature: 'Glacé' | 'Chaud' | 'Frais'
  minutes: number
  intro: string
  ingredients: string[]
  steps: string[]
  image: PhotoKey
  imageAlt: string
}

/** Suggestions de recettes (textes à valider avec la cliente). */
export const recipes: Recipe[] = [
  {
    id: 'latte-glace-reconfort',
    title: 'Latte glacé banane-cacao',
    product: 'reconfort',
    temperature: 'Glacé',
    minutes: 3,
    intro: 'La version terrasse de [RE]CONFORT : chocolatée, fraîche, avec une rondelle de banane pour le plaisir.',
    ingredients: ['1 stick [RE]CONFORT', '100 ml d’eau froide', '150 ml de boisson végétale à l’avoine', '4 glaçons', '1 rondelle de banane'],
    steps: [
      'Versez le stick dans l’eau froide et mélangez jusqu’à dissolution.',
      'Ajoutez la boisson végétale bien fraîche.',
      'Servez sur les glaçons, avec la rondelle de banane.',
    ],
    image: 'reconfort-glace-mer',
    imageAlt: 'Verre de latte glacé chocolaté avec une rondelle de banane et un stick [RE]CONFORT, face à la mer',
  },
  {
    id: 'infusion-rosee-rebelle',
    title: 'Infusion rosée',
    product: 'rebelle',
    temperature: 'Chaud',
    minutes: 2,
    intro: 'Pour les fins de journée : [RE]BELLE dans une eau chaude, sa couleur d’hibiscus et son parfum de framboise.',
    ingredients: ['1 stick [RE]BELLE', '250 ml d’eau chaude (non bouillante)', 'Quelques framboises (facultatif)'],
    steps: [
      'Faites chauffer l’eau sans la porter à ébullition.',
      'Versez le stick dans une tasse, ajoutez l’eau chaude et mélangez.',
      'Ajoutez quelques framboises écrasées si vous aimez les textures fruitées.',
    ],
    image: 'rebelle-poudre',
    imageAlt: 'Poudre rose [RE]BELLE s’écoulant d’un stick sur fond rose',
  },
  {
    id: 'smoothie-framboise',
    title: 'Smoothie framboise-avoine',
    product: 'rebelle',
    temperature: 'Frais',
    minutes: 5,
    intro: 'Un smoothie rose et onctueux pour le petit-déjeuner ou le goûter.',
    ingredients: ['1 stick [RE]BELLE', '150 ml d’eau froide', '1 yaourt nature ou végétal', '80 g de framboises', '1 c. à soupe de flocons d’avoine'],
    steps: [
      'Mixez tous les ingrédients pendant 30 secondes.',
      'Ajustez la texture avec un peu d’eau si besoin.',
      'Servez aussitôt, parsemé de quelques flocons.',
    ],
    image: 'rebelle-smoothie',
    imageAlt: 'Grand verre de smoothie rose à côté d’un stick [RE]BELLE, de framboises et de fleurs d’hibiscus',
  },
  {
    id: 'smoothie-banane-cacao',
    title: 'Smoothie banane-cacao',
    product: 'reconfort',
    temperature: 'Frais',
    minutes: 5,
    intro: 'Toute la gourmandise de [RE]CONFORT dans un smoothie épais, parfait après le sport.',
    ingredients: ['1 stick [RE]CONFORT', '200 ml de lait ou de boisson végétale', '1/2 banane', '2 dattes dénoyautées', '2 glaçons'],
    steps: [
      'Placez tous les ingrédients dans le blender.',
      'Mixez jusqu’à obtenir une texture lisse.',
      'Versez dans un grand verre et dégustez.',
    ],
    image: 'reconfort-smoothie',
    imageAlt: 'Smoothie banane-cacao en verre, stick [RE]CONFORT, rondelles de banane et éclats de chocolat',
  },
  {
    id: 'chocolat-chaud-reconfort',
    title: 'Chocolat chaud réconfort',
    product: 'reconfort',
    temperature: 'Chaud',
    minutes: 3,
    intro: 'La recette la plus simple : un stick, de l’eau chaude, une tasse. Un instant de réconfort en trois minutes.',
    ingredients: ['1 stick [RE]CONFORT', '250 ml d’eau chaude', '1 pincée de cannelle (facultatif)'],
    steps: [
      'Versez le stick dans la tasse.',
      'Ajoutez l’eau chaude petit à petit en fouettant.',
      'Saupoudrez de cannelle si vous le souhaitez.',
    ],
    image: 'reconfort-versement',
    imageAlt: 'Stick [RE]CONFORT versé dans un verre de boisson chocolatée sur fond jaune',
  },
  {
    id: 'petillant-rebelle',
    title: 'Pétillant framboise-hibiscus',
    product: 'rebelle',
    temperature: 'Glacé',
    minutes: 2,
    intro: 'Une boisson rose et pétillante pour l’apéritif sans alcool.',
    ingredients: ['1 stick [RE]BELLE', '50 ml d’eau plate', '200 ml d’eau pétillante bien fraîche', 'Glaçons', 'Quelques framboises'],
    steps: [
      'Dissolvez le stick dans l’eau plate.',
      'Ajoutez les glaçons puis l’eau pétillante, doucement.',
      'Terminez avec les framboises.',
    ],
    image: 'rebelle-collage',
    imageAlt: 'Stick [RE]BELLE entouré de framboises, d’hibiscus, d’eau pétillante rosée et de flocons d’avoine',
  },
]
