import { useCallback, useSyncExternalStore } from 'react'

/**
 * Reactive `window.matchMedia` — SSR/hydration-safe. Returns `defaultValue`
 * on the server and during hydration, then the live match state.
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => {}
      }
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function')
      return defaultValue
    return window.matchMedia(query).matches
  }, [query, defaultValue])

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
