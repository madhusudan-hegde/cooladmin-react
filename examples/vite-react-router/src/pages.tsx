import { useState } from 'react'
import {
  Alert,
  Badge,
  DataTable,
  EmptyState,
  Footer,
  Input,
  MButton,
  MCard,
  Modal,
  PageHeader,
  StatCard,
  StatusPill,
  Switch,
  Tabs,
  useDisclosure,
  useToast,
} from '@madhusudan-hegde/cooladmin-react'
import type { DataTableColumn } from '@madhusudan-hegde/cooladmin-react'

interface Customer {
  id: number
  name: string
  email: string
  plan: 'Starter' | 'Pro' | 'Enterprise'
  status: 'approved' | 'process' | 'denied'
  mrr: number
}

const customers: Customer[] = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  name: ['Ava White', 'Noah Patel', 'Mia Chen', 'Liam Novak', 'Zoe Adams', 'Eli Brooks'][i % 6],
  email: `user${i + 1}@example.com`,
  plan: (['Starter', 'Pro', 'Enterprise'] as const)[i % 3],
  status: (['approved', 'process', 'denied'] as const)[i % 3],
  mrr: 29 + ((i * 37) % 400),
}))

const columns: DataTableColumn<Customer>[] = [
  { key: 'name', header: 'Customer' },
  { key: 'email', header: 'Email' },
  { key: 'plan', header: 'Plan', accessor: c => <Badge soft>{c.plan}</Badge> },
  { key: 'status', header: 'Status', accessor: c => <StatusPill status={c.status} /> },
  { key: 'mrr', header: 'MRR', align: 'end', accessor: c => `$${c.mrr}` },
]

export function OverviewPage() {
  const toast = useToast()
  return (
    <>
      <PageHeader
        title="Overview"
        subtitle="CoolAdmin React running on Vite + React Router — no Next.js involved."
        actions={
          <MButton
            variant="primary"
            icon="fa-solid fa-plus"
            onClick={() => toast.success('Report created')}
          >
            New report
          </MButton>
        }
      />
      <div className="row row-tight dash-row">
        <div className="col-sm-6 col-lg-3">
          <StatCard
            label="Revenue"
            value="$48,217"
            icon="fa-solid fa-dollar-sign"
            color="c1"
            delta={12.5}
            deltaDirection="up"
            deltaPeriod="vs last 30d"
            sparkline={[12, 14, 13, 17, 19, 18, 22]}
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatCard
            label="Orders"
            value="1,284"
            icon="fa-solid fa-cart-shopping"
            color="c2"
            delta={3.2}
            deltaDirection="down"
            deltaPeriod="vs last 30d"
            sparkline={[9, 8, 10, 9, 7, 8, 6]}
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatCard
            label="Active users"
            value="8,492"
            icon="fa-solid fa-users"
            color="c3"
            delta={5.8}
            deltaDirection="up"
            deltaPeriod="vs last 30d"
            sparkline={[4, 5, 6, 6, 8, 9, 11]}
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatCard
            label="Conversion"
            value="3.24%"
            icon="fa-solid fa-bullseye"
            color="c4"
            delta="0.6pp"
            deltaDirection="up"
            deltaPeriod="vs last 30d"
            sparkline={[2, 3, 2, 4, 3, 5, 4]}
          />
        </div>
      </div>
      <div className="row row-tight dash-row">
        <div className="col-lg-8">
          <MCard title="How this example is wired" subtitle="Framework-agnostic routing">
            <Alert variant="info" icon="fa-solid fa-route">
              <code>ReactRouterNavigationProvider</code> gives the sidebar its active state, the ⌘K
              palette its <code>navigate()</code>, and every link React Router's <code>Link</code>.
            </Alert>
            <p className="mb-0">
              Press <kbd>Ctrl</kbd> + <kbd>K</kbd> and pick <em>Customers</em>: the palette
              navigates client-side through React Router, and the sidebar highlights the new route
              without a page reload.
            </p>
          </MCard>
        </div>
        <div className="col-lg-4">
          <MCard title="Theme" subtitle="Accent presets + dark mode work everywhere">
            <p className="mb-0">
              Use the floating switcher in the bottom-right corner. Preferences persist in
              localStorage under the <code>cooladmin.*</code> keys.
            </p>
          </MCard>
        </div>
      </div>
      <Footer />
    </>
  )
}

export function CustomersPage() {
  return (
    <>
      <PageHeader title="Customers" subtitle="DataTable with search, sort and pagination." />
      <MCard>
        <DataTable columns={columns} rows={customers} rowKey={c => c.id} pageSize={8} />
      </MCard>
      <Footer />
    </>
  )
}

export function SettingsPage() {
  const modal = useDisclosure()
  const toast = useToast()
  const [notify, setNotify] = useState(true)
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Tabs, form controls and a modal — all React-controlled."
        actions={
          <MButton variant="primary" onClick={modal.open}>
            Danger zone
          </MButton>
        }
      />
      <MCard>
        <Tabs
          variant="settings"
          items={[
            {
              id: 'profile',
              label: 'Profile',
              icon: 'fa-regular fa-user',
              content: (
                <form className="row g-3" onSubmit={e => e.preventDefault()}>
                  <div className="col-md-6">
                    <Input label="Full name" defaultValue="Ada Lovelace" />
                  </div>
                  <div className="col-md-6">
                    <Input label="Email" type="email" defaultValue="ada@example.com" />
                  </div>
                </form>
              ),
            },
            {
              id: 'notifications',
              label: 'Notifications',
              icon: 'fa-regular fa-bell',
              content: (
                <Switch
                  label="Email me about new sign-ins"
                  checked={notify}
                  onChange={e => setNotify(e.target.checked)}
                />
              ),
            },
          ]}
        />
      </MCard>
      <Modal
        open={modal.isOpen}
        onClose={modal.close}
        title="Delete workspace?"
        size="sm"
        centered
        footer={
          <>
            <MButton variant="ghost" onClick={modal.close}>
              Cancel
            </MButton>
            <MButton
              variant="danger"
              onClick={() => {
                modal.close()
                toast.error('Workspace deleted')
              }}
            >
              Delete
            </MButton>
          </>
        }
      >
        This removes all data. There is no undo.
      </Modal>
      <Footer />
    </>
  )
}

export function NotFoundPage() {
  return (
    <>
      <PageHeader title="Not found" />
      <MCard>
        <EmptyState
          icon="fa-solid fa-compass"
          title="No such page"
          text="Pick a destination from the sidebar."
          actions={
            <MButton href="/" variant="primary" icon="fa-solid fa-house">
              Overview
            </MButton>
          }
        />
      </MCard>
    </>
  )
}
