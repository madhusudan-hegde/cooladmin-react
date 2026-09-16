import type { CSSProperties } from 'react'
import {
  Footer,
  MButton,
  MCard,
  PageHeader,
  SectionEyebrow,
  Sparkline,
  StatCard,
  cn,
} from '@cooladmin/react'
import {
  accentRailCards,
  cardKpis,
  coverCards,
  noticeCards,
  previewCards,
  pricingTiers,
  profileSocials,
  profileStats,
  recentUploads,
} from '@/lib/cards-data'
import { avatar } from '@/lib/dashboard-data'

export const metadata = { title: 'Cards' }

const compactBtn: CSSProperties = { height: 30, padding: '0 12px', fontSize: 12.5 }
const tinyBtn: CSSProperties = { height: 28, padding: '0 10px', fontSize: 12 }
const mutedText: CSSProperties = {
  margin: 0,
  fontSize: 13,
  color: 'var(--m-text-muted)',
  lineHeight: 1.5,
}

/** CoolAdmin card.html — profile, KPI, cover, pricing, notice, list, preview and accent-rail cards. */
export default function CardsPage() {
  return (
    <>
      <PageHeader
        title="Cards"
        subtitle="Bootstrap 5 card layouts: image, header, footer, and grid card variations."
      />

      {/* ROW 1: KPI / stat cards */}
      <SectionEyebrow className="mb-2">KPI &amp; STAT CARDS</SectionEyebrow>
      <div className="row row-tight">
        {cardKpis.map(kpi => (
          <div className="col-sm-6 col-lg-3" key={kpi.id}>
            <StatCard
              label={kpi.label}
              value={kpi.value}
              icon={kpi.icon}
              color={kpi.color}
              delta={kpi.delta}
              deltaDirection={kpi.deltaDirection}
              deltaPeriod={kpi.deltaPeriod}
            />
          </div>
        ))}
      </div>

      {/* ROW 2: Profile / team cards */}
      <SectionEyebrow className="mt-4 mb-2">PROFILE CARDS</SectionEyebrow>
      <div className="row row-tight">
        <div className="col-md-6 col-lg-4">
          <MCard className="profile-card">
            <div className="profile-card__avatar">
              <img src={avatar(1)} alt="John Doe" />
            </div>
            <h2 className="profile-card__name">John Doe</h2>
            <p className="profile-card__role">Engineering lead · San Francisco</p>
            <div className="profile-card__stats">
              {profileStats.map(s => (
                <div className="profile-card__stat" key={s.label}>
                  <p className="profile-card__stat-value">{s.value}</p>
                  <p className="profile-card__stat-label">{s.label}</p>
                </div>
              ))}
            </div>
            <hr className="profile-card__divider" />
            <div className="profile-card__socials">
              {profileSocials.map(s => (
                <a href="#" aria-label={s.label} key={s.label}>
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </MCard>
        </div>
        <div className="col-md-6 col-lg-4">
          <MCard className="profile-card">
            <div className="profile-card__avatar">
              <img src={avatar(4)} alt="Diane Myers" />
            </div>
            <h2 className="profile-card__name">Diane Myers</h2>
            <p className="profile-card__role">Senior engineer · Berlin</p>
            <p style={{ ...mutedText, margin: '12px 0 0' }}>
              Backend, distributed systems, and a soft spot for typed languages. Currently leading
              the auth-flow refactor.
            </p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
              <MButton variant="primary" icon="fa-regular fa-envelope">
                Message
              </MButton>
              <MButton variant="ghost" icon="fa-solid fa-user-plus">
                Follow
              </MButton>
            </div>
          </MCard>
        </div>
        <div className="col-md-6 col-lg-4">
          <MCard className="profile-card profile-card--accent">
            <div className="profile-card__avatar">
              <img src={avatar(6)} alt="Michelle Moreno" />
            </div>
            <h2 className="profile-card__name">Michelle Moreno</h2>
            <p className="profile-card__role">Product designer · New York</p>
            <hr className="profile-card__divider" />
            <p style={{ fontSize: 13, margin: 0, lineHeight: 1.5 }}>
              “Design isn’t how it looks — it’s how it works. And then how it looks.”
            </p>
            <div style={{ marginTop: 18 }}>
              <MButton variant="ghost" className="profile-card__cta">
                View profile
              </MButton>
            </div>
          </MCard>
        </div>
      </div>

      {/* ROW 3: Content / cover image cards */}
      <SectionEyebrow className="mt-4 mb-2">CONTENT CARDS</SectionEyebrow>
      <div className="row row-tight">
        {coverCards.map(card => (
          <div className="col-md-6 col-lg-4" key={card.id}>
            <MCard as="article" className="cover-card">
              <img className="cover-card__image" src={card.image} alt="" />
              <div className="cover-card__body">
                <span
                  className="cover-card__tag"
                  style={
                    card.tagColor
                      ? {
                          background: `var(--m-${card.tagColor}-soft)`,
                          color: `var(--m-${card.tagColor})`,
                        }
                      : undefined
                  }
                >
                  {card.tag}
                </span>
                <h3 className="cover-card__title">{card.title}</h3>
                <p className="cover-card__text">{card.text}</p>
                <div className="cover-card__footer">
                  <span className="cover-card__author">
                    <img src={card.authorAvatar} alt="" />
                    {card.authorLine}
                  </span>
                  <MButton href="#" variant="ghost" style={compactBtn}>
                    Read
                  </MButton>
                </div>
              </div>
            </MCard>
          </div>
        ))}
      </div>

      {/* ROW 4: Pricing cards */}
      <SectionEyebrow className="mt-4 mb-2">PRICING CARDS</SectionEyebrow>
      <div className="row row-tight">
        {pricingTiers.map(tier => (
          <div className="col-md-4" key={tier.id}>
            <MCard className={cn('pricing-card', tier.featured && 'pricing-card--featured')}>
              {tier.featured && <span className="pricing-card__badge">Most popular</span>}
              <p className="pricing-card__tier">{tier.tier}</p>
              <p className="pricing-card__price">
                {tier.price}
                {tier.per && <small>{tier.per}</small>}
              </p>
              <p className="pricing-card__period">{tier.period}</p>
              <ul className="pricing-card__features">
                {tier.features.map(f => (
                  <li key={f}>
                    <i className="fa-solid fa-check" aria-hidden="true" /> {f}
                  </li>
                ))}
              </ul>
              <MButton variant={tier.featured ? 'primary' : 'ghost'} style={{ width: '100%' }}>
                {tier.cta}
              </MButton>
            </MCard>
          </div>
        ))}
      </div>

      {/* ROW 5: Notification / status cards */}
      <SectionEyebrow className="mt-4 mb-2">NOTIFICATION CARDS</SectionEyebrow>
      <div className="row row-tight">
        {noticeCards.map(n => (
          <div className="col-md-6" key={n.id}>
            <MCard className={`notice-card notice-card--${n.tone}`}>
              <span className="notice-card__icon">
                <i className={n.icon} aria-hidden="true" />
              </span>
              <div className="notice-card__body">
                <h3 className="notice-card__title">{n.title}</h3>
                <p className="notice-card__text">{n.text}</p>
                {n.actions && (
                  <div className="notice-card__actions">
                    {n.actions.map(a => (
                      <MButton key={a.label} variant={a.variant} style={tinyBtn}>
                        {a.label}
                      </MButton>
                    ))}
                  </div>
                )}
              </div>
            </MCard>
          </div>
        ))}
      </div>

      {/* ROW 6: List + chart preview cards */}
      <SectionEyebrow className="mt-4 mb-2">LIST &amp; PREVIEW CARDS</SectionEyebrow>
      <div className="row row-tight">
        <div className="col-lg-6">
          <MCard
            className="m-card--flush"
            title="Recent uploads"
            subtitle="Files added to your workspace this week."
            actions={
              <MButton href="#" variant="ghost" style={{ ...compactBtn, padding: '0 10px' }}>
                All files
              </MButton>
            }
          >
            <ul className="card-list">
              {recentUploads.map(item => (
                <li key={item.id}>
                  <div className="card-list__main">
                    <span
                      className="card-list__icon"
                      style={
                        item.color
                          ? {
                              background: `var(--m-${item.color}-soft)`,
                              color: `var(--m-${item.color})`,
                            }
                          : undefined
                      }
                    >
                      <i className={item.icon} aria-hidden="true" />
                    </span>
                    <div>
                      <span className="card-list__title">{item.title}</span>
                      <span className="card-list__sub">{item.sub}</span>
                    </div>
                  </div>
                  <span className="card-list__meta">{item.meta}</span>
                </li>
              ))}
            </ul>
          </MCard>
        </div>
        <div className="col-lg-6">
          <div className="row row-tight">
            {previewCards.map(card => (
              <div className="col-md-6" key={card.id}>
                <MCard as="article" className="preview-card">
                  <div className="preview-card__head">
                    <p className="preview-card__label">{card.label}</p>
                    <span className={`stat-card__icon stat-card__icon--${card.color}`}>
                      <i className={card.icon} aria-hidden="true" />
                    </span>
                  </div>
                  <p className="preview-card__value">
                    {card.value}
                    {card.unit && (
                      <small
                        style={{ fontSize: 14, color: 'var(--m-text-muted)', fontWeight: 500 }}
                      >
                        {card.unit}
                      </small>
                    )}
                  </p>
                  <div className="preview-card__chart">
                    <Sparkline
                      data={card.sparkline}
                      color={`var(--m-${card.color})`}
                      height={64}
                      ariaLabel={card.ariaLabel}
                    />
                  </div>
                </MCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 7: Accent rail cards */}
      <SectionEyebrow className="mt-4 mb-2">ACCENT RAIL CARDS</SectionEyebrow>
      <div className="row row-tight">
        {accentRailCards.map(card => (
          <div className="col-md-6 col-lg-3" key={card.id}>
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
