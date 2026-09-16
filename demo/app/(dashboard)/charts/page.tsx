import { Footer, MButton, MCard, PageHeader } from '@madhusudan-hegde/cooladmin-react'
import { showcaseChartCards } from '@/lib/charts-data'
import { ShowcaseChart } from '@/components/showcase-chart'

export const metadata = { title: 'Charts' }

/** CoolAdmin chart.html — nine Chart.js 4 examples in a two-column card grid. */
export default function ChartsPage() {
  return (
    <>
      <PageHeader
        title="Charts"
        subtitle="Chart.js 4.5.1 visualizations: line, bar, doughnut, area, and combination charts."
        actions={
          <MButton variant="ghost" icon="fa-solid fa-download">
            Export
          </MButton>
        }
      />

      <div className="row row-tight">
        {showcaseChartCards.map(card => (
          <div className="col-lg-6" key={card.id}>
            <MCard title={card.title} subtitle={card.subtitle}>
              <ShowcaseChart chart={card.id} ariaLabel={card.ariaLabel} height={280} />
            </MCard>
          </div>
        ))}
      </div>

      <Footer />
    </>
  )
}
