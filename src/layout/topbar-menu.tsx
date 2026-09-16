'use client'

import { Fragment, useId, useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import type { AccentSlot } from '../types/theme'
import { cn } from '../lib/class-name'
import { useTopbarDropdown, useOptionalTopbarDropdowns } from '../context/topbar-dropdown-context'
import { useClickOutside } from '../hooks/use-click-outside'
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut'

export interface TopbarMenuItem {
  id: string | number
  title: ReactNode
  text?: ReactNode
  /** Timestamp / secondary line. */
  meta?: ReactNode
  avatarSrc?: string
  /** Font Awesome 7 class string (used when there is no avatar). */
  icon?: string
  iconColor?: AccentSlot
  href?: string
}

export type TopbarMenuVariant = 'messages' | 'emails' | 'notifications'

export interface TopbarMenuProps {
  /** Trigger icon — Font Awesome 7 class string. */
  icon: string
  /** Unread count badge (`.quantity`); hidden when 0/undefined. */
  count?: number
  /** Heading inside the dropdown (also the trigger's aria-label). */
  title: string
  items: TopbarMenuItem[]
  footerLabel?: string
  footerHref?: string
  variant: TopbarMenuVariant
  /** Replace the default item rendering. */
  renderItem?: (item: TopbarMenuItem) => ReactNode
  className?: string
}

const DROPDOWN_CLASS: Record<TopbarMenuVariant, string> = {
  messages: 'mess',
  emails: 'email',
  notifications: 'notifi',
}

/**
 * Topbar `.noti__item` with a CoolAdmin-style dropdown
 * (`.mess-dropdown` / `.email-dropdown` / `.notifi-dropdown`). Custom React
 * state — no Bootstrap JS; click-outside and Escape close it, and only one
 * topbar dropdown is open at a time.
 */
export function TopbarMenu({
  icon,
  count,
  title,
  items,
  footerLabel,
  footerHref = '#',
  variant,
  renderItem,
  className,
}: TopbarMenuProps) {
  const id = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const { open, toggle, close } = useTopbarDropdown(id)
  const coordinated = !!useOptionalTopbarDropdowns()
  const prefix = DROPDOWN_CLASS[variant]

  // Standalone (outside <Topbar>): handle outside-click/Escape locally.
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

  return (
    <div
      ref={rootRef}
      className={cn('noti__item', 'js-item-menu', open && 'show-dropdown', className)}
      role="button"
      tabIndex={0}
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls={`${id}-menu`}
      aria-label={count ? `${title} (${count} new)` : title}
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      <i className={icon} aria-hidden="true" />
      {count ? <span className="quantity">{count}</span> : null}

      <div
        className={cn(`${prefix}-dropdown`, 'js-dropdown')}
        id={`${id}-menu`}
        role="region"
        aria-label={title}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
      >
        <div className={`${prefix}__title`}>
          <p>{title}</p>
        </div>
        {items.map(item =>
          renderItem ? (
            <Fragment key={item.id}>{renderItem(item)}</Fragment>
          ) : (
            <div className={`${prefix}__item`} key={item.id}>
              {item.avatarSrc ? (
                <div className="image img-cir img-40">
                  <img src={item.avatarSrc} alt="" />
                </div>
              ) : (
                <div className={cn(`bg-${item.iconColor ?? 'c1'}`, 'img-cir', 'img-40')}>
                  <i className={item.icon ?? 'fa-solid fa-bell'} aria-hidden="true" />
                </div>
              )}
              <div className="content">
                {variant === 'messages' ? (
                  <>
                    <h6>{item.href ? <a href={item.href}>{item.title}</a> : item.title}</h6>
                    {item.text && <p>{item.text}</p>}
                    {item.meta && <span className="time">{item.meta}</span>}
                  </>
                ) : (
                  <>
                    <p>{item.href ? <a href={item.href}>{item.title}</a> : item.title}</p>
                    {item.text && <span>{item.text}</span>}
                    {item.meta && (
                      <span className={variant === 'notifications' ? 'date' : undefined}>
                        {item.meta}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        )}
        {footerLabel && (
          <div className={`${prefix}__footer`}>
            <a href={footerHref}>{footerLabel}</a>
          </div>
        )}
      </div>
    </div>
  )
}
