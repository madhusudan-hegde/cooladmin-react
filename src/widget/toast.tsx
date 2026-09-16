'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ToastType } from '../types/layout'
import { cn } from '../lib/class-name'

export interface ToastRecord {
  id: number
  type: ToastType
  title: string
  message?: string
  /** ms; `0` disables auto-dismiss. */
  duration: number
}

export const TOAST_ICONS: Record<ToastType, string> = {
  success: 'fa-circle-check',
  info: 'fa-circle-info',
  warning: 'fa-triangle-exclamation',
  error: 'fa-circle-xmark',
}

/** Matches the `.toast.is-leaving` transition in CoolAdmin's `_toast.scss`. */
const LEAVE_MS = 220

export interface ToastItemProps {
  toast: ToastRecord
  onDismiss: (id: number) => void
}

/**
 * One `.toast.toast--<type>`: fades in on mount (`is-visible`), auto-dismisses,
 * and plays the `is-leaving` transition before it is removed.
 */
export function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [phase, setPhase] = useState<'enter' | 'visible' | 'leaving'>('enter')
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dismiss = useCallback(() => {
    setPhase(p => {
      if (p === 'leaving') return p
      return 'leaving'
    })
  }, [])

  // Enter: next frame add `is-visible` so the CSS transition plays.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setPhase(p => (p === 'enter' ? 'visible' : p)))
    return () => cancelAnimationFrame(raf)
  }, [])

  // Auto-dismiss.
  useEffect(() => {
    if (toast.duration <= 0) return
    const t = setTimeout(dismiss, toast.duration)
    return () => clearTimeout(t)
  }, [toast.duration, dismiss])

  // Leaving: remove after the transition.
  useEffect(() => {
    if (phase !== 'leaving') return
    leaveTimer.current = setTimeout(() => onDismiss(toast.id), LEAVE_MS)
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
    }
  }, [phase, onDismiss, toast.id])

  return (
    <div
      className={cn(
        'toast',
        `toast--${toast.type}`,
        phase === 'visible' && 'is-visible',
        phase === 'leaving' && 'is-leaving'
      )}
      role={toast.type === 'error' ? 'alert' : 'status'}
    >
      <span className="toast__icon">
        <i className={`fa-solid ${TOAST_ICONS[toast.type]}`} aria-hidden="true" />
      </span>
      <div className="toast__body">
        <p className="toast__title">{toast.title}</p>
        {toast.message && <p className="toast__message">{toast.message}</p>}
      </div>
      <button type="button" className="toast__close" aria-label="Dismiss" onClick={dismiss}>
        <i className="fa-solid fa-xmark" aria-hidden="true" />
      </button>
    </div>
  )
}

export interface ToastContainerProps {
  toasts: ToastRecord[]
  onDismiss: (id: number) => void
  className?: string
}

/**
 * Fixed top-right stack (`.toast-container`). Mounted by `ToastProvider`;
 * exported for custom placement.
 */
export function ToastContainer({ toasts, onDismiss, className }: ToastContainerProps) {
  return (
    <div className={cn('toast-container', className)} aria-live="polite" aria-atomic="false">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
