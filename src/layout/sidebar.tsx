import type { ReactNode } from 'react'
import type { MenuNode } from '../types/menu'
import { cn } from '../lib/class-name'
import { SidebarBrand } from './sidebar-brand'
import { SidebarNav } from './sidebar-nav'
import { SidebarOverlay } from './sidebar-overlay'

export interface SidebarProps {
  menuItems: MenuNode[]
  brandName?: string
  brandMark?: ReactNode
  brandHref?: string
  /** Extra content under the nav (e.g. a docs link or upgrade card). */
  footer?: ReactNode
  className?: string
  id?: string
}

/**
 * `aside.menu-sidebar#main-sidebar` — brand, scrollable nav and the mobile
 * backdrop. RSC composition; the interactive parts are client components.
 */
export function Sidebar({
  menuItems,
  brandName,
  brandMark,
  brandHref,
  footer,
  className,
  id = 'main-sidebar',
}: SidebarProps) {
  return (
    <>
      <aside className={cn('menu-sidebar', className)} id={id}>
        <SidebarBrand brandName={brandName} brandMark={brandMark} brandHref={brandHref} />
        <div className="menu-sidebar__content">
          <SidebarNav items={menuItems} />
          {footer && <div className="menu-sidebar__footer">{footer}</div>}
        </div>
      </aside>
      <SidebarOverlay />
    </>
  )
}
