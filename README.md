# CoolAdmin React

[![npm version](https://img.shields.io/npm/v/%40madhusudan-hegde%2Fcooladmin-react.svg?logo=npm&logoColor=white)](https://www.npmjs.com/package/@madhusudan-hegde/cooladmin-react)
[![GitHub stars](https://img.shields.io/github/stars/madhusudan-hegde/cooladmin-react.svg?style=flat&logo=github)](https://github.com/madhusudan-hegde/cooladmin-react/stargazers)
[![CI](https://github.com/madhusudan-hegde/cooladmin-react/actions/workflows/ci.yml/badge.svg)](https://github.com/madhusudan-hegde/cooladmin-react/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#license)
[![React 19](https://img.shields.io/badge/React-19-149eca.svg?logo=react&logoColor=white)](https://react.dev)
[![Next.js App Router](https://img.shields.io/badge/Next.js-App%20Router-000000.svg?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Bootstrap 5.3](https://img.shields.io/badge/Bootstrap-5.3-7952b3.svg?logo=bootstrap&logoColor=white)](https://getbootstrap.com/docs/5.3/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

The CoolAdmin admin dashboard design, re-implemented as a **React 19 component library** that
works with any router — Next.js App Router (React Server Components by default, client islands
only where interaction needs them), Vite + React Router, Remix … Bootstrap 5.3 underneath, and
CoolAdmin's own CSS class vocabulary kept verbatim so the markup looks exactly like the original
template.

**Status:** `0.2.0` — all 35 CoolAdmin pages ported, framework-agnostic routing. Package:
[`@madhusudan-hegde/cooladmin-react`](https://www.npmjs.com/package/@madhusudan-hegde/cooladmin-react)
· Source: [github.com/madhusudan-hegde/cooladmin-react](https://github.com/madhusudan-hegde/cooladmin-react)

> **If this saves you time, please [⭐ star the repo](https://github.com/madhusudan-hegde/cooladmin-react)** —
> it is the easiest way to support the project and helps others find it. See [Support & contributing](#support--contributing).

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

Use it in **any React 19 project** — Next.js, Vite + React Router, Remix … — as a regular
dependency. The core has no framework dependency; a one-line adapter connects your router
(see [Routing](#routing-next-js-react-router-or-anything-else)).

```bash
# pnpm
pnpm add @madhusudan-hegde/cooladmin-react

# npm
npm install @madhusudan-hegde/cooladmin-react

# yarn
yarn add @madhusudan-hegde/cooladmin-react
```

### Requirements

| Dependency | Version | Notes |
| --- | --- | --- |
| `react`, `react-dom` | `^19` | peer dependencies |
| `next` | `>=14` (App Router) | **optional** — only for the `/next` adapter (`NextNavigationProvider`) |
| `react-router` | `^7` | **optional** — only for the `/react-router` adapter (`ReactRouterNavigationProvider`) |
| `chart.js` | `^4.5` | **optional** — only if you render `<Chart>` or `<Sparkline>`; loaded via dynamic import |
| Bootstrap 5.3 CSS + bundle JS, Font Awesome 7 Free, Inter font | — | **you** load these (CDN links in the Quick start below); the library ships only its own stylesheet |

```bash
pnpm add react react-dom next
pnpm add chart.js        # optional
```

### What you get

- `@madhusudan-hegde/cooladmin-react` — every component, hook, provider and type (ESM, tree-shakeable,
  React Server Components by default, `'use client'` only on interactive modules).
- `@madhusudan-hegde/cooladmin-react/css` — the compiled CoolAdmin stylesheet (`--m-*` design tokens,
  six accent presets, dark mode). Import it once in your root layout.

### Three steps to a working dashboard

1. **Root layout** — import the CSS, add the Bootstrap / Font Awesome / Inter CDN tags (step 1 of the Quick start).
2. **Dashboard layout** — wrap your routes in `<DashboardLayout menuItems={…}>` with your own menu (step 2).
3. **Pages** — compose `PageHeader`, `MCard`, `StatCard`, `DataTable`, `Tabs`, `Modal`, forms … (step 3).

The `demo/` folder in this repo is a complete Next.js 16 app with all 35 CoolAdmin pages
(dashboards, tables, forms, calendar, maps, inbox, kanban, settings, pricing, invoice, and the
UI showcase) — copy it as a starter or browse it for real usage of every component. Run it locally with
`pnpm install && pnpm build && pnpm demo`.

### Starting a brand-new app from the demo

```bash
git clone https://github.com/madhusudan-hegde/cooladmin-react.git my-admin
cd my-admin/demo
# replace "workspace:*" with the published version, then delete the pages you don't need
pnpm add @madhusudan-hegde/cooladmin-react@latest
pnpm install && pnpm dev
```

### Upgrading

```bash
pnpm up @madhusudan-hegde/cooladmin-react@latest
```

Releases follow [semver](https://semver.org); every change is listed in [CHANGELOG.md](./CHANGELOG.md).
While the major version is `0`, minor bumps may contain breaking changes — pin `~0.x.y` if you need stability.

## Quick start

### 1. Root layout — CSS, CDN assets, fonts

```tsx
// app/layout.tsx
import '@madhusudan-hegde/cooladmin-react/css'
import './globals.css'

export const metadata = { title: { default: 'CoolAdmin React', template: '%s · CoolAdmin React' } }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
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
import { DashboardLayout } from '@madhusudan-hegde/cooladmin-react'
import { NextNavigationProvider } from '@madhusudan-hegde/cooladmin-react/next'
import type { MenuNode } from '@madhusudan-hegde/cooladmin-react'

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
    <NextNavigationProvider>
      <DashboardLayout
        menuItems={menuItems}
        brandName="CoolAdmin"
        user={{ name: 'John Doe', role: 'Admin', avatarSrc: '/assets/img/avatar-01.jpg' }}
      >
        {children}
      </DashboardLayout>
    </NextNavigationProvider>
  )
}
```

`NextNavigationProvider` is the only Next-specific line: it gives the sidebar `usePathname()`,
the ⌘K palette `router.push()`, and every link `next/link`.

### 3. A page

```tsx
// app/(dashboard)/page.tsx
import { PageHeader, StatCard, MCard, MButton } from '@madhusudan-hegde/cooladmin-react'

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

## Routing: Next.js, React Router, or anything else

The core never imports a router. Sidebar active states, command-palette navigation and links
all read from a tiny **navigation adapter** (`{ pathname, navigate, linkComponent }`):

| Host | Wrap your layout in | Import from |
| --- | --- | --- |
| Next.js App Router | `<NextNavigationProvider>` | `@madhusudan-hegde/cooladmin-react/next` |
| React Router 7 (Vite, Remix …) | `<ReactRouterNavigationProvider>` (inside your `<BrowserRouter>`) | `@madhusudan-hegde/cooladmin-react/react-router` |
| Anything else | `<NavigationProvider pathname={…} navigate={…} linkComponent={…}>` | `@madhusudan-hegde/cooladmin-react` |
| No router at all | nothing | — falls back to `window.location` (full-page navigation) |

```tsx
// Vite + React Router
import { BrowserRouter, Routes, Route } from 'react-router'
import { DashboardLayout } from '@madhusudan-hegde/cooladmin-react'
import { ReactRouterNavigationProvider } from '@madhusudan-hegde/cooladmin-react/react-router'
import '@madhusudan-hegde/cooladmin-react/css'

<BrowserRouter>
  <ReactRouterNavigationProvider>
    <DashboardLayout menuItems={menuItems}>
      <Routes>…</Routes>
    </DashboardLayout>
  </ReactRouterNavigationProvider>
</BrowserRouter>
```

Outside Next.js put `class="app"` on `<body>` in your HTML (every style is scoped under
`body.app`); the library keeps the rest of the body classes in sync at runtime. A complete
runnable example lives in [`examples/vite-react-router`](./examples/vite-react-router).

## Components

| Area | Exports |
| --- | --- |
| **Layout** | `DashboardLayout`, `AuthLayout`, `ErrorLayout`, `AppContent`, `PageHeader`, `Sidebar`, `SidebarBrand`, `SidebarNav`, `SidebarNavItem`, `SidebarOverlay`, `Topbar`, `TopbarSearch`, `TopbarMenu`, `AccountMenu`, `Footer`, `SkipLink` |
| **Widgets** | `MCard`, `StatCard`, `Sparkline`, `Chart`, `RankList`, `StatusPill`, `PriorityChip`, `Avatar`, `AvatarGroup`, `EmptyState`, `Skeleton`, `ToastContainer`, `CommandPalette`, `ThemeSwitcher`, `SectionEyebrow`, `ActivityList`, `TaskList`, `ProgressBar`, `Alert`, `Badge`, `Tabs`, `Modal`, `Pagination`, `DataTable`, `Wizard` |
| **Forms** | `MButton`, `IconButton`, `Input`, `Select`, `Textarea`, `Switch`, `Checkbox`, `Radio`, `DateChip` |
| **Contexts** | `SidebarProvider`/`useSidebar`, `ColorModeProvider`/`useColorMode`, `AccentProvider`/`useAccent`, `ToastProvider`/`useToast`, `CommandPaletteProvider`/`useCommandPalette`, `LinkProvider`/`useLinkComponent`, `NavigationProvider`/`useNavigation`/`usePathname`/`useNavigate` |
| **Adapters** | `/next` → `NextNavigationProvider`, `NextNavLink` · `/react-router` → `ReactRouterNavigationProvider`, `ReactRouterNavLink` |
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

**0.2.0 (done)** — framework-agnostic routing: the core dropped `next/navigation`; Next.js and
React Router adapters ship as subpath exports, with a Vite + React Router example.

**Next** — Storybook or per-component docs, a TanStack Router adapter, and optional npm-based
FullCalendar / Leaflet wrappers in the library. Vote or comment on the
[issues](https://github.com/madhusudan-hegde/cooladmin-react/issues) to influence priorities.

## Support & contributing

This is a free, MIT-licensed project maintained in spare time. If it is useful to you:

- **⭐ Star the repository** on [GitHub](https://github.com/madhusudan-hegde/cooladmin-react) — it
  is the quickest way to say thanks and it helps other developers discover the library.
- **👀 Watch** the repo to get notified about new releases.
- **🐛 Report bugs / request features** via
  [GitHub Issues](https://github.com/madhusudan-hegde/cooladmin-react/issues) — please include the
  package version, Next.js version and a minimal reproduction.
- **💬 Ask questions or share what you built** in
  [GitHub Discussions](https://github.com/madhusudan-hegde/cooladmin-react/discussions).
- **🔧 Contribute** — pull requests are welcome. Fork, create a branch, run
  `pnpm type-check && pnpm lint && pnpm test && pnpm build`, and open a PR describing the change.
  Good first contributions: new accent presets, accessibility fixes, component docs, and porting
  the routing layer to be framework-agnostic (see Roadmap).
- **📣 Spread the word** — a mention in a blog post, tweet or your project's README goes a long way.

Thank you for supporting open source!

## Development

```bash
pnpm install
pnpm dev          # tsup --watch + sass --watch
pnpm demo         # Next.js demo at http://localhost:3000
pnpm type-check && pnpm lint && pnpm test && pnpm build
```

See [CLAUDE.md](./CLAUDE.md) for the architecture notes and [CHANGELOG.md](./CHANGELOG.md) for
release history.

### Releasing (automatic, from commit messages)

Versions are never bumped by hand. Every push to `main` runs
[`release.yml`](./.github/workflows/release.yml): after the checks pass,
[semantic-release](https://semantic-release.gitbook.io) reads the
[Conventional Commits](https://www.conventionalcommits.org) since the last `v*` tag, picks the
semver bump, publishes to npm, tags the commit, creates a GitHub Release with generated notes and
commits the new `package.json` version back (`chore(release): vX.Y.Z [skip ci]`).

| Commit message | Release |
| --- | --- |
| `fix: …`, `perf: …`, `refactor: …`, `revert: …`, `style(scss): …` | **patch** (0.2.0 → 0.2.1) |
| `feat: …` | **minor** (0.2.0 → 0.3.0) |
| `feat!: …` or a `BREAKING CHANGE:` footer | **major** (0.2.0 → 1.0.0) |
| `docs: …`, `chore: …`, `test: …`, `ci: …`, `build: …` | no release |

Scopes are free-form (`feat(tabs): …`, `fix(data-table): …`). Several commits in one push are
combined into a single release; the highest bump wins. Write the CHANGELOG entry for
user-visible changes in the same commit — the GitHub Release notes are generated from commit
subjects, the CHANGELOG stays the curated, human-written history.

## License

MIT — see [LICENSE](./LICENSE). Portions derived from CoolAdmin © 2018-2026 Colorlib and
adminlte-react © Colorlib, both MIT.
