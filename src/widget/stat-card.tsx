import type { ReactNode } from 'react'
import type { AccentSlot } from '../types/theme'
import { cn } from '../lib/class-name'
import { Sparkline } from './sparkline'

export interface StatCardProps {
  label: ReactNode
  value: ReactNode
  /** Font Awesome 7 class string, e.g. `'fa-solid fa-dollar-sign'`. */
  icon: string
  /** Icon tint + sparkline colour slot (`--m-c1` … `--m-c4`; default `c1`). */
  color?: AccentSlot
  /** Change vs. the previous period. Numbers render as `12.5%`; strings verbatim. */
  delta?: number | string
  /** Defaults to the sign of a numeric `delta`, otherwise `'up'`. */
  deltaDirection?: 'up' | 'down'
  /** e.g. `'vs last 30d'`. */
  deltaPeriod?: ReactNode
  /** Renders a `<Sparkline>` in `.stat-card__sparkline` when set. */
  sparkline?: number[]
  sparklineHeight?: number
  className?: string
}

function formatDelta(delta: number | string): string {
  if (typeof delta === 'string') return delta
  const abs = Math.abs(delta)
  return `${Number.isInteger(abs) ? abs : abs.toFixed(1)}%`
}

/**
 * KPI tile (`.stat-card`) — label + icon head, big value, up/down delta and an
 * optional sparkline, exactly as on CoolAdmin's dashboard.
 */
export function StatCard({
  label,
  value,
  icon,
  color = 'c1',
  delta,
  deltaDirection,
  deltaPeriod,
  sparkline,
  sparklineHeight = 60,
  className,
}: StatCardProps) {
  const direction: 'up' | 'down' =
    deltaDirection ?? (typeof delta === 'number' && delta < 0 ? 'down' : 'up')

  return (
    <article className={cn('stat-card', className)}>
      <div className="stat-card__head">
        <p className="stat-card__label">{label}</p>
        <span className={cn('stat-card__icon', `stat-card__icon--${color}`)}>
          <i className={icon} aria-hidden="true" />
        </span>
      </div>
      <p className="stat-card__value">{value}</p>
      {delta !== undefined && (
        <p className={cn('stat-card__delta', `stat-card__delta--${direction}`)}>
          <i className={`fa-solid fa-arrow-${direction}`} aria-hidden="true" />
          <span className="visually-hidden">{direction === 'up' ? 'Up' : 'Down'} </span>
          {formatDelta(delta)}
          {deltaPeriod && <span className="stat-card__delta-period">{deltaPeriod}</span>}
        </p>
      )}
      {sparkline && sparkline.length > 0 && (
        <div className="stat-card__sparkline">
          <Sparkline data={sparkline} color={`var(--m-${color})`} height={sparklineHeight} />
        </div>
      )}
    </article>
  )
}
