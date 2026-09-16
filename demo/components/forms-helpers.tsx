import type { ReactNode } from 'react'
import { cn } from '@cooladmin/react'

/* Small presentational helpers for the /forms page (CoolAdmin form.html).
 * Pure RSC — no state; the interactive cards live in forms-*.tsx client files. */

export interface FormCardProps {
  /** `.card-header` content. */
  header: ReactNode
  /** `.card-footer` content (omit for no footer). */
  footer?: ReactNode
  children: ReactNode
  className?: string
}

/** Bootstrap `.card > .card-header + .card-body (+ .card-footer)` as used on form.html. */
export function FormCard({ header, footer, children, className }: FormCardProps) {
  return (
    <div className={cn('card', className)}>
      <div className="card-header">{header}</div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

export interface SubmitResetProps {
  /** `form` attribute so the footer buttons drive the form in the card body. */
  form: string
  submitLabel?: ReactNode
  submitIcon?: string
  /** Bootstrap colour of the submit button (default `primary`). */
  submitVariant?: 'primary' | 'success'
}

/** The recurring "Submit / Reset" `.card-footer` button pair. */
export function SubmitReset({
  form,
  submitLabel = 'Submit',
  submitIcon = 'fa-regular fa-circle-dot',
  submitVariant = 'primary',
}: SubmitResetProps) {
  return (
    <>
      <button type="submit" form={form} className={`btn btn-${submitVariant} btn-sm`}>
        <i className={submitIcon} aria-hidden="true" /> {submitLabel}
      </button>{' '}
      <button type="reset" form={form} className="btn btn-danger btn-sm">
        <i className="fa-solid fa-ban" aria-hidden="true" /> Reset
      </button>
    </>
  )
}

/** Five coloured "Action" buttons used by the grid demo cards. */
export function ActionButtons({ form }: { form: string }) {
  return (
    <>
      <button type="submit" form={form} className="btn btn-primary btn-sm">
        Action
      </button>{' '}
      <button type="button" className="btn btn-danger btn-sm">
        Action
      </button>{' '}
      <button type="button" className="btn btn-warning btn-sm">
        Action
      </button>{' '}
      <button type="button" className="btn btn-info btn-sm">
        Action
      </button>{' '}
      <button type="button" className="btn btn-success btn-sm">
        Action
      </button>
    </>
  )
}

export interface HRowProps {
  label: ReactNode
  /** Control id the label points to; omit for grouped controls (renders a `span`). */
  htmlFor?: string
  /** Bootstrap column classes for the control column (default `col-12 col-md-9`). */
  controlClassName?: string
  children: ReactNode
}

/** Horizontal form row: `.row.mb-3 > .col.col-md-3 label + .col-12.col-md-9 control`. */
export function HRow({
  label,
  htmlFor,
  controlClassName = 'col-12 col-md-9',
  children,
}: HRowProps) {
  return (
    <div className="row mb-3">
      <div className="col col-md-3">
        {htmlFor ? (
          <label htmlFor={htmlFor} className="form-control-label">
            {label}
          </label>
        ) : (
          <span className="form-control-label">{label}</span>
        )}
      </div>
      <div className={controlClassName}>{children}</div>
    </div>
  )
}

export interface FormCheckProps {
  id: string
  name: string
  value: string
  label: ReactNode
  inline?: boolean
  className?: string
}

/** Bootstrap checkbox (`.form-check > input.form-check-input + label.form-check-label`). */
export function FormCheck({ id, name, value, label, inline, className }: FormCheckProps) {
  return (
    <div className={cn('form-check', inline && 'form-check-inline', className)}>
      <input type="checkbox" id={id} name={name} value={value} className="form-check-input" />
      <label htmlFor={id} className="form-check-label">
        {label}
      </label>
    </div>
  )
}

export interface GridInputProps {
  /** Column classes, e.g. `col col-sm-3` or `col-4`. */
  className: string
  /** Defaults to the last column class, e.g. `.col-sm-3`. */
  placeholder?: string
}

/** Placeholder-only grid input (`.col-*` demos). */
export function GridInput({ className, placeholder }: GridInputProps) {
  const text = placeholder ?? `.${className.split(' ').pop()}`
  return (
    <div className={className}>
      <input type="text" placeholder={text} aria-label={text} className="form-control" />
    </div>
  )
}
