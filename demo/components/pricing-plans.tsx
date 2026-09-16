'use client'

import { useState } from 'react'
import { MButton, cn, useToast } from '@cooladmin/react'
import { pricingPlans } from '@/lib/pricing-data'
import type { PricingPeriod } from '@/lib/pricing-data'

const PERIODS: Array<{ id: PricingPeriod; label: string; badge?: string }> = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'annual', label: 'Annual', badge: 'Save 20%' },
]

/**
 * Pricing hero (monthly / annual toggle) + the three plan cards. Port of
 * CoolAdmin's pricing.html + pricing.scripts.html: the toggle swaps every
 * `.pricing-amt` between its monthly and annual amount.
 */
export function PricingPlans() {
  const [period, setPeriod] = useState<PricingPeriod>('monthly')
  const toast = useToast()

  return (
    <>
      <div className="pricing-hero">
        <h1>Plans for every team</h1>
        <p>
          Simple monthly pricing with annual discounts. Cancel anytime, upgrade or downgrade
          whenever you need to.
        </p>
        <div
          className="pricing-toggle"
          role="tablist"
          aria-label="Billing period"
          onKeyDown={e => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
            e.preventDefault()
            const idx = PERIODS.findIndex(p => p.id === period)
            const next =
              PERIODS[(idx + (e.key === 'ArrowRight' ? 1 : -1) + PERIODS.length) % PERIODS.length]
            setPeriod(next.id)
            e.currentTarget.querySelector<HTMLButtonElement>(`[data-period="${next.id}"]`)?.focus()
          }}
        >
          {PERIODS.map(p => (
            <button
              key={p.id}
              type="button"
              role="tab"
              className={cn(period === p.id && 'is-active')}
              data-period={p.id}
              aria-selected={period === p.id}
              tabIndex={period === p.id ? 0 : -1}
              onClick={() => setPeriod(p.id)}
            >
              {p.label}
              {p.badge && <span className="save-badge">{p.badge}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="row row-tight pricing-plans">
        {pricingPlans.map(plan => (
          <div className="col-md-4" key={plan.id}>
            <section
              className={cn('m-card pricing-card', plan.featured && 'pricing-card--featured')}
              aria-labelledby={`pricing-${plan.id}-tier`}
            >
              {plan.badge && <span className="pricing-card__badge">{plan.badge}</span>}
              <p className="pricing-card__tier" id={`pricing-${plan.id}-tier`}>
                {plan.tier}
              </p>
              <p className="pricing-card__price">
                {plan.price ? (
                  <>
                    <span
                      className="pricing-amt"
                      data-monthly={plan.price.monthly}
                      data-annual={plan.price.annual}
                    >
                      ${plan.price[period]}
                    </span>
                    <small>/mo</small>
                  </>
                ) : (
                  'Custom'
                )}
              </p>
              <p className="pricing-card__period">{plan.period}</p>
              <ul className="pricing-card__features">
                {plan.features.map(feature => (
                  <li key={feature}>
                    <i className="fa-solid fa-check" aria-hidden="true" /> {feature}
                  </li>
                ))}
              </ul>
              <MButton
                variant={plan.cta.variant}
                className="w-100"
                onClick={() =>
                  toast.success(
                    `${plan.tier} plan selected`,
                    plan.price
                      ? `Billed ${period === 'annual' ? 'annually' : 'monthly'} · $${
                          plan.price[period]
                        }/mo`
                      : 'Our sales team will be in touch shortly.'
                  )
                }
              >
                {plan.cta.label}
              </MButton>
            </section>
          </div>
        ))}
      </div>
    </>
  )
}

/** "Contact sales" CTA button (bottom of the pricing page). */
export function ContactSalesButton() {
  const toast = useToast()
  return (
    <MButton
      variant="primary"
      icon="fa-regular fa-envelope"
      onClick={() =>
        toast.info('Message sent', 'Our sales team will reply within one business day.')
      }
    >
      Contact sales
    </MButton>
  )
}
