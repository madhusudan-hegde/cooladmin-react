'use client'

import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Input, MButton, Select, Textarea, Wizard, cn, useToast } from '@cooladmin/react'
import type { WizardStep } from '@cooladmin/react'
import { wizardInitialState, wizardPlans, wizardRoles, wizardTeamSizes } from '@/lib/wizard-data'
import type { WizardFormState, WizardPlanId } from '@/lib/wizard-data'

/* Pane heading styles carried over from wizard.html's inline styles (tokens only). */
const paneTitle: CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: 'var(--m-text)',
  margin: '0 0 4px',
}
const paneLead: CSSProperties = { fontSize: 13.5, color: 'var(--m-text-muted)', margin: '0 0 20px' }
const selectedPlanStyle: CSSProperties = {
  borderColor: 'var(--m-accent)',
  boxShadow: '0 0 0 3px rgba(var(--m-accent-rgb), 0.10)',
}

function PaneIntro({ title, lead }: { title: ReactNode; lead: ReactNode }) {
  return (
    <>
      <h2 style={paneTitle}>{title}</h2>
      <p style={paneLead}>{lead}</p>
    </>
  )
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * CoolAdmin's wizard.html + wizard.scripts.html on the library `Wizard`:
 * Account → Workspace → Plan → Done, with the form state held here so
 * `canProceed` can gate the required fields on step 1.
 */
export function SetupWizard() {
  const [form, setForm] = useState<WizardFormState>(wizardInitialState)
  const toast = useToast()

  const update = <K extends keyof WizardFormState>(key: K, value: WizardFormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const accountComplete =
    form.firstName.trim() !== '' &&
    form.lastName.trim() !== '' &&
    EMAIL_RE.test(form.email.trim()) &&
    form.role !== ''

  const steps: WizardStep[] = [
    {
      id: 'account',
      label: 'Account',
      sublabel: 'Basics',
      content: (
        <>
          <PaneIntro
            title="Tell us about you"
            lead="We’ll use these to personalize your dashboard."
          />
          <div className="row">
            <div className="col-md-6">
              <Input
                variant="bootstrap"
                id="w-fname"
                label="First name"
                required
                autoComplete="given-name"
                value={form.firstName}
                onChange={e => update('firstName', e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <Input
                variant="bootstrap"
                id="w-lname"
                label="Last name"
                required
                autoComplete="family-name"
                value={form.lastName}
                onChange={e => update('lastName', e.target.value)}
              />
            </div>
          </div>
          <Input
            variant="bootstrap"
            id="w-email"
            type="email"
            label="Work email"
            autoComplete="email"
            required
            value={form.email}
            onChange={e => update('email', e.target.value)}
          />
          <Select
            id="w-role"
            label="Your role"
            required
            value={form.role}
            onChange={e => update('role', e.target.value)}
          >
            <option value="">Choose one…</option>
            {wizardRoles.map(role => (
              <option key={role}>{role}</option>
            ))}
          </Select>
        </>
      ),
    },
    {
      id: 'workspace',
      label: 'Workspace',
      sublabel: 'Team setup',
      content: (
        <>
          <PaneIntro title="Set up your workspace" lead="This is what your teammates will see." />
          <Input
            variant="bootstrap"
            id="w-org"
            label="Organization name"
            placeholder="Acme Corp"
            autoComplete="organization"
            value={form.organization}
            onChange={e => update('organization', e.target.value)}
          />
          <Select
            id="w-team-size"
            label="Team size"
            value={form.teamSize}
            onChange={e => update('teamSize', e.target.value)}
          >
            {wizardTeamSizes.map(size => (
              <option key={size}>{size}</option>
            ))}
          </Select>
          <Textarea
            id="w-invites"
            label="Invite teammates (comma-separated emails)"
            placeholder="diane@example.com, john@example.com"
            value={form.invites}
            onChange={e => update('invites', e.target.value)}
          />
        </>
      ),
    },
    {
      id: 'plan',
      label: 'Plan',
      sublabel: 'Pick a tier',
      content: (
        <>
          <PaneIntro
            title="Choose your plan"
            lead="You can change this any time from billing settings."
          />
          <div
            className="row row-tight"
            role="radiogroup"
            aria-label="Plan"
            style={{ marginTop: 8 }}
          >
            {wizardPlans.map(plan => {
              const selected = form.plan === plan.id
              return (
                <div className="col-md-4" key={plan.id}>
                  <label style={{ display: 'block', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      className="visually-hidden"
                      checked={selected}
                      onChange={() => update('plan', plan.id as WizardPlanId)}
                    />
                    <div
                      className={cn('m-card pricing-card', selected && 'pricing-card--selected')}
                      style={{
                        textAlign: 'center',
                        cursor: 'pointer',
                        padding: '22px 18px',
                        ...(selected ? selectedPlanStyle : {}),
                      }}
                    >
                      <p className="pricing-card__tier">{plan.tier}</p>
                      <p className="pricing-card__price" style={{ fontSize: 24 }}>
                        {plan.price}
                        {plan.priceSuffix && <small>{plan.priceSuffix}</small>}
                      </p>
                    </div>
                  </label>
                </div>
              )
            })}
          </div>
        </>
      ),
    },
    {
      id: 'done',
      label: 'Done',
      sublabel: 'Confirm',
      content: (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--m-success-soft)',
              color: 'var(--m-success)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              marginBottom: 16,
            }}
          >
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--m-text)', margin: '0 0 6px' }}>
            All set!
          </h2>
          <p
            style={{
              fontSize: 14,
              color: 'var(--m-text-muted)',
              margin: '0 auto 24px',
              maxWidth: 420,
              lineHeight: 1.5,
            }}
          >
            Your workspace is ready. We’ll redirect you to the dashboard in a moment.
          </p>
          <MButton href="/" variant="primary">
            Go to dashboard <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </MButton>
        </div>
      ),
    },
  ]

  return (
    <Wizard
      steps={steps}
      nextLabel="Continue"
      finishLabel="Finish"
      backLabel="Back"
      canProceed={index => (index === 0 ? accountComplete : true)}
      onFinish={() => toast.success('Workspace created')}
    />
  )
}
