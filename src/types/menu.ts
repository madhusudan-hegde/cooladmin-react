/**
 * Menu header node — a non-interactive section label rendered between groups.
 */
export interface MenuHeaderNode {
  type: 'header'
  label: string
}

/**
 * Menu link node — a navigable sidebar entry.
 */
export interface MenuItemNode {
  type: 'item'
  label: string
  href: string
  /** Font Awesome 7 class string, e.g. `'fa-solid fa-chart-bar'`. */
  icon?: string
  badge?: string | number
  target?: '_blank' | '_self'
  /** Extra search terms for the command palette. */
  keywords?: string[]
}

/**
 * Menu group node — a collapsible sub-list (`li.has-sub > a.js-arrow + ul.navbar__sub-list`).
 */
export interface MenuGroupNode {
  type: 'group'
  label: string
  /** Font Awesome 7 class string. */
  icon?: string
  badge?: string | number
  children: MenuNode[]
}

/**
 * Discriminated union of every sidebar node. One `MenuNode[]` drives both the
 * sidebar tree and the command palette (via `flattenMenuToCommands`).
 */
export type MenuNode = MenuHeaderNode | MenuItemNode | MenuGroupNode
