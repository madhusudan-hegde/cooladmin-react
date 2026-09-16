import type { ReactNode } from 'react'
import type { MenuNode } from '../types/menu'
import type { Command, DashboardUser, LinkComponent } from '../types/layout'
import type { AccentPreset, ColorMode } from '../types/theme'
import { cn } from '../lib/class-name'
import { flattenMenuToCommands } from '../lib/flatten-menu'
import { LinkProvider } from '../context/link-context'
import { ColorModeProvider } from '../context/color-mode-context'
import { AccentProvider } from '../context/accent-context'
import { SidebarProvider } from '../context/sidebar-context'
import { ToastProvider } from '../context/toast-context'
import { CommandPaletteProvider } from '../context/command-palette-context'
import { BodyClassSync } from '../context/body-class-sync'
import { SkipLink } from './skip-link'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { AppContent } from './app-content'
import { CommandPalette } from '../widget/command-palette'
import { ThemeSwitcher } from '../widget/theme-switcher'

export interface DashboardLayoutProps {
  menuItems: MenuNode[]
  brandName?: string
  brandMark?: ReactNode
  brandHref?: string
  user?: DashboardUser
  topbarStart?: ReactNode
  topbarEnd?: ReactNode
  /** Replaces the default `<AccountMenu>` built from `user`. */
  accountMenu?: ReactNode
  /** Hide the topbar search field. */
  showSearch?: boolean
  linkComponent?: LinkComponent
  /** Extra command-palette entries (merged after the menu-derived pages). */
  commands?: Command[]
  /** Prefix applied to menu hrefs when building palette commands. */
  linkPrefix?: string
  showThemeSwitcher?: boolean
  defaultCollapsed?: boolean
  initialColorMode?: ColorMode
  initialAccent?: AccentPreset
  /** Extra content under the sidebar nav. */
  sidebarFooter?: ReactNode
  /** Class on `.main-content`. */
  className?: string
  children: ReactNode
}

/**
 * RSC shell for CoolAdmin's default layout:
 * `.page-wrapper > Sidebar + .page-container > Topbar + AppContent`.
 * Nests ColorMode → Accent → Sidebar → Toast → CommandPalette providers and
 * mounts the headless `BodyClassSync`, the command palette and theme switcher.
 *
 * It cannot render `<body>` — put `getBodyClassName({ defaultCollapsed, accent })`
 * on `<body className>` in your root layout so the first paint has the right
 * classes; `BodyClassSync` keeps them in sync afterwards.
 */
export function DashboardLayout({
  menuItems,
  brandName = 'CoolAdmin',
  brandMark = 'C',
  brandHref = '/',
  user,
  topbarStart,
  topbarEnd,
  accountMenu,
  showSearch = true,
  linkComponent,
  commands = [],
  linkPrefix,
  showThemeSwitcher = true,
  defaultCollapsed = false,
  initialColorMode = 'auto',
  initialAccent = 'blue',
  sidebarFooter,
  className,
  children,
}: DashboardLayoutProps) {
  const paletteCommands = [...flattenMenuToCommands(menuItems, linkPrefix), ...commands]

  return (
    <LinkProvider linkComponent={linkComponent}>
      <ColorModeProvider initialMode={initialColorMode}>
        <AccentProvider initialAccent={initialAccent}>
          <SidebarProvider defaultCollapsed={defaultCollapsed}>
            <ToastProvider>
              <CommandPaletteProvider commands={paletteCommands}>
                <BodyClassSync staticClasses="app" />
                <SkipLink />

                <div className="page-wrapper">
                  <Sidebar
                    menuItems={menuItems}
                    brandName={brandName}
                    brandMark={brandMark}
                    brandHref={brandHref}
                    footer={sidebarFooter}
                  />
                  <div className="page-container">
                    <Topbar
                      start={topbarStart}
                      end={topbarEnd}
                      user={user}
                      accountMenu={accountMenu}
                      showSearch={showSearch}
                    />
                    <AppContent className={cn(className)}>{children}</AppContent>
                  </div>
                </div>

                <CommandPalette />
                {showThemeSwitcher && <ThemeSwitcher />}
              </CommandPaletteProvider>
            </ToastProvider>
          </SidebarProvider>
        </AccentProvider>
      </ColorModeProvider>
    </LinkProvider>
  )
}
