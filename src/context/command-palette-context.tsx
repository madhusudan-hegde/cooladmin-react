'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Command } from '../types/layout'
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut'

export interface CommandPaletteContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  /** Page/consumer commands registered on the provider. */
  commands: Command[]
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | undefined>(undefined)

export interface CommandPaletteProviderProps {
  /** Navigation + consumer commands (built-in `Actions` are added by `<CommandPalette>`). */
  commands?: Command[]
  /** Global shortcut (default `'mod+k'`). Pass `null` to disable. */
  shortcut?: string | null
  children: ReactNode
}

export function CommandPaletteProvider({
  commands = [],
  shortcut = 'mod+k',
  children,
}: CommandPaletteProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(o => !o), [])

  useKeyboardShortcut(shortcut ?? 'mod+k', toggle, {
    enabled: shortcut !== null,
    allowInInputs: true,
  })

  const value = useMemo<CommandPaletteContextValue>(
    () => ({ isOpen, open, close, toggle, commands }),
    [isOpen, open, close, toggle, commands]
  )

  return <CommandPaletteContext.Provider value={value}>{children}</CommandPaletteContext.Provider>
}

export function useCommandPalette(): CommandPaletteContextValue {
  const ctx = useContext(CommandPaletteContext)
  if (!ctx) throw new Error('useCommandPalette must be used within CommandPaletteProvider')
  return ctx
}

/** Like `useCommandPalette` but returns `undefined` outside a provider. */
export function useOptionalCommandPalette(): CommandPaletteContextValue | undefined {
  return useContext(CommandPaletteContext)
}
