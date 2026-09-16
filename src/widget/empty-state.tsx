import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface EmptyStateProps {
  /** Font Awesome 7 class string (default magnifying glass). */
  icon?: string
  title: ReactNode
  text?: ReactNode
  actions?: ReactNode
  className?: string
}

/** Centred empty/zero-results block (`.empty-state`). */
export function EmptyState({
  icon = 'fa-solid fa-magnifying-glass',
  title,
  text,
  actions,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('empty-state', className)} role="status">
      <span className="empty-state__icon">
        <i className={icon} aria-hidden="true" />
      </span>
      <h3 className="empty-state__title">{title}</h3>
      {text && <p className="empty-state__text">{text}</p>}
      {actions && <div className="empty-state__actions">{actions}</div>}
    </div>
  )
}
