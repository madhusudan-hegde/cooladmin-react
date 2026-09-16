/**
 * Sample activity log for the /notifications page, lifted verbatim from
 * CoolAdmin's `notifications.html`. Plain module — no `'use client'`.
 *
 * `text` uses `**bold**` for `<b>` and `` `code` `` for `<code>` so the data
 * stays a serialisable string.
 */

export type NotificationType = 'mention' | 'system' | 'billing' | 'security'
export type NotificationTone = 'info' | 'success' | 'warning' | 'danger'
export type NotificationFilter = 'all' | NotificationType

export interface NotificationEntry {
  id: string
  /** Day-group heading (`.notif-day__label`). */
  group: string
  /** Avatar URL — rendered instead of `icon` when present. */
  avatar?: string
  icon?: string
  tone?: NotificationTone
  text: string
  /** Category chip (`.notif-list__chip--*`); plain activity rows have none. */
  type?: NotificationType
  time: string
  unread?: boolean
}

export const NOTIFICATION_GROUPS = ['TODAY', 'YESTERDAY', 'EARLIER THIS WEEK'] as const

export const NOTIFICATION_FILTERS: { id: NotificationFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mention', label: 'Mentions' },
  { id: 'system', label: 'System' },
  { id: 'billing', label: 'Billing' },
  { id: 'security', label: 'Security' },
]

export const NOTIFICATION_CHIP_LABELS: Record<NotificationType, string> = {
  mention: 'Mention',
  system: 'System',
  billing: 'Billing',
  security: 'Security',
}

const avatar = (n: number): string => `/assets/img/avatar-0${n}.jpg`

export const notifications: NotificationEntry[] = [
  // TODAY
  {
    id: 'n1',
    group: 'TODAY',
    avatar: avatar(4),
    text: '**Diane Myers** mentioned you in **"Auth flow refactor — PR #2148"**: "The session token migration touches more than I thought, can you review?"',
    type: 'mention',
    time: '14 min ago',
    unread: true,
  },
  {
    id: 'n2',
    group: 'TODAY',
    icon: 'fa-solid fa-circle-check',
    tone: 'success',
    text: '**Backup completed** — weekly backup finished in 2m 14s. 4.2 GB archived to off-site storage.',
    type: 'system',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 'n3',
    group: 'TODAY',
    icon: 'fa-solid fa-triangle-exclamation',
    tone: 'warning',
    text: '**Storage at 82%** — you’ve used 82 GB of your 100 GB plan. Consider upgrading or pruning old projects.',
    type: 'billing',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'n4',
    group: 'TODAY',
    avatar: avatar(6),
    text: '**Cynthia Harvey** approved your PR **"Q2 dashboard redesign"**.',
    time: '3 hours ago',
  },
  {
    id: 'n5',
    group: 'TODAY',
    icon: 'fa-solid fa-bolt',
    tone: 'info',
    text: '**New version deployed** — v3.1.0 is now live. Includes the new analytics dashboard and a redesigned billing flow.',
    type: 'system',
    time: '5 hours ago',
  },
  // YESTERDAY
  {
    id: 'n6',
    group: 'YESTERDAY',
    icon: 'fa-solid fa-shield-halved',
    tone: 'danger',
    text: '**New sign-in from Berlin** — iPhone 15 Pro, Safari. If this wasn’t you, secure your account immediately.',
    type: 'security',
    time: 'Yesterday, 22:14',
  },
  {
    id: 'n7',
    group: 'YESTERDAY',
    avatar: avatar(5),
    text: '**Michelle Moreno** uploaded 3 files to **Brand assets v3**.',
    time: 'Yesterday, 16:42',
  },
  {
    id: 'n8',
    group: 'YESTERDAY',
    icon: 'fa-regular fa-credit-card',
    tone: 'info',
    text: '**Receipt available** — invoice INV-2026-05 for $369.50 was paid successfully.',
    type: 'billing',
    time: 'Yesterday, 09:15',
  },
  {
    id: 'n9',
    group: 'YESTERDAY',
    avatar: avatar(1),
    text: '**John Doe** mentioned you in **"Q1 customer-interview synthesis"**: "Great point about onboarding friction — let’s prioritize this for next sprint."',
    type: 'mention',
    time: 'Yesterday, 08:30',
  },
  // EARLIER THIS WEEK
  {
    id: 'n10',
    group: 'EARLIER THIS WEEK',
    icon: 'fa-solid fa-shield-halved',
    tone: 'danger',
    text: '**2FA backup codes regenerated** — previous codes are now invalid. Make sure your new codes are stored safely.',
    type: 'security',
    time: '2 days ago',
  },
  {
    id: 'n11',
    group: 'EARLIER THIS WEEK',
    avatar: avatar(2),
    text: '**Robert Taylor** assigned 5 issues to **you** on **API v2 documentation**.',
    time: '3 days ago',
  },
  {
    id: 'n12',
    group: 'EARLIER THIS WEEK',
    icon: 'fa-solid fa-circle-check',
    tone: 'success',
    text: '**Deploy succeeded** — `main` deployed to production. 142 commits since the last release.',
    type: 'system',
    time: '4 days ago',
  },
  {
    id: 'n13',
    group: 'EARLIER THIS WEEK',
    icon: 'fa-solid fa-key',
    tone: 'danger',
    text: '**API key rotated** — the production key was rotated by **Diane Myers**. Old key invalidated.',
    type: 'security',
    time: '5 days ago',
  },
  {
    id: 'n14',
    group: 'EARLIER THIS WEEK',
    icon: 'fa-regular fa-bell',
    tone: 'info',
    text: 'A new **weekly digest** is ready. Highlights: 3 new customers, 12 closed tickets, 8 deploys.',
    type: 'system',
    time: '6 days ago',
  },
]
