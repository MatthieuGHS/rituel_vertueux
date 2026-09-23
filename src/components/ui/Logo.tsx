import { useId } from 'react'

/**
 * Logo Rituel Vertueux recréé en SVG.
 * Pétales : tracés vectoriels officiels (docs/photos/RV__Logo_CouleursAplats.svg).
 * Texte circulaire « RITUEL » / « VERTUEUX » comme sur le packaging actuel (sans « LE »).
 */
const PETALS_ORANGE =
  'M89.05,86.17v-3.87c0-17.37,14.08-31.46,31.46-31.46h3.87c.53,0,.97.43.97.97v3.87c0,17.37-14.08,31.46-31.46,31.46h-3.87c-.53,0-.97-.43-.97-.97ZM80.25,94.97h-3.87c-17.37,0-31.46,14.08-31.46,31.46v3.87c0,.53.43.97.97.97h3.87c17.37,0,31.46-14.08,31.46-31.46v-3.87c0-.53-.43-.97-.97-.97Z'
const PETALS_CORAL =
  'M80.25,87.14h-3.87c-17.37,0-31.46-14.08-31.46-31.46v-3.87c0-.53.43-.97.97-.97h3.87c17.37,0,31.46,14.08,31.46,31.46v3.87c0,.53-.43.97-.97.97ZM89.05,95.94v3.87c0,17.37,14.08,31.46,31.46,31.46h3.87c.53,0,.97-.43.97-.97v-3.87c0-17.37-14.08-31.46-31.46-31.46h-3.87c-.53,0-.97.43-.97.97Z'
const PETAL_VEINS = [
  'M56.58,61.23h-1.26v1.27c0,12.08,9.82,21.9,21.9,21.9h1.26v-1.26c0-12.08-9.82-21.91-21.9-21.91ZM57.89,63.81c9.07.6,16.45,7.49,17.83,16.33l-7.06-5.56,5.55,7.05c-8.84-1.38-15.71-8.76-16.32-17.82Z',
  'M93.05,97.71h-1.26s0,1.26,0,1.26c0,12.08,9.82,21.9,21.9,21.9h1.27s0-1.26,0-1.26c0-12.08-9.83-21.9-21.91-21.9ZM94.56,101.98l7.05,5.55-5.56-7.06c8.84,1.38,15.73,8.76,16.33,17.83-9.06-.61-16.44-7.48-17.82-16.32Z',
  'M91.79,83.14v1.26s1.26,0,1.26,0c12.08,0,21.9-9.82,21.9-21.9v-1.27s-1.26,0-1.26,0c-12.08,0-21.9,9.83-21.9,21.91ZM96.06,81.63l5.55-7.05-7.06,5.56c1.38-8.84,8.76-15.73,17.83-16.33-.61,9.06-7.48,16.44-16.32,17.82Z',
  'M55.32,119.61v1.26h1.27c12.08,0,21.9-9.82,21.9-21.9v-1.26h-1.26c-12.08,0-21.91,9.82-21.91,21.9ZM57.9,118.3c.6-9.07,7.49-16.45,16.33-17.83l-5.56,7.06,7.05-5.55c-1.38,8.84-8.76,15.71-17.82,16.32Z',
]

function Flower({ veinColor }: { veinColor: string }) {
  return (
    <>
      <path d={PETALS_ORANGE} fill="var(--color-petal-orange)" />
      <path d={PETALS_CORAL} fill="var(--color-petal-coral)" />
      {PETAL_VEINS.map((d) => (
        <path key={d.slice(0, 12)} d={d} fill={veinColor} />
      ))}
    </>
  )
}

interface LogoProps {
  /** `full` : fleur + texte circulaire. `mark` : fleur seule (header mobile, favicon). */
  variant?: 'full' | 'mark'
  className?: string
  /** Couleur des nervures (doit rappeler le fond). */
  veinColor?: string
  /** Couleur du texte circulaire. */
  textColor?: string
  /** Rendre le logo décoratif (déjà nommé par un lien parent). */
  decorative?: boolean
}

export function Logo({
  variant = 'full',
  className,
  veinColor = 'var(--color-cream)',
  textColor = 'var(--color-ink)',
  decorative = false,
}: LogoProps) {
  const id = useId().replace(/:/g, '')
  const a11y = decorative
    ? ({ 'aria-hidden': true } as const)
    : ({ role: 'img', 'aria-label': 'Rituel Vertueux' } as const)

  if (variant === 'mark') {
    return (
      <svg viewBox="42 48 86 86" className={className} {...a11y}>
        <Flower veinColor={veinColor} />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 200 200" className={className} {...a11y}>
      <defs>
        {/* Arc haut : lu de gauche à droite, glyphes vers l'extérieur. */}
        <path id={`${id}-top`} d="M 38,100 A 62,62 0 0 1 162,100" fill="none" />
        {/* Arc bas : lu de gauche à droite, glyphes vers le centre. */}
        <path id={`${id}-bottom`} d="M 24,100 A 76,76 0 0 0 176,100" fill="none" />
      </defs>
      <g
        fill={textColor}
        fontFamily="var(--font-display)"
        fontWeight={500}
        fontSize={17}
        letterSpacing="0.28em"
        style={{ fontVariationSettings: "'SOFT' 0" }}
      >
        <text textAnchor="middle">
          <textPath href={`#${id}-top`} startOffset="50%">
            RITUEL
          </textPath>
        </text>
        <text textAnchor="middle">
          <textPath href={`#${id}-bottom`} startOffset="50%">
            VERTUEUX
          </textPath>
        </text>
      </g>
      <circle cx="21" cy="100" r="3.2" fill="var(--color-petal-orange)" />
      <circle cx="179" cy="100" r="3.2" fill="var(--color-petal-orange)" />
      <g transform="translate(100 100) scale(0.74) translate(-85.1 -91.06)">
        <Flower veinColor={veinColor} />
      </g>
    </svg>
  )
}
