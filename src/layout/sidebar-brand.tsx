'use client'

import type { ReactNode } from 'react'
import { useLinkComponent } from '../context/link-context'
import { useSidebar } from '../context/sidebar-context'

export interface SidebarBrandProps {
  brandName?: string
  /** Content of the square logo mark (default `'C'`). */
  brandMark?: ReactNode
  brandHref?: string
}

/**
 * `.logo` block at the top of the sidebar: mark + wordmark link and the
 * mobile-only `.sidebar-close` button.
 */
export function SidebarBrand({
  brandName = 'CoolAdmin',
  brandMark = 'C',
  brandHref = '/',
}: SidebarBrandProps) {
  const Link = useLinkComponent()
  const { setOpen } = useSidebar()

  return (
    <div className="logo">
      <Link className="logo-link" href={brandHref} aria-label={`${brandName} home`}>
        <span className="logo-mark" aria-hidden="true">
          {brandMark}
        </span>
        <span className="logo-text">{brandName}</span>
      </Link>
      <button
        className="sidebar-close"
        type="button"
        aria-label="Close navigation"
        onClick={() => setOpen(false)}
      >
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>
    </div>
  )
}
