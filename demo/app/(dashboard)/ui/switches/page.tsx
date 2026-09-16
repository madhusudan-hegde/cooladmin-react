import type { CSSProperties } from 'react'
import { Footer, MCard, PageHeader, SectionEyebrow, Switch } from '@madhusudan-hegde/cooladmin-react'

export const metadata = { title: 'Toggle switches' }

const switches = [
  { id: 'sw-1', label: 'Two-factor authentication', checked: true },
  { id: 'sw-2', label: 'Email digest', checked: false },
  { id: 'sw-3', label: 'Real-time mentions', checked: true },
  { id: 'sw-4', label: 'System alerts (always on)', checked: true, disabled: true },
]

const notifRows = [
  {
    title: 'Product updates',
    sub: 'New features, improvements, and changelog entries.',
    checked: true,
  },
  { title: 'Weekly digest', sub: 'A weekly recap of activity in your workspace.', checked: false },
  { title: 'Comments & mentions', sub: 'Notify me when someone @mentions me.', checked: true },
  {
    title: 'Marketing & tips',
    sub: 'Best-practice guides and the occasional promo.',
    checked: false,
  },
]

const checkboxes = [
  { id: 'cb-1', label: 'Selected option', checked: true },
  { id: 'cb-2', label: 'Unselected option', checked: false },
  { id: 'cb-3', label: 'Disabled option', checked: false, disabled: true },
]

const radios = [
  { id: 'r-1', label: 'Monthly billing', checked: true },
  { id: 'r-2', label: 'Annual billing (20% off)', checked: false },
  { id: 'r-3', label: 'Pay-as-you-go', checked: false },
]

const groupHeading: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--m-text-muted)',
  margin: '0 0 12px',
}

/** CoolAdmin switch.html — form-switch, settings-style toggle rows, checkboxes and radios. */
export default function SwitchesPage() {
  return (
    <>
      <PageHeader
        title="Toggle switches"
        subtitle="Modern toggle switches and Bootstrap 5 form-check examples."
      />

      <SectionEyebrow className="mb-2">DEFAULT SWITCH</SectionEyebrow>
      <MCard
        title="Bootstrap form-switch"
        subtitle="Bootstrap 5 native toggle, restyled to use the brand accent."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {switches.map(s => (
            <Switch
              key={s.id}
              id={s.id}
              label={s.label}
              defaultChecked={s.checked}
              disabled={s.disabled}
            />
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">SETTINGS-STYLE TOGGLE ROWS</SectionEyebrow>
      <MCard>
        <div className="notif-grid">
          {notifRows.map(row => (
            <div className="notif-row" key={row.title}>
              <div>
                <p className="notif-row__title">{row.title}</p>
                <p className="notif-row__sub">{row.sub}</p>
              </div>
              <Switch aria-label={row.title} defaultChecked={row.checked} />
            </div>
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">CHECKBOXES &amp; RADIOS</SectionEyebrow>
      <MCard
        title="Form-check controls"
        subtitle="Restyled with brand-blue checked state and a 3px focus ring."
      >
        <div className="row">
          <div className="col-md-6">
            <h3 style={groupHeading}>Checkboxes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {checkboxes.map(c => (
                <div className="form-check" key={c.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={c.id}
                    defaultChecked={c.checked}
                    disabled={c.disabled}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={c.id}
                    style={c.disabled ? { color: 'var(--m-text-faint)' } : undefined}
                  >
                    {c.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <h3 style={groupHeading}>Radios</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {radios.map(r => (
                <div className="form-check" key={r.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="r1"
                    id={r.id}
                    defaultChecked={r.checked}
                  />
                  <label className="form-check-label" htmlFor={r.id}>
                    {r.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MCard>

      <Footer />
    </>
  )
}
