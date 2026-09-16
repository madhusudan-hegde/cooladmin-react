import { useCallback, useMemo, useSyncExternalStore } from 'react'
import { storage, STORAGE_EVENT } from '../lib/storage'

function subscribe(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', onChange)
  window.addEventListener(STORAGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(STORAGE_EVENT, onChange)
  }
}

/**
 * `useState` persisted to localStorage as JSON. Hydration-safe: the server and
 * the hydrating render see `initial`; the stored value applies right after.
 * Same-tab and cross-tab writes stay in sync.
 */
export function useLocalStorage<T>(
  key: string,
  initial: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const getSnapshot = useCallback(() => storage.getRaw(key), [key])
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null)

  const value = useMemo<T>(() => {
    if (raw === null) return initial
    try {
      return JSON.parse(raw) as T
    } catch {
      return initial
    }
  }, [raw, initial])

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const current = storage.get<T>(key, initial)
      const resolved = typeof next === 'function' ? (next as (prev: T) => T)(current) : next
      storage.set(key, resolved)
    },
    [key, initial]
  )

  return [value, setValue]
}
