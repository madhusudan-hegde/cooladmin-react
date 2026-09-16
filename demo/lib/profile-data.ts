import type { StatusPillStatus } from '@madhusudan-hegde/cooladmin-react'

/**
 * Sample data for /account/profile ("Account & settings"), lifted verbatim
 * from CoolAdmin's `profile.html`. Plain module — no `'use client'`.
 */

export const profileUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  jobTitle: 'Engineering lead',
  bio: 'Backend engineer focused on distributed systems. Currently leading the auth-flow refactor.',
  timezone: 'America/Los_Angeles',
  language: 'English (US)',
  avatar: '/assets/img/avatar-big-01.jpg',
}

export const profileTimezones = [
  'UTC',
  'America/Los_Angeles',
  'America/New_York',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Tokyo',
]

export const profileLanguages = [
  'English (US)',
  'English (UK)',
  'Deutsch',
  'Français',
  'Español',
  '日本語',
]

/* ------------------------------------------------------------------ */
/* Account tab                                                          */
/* ------------------------------------------------------------------ */

export interface ConnectedAccount {
  id: string
  name: string
  icon: string
  connected: boolean
  /** Sub-line shown when connected. */
  detail: string
}

export const connectedAccounts: ConnectedAccount[] = [
  {
    id: 'google',
    name: 'Google',
    icon: 'fa-brands fa-google',
    connected: true,
    detail: 'Connected as john@example.com',
  },
  { id: 'github', name: 'GitHub', icon: 'fa-brands fa-github', connected: false, detail: '' },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'fa-brands fa-slack',
    connected: true,
    detail: 'Connected to acme-team',
  },
]

/* ------------------------------------------------------------------ */
/* Security tab                                                         */
/* ------------------------------------------------------------------ */

export interface ActiveSession {
  id: string
  device: string
  location: string
  icon: string
  /** Accent slot for the icon tint (`c2`, `c3`) — `success` for the current session. */
  tone: 'success' | 'c2' | 'c3'
  current: boolean
}

export const activeSessions: ActiveSession[] = [
  {
    id: 'mac',
    device: 'MacBook Pro · Chrome',
    location: 'Portland, OR · current session',
    icon: 'fa-solid fa-laptop',
    tone: 'success',
    current: true,
  },
  {
    id: 'iphone',
    device: 'iPhone 15 Pro · Safari',
    location: 'Portland, OR · 12 minutes ago',
    icon: 'fa-solid fa-mobile-screen',
    tone: 'c2',
    current: false,
  },
  {
    id: 'ipad',
    device: 'iPad · Safari',
    location: 'Seattle, WA · 3 days ago',
    icon: 'fa-solid fa-tablet',
    tone: 'c3',
    current: false,
  },
]

/* ------------------------------------------------------------------ */
/* Notifications tab                                                    */
/* ------------------------------------------------------------------ */

export interface NotificationPref {
  id: string
  title: string
  sub: string
  enabled: boolean
}

export const emailNotifications: NotificationPref[] = [
  {
    id: 'product',
    title: 'Product updates',
    sub: 'New features, improvements, and changelog entries.',
    enabled: true,
  },
  {
    id: 'digest',
    title: 'Weekly digest',
    sub: 'A weekly recap of activity in your workspace.',
    enabled: true,
  },
  {
    id: 'mentions',
    title: 'Comments & mentions',
    sub: 'Notify me when someone replies or @mentions me.',
    enabled: true,
  },
  {
    id: 'marketing',
    title: 'Marketing & tips',
    sub: 'Best-practice guides and the occasional promo.',
    enabled: false,
  },
]

export const pushNotifications: NotificationPref[] = [
  {
    id: 'realtime',
    title: 'Real-time activity',
    sub: 'Comments, mentions, and direct messages.',
    enabled: true,
  },
  {
    id: 'daily',
    title: 'Daily summary',
    sub: 'A morning digest of yesterday’s key events.',
    enabled: false,
  },
  {
    id: 'system',
    title: 'System alerts',
    sub: 'Outages, security alerts, and other critical events.',
    enabled: true,
  },
]

/* ------------------------------------------------------------------ */
/* Billing tab                                                          */
/* ------------------------------------------------------------------ */

export const currentPlan = {
  name: 'Pro · $24/month',
  renewal: 'Renews on June 15, 2026 · Visa ending 4242',
}

export const paymentMethod = {
  brand: 'Visa',
  last4: '4242',
  expires: '11/28',
}

export interface Invoice {
  id: string
  date: string
  number: string
  amount: string
  status: StatusPillStatus
  statusLabel: string
  href: string
}

export const invoices: Invoice[] = [
  {
    id: 'inv-05',
    date: 'May 1, 2026',
    number: 'INV-2026-05',
    amount: '$24.00',
    status: 'process',
    statusLabel: 'Paid',
    href: '/account/invoice',
  },
  {
    id: 'inv-04',
    date: 'Apr 1, 2026',
    number: 'INV-2026-04',
    amount: '$24.00',
    status: 'process',
    statusLabel: 'Paid',
    href: '#',
  },
  {
    id: 'inv-03',
    date: 'Mar 1, 2026',
    number: 'INV-2026-03',
    amount: '$24.00',
    status: 'process',
    statusLabel: 'Paid',
    href: '#',
  },
]

export interface UsageMeter {
  id: string
  label: string
  percent: number
}

export const usageMeters: UsageMeter[] = [
  { id: 'api', label: 'API calls · 412k of 500k', percent: 82 },
  { id: 'storage', label: 'Storage · 24 GB of 100 GB', percent: 24 },
  { id: 'seats', label: 'Team seats · 6 of 10', percent: 60 },
]

/* ------------------------------------------------------------------ */
/* API keys tab                                                         */
/* ------------------------------------------------------------------ */

export interface ApiKey {
  id: string
  label: string
  /** Masked key as displayed. */
  key: string
  created: string
  lastUsed: string
  /** Icon tint; the first key keeps the accent defaults. */
  tone?: 'c2' | 'c3'
}

export const apiKeys: ApiKey[] = [
  {
    id: 'prod',
    label: 'Production',
    key: 'sk_live_••••••••••WFq2',
    created: 'Mar 12, 2025',
    lastUsed: '2 minutes ago',
  },
  {
    id: 'staging',
    label: 'Staging',
    key: 'sk_test_••••••••••3kfP',
    created: 'Jan 8, 2026',
    lastUsed: '4 hours ago',
    tone: 'c2',
  },
  {
    id: 'local',
    label: 'Local dev',
    key: 'sk_test_••••••••••a2eX',
    created: 'Apr 22, 2026',
    lastUsed: 'Never',
    tone: 'c3',
  },
]
