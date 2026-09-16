import { Footer, PageHeader } from '@cooladmin/react'
import { ProfileHeaderActions } from '@/components/profile-header-actions'
import { ProfileSettingsTabs } from '@/components/profile-settings-tabs'

export const metadata = { title: 'Account & settings' }

/** CoolAdmin profile.html — Account & settings with Account / Security / Notifications / Billing / API keys tabs. */
export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Account & settings"
        subtitle="Profile, security, notifications, billing, and API keys settings."
        actions={<ProfileHeaderActions />}
      />

      <ProfileSettingsTabs />

      <Footer />
    </>
  )
}
