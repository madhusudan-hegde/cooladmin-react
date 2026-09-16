'use client'

import { useSidebar } from '../context/sidebar-context'

/**
 * Mobile drawer backdrop (`.sidebar-backdrop`). Always rendered; CoolAdmin's
 * CSS shows it only under `body.sidebar-open`. Click/tap closes the drawer.
 */
export function SidebarOverlay() {
  const { setOpen } = useSidebar()
  return <div className="sidebar-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
}
