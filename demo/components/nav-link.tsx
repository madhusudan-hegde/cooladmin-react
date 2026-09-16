'use client'

import Link from 'next/link'
import type { LinkComponent } from '@madhusudan-hegde/cooladmin-react'

/**
 * Router link injected into the library (sidebar, account menu, palette) via
 * `DashboardLayout.linkComponent`, so navigation is client-side.
 */
export const NavLink: LinkComponent = ({ href, children, ...rest }) => (
  <Link href={href} {...rest}>
    {children}
  </Link>
)
