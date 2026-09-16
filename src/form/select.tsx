import { useId } from 'react'
import type { ReactNode, SelectHTMLAttributes } from 'react'
import { cn } from '../lib/class-name'

export interface SelectOption {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  /** Convenience alternative to `children`. */
  options?: SelectOption[]
  /** Placeholder rendered as a disabled first option. */
  placeholder?: string
  /** Class for the `.form-group` wrapper. */
  wrapperClassName?: string
  children?: ReactNode
}

/** Bootstrap `.form-select` (restyled by CoolAdmin) inside an optional `.form-group`. */
export function Select({
  label,
  hint,
  error,
  options,
  placeholder,
  wrapperClassName,
  className,
  id,
  children,
  ...rest
}: SelectProps) {
  const autoId = useId()
  const selectId = id ?? autoId
  const hintId = hint ? `${selectId}-hint` : undefined
  const errorId = error ? `${selectId}-error` : undefined
  const describedBy =
    [rest['aria-describedby'], hintId, errorId].filter(Boolean).join(' ') || undefined

  const select = (
    <select
      {...rest}
      id={selectId}
      className={cn('form-select', error && 'is-invalid', className)}
      aria-invalid={error ? true : rest['aria-invalid']}
      aria-describedby={describedBy}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options?.map(opt => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
      {children}
    </select>
  )

  if (!label && !hint && !error) return select

  return (
    <div className={cn('form-group', wrapperClassName)}>
      {label && (
        <label htmlFor={selectId} className="form-control-label">
          {label}
        </label>
      )}
      {select}
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
