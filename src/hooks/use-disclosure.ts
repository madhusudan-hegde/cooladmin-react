'use client'

import { useCallback, useState } from 'react'

export interface UseDisclosureReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  setOpen: (open: boolean) => void
}

/**
 * Boolean open/closed state with stable handlers — the usual companion for
 * `Modal`, dropdowns and collapsibles.
 */
export function useDisclosure(initial = false): UseDisclosureReturn {
  const [isOpen, setOpen] = useState(initial)
  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen(v => !v), [])
  return { isOpen, open, close, toggle, setOpen }
}
