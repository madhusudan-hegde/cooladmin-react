import type { BadgeVariant, PriorityLevel, StatusPillStatus } from '@cooladmin/react'

/** Sample data for CoolAdmin's badge.html (the /ui/badges page). */

export interface StatusPillSample {
  status: StatusPillStatus
  label: string
}

export const statusPills: StatusPillSample[] = [
  { status: 'process', label: 'Active' },
  { status: 'process', label: 'Processed' },
  { status: 'approved', label: 'Approved' },
  { status: 'denied', label: 'Denied' },
  { status: 'denied', label: 'Failed' },
]

export interface PriorityChipSample {
  level: PriorityLevel
  label: string
}

export const priorityChips: PriorityChipSample[] = [
  { level: 'high', label: 'High' },
  { level: 'medium', label: 'Medium' },
  { level: 'low', label: 'Low' },
]

export interface RoleBadgeSample {
  role: 'admin' | 'user' | 'member'
  label: string
}

export const roleBadges: RoleBadgeSample[] = [
  { role: 'admin', label: 'Admin' },
  { role: 'user', label: 'User' },
  { role: 'member', label: 'Member' },
]

export interface EmailLabelSample {
  modifier: 'work' | 'personal' | 'social' | 'promo' | 'alert'
  label: string
}

export const emailLabels: EmailLabelSample[] = [
  { modifier: 'work', label: 'Work' },
  { modifier: 'personal', label: 'Personal' },
  { modifier: 'social', label: 'Social' },
  { modifier: 'promo', label: 'Promo' },
  { modifier: 'alert', label: 'Alert' },
]

export interface BootstrapBadgeSample {
  variant: BadgeVariant
  label: string
}

export const bootstrapBadges: BootstrapBadgeSample[] = [
  { variant: 'primary', label: 'Primary' },
  { variant: 'success', label: 'Success' },
  { variant: 'warning', label: 'Warning' },
  { variant: 'danger', label: 'Danger' },
  { variant: 'info', label: 'Info' },
]

export interface PresenceAvatar {
  id: string
  src: string
  alt: string
  /** `--m-*` token of the presence dot. */
  dotColor: string
  presence: string
}

export const presenceAvatars: PresenceAvatar[] = [
  {
    id: 'online',
    src: '/assets/img/avatar-01.jpg',
    alt: 'Team member avatar',
    dotColor: 'var(--m-success)',
    presence: 'Online',
  },
  {
    id: 'away',
    src: '/assets/img/avatar-04.jpg',
    alt: 'Team member avatar',
    dotColor: 'var(--m-warning)',
    presence: 'Away',
  },
  {
    id: 'offline',
    src: '/assets/img/avatar-06.jpg',
    alt: 'Team member avatar',
    dotColor: 'var(--m-text-faint)',
    presence: 'Offline',
  },
]

export interface ApiKeyRow {
  id: string
  title: string
  sub: string
  /** Optional icon tint override (`{ background, color }` tokens), as inlined in badge.html. */
  iconStyle?: { background: string; color: string }
  status: StatusPillStatus
  statusLabel: string
}

export const apiKeys: ApiKeyRow[] = [
  {
    id: 'prod',
    title: 'Production API key',
    sub: 'Created 8 months ago',
    status: 'process',
    statusLabel: 'Active',
  },
  {
    id: 'staging',
    title: 'Staging API key',
    sub: 'Created 4 months ago',
    iconStyle: { background: 'var(--m-c2-soft)', color: 'var(--m-c2)' },
    status: 'approved',
    statusLabel: 'In use',
  },
  {
    id: 'legacy',
    title: 'Legacy v1 key',
    sub: 'Created 3 years ago — deprecated',
    iconStyle: { background: 'var(--m-warning-soft)', color: 'var(--m-warning)' },
    status: 'denied',
    statusLabel: 'Revoked',
  },
]
