'use client'

import { cn } from '../lib/class-name'

export interface PaginationProps {
  /** Current page (1-based). */
  page: number
  /** Total number of pages. */
  pageCount: number
  onPageChange: (page: number) => void
  /** Pages shown either side of the current page (default 1). */
  siblingCount?: number
  /** Always show the first and last page numbers, with ellipses (default true). */
  showEdges?: boolean
  size?: 'sm' | 'md'
  /** Label for the wrapping `<nav>` (default "Pagination"). */
  ariaLabel?: string
  className?: string
}

const ELLIPSIS = '…'

/** Page numbers (plus ellipsis markers) to render for the given state. */
export function getPaginationRange(
  page: number,
  pageCount: number,
  siblingCount = 1,
  showEdges = true
): Array<number | typeof ELLIPSIS> {
  const total = Math.max(1, pageCount)
  const current = Math.min(Math.max(1, page), total)
  const first = showEdges ? 1 : Math.max(1, current - siblingCount)
  const last = showEdges ? total : Math.min(total, current + siblingCount)
  const from = Math.max(first, current - siblingCount)
  const to = Math.min(last, current + siblingCount)

  // An ellipsis only earns its place when it hides at least two pages; a
  // single-page gap is rendered as that page.
  const items: Array<number | typeof ELLIPSIS> = []
  if (showEdges && from > 1) {
    items.push(1)
    if (from === 3) items.push(2)
    else if (from > 3) items.push(ELLIPSIS)
  }
  for (let p = from; p <= to; p++) items.push(p)
  if (showEdges && to < total) {
    if (to === total - 2) items.push(total - 1)
    else if (to < total - 2) items.push(ELLIPSIS)
    items.push(total)
  }
  return items
}

/**
 * Bootstrap pagination (`nav > ul.pagination > li.page-item > button.page-link`)
 * with previous/next chevrons, sibling windowing and `aria-current="page"`.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  showEdges = true,
  size = 'md',
  ariaLabel = 'Pagination',
  className,
}: PaginationProps) {
  const total = Math.max(1, pageCount)
  const current = Math.min(Math.max(1, page), total)
  const items = getPaginationRange(current, total, siblingCount, showEdges)
  const go = (next: number) => {
    if (next < 1 || next > total || next === current) return
    onPageChange(next)
  }

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul className={cn('pagination', size === 'sm' && 'pagination-sm')}>
        <li className={cn('page-item', current === 1 && 'disabled')}>
          <button
            type="button"
            className="page-link"
            aria-label="Previous page"
            disabled={current === 1}
            onClick={() => go(current - 1)}
          >
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
          </button>
        </li>
        {items.map((item, i) =>
          item === ELLIPSIS ? (
            <li key={`e${i}`} className="page-item disabled">
              <span className="page-link" aria-hidden="true">
                {ELLIPSIS}
              </span>
            </li>
          ) : (
            <li key={item} className={cn('page-item', item === current && 'active')}>
              <button
                type="button"
                className="page-link"
                aria-current={item === current ? 'page' : undefined}
                aria-label={`Page ${item}`}
                onClick={() => go(item)}
              >
                {item}
              </button>
            </li>
          )
        )}
        <li className={cn('page-item', current === total && 'disabled')}>
          <button
            type="button"
            className="page-link"
            aria-label="Next page"
            disabled={current === total}
            onClick={() => go(current + 1)}
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
