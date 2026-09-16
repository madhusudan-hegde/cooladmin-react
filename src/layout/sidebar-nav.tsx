'use client'

import type { MenuNode } from '../types/menu'
import { cn } from '../lib/class-name'
import { useNavigation } from '../context/navigation-context'
import { SidebarNavItem } from './sidebar-nav-item'
import { SidebarTooltipProvider } from './sidebar-tooltip'

export interface SidebarNavProps {
  items: MenuNode[]
  /** Override the active path (defaults to the navigation adapter's `pathname`). */
  currentPath?: string
  className?: string
}

/**
 * `nav.navbar-sidebar > ul.navbar__list` — the recursive menu tree with
 * active-link detection (from `NavigationProvider` / a framework adapter, or
 * `window.location` when none is mounted) and collapsed-mode tooltips.
 */
export function SidebarNav({ items, currentPath, className }: SidebarNavProps) {
  const { pathname } = useNavigation()
  const path = currentPath ?? (pathname || '/')

  return (
    <SidebarTooltipProvider>
      <nav className={cn('navbar-sidebar', className)} aria-label="Main navigation">
        <ul className="list-unstyled navbar__list">
          {items.map((item, idx) => (
            <SidebarNavItem
              key={item.type === 'item' ? item.href : `${item.type}-${item.label}-${idx}`}
              item={item}
              currentPath={path}
              depth={0}
            />
          ))}
        </ul>
      </nav>
    </SidebarTooltipProvider>
  )
}
