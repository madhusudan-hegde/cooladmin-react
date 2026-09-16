import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/class-name'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Font Awesome 7 class string. */
  icon: string
  /** Accessible name (also used as the tooltip). */
  label: string
  type?: 'button' | 'submit' | 'reset'
  /** Pressed/selected state (`is-active`). */
  active?: boolean
}

/** Compact toolbar icon button (`.icon-btn`). */
export function IconButton({
  icon,
  label,
  type = 'button',
  active,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cn('icon-btn', active && 'is-active', className)}
      aria-label={label}
      title={rest.title ?? label}
      aria-pressed={active === undefined ? undefined : active}
    >
      <i className={icon} aria-hidden="true" />
    </button>
  )
}
