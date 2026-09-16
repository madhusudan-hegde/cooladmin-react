import { Footer, MButton, PageHeader } from '@cooladmin/react'
import { DocsToc } from '@/components/docs-toc'
import { CodeBlock } from '@/components/docs-code'

export const metadata = { title: 'Documentation' }

const toc = [
  { id: 'install', label: 'Quick start' },
  { id: 'structure', label: 'File structure' },
  { id: 'themes', label: 'Color themes' },
  { id: 'typography', label: 'Typography' },
  { id: 'components', label: 'Components' },
  { id: 'js-apis', label: 'Hooks & APIs' },
  { id: 'charts', label: 'Chart configurations' },
  { id: 'new-page', label: 'Adding a new page' },
  { id: 'dark-mode', label: 'Dark mode' },
  { id: 'deploy', label: 'Deployment' },
]

function Anchor({ id }: { id: string }) {
  return (
    <a className="anchor" href={`#${id}`} aria-label="Link to this section">
      <i className="fa-solid fa-link" aria-hidden="true" />
    </a>
  )
}

const INSTALL = `# Install the library (React 19 + Next.js App Router)
pnpm add @cooladmin/react

# Optional peers — only if you use <Chart> / <Sparkline>
pnpm add chart.js`

const ROOT_LAYOUT = `// app/layout.tsx
import '@cooladmin/react/css'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Bootstrap 5.3 CSS + bundle JS, Font Awesome 7 Free and Inter — see "Deployment" */}
      </head>
      {children}
    </html>
  )
}`

const DASHBOARD_LAYOUT = `// app/(dashboard)/layout.tsx
import { DashboardLayout } from '@cooladmin/react'
import type { MenuNode } from '@cooladmin/react'

const menuItems: MenuNode[] = [
  { type: 'header', label: 'Overview' },
  { type: 'item', label: 'Dashboard', href: '/', icon: 'fa-solid fa-gauge-high' },
  {
    type: 'group',
    label: 'Tables',
    icon: 'fa-solid fa-table',
    children: [
      { type: 'item', label: 'Tables', href: '/tables' },
      { type: 'item', label: 'Data table', href: '/tables/data' },
    ],
  },
]

export default function Layout({ children }) {
  return (
    <DashboardLayout
      menuItems={menuItems}
      brandName="CoolAdmin"
      user={{ name: 'John Doe', role: 'Administrator', avatarSrc: '/assets/img/avatar-01.jpg' }}
    >
      {children}
    </DashboardLayout>
  )
}`

const STRUCTURE = `@cooladmin/react
├── dist/
│   ├── index.js                ESM barrel (per-file modules, RSC boundaries preserved)
│   ├── index.d.ts              bundled types
│   ├── css/cooladmin.css       the only stylesheet — import '@cooladmin/react/css'
│   ├── layout/                 DashboardLayout, AuthLayout, ErrorLayout, Topbar, Sidebar, PageHeader, Footer
│   ├── widget/                 MCard, StatCard, Chart, Sparkline, RankList, Tabs, Modal, DataTable, Toast …
│   ├── form/                   MButton, IconButton, Input, Select, Textarea, Radio, Checkbox, Switch
│   ├── context/                ColorMode, Accent, Sidebar, Toast, CommandPalette, Link providers
│   ├── hooks/                  useMediaQuery, useLocalStorage, useKeyboardShortcut, useDisclosure …
│   └── lib/                    cn(), storage, flattenMenuToCommands, chart theme helpers, color tokens
└── src/scss/                   the SCSS source of dist/css (tokens, presets, components, pages/*)`

const THEME_CLASS = `<body class="app theme-purple">`

const THEME_PROP = `<DashboardLayout menuItems={menuItems} initialAccent="teal" initialColorMode="auto">`

const THEME_HOOK = `'use client'
import { useAccent } from '@cooladmin/react'

export function AccentPicker() {
  const { accent, setAccent, presets } = useAccent()
  return (
    <select value={accent} onChange={e => setAccent(e.target.value as typeof accent)}>
      {presets.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
    </select>
  )
}`

const CUSTOM_THEME = `body.app.theme-mycolor {
    --m-accent:        #ff5722;
    --m-accent-rgb:    255, 87, 34;
    --m-accent-hover:  #e64a19;
    --m-accent-soft:   #fff3e0;
}`

