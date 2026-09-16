/**
 * Safe localStorage wrapper. Every call is guarded (SSR, private mode,
 * quota errors) and values are stored as JSON.
 */

/** Dispatched on `window` after every write so same-tab subscribers re-read. */
export const STORAGE_EVENT = 'cooladmin:storage'

function available(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export const storage = {
  /** Raw string value (or `null`). */
  getRaw(key: string): string | null {
    if (!available()) return null
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },

  /** Parsed JSON value, or `fallback` when missing / unparsable. */
  get<T>(key: string, fallback: T): T {
    const raw = storage.getRaw(key)
    if (raw === null) return fallback
    try {
      return JSON.parse(raw) as T
    } catch {
      return fallback
    }
  },

  /** Persist a JSON-serialisable value. */
  set(key: string, value: unknown): void {
    if (!available()) return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      window.dispatchEvent(new Event(STORAGE_EVENT))
    } catch {
      // ignore quota / privacy errors
    }
  },

  remove(key: string): void {
    if (!available()) return
    try {
      window.localStorage.removeItem(key)
      window.dispatchEvent(new Event(STORAGE_EVENT))
    } catch {
      // ignore
    }
  },
}
