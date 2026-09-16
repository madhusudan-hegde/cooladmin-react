'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { cn, useToast } from '@cooladmin/react'

interface CardFields {
  amount: string
  name: string
  number: string
  exp: string
  cvc: string
}

type CardErrors = Partial<Record<keyof CardFields, string>>

const INITIAL: CardFields = { amount: '100.00', name: '', number: '', exp: '', cvc: '' }

/** Luhn check on a digit string (the `data-val-cc-number` rule). */
function luhnValid(digits: string): boolean {
  let sum = 0
  let alt = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i])
    if (alt) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}

/** Mirrors the jQuery-validate messages declared on CoolAdmin's inputs. */
function validate(fields: CardFields): CardErrors {
  const errors: CardErrors = {}
  const amount = Number(fields.amount)
  if (!fields.amount.trim() || Number.isNaN(amount) || amount <= 0) {
    errors.amount = 'Please enter a valid payment amount'
  }
  if (!fields.name.trim()) errors.name = 'Please enter the name on card'
  const digits = fields.number.replace(/\D/g, '')
  if (!digits) errors.number = 'Please enter the card number'
  else if (digits.length < 13 || digits.length > 19 || !luhnValid(digits)) {
    errors.number = 'Please enter a valid card number'
  }
  const exp = fields.exp.replace(/\s/g, '')
  if (!exp) errors.exp = 'Please enter the card expiration'
  else {
    const m = /^(\d{2})\/?(\d{2}|\d{4})$/.exec(exp)
    const month = m ? Number(m[1]) : 0
    if (!m || month < 1 || month > 12) errors.exp = 'Please enter a valid month and year'
  }
  if (!fields.cvc.trim()) errors.cvc = 'Please enter the security code'
  else if (!/^\d{3,4}$/.test(fields.cvc.trim())) errors.cvc = 'Please enter a valid security code'
  return errors
}

function formatAmount(value: string): string {
  const n = Number(value)
  return Number.isNaN(n) ? value : n.toFixed(2)
}

/** "Pay Invoice" credit-card form (form.html) — validation + sending state in React. */
export function CreditCardForm() {
  const [fields, setFields] = useState<CardFields>(INITIAL)
  const [errors, setErrors] = useState<CardErrors>({})
  const [touched, setTouched] = useState(false)
  const [sending, setSending] = useState(false)
  const toast = useToast()

  const set = (key: keyof CardFields) => (value: string) => {
    const next = { ...fields, [key]: value }
    setFields(next)
    if (touched) setErrors(validate(next))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = validate(fields)
    setErrors(result)
    setTouched(true)
    if (Object.keys(result).length > 0) return
    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      toast.success(
        'Payment sent',
        `Charged $${formatAmount(fields.amount)} to card ending ${fields.number
          .replace(/\D/g, '')
          .slice(-4)}.`
      )
      setFields(INITIAL)
      setTouched(false)
      setErrors({})
    }, 1200)
  }

  /** `.form-group` state class + `.help-block` message for one field. */
  const groupState = (key: keyof CardFields) =>
    !touched ? undefined : errors[key] ? 'has-danger' : 'has-success'
  const help = (key: keyof CardFields) =>
    touched && errors[key] ? (
      <span className="help-block" id={`cc-${key}-error`} role="alert">
        {errors[key]}
      </span>
    ) : null
  const invalid = (key: keyof CardFields) => Boolean(touched && errors[key])

  return (
    <div className="card">
      <div className="card-header">Credit card</div>
      <div className="card-body">
        <div className="card-title">
          <h3 className="text-center title-2">Pay Invoice</h3>
        </div>
        <hr />
        <form action="#" method="post" noValidate onSubmit={onSubmit}>
          <div className={cn('mb-3', groupState('amount'))}>
            <label htmlFor="cc-payment" className="control-label mb-1">
              Payment amount
            </label>
            <input
              id="cc-payment"
              name="cc-payment"
              type="text"
              inputMode="decimal"
              className={cn('form-control', invalid('amount') && 'is-invalid')}
              aria-required="true"
              aria-invalid={invalid('amount')}
              aria-describedby={invalid('amount') ? 'cc-amount-error' : undefined}
              value={fields.amount}
              onChange={e => set('amount')(e.target.value)}
            />
            {help('amount')}
          </div>
          <div className={cn('form-group', groupState('name'))}>
            <label htmlFor="cc-name" className="control-label mb-1">
              Name on card
            </label>
            <input
              id="cc-name"
              name="cc-name"
              type="text"
              className={cn(
                'form-control',
                invalid('name') && 'is-invalid',
                touched && !errors.name && 'is-valid'
              )}
              autoComplete="cc-name"
              aria-required="true"
              aria-invalid={invalid('name')}
              aria-describedby={invalid('name') ? 'cc-name-error' : undefined}
              value={fields.name}
              onChange={e => set('name')(e.target.value)}
            />
            {help('name')}
          </div>
          <div className={cn('mb-3', groupState('number'))}>
            <label htmlFor="cc-number" className="control-label mb-1">
              Card number
            </label>
            <input
              id="cc-number"
              name="cc-number"
              type="tel"
              inputMode="numeric"
              className={cn('form-control', invalid('number') && 'is-invalid')}
              autoComplete="cc-number"
              aria-invalid={invalid('number')}
              aria-describedby={invalid('number') ? 'cc-number-error' : undefined}
              value={fields.number}
              onChange={e => set('number')(e.target.value)}
            />
            {help('number')}
          </div>
          <div className="row">
            <div className="col-6">
              <div className={cn('mb-3', groupState('exp'))}>
                <label htmlFor="cc-exp" className="control-label mb-1">
                  Expiration
                </label>
                <input
                  id="cc-exp"
                  name="cc-exp"
                  type="tel"
                  inputMode="numeric"
                  className={cn('form-control', invalid('exp') && 'is-invalid')}
                  placeholder="MM / YY"
                  autoComplete="cc-exp"
                  aria-invalid={invalid('exp')}
                  aria-describedby={invalid('exp') ? 'cc-exp-error' : undefined}
                  value={fields.exp}
                  onChange={e => set('exp')(e.target.value)}
                />
                {help('exp')}
              </div>
            </div>
            <div className="col-6">
              <div className={cn('mb-3', groupState('cvc'))}>
                <label htmlFor="x_card_code" className="control-label mb-1">
                  Security code
                </label>
                <div className="input-group">
                  <input
                    id="x_card_code"
                    name="x_card_code"
                    type="tel"
                    inputMode="numeric"
                    className={cn('form-control', invalid('cvc') && 'is-invalid')}
                    autoComplete="off"
                    aria-invalid={invalid('cvc')}
                    aria-describedby={invalid('cvc') ? 'cc-cvc-error' : undefined}
                    value={fields.cvc}
                    onChange={e => set('cvc')(e.target.value)}
                  />
                </div>
                {help('cvc')}
              </div>
            </div>
          </div>
          <div className="d-grid">
            <button
              id="payment-button"
              type="submit"
              className="btn btn-lg btn-info"
              disabled={sending}
              aria-busy={sending || undefined}
            >
              <i className="fa-solid fa-lock fa-lg" aria-hidden="true" />
              &nbsp;
              {sending ? (
                <span id="payment-button-sending">Sending…</span>
              ) : (
                <span id="payment-button-amount">Pay ${formatAmount(fields.amount)}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
