import { Footer, PageHeader } from '@cooladmin/react'
import { SetupWizard } from '@/components/setup-wizard'

export const metadata = { title: 'Setup wizard' }

/** CoolAdmin wizard.html — four-step setup flow (Account, Workspace, Plan, Done). */
export default function SetupWizardPage() {
  return (
    <>
      <PageHeader title="Setup wizard" subtitle="Multi-step form wizard with progress indicator." />

      <SetupWizard />

      <Footer />
    </>
  )
}
