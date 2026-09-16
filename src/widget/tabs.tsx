'use client'

import { useId, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export type TabsVariant = 'tabs' | 'pills' | 'settings'

export interface TabItem {
  id: string
  label: ReactNode
  /** Leading icon — Font Awesome 7 class string. */
  icon?: string
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  /** Initial tab (uncontrolled). Defaults to the first enabled item. */
  defaultActiveId?: string
  /** Active tab (controlled). Pair with `onChange`. */
  activeId?: string
  onChange?: (id: string) => void
  /** `tabs` = Bootstrap `.nav-tabs`, `pills` = `.nav-pills`, `settings` = CoolAdmin's underline `.settings-tabs`. */
  variant?: TabsVariant
  /** Bootstrap `.nav-fill`. */
  fill?: boolean
  /** Bootstrap `.nav-justified`. */
  justified?: boolean
  /** Stack the tab list beside the panes (`.tabs--vertical` + `.flex-column`). */
  vertical?: boolean
  className?: string
  /** Base for the generated tab/pane ids (default `useId`). */
  id?: string
}

const NAV_CLASS: Record<TabsVariant, string> = {
  tabs: 'nav nav-tabs',
  pills: 'nav nav-pills',
  settings: 'nav nav-tabs settings-tabs',
}

/**
 * Accessible tabs (`ul.nav[role=tablist] > li.nav-item > button.nav-link[role=tab]`
 * + `.tab-content > .tab-pane`) driven entirely by React state — no Bootstrap JS.
 * Roving tabindex; Arrow keys, Home and End move focus and selection.
 */
export function Tabs({
  items,
  defaultActiveId,
  activeId,
  onChange,
  variant = 'tabs',
  fill = false,
  justified = false,
  vertical = false,
  className,
  id,
}: TabsProps) {
  const autoId = useId()
  const baseId = id ?? autoId
  const [internalId, setInternalId] = useState(
    () => defaultActiveId ?? items.find(i => !i.disabled)?.id ?? items[0]?.id
  )
  const isControlled = activeId !== undefined
  const currentId = isControlled ? activeId : internalId
  const tabRefs = useRef(new Map<string, HTMLButtonElement>())

  const tabId = (itemId: string) => `${baseId}-tab-${itemId}`
  const paneId = (itemId: string) => `${baseId}-pane-${itemId}`

  const select = (itemId: string) => {
    if (itemId === currentId) return
    if (!isControlled) setInternalId(itemId)
    onChange?.(itemId)
  }

  const focusAndSelect = (item: TabItem) => {
    tabRefs.current.get(item.id)?.focus()
    select(item.id)
  }

  const onKeyDown = (e: ReactKeyboardEvent<HTMLUListElement>) => {
    const enabled = items.filter(i => !i.disabled)
    if (!enabled.length) return
    const index = Math.max(
      0,
      enabled.findIndex(i => i.id === currentId)
    )
    const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft'
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight'
    let target: TabItem | undefined
    if (e.key === nextKey || e.key === 'ArrowRight') target = enabled[(index + 1) % enabled.length]
    else if (e.key === prevKey || e.key === 'ArrowLeft')
      target = enabled[(index - 1 + enabled.length) % enabled.length]
    else if (e.key === 'Home') target = enabled[0]
    else if (e.key === 'End') target = enabled[enabled.length - 1]
    if (!target) return
    e.preventDefault()
    focusAndSelect(target)
  }

  return (
    <div className={cn('tabs', vertical && 'tabs--vertical', className)}>
      <ul
        className={cn(
          NAV_CLASS[variant],
          fill && 'nav-fill',
          justified && 'nav-justified',
          vertical && 'flex-column'
        )}
        role="tablist"
        aria-orientation={vertical ? 'vertical' : undefined}
        onKeyDown={onKeyDown}
      >
        {items.map(item => {
          const active = item.id === currentId
          return (
            <li key={item.id} className="nav-item" role="presentation">
              <button
                ref={el => {
                  if (el) tabRefs.current.set(item.id, el)
                  else tabRefs.current.delete(item.id)
                }}
                type="button"
                id={tabId(item.id)}
                className={cn('nav-link', active && 'active')}
                role="tab"
                aria-selected={active}
                aria-controls={paneId(item.id)}
                tabIndex={active ? 0 : -1}
                disabled={item.disabled}
                onClick={() => select(item.id)}
              >
                {item.icon && <i className={item.icon} aria-hidden="true" />}
                {item.icon ? ' ' : null}
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
      <div className="tab-content">
        {items.map(item => {
          const active = item.id === currentId
          return (
            <div
              key={item.id}
              id={paneId(item.id)}
              className={cn('tab-pane', 'fade', active && 'show active')}
              role="tabpanel"
              aria-labelledby={tabId(item.id)}
              tabIndex={active ? 0 : undefined}
              hidden={!active}
            >
              {item.content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
