# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@cooladmin/react` — the CoolAdmin 3.4.0 admin template (Bootstrap 5.3, Colorlib) re-implemented as a React 19 component library for the Next.js App Router (React Server Components). It deliberately copies the architecture and conventions of `adminlte-react` (see "Upstream references"). **The repo root _is_ the library** (the published npm package). It is also a small pnpm workspace: the root package is the library, and `demo/` is a Next.js 16 App Router app that dogfoods it via `"@cooladmin/react": "workspace:*"` (pnpm symlinks `demo/node_modules/@cooladmin/react` → repo root).

- Root (`src/`, `package.json` named `@cooladmin/react`, `tsup.config.ts`, `dist/`) — the publishable library
- `demo/` — demo + dev playground; consumes the library through the workspace link

Testing: `pnpm test` runs Vitest (jsdom) unit tests colocated in `src/` (`*.test.ts(x)`); the demo has Playwright tests (`cd demo && pnpm test` — route smoke + axe a11y, starts its own dev server on port 3210, system Chrome channel; Next refuses a second dev server per project, so when one is already running pass `DEMO_PORT=<its port>` to reuse it). `pnpm lint` runs ESLint (`eslint.config.mjs`: typescript-eslint + react-hooks) over `src/`; `pnpm type-check` (`tsc --noEmit`) is the strict type gate. CI (`.github/workflows/ci.yml`) runs type-check, lint, unit tests, the library build (plus an RSC-boundary check on `dist/`), and the demo type-check + build.

## Commands

From the repo root (these operate on the **library**):

```bash
pnpm build        # tsup → build:css (sass) → fix-dist (see "The build pipeline")
pnpm build:css    # sass src/scss/cooladmin.scss → dist/css/cooladmin.css
pnpm dev          # concurrently: tsup --watch + sass --watch
pnpm type-check   # tsc --noEmit — the primary check before considering library work done
pnpm lint         # ESLint over src/
pnpm test         # Vitest unit tests (src/**/*.test.*)
pnpm demo         # run the demo app (next dev) — alias for the demo workspace
pnpm demo:build   # production build of the demo
```

Demo-only (`cd demo`): `next dev` / `next build` / `next start` / `pnpm type-check` / `pnpm test` (Playwright: `test:smoke`, `test:a11y`).

The demo imports the compiled `dist/`, not `src/`. After editing library source, rebuild it (`pnpm build`, or keep `pnpm dev` running) before the demo reflects the change — run `pnpm dev` and `pnpm demo` side by side during development. The user runs `pnpm install` and native/destructive commands themselves — write code that compiles, don't run installs.

## The build pipeline (per-file ESM, RSC boundaries preserved)

`tsup` (esbuild) compiles every `src/` module **unbundled** (`bundle: false`, ESM-only, no sourcemaps) to a mirrored `dist/` tree, plus a single bundled `dist/index.d.ts` from `src/index.ts`. The build is **three sequential steps** (`tsup && build:css && fix-dist`):

1. `tsup` — per-file transform of `src/**/*.ts(x)` (tests and `src/scss/**` excluded). Each module keeps its own `'use client'` (or lack of one), so the RSC/client split in `src/` **is** the published artifact.
2. `build:css` — `sass src/scss/cooladmin.scss dist/css/cooladmin.css --no-source-map --style=expanded`. This is the **only** stylesheet the package ships (the `./css` export). Unlike adminlte-react there is no upstream npm CSS to copy — the SCSS is ported into this repo.
3. `fix-dist` — `fix-dist.js` (a) re-applies `"use client"` to any dist file whose source declares it (safety net), and (b) rewrites relative specifiers to be fully specified (`'./foo'` → `'./foo.js'`) — required because webpack enforces fully-specified ESM imports inside `node_modules`. It exits non-zero if a specifier can't be resolved.

