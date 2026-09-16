import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface RankListItem {
  /** Defaults to the 1-based position. */
  rank?: ReactNode
  title: ReactNode
  value: ReactNode
  /** Bar width, 0–100. */
  percent: number
  /** Bar colour (CSS colour or `var(--m-c2)`); defaults to the accent. */
  color?: string
}

export interface RankListProps {
  items: RankListItem[]
  className?: string
}

/**
 * Ranked top-N list (`.rank-list`): rank badge, title, value and a proportional
 * bar driven by the `--rank-pct` custom property.
 */
export function RankList({ items, className }: RankListProps) {
  return (
    <ul className={cn('rank-list', className)}>
      {items.map((item, i) => {
        const pct = Math.max(0, Math.min(100, item.percent))
        const style = {
          '--rank-pct': `${pct}%`,
          ...(item.color ? { '--rank-color': item.color } : {}),
        } as CSSProperties
        return (
          <li key={i}>
            <span className="rank-list__rank">{item.rank ?? i + 1}</span>
            <span className="rank-list__title">{item.title}</span>
            <span className="rank-list__value">{item.value}</span>
            <span className="rank-list__bar" style={style} aria-hidden="true" />
          </li>
        )
      })}
    </ul>
  )
}
