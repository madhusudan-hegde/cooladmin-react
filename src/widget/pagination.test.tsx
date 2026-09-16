import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination, getPaginationRange } from './pagination'

describe('getPaginationRange', () => {
  it('lists every page when there is no room for ellipses', () => {
    expect(getPaginationRange(1, 3)).toEqual([1, 2, 3])
    expect(getPaginationRange(2, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('windows around the current page with edges and ellipses', () => {
    expect(getPaginationRange(5, 10)).toEqual([1, '…', 4, 5, 6, '…', 10])
    expect(getPaginationRange(1, 10)).toEqual([1, 2, '…', 10])
    expect(getPaginationRange(10, 10)).toEqual([1, '…', 9, 10])
    expect(getPaginationRange(5, 10, 2)).toEqual([1, 2, 3, 4, 5, 6, 7, '…', 10])
    expect(getPaginationRange(4, 10)).toEqual([1, 2, 3, 4, 5, '…', 10])
  })

  it('drops the edges when showEdges is false', () => {
    expect(getPaginationRange(5, 10, 1, false)).toEqual([4, 5, 6])
  })
})

describe('Pagination', () => {
  it('renders Bootstrap markup with the active page marked aria-current', () => {
    render(<Pagination page={2} pageCount={3} onPageChange={() => {}} />)
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
    const active = screen.getByRole('button', { name: 'Page 2' })
    expect(active).toHaveAttribute('aria-current', 'page')
    expect(active.closest('li')).toHaveClass('page-item', 'active')
    expect(screen.getByRole('button', { name: 'Page 1' })).not.toHaveAttribute('aria-current')
    expect(document.querySelector('ul.pagination')).toBeInTheDocument()
  })

  it('disables previous on the first page and next on the last page', () => {
    const { rerender } = render(<Pagination page={1} pageCount={4} onPageChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Previous page' }).closest('li')).toHaveClass(
      'disabled'
    )
    expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled()

    rerender(<Pagination page={4} pageCount={4} onPageChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeEnabled()
  })

  it('calls onPageChange for page, previous and next clicks but not for the current page', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={2} pageCount={5} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByRole('button', { name: 'Page 5' }))
    expect(onPageChange).toHaveBeenLastCalledWith(5)
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }))
    expect(onPageChange).toHaveBeenLastCalledWith(1)
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }))
    expect(onPageChange).toHaveBeenLastCalledWith(3)
    fireEvent.click(screen.getByRole('button', { name: 'Page 2' }))
    expect(onPageChange).toHaveBeenCalledTimes(3)
  })

  it('renders ellipses as non-interactive items and supports the small size', () => {
    render(<Pagination page={5} pageCount={10} onPageChange={() => {}} size="sm" />)
    expect(document.querySelector('ul.pagination')).toHaveClass('pagination-sm')
    const ellipses = document.querySelectorAll('.page-item.disabled span.page-link')
    expect(ellipses).toHaveLength(2)
    expect(screen.queryByRole('button', { name: 'Page 2' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Page 10' })).toBeInTheDocument()
  })
})
