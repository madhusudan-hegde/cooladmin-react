import { Footer, PageHeader } from '@cooladmin/react'
import { InboxHeaderActions } from '@/components/inbox-header-actions'
import { InboxView } from '@/components/inbox-view'

export const metadata = { title: 'Inbox' }

/** CoolAdmin's inbox.html — stats strip, folder tabs and the list/reader split pane. */
export default function InboxPage() {
  return (
    <>
      <PageHeader
        title="Inbox"
        subtitle="Email-style inbox interface with sidebar, message list, and reading pane."
        actions={<InboxHeaderActions />}
      />
      <InboxView />
      <Footer />
    </>
  )
}
