'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/use-local-storage'
import { useMediaQuery } from '../hooks/use-media-query'
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut'

/** CoolAdmin's sidebar breakpoint (`MOBILE_BP = 992`, CSS `991.98px`). */
export const SIDEBAR_BREAKPOINT = 992
export const SIDEBAR_MEDIA_QUERY = '(max-width: 991.98px)'
export const SIDEBAR_STORAGE_KEY = 'cooladmin.sidebar'

export interface SidebarContextValue {
  /** Desktop icon-rail state (`body.sidebar-collapsed`); persisted. */
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
  /** Mobile drawer state (`body.sidebar-open`); never persisted. */
  open: boolean
  setOpen: (open: boolean) => void
  toggleOpen: () => void
  /** `true` below 992px. */
  isMobile: boolean
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

interface SidebarStorage {
  collapsed: boolean
}

export interface SidebarProviderProps {
  /** Initial collapsed state when nothing is persisted yet. */
  defaultCollapsed?: boolean
  children: ReactNode
}

export function SidebarProvider({ defaultCollapsed = false, children }: SidebarProviderProps) {
  const initial = useMemo<SidebarStorage>(
    () => ({ collapsed: defaultCollapsed }),
    [defaultCollapsed]
  )
  const [stored, setStored] = useLocalStorage<SidebarStorage>(SIDEBAR_STORAGE_KEY, initial)
  const collapsed = !!stored?.collapsed

  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery(SIDEBAR_MEDIA_QUERY, false)

  const setCollapsed = useCallback((value: boolean) => setStored({ collapsed: value }), [setStored])
  const toggleCollapsed = useCallback(
    () => setStored(prev => ({ collapsed: !prev?.collapsed })),
    [setStored]
  )
  const toggleOpen = useCallback(() => setOpen(v => !v), [])

  // Crossing the breakpoint clears the mobile-only drawer state.
  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  // Escape closes the drawer.
  useKeyboardShortcut('Escape', () => setOpen(false), {
    enabled: open,
    preventDefault: false,
    allowInInputs: true,
  })

  const value = useMemo<SidebarContextValue>(
    () => ({ collapsed, setCollapsed, toggleCollapsed, open, setOpen, toggleOpen, isMobile }),
    [collapsed, setCollapsed, toggleCollapsed, open, toggleOpen, isMobile]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}

/** Like `useSidebar` but returns `undefined` outside a provider (for optional wiring). */
export function useOptionalSidebar(): SidebarContextValue | undefined {
  return useContext(SidebarContext)
}
