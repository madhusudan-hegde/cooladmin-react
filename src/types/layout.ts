import type React from 'react'

/**
 * The signed-in user shown in the topbar account menu.
 */
export interface DashboardUser {
  name: string
  role?: string
  avatarSrc?: string
  email?: string
}

/**
 * Props a consumer-supplied router link must accept. Mirrors the subset of
 * anchor props the library renders on navigation links (compatible with
 * `next/link` and React Router's `Link`).
 */
export interface LinkProps {
  href: string
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>
  onBlur?: React.FocusEventHandler<HTMLAnchorElement>
  'aria-current'?: React.AriaAttributes['aria-current']
  'aria-label'?: string
  target?: string
  rel?: string
  title?: string
  id?: string
  tabIndex?: number
  role?: string
}

/**
 * A drop-in replacement for `<a>` used by every navigational link in the library.
 * Inject your framework's router link via `LinkProvider` / `DashboardLayout.linkComponent`.
 */
export type LinkComponent = React.ComponentType<LinkProps>

/**
 * Command palette entry. `href` navigates; `onSelect` runs an action; either may be set.
 */
export interface Command {
  id: string
  label: string
  group: 'Pages' | 'Components' | 'Actions' | (string & {})
  /** Font Awesome 7 class string. */
  icon?: string
  href?: string
  onSelect?: () => void
  keywords?: string[]
  /** Secondary line under the label. */
  description?: string
}

export type ToastType = 'success' | 'info' | 'warning' | 'error'

export interface ToastOptions {
  type?: ToastType
  title: string
  message?: string
  /** Auto-dismiss delay in ms (default 4000; `0` keeps the toast until closed). */
  duration?: number
}
