import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { DataTable } from './data-table'
import type { DataTableColumn } from './data-table'

interface Customer {
  id: number
  name: string
  plan: string
  amount: number
  status: 'active' | 'trial'
}

const rows: Customer[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${String(i + 1).padStart(2, '0')}`,
  plan: i % 3 === 0 ? 'Enterprise' : i % 3 === 1 ? 'Pro' : 'Starter',
  amount: (12 - i) * 100,
  status: i % 4 === 0 ? 'trial' : 'active',
}))

const columns: DataTableColumn<Customer>[] = [
  { key: 'name', header: 'Customer' },
  { key: 'plan', header: 'Plan' },
  { key: 'amount', header: 'MRR', align: 'end', accessor: r => `$${r.amount}` },
  {
    key: 'status',
    header: 'Status',
    accessor: r => <span className={`status--${r.status}`}>{r.status}</span>,
    sortable: false,
  },
]

const bodyRows = () => Array.from(document.querySelectorAll('tbody tr'))
const firstCell = (tr: Element) => tr.querySelector('td')?.textContent
const info = () => document.querySelector('.dt-pagination__info')?.textContent

describe('DataTable', () => {
  it('renders toolbar, table markup, first page and the info line', () => {
    render(<DataTable columns={columns} rows={rows} rowKey={r => r.id} caption="Customers" />)
    expect(document.querySelector('.dt-toolbar .dt-search input[type=search]')).toBeInTheDocument()
    expect(document.querySelector('.table-responsive > table.dt-table')).toBeInTheDocument()
    expect(document.querySelector('caption')).toHaveClass('visually-hidden')
    expect(bodyRows()).toHaveLength(10)
    expect(info()).toBe('Showing 1–10 of 12')
    // Sortable headers are buttons with aria-sort; non-sortable ones are plain.
    const headers = screen.getAllByRole('columnheader')
    expect(headers[0]).toHaveAttribute('aria-sort', 'none')
    expect(within(headers[0]).getByRole('button', { name: 'Customer' })).toHaveAttribute(
      'type',
      'button'
    )
    expect(headers[2]).toHaveClass('num')
    expect(headers[3]).not.toHaveAttribute('aria-sort')
    expect(within(headers[3]).queryByRole('button')).toBeNull()
    // Accessor output is rendered.
    expect(bodyRows()[0].querySelectorAll('td')[2].textContent).toBe('$1200')
  })

  it('applies initialSort and toggles direction / aria-sort on header click', () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={r => r.id}
        initialSort={{ key: 'amount', direction: 'asc' }}
      />
    )
    const amountHeader = screen.getAllByRole('columnheader')[2]
    expect(amountHeader).toHaveAttribute('aria-sort', 'ascending')
    expect(amountHeader.querySelector('.dt-sort__icon')).toHaveClass('fa-caret-up')
    expect(firstCell(bodyRows()[0])).toBe('Customer 12') // smallest amount

    fireEvent.click(within(amountHeader).getByRole('button'))
    expect(amountHeader).toHaveAttribute('aria-sort', 'descending')
    expect(amountHeader.querySelector('.dt-sort__icon')).toHaveClass('fa-caret-down')
    expect(firstCell(bodyRows()[0])).toBe('Customer 01')

    // Sorting another column resets to ascending and clears the previous one.
    fireEvent.click(screen.getByRole('button', { name: 'Plan' }))
    expect(screen.getAllByRole('columnheader')[1]).toHaveAttribute('aria-sort', 'ascending')
    expect(amountHeader).toHaveAttribute('aria-sort', 'none')
    expect(bodyRows()[0].querySelectorAll('td')[1].textContent).toBe('Enterprise')
  })

  it('filters across columns, resets to page 1 and shows the empty state', () => {
    render(<DataTable columns={columns} rows={rows} rowKey={r => r.id} />)
    fireEvent.click(screen.getByRole('button', { name: 'Page 2' }))
    expect(info()).toBe('Showing 11–12 of 12')

    const search = screen.getByRole('searchbox', { name: 'Search' })
    fireEvent.change(search, { target: { value: 'starter' } })
    expect(bodyRows()).toHaveLength(4)
    expect(info()).toBe('Showing 1–4 of 4')
    bodyRows().forEach(tr => expect(tr.querySelectorAll('td')[1].textContent).toBe('Starter'))

    fireEvent.change(search, { target: { value: 'nothing-matches' } })
    expect(bodyRows()).toHaveLength(0)
    expect(info()).toBe('No results')
    const empty = document.querySelector('.empty-state')
    expect(empty).toBeInTheDocument()
    expect(within(empty as HTMLElement).getByText('No results')).toHaveClass('empty-state__title')

    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(bodyRows()).toHaveLength(10)
    expect(document.querySelector('.empty-state')).toBeNull()
  })

  it('changes the page size and paginates', () => {
    render(<DataTable columns={columns} rows={rows} rowKey={r => r.id} pageSize={5} />)
    expect(bodyRows()).toHaveLength(5)
    expect(info()).toBe('Showing 1–5 of 12')
    expect(screen.getByRole('button', { name: 'Page 3' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(info()).toBe('Showing 6–10 of 12')
    expect(firstCell(bodyRows()[0])).toBe('Customer 06')

    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('5')
    fireEvent.change(select, { target: { value: '25' } })
    expect(bodyRows()).toHaveLength(12)
    expect(info()).toBe('Showing 1–12 of 12')
    expect(screen.queryByRole('button', { name: 'Page 2' })).toBeNull()
  })

  it('supports row selection with a page-level select-all', () => {
    const onSelectionChange = vi.fn()
    render(
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={r => r.id}
        pageSize={5}
        selectable
        onSelectionChange={onSelectionChange}
      />
    )
    const rowBoxes = screen.getAllByRole('checkbox', { name: 'Select row' })
    expect(rowBoxes).toHaveLength(5)
    fireEvent.click(rowBoxes[0])
    expect(onSelectionChange).toHaveBeenLastCalledWith([1], [rows[0]])
    expect(bodyRows()[0]).toHaveClass('is-selected')
    expect(bodyRows()[0]).toHaveAttribute('aria-selected', 'true')

    const all = screen.getByRole('checkbox', { name: 'Select all rows on this page' })
    expect((all as HTMLInputElement).indeterminate).toBe(true)
    fireEvent.click(all)
    expect(onSelectionChange.mock.lastCall?.[0]).toEqual([1, 2, 3, 4, 5])
    expect((all as HTMLInputElement).checked).toBe(true)
    fireEvent.click(all)
    expect(onSelectionChange.mock.lastCall?.[0]).toEqual([])
  })

  it('hides the search box when searchable is false and uses emptyText', () => {
    render(
      <DataTable
        columns={columns}
        rows={[]}
        rowKey={r => r.id}
        searchable={false}
        emptyText="Nothing here"
      />
    )
    expect(screen.queryByRole('searchbox')).toBeNull()
    expect(screen.getByText('Nothing here')).toHaveClass('empty-state__title')
    expect(info()).toBe('No results')
  })
})
