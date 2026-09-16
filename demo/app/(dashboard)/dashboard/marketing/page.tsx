import { DateChip, Footer, MButton, MCard, PageHeader, RankList, StatCard } from '@madhusudan-hegde/cooladmin-react'
import { marketingKpis, topPages, topReferrers, trafficSources } from '@/lib/dashboard-data'
import {
  DashboardRefreshButton,
  DashboardRefreshProvider,
  Refreshable,
} from '@/components/dashboard-refresh'
import { ChartCardSkeleton, StatCardSkeleton } from '@/components/skeletons'
import { TrafficTrendChart } from '@/components/traffic-trend-chart'
import { DonutChart } from '@/components/donut-chart'

export const metadata = { title: 'Marketing analytics' }

/** Dashboard 3 — marketing analytics (CoolAdmin index3.html). */
export default function MarketingDashboardPage() {
  return (
    <DashboardRefreshProvider>
      <PageHeader
        title="Marketing analytics"
        subtitle="Traffic, conversions, and the channels driving them."
        actions={
          <>
            <DateChip aria-label="Date range: last 28 days">Last 28 days</DateChip>
            <DashboardRefreshButton />
            <MButton variant="ghost" icon="fa-solid fa-download">
              Export
            </MButton>
          </>
        }
      />

      {/* KPI strip */}
      <div className="row row-tight dash-row">
        {marketingKpis.map(kpi => (
          <div className="col-sm-6 col-lg-3" key={kpi.id}>
            <Refreshable skeleton={<StatCardSkeleton />}>
              <StatCard
                label={kpi.label}
                value={kpi.value}
                icon={kpi.icon}
                color={kpi.color}
                delta={kpi.delta}
                deltaDirection={kpi.deltaDirection}
                deltaPeriod={kpi.deltaPeriod}
              />
            </Refreshable>
          </div>
        ))}
      </div>

      {/* Traffic trend + sources donut */}
      <div className="row row-tight dash-row">
        <div className="col-lg-8">
          <Refreshable skeleton={<ChartCardSkeleton />}>
            <MCard title="Traffic over time" subtitle="Daily visitors vs. sessions, last 28 days.">
              <TrafficTrendChart />
            </MCard>
          </Refreshable>
        </div>
        <div className="col-lg-4">
          <MCard title="Traffic sources" subtitle="Share of incoming traffic.">
            <DonutChart
              labels={trafficSources.labels}
              data={trafficSources.data}
              colors={trafficSources.colors}
              hoverColors={trafficSources.hoverColors}
              ariaLabel="Doughnut chart of traffic sources: organic search 42%, direct 26%, social 14%, referral 10%, email 8%"
            />
          </MCard>
        </div>
      </div>

      {/* Top pages + top referrers */}
      <div className="row row-tight dash-row">
        <div className="col-lg-6">
          <MCard
            title="Top pages"
            subtitle="Most-visited URLs in the last 28 days."
            actions={
              <MButton href="/tables/data" variant="ghost" size="sm">
                View all
              </MButton>
            }
          >
            <RankList items={topPages} />
          </MCard>
        </div>
        <div className="col-lg-6">
          <MCard
            title="Top referrers"
            subtitle="External sites driving traffic."
            actions={
              <MButton href="/tables/data" variant="ghost" size="sm">
                View all
              </MButton>
            }
          >
            <RankList items={topReferrers} />
          </MCard>
        </div>
      </div>

      <Footer />
    </DashboardRefreshProvider>
  )
}
