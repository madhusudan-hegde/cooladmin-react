import {
  ActivityList,
  DateChip,
  Footer,
  MButton,
  MCard,
  PageHeader,
  StatCard,
  StatusPill,
} from '@cooladmin/react'
import { overviewActivity, overviewKpis, overviewTasks, topProducts } from '@/lib/dashboard-data'
import { emphasize } from '@/components/emphasize'
import {
  DashboardRefreshButton,
  DashboardRefreshProvider,
  Refreshable,
} from '@/components/dashboard-refresh'
import { ChartCardSkeleton, StatCardSkeleton } from '@/components/skeletons'
import { RevenueTrendCard } from '@/components/revenue-trend-card'
import { DashboardTasksCard } from '@/components/dashboard-tasks-card'

export const metadata = { title: 'Dashboard' }

/** Dashboard 1 — overview (CoolAdmin index.html). */
export default function DashboardPage() {
  return (
    <DashboardRefreshProvider>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back — here’s what’s happening across your business today."
        actions={
          <>
            <DateChip aria-label="Date range: last 30 days">Last 30 days</DateChip>
            <DashboardRefreshButton />
            <MButton variant="ghost" icon="fa-solid fa-download">
              Export
            </MButton>
            <MButton variant="primary" icon="fa-solid fa-plus">
              New project
            </MButton>
          </>
        }
      />

      {/* KPI strip */}
      <div className="row row-tight dash-row">
        {overviewKpis.map(kpi => (
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
                sparkline={kpi.sparkline}
              />
            </Refreshable>
          </div>
        ))}
      </div>

      {/* Primary chart + activity feed */}
      <div className="row row-tight dash-row">
        <div className="col-lg-8">
          <Refreshable skeleton={<ChartCardSkeleton />}>
            <RevenueTrendCard />
          </Refreshable>
        </div>
        <div className="col-lg-4">
          <MCard
            title="Recent activity"
            subtitle="Latest team updates."
            actions={
              <MButton href="/notifications" variant="ghost" size="sm">
                View all
              </MButton>
            }
          >
            <ActivityList
              items={overviewActivity.map(a => ({
                id: a.id,
                avatarSrc: a.avatarSrc,
                text: emphasize(a.text),
                time: a.time,
              }))}
            />
          </MCard>
        </div>
      </div>

      {/* Tasks + top products */}
      <div className="row row-tight dash-row">
        <div className="col-lg-6">
          <DashboardTasksCard tasks={overviewTasks} completedThisWeek={12} />
        </div>
        <div className="col-lg-6">
          <MCard
            title="Top products"
            subtitle="Best sellers in the last 30 days."
            actions={
              <MButton href="/tables" variant="ghost" size="sm">
                All products
              </MButton>
            }
          >
            <div className="table-responsive">
              <table className="m-table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="num">
                      Units
                    </th>
                    <th scope="col" className="num">
                      Revenue
                    </th>
                    <th scope="col" className="num">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map(p => {
                    const up = p.trend >= 0
                    return (
                      <tr key={p.id}>
                        <td>
                          <span className="row-product">
                            <span className="row-product__icon" style={p.iconStyle}>
                              <i className={p.icon} aria-hidden="true" />
                            </span>
                            {p.name}
                          </span>
                        </td>
                        <td>
                          <StatusPill status={p.status}>{p.statusLabel}</StatusPill>
                        </td>
                        <td className="num">{p.units}</td>
                        <td className="num">{p.revenue}</td>
                        <td className="num">
                          <span className={`trend-mini trend-mini--${up ? 'up' : 'down'}`}>
                            <i
                              className={`fa-solid fa-arrow-${up ? 'up' : 'down'}`}
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">{up ? 'Up' : 'Down'} </span>
                            {Math.abs(p.trend)}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </MCard>
        </div>
      </div>

      <Footer />
    </DashboardRefreshProvider>
  )
}
