import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from './stat-card'

describe('StatCard', () => {
  it('renders label, value and icon slot', () => {
    render(<StatCard label="Revenue" value="$48,217" icon="fa-solid fa-dollar-sign" color="c2" />)
    expect(screen.getByText('Revenue')).toHaveClass('stat-card__label')
    expect(screen.getByText('$48,217')).toHaveClass('stat-card__value')
    const iconWrap = document.querySelector('.stat-card__icon')
    expect(iconWrap).toHaveClass('stat-card__icon--c2')
    expect(iconWrap?.querySelector('i')).toHaveClass('fa-dollar-sign')
  })

  it('formats a numeric delta and infers the direction from its sign', () => {
    const { rerender } = render(
      <StatCard
        label="Orders"
        value="1,284"
        icon="fa-solid fa-cart-shopping"
        delta={-3.2}
        deltaPeriod="vs last 30d"
      />
    )
    const delta = document.querySelector('.stat-card__delta')
    expect(delta).toHaveClass('stat-card__delta--down')
    expect(delta?.textContent).toContain('3.2%')
    expect(screen.getByText('vs last 30d')).toHaveClass('stat-card__delta-period')

    rerender(
      <StatCard label="Orders" value="1,284" icon="fa-solid fa-cart-shopping" delta={12.5} />
    )
    expect(document.querySelector('.stat-card__delta')).toHaveClass('stat-card__delta--up')
  })

  it('renders a string delta verbatim and honours an explicit direction', () => {
    render(
      <StatCard
        label="Conversion"
        value="3.24%"
        icon="fa-solid fa-bullseye"
        delta="0.6pp"
        deltaDirection="down"
      />
    )
    const delta = document.querySelector('.stat-card__delta')
    expect(delta).toHaveClass('stat-card__delta--down')
    expect(delta?.textContent).toContain('0.6pp')
  })

  it('omits the delta and sparkline blocks when not provided', () => {
    render(<StatCard label="Users" value="8,492" icon="fa-solid fa-users" />)
    expect(document.querySelector('.stat-card__delta')).toBeNull()
    expect(document.querySelector('.stat-card__sparkline')).toBeNull()
  })
})
