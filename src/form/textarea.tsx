import { useId } from 'react'
import type { ReactNode, TextareaHTMLAttributes } from 'react'
import { cn } from '../lib/class-name'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Renders `label + textarea` inside `.form-group`. */
  label?: ReactNode
  /** Helper text under the field. */
  hint?: ReactNode
  /** Error text; sets `aria-invalid`. */
  error?: ReactNode
  /** Class for the `.form-group` wrapper. */
  wrapperClassName?: string
}

/**
 * Multi-line text field (`textarea.form-control`) inside an optional
 * `.form-group` with label, hint and error — same markup as `Input`.
 */
export function Textarea({
  label,
  hint,
  error,
  wrapperClassName,
  className,
  id,
  ...rest
}: TextareaProps) {
  const autoId = useId()
  const textareaId = id ?? autoId
  const hintId = hint ? `${textareaId}-hint` : undefined
  const errorId = error ? `${textareaId}-error` : undefined
  const describedBy =
    [rest['aria-describedby'], hintId, errorId].filter(Boolean).join(' ') || undefined

  const textarea = (
    <textarea
      {...rest}
      id={textareaId}
      className={cn('form-control', error && 'is-invalid', className)}
      aria-invalid={error ? true : rest['aria-invalid']}
      aria-describedby={describedBy}
    />
  )

  if (!label && !hint && !error) return textarea

  return (
    <div className={cn('form-group', wrapperClassName)}>
      {label && (
        <label htmlFor={textareaId} className="form-control-label">
          {label}
        </label>
      )}
      {textarea}
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
