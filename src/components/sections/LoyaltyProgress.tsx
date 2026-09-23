import { formatNumber } from '../../lib/format'
import { LOYALTY, nextReward } from '../../lib/loyalty'

/** Barre de progression du solde vers la prochaine récompense, avec les paliers. */
export function LoyaltyProgress({ balance }: { balance: number }) {
  const next = nextReward(balance)
  const max = LOYALTY.rewards[LOYALTY.rewards.length - 1].cost
  const ratio = Math.min(1, balance / max)
  return (
    <div>
      <p className="text-forest" aria-live="polite">
        {next ? (
          <>
            Plus que <strong className="font-semibold">{formatNumber(next.cost - balance)} points</strong> avant « {next.title} ».
          </>
        ) : (
          <strong className="font-semibold">Toutes les récompenses sont débloquées.</strong>
        )}
      </p>
      <div className="relative mt-4 pb-8">
        <div
          role="progressbar"
          aria-label="Solde de points par rapport aux récompenses"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={Math.min(balance, max)}
          aria-valuetext={`${formatNumber(balance)} points sur ${formatNumber(max)}`}
          className="h-3 overflow-hidden rounded-full bg-cream"
        >
          <div className="h-full origin-left rounded-full bg-terracotta" style={{ transform: `scaleX(${ratio})` }} />
        </div>
        {LOYALTY.rewards.map((reward) => {
          const reached = balance >= reward.cost
          return (
            <span
              key={reward.id}
              aria-hidden="true"
              className="absolute top-0 -translate-x-1/2"
              style={{ left: `${(reward.cost / max) * 100}%` }}
            >
              <span className={`mx-auto block size-3 rounded-full ring-2 ring-cream ${reached ? 'bg-forest' : 'bg-ink/30'}`} />
              <span className="label mt-2 block whitespace-nowrap text-sm text-ink/80">{formatNumber(reward.cost)}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
