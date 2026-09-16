import type { ReactNode } from 'react'
import type { AccentPreset, ColorMode } from '../types/theme'
import type { Command } from '../types/layout'
import { ColorModeProvider } from '../context/color-mode-context'
import { AccentProvider } from '../context/accent-context'
import { CommandPaletteProvider } from '../context/command-palette-context'
import { BodyClassSync } from '../context/body-class-sync'
import { CommandPalette } from '../widget/command-palette'

export interface ErrorLayoutProps {
  brandName?: string
  brandMark?: ReactNode
  brandHref?: string
  /** Big status code (`h1.error-card__code`), e.g. `404`. */
  code?: ReactNode
  /** `h2.error-card__title`. */
  title?: ReactNode
  /** `p.error-card__text`. */
  text?: ReactNode
  /** `.error-card__actions` (buttons/links). */
  actions?: ReactNode
  /** `p.error-card__hint`. */
  hint?: ReactNode
  /**
   * When set, mounts a command palette (⌘K) with these commands so a "Search"
   * action can call `useCommandPalette().open()` — as CoolAdmin's 404 page does.
   */
  commands?: Command[]
  initialColorMode?: ColorMode
  initialAccent?: AccentPreset
  children?: ReactNode
}

/**
 * Status-page shell (`body.app.error-page > main.error-card`) for 404 / 500 /
 * maintenance. Pass the structured props or render your own `children`.
 * Use `getBodyClassName({ variant: 'error' })` on `<body>` in the route-group layout.
 */
export function ErrorLayout({
  brandName = 'CoolAdmin',
  brandMark = 'C',
  brandHref = '/',
  code,
  title,
  text,
  actions,
  hint,
  commands,
  initialColorMode = 'auto',
  initialAccent = 'blue',
  children,
}: ErrorLayoutProps) {
  const card = (
    <>
      <BodyClassSync staticClasses="app error-page" />
      <main className="error-card" role="main">
        <a href={brandHref} className="error-card__brand" aria-label={`${brandName} home`}>
          <span className="logo-mark" aria-hidden="true">
            {brandMark}
          </span>
          <span className="logo-text">{brandName}</span>
        </a>
        {code !== undefined && <h1 className="error-card__code">{code}</h1>}
        {title && <h2 className="error-card__title">{title}</h2>}
        {text && <p className="error-card__text">{text}</p>}
        {actions && <div className="error-card__actions">{actions}</div>}
        {children}
        {hint && <p className="error-card__hint">{hint}</p>}
      </main>
    </>
  )

  return (
    <ColorModeProvider initialMode={initialColorMode}>
      <AccentProvider initialAccent={initialAccent}>
        {commands ? (
          <CommandPaletteProvider commands={commands}>
            {card}
            <CommandPalette />
          </CommandPaletteProvider>
        ) : (
          card
        )}
      </AccentProvider>
    </ColorModeProvider>
  )
}
