import { cn } from '../../lib/cn'
import { PACK } from '../../data/products'

const LETTERS = [
  { letter: 'A', color: '#038141' },
  { letter: 'B', color: '#85BB2F' },
  { letter: 'C', color: '#FECB02' },
  { letter: 'D', color: '#EE8100' },
  { letter: 'E', color: '#E63E11' },
] as const

interface NutriScoreProps {
  score?: (typeof LETTERS)[number]['letter']
  className?: string
  /** Affiche la note « *Calculé à partir de la boisson reconstituée. » en très petit. */
  withNote?: boolean
}

/** Logo Nutri-Score en SVG (couleurs officielles), lettre retenue mise en avant. */
export function NutriScore({ score = 'A', className, withNote = true }: NutriScoreProps) {
  const cell = 40
  const startX = 12
  const top = 34
  return (
    <figure className={cn('inline-flex flex-col items-start gap-1', className)}>
      <svg viewBox="0 0 224 94" className="h-auto w-full" role="img" aria-label={`Nutri-Score ${score}, calculé à partir de la boisson reconstituée`}>
        <rect x="1" y="1" width="222" height="92" rx="14" fill="#fff" stroke="#8a8a8a" strokeWidth="1.5" />
        <text x="14" y="23" fontFamily="var(--font-sans)" fontWeight={700} fontSize="15" letterSpacing="0.06em" fill="#6b6b6b">
          NUTRI-SCORE
          <tspan dx="2" dy="-5" fontSize="12">
            *
          </tspan>
        </text>
        {LETTERS.map(({ letter, color }, i) => {
          const x = startX + i * cell
          const first = i === 0
          const last = i === LETTERS.length - 1
          return (
            <g key={letter}>
              <path
                d={
                  first
                    ? `M${x + 10},${top} h${cell - 10} v46 h-${cell - 10} a10,10 0 0 1 -10,-10 v-26 a10,10 0 0 1 10,-10 z`
                    : last
                      ? `M${x},${top} h${cell - 10} a10,10 0 0 1 10,10 v26 a10,10 0 0 1 -10,10 h-${cell - 10} z`
                      : `M${x},${top} h${cell} v46 h-${cell} z`
                }
                fill={color}
                opacity={letter === score ? 1 : 0.55}
              />
              {letter !== score && (
                <text
                  x={x + cell / 2}
                  y={top + 32}
                  textAnchor="middle"
                  fontFamily="var(--font-sans)"
                  fontWeight={700}
                  fontSize="22"
                  fill="#fff"
                  opacity={0.9}
                >
                  {letter}
                </text>
              )}
            </g>
          )
        })}
        {LETTERS.filter((l) => l.letter === score).map(({ letter, color }) => {
          const i = LETTERS.findIndex((l) => l.letter === letter)
          const cx = startX + i * cell + cell / 2
          return (
            <g key="selected">
              <rect x={cx - 25} y={top - 8} width="50" height="62" rx="16" fill={color} stroke="#fff" strokeWidth="4" />
              <text x={cx} y={top + 36} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight={800} fontSize="36" fill="#fff">
                {letter}
              </text>
            </g>
          )
        })}
      </svg>
      {withNote && <figcaption className="text-[0.625rem] leading-tight text-ink/80">{PACK.nutriScoreNote}</figcaption>}
    </figure>
  )
}
