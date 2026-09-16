import { Footer, IconButton, MButton, MCard, PageHeader, SectionEyebrow } from '@madhusudan-hegde/cooladmin-react'
import { LoadingDemoButton } from '@/components/loading-demo-button'

export const metadata = { title: 'Buttons' }

const semanticButtons = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const
const outlineButtons = ['primary', 'secondary', 'success', 'warning', 'danger'] as const

const iconButtons: { icon: string; label: string; danger?: boolean }[] = [
  { icon: 'fa-solid fa-arrows-rotate', label: 'Refresh' },
  { icon: 'fa-solid fa-pen-to-square', label: 'Edit' },
  { icon: 'fa-regular fa-copy', label: 'Copy' },
  { icon: 'fa-solid fa-box-archive', label: 'Archive' },
  { icon: 'fa-regular fa-trash-can', label: 'Delete', danger: true },
  { icon: 'fa-solid fa-download', label: 'Download' },
  { icon: 'fa-solid fa-ellipsis-vertical', label: 'More' },
]

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** CoolAdmin button.html — modern button family, Bootstrap variants, sizes, icon buttons, groups, loading states. */
export default function ButtonsPage() {
  return (
    <>
      <PageHeader
        title="Buttons"
        subtitle="Bootstrap 5 button styles, sizes, states, and icon-button examples."
      />

      <SectionEyebrow className="mb-2">PRIMARY VARIANTS</SectionEyebrow>
      <MCard
        title="Modern button family"
        subtitle="The native theme buttons — primary fills with the brand color, ghost is the neutral outline."
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <MButton variant="primary">Primary</MButton>
          <MButton variant="ghost">Ghost</MButton>
          <MButton variant="primary" icon="fa-solid fa-plus">
            With icon
          </MButton>
          <MButton variant="ghost">
            With icon <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </MButton>
          <MButton variant="primary" disabled>
            Disabled
          </MButton>
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">BOOTSTRAP COLOR FAMILY</SectionEyebrow>
      <MCard
        title="Semantic colors"
        subtitle={
          <>
            Bootstrap{' '}
            <code
              style={{
                background: 'var(--m-surface-2)',
                padding: '1px 6px',
                borderRadius: 4,
                fontSize: 12,
              }}
            >
              .btn-*
            </code>{' '}
            classes mapped to the brand palette.
          </>
        }
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {semanticButtons.map(v => (
            <button type="button" className={`btn btn-${v}`} key={v}>
              {capitalize(v)}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          {outlineButtons.map(v => (
            <button type="button" className={`btn btn-outline-${v}`} key={v}>
              Outline {v}
            </button>
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">SIZES</SectionEyebrow>
      <MCard>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" className="btn btn-primary btn-sm">
            Small
          </button>
          <button type="button" className="btn btn-primary">
            Default
          </button>
          <button type="button" className="btn btn-primary btn-lg">
            Large
          </button>
          <MButton variant="primary" style={{ height: 30, padding: '0 12px', fontSize: 12.5 }}>
            Compact m-btn
          </MButton>
          <MButton variant="primary" style={{ height: 44, padding: '0 20px', fontSize: 14.5 }}>
            Tall m-btn
          </MButton>
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">ICON-ONLY BUTTONS</SectionEyebrow>
      <MCard
        title="Toolbar-style icon buttons"
        subtitle="Used across tables, cards, and topbars for compact actions."
      >
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          {iconButtons.map(b => (
            <IconButton
              key={b.label}
              icon={b.icon}
              label={b.label}
              style={b.danger ? { color: 'var(--m-danger)' } : undefined}
            />
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">BUTTON GROUPS</SectionEyebrow>
      <MCard>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div className="btn-group" role="group" aria-label="Toolbar group">
            <button type="button" className="btn btn-secondary" aria-label="Bold">
              <i className="fa-solid fa-bold" aria-hidden="true" />
            </button>
            <button type="button" className="btn btn-secondary" aria-label="Italic">
              <i className="fa-solid fa-italic" aria-hidden="true" />
            </button>
            <button type="button" className="btn btn-secondary" aria-label="Underline">
              <i className="fa-solid fa-underline" aria-hidden="true" />
            </button>
          </div>
          <div className="btn-group" role="group" aria-label="Date range">
            <button type="button" className="btn btn-secondary">
              Day
            </button>
            <button type="button" className="btn btn-primary" aria-pressed="true">
              Week
            </button>
            <button type="button" className="btn btn-secondary">
              Month
            </button>
            <button type="button" className="btn btn-secondary">
              Year
            </button>
          </div>
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">LOADING STATES</SectionEyebrow>
      <MCard
        title="Async actions"
        subtitle={'Click "Save" to see the spinner pattern. Toast confirms when done.'}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <LoadingDemoButton />
          <MButton variant="primary" loading>
            Loading…
          </MButton>
          <MButton variant="ghost" disabled>
            <i
              className="fa-solid fa-circle-check"
              style={{ color: 'var(--m-success)' }}
              aria-hidden="true"
            />
            Saved
          </MButton>
        </div>
      </MCard>

      <Footer />
    </>
  )
}
