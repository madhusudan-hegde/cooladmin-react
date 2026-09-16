# Changelog

All notable changes to **@cooladmin/react** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - Unreleased

The CoolAdmin 3.4.0 design re-implemented as a React 19 / Next.js App Router component
library, following the architecture of adminlte-react (ESM-only, per-file tsup output with
preserved `'use client'` boundaries, bundled `.d.ts`, `fix-dist` post-processing). Phase 1 was
the app shell, dashboards and core widgets; Phase 2 ported every remaining CoolAdmin page.

### Added (Phase 2)

- **Widgets** — `Alert` (dismissible, `onDismiss`), `Badge` (`variant`, `pill`, `soft`, `icon`),
  `Tabs` (`tabs` / `pills` / `settings` variants, vertical, roving tabindex + arrow keys, no
  Bootstrap JS), `Modal` (portal, focus trap, Esc / backdrop close, `staticBackdrop`, sizes,
  `centered`, `scrollable`, body `modal-open` handling), `Pagination`, `DataTable<T>` (search,
  sort with `aria-sort`, page size, "Showing x–y of z", optional row selection, `EmptyState` on
  no results), `Wizard` (`.wizard__steps` / `.wizard__pane`, controlled or uncontrolled,
  `canProceed`, `onFinish`).
- **Forms** — `Textarea`, `Radio` (`inline`).
- **Hooks** — `useDisclosure`.
- **Stylesheet** — new per-page partials `pages/_calendar.scss` (FullCalendar 7 classic-theme
  tokens rebound to `--m-*`, incl. dark mode), `pages/_map.scss` (Leaflet controls/popups on
  tokens, dark tile filter), `pages/_icons.scss`; additions to `_badges`, `_feedback` (alerts),
  `_cards`, `_utilities`, `pages/_tabs`, `pages/_data-table`, `pages/_wizard`, `pages/_inbox`,
  `pages/_kanban`, `pages/_notifications`, `pages/_pricing`, `pages/_invoice`, `pages/_docs`.
- **Demo** — all 25 remaining CoolAdmin pages: `/charts`, `/tables`, `/tables/data`, `/forms`,
  `/forms/wizard`, `/calendar` (FullCalendar 7, vendored under `demo/public/vendor/`, loaded
  lazily), `/maps` (Leaflet 1.9.4 from unpkg, loaded lazily), `/inbox`, `/kanban` (HTML5
  drag-and-drop + keyboard "Move to…"), `/notifications`, `/docs` (rewritten for this library),
  `/account/profile`, `/account/pricing`, `/account/invoice`, and the UI showcase pages
  `/ui/{buttons,badges,tabs,cards,alerts,progress,modals,switches,grid,icons,typography}`.
  `demo/lib/load-external.ts` provides `loadScript` / `loadStyle` for vendor assets. All routes
  are listed in `demo/tests/routes.ts`.

### Added (Phase 1)

- `ErrorLayout` accepts optional `commands` to mount a command palette (⌘K) on status pages, matching CoolAdmin's 404 "Search" action.
- `Chart` resolves `var(--m-*)` token strings inside `data`/`options` before handing them to Chart.js (`resolveTokens` is exported).
- `ProgressBar` gains `ariaLabel` for an accessible name independent of the visible label.

- **App shell** — `DashboardLayout` (RSC shell nesting `ColorModeProvider` → `AccentProvider` →
  `SidebarProvider` → `ToastProvider` → `CommandPaletteProvider`), `Sidebar` / `SidebarBrand` /
  `SidebarNav` / `SidebarNavItem` / `SidebarOverlay`, `Topbar` / `TopbarSearch` / `TopbarMenu` /
  `AccountMenu`, `AppContent`, `PageHeader`, `Footer`, `SkipLink`; plus `AuthLayout` and
  `ErrorLayout` for the full-page routes.
- **Contexts & hooks** — `useSidebar` (collapsed rail + mobile drawer, 992px breakpoint),
  `useColorMode` (`light` / `dark` / `auto` via `data-bs-theme`), `useAccent` (six accent presets:
  blue, purple, teal, rose, amber, graphite), `useToast`, `useCommandPalette` (⌘K), `useLinkComponent`;
  `useMediaQuery`, `useLocalStorage`, `useKeyboardShortcut`, `useBodyClass`, `useIsomorphicLayoutEffect`.
- **Widgets** — `MCard`, `StatCard` (with optional `Sparkline`), `Sparkline` and `Chart`
  (Chart.js 4 via dynamic import — optional peer), `RankList`, `StatusPill`, `PriorityChip`,
  `Avatar` / `AvatarGroup`, `EmptyState`, `Skeleton`, `ToastContainer`, `CommandPalette`,
  `ThemeSwitcher` (accent swatches + dark-mode toggle), `SectionEyebrow`, `ActivityList`,
  `TaskList`, `ProgressBar`.
- **Forms** — `MButton`, `IconButton`, `Input`, `Select`, `Switch`, `Checkbox`, `DateChip`.
- **Menu model** — `MenuNode` (`header | item | group`) drives both the sidebar and the command
  palette through `flattenMenuToCommands()`.
- **Stylesheet** — `@cooladmin/react/css` (`dist/css/cooladmin.css`), compiled with sass from
  CoolAdmin's modern `--m-*` SCSS overlay (scoped under `body.app`), with newly authored dark-mode
  tokens under `[data-bs-theme="dark"] body.app`. The legacy `theme.css` / `--ca-*` / Poppins layer
  is not ported.
- **Demo** (`demo/`) — Next.js 16 App Router app with the four CoolAdmin dashboards
  (`/`, `/dashboard/sales`, `/dashboard/marketing`, `/dashboard/projects`), auth pages
  (`/login`, `/register`, `/forgot-password`) and error pages (`/errors/404`, `/errors/500`,
  `/errors/maintenance`); Playwright route-smoke + axe a11y tests.
- **Tooling** — Vitest (jsdom) unit tests, ESLint (typescript-eslint + react-hooks), strict
  TypeScript, GitHub Actions CI with an RSC-boundary check on `dist/`.

### Fixed

- `cn()` now accepts any `ReactNode`-shaped truthy value (`error && 'is-invalid'` no longer fails the d.ts build); only non-empty strings are emitted.
- Auth pages: the generic form-label rule no longer overrides `.login-checkbox > label`, so "Remember me" renders inline with its custom checkbox.

### Notes

- Persistence keys: `cooladmin.accent`, `cooladmin.color-mode`, `cooladmin.sidebar`.
- The consumer provides Bootstrap 5.3.8 (CSS + bundle JS), Font Awesome 7.3.1 Free and the Inter
  font via CDN; the library ships only its own compiled stylesheet.
- Credits: design by [Colorlib](https://colorlib.com) — derived from
  [CoolAdmin](https://github.com/puikinsh/CoolAdmin) and
  [adminlte-react](https://github.com/ColorlibHQ/adminlte-react), both MIT.
