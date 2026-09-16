import type { ReactNode } from 'react'
import { ErrorLayout, flattenMenuToCommands } from '@madhusudan-hegde/cooladmin-react'
import { NextNavigationProvider } from '@madhusudan-hegde/cooladmin-react/next'
import { menuItems } from '@/lib/menu'

export const metadata = {
  title: { default: 'CoolAdmin React', template: '%s · CoolAdmin React' },
}

/**
 * `body.app.error-page > main.error-card` shell for /errors/404, /errors/500
 * and /errors/maintenance. The Next adapter makes the 404 page's command
 * palette navigate client-side.
 */
export default function ErrorGroupLayout({ children }: { children: ReactNode }) {
  return (
    <NextNavigationProvider>
      <ErrorLayout
        brandName="CoolAdmin"
        brandMark="C"
        brandHref="/"
        commands={flattenMenuToCommands(menuItems)}
      >
        {children}
      </ErrorLayout>
    </NextNavigationProvider>
  )
}
