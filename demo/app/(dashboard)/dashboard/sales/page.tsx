import {
  DateChip,
  Footer,
  MButton,
  MCard,
  PageHeader,
  RankList,
  StatCard,
  StatusPill,
} from '@madhusudan-hegde/cooladmin-react'
import {
  dealSources,
  dealSourcesDonut,
  recentDeals,
  salesKpis,
  topSalesReps,
} from '@/lib/dashboard-data'
import {
  DashboardRefreshButton,
  DashboardRefreshProvider,
  Refreshable,
} from '@/components/dashboard-refresh'
import { ChartCardSkeleton, StatCardSkeleton } from '@/components/skeletons'
import { PipelineFunnelChart } from '@/components/pipeline-funnel-chart'
import { DonutChart } from '@/components/donut-chart'

export const metadata = { title: 'Sales pipeline' }

/** Dashboard 2 — sales pipeline (CoolAdmin index2.html). */
export default function SalesDashboardPage() {
  return (
    <DashboardRefreshProvider>
      <PageHeader
        title="Sales pipeline"
        subtitle="Active deals across stages, top performers, and where the pipeline is coming from."
        actions={
          <>
            <DateChip aria-label="Date range: this quarter">This quarter</DateChip>
            <DashboardRefreshButton />
            <MButton variant="primary" icon="fa-solid fa-plus">
              New deal
            </MButton>
          </>
        }
      />

      {/* KPI strip */}
      <div className="row row-tight dash-row">
        {salesKpis.map(kpi => (
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

      {/* Funnel + top reps */}
      <div className="row row-tight dash-row">
        <div className="col-lg-8">
          <Refreshable skeleton={<ChartCardSkeleton />}>
            <MCard title="Pipeline by stage" subtitle="Active deal volume from lead to close.">
              <PipelineFunnelChart />
            </MCard>
          </Refreshable>
        </div>
        <div className="col-lg-4">
          <MCard title="Top sales reps" subtitle="Closed-won revenue this quarter.">
            <RankList items={topSalesReps} />
          </MCard>
        </div>
      </div>

      {/* Recent deals + deal sources */}
      <div className="row row-tight dash-row">
        <div className="col-lg-8">
          <MCard
            title="Recent deals"
            subtitle="Updated within the past 7 days."
            actions={
              <MButton href="/tables/data" variant="ghost" size="sm">
                View all
              </MButton>
            }
          >
            <div className="table-responsive">
              <table className="m-table">
                <thead>
                  <tr>
                    <th scope="col">Company</th>
                    <th scope="col">Stage</th>
                    <th scope="col">Owner</th>
                    <th scope="col" className="num">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentDeals.map(deal => (
                    <tr key={deal.id}>
                      <td>
                        <span className="row-product">
                          <span className="row-product__icon" style={deal.iconStyle}>
                            <i className={deal.icon} aria-hidden="true" />
                          </span>
                          {deal.company}
                        </span>
                      </td>
                      <td>
                        {deal.stage.kind === 'pill' ? (
                          <StatusPill status={deal.stage.status}>{deal.stage.label}</StatusPill>
                        ) : (
                          <span className={`badge bg-${deal.stage.tone}`}>{deal.stage.label}</span>
                        )}
                      </td>
                      <td>{deal.owner}</td>
                      <td className="num">{deal.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MCard>
        </div>
        <div className="col-lg-4">
          <MCard title="Deal sources" subtitle="Where new pipeline came from.">
            <DonutChart
              labels={dealSourcesDonut.labels}
              data={dealSourcesDonut.data}
              colors={dealSourcesDonut.colors}
              hoverColors={dealSourcesDonut.hoverColors}
              height={220}
              ariaLabel="Doughnut chart of deal sources: inbound website 42%, outbound SDR 24%, referral 16%, partner 10%, events 8%"
            />
            <RankList items={dealSources} />
          </MCard>
        </div>
      </div>

      <Footer />
    </DashboardRefreshProvider>
  )
}
