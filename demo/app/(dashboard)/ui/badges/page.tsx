import type { CSSProperties } from 'react'
import {
  Badge,
  Footer,
  MCard,
  PageHeader,
  PriorityChip,
  SectionEyebrow,
  StatusPill,
} from '@madhusudan-hegde/cooladmin-react'
import {
  apiKeys,
  bootstrapBadges,
  emailLabels,
  presenceAvatars,
  priorityChips,
  roleBadges,
  statusPills,
} from '@/lib/ui-badges-data'

export const metadata = { title: 'Badges' }

const chipRow: CSSProperties = { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }
const codeStyle: CSSProperties = {
  background: 'var(--m-surface-2)',
  padding: '1px 6px',
  borderRadius: 4,
  fontSize: 12,
}
const iconTile: CSSProperties = {
  position: 'relative',
  width: 38,
  height: 38,
  borderRadius: 8,
  background: 'var(--m-surface-2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--m-text-muted)',
}
const counterBadge: CSSProperties = {
  position: 'absolute',
  top: -4,
  right: -4,
  background: 'var(--m-danger)',
  color: 'var(--m-on-accent)',
  fontSize: 10.5,
  fontWeight: 600,
  padding: '1px 6px',
  borderRadius: 999,
  lineHeight: 1.4,
}
const notificationDot: CSSProperties = {
  position: 'absolute',
  top: 8,
  right: 8,
  background: 'var(--m-danger)',
  width: 8,
  height: 8,
  borderRadius: '50%',
}
const presenceImg: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  objectFit: 'cover',
  display: 'block',
}
const presenceDot = (color: string): CSSProperties => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 10,
  height: 10,
  borderRadius: '50%',
  background: color,
  border: '2px solid var(--m-surface)',
})

/** CoolAdmin badge.html — status pills, priority chips, role badges, category labels, Bootstrap badges, notification dots. */
export default function BadgesPage() {
  return (
    <>
      <PageHeader
        title="Badges"
        subtitle="Bootstrap 5 badge styles, sizes, and colour variations."
      />

      <SectionEyebrow className="mb-2">STATUS PILLS</SectionEyebrow>
      <MCard
        title="Status indicators"
        subtitle="Soft-tinted pill badges for state. Use them anywhere status needs to be communicated."
      >
        <div style={chipRow}>
          {statusPills.map(pill => (
            <StatusPill key={pill.label} status={pill.status}>
              {pill.label}
            </StatusPill>
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">PRIORITY CHIPS</SectionEyebrow>
      <MCard>
        <div style={chipRow}>
          {priorityChips.map(chip => (
            <PriorityChip key={chip.level} level={chip.level}>
              {chip.label}
            </PriorityChip>
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">ROLE BADGES</SectionEyebrow>
      <MCard>
        <div style={chipRow}>
          {roleBadges.map(badge => (
            <span key={badge.role} className={`role ${badge.role}`}>
              {badge.label}
            </span>
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">EMAIL CATEGORY LABELS</SectionEyebrow>
      <MCard
        title="Inline content tags"
        subtitle="Used in the inbox to categorize emails — work, personal, social, promotional, alerts."
      >
        <div style={{ ...chipRow, gap: 6 }}>
          {emailLabels.map(label => (
            <span
              key={label.modifier}
              className={`email-item__label email-item__label--${label.modifier}`}
            >
              {label.label}
            </span>
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">BOOTSTRAP BADGES</SectionEyebrow>
      <MCard
        title="Bootstrap-class badges"
        subtitle={
          <>
            Bootstrap’s <code style={codeStyle}>.badge.bg-*</code> classes restyled to use the brand
            palette.
          </>
        }
      >
        <div style={chipRow}>
          {bootstrapBadges.map(badge => (
            <Badge key={badge.variant} variant={badge.variant} soft>
              {badge.label}
            </Badge>
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">COUNTER &amp; NOTIFICATION DOTS</SectionEyebrow>
      <MCard
        title="Numeric & presence indicators"
        subtitle="Notification badges and online-status dots used across the topbar and team listings."
      >
        <div style={{ ...chipRow, gap: 24 }}>
          <div style={iconTile}>
            <i className="fa-regular fa-bell" aria-hidden="true" />
            <span style={counterBadge} aria-label="12 unread notifications">
              12
            </span>
          </div>
          <div style={iconTile}>
            <i className="fa-regular fa-envelope" aria-hidden="true" />
            <span style={notificationDot} role="img" aria-label="Unread messages" />
          </div>
          {presenceAvatars.map(av => (
            <div style={{ position: 'relative' }} key={av.id}>
              <img src={av.src} alt={av.alt} style={presenceImg} />
              <span style={presenceDot(av.dotColor)} role="img" aria-label={av.presence} />
            </div>
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">BADGES IN CONTEXT</SectionEyebrow>
      <MCard>
        <ul className="card-list" style={{ margin: '0 -20px' }}>
          {apiKeys.map(key => (
            <li key={key.id}>
              <div className="card-list__main">
                <span className="card-list__icon" style={key.iconStyle}>
                  <i className="fa-solid fa-key" aria-hidden="true" />
                </span>
                <div>
                  <span className="card-list__title">{key.title}</span>
                  <span className="card-list__sub">{key.sub}</span>
                </div>
              </div>
              <StatusPill status={key.status}>{key.statusLabel}</StatusPill>
            </li>
          ))}
        </ul>
      </MCard>

      <Footer />
    </>
  )
}
