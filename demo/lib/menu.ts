import type { MenuNode } from '@madhusudan-hegde/cooladmin-react'

/**
 * Sidebar + command-palette navigation, ported from CoolAdmin's
 * `src/pug/partials/_nav-data.pug`. Hrefs are mapped to the demo's Next
 * routes; icons are Font Awesome 7 class strings (FA5 names translated).
 *
 * Plain module (no `'use client'`) so both server and client files can import it.
 */
export const menuItems: MenuNode[] = [
  {
    type: 'group',
    label: 'Dashboard',
    icon: 'fa-solid fa-gauge-high',
    children: [
      { type: 'item', label: 'Overview', href: '/', keywords: ['home', 'dashboard 1'] },
      {
        type: 'item',
        label: 'Sales pipeline',
        href: '/dashboard/sales',
        keywords: ['dashboard 2'],
      },
      {
        type: 'item',
        label: 'Marketing analytics',
        href: '/dashboard/marketing',
        keywords: ['dashboard 3', 'traffic'],
      },
      { type: 'item', label: 'Projects', href: '/dashboard/projects', keywords: ['dashboard 4'] },
    ],
  },
  { type: 'item', label: 'Charts', href: '/charts', icon: 'fa-solid fa-chart-bar' },
  {
    type: 'group',
    label: 'Tables',
    icon: 'fa-solid fa-table',
    children: [
      { type: 'item', label: 'Tables', href: '/tables' },
      { type: 'item', label: 'Data table', href: '/tables/data' },
    ],
  },
  {
    type: 'group',
    label: 'Forms',
    icon: 'fa-regular fa-square-check',
    children: [
      { type: 'item', label: 'Forms', href: '/forms' },
      { type: 'item', label: 'Setup wizard', href: '/forms/wizard' },
    ],
  },
  { type: 'item', label: 'Calendar', href: '/calendar', icon: 'fa-solid fa-calendar-days' },
  { type: 'item', label: 'Maps', href: '/maps', icon: 'fa-solid fa-location-dot' },
  { type: 'item', label: 'Inbox', href: '/inbox', icon: 'fa-solid fa-inbox' },
  { type: 'item', label: 'Kanban', href: '/kanban', icon: 'fa-solid fa-table-columns' },
  { type: 'item', label: 'Notifications', href: '/notifications', icon: 'fa-regular fa-bell' },
  { type: 'item', label: 'Documentation', href: '/docs', icon: 'fa-regular fa-file-lines' },
  {
    type: 'group',
    label: 'Account',
    icon: 'fa-solid fa-user-gear',
    children: [
      { type: 'item', label: 'Profile & settings', href: '/account/profile' },
      { type: 'item', label: 'Pricing', href: '/account/pricing' },
      { type: 'item', label: 'Invoice', href: '/account/invoice' },
    ],
  },
  {
    type: 'group',
    label: 'Pages',
    icon: 'fa-solid fa-copy',
    children: [
      { type: 'item', label: 'Login', href: '/login' },
      { type: 'item', label: 'Register', href: '/register' },
      { type: 'item', label: 'Forgot password', href: '/forgot-password' },
      { type: 'item', label: '404 not found', href: '/errors/404' },
      { type: 'item', label: '500 server error', href: '/errors/500' },
      { type: 'item', label: 'Maintenance', href: '/errors/maintenance' },
    ],
  },
  {
    type: 'group',
    label: 'UI Elements',
    icon: 'fa-solid fa-desktop',
    children: [
      { type: 'item', label: 'Buttons', href: '/ui/buttons' },
      { type: 'item', label: 'Badges', href: '/ui/badges' },
      { type: 'item', label: 'Tabs', href: '/ui/tabs' },
      { type: 'item', label: 'Cards', href: '/ui/cards' },
      { type: 'item', label: 'Alerts', href: '/ui/alerts' },
      { type: 'item', label: 'Progress bars', href: '/ui/progress' },
      { type: 'item', label: 'Modals', href: '/ui/modals' },
      { type: 'item', label: 'Switches', href: '/ui/switches' },
      { type: 'item', label: 'Grid system', href: '/ui/grid' },
      { type: 'item', label: 'Font Awesome', href: '/ui/icons', keywords: ['icons'] },
      { type: 'item', label: 'Typography', href: '/ui/typography' },
    ],
  },
]
