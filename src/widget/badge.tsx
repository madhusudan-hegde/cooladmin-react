import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

export interface BadgeProps {
  variant?: BadgeVariant
  /** Bootstrap `.rounded-pill`. */
  pill?: boolean
  /**
   * CoolAdmin's soft-tinted look (`.badge.bg-<variant>`, re-tinted in `_badges.scss`) —
   * the style used on the Badges page. Default is Bootstrap's solid `.text-bg-<variant>`.
   */
  soft?: boolean
  /** Leading icon — Font Awesome 7 class string. */
  icon?: string
  children?: ReactNode
  className?: string
}

/** Bootstrap `.badge` on the brand palette; `soft` gives CoolAdmin's tinted pills. */
export function Badge({
  variant = 'primary',
  pill = false,
  soft = false,
  icon,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        soft ? `bg-${variant}` : `text-bg-${variant}`,
        pill && 'rounded-pill',
        className
      )}
    >
      {icon && <i className={cn(icon, 'badge__icon')} aria-hidden="true" />}
      {children}
    </span>
  )
}
