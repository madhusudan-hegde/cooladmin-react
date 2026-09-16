'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { MButton, useToast } from '@madhusudan-hegde/cooladmin-react'

/** Matches CoolAdmin's `initDashboardRefresh` skeleton duration. */
const REFRESH_MS = 1200

interface DashboardRefreshValue {
  refreshing: boolean
  refresh: () => void
}

const DashboardRefreshContext = createContext<DashboardRefreshValue>({
  refreshing: false,
  refresh: () => {},
})

/**
 * Shares a "refreshing" flag between the page-header Refresh button and the
 * cards that swap to skeletons while it is set (port of `initDashboardRefresh`).
 */
export function DashboardRefreshProvider({ children }: { children: ReactNode }) {
  const [refreshing, setRefreshing] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const toast = useToast()

  const refresh = useCallback(() => {
    if (timer.current) return
    setRefreshing(true)
    timer.current = setTimeout(() => {
      timer.current = null
      setRefreshing(false)
      toast.success('Dashboard data refreshed')
    }, REFRESH_MS)
  }, [toast])

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const value = useMemo(() => ({ refreshing, refresh }), [refreshing, refresh])
  return (
    <DashboardRefreshContext.Provider value={value}>{children}</DashboardRefreshContext.Provider>
  )
}

export function useDashboardRefresh(): DashboardRefreshValue {
  return useContext(DashboardRefreshContext)
}

/** Ghost "Refresh" button for the page header; shows a spinner while refreshing. */
export function DashboardRefreshButton() {
  const { refreshing, refresh } = useDashboardRefresh()
  return (
    <MButton
      variant="ghost"
      icon="fa-solid fa-arrows-rotate"
      loading={refreshing}
      onClick={refresh}
      aria-label="Refresh dashboard data"
    >
      {refreshing ? 'Refreshing…' : 'Refresh'}
    </MButton>
  )
}

export interface RefreshableProps {
  /** Rendered while the dashboard is refreshing. */
  skeleton: ReactNode
  children: ReactNode
}

/** Swaps `children` for `skeleton` while a refresh is in flight. */
export function Refreshable({ skeleton, children }: RefreshableProps) {
  const { refreshing } = useDashboardRefresh()
  return <>{refreshing ? skeleton : children}</>
}
