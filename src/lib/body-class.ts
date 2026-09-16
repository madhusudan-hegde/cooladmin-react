import type { AccentPreset } from '../types/theme'
import { DEFAULT_ACCENT } from './accent-presets'
import { cn } from './class-name'

export interface BodyClassOptions {
  /** Start with the desktop icon rail (`sidebar-collapsed`). Ignored for auth/error variants. */
  defaultCollapsed?: boolean
  /** Accent preset (`theme-<accent>`); defaults to `'blue'`. */
  accent?: AccentPreset
  /** Which shell the page renders. */
  variant?: 'dashboard' | 'auth' | 'error'
  /** Extra classes to append. */
  className?: string
}

/**
 * Computes the `<body>` class list CoolAdmin's stylesheet expects, e.g.
 * `'app sidebar-collapsed theme-blue'`. Because the RSC layouts cannot render
 * `<body>` under Next's root layout, put this on `<body className>` in your root
 * layout so the first paint is correct; `BodyClassSync` takes over on the client.
 */
export function getBodyClassName(options: BodyClassOptions = {}): string {
  const {
    defaultCollapsed = false,
    accent = DEFAULT_ACCENT,
    variant = 'dashboard',
    className,
  } = options
  return cn(
    'app',
    variant === 'auth' && 'auth-page',
    variant === 'error' && 'error-page',
    variant === 'dashboard' && defaultCollapsed && 'sidebar-collapsed',
    `theme-${accent}`,
    className
  )
}
