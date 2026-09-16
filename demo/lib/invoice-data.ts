/** Invoice page data (CoolAdmin invoice.html — sample invoice INV-2026-05). */

export const invoiceMeta = {
  number: 'INV-2026-05',
  issued: 'May 1, 2026',
  due: 'May 15, 2026',
  terms: 'Net 14',
  billingPeriod: 'May 1 – May 31, 2026',
}

export interface InvoiceParty {
  heading: string
  name: string
  lines: string[]
}

export const invoiceFrom: InvoiceParty = {
  heading: 'From',
  name: 'CoolAdmin Inc.',
  lines: ['420 Market Street, Suite 800', 'San Francisco, CA 94102', 'billing@cooladmin.com'],
}

export const invoiceBillTo: InvoiceParty = {
  heading: 'Bill to',
  name: 'Acme Corp.',
  lines: [
    'Attn: Diane Myers',
    '1200 Innovation Way',
    'Berlin, 10115, Germany',
    'billing@acme-corp.com',
  ],
}

export interface InvoiceLine {
  id: string
  title: string
  meta: string
  qty: string
  rate: string
  amount: string
}

export const invoiceLines: InvoiceLine[] = [
  {
    id: 'pro-plan',
    title: 'Pro plan',
    meta: '10 user seats · May 1 – May 31, 2026',
    qty: '1',
    rate: '$240.00',
    amount: '$240.00',
  },
  {
    id: 'api-credits',
    title: 'API credits',
    meta: 'Overage — 50,000 additional API calls',
    qty: '50,000',
    rate: '$0.0008',
    amount: '$40.00',
  },
  {
    id: 'storage',
    title: 'Storage',
    meta: 'Add-on — extra 100 GB',
    qty: '1',
    rate: '$15.00',
    amount: '$15.00',
  },
  {
    id: 'priority-support',
    title: 'Priority support',
    meta: 'Same-business-day response SLA',
    qty: '1',
    rate: '$50.00',
    amount: '$50.00',
  },
]

export interface InvoiceTotal {
  label: string
  value: string
  grand?: boolean
}

export const invoiceTotals: InvoiceTotal[] = [
  { label: 'Subtotal', value: '$345.00' },
  { label: 'Discount (10% annual)', value: '−$34.50' },
  { label: 'VAT (19% — Germany)', value: '$59.00' },
  { label: 'Total due', value: '$369.50', grand: true },
]
