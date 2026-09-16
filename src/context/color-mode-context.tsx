'use client'

import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { ColorMode } from '../types/theme'
import { useLocalStorage } from '../hooks/use-local-storage'
import { useMediaQuery } from '../hooks/use-media-query'

export const COLOR_MODE_STORAGE_KEY = 'cooladmin.color-mode'
const MODES: readonly ColorMode[] = ['light', 'dark', 'auto']

export interface ColorModeContextValue {
  mode: ColorMode
  /** `mode` with `'auto'` resolved against `prefers-color-scheme`. */
  resolved: 'light' | 'dark'
  setMode: (mode: ColorMode) => void
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined)

export interface ColorModeProviderProps {
  /** Used until the visitor picks a mode (default `'auto'`). */
  initialMode?: ColorMode
  children: ReactNode
}

/**
 * Persists the color mode under `cooladmin.color-mode` and mirrors the resolved
 * value onto `<html data-bs-theme>` (Bootstrap 5.3's color-mode hook).
 */
export function ColorModeProvider({ initialMode = 'auto', children }: ColorModeProviderProps) {
  const [stored, setStored] = useLocalStorage<ColorMode>(COLOR_MODE_STORAGE_KEY, initialMode)
  const mode: ColorMode = MODES.includes(stored) ? stored : initialMode
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)', false)
  const resolved: 'light' | 'dark' = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-bs-theme', resolved)
  }, [resolved])

  const setMode = useCallback(
    (next: ColorMode) => {
      if (MODES.includes(next)) setStored(next)
    },
    [setStored]
  )

  const value = useMemo<ColorModeContextValue>(
    () => ({ mode, resolved, setMode }),
    [mode, resolved, setMode]
  )

  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>
}

export function useColorMode(): ColorModeContextValue {
  const ctx = useContext(ColorModeContext)
  if (!ctx) throw new Error('useColorMode must be used within ColorModeProvider')
  return ctx
}

/** Like `useColorMode` but returns `undefined` outside a provider. */
export function useOptionalColorMode(): ColorModeContextValue | undefined {
  return useContext(ColorModeContext)
}