**Critical implications:** the package is ESM-only (no CJS) — `exports['.']` has `types`/`import`/`default` only. Relative imports must be **extensionless file paths, never directory imports** (fix-dist resolves `./x` → `x.js` or `x/index.js`; `src/index.ts` is the only barrel). CI verifies the src↔dist client-module counts match and that `dist/form/m-button.js` stays unmarked.

`chart.js` is an **optional peer dependency** — never bundled or statically imported. It is loaded via dynamic `import()` (unbundled output keeps the specifier as written), so consumers who don't use `Chart`/`Sparkline` never download it, and Next code-splits it per page.

## Architecture

### RSC vs. client split (authoring model)

**Pure-presentational** components have no directive and are RSC: `dashboard-layout`, `auth-layout`, `error-layout`, `app-content`, `page-header`, `footer`, `skip-link`, `m-card`, `stat-card` (the `Sparkline` child is the client island), `rank-list`, `status-pill`, `priority-chip`, `avatar`, `empty-state`, `skeleton`, `section-eyebrow`, `activity-list`, `progress-bar`, `m-button`, `icon-button`, `input`, `select`, `date-chip`. **Interactive** modules start with `'use client'`: every `context/*` provider, `sidebar-nav` (uses `usePathname` from `next/navigation`), `sidebar-toggle`/topbar dropdowns, `topbar-search`, `theme-switcher`, `command-palette`, `toast`, `sparkline`, `chart`, `task-list`, `switch`, `checkbox` (if controlled), and all `hooks/*`. Only add `'use client'` when a component genuinely needs state, effects, event handlers, browser APIs or `next/navigation`. `grep -rl "'use client'" src` shows the current set. Shared pure helpers that Server Components call (`lib/flatten-menu.ts`, `lib/class-name.ts`) must live outside `'use client'` modules.

### DashboardLayout = RSC shell + nested client providers

`layout/dashboard-layout.tsx` is an RSC that renders `<body className="app …">` server-side, then nests client providers in **this order**: `ColorModeProvider` → `AccentProvider` → `SidebarProvider` → `ToastProvider` → `CommandPaletteProvider`. Inside, it renders `.page-wrapper > Sidebar + .page-container > Topbar + AppContent(children)` and mounts headless/floating pieces: `BodyClassSync` (mirrors provider state onto `document.body`), `CommandPalette`, `ToastContainer`, `ThemeSwitcher` (unless `showThemeSwitcher={false}`), `SkipLink`. `AuthLayout` and `ErrorLayout` wrap only `ColorModeProvider` + `AccentProvider` and render `body.app.auth-page` / `body.app.error-page`.

### Runtime state model (body classes, html attribute, localStorage)

- `<body>` classes: `app` (always, server-rendered — never remove it; every SCSS rule is scoped under it) | `sidebar-collapsed` (desktop 72px icon rail) | `sidebar-open` (mobile drawer below 992px, rendered together with a `.sidebar-backdrop` element) | `theme-blue|theme-purple|theme-teal|theme-rose|theme-amber|theme-graphite` (accent preset, default blue). Breakpoint constant `MOBILE_BP = 992` in TS, `991.98px` in SCSS.
- `<html data-bs-theme="light|dark">` — set by `ColorModeProvider` from `mode: 'light'|'dark'|'auto'` (`auto` resolves via `prefers-color-scheme`).
- localStorage keys: **`cooladmin.accent`**, **`cooladmin.color-mode`**, **`cooladmin.sidebar`** (JSON `{ collapsed }`). Always go through `lib/storage.ts` (try/catch-safe JSON get/set) — never touch `localStorage` directly.

### Single menu data structure drives nav + command palette

