'use client'

import { useId, useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import type { DashboardUser } from '../types/layout'
import { cn } from '../lib/class-name'
import { useTopbarDropdown, useOptionalTopbarDropdowns } from '../context/topbar-dropdown-context'
import { useLinkComponent } from '../context/link-context'
import { useClickOutside } from '../hooks/use-click-outside'
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut'

export interface AccountMenuLink {
  label: ReactNode
  href: string
  /** Font Awesome 7 class string. */
  icon?: string
}

export interface AccountMenuProps {
  user: DashboardUser
  items?: AccountMenuLink[]
  logoutHref?: string
  logoutLabel?: ReactNode
  /** Extra content between the items and the logout row. */
  children?: ReactNode
  className?: string
}

const DEFAULT_ITEMS: AccountMenuLink[] = [
  { label: 'Account', href: '#', icon: 'fa-solid fa-user' },
  { label: 'Setting', href: '#', icon: 'fa-solid fa-gear' },
  { label: 'Billing', href: '#', icon: 'fa-solid fa-sack-dollar' },
]

/**
 * Topbar account dropdown (`.account-item > .account-dropdown`). Same custom
 * dropdown mechanics as `TopbarMenu`.
 */
export function AccountMenu({
  user,
  items = DEFAULT_ITEMS,
  logoutHref = '#',
  logoutLabel = 'Logout',
  children,
  className,
}: AccountMenuProps) {
  const id = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const Link = useLinkComponent()
  const { open, toggle, close } = useTopbarDropdown(id)
  const coordinated = !!useOptionalTopbarDropdowns()

  useClickOutside(rootRef, close, open && !coordinated)
  useKeyboardShortcut('Escape', close, {
    enabled: open && !coordinated,
    preventDefault: false,
    allowInInputs: true,
  })

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  const avatar = user.avatarSrc ? (
    <img src={user.avatarSrc} alt="" />
  ) : (
    <span className="account-initials" aria-hidden="true">
      {user.name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(p => p.charAt(0).toUpperCase())
        .join('')}
    </span>
  )

  return (
    <div
      ref={rootRef}
      className={cn('account-item', 'clearfix', 'js-item-menu', open && 'show-dropdown', className)}
      role="button"
      tabIndex={0}
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls={`${id}-menu`}
      aria-label="Account menu"
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      <div className="image">{avatar}</div>
      <div className="content">
        <a
          className="js-acc-btn"
          href="#"
          tabIndex={-1}
          onClick={e => {
            e.preventDefault()
          }}
        >
          {user.name}
        </a>
      </div>

      <div
        className="account-dropdown js-dropdown"
        id={`${id}-menu`}
        role="region"
        aria-label="Account"
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
      >
        <div className="info clearfix">
          <div className="image">{avatar}</div>
          <div className="content">
            <h5 className="name">{user.name}</h5>
            <span className="email">{user.email ?? user.role}</span>
          </div>
        </div>
        {items.length > 0 && (
          <div className="account-dropdown__body">
            {items.map((item, i) => (
              <div className="account-dropdown__item" key={`${item.href}-${i}`}>
                <Link href={item.href} onClick={close}>
                  {item.icon && <i className={item.icon} aria-hidden="true" />}
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        )}
        {children}
        <div className="account-dropdown__footer">
          <Link href={logoutHref} onClick={close}>
            <i className="fa-solid fa-power-off" aria-hidden="true" />
            {logoutLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
