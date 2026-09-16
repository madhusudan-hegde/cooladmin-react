import type { AccentSlot } from '@madhusudan-hegde/cooladmin-react'
import type { KpiCard } from '@/lib/dashboard-data'
import { avatar } from '@/lib/dashboard-data'

/**
 * Sample content for the /ui/cards showcase (CoolAdmin card.html), lifted
 * verbatim; the preview-card sparklines come from `card-spark-*` in main-vanilla.js.
 * Plain module — no `'use client'`.
 */

export const cardKpis: KpiCard[] = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: '$48,217',
    icon: 'fa-solid fa-dollar-sign',
    color: 'c1',
    delta: 12.5,
    deltaPeriod: 'vs last 30d',
  },
  {
    id: 'customers',
    label: 'New customers',
    value: '284',
    icon: 'fa-solid fa-user-plus',
    color: 'c2',
    delta: 8.2,
    deltaPeriod: 'vs last 30d',
  },
  {
    id: 'bounce',
    label: 'Bounce rate',
    value: '38.4%',
    icon: 'fa-solid fa-arrow-trend-down',
    color: 'c3',
    delta: '2.1pp',
    deltaDirection: 'down',
    deltaPeriod: 'vs last 30d',
  },
  {
    id: 'conversion',
    label: 'Conversion',
    value: '3.24%',
    icon: 'fa-solid fa-bullseye',
    color: 'c4',
    delta: '0.6pp',
    deltaDirection: 'up',
    deltaPeriod: 'vs last 30d',
  },
]

export interface ProfileStat {
  value: string
  label: string
}

export const profileStats: ProfileStat[] = [
  { value: '128', label: 'Projects' },
  { value: '2.4k', label: 'Commits' },
  { value: '98%', label: 'On time' },
]

export const profileSocials: { icon: string; label: string }[] = [
  { icon: 'fa-brands fa-github', label: 'GitHub' },
  { icon: 'fa-brands fa-twitter', label: 'Twitter' },
  { icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
  { icon: 'fa-solid fa-link', label: 'Website' },
]

export interface CoverCard {
  id: string
  image: string
  tag: string
  /** Colour slot for the tag chip; omit for the default accent tint. */
  tagColor?: AccentSlot
  title: string
  text: string
  authorAvatar: string
  authorLine: string
}

export const coverCards: CoverCard[] = [
  {
    id: 'monorepo',
    image: '/assets/img/bg-title-01.jpg',
    tag: 'Engineering',
    title: 'Migrating to a typed monorepo',
    text: 'Eight months in: what we got right, what we’d skip, and the surprising places TypeScript pays for itself.',
    authorAvatar: avatar(1),
    authorLine: 'John Doe · 8 min read',
  },
  {
    id: 'roadmap',
    image: '/assets/img/bg-title-02.jpg',
    tag: 'Product',
    tagColor: 'c2',
    title: 'Q2 product roadmap',
    text: 'Three big themes for the quarter: faster onboarding, deeper analytics, and a redesigned billing experience.',
    authorAvatar: avatar(5),
    authorLine: 'Cynthia Harvey · 5 min read',
  },
  {
    id: 'visual-system',
    image: '/assets/img/bg-title-01.jpg',
    tag: 'Design',
    tagColor: 'c4',
    title: 'A new visual system for 2026',
    text: 'Refreshed colour tokens, an Inter-based type scale, and the soft-tinted accent palette across every surface.',
    authorAvatar: avatar(6),
    authorLine: 'Michelle Moreno · 12 min read',
  },
]

export interface PricingTier {
  id: string
  tier: string
  price: string
  /** Suffix rendered in `<small>` after the price. */
  per?: string
  period: string
  features: string[]
  cta: string
  featured?: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    tier: 'Starter',
    price: '$0',
    per: '/mo',
    period: 'For solo builders',
    features: ['1 user seat', '5 projects', 'Community support', '1 GB storage'],
    cta: 'Choose Starter',
  },
  {
    id: 'pro',
    tier: 'Pro',
    price: '$24',
    per: '/mo',
    period: 'For small teams',
    features: [
      'Up to 10 users',
      'Unlimited projects',
      'Priority email support',
      '100 GB storage',
      'Advanced analytics',
    ],
    cta: 'Choose Pro',
    featured: true,
  },
  {
    id: 'enterprise',
    tier: 'Enterprise',
    price: 'Custom',
    period: 'For larger orgs',
    features: [
      'Unlimited users',
      'SSO & SCIM',
      '24/7 dedicated support',
      'Audit logs',
      'Custom contract',
    ],
    cta: 'Talk to sales',
  },
]

export type NoticeTone = 'info' | 'success' | 'warning' | 'danger'

export interface NoticeCard {
  id: string
  tone: NoticeTone
  icon: string
  title: string
  text: string
  actions?: { label: string; variant: 'primary' | 'ghost' | 'danger' }[]
}

