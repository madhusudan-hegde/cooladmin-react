import { Footer, MCard, PageHeader, SectionEyebrow } from '@cooladmin/react'
import { UiModalsDemo } from '@/components/ui-modals-demo'

export const metadata = { title: 'Modals' }

/** CoolAdmin modal.html + modal.post.html — modern dialog patterns and the legacy size/backdrop dialogs. */
export default function ModalsPage() {
  return (
    <>
      <PageHeader
        title="Modals"
        subtitle="Bootstrap 5 modal dialogs: small, large, scrollable, and centered variations."
      />

      <SectionEyebrow className="mb-2">DIALOG TYPES</SectionEyebrow>
      <MCard
        title="Modal patterns"
        subtitle="Click any trigger to open a Bootstrap 5 modal restyled with the modern design."
      >
        <UiModalsDemo section="modern" />
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">SIZES &amp; BACKDROP</SectionEyebrow>
      <MCard
        title="Small, medium, large, scrolling and static"
        subtitle="The classic CoolAdmin dialogs — Bootstrap .btn footers, a long scrolling body, and a static backdrop that won’t close on click."
      >
        <UiModalsDemo section="legacy" />
      </MCard>

      <Footer />
    </>
  )
}
