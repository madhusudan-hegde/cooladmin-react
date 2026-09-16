import { Footer, MCard, PageHeader } from '@cooladmin/react'
import { customers } from '@/lib/data-table-data'
import { CustomersDataTable } from '@/components/customers-data-table'
import { TablesHeaderActions } from '@/components/tables-header-actions'

export const metadata = { title: 'Data table' }

/** CoolAdmin data-table.html — sortable, searchable, paginated customer table. */
export default function DataTablePage() {
  return (
    <>
      <PageHeader
        title="Data table"
        subtitle="Working data table with sort, search, and pagination, powered by the DataTable component."
        actions={<TablesHeaderActions />}
      />

      <MCard>
        <CustomersDataTable customers={customers} />
      </MCard>

      <Footer />
    </>
  )
}
