import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface AppContentProps {
  children: ReactNode
  className?: string
  /** Extra class on the inner `.container-fluid`. */
  containerClassName?: string
  id?: string
}

/**
 * `main#main-content.main-content > .section__content--p30 > .container-fluid` —
 * the page body region of CoolAdmin's default layout.
 */
export function AppContent({
  children,
  className,
  containerClassName,
  id = 'main-content',
}: AppContentProps) {
  return (
    <main className={cn('main-content', className)} id={id} tabIndex={-1}>
      <div className="section__content section__content--p30">
        <div className={cn('container-fluid', containerClassName)}>{children}</div>
      </div>
    </main>
  )
}
