'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../lib/class-name'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalProps {
  open: boolean
  /** Called on Esc, backdrop click (unless `staticBackdrop`) and the header close button. */
  onClose: () => void
  /** Header title (`h5.modal-title`); omit for header-less dialogs like the confirm pattern. */
  title?: ReactNode
  children?: ReactNode
  /** `.modal-footer` content. */
  footer?: ReactNode
  size?: ModalSize
  /** `.modal-dialog-centered`. */
  centered?: boolean
  /** `.modal-dialog-scrollable`. */
  scrollable?: boolean
  /** Backdrop click does not close; the dialog nudges (`.modal-static`) instead. */
  staticBackdrop?: boolean
  /** Accessible name of the header close button. */
  closeLabel?: string
  id?: string
  /** Extra classes on the `.modal` root. */
  className?: string
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Duration of Bootstrap's `.modal-static` nudge. */
const STATIC_MS = 300

const noopSubscribe = () => () => {}

function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    el => !el.hasAttribute('hidden') && el.getAttribute('aria-hidden') !== 'true'
  )
}

/**
 * Bootstrap 5 modal markup (`.modal.fade.show` + `.modal-backdrop`) rendered
 * through a portal into `document.body` and controlled by React state — no
 * Bootstrap JS. Locks body scroll, closes on Esc / backdrop click, traps Tab,
 * focuses the first focusable element on open and restores focus on close.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  centered = false,
  scrollable = false,
  staticBackdrop = false,
  closeLabel = 'Close',
  id,
  className,
}: ModalProps) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )
  const autoId = useId()
  const titleId = `${id ?? autoId}-title`
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  const [nudge, setNudge] = useState(false)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  // Body lock + focus management, tied to `open`.
  useEffect(() => {
    if (!open || typeof document === 'undefined') return
    const body = document.body
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = body.style.overflow
    body.classList.add('modal-open')
    body.style.overflow = 'hidden'

    const first = getFocusable(contentRef.current)[0]
    ;(first ?? rootRef.current)?.focus()

    return () => {
      body.classList.remove('modal-open')
      body.style.overflow = previousOverflow
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus()
    }
  }, [open])

  // Esc closes; Tab cycles inside the dialog.
  useEffect(() => {
    if (!open || typeof document === 'undefined') return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = getFocusable(contentRef.current)
      if (!focusable.length) {
        e.preventDefault()
        rootRef.current?.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !contentRef.current?.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !contentRef.current?.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Static-backdrop nudge (`.modal-static`) resets itself.
  useEffect(() => {
    if (!nudge) return
    const t = setTimeout(() => setNudge(false), STATIC_MS)
    return () => clearTimeout(t)
  }, [nudge])

  if (!mounted || !open) return null

  const onBackdropClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (staticBackdrop) setNudge(true)
    else onClose()
  }

  return createPortal(
    <>
      <div
        ref={rootRef}
        className={cn('modal', 'fade', 'show', nudge && 'modal-static', className)}
        style={{ display: 'block' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        id={id}
        onClick={onBackdropClick}
      >
        <div
          className={cn(
            'modal-dialog',
            centered && 'modal-dialog-centered',
            scrollable && 'modal-dialog-scrollable',
            size !== 'md' && `modal-${size}`
          )}
        >
          <div className="modal-content" ref={contentRef}>
            {title && (
              <div className="modal-header">
                <h5 className="modal-title" id={titleId}>
                  {title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label={closeLabel}
                  onClick={onClose}
                />
              </div>
            )}
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>,
    document.body
  )
}
