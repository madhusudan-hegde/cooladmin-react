import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'

export type PriorityLevel = 'low' | 'medium' | 'high'

export interface PriorityChipProps {
  level: PriorityLevel
  /** Label; defaults to the capitalised level. */
  children?: ReactNode
  className?: string
}

const LABELS: Record<PriorityLevel, string> = { low: 'Low', medium: 'Medium', high: 'High' }

/** Task priority chip (`.priority-chip.priority-chip--low|medium|high`). */
export function PriorityChip({ level, children, className }: PriorityChipProps) {
  return (
    <span className={cn('priority-chip', `priority-chip--${level}`, className)}>
      {children ?? LABELS[level]}
    </span>
  )
}
