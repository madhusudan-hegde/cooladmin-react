import type { MenuNode } from '@madhusudan-hegde/cooladmin-react'

export const menuItems: MenuNode[] = [
  { type: 'header', label: 'Main' },
  { type: 'item', label: 'Overview', href: '/', icon: 'fa-solid fa-gauge-high' },
  { type: 'item', label: 'Customers', href: '/customers', icon: 'fa-solid fa-users', badge: '22' },
  { type: 'header', label: 'Account' },
  { type: 'item', label: 'Settings', href: '/settings', icon: 'fa-solid fa-gear' },
]
