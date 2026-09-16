import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Modal } from './modal'

afterEach(() => {
  cleanup()
})

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Hidden">
        <p>Body</p>
      </Modal>
    )
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.body).not.toHaveClass('modal-open')
  })

  it('portals Bootstrap modal markup into body and locks scroll while open', () => {
    const { unmount } = render(
      <Modal
        open
        onClose={() => {}}
        title="Welcome to CoolAdmin"
        size="lg"
        centered
        scrollable
        id="modal-basic"
        footer={<button type="button">Got it</button>}
      >
        <p>A clean, modern admin dashboard template.</p>
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.parentElement).toBe(document.body)
    expect(dialog).toHaveClass('modal', 'fade', 'show')
    expect(dialog).toHaveStyle({ display: 'block' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-basic-title')
    expect(screen.getByText('Welcome to CoolAdmin')).toHaveAttribute('id', 'modal-basic-title')
    expect(screen.getByText('Welcome to CoolAdmin')).toHaveClass('modal-title')
    expect(dialog.querySelector('.modal-dialog')).toHaveClass(
      'modal-dialog-centered',
      'modal-dialog-scrollable',
      'modal-lg'
    )
    expect(dialog.querySelector('.modal-body')?.textContent).toContain('A clean, modern')
    expect(dialog.querySelector('.modal-footer')?.textContent).toBe('Got it')
    expect(document.querySelector('.modal-backdrop')).toHaveClass('fade', 'show')
    expect(document.body).toHaveClass('modal-open')
    expect(document.body.style.overflow).toBe('hidden')

    unmount()
    expect(document.body).not.toHaveClass('modal-open')
    expect(document.body.style.overflow).toBe('')
    expect(document.querySelector('.modal-backdrop')).toBeNull()
  })

  it('does not add a size class for md and omits the header without a title', () => {
    render(
      <Modal open onClose={() => {}}>
        <p>Delete this item?</p>
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog.querySelector('.modal-dialog')?.className).toBe('modal-dialog')
    expect(dialog.querySelector('.modal-header')).toBeNull()
    expect(dialog).not.toHaveAttribute('aria-labelledby')
  })

  it('closes on Esc, header close button and backdrop click', () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Invite teammate">
        <input placeholder="Email" />
      </Modal>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(2)
    fireEvent.click(screen.getByRole('dialog'))
    expect(onClose).toHaveBeenCalledTimes(3)
    // clicks inside the content do not close
    fireEvent.click(screen.getByPlaceholderText('Email'))
    expect(onClose).toHaveBeenCalledTimes(3)
  })

  it('ignores backdrop clicks (but not Esc) when staticBackdrop is set', () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Static Modal" staticBackdrop>
        <p>Backdrop click will not close it.</p>
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog)
    expect(onClose).not.toHaveBeenCalled()
    expect(dialog).toHaveClass('modal-static')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('focuses the first focusable element on open and restores focus on close', () => {
    const trigger = document.createElement('button')
    trigger.textContent = 'Open'
    document.body.appendChild(trigger)
    trigger.focus()
    expect(trigger).toHaveFocus()

    const { rerender } = render(
      <Modal open onClose={() => {}} title="Form modal">
        <input placeholder="Email address" />
      </Modal>
    )
    // The header close button is the first focusable control.
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()

    rerender(
      <Modal open={false} onClose={() => {}} title="Form modal">
        <input placeholder="Email address" />
      </Modal>
    )
    expect(trigger).toHaveFocus()
    trigger.remove()
  })

  it('traps Tab inside the dialog', () => {
    render(
      <Modal open onClose={() => {}} title="Terms" footer={<button type="button">Accept</button>}>
        <p>Body</p>
      </Modal>
    )
    const close = screen.getByRole('button', { name: 'Close' })
    const accept = screen.getByRole('button', { name: 'Accept' })
    accept.focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(close).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(accept).toHaveFocus()
  })
})
