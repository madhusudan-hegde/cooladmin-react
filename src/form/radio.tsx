import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label text. */
  label: ReactNode
  /** Adds `.form-check-inline` so radios sit side by side. */
  inline?: boolean
  /** Class for the `.form-check` wrapper. */
  wrapperClassName?: string
}

/**
 * Bootstrap radio (`.form-check > input.form-check-input[type=radio] + label.form-check-label`),
 * the markup CoolAdmin's form page uses.
 */
export function Radio({
  label,
  inline = false,
  wrapperClassName,
  className,
  id,
  ...rest
}: RadioProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <div className={cn('form-check', inline && 'form-check-inline', wrapperClassName)}>
      <input {...rest} type="radio" id={inputId} className={cn('form-check-input', className)} />
      <label htmlFor={inputId} className="form-check-label">
        {label}
      </label>
    </div>
  )
}
