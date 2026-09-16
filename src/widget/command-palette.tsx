'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Command } from '../types/layout'
import { cn } from '../lib/class-name'
import { useOptionalCommandPalette } from '../context/command-palette-context'
import { useOptionalColorMode } from '../context/color-mode-context'
import { useOptionalSidebar } from '../context/sidebar-context'
import { useOptionalAccent } from '../context/accent-context'
import { useOptionalToast } from '../context/toast-context'

export interface CommandPaletteProps {
  /** Extra commands merged after the provider's list (e.g. page-local actions). */
  commands?: Command[]
  placeholder?: string
  /** Hide the built-in `Actions` group. */
  hideBuiltinActions?: boolean
  /** Override navigation (default: `next/navigation` router push, or `location.assign`). */
  onNavigate?: (href: string) => void
}

interface Scored {
  command: Command
  score: number
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function isSubsequence(needle: string, haystack: string): boolean {
  let i = 0
  for (const ch of haystack) {
    if (ch === needle[i]) i++
    if (i === needle.length) return true
  }
  return needle.length === 0
}

/** Fuzzy-ish ranking: every query token must hit label, keywords, group or description. */
function scoreCommand(command: Command, tokens: string[]): number {
  const label = normalize(command.label)
  const extra = normalize(
    [command.group, command.description ?? '', ...(command.keywords ?? [])].join(' ')
  )
  let total = 0
  for (const token of tokens) {
    let s = 0
    if (label.startsWith(token)) s = 4
    else if (label.split(/\s+/).some(w => w.startsWith(token))) s = 3
    else if (label.includes(token)) s = 2
    else if (extra.includes(token)) s = 1
    else if (token.length >= 2 && isSubsequence(token, label)) s = 0.5
    if (s === 0) return 0
    total += s
  }
  return total
}

/**
 * Cmd/Ctrl+K command palette (port of CoolAdmin's `initCommandPalette`): grouped
 * results, arrow/enter/escape keyboard navigation, overlay-click dismiss.
 * Mounted by `DashboardLayout`; reads state from `CommandPaletteProvider`.
 */
export function CommandPalette({
  commands: extraCommands,
  placeholder = 'Search pages, actions…',
  hideBuiltinActions = false,
  onNavigate,
}: CommandPaletteProps) {
  const palette = useOptionalCommandPalette()
  const colorMode = useOptionalColorMode()
  const sidebar = useOptionalSidebar()
  const accent = useOptionalAccent()
  const toast = useOptionalToast()
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listId = useId()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [shown, setShown] = useState(false)

  const isOpen = palette?.isOpen ?? false

  const builtin = useMemo<Command[]>(() => {
    if (hideBuiltinActions) return []
    const out: Command[] = []
    if (colorMode) {
      const dark = colorMode.resolved === 'dark'
      out.push({
        id: 'action:toggle-dark',
        label: dark ? 'Switch to light mode' : 'Switch to dark mode',
        group: 'Actions',
        icon: dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon',
        keywords: ['theme', 'dark', 'light', 'color mode', 'appearance'],
        onSelect: () => colorMode.setMode(dark ? 'light' : 'dark'),
      })
      out.push({
        id: 'action:auto-mode',
        label: 'Use system color mode',
        group: 'Actions',
        icon: 'fa-solid fa-circle-half-stroke',
        keywords: ['theme', 'auto', 'system'],
        onSelect: () => colorMode.setMode('auto'),
      })
    }
    if (sidebar) {
      out.push({
        id: 'action:toggle-sidebar',
        label: sidebar.collapsed ? 'Expand sidebar' : 'Collapse sidebar',
        group: 'Actions',
        icon: 'fa-solid fa-table-columns',
        keywords: ['menu', 'navigation', 'rail'],
        onSelect: () => sidebar.toggleCollapsed(),
      })
    }
    if (accent) {
      for (const preset of accent.presets) {
        out.push({
          id: `action:accent-${preset.id}`,
          label: `Change accent: ${preset.label}`,
          group: 'Actions',
          icon: 'fa-solid fa-palette',
          keywords: ['theme', 'color', 'accent', preset.id],
          onSelect: () => {
            accent.setAccent(preset.id)
            toast?.success(`Switched to ${preset.label}`)
          },
        })
      }
    }
    return out
  }, [hideBuiltinActions, colorMode, sidebar, accent, toast])

  const allCommands = useMemo<Command[]>(
    () => [...(palette?.commands ?? []), ...builtin, ...(extraCommands ?? [])],
    [palette?.commands, builtin, extraCommands]
  )

  const results = useMemo<Command[]>(() => {
    const tokens = normalize(query).split(/\s+/).filter(Boolean)
    if (!tokens.length) return allCommands
    const scored: Scored[] = []
    allCommands.forEach(command => {
      const score = scoreCommand(command, tokens)
      if (score > 0) scored.push({ command, score })
    })
    scored.sort((a, b) => b.score - a.score)
    return scored.map(s => s.command)
  }, [allCommands, query])

  // Grouped rows with a flat index per item (keyboard navigation walks the flat order).
  const rows = useMemo<Row[]>(() => {
    const map = new Map<string, Command[]>()
    for (const c of results) {
      const list = map.get(c.group)
      if (list) list.push(c)
      else map.set(c.group, [c])
    }
    const out: Row[] = []
    let index = 0
    for (const [group, items] of map) {
      out.push({ kind: 'section', group })
      for (const command of items) out.push({ kind: 'item', command, index: index++ })
    }
    return out
  }, [results])

  // Reset + focus on open; add `is-open` a frame later so the CSS transition plays.
  useEffect(() => {
    if (!isOpen) {
      setShown(false)
      return
    }
    setQuery('')
    setActiveIndex(0)
    const raf = requestAnimationFrame(() => setShown(true))
    const t = setTimeout(() => inputRef.current?.focus(), 50)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [isOpen])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Keep the active row in view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('.cmdk-item.is-active')
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, results])

