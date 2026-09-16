'use client'

import { useEffect, useState } from 'react'
import type { FocusEvent, MouseEvent } from 'react'
import type { MenuGroupNode, MenuNode } from '../types/menu'
import { cn } from '../lib/class-name'
import { useLinkComponent } from '../context/link-context'
import { useSidebar } from '../context/sidebar-context'
import { useSidebarTooltip } from './sidebar-tooltip'

export interface SidebarNavItemProps {
  item: MenuNode
  currentPath: string
  depth?: number
}

export function isPathActive(currentPath: string, href: string): boolean {
  if (!href || href === '#') return false
  const clean = (p: string) => (p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p)
  const cur = clean(currentPath.split(/[?#]/)[0] ?? '')
  const target = clean(href.split(/[?#]/)[0] ?? '')
  if (target === '/') return cur === '/'
  return cur === target || cur.startsWith(`${target}/`)
}

export function containsActive(node: MenuNode, currentPath: string): boolean {
  if (node.type === 'item') return isPathActive(currentPath, node.href)
  if (node.type === 'group') return node.children.some(c => containsActive(c, currentPath))
  return false
}

function Badge({ value }: { value?: string | number }) {
  if (value === undefined || value === '') return null
  return <span className="navbar__badge">{value}</span>
}

/** Collapsible group — isolated so its hooks run unconditionally. */
function SidebarNavGroup({
  item,
  currentPath,
  depth,
}: {
  item: MenuGroupNode
  currentPath: string
  depth: number
}) {
  const { collapsed, isMobile } = useSidebar()
  const tooltip = useSidebarTooltip()
  const active = containsActive(item, currentPath)
  const [isOpen, setIsOpen] = useState(active)

  // Route changes: reveal the group that now holds the active page.
  useEffect(() => {
    if (active) setIsOpen(true)
  }, [active, currentPath])

  // Collapsing to the icon rail strips expanded sub-list state (as CoolAdmin does).
  useEffect(() => {
    if (collapsed && !isMobile) setIsOpen(false)
  }, [collapsed, isMobile])

  const iconRail = collapsed && !isMobile && depth === 0

  // Open state is expressed purely through classes (`li.has-sub.open`,
  // `a.js-arrow.open`, `ul.navbar__sub-list.is-open`) — the stylesheet shows
  // the sub-list and rotates the caret off these, so no inline `display`.
  return (
    <li className={cn('has-sub', active && 'active', isOpen && 'open')}>
      <a
        className={cn('js-arrow', isOpen && 'open')}
        href="#"
        role="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        data-label={item.label}
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault()
          if (iconRail) return
          setIsOpen(o => !o)
        }}
        onMouseEnter={e => tooltip?.show(item.label, e.currentTarget)}
        onMouseLeave={() => tooltip?.hide()}
        onFocus={(e: FocusEvent<HTMLAnchorElement>) => tooltip?.show(item.label, e.currentTarget)}
        onBlur={() => tooltip?.hide()}
      >
        {item.icon && <i className={item.icon} aria-hidden="true" />}
        {item.label}
        <Badge value={item.badge} />
      </a>
      <ul
        className={cn('list-unstyled navbar__sub-list', isOpen && 'is-open')}
        aria-hidden={!isOpen}
      >
        {item.children.map((child, idx) => (
          <SidebarNavItem
            key={child.type === 'item' ? child.href : `${child.type}-${idx}`}
            item={child}
            currentPath={currentPath}
            depth={depth + 1}
          />
        ))}
      </ul>
    </li>
  )
}

/**
 * One sidebar node: header (`li.nav-group-label`), link (`li(.active) > a`) or
 * collapsible group (`li.has-sub(.open) > a.js-arrow(.open) + ul.navbar__sub-list(.is-open)`).
 */
export function SidebarNavItem({ item, currentPath, depth = 0 }: SidebarNavItemProps) {
  const Link = useLinkComponent()
  const { isMobile, setOpen } = useSidebar()
  const tooltip = useSidebarTooltip()

  if (item.type === 'header') {
    // CoolAdmin's own class for section headings between nav groups.
    return <li className="nav-group-label">{item.label}</li>
  }

  if (item.type === 'item') {
    const active = isPathActive(currentPath, item.href)
    return (
      <li className={cn(active && 'active')}>
        <Link
          href={item.href}
          target={item.target}
          rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
          aria-current={active ? 'page' : undefined}
          onClick={() => {
            // Tapping a nav link on mobile closes the drawer.
            if (isMobile) setOpen(false)
          }}
          onMouseEnter={e => depth === 0 && tooltip?.show(item.label, e.currentTarget)}
          onMouseLeave={() => tooltip?.hide()}
          onFocus={e => depth === 0 && tooltip?.show(item.label, e.currentTarget)}
          onBlur={() => tooltip?.hide()}
        >
          {item.icon && <i className={item.icon} aria-hidden="true" />}
          {item.label}
          <Badge value={item.badge} />
        </Link>
      </li>
    )
  }

  return <SidebarNavGroup item={item} currentPath={currentPath} depth={depth} />
}
