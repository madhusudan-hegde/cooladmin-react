import { Footer, SectionEyebrow } from '@cooladmin/react'
import { pricingFaq } from '@/lib/pricing-data'
import { ContactSalesButton, PricingPlans } from '@/components/pricing-plans'

export const metadata = { title: 'Pricing' }

/**
 * CoolAdmin pricing.html — marketing-style page: gradient hero with the
 * monthly/annual toggle (its own h1, so no PageHeader), three plan cards, FAQ
 * and a contact CTA.
 */
export default function PricingPage() {
  return (
    <>
      <PricingPlans />

      <SectionEyebrow as="h2" className="pricing-faq-eyebrow">
        FREQUENTLY ASKED
      </SectionEyebrow>
      <div className="pricing-faq">
        {pricingFaq.map(item => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>

      <div className="pricing-cta">
        <h2>Still have questions?</h2>
        <p>Talk to our team about your needs — we’ll help you pick the right plan.</p>
        <ContactSalesButton />
      </div>

      <Footer />
    </>
  )
}
