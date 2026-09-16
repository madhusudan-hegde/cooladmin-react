import type { StatusPillStatus } from '@cooladmin/react'

/**
 * Customer dataset for /tables/data, lifted verbatim from CoolAdmin's
 * `data-table.scripts.html` (`DATA` + `STATUS`). Plain module — no `'use client'`.
 */

export type CustomerStatus = 'active' | 'trial' | 'past_due' | 'cancelled'
export type CustomerPlan = 'Starter' | 'Pro' | 'Enterprise'

export interface Customer {
  id: string
  name: string
  email: string
  plan: CustomerPlan
  /** Monthly recurring revenue in USD. */
  amount: number
  status: CustomerStatus
  /** ISO date (`YYYY-MM-DD`). */
  signup: string
}

export const customerStatus: Record<CustomerStatus, { label: string; status: StatusPillStatus }> = {
  active: { label: 'Active', status: 'process' },
  trial: { label: 'Trial', status: 'approved' },
  past_due: { label: 'Past due', status: 'denied' },
  cancelled: { label: 'Cancelled', status: 'denied' },
}

const row = (
  id: number,
  name: string,
  email: string,
  plan: CustomerPlan,
  amount: number,
  status: CustomerStatus,
  signup: string
): Customer => ({ id: `c${id}`, name, email, plan, amount, status, signup })

export const customers: Customer[] = [
  row(1, 'Cynthia Harvey', 'cynthia@acme.co', 'Enterprise', 4800, 'active', '2024-08-12'),
  row(2, 'John Doe', 'john@example.com', 'Pro', 240, 'active', '2025-02-14'),
  row(3, 'Diane Myers', 'diane@globex.io', 'Pro', 240, 'active', '2025-04-22'),
  row(4, 'Michelle Moreno', 'michelle@umbrella.co', 'Starter', 0, 'trial', '2026-04-30'),
  row(5, 'Robert Taylor', 'robert@hooli.com', 'Enterprise', 4800, 'active', '2024-12-04'),
  row(6, 'Emma Carter', 'emma@piedpiper.io', 'Pro', 240, 'past_due', '2025-01-08'),
  row(7, 'Nicholas Martinez', 'nick@initech.com', 'Pro', 240, 'active', '2025-09-15'),
  row(8, 'Lisa Anderson', 'lisa@example.org', 'Starter', 0, 'trial', '2026-04-12'),
  row(9, 'David Chen', 'david@startup.dev', 'Pro', 240, 'active', '2025-06-20'),
  row(10, 'Sarah Wilson', 'sarah@acme.co', 'Enterprise', 4800, 'active', '2024-11-08'),
  row(11, 'Mike Johnson', 'mike@example.io', 'Pro', 240, 'cancelled', '2024-07-30'),
  row(12, 'Lori Lynch', 'lori@example.com', 'Pro', 240, 'active', '2025-03-18'),
  row(13, 'James Walker', 'james@startup.io', 'Starter', 0, 'trial', '2026-05-01'),
  row(14, 'Olivia Brown', 'olivia@example.com', 'Pro', 240, 'active', '2025-10-12'),
  row(15, 'Ethan Garcia', 'ethan@brand.co', 'Enterprise', 4800, 'active', '2025-02-28'),
  row(16, 'Sophia Lee', 'sophia@example.com', 'Pro', 240, 'past_due', '2024-12-22'),
  row(17, 'Henry Martinez', 'henry@firm.com', 'Starter', 0, 'trial', '2026-04-05'),
  row(18, 'Mia Robinson', 'mia@example.org', 'Pro', 240, 'active', '2025-07-09'),
  row(19, 'Liam Scott', 'liam@example.com', 'Pro', 240, 'cancelled', '2024-09-15'),
  row(20, 'Ava White', 'ava@example.com', 'Enterprise', 4800, 'active', '2025-01-31'),
  row(21, 'Noah Hall', 'noah@example.com', 'Pro', 240, 'active', '2025-08-25'),
  row(22, 'Isabella Allen', 'isabella@example.com', 'Pro', 240, 'trial', '2026-04-18'),
]

/**
 * `format()` from data-table.scripts.html, pinned to `en-US` + UTC so the
 * server and client render the same string (no hydration mismatch).
 */
export function formatSignupDate(iso: string): string {
  if (!iso) return ''
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatMrr(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`
}
