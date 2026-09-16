'use client'

import {
  IconButton,
  MButton,
  MCard,
  ProgressBar,
  SectionEyebrow,
  StatusPill,
  useToast,
} from '@madhusudan-hegde/cooladmin-react'
import { currentPlan, invoices, paymentMethod, usageMeters } from '@/lib/profile-data'

/** "Billing" tab: current plan, invoices, payment method and usage meters. */
export function ProfileBillingPane() {
  const toast = useToast()

  return (
    <div className="row row-tight">
      <div className="col-lg-8">
        <MCard className="accent-card" as="section">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              background: 'linear-gradient(135deg, var(--m-accent-soft) 0%, var(--m-c4-soft) 100%)',
              margin: '-18px -20px -18px -18px',
              padding: '18px 20px 18px 18px',
              borderRadius: 'inherit',
            }}
          >
            <div>
              <SectionEyebrow className="mb-1">CURRENT PLAN</SectionEyebrow>
              <h2 className="m-card__title" style={{ fontSize: 18, marginBottom: 2 }}>
                {currentPlan.name}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--m-text-muted)' }}>
                {currentPlan.renewal}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <MButton href="/account/pricing" variant="ghost">
                Change plan
              </MButton>
              <MButton
                variant="primary"
                onClick={() => toast.info('Manage billing', 'Opening the billing portal…')}
              >
                Manage billing
              </MButton>
            </div>
          </div>
        </MCard>

        <MCard
          title="Invoices"
          subtitle="All your billing receipts."
          className="mt-3"
          actions={
            <MButton href="/account/invoice" variant="ghost" size="sm">
              Latest invoice
            </MButton>
          }
        >
          <div className="table-responsive">
            <table className="m-table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Invoice</th>
                  <th scope="col" className="num">
                    Amount
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col">
                    <span className="visually-hidden">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id}>
                    <td>{inv.date}</td>
                    <td>{inv.number}</td>
                    <td className="num">{inv.amount}</td>
                    <td>
                      <StatusPill status={inv.status}>{inv.statusLabel}</StatusPill>
                    </td>
                    <td>
                      <a href={inv.href} style={{ color: 'var(--m-accent)', fontSize: 12.5 }}>
                        View<span className="visually-hidden"> {inv.number}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MCard>
      </div>

      <div className="col-lg-4">
        <MCard title="Payment method">
          <div
            style={{
              border: '1px solid var(--m-border)',
              borderRadius: 10,
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <i
              className="fa-brands fa-cc-visa"
              style={{ fontSize: 32, color: 'var(--m-accent)' }}
              aria-hidden="true"
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 13.5, fontWeight: 500, color: 'var(--m-text)' }}>
                {paymentMethod.brand} ···· {paymentMethod.last4}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--m-text-muted)' }}>
                Expires {paymentMethod.expires}
              </p>
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <MButton
              variant="ghost"
              icon="fa-solid fa-pen-to-square"
              style={{ flex: 1 }}
              onClick={() => toast.info('Update card', 'Card editor ships with the next release.')}
            >
              Update
            </MButton>
            <IconButton
              icon="fa-regular fa-trash-can"
              label="Remove payment method"
              className="m-btn m-btn--ghost"
              style={{ color: 'var(--m-danger)' }}
              onClick={() => toast.warning('Cannot remove', 'Add another payment method first.')}
            />
          </div>
        </MCard>

        <MCard title="Usage this month" className="mt-3">
          {usageMeters.map((meter, i) => (
            <ProgressBar
              key={meter.id}
              value={meter.percent}
              label={meter.label}
              hideValue
              className={i < usageMeters.length - 1 ? 'mb-3' : undefined}
            />
          ))}
        </MCard>
      </div>
    </div>
  )
}
