'use client'

import { usePathname } from 'next/navigation'
import type { MenuNode } from '../types/menu'
import { cn } from '../lib/class-name'
import { SidebarNavItem } from './sidebar-nav-item'
import { SidebarTooltipProvider } from './sidebar-tooltip'

export interface SidebarNavProps {
  items: MenuNode[]
  /** Override the active path (defaults to `usePathname()`). */
  currentPath?: string
  className?: string
}

/**
 * `nav.navbar-sidebar > ul.navbar__list` — the recursive menu tree with
 * `next/navigation` active-link detection and collapsed-mode tooltips.
 */
export function SidebarNav({ items, currentPath, className }: SidebarNavProps) {
  const pathname = usePathname()
  const path = currentPath ?? pathname ?? '/'

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