const FONT_TOKEN = `body.app {
    --m-font: "Your Font", system-ui, sans-serif;
}`

const TOAST = `'use client'
import { MButton, useToast } from '@cooladmin/react'

export function SaveButton() {
  const toast = useToast()
  return (
    <MButton
      variant="primary"
      onClick={() => {
        // Simple
        toast.success('Saved')
        toast.info('Heads up')
        toast.warning('Storage almost full')
        toast.error('Something went wrong')

        // Full options
        toast.show({
          title: 'New version',
          message: 'v3.1.0 is now live',
          type: 'success',
          duration: 6000, // ms; 0 = no auto-dismiss
        })
      }}
    >
      Save
    </MButton>
  )
}`

const CMDK = `'use client'
import { useCommandPalette } from '@cooladmin/react'

const { open, close, toggle } = useCommandPalette()`

const CMDK_COMMANDS = `<DashboardLayout
  menuItems={menuItems}
  commands={[
    { id: 'new-deal', label: 'New deal', group: 'Actions', icon: 'fa-solid fa-bolt',
      keywords: ['create', 'pipeline'], onSelect: () => router.push('/deals/new') },
  ]}
>`

const COLOR_MODE = `'use client'
import { useColorMode } from '@cooladmin/react'

const { mode, resolved, setMode } = useColorMode() // mode: 'light' | 'dark' | 'auto'
setMode('dark')`

const CHART = `'use client'
import { Chart, lightTooltip } from '@cooladmin/react'

export function RevenueChart() {
  return (
    <Chart
      type="line"
      height={280}
      ariaLabel="Monthly revenue, January to June"
      data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [12, 19, 14, 22, 26, 31],
          borderColor: 'var(--m-accent)',                 // tokens are resolved for you
          backgroundColor: 'rgba(var(--m-accent-rgb), .12)',
          fill: true,
          tension: 0.4,
        }],
      }}
      options={{ plugins: { tooltip: lightTooltip } }}
    />
  )
}`

const NEW_PAGE = `// app/(dashboard)/reports/page.tsx  — a Server Component
import { Footer, MCard, PageHeader } from '@cooladmin/react'

export const metadata = { title: 'Reports' }

export default function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports" subtitle="Exports and scheduled reports." />
      <div className="row row-tight">
        <div className="col-lg-8">
          <MCard title="Recent exports" subtitle="Last 30 days.">
            {/* content */}
          </MCard>
        </div>
      </div>
      <Footer />
    </>
  )
}`

const NEW_MENU = `{ type: 'item', label: 'Reports', href: '/reports', icon: 'fa-solid fa-file-lines' }`

const DARK_HTML = `<html lang="en" data-bs-theme="dark">`

const DARK_TOKENS = `[data-bs-theme="dark"] body.app {
    --m-bg:        #0b0e14;
    --m-surface:   #111827;
    --m-text:      #e5e7eb;
    /* … redefine tokens only — never per-component colours */
}`

const CDN = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css">
<link rel="preconnect" href="https://rsms.me/">
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" defer></script>`

