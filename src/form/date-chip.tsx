import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface DateChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: ReactNode
  /** Leading icon — Font Awesome 7 class string (default calendar). */
  icon?: string
  /** Show the trailing chevron (default `true`). */
  chevron?: boolean
  type?: 'button' | 'submit' | 'reset'
}

/** Page-header date-range chip (`button.date-chip`). */
export function DateChip({
  children,
  icon = 'fa-regular fa-calendar',
  chevron = true,
  type = 'button',
  className,
  ...rest
}: DateChipProps) {
  return (
    <button {...rest} type={type} className={cn('date-chip', className)}>
      <i className={icon} aria-hidden="true" />
      {children}
      {chevron && <i className="fa-solid fa-chevron-down" aria-hidden="true" />}
    </button>
  )
}