  const navigate = useCallback(
    (href: string) => {
      if (onNavigate) return onNavigate(href)
      const external = /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:')
      if (!external && router) router.push(href)
      else if (typeof window !== 'undefined') window.location.assign(href)
    },
    [onNavigate, router]
  )

  const activate = useCallback(
    (command?: Command) => {
      const target = command ?? results[activeIndex]
      if (!target) return
      palette?.close()
      if (target.onSelect) target.onSelect()
      if (target.href) navigate(target.href)
    },
    [results, activeIndex, palette, navigate]
  )

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, Math.max(results.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActiveIndex(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActiveIndex(Math.max(results.length - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      activate()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      palette?.close()
    }
  }

  if (!palette || !isOpen) return null

  const activeId = results[activeIndex] ? `${listId}-${activeIndex}` : undefined

  return (
    <div
      className={cn('cmdk-overlay', shown && 'is-open')}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={e => {
        if (e.target === e.currentTarget) palette.close()
      }}
    >
      <div className="cmdk-panel">
        <div className="cmdk-input-wrap">
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          <input
            ref={inputRef}
            className="cmdk-input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="cmdk-hint">esc</kbd>
        </div>

        <ul className="cmdk-results" role="listbox" id={listId} ref={listRef} aria-label="Results">
          {results.length === 0 && <li className="cmdk-empty">No results.</li>}
          {rows.map(row => {
            if (row.kind === 'section') {
              return (
                <li key={`section:${row.group}`} className="cmdk-section" role="presentation">
                  {row.group}
                </li>
              )
            }
            const { command, index } = row
            const active = index === activeIndex
            return (
              <li key={command.id} role="option" aria-selected={active} id={`${listId}-${index}`}>
                <a
                  className={cn('cmdk-item', active && 'is-active')}
                  href={command.href ?? '#'}
                  tabIndex={-1}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={(e: ReactMouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    activate(command)
                  }}
                >
                  <span className="cmdk-item__icon">
                    <i
                      className={command.icon ?? 'fa-solid fa-arrow-turn-down'}
                      aria-hidden="true"
                    />
                  </span>
                  <div className="cmdk-item__body">
                    <div className="cmdk-item__title">{command.label}</div>
                    {command.description && (
                      <div className="cmdk-item__sub">{command.description}</div>
                    )}
                  </div>
                  <span className="cmdk-item__meta">{command.group}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="cmdk-footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate · <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>⌘</kbd>
            <kbd>K</kbd> open
          </span>
        </div>
      </div>
    </div>
  )
}

type Row = { kind: 'section'; group: string } | { kind: 'item'; command: Command; index: number }
