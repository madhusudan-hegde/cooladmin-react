'use client'

import { Tabs } from '@cooladmin/react'
import type { TabItem } from '@cooladmin/react'
import { ProfileAccountPane } from '@/components/profile-account-pane'
import { ProfileApiKeysPane } from '@/components/profile-api-keys-pane'
import { ProfileBillingPane } from '@/components/profile-billing-pane'
import { ProfileNotificationsPane } from '@/components/profile-notifications-pane'
import { ProfileSecurityPane } from '@/components/profile-security-pane'

const items: TabItem[] = [
  { id: 'account', label: 'Account', icon: 'fa-solid fa-user', content: <ProfileAccountPane /> },
  {
    id: 'security',
    label: 'Security',
    icon: 'fa-solid fa-shield-halved',
    content: <ProfileSecurityPane />,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'fa-regular fa-bell',
    content: <ProfileNotificationsPane />,
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: 'fa-solid fa-credit-card',
    content: <ProfileBillingPane />,
  },
  { id: 'api', label: 'API keys', icon: 'fa-solid fa-key', content: <ProfileApiKeysPane /> },
]

/** profile.html's `.settings-tabs` (Account / Security / Notifications / Billing / API keys). */
export function ProfileSettingsTabs() {
  return <Tabs items={items} variant="settings" id="settings" />
}
