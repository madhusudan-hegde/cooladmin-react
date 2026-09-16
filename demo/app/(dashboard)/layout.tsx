import type { ReactNode } from 'react'
import { NextNavigationProvider } from '@madhusudan-hegde/cooladmin-react/next'
import { DemoLayout } from '@/components/demo-layout'

// Title template for the dashboard group: page titles become "<page> · CoolAdmin React".
// Defined per route group — a parent's template does not reach past a resolved title.
export const metadata = {
  title: { default: 'CoolAdmin React', template: '%s · CoolAdmin React' },
}

/**
 * `NextNavigationProvider` is the one Next-specific line: it hands the library
 * `usePathname()` (sidebar active states), `router.push()` (command palette)
 * and `next/link`. The library core has no dependency on Next.
 */
export default function DashboardGroupLayout({ children }: { children: ReactNode }) {
  return (
    <NextNavigationProvider>
      <DemoLayout>{children}</DemoLayout>
    </NextNavigationProvider>
  )
}
