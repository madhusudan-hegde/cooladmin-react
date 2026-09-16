/** Pricing page data (CoolAdmin pricing.html). */

export type PricingPeriod = 'monthly' | 'annual'

export interface PricingPlan {
  id: string
  tier: string
  /** `null` = "Custom" (no amount, no period toggle). */
  price: { monthly: number; annual: number } | null
  period: string
  features: string[]
  cta: { label: string; variant: 'primary' | 'ghost' }
  featured?: boolean
  badge?: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    tier: 'Starter',
    price: { monthly: 0, annual: 0 },
    period: 'Free forever · for solo builders',
    features: ['1 user seat', '5 projects', 'Community support', '1 GB storage', 'Basic analytics'],
    cta: { label: 'Get started', variant: 'ghost' },
  },
  {
    id: 'pro',
    tier: 'Pro',
    price: { monthly: 24, annual: 19 },
    period: 'For small teams',
    features: [
      'Up to 10 users',
      'Unlimited projects',
      'Priority email support',
      '100 GB storage',
      'Advanced analytics',
      'API access & webhooks',
    ],
    cta: { label: 'Start 14-day trial', variant: 'primary' },
    featured: true,
    badge: 'Most popular',
  },
  {
    id: 'enterprise',
    tier: 'Enterprise',
    price: null,
    period: 'For larger orgs',
    features: [
      'Unlimited users',
      'SSO & SCIM provisioning',
      '24/7 dedicated support',
      'Audit logs',
      'Custom contracts & SLA',
      'Dedicated success manager',
    ],
    cta: { label: 'Talk to sales', variant: 'ghost' },
  },
]

export interface PricingFaq {
  question: string
  answer: string
}

export const pricingFaq: PricingFaq[] = [
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes — upgrade, downgrade, or cancel any time from the Billing tab in your settings. Changes take effect at the end of the current billing period.',
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      'Pro comes with a 14-day free trial. No credit card required to start. We’ll prompt you for payment details only when you decide to keep the plan.',
  },
  {
    question: 'What does the annual discount mean?',
    answer:
      'Annual billing locks in a 20% discount over the monthly rate. You pay once per year instead of every month, and the price is fixed for the year.',
  },
  {
    question: 'Which payment methods do you accept?',
    answer:
      'All major credit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, ACH for US customers, and SEPA for EU customers. Enterprise customers can pay via invoice.',
  },
  {
    question: 'Is there a non-profit or education discount?',
    answer:
      'Yes — verified non-profits and educational institutions get 50% off any paid plan. Reach out via the contact form with your verification details.',
  },
]
