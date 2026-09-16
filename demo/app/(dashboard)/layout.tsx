import type { ReactNode } from 'react'
import { DemoLayout } from '@/components/demo-layout'

// Title template for the dashboard group: page titles become "<page> · CoolAdmin React".
// Defined per route group — a parent's template does not reach past a resolved title.
export const metadata = {
  title: { default: 'CoolAdmin React', template: '%s · CoolAdmin React' },
}

export default function DashboardGroupLayout({ children }: { children: ReactNode }) {
  return <DemoLayout>{children}</DemoLayout>
}
