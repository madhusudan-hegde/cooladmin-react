import { Badge, Footer, MButton, MCard, PageHeader, RankList, StatusPill } from '@cooladmin/react'
import { earnings, orders, sales, tableUsers, topCampaigns, topCountries } from '@/lib/tables-data'
import { TablesHeaderActions } from '@/components/tables-header-actions'
import { TablesOrdersCard } from '@/components/tables-orders-card'
import { TablesUsersCard } from '@/components/tables-users-card'

export const metadata = { title: 'Data tables' }

/** CoolAdmin table.html — every table variant: earning, top countries, users, campaigns, orders, sales. */
export default function TablesPage() {
  return (
    <>
      <PageHeader
        title="Tables"
        subtitle="Responsive data tables with horizontal scroll affordances and striped/hover variants."
        actions={<TablesHeaderActions />}
      />

      {/* Earnings + Top countries */}
      <div className="row row-tight">
        <div className="col-lg-8">
          <MCard title="Recent earnings" subtitle="Last 8 orders across all storefronts.">
            <div className="table-responsive">
              <table className="table table-borderless table-striped table-earning">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Order</th>
                    <th scope="col">Name</th>
                    <th scope="col" className="text-end">
                      Price
                    </th>
                    <th scope="col" className="text-end">
                      Qty
                    </th>
                    <th scope="col" className="text-end">
                      Total
                    </th>
                    <th scope="col">Customer</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {earnings.map(row => (
                    <tr key={row.id}>
                      <td>{row.date}</td>
                      <td>{row.order}</td>
                      <td>{row.name}</td>
                      <td className="text-end">{row.price}</td>
                      <td className="text-end">{row.qty}</td>
                      <td className="text-end">{row.total}</td>
                      <td>{row.customer}</td>
                      <td>
                        <Badge variant={row.status.variant} soft>
                          {row.status.label}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MCard>
        </div>
        <div className="col-lg-4">
          <MCard title="Top countries" subtitle="Revenue by region this month.">
            <table className="table-top-countries">
              <tbody>
                {topCountries.map(row => (
                  <tr key={row.country}>
                    <td>{row.country}</td>
                    <td className="text-end">{row.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MCard>
        </div>
      </div>

      {/* User data + Top campaigns */}
      <div className="row row-tight mt-3">
        <div className="col-lg-6">
          <TablesUsersCard users={tableUsers} />
        </div>
        <div className="col-lg-6">
          <MCard
            title="Top campaigns"
            subtitle="Revenue by campaign · last 90 days."
            actions={
              <MButton href="/dashboard/marketing" variant="ghost" size="sm">
                View all
              </MButton>
            }
          >
            <RankList items={topCampaigns} />
          </MCard>
        </div>
      </div>

      {/* Data table with toolbar */}
      <div className="row row-tight mt-3">
        <div className="col-md-12">
          <TablesOrdersCard orders={orders} />
        </div>
      </div>

      {/* Sales table */}
      <div className="row row-tight mt-3">
        <div className="col-md-12">
          <MCard title="Sales by category" subtitle="All sales for the past 30 days.">
            <div className="table-responsive">
              <table className="table table-borderless table-data3">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map(row => (
                    <tr key={row.id}>
                      <td>{row.date}</td>
                      <td>{row.category}</td>
                      <td>{row.description}</td>
                      <td>
                        <StatusPill status={row.status}>{row.statusLabel}</StatusPill>
                      </td>
                      <td>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MCard>
        </div>
      </div>

      <Footer />
    </>
  )
}
