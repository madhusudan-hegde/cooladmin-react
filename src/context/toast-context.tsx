'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { ToastOptions, ToastType } from '../types/layout'
import { ToastContainer } from '../widget/toast'
import type { ToastRecord } from '../widget/toast'

export interface ToastHandle {
  id: number
  dismiss: () => void
}

export interface ToastContextValue {
  show: (opts: ToastOptions) => ToastHandle
  success: (title: string, message?: string) => ToastHandle
  info: (title: string, message?: string) => ToastHandle
  warning: (title: string, message?: string) => ToastHandle
  error: (title: string, message?: string) => ToastHandle
  dismiss: (id: number) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export interface ToastProviderProps {
  /** Default auto-dismiss delay in ms (default 4000). */
  duration?: number
  /** Cap on simultaneously visible toasts (oldest are dropped). */
  max?: number
  children: ReactNode
}

/**
 * Toast notifications (port of CoolAdmin's `initToastSystem`). Mounts a
 * `.toast-container` (fixed, top-right) and exposes `useToast()`.
 */
export function ToastProvider({ duration = 4000, max = 5, children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([])
  const counter = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts(list => list.filter(t => t.id !== id))
  }, [])

  const show = useCallback(
    (opts: ToastOptions): ToastHandle => {
      const id = ++counter.current
      const type: ToastType = opts.type ?? 'info'
      const record: ToastRecord = {
        id,
        type,
        title: opts.title,
        message: opts.message,
        duration: opts.duration ?? duration,
      }
      setToasts(list => [...list, record].slice(-max))
      return { id, dismiss: () => dismiss(id) }
    },
    [duration, max, dismiss]
  )

  const value = useMemo<ToastContextValue>(
    () => ({
      show,
      dismiss,
      success: (title, message) => show({ type: 'success', title, message }),
      info: (title, message) => show({ type: 'info', title, message }),
      warning: (title, message) => show({ type: 'warning', title, message }),
      error: (title, message) => show({ type: 'error', title, message }),
    }),
    [show, dismiss]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

/** Like `useToast` but returns `undefined` outside a provider. */
export function useOptionalToast(): ToastContextValue | undefined {
  return useContext(ToastContext)
}
