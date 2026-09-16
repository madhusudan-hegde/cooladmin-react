import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  /** Class for the `.form-check.form-switch` wrapper. */
  wrapperClassName?: string
}

/** Bootstrap toggle (`.form-check.form-switch > input[role=switch] + label`). */
export function Switch({ label, wrapperClassName, className, id, ...rest }: SwitchProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div className={cn('form-check', 'form-switch', wrapperClassName)}>
      <input
        {...rest}
        type="checkbox"
        role="switch"
        id={inputId}
        className={cn('form-check-input', className)}
      />
      {label && (
        <label className="form-check-label" htmlFor={inputId}>
          {label}
        </label>
      )}
    </div>
  )
}
