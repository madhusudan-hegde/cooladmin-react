import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Wizard } from './wizard'
import type { WizardStep } from './wizard'

const steps: WizardStep[] = [
  { id: 'account', label: 'Account', sublabel: 'Basics', content: <p>Step one</p> },
  { id: 'workspace', label: 'Workspace', sublabel: 'Team setup', content: <p>Step two</p> },
  { id: 'plan', label: 'Plan', sublabel: 'Pick a tier', content: <p>Step three</p> },
  { id: 'done', label: 'Done', sublabel: 'Confirm', content: <p>All set!</p> },
]

const stepItems = () => Array.from(document.querySelectorAll('li.wizard__step'))

describe('Wizard', () => {
  it('renders the step indicator and only the active pane', () => {
    render(<Wizard steps={steps} />)
    const items = stepItems()
    expect(items).toHaveLength(4)
    expect(items[0]).toHaveClass('is-active')
    expect(items[0]).toHaveAttribute('aria-current', 'step')
    expect(items[1]).not.toHaveClass('is-active')
    expect(screen.getByText('Step one')).toBeInTheDocument()
    expect(screen.queryByText('Step two')).toBeNull()
    expect(document.querySelector('.wizard__panel .wizard__pane')).toHaveClass('is-active')
    expect(screen.getByText('Basics')).toHaveClass('wizard__sublabel')
    // No Back button on the first step, Continue on the way forward.
    expect(screen.queryByRole('button', { name: /back/i })).toBeNull()
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
  })

  it('advances and goes back, marking earlier steps complete and clickable', () => {
    const onChange = vi.fn()
    render(<Wizard steps={steps} onChange={onChange} />)
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(onChange).toHaveBeenLastCalledWith(1)
    expect(screen.getByText('Step two')).toBeInTheDocument()
    let items = stepItems()
    expect(items[0]).toHaveClass('is-complete')
    expect(items[0].querySelector('.wizard__circle i')).toHaveClass('fa-check')
    expect(items[1]).toHaveClass('is-active')

    fireEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(onChange).toHaveBeenLastCalledWith(0)
    expect(screen.getByText('Step one')).toBeInTheDocument()

    // Jump forward twice, then click the completed first step directly.
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText('Step three')).toBeInTheDocument()
    items = stepItems()
    expect(items[0].querySelector('button.wizard__step-btn')).toBeInTheDocument()
    expect(items[3].querySelector('button')).toBeNull()
    fireEvent.click(items[0].querySelector('button.wizard__step-btn')!)
    expect(onChange).toHaveBeenLastCalledWith(0)
    expect(screen.getByText('Step one')).toBeInTheDocument()
  })

  it('shows the finish label on the penultimate step and fires onFinish entering the last one', () => {
    const onFinish = vi.fn()
    render(<Wizard steps={steps} defaultActiveIndex={2} onFinish={onFinish} />)
    const finish = screen.getByRole('button', { name: /finish/i })
    expect(finish).toHaveClass('m-btn--primary')
    fireEvent.click(finish)
    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(screen.getByText('All set!')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /finish|continue/i })).toBeNull()
    expect(stepItems()[3]).toHaveClass('is-active')
  })

  it('disables the forward button when canProceed returns false', () => {
    render(<Wizard steps={steps} canProceed={i => i !== 0} />)
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled()
  })

  it('is controlled by activeIndex when provided', () => {
    const onChange = vi.fn()
    const { rerender } = render(<Wizard steps={steps} activeIndex={1} onChange={onChange} />)
    expect(screen.getByText('Step two')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(onChange).toHaveBeenCalledWith(2)
    // Parent has not updated → still on step two.
    expect(screen.getByText('Step two')).toBeInTheDocument()
    rerender(<Wizard steps={steps} activeIndex={2} onChange={onChange} />)
    expect(screen.getByText('Step three')).toBeInTheDocument()
  })

  it('honours custom labels', () => {
    render(<Wizard steps={steps} defaultActiveIndex={1} backLabel="Previous" nextLabel="Onward" />)
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /onward/i })).toBeInTheDocument()
  })
})
