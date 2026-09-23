import type { ReactNode } from 'react'
import type { IngredientId } from '../../data/ingredients'
import { cn } from '../../lib/cn'

/**
 * Illustrations au trait des ingrédients vedettes, dans l'esprit de la cabosse
 * dessinée sur le stick [RE]CONFORT. Trait `currentColor` (terracotta par défaut).
 */
const drawings: Record<IngredientId, ReactNode> = {
  framboise: (
    <>
      <path d="M32 19c-1.5-4-1-7.5 1.5-10" />
      <path d="M32 19c-3-3.5-8-4.5-12-2.5 4 .8 7.5 2.8 9.5 5" />
      <path d="M32 19c3-3.5 8-4.5 12-2.5-4 .8-7.5 2.8-9.5 5" />
      {[
        [25.5, 24], [32, 23], [38.5, 24],
        [21.5, 31], [28.5, 30.5], [35.5, 30.5], [42.5, 31],
        [25, 38], [32, 38], [39, 38],
        [28.5, 45], [35.5, 45],
        [32, 51.5],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.9" />
      ))}
    </>
  ),
  hibiscus: (
    <>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          transform={`rotate(${angle} 32 33)`}
          d="M32 31c-6-5-10.5-12-8.5-18 1.2-3.6 4.5-5 6.8-3.4 1.2-2 4.2-2 5.4 0 2.3-1.6 5.6-.2 6.8 3.4 2 6-2.5 13-8.5 18"
        />
      ))}
      <circle cx="32" cy="33" r="2.6" />
      <path d="M33.5 31.5 45 19" />
      <circle cx="46.5" cy="17.5" r="1.4" />
      <circle cx="43.2" cy="16.6" r="1.1" />
      <circle cx="47.6" cy="20.8" r="1.1" />
    </>
  ),
  acerola: (
    <>
      <path d="M32 23c-11-5-20 5-17 18 3 12 29 13 33 1 3.5-11-3.5-23-16-19Z" />
      <path d="M32 23c.8-6 3.5-10.5 8-14" />
      <path d="M40 9c5.5-3 12.5-1.5 15 3.5-6 2.5-11.5.5-15-3.5Z" />
      <path d="M42 10.2c3.8.5 7.5 1.4 11 2" />
      <path d="M21.5 35c.2-3.6 2-6.3 5.2-7.6" />
    </>
  ),
  collagene: (
    <>
      <path d="M32 7.5S15.5 27.5 15.5 40a16.5 16.5 0 0 0 33 0C48.5 27.5 32 7.5 32 7.5Z" />
      <path d="M21.5 41.5c3.2-3 6.3-3 9.5 0s6.3 3 9.5 0" />
      <path d="M24.5 49c2.5-2 5-2 7.5 0s5 2 7.5 0" />
      <path d="M23.5 33c.8-4 2.8-8 5.2-11.5" />
    </>
  ),
  banane: (
    <>
      <path d="M13 21c1.5 20 17.5 33 39 27.5 2.2-.6 2.2-3.2 0-3.8C33 46 22 35 19.5 19.5" />
      <path d="M13 21c-.8-3.4.2-5.8 3-6.6 1.8-.5 3 .8 3.5 2.4l.1 2.7" />
      <path d="M18 27c3.8 10.5 13 17.5 26 18" />
      <path d="M52 44.7c1.4.5 2.5 1.3 3 2.6" />
    </>
  ),
  cacao: (
    <>
      <path d="M14 50c-6-12 2-32 20-38 10-3.2 18-.2 20.5 4 4 12-6 30-24 36-8 2.2-14 1.5-16.5-2Z" />
      <path d="M19.5 47C24 34 34 22.5 50.5 16" />
      <path d="M15.5 38.5C21 28.5 29 20.5 40 14.5" />
      <path d="M26 51.5c8.5-7 18.5-18 28-31" />
      <path d="M54.5 16l5-5" />
    </>
  ),
  datte: (
    <>
      <path d="M22.5 14.5c10-6 23.5 3.5 23.5 19.5 0 14-8 22-16 20-10-2-14-14-13-26 .6-7 2.2-11.6 5.5-13.5Z" />
      <path d="M26 18.5c6 8 8.5 19.5 6 31.5" />
      <path d="M21.5 30c2 1.2 3.2 3.2 3.4 5.6" />
      <path d="M38.5 24c-1 2-1 4.2 0 6.3" />
      <path d="M39.5 40.5c-2 1.2-3.2 3-3.3 5.3" />
      <path d="M22.5 14.5 21 11h4.2" />
    </>
  ),
  caroube: (
    <>
      <path d="M8.5 44.5C18.5 30.5 34 20.5 54 14c4-1.3 6.3 2.2 3.3 5-17 9-31 19-43 31-3 2.3-7.2-1.2-5.8-5.5Z" />
      {[
        [17.5, 42.5], [25, 35.8], [33, 29.8], [41, 24.8], [49, 20.3],
      ].map(([cx, cy]) => (
        <ellipse key={cx} cx={cx} cy={cy} rx="2.8" ry="1.9" transform={`rotate(-35 ${cx} ${cy})`} />
      ))}
      <path d="M57.3 19c1.6.8 3 .6 4.2-.6" />
    </>
  ),
  reishi: (
    <>
      <path d="M9.5 34C9.5 20 26 10 42 12c12.5 1.6 16.5 12 10.5 18-8.5 7-27 8.5-43 4Z" />
      <path d="M16 31c2.2-9 14.5-15 26-14" />
      <path d="M24 32.5c2-6.5 10.5-10.5 20-10" />
      <path d="M32.5 33c1.8-3.6 7.5-6 13.5-5.6" />
      <path d="M29.5 36.5c.6 7.5-1.2 13.5-5 19.5M36 36.2c-.2 7.5 .5 13.5 2.5 19.8M22 56h19" />
    </>
  ),
  avoine: (
    <>
      <path d="M32.5 58c0-18-1.6-34-6.5-50" />
      {[
        [30.6, 44, -1], [29.2, 33, -1], [27.8, 22.5, -1],
        [31.4, 49, 1], [30.2, 38.5, 1], [28.8, 27.8, 1],
      ].map(([x, y, side]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y}c${side * 5} 0 ${side * 8} 4 ${side * 8} 10c${-side} -4 ${-side * 5} -8 ${-side * 8} -10Z`}
        />
      ))}
      <path d="M32.5 58c5.5-9.5 13.5-14 22-16-6 6.2-13.5 10.5-22 16Z" />
    </>
  ),
}

interface IngredientIllustrationProps {
  id: IngredientId
  className?: string
  strokeWidth?: number
  title?: string
}

export function IngredientIllustration({ id, className, strokeWidth = 1.7, title }: IngredientIllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-terracotta', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {drawings[id]}
    </svg>
  )
}
