'use client'

import { useState } from 'react'
import { cn } from '@cooladmin/react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ValidatedFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  /** Returns an error message, or `null` when the value is valid. */
  validate: (value: string) => string | null
  validMessage: string
  placeholder?: string
}

/** `.form-group.has-success|has-danger > label + input.is-valid|is-invalid + feedback`. */
function ValidatedField({
  id,
  label,
  value,
  onChange,
  validate,
  validMessage,
  placeholder,
}: ValidatedFieldProps) {
  const error = validate(value)
  const feedbackId = `${id}-feedback`
  return (
    <div className={cn('form-group', error ? 'has-danger' : 'has-success')}>
      <label htmlFor={id} className="form-control-label">
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={cn('form-control', error ? 'is-invalid' : 'is-valid form-control-success')}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={feedbackId}
        onChange={e => onChange(e.target.value)}
      />
      {error ? (
        <div className="invalid-feedback" id={feedbackId} role="alert">
          {error}
        </div>
      ) : (
        <div className="valid-feedback" id={feedbackId}>
          {validMessage}
        </div>
      )}
    </div>
  )
}

/**
 * "Validation states Form" card (form.html): the two static examples become
 * live-validated inputs — `is-valid` / `is-invalid` plus Bootstrap feedback
 * text follow the value as you type.
 */
export function ValidationStatesCard() {
  const [email, setEmail] = useState('jane.doe@example.com')
  const [required, setRequired] = useState('')

  return (
    <div className="card">
      <div className="card-header">
        <strong>Validation states</strong> Form
      </div>
      <div className="card-body">
        <ValidatedField
          id="inputIsValid"
          label="Input is valid"
          value={email}
          onChange={setEmail}
          validate={v => (EMAIL_RE.test(v.trim()) ? null : 'Please enter a valid email address.')}
          validMessage="Looks good!"
          placeholder="name@example.com"
        />
        <ValidatedField
          id="inputIsInvalid"
          label="Input is invalid"
          value={required}
          onChange={setRequired}
          validate={v => (v.trim().length >= 3 ? null : 'Please enter at least 3 characters.')}
          validMessage="Thanks — that works."
          placeholder="Type to fix the error…"
        />
      </div>
    </div>
  )
}
