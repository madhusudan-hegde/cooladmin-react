'use client'

// Next.js App Router adapter — import from '@madhusudan-hegde/cooladmin-react/next'.
// This is the ONLY module in the package that imports from `next`; the core
// (`@madhusudan-hegde/cooladmin-react`) is framework-agnostic.

import { useCallback } from 'react'
import type { ReactNode } from 'react'
import NextLink from 'next/link'
import { usePathname as useNextPathname, useRouter } from 'next/navigation'
import { NavigationProvider } from '../context/navigation-context'
import type { NavigateOptions } from '../context/navigation-context'
import type { LinkComponent, LinkProps } from '../types/layout'

/** `next/link` shaped like the library's `LinkComponent`. */
export const NextNavLink: LinkComponent = ({ href, children, ...rest }: LinkProps) => (
  <NextLink href={href} {...rest}>
    {children}
  </NextLink>
)

export interface NextNavigationProviderProps {
  /** Override the link component (defaults to `next/link`). */
  linkComponent?: LinkComponent
  children: ReactNode
}

/**
 * Wires the library to the Next.js App Router: `usePathname()` for active
 * states, `router.push/replace` for the command palette, `next/link` for links.
 *
 * ```tsx
 * // app/(dashboard)/layout.tsx
 * import { NextNavigationProvider } from '@madhusudan-hegde/cooladmin-react/next'
 * export default function Layout({ children }) {
 *   return (
 *     <NextNavigationProvider>
 *       <DashboardLayout menuItems={menuItems}>{children}</DashboardLayout>
 *     </NextNavigationProvider>
 *   )
 * }
 * ```
 */
export function NextNavigationProvider({
  linkComponent = NextNavLink,
  children,
}: NextNavigationProviderProps) {
  const pathname = useNextPathname()
  const router = useRouter()
  const navigate = useCallback(
    (href: string, options?: NavigateOptions) => {
      const external = /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:')
      if (external) {
        window.location.assign(href)
        return
      }
      if (options?.replace) router.replace(href)
      else router.push(href)
    },
    [router]
  )

  return (
    <NavigationProvider pathname={pathname ?? ''} navigate={navigate} linkComponent={linkComponent}>
      {children}
    </NavigationProvider>
  )
}
