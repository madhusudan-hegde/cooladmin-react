import type { CSSProperties } from 'react'
import { Footer, MCard, PageHeader, RankList, SectionEyebrow } from '@cooladmin/react'
import { bootstrapBars, campaignRanking, circularRings, quotaBars } from '@/lib/progress-data'
import { AnimatedProgress } from '@/components/animated-progress'

export const metadata = { title: 'Progress bars' }

/** CoolAdmin progress-bar.html — Bootstrap bars, quota bars, ranked list, SVG rings. */
export default function ProgressBarsPage() {
  return (
    <>
      <PageHeader
        title="Progress bars"
        subtitle="Animated progress bars with multiple styles and IntersectionObserver-driven reveal."
      />

      <SectionEyebrow className="mb-2">DEFAULT PROGRESS BARS</SectionEyebrow>
      <MCard title="Bootstrap progress with brand colors">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bootstrapBars.map(bar => (
            <AnimatedProgress key={bar.value} value={bar.value} tone={bar.tone} />
          ))}
        </div>
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">LABELED PROGRESS</SectionEyebrow>
      <MCard
        title="Used in usage / quota displays"
        subtitle="Same pattern from the billing tab in profile."
      >
        {quotaBars.map(bar => (
          <div className="au-progress" key={bar.title}>
            <span className="au-progress__title">{bar.title}</span>
            <div
              className="au-progress__bar"
              role="progressbar"
              aria-valuenow={bar.value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={bar.title}
            >
              <div className="au-progress__inner" style={{ width: `${bar.value}%` }} />
            </div>
          </div>
        ))}
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">RANK LIST WITH BARS</SectionEyebrow>
      <MCard
        title="Top-N rankings"
        subtitle="Each row carries an inline progress bar showing relative scale."
      >
        <RankList items={campaignRanking} />
      </MCard>

      <SectionEyebrow className="mt-4 mb-2">CIRCULAR PROGRESS</SectionEyebrow>
      <MCard title="SVG circular progress rings" subtitle="Pure CSS / SVG, no library required.">
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
          {circularRings.map(ring => (
            <div
              className="circular-progress"
              key={ring.label}
              style={{ '--pct': ring.pct, '--color': `var(--m-${ring.color})` } as CSSProperties}
              role="img"
              aria-label={`${ring.label}: ${ring.pct}%`}
            >
              <svg viewBox="0 0 36 36" aria-hidden="true">
                <circle cx="18" cy="18" r="15.9155" className="bg" />
                <circle cx="18" cy="18" r="15.9155" className="fg" />
              </svg>
              <div className="circular-progress__label">
                <strong>{ring.pct}%</strong>
                <span>{ring.label}</span>
              </div>
            </div>
          ))}
        </div>
      </MCard>

      <Footer />
    </>
  )
}
