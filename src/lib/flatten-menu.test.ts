import { describe, it, expect } from 'vitest'
import { flattenMenuToCommands } from './flatten-menu'
import type { MenuNode } from '../types/menu'

const menu: MenuNode[] = [
  {
    type: 'group',
    label: 'Dashboard',
    icon: 'fa-solid fa-gauge',
    children: [
      { type: 'item', label: 'Overview', href: '/' },
      { type: 'item', label: 'Sales', href: '/dashboard/sales' },
    ],
  },
  { type: 'item', label: 'Charts', href: '/charts', icon: 'fa-solid fa-chart-bar' },
  { type: 'item', label: 'Placeholder', href: '#' },
  {
    type: 'group',
    label: 'UI Elements',
    children: [
      { type: 'item', label: 'Buttons', href: '/ui/buttons' },
      { type: 'item', label: 'Buttons again', href: '/ui/buttons' },
    ],
  },
  { type: 'header', label: 'Account' },
  { type: 'item', label: 'Profile', href: '/account/profile' },
]

describe('flattenMenuToCommands', () => {
  it('flattens nested groups into navigable commands', () => {
    const cmds = flattenMenuToCommands(menu)
    expect(cmds.map(c => c.href)).toEqual([
      '/',
      '/dashboard/sales',
      '/charts',
      '/ui/buttons',
      '/account/profile',
    ])
  })

  it('skips placeholder links and de-duplicates by href', () => {
    const cmds = flattenMenuToCommands(menu)
    expect(cmds.find(c => c.label === 'Placeholder')).toBeUndefined()
    expect(cmds.filter(c => c.href === '/ui/buttons')).toHaveLength(1)
  })

  it('assigns groups: Pages by default, Components for UI groups, header labels otherwise', () => {
    const cmds = flattenMenuToCommands(menu)
    expect(cmds.find(c => c.href === '/charts')?.group).toBe('Pages')
    expect(cmds.find(c => c.href === '/ui/buttons')?.group).toBe('Components')
    expect(cmds.find(c => c.href === '/account/profile')?.group).toBe('Account')
  })

  it('inherits the parent group icon and label as keywords', () => {
    const sales = flattenMenuToCommands(menu).find(c => c.href === '/dashboard/sales')
    expect(sales?.icon).toBe('fa-solid fa-gauge')
    expect(sales?.keywords).toContain('Dashboard')
  })

  it('applies a link prefix to relative hrefs', () => {
    const cmds = flattenMenuToCommands(menu, '/app')
    expect(cmds[0].href).toBe('/app/')
    expect(cmds.find(c => c.label === 'Charts')?.href).toBe('/app/charts')
  })
})