`types/menu.ts` defines `MenuNode`, a discriminated union of `header | item | group` (`{ type:'header', label } | { type:'item', label, href, icon?, badge? } | { type:'group', label, icon?, children: MenuNode[] }`). The same array feeds the recursive `SidebarNavItem` tree **and** `flattenMenuToCommands(menuItems)` for the command palette (`Command = { id, label, group, icon?, href?, onSelect?, keywords? }`). Consumers define one `menuItems` array (see `demo/lib/menu.ts`, ported from CoolAdmin's `src/pug/partials/_nav-data.pug`) and pass it to `DashboardLayout`; extra palette entries go in via the `commands` prop.

### Chart.js dynamic-import pattern

`widget/chart.tsx` and `widget/sparkline.tsx` do `const { Chart, registerables } = await import('chart.js')` inside `useEffect`, register once, guard against unmount-before-resolve (a `cancelled` flag), and call `chart.destroy()` in the cleanup. `Chart` re-renders when `data`/`options` change and applies CoolAdmin's default font/tooltip styling; `Sparkline` uses CoolAdmin's `sparklineOptions` (no axes, tension .4, gradient fill). Follow this pattern for any future heavy dependency and declare it as an optional peer.

### Next.js coupling

`next` is an **optional** peer dependency, but `layout/sidebar-nav.tsx` imports `usePathname` from `next/navigation` for active-link detection — so the sidebar in practice requires Next. Links render through `LinkProvider`/`useLinkComponent()` (default: plain `<a href>`); the demo injects `next/link` via `demo/components/nav-link.tsx`.

### What the library ships vs. what the consumer provides

The library ships JS + **only** `dist/css/cooladmin.css` (import via `'@cooladmin/react/css'`). Everything else is the consumer's responsibility, loaded via CDN in `demo/app/layout.tsx`:

- **Bootstrap 5.3.8** CSS and **bundle JS** (`bootstrap.bundle.min.js`, needed for dropdowns/collapse/modals; Popper included)
- **Font Awesome 7.3.1 Free** CSS — icons are FA class strings (`fa-solid fa-chart-line`)
- **Inter** from `https://rsms.me/inter/inter.css` (with `preconnect`)
- `chart.js` installed by the consumer if `Chart`/`Sparkline` are used

**Gotcha:** markup that Bootstrap JS decorates on load (e.g. `data-bs-toggle` tabs/dropdowns) must render its final attributes (`aria-expanded`, `aria-selected`, `tabIndex={-1}`) in JSX, or Bootstrap's DOM mutations race React hydration and cause mismatch errors. When adding a component that needs runtime JS or CSS the library doesn't bundle, document the CDN requirement and mirror it in the demo's root layout.

## SCSS conventions (`src/scss/`)

- Entry `src/scss/cooladmin.scss` + `_partials`. Source of truth is CoolAdmin's **modern `--m-*` overlay**: `D:\Others\workspace\CoolAdmin\src\scss\app\*.scss`, `_variables.scss`, `_theme-presets.scss`. The legacy `theme.css` / `--ca-*` / Poppins layer is **dropped**; port only the legacy classes modern pages actually use (`.au-input`, `.au-checkbox`, `.status--*`, `.table-data`, `.copyright`).
- **Every overlay rule stays scoped under `body.app`** exactly as in CoolAdmin (needed to beat Bootstrap specificity). Don't "simplify" selectors.
- **CoolAdmin class names verbatim** in both SCSS and React markup — `.page-wrapper .page-container .main-content .section__content--p30 .page-header .m-card .m-card__header .stat-card .stat-card__delta--up .m-btn .m-btn--primary .icon-btn .rank-list__* .status--approved .toast--success .cmdk-overlay .theme-switcher__* .menu-sidebar .navbar-sidebar .header-wrap .account-dropdown .login-wrap .error-card` etc. Derive exact markup from CoolAdmin's built HTML (`index.html`, `index2-4.html`, `login.html`, `404.html`) and `src\pug\partials\*.pug`.
- Accent presets are `body.app.theme-{name}` blocks setting `--m-accent`, `--m-accent-rgb`, `--m-accent-hover`, `--m-accent-soft`.
- **Dark mode is authored here** (CoolAdmin has none for `--m-*`): redefine the tokens under `[data-bs-theme="dark"] body.app` — tokens only, never per-component color overrides.
- No Sass output beyond `dist/css/cooladmin.css`; no CSS modules, no styled-jsx, no inline style objects for things a class covers.

## Demo (`demo/`)

- Next.js 16 App Router, `@/*` → `./*`. Route groups: `(dashboard)` (layout → `demo/components/demo-layout.tsx`, which wraps `DashboardLayout` with `menuItems` from `demo/lib/menu.ts`, brand, user and topbar menus), `(auth)` (`AuthLayout`: `/login`, `/register`, `/forgot-password`), `(error)` (`ErrorLayout`: `/errors/404`, `/errors/500`, `/errors/maintenance`). Every CoolAdmin page is ported: pages are server components under `(dashboard)/<route>/page.tsx` with `export const metadata = { title }` + `PageHeader`; interactive pieces live in `demo/components/<page>-*.tsx` (`'use client'`); sample data in plain modules `demo/lib/<page>-data.ts`.
- **Vendor assets the library does not bundle** (FullCalendar 7 under `demo/public/vendor/fullcalendar-7.0.2/`, Leaflet 1.9.4 from unpkg) are loaded lazily on the client via `demo/lib/load-external.ts` (`loadScript` / `loadStyle`, dedup by URL) inside the page's client component, with `destroy()` / `map.remove()` on unmount; globals are typed minimally in `demo/types/vendor.d.ts`. They are deliberately not npm dependencies — do not add them to `package.json` without asking.
- Do not use Bootstrap's JS for tabs, modals or collapse (hydration races): `Tabs`, `Modal` and React state cover those. `data-bs-toggle="dropdown"` is acceptable only with all final attributes in JSX.
- **Title template gotcha:** every route sets a `<title>` via the `'%s · CoolAdmin React'` template. The template only reaches a layout's descendants, not across an ancestor's resolved string title — so it is defined in **each route-group layout**, not just the root. Server pages `export const metadata = { title: '…' }`; **client pages can't export metadata**, so they get a sibling `layout.tsx` with it. Never bake `· CoolAdmin React` into a page title (double suffix).
- Shared data consumed by both server and client files (menu, chart data) must live in plain modules — importing a value array from a `'use client'` module turns it into a client-reference proxy and crashes the server render.
- Static assets: `demo/public/assets/img/avatar-0N.jpg`, `avatar-big-01.jpg` (from CoolAdmin), `demo/public/favicon.svg`.
- Playwright: `demo/tests/routes.ts` is the explicit list of routes `smoke.spec.ts` loads (add new routes there); `a11y.spec.ts` gates on zero critical axe violations.

## Code style

Prettier (`.prettierrc`): **no semicolons**, single quotes, `es5` trailing commas, `printWidth` 100, `arrowParens: avoid`. TypeScript `strict` is on in the root `tsconfig.json`, which relaxes `noUnusedLocals` / `noUnusedParameters` / `noImplicitReturns` to `false` for the library; the demo has its own stricter `demo/tsconfig.json`.

Conventions: kebab-case filenames; **PascalCase named exports only** (no default exports); the props interface is colocated and exported (`export interface StatCardProps`); flat file-per-component (no per-component folders or `index.ts`); `cn()` from `lib/class-name.ts` instead of clsx. When adding a component: create it under the right `src/` folder (`layout` / `widget` / `form` / `context` / `hooks` / `lib`), export it from `src/index.ts`, and add public types to `src/types/` (`index.ts` re-exports all of `types/*`). Add a Vitest test next to it when it has logic worth testing.

## Upstream references (on disk)

- `D:\Others\workspace\CoolAdmin` — CoolAdmin 3.4.0 (design source): built HTML pages at the root, `src\scss\app\*.scss` (modern overlay), `src\pug\partials\*.pug` (markup), `js\main-vanilla.js` (theme switcher, command palette, sidebar behaviours to mirror in React).
- `D:\Others\workspace\adminlte-react` — adminlte-react (architecture source): `CLAUDE.md`, `tsup.config.ts`, `fix-dist.js`, `src/context/*`, `src/layout/dashboard-layout.tsx`, `src/widget/apex-chart.tsx` (dynamic-import reference), `demo/` structure and Playwright tests.