/** CoolAdmin docs.html, rewritten for the React library (same sections, TOC + copy buttons). */
export default function DocumentationPage() {
  return (
    <>
      <PageHeader
        title="Documentation"
        subtitle="Quick start, file structure, customization, JavaScript APIs, and deployment."
        actions={
          <>
            <MButton
              href="https://github.com"
              target="_blank"
              rel="noopener"
              variant="ghost"
              icon="fa-brands fa-github"
            >
              GitHub
            </MButton>
            <MButton href="#install" variant="primary" icon="fa-solid fa-rocket">
              Quick start
            </MButton>
          </>
        }
      />

      <div className="docs-layout">
        <DocsToc items={toc} />

        <div className="docs-content">
          <section className="docs-section" id="install">
            <h2>
              Quick start <Anchor id="install" />
            </h2>
            <p>
              <code>@cooladmin/react</code> is CoolAdmin re-implemented as a React 19 component
              library for the Next.js App Router. It ships ESM modules with their{' '}
              <code>&apos;use client&apos;</code> boundaries intact and one compiled stylesheet — no
              Sass toolchain on your side.
            </p>
            <CodeBlock code={INSTALL} language="bash" />
            <p>
              Import the stylesheet once in your root layout, then wrap your dashboard routes in{' '}
              <code>DashboardLayout</code> with a <code>menuItems</code> array:
            </p>
            <CodeBlock code={ROOT_LAYOUT} language="tsx" />
            <CodeBlock code={DASHBOARD_LAYOUT} language="tsx" />
            <p>
              <code>DashboardLayout</code> is a Server Component that renders the sidebar, topbar,
              command palette, toast container and theme switcher for you. Pages are plain Server
              Components: <code>PageHeader</code> for the title row, <code>MCard</code> for every
              card, <code>Footer</code> at the bottom.
            </p>

            <blockquote>
              <strong>Important</strong>
              <p>
                The package is ESM-only and imports <code>chart.js</code> and <code>next</code> as
                optional peers. Bootstrap, Font Awesome and Inter are <em>not</em> bundled — load
                them from a CDN in your root layout (see Deployment).
              </p>
            </blockquote>
          </section>

          <section className="docs-section" id="structure">
            <h2>
              File structure <Anchor id="structure" />
            </h2>
            <CodeBlock code={STRUCTURE} />
            <p>Every consumer app links the same CSS chain in this order:</p>
            <ol>
              <li>
                <code>https://rsms.me/inter/inter.css</code> — Inter, the UI font
              </li>
              <li>
                Font Awesome 7 Free — icons are class strings (<code>fa-solid fa-chart-line</code>)
              </li>
              <li>Bootstrap 5.3 CSS — grid, utilities and form controls</li>
              <li>
                <code>@cooladmin/react/css</code> — the CoolAdmin overlay (this is where almost
                everything lives; every rule is scoped under <code>body.app</code>)
              </li>
            </ol>
          </section>

          <section className="docs-section" id="themes">
            <h2>
              Color themes <Anchor id="themes" />
            </h2>
            <p>
              Six accent-color presets ship out of the box. Use the floating palette button
              (bottom-right of any page) to try them, pass a default to the layout, or set the body
              class directly:
            </p>
            <CodeBlock code={THEME_CLASS} language="html" />
            <CodeBlock code={THEME_PROP} language="tsx" />
            <p>
              Available themes: <code>blue</code> (default), <code>purple</code>, <code>teal</code>,{' '}
              <code>rose</code>, <code>amber</code>, <code>graphite</code> — rendered as{' '}
              <code>body.app.theme-&lt;name&gt;</code>. Read or change the preset from any client
              component:
            </p>
            <CodeBlock code={THEME_HOOK} language="tsx" />
            <p>
              To define your own theme, override the four accent variables on{' '}
              <code>body.app.theme-yourname</code>:
            </p>
            <CodeBlock code={CUSTOM_THEME} language="css" />
            <p>
              The user&rsquo;s choice is persisted automatically in <code>localStorage</code> under
              the key <code>cooladmin.accent</code> (color mode: <code>cooladmin.color-mode</code>,
              sidebar state: <code>cooladmin.sidebar</code>).
            </p>
          </section>

          <section className="docs-section" id="typography">
            <h2>
              Typography <Anchor id="typography" />
            </h2>
            <p>
              The default sans-serif is <strong>Inter</strong> served from <code>rsms.me</code>.
              Monospace snippets use the system stack in <code>--m-font-mono</code>.
            </p>
            <p>
              To swap fonts globally, redefine the <code>--m-font</code> token in your own
              stylesheet (load it after <code>@cooladmin/react/css</code>):
            </p>
            <CodeBlock code={FONT_TOKEN} language="css" />
            <p>The type scale used across pages:</p>
            <table>
              <thead>
                <tr>
                  <th>Element</th>
                  <th>Size</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Page header h1</td>
                  <td>22 px</td>
                  <td>600</td>
                </tr>
                <tr>
                  <td>Card title</td>
                  <td>14 px</td>
                  <td>600</td>
                </tr>
                <tr>
                  <td>Body</td>
                  <td>14 px</td>
                  <td>400</td>
                </tr>
                <tr>
                  <td>Subtitle / muted</td>
                  <td>13 px</td>
                  <td>400</td>
                </tr>
                <tr>
                  <td>KPI value</td>
                  <td>26 px</td>
                  <td>600 (tabular)</td>
                </tr>
                <tr>
                  <td>Eyebrow / label</td>
                  <td>11 px</td>
                  <td>600 uppercase</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="docs-section" id="components">
            <h2>
              Components <Anchor id="components" />
            </h2>
            <p>
              Every CoolAdmin pattern is a named export. Class names are kept verbatim (
              <code>.m-card</code>, <code>.stat-card</code>, …) so existing SCSS overrides keep
              working:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>MCard</code>
                  </td>
                  <td>
                    White surface with header / body — <code>title</code>, <code>subtitle</code>,{' '}
                    <code>actions</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>MButton</code> / <code>IconButton</code>
                  </td>
                  <td>
                    Modern button (<code>primary</code>, <code>ghost</code>, <code>danger</code>;{' '}
                    <code>loading</code>, <code>href</code>)
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>StatCard</code>
                  </td>
                  <td>KPI tile with label, value, delta and sparkline</td>
                </tr>
                <tr>
                  <td>
                    <code>Chart</code> / <code>Sparkline</code>
                  </td>
                  <td>Chart.js wrappers — lazy-loaded, token-aware, destroyed on unmount</td>
                </tr>
                <tr>
                  <td>
                    <code>RankList</code> / <code>ActivityList</code> / <code>TaskList</code>
                  </td>
                  <td>Numbered ranking bars, activity feed, checkable to-dos</td>
                </tr>
                <tr>
                  <td>
                    <code>StatusPill</code> / <code>PriorityChip</code> / <code>Badge</code>
                  </td>
                  <td>Status, priority and Bootstrap badge labels</td>
                </tr>
                <tr>
                  <td>
                    <code>Tabs</code> / <code>Modal</code> / <code>Alert</code>
                  </td>
                  <td>Accessible React replacements for the Bootstrap JS widgets</td>
                </tr>
                <tr>
                  <td>
                    <code>DataTable</code> / <code>Pagination</code>
                  </td>
                  <td>Sortable, searchable, paginated table</td>
                </tr>
                <tr>
                  <td>
                    <code>Wizard</code>
                  </td>
                  <td>Multi-step form with step list and Back / Next / Finish</td>
                </tr>
                <tr>
                  <td>
                    <code>Input</code> / <code>Select</code> / <code>Textarea</code> /{' '}
                    <code>Switch</code> / <code>Checkbox</code> / <code>Radio</code>
                  </td>
                  <td>Form controls with label, hint and error wiring</td>
                </tr>
                <tr>
                  <td>
                    <code>EmptyState</code> / <code>Skeleton</code>
                  </td>
                  <td>&quot;No data&quot; placeholder and shimmer loaders</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="docs-section" id="js-apis">
            <h2>
              Hooks &amp; APIs <Anchor id="js-apis" />
            </h2>

            <h3>Toast notifications</h3>
            <p>
              <code>DashboardLayout</code> mounts the toast container. Trigger toasts from any
              client component with <code>useToast()</code>:
            </p>
            <CodeBlock code={TOAST} language="tsx" />

            <h3>Command palette</h3>
            <p>
              Press <kbd>⌘</kbd>
              <kbd>K</kbd> (or <kbd>Ctrl</kbd>
              <kbd>K</kbd>) anywhere to open. Programmatic control:
            </p>
            <CodeBlock code={CMDK} language="tsx" />
            <p>
              Pages from <code>menuItems</code> are indexed automatically. Add custom actions with
              the <code>commands</code> prop:
            </p>
            <CodeBlock code={CMDK_COMMANDS} language="tsx" />

            <h3>Theme switcher</h3>
            <p>
              The floating palette button is rendered by <code>DashboardLayout</code> (disable it
              with <code>showThemeSwitcher={'{false}'}</code>). Accent and color mode are persisted
              in <code>localStorage</code>; read or force them from code:
            </p>
            <CodeBlock code={COLOR_MODE} language="tsx" />
          </section>

          <section className="docs-section" id="charts">
            <h2>
              Chart configurations <Anchor id="charts" />
            </h2>
            <p>
              Charts use <strong>Chart.js 4</strong>, installed by you as an optional peer and
              loaded with a dynamic <code>import()</code> only on pages that render one. Shared
              helpers keep configs DRY:
            </p>
            <ul>
              <li>
                <code>applyChartDefaults(Chart, canvas)</code> — Inter 12px, muted token colours,
                dark tooltip (applied for you by <code>&lt;Chart&gt;</code>)
              </li>
              <li>
                <code>kpiSparklineConfig(opts)</code> — gradient-fill sparkline for KPI tiles
              </li>
              <li>
                <code>sparklineOptions()</code>, <code>lightTooltip</code>,{' '}
                <code>modernTooltip</code> — reusable option blocks
              </li>
              <li>
                <code>resolveTokens(value, el)</code> — turns any <code>var(--m-*)</code> string in{' '}
                <code>data</code> / <code>options</code> into a concrete colour
              </li>
            </ul>
            <p>To add a new chart, render the wrapper from a client component:</p>
            <CodeBlock code={CHART} language="tsx" />
          </section>

          <section className="docs-section" id="new-page">
            <h2>
              Adding a new page <Anchor id="new-page" />
            </h2>
            <p>
              Every dashboard-style page follows the same pattern: <code>PageHeader</code> &rarr;
              Bootstrap rows of <code>MCard</code>s &rarr; <code>Footer</code>. The fastest way is
              to copy an existing route and replace the content.
            </p>
            <ol>
              <li>
                Create <code>app/(dashboard)/my-page/page.tsx</code> as a Server Component
              </li>
              <li>
                Export <code>metadata = {'{ title }'}</code> — the layout&rsquo;s title template
                appends the app name
              </li>
              <li>
                Put interactive pieces in <code>&apos;use client&apos;</code> components and sample
                data in plain modules (importable from both server and client)
              </li>
              <li>
                Add a sidebar entry to your <code>menuItems</code> array — the command palette picks
                it up automatically
              </li>
            </ol>
            <CodeBlock code={NEW_PAGE} language="tsx" />
            <CodeBlock code={NEW_MENU} language="ts" />
          </section>

          <section className="docs-section" id="dark-mode">
            <h2>
              Dark mode <Anchor id="dark-mode" />
            </h2>
            <p>
              Dark mode is built in. <code>ColorModeProvider</code> (mounted by every layout)
              resolves <code>light</code>, <code>dark</code> or <code>auto</code> against{' '}
              <code>prefers-color-scheme</code> and sets Bootstrap&rsquo;s hook on the{' '}
              <code>&lt;html&gt;</code> element:
            </p>
            <CodeBlock code={DARK_HTML} language="html" />
            <p>
              All <code>--m-*</code> tokens swap to dark surfaces (<code>--m-bg</code>,{' '}
              <code>--m-surface</code>, <code>--m-text</code>, …). To adjust the palette, redefine
              tokens under the same selector — never per-component colours:
            </p>
            <CodeBlock code={DARK_TOKENS} language="css" />
          </section>

          <section className="docs-section" id="deploy">
            <h2>
              Deployment <Anchor id="deploy" />
            </h2>
            <p>
              A Next.js app using <code>@cooladmin/react</code> deploys like any other Next.js app:
            </p>
            <ul>
              <li>
                <strong>Vercel:</strong> connect the repo — zero configuration
              </li>
              <li>
                <strong>Netlify / Cloudflare Pages:</strong> use the official Next.js runtime
                adapters
              </li>
              <li>
                <strong>Docker / Node:</strong> <code>next build</code> then <code>next start</code>{' '}
                (or <code>output: &apos;standalone&apos;</code>)
              </li>
              <li>
                <strong>Static export:</strong> <code>output: &apos;export&apos;</code> works — the
                library has no server-only code paths
              </li>
            </ul>
            <p>
              The external dependencies are the CDN assets the library does not bundle. Add them to
              your root layout&rsquo;s <code>&lt;head&gt;</code>:
            </p>
            <CodeBlock code={CDN} language="html" />
            <blockquote>
              <strong>Tip</strong>
              <p>
                Heavy vendors are only loaded where used: <code>chart.js</code> is code-split per
                page, and this demo loads FullCalendar and Leaflet lazily from the calendar and maps
                pages. Skip installing <code>chart.js</code> if you never render a chart.
              </p>
            </blockquote>
          </section>
        </div>
      </div>

      <Footer />
    </>
  )
}
