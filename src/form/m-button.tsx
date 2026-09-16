import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export type MButtonVariant = 'primary' | 'ghost' | 'danger'
export type MButtonSize = 'sm' | 'md'

export interface MButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: MButtonVariant
  size?: MButtonSize
  /** Leading icon — Font Awesome 7 class string. */
  icon?: string
  /** Render as an anchor. */
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  /** Shows a spinner and disables the control. */
  loading?: boolean
  children?: ReactNode
}

/**
 * CoolAdmin's modern button (`.m-btn.m-btn--primary|--ghost|--danger`, `.m-btn--sm`).
 * Renders an `<a>` when `href` is given.
 */
export function MButton({
  variant = 'primary',
  size = 'md',
  icon,
  href,
  target,
  rel,
  type = 'button',
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: MButtonProps) {
  const classes = cn(
    'm-btn',
    `m-btn--${variant}`,
    size === 'sm' && 'm-btn--sm',
    loading && 'is-loading',
    className
  )
  const content = (
    <>
      {loading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        icon && <i className={icon} aria-hidden="true" />
      )}
      {children}
    </>
  )

  if (href) {
    const anchorProps = rest as unknown as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        {...anchorProps}
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
        aria-disabled={disabled || loading || undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      {...rest}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  )
}
