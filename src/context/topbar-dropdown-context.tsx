'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export interface TopbarDropdownContextValue {
  openId: string | null
  isOpen: (id: string) => boolean
  toggle: (id: string) => void
  close: () => void
}

const TopbarDropdownContext = createContext<TopbarDropdownContextValue | undefined>(undefined)

/**
 * Coordinates the topbar's custom dropdowns so only one is open at a time
 * (port of the `openIndex` logic in CoolAdmin's `initTopbarDropdowns`).
 */
export function TopbarDropdownProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const isOpen = useCallback((id: string) => openId === id, [openId])
  const toggle = useCallback((id: string) => setOpenId(curr => (curr === id ? null : id)), [])
  const close = useCallback(() => setOpenId(null), [])
  const value = useMemo(() => ({ openId, isOpen, toggle, close }), [openId, isOpen, toggle, close])
  return <TopbarDropdownContext.Provider value={value}>{children}</TopbarDropdownContext.Provider>
}

/**
 * Dropdown state for one topbar menu. Falls back to local state when rendered
 * outside a `Topbar` so `TopbarMenu` / `AccountMenu` still work standalone.
 */
export function useTopbarDropdown(id: string): {
  open: boolean
  toggle: () => void
  close: () => void
} {
  const ctx = useContext(TopbarDropdownContext)
  const [local, setLocal] = useState(false)
  const open = ctx ? ctx.isOpen(id) : local
  const toggle = useCallback(() => (ctx ? ctx.toggle(id) : setLocal(v => !v)), [ctx, id])
  const close = useCallback(() => (ctx ? ctx.close() : setLocal(false)), [ctx])
  return { open, toggle, close }
}

export function useOptionalTopbarDropdowns(): TopbarDropdownContextValue | undefined {
  return useContext(TopbarDropdownContext)
}