export const noticeCards: NoticeCard[] = [
  {
    id: 'deployed',
    tone: 'info',
    icon: 'fa-solid fa-circle-info',
    title: 'New version deployed',
    text: 'Version 3.1.0 is live. Includes the new analytics dashboard and a redesigned billing flow.',
    actions: [
      { label: 'Release notes', variant: 'ghost' },
      { label: 'Dismiss', variant: 'ghost' },
    ],
  },
  {
    id: 'backup',
    tone: 'success',
    icon: 'fa-solid fa-circle-check',
    title: 'Backup completed',
    text: 'Your weekly backup finished in 2m 14s. 4.2 GB of data was archived to the off-site vault.',
  },
  {
    id: 'storage',
    tone: 'warning',
    icon: 'fa-solid fa-triangle-exclamation',
    title: 'Storage almost full',
    text: 'You’re using 82% of your 100 GB plan. Consider upgrading or pruning old projects to avoid hitting the cap.',
    actions: [{ label: 'Upgrade plan', variant: 'primary' }],
  },
  {
    id: 'payment',
    tone: 'danger',
    icon: 'fa-solid fa-circle-xmark',
    title: 'Payment failed',
    text: 'Your card ending in ···· 4242 was declined. Please update your billing details to keep your subscription active.',
    actions: [{ label: 'Update card', variant: 'danger' }],
  },
]

export interface UploadItem {
  id: string
  icon: string
  /** Colour slot for the icon disc; omit for the default accent tint. */
  color?: AccentSlot
  title: string
  sub: string
  meta: string
}

export const recentUploads: UploadItem[] = [
  {
    id: 'roadmap-pdf',
    icon: 'fa-regular fa-file-lines',
    color: 'c1',
    title: 'Q2 roadmap.pdf',
    sub: '2.4 MB · updated 12 min ago',
    meta: 'John D.',
  },
  {
    id: 'brand-marks',
    icon: 'fa-regular fa-image',
    color: 'c2',
    title: 'brand-marks-v3.zip',
    sub: '38 MB · updated 2 hours ago',
    meta: 'Michelle M.',
  },
  {
    id: 'may-revenue',
    icon: 'fa-solid fa-table',
    color: 'c3',
    title: 'may-revenue.xlsx',
    sub: '182 KB · updated yesterday',
    meta: 'Diane M.',
  },
  {
    id: 'board-deck',
    icon: 'fa-solid fa-display',
    color: 'c4',
    title: 'board-deck-may.pptx',
    sub: '14 MB · updated 2 days ago',
    meta: 'Cynthia H.',
  },
  {
    id: 'interviews',
    icon: 'fa-regular fa-folder',
    title: 'Customer interviews',
    sub: '12 files · updated 3 days ago',
    meta: 'Robert T.',
  },
]

export interface PreviewCard {
  id: string
  label: string
  value: string
  /** Optional unit rendered in `<small>` after the value. */
  unit?: string
  icon: string
  color: AccentSlot
  sparkline: number[]
  ariaLabel: string
}

export const previewCards: PreviewCard[] = [
  {
    id: 'sessions',
    label: 'Active sessions',
    value: '8,492',
    icon: 'fa-solid fa-users',
    color: 'c1',
    sparkline: [22, 28, 24, 32, 35, 30, 38, 42, 38, 46, 50, 48, 52, 56, 54, 60, 58, 62, 66, 70],
    ariaLabel: 'Sparkline of active sessions, trending up',
  },
  {
    id: 'api',
    label: 'API requests',
    value: '412k',
    icon: 'fa-solid fa-bolt',
    color: 'c2',
    sparkline: [
      180, 220, 200, 260, 280, 240, 300, 320, 290, 340, 360, 330, 380, 400, 370, 420, 410, 440, 460,
      480,
    ],
    ariaLabel: 'Sparkline of API requests, trending up',
  },
  {
    id: 'errors',
    label: 'Error rate',
    value: '0.18%',
    icon: 'fa-solid fa-circle-exclamation',
    color: 'c3',
    sparkline: [
      0.32, 0.3, 0.28, 0.34, 0.31, 0.27, 0.25, 0.28, 0.24, 0.22, 0.21, 0.23, 0.2, 0.19, 0.21, 0.18,
      0.2, 0.18, 0.17, 0.18,
    ],
    ariaLabel: 'Sparkline of error rate, trending down',
  },
  {
    id: 'latency',
    label: 'Latency p99',
    value: '182',
    unit: ' ms',
    icon: 'fa-regular fa-clock',
    color: 'c4',
    sparkline: [
      212, 220, 215, 208, 224, 218, 200, 195, 188, 198, 192, 186, 192, 190, 184, 188, 178, 182, 175,
      182,
    ],
    ariaLabel: 'Sparkline of p99 latency, trending down',
  },
]

export interface AccentRailCard {
  id: string
  modifier?: 'success' | 'warning' | 'danger'
  title: string
  text: string
}

export const accentRailCards: AccentRailCard[] = [
  {
    id: 'brand',
    title: 'Brand',
    text: 'A simple card with a brand-blue left rail. Use it to call attention without going loud.',
  },
  {
    id: 'success',
    modifier: 'success',
    title: 'Success',
    text: 'Green accent rail for positive states — goal hit, payment received, deploy succeeded.',
  },
  {
    id: 'warning',
    modifier: 'warning',
    title: 'Warning',
    text: 'Amber rail for “heads up” states — storage filling, deadline approaching, etc.',
  },
  {
    id: 'danger',
    modifier: 'danger',
    title: 'Danger',
    text: 'Red rail for failures — payment declined, integration broken, deploy failed.',
  },
]
