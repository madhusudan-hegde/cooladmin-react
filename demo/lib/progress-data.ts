import type { RankListItem } from '@madhusudan-hegde/cooladmin-react'

/**
 * Sample values for the /ui/progress showcase (CoolAdmin progress-bar.html).
 * Plain module — no `'use client'`.
 */

export interface BootstrapBar {
  value: number
  /** Bootstrap `bg-*` class on `.progress-bar`; omit for the accent default. */
  tone?: 'success' | 'warning' | 'danger'
}

export const bootstrapBars: BootstrapBar[] = [
  { value: 25 },
  { value: 50, tone: 'success' },
  { value: 75, tone: 'warning' },
  { value: 92, tone: 'danger' },
]

export interface QuotaBar {
  title: string
  value: number
}

export const quotaBars: QuotaBar[] = [
  { title: 'API calls · 412k of 500k', value: 82 },
  { title: 'Storage · 24 GB of 100 GB', value: 24 },
  { title: 'Team seats · 6 of 10', value: 60 },
  { title: 'Bandwidth · 950 GB of 1 TB', value: 95 },
]

export const campaignRanking: RankListItem[] = [
  { title: 'Q1 product launch — paid', value: '$74,310', percent: 100 },
  { title: 'Black Friday early access', value: '$58,920', percent: 79 },
  { title: 'Spring sale — apparel', value: '$42,165', percent: 57 },
  { title: 'Reactivation email flow', value: '$36,400', percent: 49 },
  { title: 'Affiliate partner push', value: '$24,850', percent: 33 },
]

export interface RingStat {
  pct: number
  color: 'c1' | 'c2' | 'c3' | 'c4'
  label: string
}

export const circularRings: RingStat[] = [
  { pct: 75, color: 'c1', label: 'Storage' },
  { pct: 42, color: 'c2', label: 'Memory' },
  { pct: 88, color: 'c3', label: 'CPU' },
  { pct: 24, color: 'c4', label: 'Network' },
]
