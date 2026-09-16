import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface FooterProps {
  children?: ReactNode
  className?: string
}

/** Bottom `.copyright` row. Defaults to CoolAdmin's Colorlib credit line. */
export function Footer({ children, className }: FooterProps) {
  return (
    <div className={cn('row', 'footer-row', className)}>
      <div className="col-md-12">
        <div className="copyright">
          <p>
            {children ?? (
              <>
                Copyright © 2026 CoolAdmin. Design by{' '}
                <a href="https://colorlib.com" rel="nofollow noopener" target="_blank">
                  Colorlib
                </a>
                .
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
