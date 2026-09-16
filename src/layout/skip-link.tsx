import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface SkipLinkProps {
  /** Target id (default `#main-content`). */
  href?: string
  children?: ReactNode
  className?: string
}

/** Visually-hidden-until-focused skip link, first in the tab order. */
export function SkipLink({
  href = '#main-content',
  children = 'Skip to main content',
  className,
}: SkipLinkProps) {
  return (
    <a className={cn('visually-hidden-focusable skip-link', className)} href={href}>
      {children}
    </a>
  )
}
