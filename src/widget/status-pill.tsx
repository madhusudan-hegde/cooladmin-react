import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'

export type StatusPillStatus =
  | 'approved'
  | 'process'
  | 'denied'
  | 'online'
  | 'away'
  | 'busy'
  | 'offline'

export interface StatusPillProps {
  status: StatusPillStatus
  /** Label; defaults to the capitalised status. */
  children?: ReactNode
  className?: string
}

const DEFAULT_LABELS: Record<StatusPillStatus, string> = {
  approved: 'Approved',
  process: 'Processed',
  denied: 'Denied',
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
  offline: 'Offline',
}

/** Soft-tinted status pill (`.status--approved|process|denied|online|away|busy|offline`). */
export function StatusPill({ status, children, className }: StatusPillProps) {
  return (
    <span className={cn(`status--${status}`, className)}>{children ?? DEFAULT_LABELS[status]}</span>
  )
}
