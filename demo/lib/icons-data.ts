/**
 * Icon list for the /ui/icons showcase (CoolAdmin fontawesome.html), in page
 * order. `tone` is the Bootstrap `text-*` colour class the page applies per
 * category. Plain module — no `'use client'`.
 */

export type IconTone = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'dark' | 'secondary'

export interface IconEntry {
  /** Full Font Awesome class string, e.g. `fa-solid fa-home`. */
  className: string
  tone: IconTone
  category: string
}

export interface IconSection {
  id: string
  title: string
  icons: IconEntry[]
}

const solid = (category: string, tone: IconTone, names: string[]): IconEntry[] =>
  names.map(n => ({ className: `fa-solid fa-${n}`, tone, category }))

export const iconSections: IconSection[] = [
  {
    id: 'solid',
    title: 'Solid Icons (fas)',
    icons: [
      ...solid('Navigation', 'primary', ['home', 'dashboard', 'search', 'user', 'users', 'cog']),
      ...solid('Business', 'success', [
        'chart-bar',
        'chart-line',
        'chart-pie',
        'dollar-sign',
        'briefcase',
        'calculator',
      ]),
      ...solid('Communication', 'info', [
        'envelope',
        'phone',
        'comments',
        'bell',
        'inbox',
        'paper-plane',
      ]),
      ...solid('Files', 'warning', ['file', 'folder', 'download', 'upload', 'print', 'save']),
    ],
  },
  {
    id: 'regular',
    title: 'Regular Icons (far)',
    icons: [
      'heart',
      'star',
      'bookmark',
      'thumbs-up',
      'clock',
      'calendar',
      'envelope',
      'file',
      'folder',
      'circle',
      'square',
      'eye',
    ].map(n => ({ className: `far fa-${n}`, tone: 'danger' as IconTone, category: 'Regular' })),
  },
  {
    id: 'brands',
    title: 'Brand Icons (fab)',
    icons: (
      [
        ['facebook', 'primary'],
        ['twitter', 'info'],
        ['google', 'danger'],
        ['github', 'dark'],
        ['linkedin', 'primary'],
        ['instagram', 'danger'],
        ['youtube', 'danger'],
        ['apple', 'dark'],
        ['microsoft', 'primary'],
        ['amazon', 'warning'],
        ['slack', 'success'],
        ['discord', 'primary'],
      ] as [string, IconTone][]
    ).map(([n, tone]) => ({ className: `fab fa-${n}`, tone, category: 'Brands' })),
  },
]

export interface IconCategory {
  label: string
  /** Bootstrap `bg-*` colour class for the swatch. */
  bg: IconTone
}

export const iconCategories: IconCategory[] = [
  { label: 'Navigation', bg: 'primary' },
  { label: 'Business', bg: 'success' },
  { label: 'Communication', bg: 'info' },
  { label: 'Files', bg: 'warning' },
  { label: 'Regular', bg: 'danger' },
  { label: 'Brands', bg: 'secondary' },
]
