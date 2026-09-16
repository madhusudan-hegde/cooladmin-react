import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface PageHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  /** Right-aligned action buttons (`.page-header__actions`). */
  actions?: ReactNode
  /** Small uppercase label rendered above the title. */
  eyebrow?: ReactNode
  className?: string
}

/** Page title row (`.page-header`): h1 + `.subtitle` on the left, actions on the right. */
export function PageHeader({ title, subtitle, actions, eyebrow, className }: PageHeaderProps) {
  return (
    <div className={cn('page-header', className)}>
      <div>
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </div>
  )
}
