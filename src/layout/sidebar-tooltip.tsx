'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../lib/class-name'
import { useSidebar } from '../context/sidebar-context'

export interface SidebarTooltipContextValue {
  show: (label: string, anchor: Element) => void
  hide: () => void
}

const SidebarTooltipContext = createContext<SidebarTooltipContextValue | undefined>(undefined)

interface TipState {
  label: string
  left: number
  top: number
}

/**
 * Single shared `.sidebar-tooltip` portalled into `<body>` (so it escapes the
 * sidebar's scroll clipping), shown when hovering/focusing a top-level nav item
 * while the sidebar is collapsed on desktop — port of `initSidebarTooltips`.
 */
export function SidebarTooltipProvider({ children }: { children: ReactNode }) {
  const { collapsed, isMobile } = useSidebar()
  const [tip, setTip] = useState<TipState | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const show = useCallback(
    (label: string, anchor: Element) => {
      if (!collapsed || isMobile || !label) return
      const r = anchor.getBoundingClientRect()
      setTip({ label, left: r.right + 10, top: r.top + r.height / 2 })
    },
    [collapsed, isMobile]
  )
  const hide = useCallback(() => setTip(null), [])

  // Hide whenever we leave the collapsed-desktop state or the window resizes/scrolls.
  useEffect(() => {
    if (!collapsed || isMobile) setTip(null)
  }, [collapsed, isMobile])

  useEffect(() => {
    if (!tip) return
    const onChange = () => setTip(null)
    window.addEventListener('resize', onChange)
    window.addEventListener('scroll', onChange, true)
    return () => {
      window.removeEventListener('resize', onChange)
      window.removeEventListener('scroll', onChange, true)
    }
  }, [tip])

  const value = useMemo(() => ({ show, hide }), [show, hide])

  return (
    <SidebarTooltipContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div
            className={cn('sidebar-tooltip', tip && 'is-visible')}
            role="tooltip"
            style={tip ? { left: tip.left, top: tip.top } : undefined}
          >
            {tip?.label}
          </div>,
          document.body
        )}
    </SidebarTooltipContext.Provider>
  )
}

export function useSidebarTooltip(): SidebarTooltipContextValue | undefined {
  return useContext(SidebarTooltipContext)
}
