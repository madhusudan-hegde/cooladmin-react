import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MButton } from './m-button'

describe('MButton', () => {
  it('renders a primary button by default', () => {
    render(<MButton>New project</MButton>)
    const btn = screen.getByRole('button', { name: 'New project' })
    expect(btn.tagName).toBe('BUTTON')
    expect(btn).toHaveAttribute('type', 'button')
    expect(btn).toHaveClass('m-btn', 'm-btn--primary')
  })

  it('applies variant, size and icon', () => {
    render(
      <MButton variant="ghost" size="sm" icon="fa-solid fa-download">
        Export
      </MButton>
    )
    const btn = screen.getByRole('button', { name: 'Export' })
    expect(btn).toHaveClass('m-btn--ghost', 'm-btn--sm')
    const icon = btn.querySelector('i')
    expect(icon).toHaveClass('fa-solid', 'fa-download')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders an anchor when href is given', () => {
    render(
      <MButton href="/dashboard" variant="danger">
        Back
      </MButton>
    )
    const link = screen.getByRole('link', { name: 'Back' })
    expect(link).toHaveAttribute('href', '/dashboard')
    expect(link).toHaveClass('m-btn', 'm-btn--danger')
  })

  it('forwards click handlers and disables while loading', () => {
    const onClick = vi.fn()
    const { rerender } = render(<MButton onClick={onClick}>Save</MButton>)
    fireEvent.click(screen.getByText('Save'))
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(
      <MButton onClick={onClick} loading>
        Save
      </MButton>
    )
    const btn = screen.getByRole('button', { name: 'Save' })
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
    expect(btn.querySelector('.btn-spinner')).not.toBeNull()
  })
})
