import type { AlertVariant } from '@cooladmin/react'

/** Sample data for CoolAdmin's alert.html (the /ui/alerts page). */

export type NoticeTone = 'info' | 'success' | 'warning' | 'danger'

export interface NoticeCard {
  id: string
  tone: NoticeTone
  icon: string
  title: string
  text: string
}

export const noticeCards: NoticeCard[] = [
  {
    id: 'deployed',
    tone: 'info',
    icon: 'fa-solid fa-circle-info',
    title: 'New version deployed',
    text: 'Version 3.1.0 is now live with improved analytics and a redesigned billing flow.',
  },
  {
    id: 'backup',
    tone: 'success',
    icon: 'fa-solid fa-circle-check',
    title: 'Backup completed',
    text: 'Your weekly backup finished in 2m 14s. 4.2 GB of data was archived.',
  },
  {
    id: 'storage',
    tone: 'warning',
    icon: 'fa-solid fa-triangle-exclamation',
    title: 'Storage almost full',
    text: 'You’re using 82% of your 100 GB plan. Consider upgrading.',
  },
  {
    id: 'payment',
    tone: 'danger',
    icon: 'fa-solid fa-circle-xmark',
    title: 'Payment failed',
    text: 'Your card ending in 4242 was declined. Please update your billing details.',
  },
]

export interface DismissibleAlert {
  id: string
  variant: AlertVariant
  icon: string
  title: string
  text: string
}

export const dismissibleAlerts: DismissibleAlert[] = [
  {
    id: 'primary',
    variant: 'primary',
    icon: 'fa-solid fa-circle-info',
    title: 'Heads up',
    text: '— this is an informational alert with default Bootstrap styling.',
  },
  {
    id: 'success',
    variant: 'success',
    icon: 'fa-solid fa-circle-check',
    title: 'Success!',
    text: 'Your changes have been saved.',
  },
  {
    id: 'warning',
    variant: 'warning',
    icon: 'fa-solid fa-triangle-exclamation',
    title: 'Warning',
    text: '— please double-check your input before submitting.',
  },
  {
    id: 'danger',
    variant: 'danger',
    icon: 'fa-solid fa-circle-xmark',
    title: 'Error',
    text: '— couldn’t connect to the server. Please try again later.',
  },
]

export type ToastKind = 'info' | 'success' | 'warning' | 'error'

export interface ToastDemoButton {
  kind: ToastKind
  icon: string
  label: string
  message: string
  /** `--m-*` colour token used for the button fill (CoolAdmin inlines it on the `.m-btn`). */
  tone?: 'success' | 'warning' | 'danger'
}

export const toastDemoButtons: ToastDemoButton[] = [
  {
    kind: 'info',
    icon: 'fa-solid fa-circle-info',
    label: 'Info toast',
    message: 'Tap is queued for sync',
  },
  {
    kind: 'success',
    icon: 'fa-solid fa-circle-check',
    label: 'Success toast',
    message: 'Saved — backup completed',
    tone: 'success',
  },
  {
    kind: 'warning',
    icon: 'fa-solid fa-triangle-exclamation',
    label: 'Warning toast',
    message: 'Storage at 82% — upgrade soon',
    tone: 'warning',
  },
  {
    kind: 'error',
    icon: 'fa-solid fa-circle-xmark',
    label: 'Error toast',
    message: 'Failed to fetch — check connection',
    tone: 'danger',
  },
]

export interface AccentRailCard {
  id: string
  modifier?: 'success' | 'warning' | 'danger'
  title: string
  text: string
}

export const accentRailCards: AccentRailCard[] = [
  { id: 'brand', title: 'Brand', text: 'Calls attention without going loud.' },
  { id: 'success', modifier: 'success', title: 'Success', text: 'For positive states.' },
  { id: 'warning', modifier: 'warning', title: 'Warning', text: 'For "heads up" states.' },
  { id: 'danger', modifier: 'danger', title: 'Danger', text: 'For failures.' },
]
