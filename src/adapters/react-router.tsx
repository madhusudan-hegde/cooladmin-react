'use client'

// React Router (v7, `react-router` package) adapter — import from
// '@madhusudan-hegde/cooladmin-react/react-router'. Must render inside a router
// (`<BrowserRouter>` / `createBrowserRouter`).

import { useCallback } from 'react'
import type { ReactNode } from 'react'
import { Link as RouterLink, useLocation, useNavigate as useRouterNavigate } from 'react-router'
import { NavigationProvider } from '../context/navigation-context'
import type { NavigateOptions } from '../context/navigation-context'
import type { LinkComponent, LinkProps } from '../types/layout'

/** React Router's `Link` shaped like the library's `LinkComponent` (`href` → `to`). */
export const ReactRouterNavLink: LinkComponent = ({ href, children, ...rest }: LinkProps) => (
  <RouterLink to={href} {...rest}>
    {children}
  </RouterLink>
)

export interface ReactRouterNavigationProviderProps {
  /** Override the link component (defaults to React Router's `Link`). */
  linkComponent?: LinkComponent
  children: ReactNode
}

/**
 * Wires the library to React Router: `useLocation().pathname` for active
 * states, `navigate()` for the command palette, `Link` for links.
 *
 * ```tsx
 * import { BrowserRouter } from 'react-router'
 * import { ReactRouterNavigationProvider } from '@madhusudan-hegde/cooladmin-react/react-router'
 *
 * <BrowserRouter>
 *   <ReactRouterNavigationProvider>
 *     <DashboardLayout menuItems={menuItems}>…</DashboardLayout>
 *   </ReactRouterNavigationProvider>
 * </BrowserRouter>
 * ```
 */
export function ReactRouterNavigationProvider({
  linkComponent = ReactRouterNavLink,
  children,
}: ReactRouterNavigationProviderProps) {
  const { pathname } = useLocation()
  const routerNavigate = useRouterNavigate()
  const navigate = useCallback(
    (href: string, options?: NavigateOptions) => {
      const external = /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:')
      if (external) {
        window.location.assign(href)
        return
      }
      void routerNavigate(href, { replace: options?.replace })
    },
    [routerNavigate]
  )

  return (
    <NavigationProvider pathname={pathname} navigate={navigate} linkComponent={linkComponent}>
      {children}
    </NavigationProvider>
  )
}
