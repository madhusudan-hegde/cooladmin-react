import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tabs } from './tabs'
import type { TabItem } from './tabs'

const items: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'fa-solid fa-chart-line',
    content: <p>Overview pane</p>,
  },
  { id: 'details', label: 'Details', content: <p>Details pane</p> },
  { id: 'history', label: 'History', content: <p>History pane</p>, disabled: true },
  { id: 'team', label: 'Team', content: <p>Team pane</p> },
]

describe('Tabs', () => {
  it('renders WAI-ARIA tab markup with roving tabindex and wires tabs to panes', () => {
    render(<Tabs items={items} variant="settings" id="demo" />)
    const list = screen.getByRole('tablist')
    expect(list).toHaveClass('nav', 'nav-tabs', 'settings-tabs')
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(4)
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[0]).toHaveClass('nav-link', 'active')
    expect(tabs[0]).toHaveAttribute('tabindex', '0')
    expect(tabs[1]).toHaveAttribute('tabindex', '-1')
    expect(tabs[2]).toBeDisabled()
    expect(tabs[0]).toHaveAttribute('id', 'demo-tab-overview')
    expect(tabs[0]).toHaveAttribute('aria-controls', 'demo-pane-overview')
    const pane = document.getElementById('demo-pane-overview')
    expect(pane).toHaveAttribute('role', 'tabpanel')
    expect(pane).toHaveAttribute('aria-labelledby', 'demo-tab-overview')
    expect(pane).toHaveClass('tab-pane', 'fade', 'show', 'active')
    expect(document.getElementById('demo-pane-details')).toHaveAttribute('hidden')
    expect(tabs[0].querySelector('i')).toHaveClass('fa-chart-line')
  })

  it('switches panes on click (uncontrolled) and honours defaultActiveId', () => {
    const onChange = vi.fn()
    render(<Tabs items={items} defaultActiveId="details" onChange={onChange} />)
    expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'true')
    fireEvent.click(screen.getByRole('tab', { name: 'Team' }))
    expect(onChange).toHaveBeenCalledWith('team')
    expect(screen.getByRole('tab', { name: 'Team' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Team pane').closest('.tab-pane')).toHaveClass('show', 'active')
    expect(screen.getByText('Details pane').closest('.tab-pane')).toHaveAttribute('hidden')
  })

  it('moves focus and selection with Arrow/Home/End keys, skipping disabled tabs', () => {
    render(<Tabs items={items} />)
    const list = screen.getByRole('tablist')
    const [overview, details, , team] = screen.getAllByRole('tab')
    overview.focus()
    fireEvent.keyDown(list, { key: 'ArrowRight' })
    expect(details).toHaveFocus()
    expect(details).toHaveAttribute('aria-selected', 'true')
    // History is disabled → jumps to Team
    fireEvent.keyDown(list, { key: 'ArrowRight' })
    expect(team).toHaveFocus()
    expect(team).toHaveAttribute('aria-selected', 'true')
    // wraps around
    fireEvent.keyDown(list, { key: 'ArrowRight' })
    expect(overview).toHaveFocus()
    fireEvent.keyDown(list, { key: 'End' })
    expect(team).toHaveFocus()
    fireEvent.keyDown(list, { key: 'Home' })
    expect(overview).toHaveFocus()
    fireEvent.keyDown(list, { key: 'ArrowLeft' })
    expect(team).toHaveFocus()
  })

  it('is fully controlled when activeId is given', () => {
    const onChange = vi.fn()
    const { rerender } = render(<Tabs items={items} activeId="overview" onChange={onChange} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Details' }))
    expect(onChange).toHaveBeenCalledWith('details')
    // parent has not updated → selection unchanged
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true')
    rerender(<Tabs items={items} activeId="details" onChange={onChange} />)
    expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'true')
  })

  it('applies variant, fill/justified and vertical classes', () => {
    const { rerender } = render(<Tabs items={items} variant="pills" fill />)
    expect(screen.getByRole('tablist')).toHaveClass('nav-pills', 'nav-fill')
    rerender(<Tabs items={items} variant="pills" vertical justified />)
    const list = screen.getByRole('tablist')
    expect(list).toHaveClass('flex-column', 'nav-justified')
    expect(list).toHaveAttribute('aria-orientation', 'vertical')
    expect(list.closest('.tabs')).toHaveClass('tabs--vertical')
  })
})
