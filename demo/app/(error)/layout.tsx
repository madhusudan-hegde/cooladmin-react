import type { ReactNode } from 'react'
import { ErrorLayout, flattenMenuToCommands } from '@cooladmin/react'
import { menuItems } from '@/lib/menu'

export const metadata = {
  title: { default: 'CoolAdmin React', template: '%s · CoolAdmin React' },
}

/**
 * `body.app.error-page > main.error-card` shell for /errors/404, /errors/500
 * and /errors/maintenance.
 */
export default function ErrorGroupLayout({ children }: { children: ReactNode }) {
  return (
    <ErrorLayout
      brandName="CoolAdmin"
      brandMark="C"
      brandHref="/"
      commands={flattenMenuToCommands(menuItems)}
    >
      {children}
    </ErrorLayout>
  )
}
