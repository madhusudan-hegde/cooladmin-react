'use client'

import { useId, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'
import { Checkbox } from '../form/checkbox'
import { MButton } from '../form/m-button'
import { EmptyState } from './empty-state'
import { Pagination } from './pagination'

export interface DataTableSort {
  key: string
  direction: 'asc' | 'desc'
}

export interface DataTableColumn<T> {
  /** Unique column key; also used as `row[key]` when no `accessor`/`sortValue` is given. */
  key: string
  header: ReactNode
  /** Cell renderer (default: `String(row[key])`). */
  accessor?: (row: T) => ReactNode
  /** Value used for sorting and searching (default: `row[key]` when it is a primitive). */
  sortValue?: (row: T) => string | number
  /** Default true. */
  sortable?: boolean
  align?: 'start' | 'center' | 'end'
  /** `width` style on the header cell (e.g. `120` or `'20%'`). */
  width?: number | string
  /** Extra class on both `th` and `td`. */
  className?: string
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey: (row: T) => string | number
  /** Initial rows per page (default 10). */
  pageSize?: number
  /** Options for the "Show N rows" select (default `[5, 10, 25, 50]`). */
  pageSizeOptions?: number[]
  /** Renders the search box (default true). */
  searchable?: boolean
  searchPlaceholder?: string
  initialSort?: DataTableSort
  /** Adds a leading checkbox column. */
  selectable?: boolean
  onSelectionChange?: (selectedKeys: Array<string | number>, selectedRows: T[]) => void
  /** Empty-state title when nothing matches (default "No results"). */
  emptyText?: ReactNode
  /** Visually-hidden table caption for screen readers. */
  caption?: ReactNode
  className?: string
}

type Primitive = string | number | boolean | bigint

function isPrimitive(value: unknown): value is Primitive {
  const t = typeof value
  return t === 'string' || t === 'number' || t === 'boolean' || t === 'bigint'
}

/** Sort/search value for a cell: `sortValue`, else a primitive `row[key]`, else a primitive accessor result. */
function cellValue<T>(row: T, col: DataTableColumn<T>): string | number | undefined {
  if (col.sortValue) return col.sortValue(row)
  const raw = (row as Record<string, unknown>)[col.key]
  if (isPrimitive(raw)) return typeof raw === 'number' ? raw : String(raw)
  if (raw == null && col.accessor) {
    const rendered = col.accessor(row)
    if (typeof rendered === 'string' || typeof rendered === 'number') return rendered
  }
  return undefined
}

function compareValues(a: string | number | undefined, b: string | number | undefined) {
  if (a === undefined && b === undefined) return 0
  if (a === undefined) return 1
  if (b === undefined) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

function alignClass(align: DataTableColumn<unknown>['align']) {
  if (align === 'end') return 'num'
  if (align === 'center') return 'text-center'
  return undefined
}

/**
 * CoolAdmin's vanilla data table (`/tables/data`) as a controlled React widget:
 * search across columns, click-to-sort headers with `aria-sort`, page size,
 * "Showing x–y of z" info + `Pagination`, optional row selection and an
 * `EmptyState` when nothing matches.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  searchable = true,
  searchPlaceholder = 'Search any column…',
  initialSort,
  selectable = false,
  onSelectionChange,
  emptyText = 'No results',
  caption,
  className,
}: DataTableProps<T>) {
  const baseId = useId()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<DataTableSort | undefined>(initialSort)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string | number>>(() => new Set())

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter(row =>
      columns.some(col => {
        const v = cellValue(row, col)
        return v !== undefined && String(v).toLowerCase().includes(q)
      })
    )
  }, [rows, columns, query])

  const sorted = useMemo(() => {
    if (!sort) return filtered
    const col = columns.find(c => c.key === sort.key)
    if (!col) return filtered
    const dir = sort.direction === 'asc' ? 1 : -1
    return filtered
      .map((row, index) => ({ row, index, value: cellValue(row, col) }))
      .sort((a, b) => compareValues(a.value, b.value) * dir || a.index - b.index)
      .map(entry => entry.row)
  }, [filtered, columns, sort])

  const total = sorted.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * pageSize
  const pageRows = sorted.slice(start, start + pageSize)

  const toggleSort = (key: string) => {
    setSort(prev =>
      prev?.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    )
  }

  const updateSelection = (next: Set<string | number>) => {
    setSelected(next)
    onSelectionChange?.(
      Array.from(next),
      rows.filter(row => next.has(rowKey(row)))
    )
  }
  const pageKeys = pageRows.map(rowKey)
  const allPageSelected = pageKeys.length > 0 && pageKeys.every(k => selected.has(k))
  const somePageSelected = pageKeys.some(k => selected.has(k))
  const toggleAll = () => {
    const next = new Set(selected)
    if (allPageSelected) pageKeys.forEach(k => next.delete(k))
    else pageKeys.forEach(k => next.add(k))
    updateSelection(next)
  }
  const toggleRow = (key: string | number) => {
    const next = new Set(selected)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    updateSelection(next)
  }

  const searchId = `${baseId}-search`
  const sizeId = `${baseId}-size`
  const infoText =
    total === 0 ? 'No results' : `Showing ${start + 1}–${start + pageRows.length} of ${total}`

  return (
    <div className={cn('data-table', className)}>
      <div className="dt-toolbar">
        {searchable ? (
          <div className="dt-search">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            <input
              type="search"
              id={searchId}
              placeholder={searchPlaceholder}
              aria-label="Search"
              value={query}
              onChange={e => {
                setQuery(e.target.value)
                setPage(1)
              }}
            />
          </div>
        ) : (
          <span />
        )}
        <label className="dt-page-size" htmlFor={sizeId}>
          Show
          <select
            id={sizeId}
            className="form-select"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
              setPage(1)
            }}
          >
            {pageSizeOptions.map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          rows
        </label>
      </div>

      <div className="table-responsive">
        <table className="m-table dt-table">
          {caption && <caption className="visually-hidden">{caption}</caption>}
          <thead>
            <tr>
              {selectable && (
                <th scope="col" className="dt-select">
                  {/* Same markup as `Checkbox`, inlined to set `indeterminate` via ref. */}
                  <label className="au-checkbox">
                    <input
                      type="checkbox"
                      aria-label="Select all rows on this page"
                      checked={allPageSelected}
                      ref={el => {
                        if (el) el.indeterminate = !allPageSelected && somePageSelected
                      }}
                      onChange={toggleAll}
                      disabled={pageKeys.length === 0}
                    />
                    <span className="au-checkmark" aria-hidden="true" />
                  </label>
                </th>
              )}
              {columns.map(col => {
                const sortable = col.sortable !== false
                const active = sort?.key === col.key
                const ariaSort = !sortable
                  ? undefined
                  : active
                  ? sort.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={ariaSort}
                    className={cn(alignClass(col.align), col.className)}
                    style={col.width !== undefined ? { width: col.width } : undefined}
                  >
                    {sortable ? (
                      <button type="button" className="dt-sort" onClick={() => toggleSort(col.key)}>
                        {col.header}
                        <i
                          className={cn(
                            'dt-sort__icon fa-solid',
                            !active && 'fa-sort',
                            active && sort.direction === 'asc' && 'fa-caret-up',
                            active && sort.direction === 'desc' && 'fa-caret-down'
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {pageRows.map(row => {
              const key = rowKey(row)
              const isSelected = selected.has(key)
              return (
                <tr
                  key={key}
                  className={cn(isSelected && 'is-selected')}
                  aria-selected={selectable ? isSelected : undefined}
                >
                  {selectable && (
                    <td className="dt-select">
                      <Checkbox
                        aria-label="Select row"
                        checked={isSelected}
                        onChange={() => toggleRow(key)}
                      />
                    </td>
                  )}
                  {columns.map(col => {
                    const raw = (row as Record<string, unknown>)[col.key]
                    const content = col.accessor
                      ? col.accessor(row)
                      : isPrimitive(raw)
                      ? String(raw)
                      : null
                    return (
                      <td key={col.key} className={cn(alignClass(col.align), col.className)}>
                        {content}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {total === 0 && (
        <EmptyState
          title={emptyText}
          text="Try a different search term, or clear the filter to show everything again."
          actions={
            query ? (
              <MButton
                variant="ghost"
                onClick={() => {
                  setQuery('')
                  setPage(1)
                }}
              >
                Clear search
              </MButton>
            ) : undefined
          }
        />
      )}

      <div className="dt-pagination">
        <span className="dt-pagination__info" aria-live="polite">
          {infoText}
        </span>
        <div className="dt-pagination__nav">
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            onPageChange={setPage}
            size="sm"
            ariaLabel="Table pagination"
          />
        </div>
      </div>
    </div>
  )
}
