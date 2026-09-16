import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label text. Provide `aria-label` instead for icon-only usage (tables). */
  label?: ReactNode
  /** Class for the `.au-checkbox` label wrapper. */
  wrapperClassName?: string
}

/** CoolAdmin's custom checkbox (`label.au-checkbox > input + span.au-checkmark`). */
export function Checkbox({ label, wrapperClassName, className, ...rest }: CheckboxProps) {
  return (
    <label className={cn('au-checkbox', wrapperClassName)}>
      <input {...rest} type="checkbox" className={className} />
      <span className="au-checkmark" aria-hidden="true" />
      {label && <span className="au-checkbox__label">{label}</span>}
    </label>
  )
}
