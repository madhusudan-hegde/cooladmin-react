import { Footer } from '@madhusudan-hegde/cooladmin-react'
import { NotificationsFeed } from '@/components/notifications-feed'

export const metadata = { title: 'Notifications' }

/** CoolAdmin's notifications.html — the feed (with its page header) is one client component. */
export default function NotificationsPage() {
  return (
    <>
      <NotificationsFeed />
      <Footer />
    </>
  )
}
