'use client'

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import type { LinkComponent } from '../types/layout'
import { LinkProvider } from './link-context'

/** Options accepted by `navigate()`. */
export interface NavigateOptions {
  /** Replace the current history entry instead of pushing a new one. */
  replace?: boolean
}

/**
 * The router surface the library needs: where we are, and how to go somewhere.
 * Framework adapters (`@madhusudan-hegde/cooladmin-react/next`, `/react-router`)
 * implement it; without a provider the browser `location` is used.
 */
export interface NavigationAdapter {
  /** Current path (`/dashboard/sales`) — drives sidebar active states. */
  pathname: string
  /** Client-side navigation used by the command palette. */
  navigate: (href: string, options?: NavigateOptions) => void
}

const NavigationContext = createContext<NavigationAdapter | null>(null)

const NAVIGATE_EVENT = 'cooladmin:navigate'

function subscribeToLocation(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('popstate', onChange)
  window.addEventListener('hashchange', onChange)
  window.addEventListener(NAVIGATE_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener('hashchange', onChange)
    window.removeEventListener(NAVIGATE_EVENT, onChange)
  }
}

function getLocationPathname(): string {
  return typeof window === 'undefined' ? '' : window.location.pathname
}

function getServerPathname(): string {
  return ''
}

/**
 * Framework-free pathname: `window.location.pathname`, re-read on `popstate`,
 * `hashchange` and after `browserNavigate()`. Returns `''` during SSR and on the
 * first client render (hydration-safe), then the real path.
 */
export function useBrowserPathname(): string {
  return useSyncExternalStore(subscribeToLocation, getLocationPathname, getServerPathname)
}

/** Framework-free navigation: full-page load (external URLs included). */
export function browserNavigate(href: string, options: NavigateOptions = {}): void {
  if (typeof window === 'undefined') return
  if (options.replace) window.location.replace(href)
  else window.location.assign(href)
}

export interface NavigationProviderProps {
  /** Current pathname from your router (e.g. React Router's `useLocation().pathname`). */
  pathname?: string
  /** Client-side navigate from your router (e.g. React Router's `navigate`). */
  navigate?: (href: string, options?: NavigateOptions) => void
  /** Router link component, forwarded to `LinkProvider` (e.g. React Router's `Link`). */
  linkComponent?: LinkComponent
  children: ReactNode
}

/**
 * Supplies the router to every navigational piece of the library (sidebar
 * active states, command palette, links). Any field left out falls back to the
 * browser implementation, so a partial adapter is fine.
 *
 * Framework adapters are thin wrappers around this component — see
 * `src/adapters/next.tsx` and `src/adapters/react-router.tsx`.
 */
export function NavigationProvider({
  pathname,
  navigate,
  linkComponent,
  children,
}: NavigationProviderProps) {
  const browserPathname = useBrowserPathname()
  const value = useMemo<NavigationAdapter>(
    () => ({
      pathname: pathname ?? browserPathname,
      navigate: navigate ?? browserNavigate,
    }),
    [pathname, navigate, browserPathname]
  )

  const tree = <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
  return linkComponent ? <LinkProvider linkComponent={linkComponent}>{tree}</LinkProvider> : tree
}

/**
 * The active navigation adapter — the nearest `NavigationProvider`, or the
 * browser fallback (`location.pathname` + full-page `location.assign`).
 */
export function useNavigation(): NavigationAdapter {
  const ctx = useContext(NavigationContext)
  const browserPathname = useBrowserPathname()
  const fallback = useMemo<NavigationAdapter>(
    () => ({ pathname: browserPathname, navigate: browserNavigate }),
    [browserPathname]
  )
  return ctx ?? fallback
}

/** Current pathname from the active navigation adapter. */
export function usePathname(): string {
  return useNavigation().pathname
}

/** Stable `navigate()` from the active navigation adapter. */
export function useNavigate(): (href: string, options?: NavigateOptions) => void {
  const { navigate } = useNavigation()
  return useCallback(
    (href: string, options?: NavigateOptions) => navigate(href, options),
    [navigate]
  )
}
