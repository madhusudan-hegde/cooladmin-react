'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'

export type AlertVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

export interface AlertProps {
  variant: AlertVariant
  /** Leading icon — Font Awesome 7 class string. */
  icon?: string
  /** Bold lead-in (`<strong>`) before the message. */
  title?: ReactNode
  children?: ReactNode
  /** Adds `.alert-dismissible` and a `.btn-close`; the alert removes itself when clicked. */
  dismissible?: boolean
  onDismiss?: () => void
  /** Accessible name of the close button. */
  closeLabel?: string
  className?: string
}

/**
 * Bootstrap inline alert (`.alert.alert-<variant>.fade.show`) as rendered on
 * CoolAdmin's Alerts page. Dismissal is React state — no Bootstrap JS.
 */
export function Alert({
  variant,
  icon,
  title,
  children,
  dismissible = false,
  onDismiss,
  closeLabel = 'Close',
  className,
}: AlertProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div
      className={cn(
        'alert',
        `alert-${variant}`,
        dismissible && 'alert-dismissible',
        'fade',
        'show',
        className
      )}
      role="alert"
    >
      {icon && <i className={cn(icon, 'alert__icon')} aria-hidden="true" />}
      {title && <strong className="alert__title">{title}</strong>}
      {title && children ? ' ' : null}
      {children}
      {dismissible && (
        <button type="button" className="btn-close" aria-label={closeLabel} onClick={dismiss} />
      )}
    </div>
  )
}
