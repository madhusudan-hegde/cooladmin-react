# CoolAdmin React

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#license)
[![React 19](https://img.shields.io/badge/React-19-149eca.svg?logo=react&logoColor=white)](https://react.dev)
[![Next.js App Router](https://img.shields.io/badge/Next.js-App%20Router-000000.svg?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Bootstrap 5.3](https://img.shields.io/badge/Bootstrap-5.3-7952b3.svg?logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.3/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

The admin dashboard design, re-implemented as a
**React 19 / Next.js App Router component library**. Server Components by default, client islands
only where interaction needs them, Bootstrap 5.3 underneath, and CoolAdmin's own CSS class
vocabulary kept verbatim so the markup looks exactly like the original template.

**Status:** 0.1.0 (unreleased) — all 35 CoolAdmin pages ported

## Credits

This project is a derivative of two MIT-licensed projects by [Colorlib](https://colorlib.com):

- **[CoolAdmin](https://github.com/puikinsh/CoolAdmin)** — the design, SCSS tokens, class names and
  page layouts being ported.
- **[adminlte-react](https://github.com/ColorlibHQ/adminlte-react)** — the architecture, build
  pipeline and conventions this library replicates (per-file ESM output with preserved RSC/client
  boundaries, single menu model, command palette, dynamic-import plugin pattern).

## Features

- **React Server Components** — layouts and presentational widgets are RSC; only stateful pieces
  ship `'use client'`.
- **CoolAdmin look, 1:1** — `.m-card`, `.stat-card`, `.m-btn`, `.rank-list`, `.page-header` … the
  same classes as the template, styled by one compiled stylesheet.
- **Six accent presets + dark mode** — blue, purple, teal, rose, amber, graphite; light / dark /
  auto via Bootstrap's `data-bs-theme`.
- **One menu, two surfaces** — a single `menuItems` array drives the sidebar and the ⌘K command
  palette.
- **Chart.js on demand** — `Chart` and `Sparkline` load `chart.js` via dynamic import; it is an
  optional peer dependency.
- **TypeScript first** — every prop, hook and the menu model are typed; a single bundled `index.d.ts`.

## Installation

```bash
pnpm add @cooladmin/react
# or
npm install @cooladmin/react
```

### Peer dependencies

```bash
pnpm add react react-dom next        # react / react-dom ^19, next >=14 (App Router)
pnpm add chart.js                    # optional — only if you use <Chart> or <Sparkline>
```

`next` is declared optional, but the sidebar uses `next/navigation` for active-link detection, so
in practice the library targets Next.js.

The library ships **only** its own stylesheet (`@cooladmin/react/css`). You provide Bootstrap 5.3
CSS + JS, Font Awesome Free and the Inter font — via CDN is simplest (see below).

## Quick start

### 1. Root layout — CSS, CDN assets, fonts

```tsx
// app/layout.tsx
import '@cooladmin/react/css'
import './globals.css'

export const metadata = { title: { default: 'CoolAdmin React', template: '%s · CoolAdmin React' } }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css"
        />
      </head>
      <body>
        {children}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  )
}
```

Layouts (`DashboardLayout`, `AuthLayout`, `ErrorLayout`) render `className="app"` onto `<body>`
themselves — every CoolAdmin rule is scoped under `body.app`.

### 2. Dashboard layout with a menu

```tsx
// app/(dashboard)/layout.tsx
import { DashboardLayout } from '@cooladmin/react'
import type { MenuNode } from '@cooladmin/react'

const menuItems: MenuNode[] = [
  { type: 'header', label: 'Overview' },
  { type: 'item', label: 'Dashboard', href: '/', icon: 'fa-solid fa-gauge-high' },
  {
    type: 'group',
    label: 'Dashboards',
    icon: 'fa-solid fa-chart-line',
    children: [
      { type: 'item', label: 'Sales', href: '/dashboard/sales' },
      { type: 'item', label: 'Marketing', href: '/dashboard/marketing' },
      { type: 'item', label: 'Projects', href: '/dashboard/projects', badge: 'New' },
    ],
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      menuItems={menuItems}
      brandName="CoolAdmin"
      user={{ name: 'John Doe', role: 'Admin', avatarSrc: '/assets/img/avatar-01.jpg' }}
    >
      {children}
    </DashboardLayout>
  )
}
```

### 3. A page

```tsx
// app/(dashboard)/page.tsx
import { PageHeader, StatCard, MCard, MButton } from '@cooladmin/react'

export default function Page() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back"
        actions={<MButton icon="fa-solid fa-plus">New report</MButton>}
      />
      <div className="row g-3">
        <div className="col-md-6 col-xl-3">
          <StatCard label="Members online" value="10 368" icon="fa-solid fa-users" color="c1"
            delta={3.2} deltaDirection="up" deltaPeriod="vs last week" sparkline={[3, 5, 4, 7, 6, 8]} />
        </div>
      </div>
      <MCard title="Recent activity" subtitle="Last 7 days">…</MCard>
    </>
  )
}
```

## Components

| Area | Exports |
| --- | --- |
| **Layout** | `DashboardLayout`, `AuthLayout`, `ErrorLayout`, `AppContent`, `PageHeader`, `Sidebar`, `SidebarBrand`, `SidebarNav`, `SidebarNavItem`, `SidebarOverlay`, `Topbar`, `TopbarSearch`, `TopbarMenu`, `AccountMenu`, `Footer`, `SkipLink` |
| **Widgets** | `MCard`, `StatCard`, `Sparkline`, `Chart`, `RankList`, `StatusPill`, `PriorityChip`, `Avatar`, `AvatarGroup`, `EmptyState`, `Skeleton`, `ToastContainer`, `CommandPalette`, `ThemeSwitcher`, `SectionEyebrow`, `ActivityList`, `TaskList`, `ProgressBar`, `Alert`, `Badge`, `Tabs`, `Modal`, `Pagination`, `DataTable`, `Wizard` |
| **Forms** | `MButton`, `IconButton`, `Input`, `Select`, `Textarea`, `Switch`, `Checkbox`, `Radio`, `DateChip` |
| **Contexts** | `SidebarProvider`/`useSidebar`, `ColorModeProvider`/`useColorMode`, `AccentProvider`/`useAccent`, `ToastProvider`/`useToast`, `CommandPaletteProvider`/`useCommandPalette`, `LinkProvider`/`useLinkComponent` |
| **Hooks** | `useMediaQuery`, `useLocalStorage`, `useKeyboardShortcut`, `useBodyClass`, `useIsomorphicLayoutEffect`, `useClickOutside`, `useDisclosure` |
| **Lib** | `cn`, `flattenMenuToCommands`, `storage` |
| **Types** | `MenuNode`, `MenuItemNode`, `MenuGroupNode`, `MenuHeaderNode`, `ColorMode`, `AccentPreset`, `AccentPresetInfo`, `Command`, `ToastOptions`, `ToastType`, `LinkComponent`, `LinkProps`, `DashboardUser` |

Icons are Font Awesome class strings (`icon="fa-solid fa-chart-line"`).

## Theming

- **Accent presets** — `AccentProvider` puts `theme-{blue|purple|teal|rose|amber|graphite}` on
  `<body>`; each preset sets `--m-accent`, `--m-accent-rgb`, `--m-accent-hover`, `--m-accent-soft`.
  Switch with `useAccent().setAccent('teal')` or the floating `ThemeSwitcher`.
- **Dark mode** — `ColorModeProvider` sets `data-bs-theme="light|dark"` on `<html>` (`'auto'`
  follows `prefers-color-scheme`). CoolAdmin has no dark `--m-*` tokens; this library authors them
  under `[data-bs-theme="dark"] body.app`.
- **Sidebar** — `sidebar-collapsed` (desktop 72px icon rail) and `sidebar-open` (mobile drawer,
  below 992px) body classes.
- **localStorage keys** — `cooladmin.accent`, `cooladmin.color-mode`, `cooladmin.sidebar`
  (`{ "collapsed": boolean }`).

## Roadmap

**Phase 1 (done)** — app shell (sidebar, topbar, command palette, toasts, theme switcher),
auth + error layouts, the four CoolAdmin dashboards (`index`, `index2`, `index3`, `index4` →
`/`, `/dashboard/sales`, `/dashboard/marketing`, `/dashboard/projects`) and the core widgets.

**Phase 2 (done)** — the remaining CoolAdmin pages in the demo: Charts, Tables + Data table,
Forms + Wizard, Calendar (FullCalendar 7, vendored and lazy-loaded), Maps (Leaflet 1.9.4 from
unpkg, lazy-loaded), Inbox, Kanban, Notifications, Docs, Account & settings, Pricing, Invoice,
and the UI showcase pages (Buttons, Badges, Tabs, Cards, Alerts, Progress bars, Modals,
Switches, Grid, Icons, Typography) — plus the `Alert`, `Badge`, `Tabs`, `Modal`, `Pagination`,
`DataTable`, `Wizard`, `Textarea`, `Radio` components they needed.

**Next** — first tagged release, Storybook or per-component docs, and optional npm-based
FullCalendar / Leaflet wrappers in the library.

## Development

```bash
pnpm install
pnpm dev          # tsup --watch + sass --watch
pnpm demo         # Next.js demo at http://localhost:3000
pnpm type-check && pnpm lint && pnpm test && pnpm build
```

See [CLAUDE.md](./CLAUDE.md) for the architecture notes and [CHANGELOG.md](./CHANGELOG.md) for
release history.

## License

MIT — see [LICENSE](./LICENSE). Portions derived from CoolAdmin © 2018-2026 Colorlib and
adminlte-react © Colorlib, both MIT.
