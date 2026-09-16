'use client'

import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { AccentPreset, AccentPresetInfo } from '../types/theme'
import { ACCENT_PRESETS, DEFAULT_ACCENT, isAccentPreset } from '../lib/accent-presets'
import { useLocalStorage } from '../hooks/use-local-storage'

export const ACCENT_STORAGE_KEY = 'cooladmin.accent'

export interface AccentContextValue {
  accent: AccentPreset
  setAccent: (accent: AccentPreset) => void
  presets: readonly AccentPresetInfo[]
}

const AccentContext = createContext<AccentContextValue | undefined>(undefined)

export interface AccentProviderProps {
  /** Used until the visitor picks a preset (default `'blue'`). */
  initialAccent?: AccentPreset
  children: ReactNode
}

/**
 * Persists the accent preset under `cooladmin.accent`. The matching
 * `theme-<accent>` body class is applied by `BodyClassSync`.
 */
export function AccentProvider({ initialAccent = DEFAULT_ACCENT, children }: AccentProviderProps) {
  const [stored, setStored] = useLocalStorage<AccentPreset>(ACCENT_STORAGE_KEY, initialAccent)
  const accent: AccentPreset = isAccentPreset(stored) ? stored : initialAccent

  const setAccent = useCallback(
    (next: AccentPreset) => {
      if (isAccentPreset(next)) setStored(next)
    },
    [setStored]
  )

  const value = useMemo<AccentContextValue>(
    () => ({ accent, setAccent, presets: ACCENT_PRESETS }),
    [accent, setAccent]
  )

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>
}

export function useAccent(): AccentContextValue {
  const ctx = useContext(AccentContext)
  if (!ctx) throw new Error('useAccent must be used within AccentProvider')
  return ctx
}

/** Like `useAccent` but returns `undefined` outside a provider. */
export function useOptionalAccent(): AccentContextValue | undefined {
  return useContext(AccentContext)
}
