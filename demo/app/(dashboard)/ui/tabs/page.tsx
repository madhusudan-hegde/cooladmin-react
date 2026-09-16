import type { CSSProperties, ReactNode } from 'react'
import { Footer, MCard, PageHeader, SectionEyebrow, Tabs } from '@madhusudan-hegde/cooladmin-react'
import type { TabItem } from '@madhusudan-hegde/cooladmin-react'

export const metadata = { title: 'Tabs' }

const mutedText: CSSProperties = { margin: 0, color: 'var(--m-text-muted)' }
const paneHeading: CSSProperties = {
  margin: '0 0 8px',
  fontSize: 15,
  color: 'var(--m-text)',
  fontWeight: 600,
}

const Pane = ({ children }: { children: ReactNode }) => <p style={mutedText}>{children}</p>

const settingsTabs: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'fa-solid fa-chart-line',
    content: (
      <Pane>
        Overview content goes here. Quick summary of the active item with KPIs and a chart.
      </Pane>
    ),
  },
  {
    id: 'details',
    label: 'Details',
    icon: 'fa-solid fa-file-lines',
    content: <Pane>Details tab — fields, attributes, descriptions.</Pane>,
  },
  {
    id: 'history',
    label: 'History',
    icon: 'fa-regular fa-clock',
    content: <Pane>History tab — chronological log of changes.</Pane>,
  },
  {
    id: 'team',
    label: 'Team',
    icon: 'fa-solid fa-users',
    content: <Pane>Team tab — members and their roles.</Pane>,
  },
]

const pillTabs: TabItem[] = [
  { id: 'inbox', label: 'Inbox', content: <Pane>12 unread messages.</Pane> },
  { id: 'starred', label: 'Starred', content: <Pane>3 starred messages.</Pane> },
  { id: 'drafts', label: 'Drafts', content: <Pane>2 drafts saved.</Pane> },
  { id: 'archive', label: 'Archive', content: <Pane>128 archived messages.</Pane> },
]

const verticalPane = (title: string, text: string) => (
  <>
    <h3 style={paneHeading}>{title}</h3>
    <Pane>{text}</Pane>
  </>
)

const verticalTabs: TabItem[] = [
  {
    id: 'account',
    label: 'Account',
    icon: 'fa-solid fa-user',
    content: verticalPane('Account', 'Profile photo, name, email, language, and timezone.'),
  },
  {
    id: 'security',
    label: 'Security',
    icon: 'fa-solid fa-shield-halved',
    content: verticalPane('Security', 'Password, two-factor authentication, and active sessions.'),
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'fa-regular fa-bell',
    content: verticalPane('Notifications', 'Email and in-app notification preferences.'),
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: 'fa-solid fa-credit-card',
    content: verticalPane('Billing', 'Plan, payment method, and invoices.'),
  },
]

/** CoolAdmin tab.html — underline (settings) tabs, pill tabs and vertical pill tabs via the `Tabs` component. */
export default function TabsPage() {
  return (
    <>
      <PageHeader
        title="Tabs"
        subtitle="Bootstrap 5 tab navigation: pills, underline, vertical, and content-switching examples."
      />

      <SectionEyebrow className="mb-2">UNDERLINE TABS (DEFAULT)</SectionEyebrow>
      <MCard
        title="Same pattern as the settings page"
        subtitle="Tabs sit on top of an underline; the active one shows a brand-blue rail."
      >
        <Tabs id="tab" items={settingsTabs} variant="settings" />
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">PILL TABS</SectionEyebrow>
      <MCard>
        <Tabs id="pill" items={pillTabs} variant="pills" />
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">VERTICAL TABS</SectionEyebrow>
      <MCard>
        <Tabs id="v" items={verticalTabs} variant="pills" vertical />
      </MCard>

      <Footer />
    </>
  )
}
