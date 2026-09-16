/**
 * Static options for the /forms/wizard setup flow, lifted from CoolAdmin's
 * `wizard.html`. Plain module — no `'use client'`.
 */

export const wizardRoles = [
  'Founder / CEO',
  'Engineering lead',
  'Product manager',
  'Designer',
  'Marketer',
  'Other',
]

export const wizardTeamSizes = ['Just me', '2–10', '11–50', '51–200', '200+']

export type WizardPlanId = 'starter' | 'pro' | 'enterprise'

export interface WizardPlan {
  id: WizardPlanId
  tier: string
  /** Display price; `priceSuffix` renders as `<small>`. */
  price: string
  priceSuffix?: string
}

export const wizardPlans: WizardPlan[] = [
  { id: 'starter', tier: 'Starter', price: 'Free' },
  { id: 'pro', tier: 'Pro', price: '$24', priceSuffix: '/mo' },
  { id: 'enterprise', tier: 'Enterprise', price: 'Custom' },
]

export interface WizardFormState {
  firstName: string
  lastName: string
  email: string
  role: string
  organization: string
  teamSize: string
  invites: string
  plan: WizardPlanId
}

export const wizardInitialState: WizardFormState = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  organization: '',
  teamSize: '2–10',
  invites: '',
  plan: 'starter',
}
