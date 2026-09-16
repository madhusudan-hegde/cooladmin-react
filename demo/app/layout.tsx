import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { getBodyClassName } from '@madhusudan-hegde/cooladmin-react'
import '@madhusudan-hegde/cooladmin-react/css'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'CoolAdmin React',
    template: '%s · CoolAdmin React',
  },
  description:
    'CoolAdmin 3.4 admin dashboard re-implemented as React 19 components for the Next.js App Router — dashboards, auth and status pages, dark mode, accent presets and a ⌘K command palette.',
  applicationName: 'CoolAdmin React',
  authors: [{ name: 'Colorlib', url: 'https://colorlib.com' }],
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#4272d7',
  width: 'device-width',
  initialScale: 1,
}

/**
 * Applies the persisted color mode before first paint so a dark-mode visitor
 * never sees a light flash. Mirrors `ColorModeProvider`: key `cooladmin.color-mode`,
 * JSON `'light' | 'dark' | 'auto'` (auto → prefers-color-scheme).
 */
const NO_FLASH_SCRIPT = `(function(){try{var m=JSON.parse(localStorage.getItem('cooladmin.color-mode')||'"auto"');if(m!=='light'&&m!=='dark'){m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-bs-theme',m)}catch(e){}})();`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-bs-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Bootstrap 5.3.8 — CoolAdmin's grid/utilities layer */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
        />
        {/* Font Awesome 7 Free — every icon is an FA class string */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css"
        />
        {/* Inter — the modern overlay's typeface */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      {/* Static first-paint classes; BodyClassSync (mounted by each library layout)
          keeps `sidebar-*`, `theme-*`, `auth-page` / `error-page` in sync afterwards. */}
      <body className={getBodyClassName({ accent: 'blue' })}>
        {children}
        {/* Bootstrap bundle (Popper included) — dropdowns/collapse/modals on Phase 2 pages */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
