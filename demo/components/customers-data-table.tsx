'use client'

import { Avatar, DataTable, IconButton, StatusPill, useToast } from '@madhusudan-hegde/cooladmin-react'
import type { DataTableColumn } from '@madhusudan-hegde/cooladmin-react'
import { customerStatus, formatMrr, formatSignupDate } from '@/lib/data-table-data'
import type { Customer } from '@/lib/data-table-data'

export interface CustomersDataTableProps {
  customers: Customer[]
}

/**
 * The /tables/data customer table — CoolAdmin's vanilla `data-table.scripts.html`
 * rendered through the library `DataTable` (search, sort, page size, pagination).
 */
export function CustomersDataTable({ customers }: CustomersDataTableProps) {
  const toast = useToast()

  const columns: DataTableColumn<Customer>[] = [
    {
      key: 'name',
      header: 'Customer',
      accessor: row => (
        <span className="row-product">
          <Avatar alt={row.name} size="sm" />
          <strong>{row.name}</strong>
        </span>
      ),
      sortValue: row => row.name,
    },
    {
      key: 'email',
      header: 'Email',
      accessor: row => <a href={`mailto:${row.email}`}>{row.email}</a>,
      sortValue: row => row.email,
    },
    { key: 'plan', header: 'Plan' },
    {
      key: 'amount',
      header: 'MRR',
      align: 'end',
      accessor: row => formatMrr(row.amount),
      sortValue: row => row.amount,
    },
    {
      key: 'status',
      header: 'Status',
      accessor: row => (
        <StatusPill status={customerStatus[row.status].status}>
          {customerStatus[row.status].label}
        </StatusPill>
      ),
      sortValue: row => customerStatus[row.status].label,
    },
    {
      key: 'signup',
      header: 'Signed up',
      accessor: row => formatSignupDate(row.signup),
      sortValue: row => row.signup,
    },
    {
      key: 'actions',
      header: <span className="visually-hidden">Actions</span>,
      sortable: false,
      align: 'end',
      accessor: row => (
        <>
          <IconButton
            icon="fa-solid fa-pen-to-square"
            label={`Edit ${row.name}`}
            onClick={() => toast.info('Edit customer', row.name)}
          />
          <IconButton
            icon="fa-regular fa-trash-can"
            label={`Delete ${row.name}`}
            style={{ color: 'var(--m-danger)' }}
            onClick={() => toast.warning('Delete customer', `${row.name} was not deleted (demo).`)}
          />
        </>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      rows={customers}
      rowKey={row => row.id}
      pageSize={10}
      pageSizeOptions={[5, 10, 20, 50]}
      initialSort={{ key: 'name', direction: 'asc' }}
      searchPlaceholder="Search any column…"
      caption="Customers: name, email, plan, MRR, status and sign-up date"
    />
  )
}
