import type { ReactNode } from 'react'
import type { AccentPreset, ColorMode } from '../types/theme'
import { ColorModeProvider } from '../context/color-mode-context'
import { AccentProvider } from '../context/accent-context'
import { ToastProvider } from '../context/toast-context'
import { BodyClassSync } from '../context/body-class-sync'
import { SkipLink } from './skip-link'

export interface AuthLayoutProps {
  brandName?: string
  brandMark?: ReactNode
  brandHref?: string
  /** `h1.auth-title` (e.g. "Welcome back"). */
  title?: ReactNode
  /** `p.auth-subtitle`. */
  subtitle?: ReactNode
  initialColorMode?: ColorMode
  initialAccent?: AccentPreset
  children: ReactNode
}

/**
 * Centred single-column shell for login / register / forgot-password
 * (`body.app.auth-page > main#auth-form.login-wrap > .login-content`).
 * Use `getBodyClassName({ variant: 'auth' })` on `<body>` in the route-group layout.
 */
export function AuthLayout({
  brandName = 'CoolAdmin',
  brandMark = 'C',
  brandHref = '/',
  title,
  subtitle,
  initialColorMode = 'auto',
  initialAccent = 'blue',
  children,
}: AuthLayoutProps) {
  return (
    <ColorModeProvider initialMode={initialColorMode}>
      <AccentProvider initialAccent={initialAccent}>
        <ToastProvider>
          <BodyClassSync staticClasses="app auth-page" />
          <SkipLink href="#auth-form">Skip to sign-in form</SkipLink>
          <main className="login-wrap" id="auth-form">
            <div className="login-content">
              <a href={brandHref} className="auth-brand" aria-label={`${brandName} home`}>
                <span className="logo-mark" aria-hidden="true">
                  {brandMark}
                </span>
                <span className="logo-text">{brandName}</span>
              </a>
              {title && <h1 className="auth-title">{title}</h1>}
              {subtitle && <p className="auth-subtitle">{subtitle}</p>}
              {children}
            </div>
          </main>
        </ToastProvider>
      </AccentProvider>
    </ColorModeProvider>
  )
}
