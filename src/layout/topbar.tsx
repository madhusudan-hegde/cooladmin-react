'use client'

import { useRef } from 'react'
import type { ReactNode } from 'react'
import type { DashboardUser } from '../types/layout'
import { cn } from '../lib/class-name'
import { useSidebar } from '../context/sidebar-context'
import {
  TopbarDropdownProvider,
  useOptionalTopbarDropdowns,
} from '../context/topbar-dropdown-context'
import { useClickOutside } from '../hooks/use-click-outside'
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut'
import { TopbarSearch } from './topbar-search'
import { AccountMenu } from './account-menu'

export interface TopbarProps {
  /** Rendered after the search field. */
  start?: ReactNode
  /** Rendered inside `.noti-wrap` (place `<TopbarMenu>`s here). */
  end?: ReactNode
  user?: DashboardUser
  /** Replaces the default `<AccountMenu user={user} />`. */
  accountMenu?: ReactNode
  showSearch?: boolean
  className?: string
}

function TopbarInner({ start, end, user, accountMenu, showSearch = true, className }: TopbarProps) {
  const { collapsed, open, isMobile, toggleCollapsed, toggleOpen } = useSidebar()
  const dropdowns = useOptionalTopbarDropdowns()
  const buttonsRef = useRef<HTMLDivElement>(null)

  // One place closes every topbar dropdown on outside click / Escape.
  useClickOutside(buttonsRef, () => dropdowns?.close(), !!dropdowns?.openId)
  useKeyboardShortcut('Escape', () => dropdowns?.close(), {
    enabled: !!dropdowns?.openId,
    preventDefault: false,
    allowInInputs: true,
  })

  const expanded = isMobile ? open : !collapsed
  const account = accountMenu ?? (user ? <AccountMenu user={user} /> : null)

  return (
    <header className={cn('header-desktop', className)}>
      <div className="section__content section__content--p30">
        <div className="container-fluid">
          <div className="header-wrap">
            <button
              className="sidebar-toggle"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={expanded}
              aria-controls="main-sidebar"
              onClick={() => (isMobile ? toggleOpen() : toggleCollapsed())}
            >
              <i className="fa-solid fa-bars" aria-hidden="true" />
            </button>

            {showSearch && <TopbarSearch />}
            {start}

            <div className="header-button" ref={buttonsRef}>
              <div className="noti-wrap">{end}</div>
              {account && <div className="account-wrap">{account}</div>}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/**
 * `header.header-desktop > .header-wrap` — sidebar toggle, palette-backed
 * search, consumer slots and the account menu. Dropdown open-state is lifted
 * here so only one topbar dropdown is open at a time.
 */
export function Topbar(props: TopbarProps) {
  return (
    <TopbarDropdownProvider>
      <TopbarInner {...props} />
    </TopbarDropdownProvider>
  )
}
