import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Renders `label + input` inside `.form-group`. */
  label?: ReactNode
  /** Helper text under the field. */
  hint?: ReactNode
  /** Error text; sets `aria-invalid`. */
  error?: ReactNode
  /** `au` = CoolAdmin's `.au-input` (default); `bootstrap` = `.form-control`. */
  variant?: 'au' | 'bootstrap'
  /** `xl` adds `.au-input--xl` (the topbar search size). */
  inputSize?: 'md' | 'xl'
  /** Class for the `.form-group` wrapper. */
  wrapperClassName?: string
}

/**
 * Text input. Defaults to CoolAdmin's `.au-input` inside a `.form-group` with a
 * label; switch `variant="bootstrap"` for `.form-control`.
 */
export function Input({
  label,
  hint,
  error,
  variant = 'au',
  inputSize = 'md',
  wrapperClassName,
  className,
  id,
  ...rest
}: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy =
    [rest['aria-describedby'], hintId, errorId].filter(Boolean).join(' ') || undefined

  const input = (
    <input
      {...rest}
      id={inputId}
      className={cn(
        variant === 'au' ? 'au-input' : 'form-control',
        variant === 'au' && inputSize === 'xl' && 'au-input--xl',
        error && 'is-invalid',
        className
      )}
      aria-invalid={error ? true : rest['aria-invalid']}
      aria-describedby={describedBy}
    />
  )

  if (!label && !hint && !error) return input

  return (
    <div className={cn('form-group', wrapperClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className={variant === 'bootstrap' ? 'form-control-label' : undefined}
        >
          {label}
        </label>
      )}
      {input}
      {hint && (
        <p className="form-text" id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className="form-text text-danger" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
