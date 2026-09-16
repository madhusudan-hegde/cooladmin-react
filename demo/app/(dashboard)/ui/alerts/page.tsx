import type { CSSProperties } from 'react'
import { Alert, Footer, MCard, PageHeader, SectionEyebrow, cn } from '@cooladmin/react'
import { accentRailCards, dismissibleAlerts, noticeCards } from '@/lib/ui-alerts-data'
import { UiAlertsToastDemo } from '@/components/ui-alerts-toast-demo'

export const metadata = { title: 'Alerts' }

const codeStyle: CSSProperties = {
  background: 'var(--m-surface-2)',
  padding: '1px 6px',
  borderRadius: 4,
  fontSize: 12,
}
const mutedText: CSSProperties = { margin: 0, fontSize: 13, color: 'var(--m-text-muted)' }

/** CoolAdmin alert.html — notice cards, dismissible inline alerts, toast notifications, accent-rail cards. */
export default function AlertsPage() {
  return (
    <>
      <PageHeader
        title="Alerts"
        subtitle="Bootstrap 5 alert components: success, warning, danger, info, and dismissible variants."
      />

      <SectionEyebrow className="mb-2">NOTICE CARDS</SectionEyebrow>
      <div className="row row-tight">
        {noticeCards.map(card => (
          <div className="col-md-6" key={card.id}>
            <MCard className={cn('notice-card', `notice-card--${card.tone}`)}>
              <span className="notice-card__icon">
                <i className={card.icon} aria-hidden="true" />
              </span>
              <div className="notice-card__body">
                <h3 className="notice-card__title">{card.title}</h3>
                <p className="notice-card__text">{card.text}</p>
              </div>
            </MCard>
          </div>
        ))}
      </div>

      <SectionEyebrow className="mt-4 mb-2">BOOTSTRAP DISMISSIBLE ALERTS</SectionEyebrow>
      <MCard
        title="Inline dismissible alerts"
        subtitle={
          <>
            Bootstrap 5 <code style={codeStyle}>.alert</code> components — click the × to dismiss.
          </>
        }
      >
        {dismissibleAlerts.map((alert, index) => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            icon={alert.icon}
            title={alert.title}
            dismissible
            className={index === dismissibleAlerts.length - 1 ? 'mb-0' : undefined}
          >
            {alert.text}
          </Alert>
        ))}
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">TOAST NOTIFICATIONS</SectionEyebrow>
      <MCard
        title="Trigger a toast"
        subtitle={
          <>
            Click any button to fire a toast — the API is{' '}
            <code style={codeStyle}>useToast().success(message)</code> et al.
          </>
        }
      >
        <UiAlertsToastDemo />
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">ACCENT-RAIL CARDS</SectionEyebrow>
      <div className="row row-tight">
        {accentRailCards.map(card => (
          <div className="col-md-3" key={card.id}>
            <MCard className={cn('accent-card', card.modifier && `accent-card--${card.modifier}`)}>
              <h3 className="m-card__title" style={{ marginBottom: 6 }}>
                {card.title}
              </h3>
              <p style={mutedText}>{card.text}</p>
            </MCard>
          </div>
        ))}
      </div>

      <Footer />
    </>
  )
}
