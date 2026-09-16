import type { AccentSlot, PriorityLevel, StatusPillStatus } from '@madhusudan-hegde/cooladmin-react'

/**
 * Demo datasets for the four CoolAdmin dashboards (index.html → index4.html),
 * lifted verbatim from the built pages and `js/main-vanilla.js`.
 *
 * Plain module — no `'use client'` — so RSC pages and client chart islands can
 * both import it. Chart.js *option* objects (which contain callbacks) live in
 * the client chart components; only serialisable data lives here.
 */

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

/** CoolAdmin's KPI palette (`--m-c1` … `--m-c4`), as concrete hex for canvas. */
export const KPI_COLORS: Record<AccentSlot, string> = {
  c1: '#4272d7',
  c2: '#11998e',
  c3: '#f97316',
  c4: '#ec4899',
}

/** Same palette as `r, g, b` channel strings (for rgba() gradient stops). */
export const KPI_COLORS_RGB: Record<AccentSlot, string> = {
  c1: '66, 114, 215',
  c2: '17, 153, 142',
  c3: '249, 115, 22',
  c4: '236, 72, 153',
}

export const avatar = (n: number): string => `/assets/img/avatar-0${n}.jpg`

export interface KpiCard {
  id: string
  label: string
  value: string
  icon: string
  color: AccentSlot
  delta: number | string
  deltaDirection?: 'up' | 'down'
  deltaPeriod: string
  sparkline?: number[]
}

export interface ActivityEntry {
  id: string
  avatarSrc: string
  /** `**bold**` segments are rendered as `<b>`. */
  text: string
  time: string
}

export interface TaskEntry {
  id: string
  label: string
  done: boolean
  due: string
  priority: PriorityLevel
}

export interface RankEntry {
  title: string
  value: string
  percent: number
}

/* ------------------------------------------------------------------ */
/* Dashboard 1 — Overview (index.html)                                  */
/* ------------------------------------------------------------------ */

export const overviewKpis: KpiCard[] = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: '$48,217',
    icon: 'fa-solid fa-dollar-sign',
    color: 'c1',
    delta: 12.5,
    deltaPeriod: 'vs last 30d',
    sparkline: [
      32, 36, 31, 40, 44, 41, 48, 46, 52, 49, 56, 60, 58, 64, 62, 68, 70, 65, 72, 75, 71, 78, 76,
      82, 80, 86, 84, 90, 88, 95,
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    value: '1,284',
    icon: 'fa-solid fa-cart-shopping',
    color: 'c2',
    delta: -3.2,
    deltaPeriod: 'vs last 30d',
    sparkline: [
      55, 58, 62, 60, 65, 63, 68, 64, 70, 67, 71, 68, 73, 70, 76, 72, 78, 74, 79, 76, 81, 77, 80,
      78, 76, 73, 70, 68, 66, 64,
    ],
  },
  {
    id: 'users',
    label: 'Active users',
    value: '8,492',
    icon: 'fa-solid fa-users',
    color: 'c3',
    delta: 5.8,
    deltaPeriod: 'vs last 30d',
    sparkline: [
      40, 42, 45, 43, 48, 50, 47, 52, 49, 54, 56, 53, 58, 60, 57, 62, 64, 61, 66, 68, 65, 70, 72,
      69, 74, 76, 73, 78, 80, 78,
    ],
  },
  {
    id: 'conversion',
    label: 'Conversion',
    value: '3.24%',
    icon: 'fa-solid fa-bullseye',
    color: 'c4',
    delta: '0.6pp',
    deltaDirection: 'up',
    deltaPeriod: 'vs last 30d',
    sparkline: [
      2.6, 2.7, 2.5, 2.8, 2.9, 2.7, 3.0, 2.9, 3.1, 3.0, 3.2, 3.1, 3.3, 3.2, 3.0, 3.1, 3.2, 3.3, 3.4,
      3.2, 3.3, 3.5, 3.3, 3.4, 3.5, 3.4, 3.3, 3.2, 3.3, 3.24,
    ],
  },
]

/** 30-day revenue series, products vs. services (`primary-chart`). */
export const revenueTrend = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  products: [
    1820, 1940, 1880, 2050, 2210, 2090, 2380, 2240, 2520, 2410, 2680, 2860, 2740, 3010, 2890, 3140,
    3320, 3180, 3460, 3580, 3380, 3690, 3580, 3850, 3760, 4040, 3920, 4180, 4080, 4310,
  ],
  services: [
    820, 880, 950, 910, 1020, 1080, 1010, 1130, 1080, 1200, 1240, 1180, 1310, 1370, 1300, 1430,
    1490, 1420, 1560, 1620, 1540, 1680, 1740, 1660, 1810, 1880, 1810, 1960, 2010, 1950,
  ],
}

export const overviewActivity: ActivityEntry[] = [
  {
    id: 'a1',
    avatarSrc: avatar(6),
    text: '**Cynthia Harvey** replied to your comment on **Q1 roadmap**.',
    time: '2 hours ago',
  },
  {
    id: 'a2',
    avatarSrc: avatar(4),
    text: '**Diane Myers** placed a new order **#4287**.',
    time: '5 hours ago',
  },
  {
    id: 'a3',
    avatarSrc: avatar(1),
    text: '**John Doe** completed task **“Migration audit”**.',
    time: 'Yesterday',
  },
  {
    id: 'a4',
    avatarSrc: avatar(5),
    text: '**Michelle Moreno** uploaded 3 files to **Brand assets**.',
    time: '2 days ago',
  },
  {
    id: 'a5',
    avatarSrc: avatar(2),
    text: '**Emma Carter** added a new project **Acme dashboard**.',
    time: '3 days ago',
  },
]

export const overviewTasks: TaskEntry[] = [
  {
    id: 't1',
    label: 'Quarterly business review with leadership',
    done: false,
    due: 'Today',
    priority: 'high',
  },
  {
    id: 't2',
    label: 'Launch May product campaign',
    done: false,
    due: 'Tomorrow',
    priority: 'medium',
  },
  {
    id: 't3',
    label: 'Update API documentation for v2 endpoints',
    done: true,
    due: 'Done',
    priority: 'low',
  },
  {
    id: 't4',
    label: 'Review onboarding flow with design team',
    done: false,
    due: 'Thu',
    priority: 'medium',
  },
  {
    id: 't5',
    label: 'Audit third-party dependencies',
    done: false,
    due: 'Next week',
    priority: 'low',
  },
]

export interface TopProduct {
  id: string
  name: string
  icon: string
  /** Icon tint override (`background` / `color`); the first row keeps the accent defaults. */
  iconStyle?: { background: string; color: string }
  units: string
  revenue: string
  trend: number
  status: StatusPillStatus
  statusLabel: string
}

export const topProducts: TopProduct[] = [
  {
    id: 'p1',
    name: 'Acme Pro Plan',
    icon: 'fa-solid fa-rocket',
    units: '432',
    revenue: '$18,420',
    trend: 14,
    status: 'approved',
    statusLabel: 'Active',
  },
  {
    id: 'p2',
    name: 'Starter Kit',
    icon: 'fa-solid fa-cube',
    iconStyle: { background: '#ecfdf5', color: '#10b981' },
    units: '318',
    revenue: '$9,548',
    trend: 9,
    status: 'approved',
    statusLabel: 'Active',
  },
  {
    id: 'p3',
    name: 'Enterprise Tier',
    icon: 'fa-solid fa-gem',
    iconStyle: { background: '#fffbeb', color: '#f59e0b' },
    units: '86',
    revenue: '$11,940',
    trend: 22,
    status: 'process',
    statusLabel: 'Low stock',
  },
  {
    id: 'p4',
    name: 'Support Add-on',
    icon: 'fa-solid fa-headphones',
    iconStyle: { background: '#fef2f2', color: '#ef4444' },
    units: '241',
    revenue: '$4,820',
    trend: -4,
    status: 'denied',
    statusLabel: 'Paused',
  },
  {
    id: 'p5',
    name: 'API credits',
    icon: 'fa-solid fa-puzzle-piece',
    iconStyle: { background: '#eef2ff', color: '#4f46e5' },
    units: '1,089',
    revenue: '$3,489',
    trend: 6,
    status: 'approved',
    statusLabel: 'Active',
  },
]

/* ------------------------------------------------------------------ */
/* Dashboard 2 — Sales pipeline (index2.html)                           */
/* ------------------------------------------------------------------ */

export const salesKpis: KpiCard[] = [
  {
    id: 'deals',
    label: 'Active deals',
    value: '127',
    icon: 'fa-solid fa-handshake',
    color: 'c1',
    delta: '12',
    deltaDirection: 'up',
    deltaPeriod: 'vs last quarter',
  },
  {
    id: 'pipeline',
    label: 'Pipeline value',
    value: '$1.24M',
    icon: 'fa-solid fa-dollar-sign',
    color: 'c2',
    delta: 8.5,
    deltaPeriod: 'vs last quarter',
  },
  {
    id: 'won',
    label: 'Won this month',
    value: '24',
    icon: 'fa-solid fa-trophy',
    color: 'c3',
    delta: '4',
    deltaDirection: 'up',
    deltaPeriod: 'vs last month',
  },
  {
    id: 'winrate',
    label: 'Win rate',
    value: '32%',
    icon: 'fa-solid fa-bullseye',
    color: 'c4',
    delta: '2pp',
    deltaDirection: 'up',
    deltaPeriod: 'vs last quarter',
  },
]

/** Horizontal funnel bar chart (`pipeline-funnel`). */
export const pipelineFunnel = {
  labels: ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed won'],
  data: [320, 180, 95, 55, 24],
  colors: ['#bdcef2', '#a3bbe8', '#7c9dde', '#5b85d8', '#4272d7'],
}

export const topSalesReps: RankEntry[] = [
  { title: 'Cynthia Harvey', value: '$184k', percent: 100 },
  { title: 'John Doe', value: '$142k', percent: 77 },
  { title: 'Diane Myers', value: '$118k', percent: 64 },
  { title: 'Michelle Moreno', value: '$96k', percent: 52 },
  { title: 'Robert Taylor', value: '$74k', percent: 40 },
  { title: 'Emma Carter', value: '$58k', percent: 32 },
]

export type DealStage =
  | { kind: 'pill'; status: StatusPillStatus; label: string }
  | { kind: 'badge'; tone: 'success' | 'danger'; label: string }

export interface Deal {
  id: string
  company: string
  icon: string
  iconStyle?: { background: string; color: string }
  stage: DealStage
  owner: string
  value: string
}

export const recentDeals: Deal[] = [
  {
    id: 'd1',
    company: 'Acme Corp',
    icon: 'fa-solid fa-building',
    stage: { kind: 'pill', status: 'process', label: 'Negotiation' },
    owner: 'Cynthia Harvey',
    value: '$48,000',
  },
  {
    id: 'd2',
    company: 'Globex Industries',
    icon: 'fa-solid fa-cube',
    iconStyle: { background: '#e0f3f1', color: '#11998e' },
    stage: { kind: 'pill', status: 'approved', label: 'Proposal' },
    owner: 'John Doe',
    value: '$32,500',
  },
  {
    id: 'd3',
    company: 'Initech',
    icon: 'fa-solid fa-rocket',
    iconStyle: { background: '#fff1e6', color: '#f97316' },
    stage: { kind: 'pill', status: 'process', label: 'Negotiation' },
    owner: 'Diane Myers',
    value: '$76,200',
  },
  {
    id: 'd4',
    company: 'Umbrella Co',
    icon: 'fa-solid fa-gem',
    iconStyle: { background: '#fce7f3', color: '#ec4899' },
    stage: { kind: 'badge', tone: 'success', label: 'Closed won' },
    owner: 'Michelle Moreno',
    value: '$24,800',
  },
  {
    id: 'd5',
    company: 'Hooli Inc',
    icon: 'fa-solid fa-briefcase',
    stage: { kind: 'pill', status: 'approved', label: 'Qualified' },
    owner: 'Robert Taylor',
    value: '$15,600',
  },
  {
    id: 'd6',
    company: 'Pied Piper',
    icon: 'fa-solid fa-puzzle-piece',
    iconStyle: { background: '#e0f3f1', color: '#11998e' },
    stage: { kind: 'badge', tone: 'danger', label: 'Lost' },
    owner: 'Emma Carter',
    value: '$18,400',
  },
]

export const dealSources: RankEntry[] = [
  { title: 'Inbound — website', value: '42%', percent: 100 },
  { title: 'Outbound — SDR', value: '24%', percent: 57 },
  { title: 'Referral', value: '16%', percent: 38 },
  { title: 'Partner', value: '10%', percent: 24 },
  { title: 'Event / conference', value: '8%', percent: 19 },
]

/** Doughnut companion for the deal-sources card. */
export const dealSourcesDonut = {
  labels: ['Inbound — website', 'Outbound — SDR', 'Referral', 'Partner', 'Event / conference'],
  data: [42, 24, 16, 10, 8],
  colors: ['#4272d7', '#11998e', '#f97316', '#ec4899', '#8b5cf6'],
  hoverColors: ['#3155b3', '#0d8780', '#e0660a', '#d23a87', '#7c4ce6'],
}

/* ------------------------------------------------------------------ */
/* Dashboard 3 — Marketing analytics (index3.html)                      */
/* ------------------------------------------------------------------ */

export const marketingKpis: KpiCard[] = [
  {
    id: 'visitors',
    label: 'Visitors',
    value: '84,290',
    icon: 'fa-solid fa-users',
    color: 'c1',
    delta: 18.2,
    deltaPeriod: 'vs prev 28d',
  },
  {
    id: 'sessions',
    label: 'Sessions',
    value: '142,180',
    icon: 'fa-solid fa-eye',
    color: 'c2',
    delta: 22.4,
    deltaPeriod: 'vs prev 28d',
  },
  {
    id: 'bounce',
    label: 'Bounce rate',
    value: '38.4%',
    icon: 'fa-solid fa-arrow-trend-down',
    color: 'c3',
    delta: '2.1pp',
    deltaDirection: 'down',
    deltaPeriod: 'vs prev 28d',
  },
  {
    id: 'session',
    label: 'Avg session',
    value: '4m 12s',
    icon: 'fa-regular fa-clock',
    color: 'c4',
    delta: '14s',
    deltaDirection: 'up',
    deltaPeriod: 'vs prev 28d',
  },
]

/** 28-day visitors vs. sessions (`traffic-trend`). */
export const trafficTrend = {
  labels: Array.from({ length: 28 }, (_, i) => `Day ${i + 1}`),
  visitors: [
    2400, 2520, 2380, 2680, 2740, 2580, 2820, 2980, 2860, 3140, 3260, 3120, 3380, 3520, 3380, 3640,
    3780, 3620, 3880, 4040, 3860, 4180, 4320, 4180, 4480, 4620, 4480, 4760,
  ],
  sessions: [
    3800, 3920, 3680, 4180, 4320, 4080, 4480, 4720, 4560, 4940, 5080, 4860, 5240, 5460, 5240, 5620,
    5840, 5560, 5980, 6240, 5940, 6420, 6620, 6360, 6840, 7060, 6800, 7240,
  ],
}

/** Share-of-traffic doughnut (`traffic-sources`). */
export const trafficSources = {
  labels: ['Organic search', 'Direct', 'Social', 'Referral', 'Email'],
  data: [42, 26, 14, 10, 8],
  colors: ['#4272d7', '#11998e', '#f97316', '#ec4899', '#8b5cf6'],
  hoverColors: ['#3155b3', '#0d8780', '#e0660a', '#d23a87', '#7c4ce6'],
}

export const topPages: RankEntry[] = [
  { title: '/ (homepage)', value: '28,420', percent: 100 },
  { title: '/pricing', value: '14,860', percent: 52 },
  { title: '/blog/q1-product-launch', value: '11,240', percent: 40 },
  { title: '/features', value: '8,920', percent: 31 },
  { title: '/docs', value: '6,480', percent: 23 },
  { title: '/about', value: '4,860', percent: 17 },
  { title: '/changelog', value: '3,140', percent: 11 },
]

export const topReferrers: RankEntry[] = [
  { title: 'google.com', value: '22,140', percent: 100 },
  { title: 'producthunt.com', value: '8,920', percent: 40 },
  { title: 'news.ycombinator.com', value: '6,420', percent: 29 },
  { title: 'linkedin.com', value: '4,820', percent: 22 },
  { title: 'x.com', value: '3,580', percent: 16 },
  { title: 'github.com', value: '2,940', percent: 13 },
  { title: 'reddit.com', value: '1,820', percent: 8 },
]

/* ------------------------------------------------------------------ */
/* Dashboard 4 — Projects (index4.html)                                 */
/* ------------------------------------------------------------------ */

export const projectKpis: KpiCard[] = [
  {
    id: 'active',
    label: 'Active projects',
    value: '12',
    icon: 'fa-solid fa-folder-open',
    color: 'c1',
    delta: '2',
    deltaDirection: 'up',
    deltaPeriod: 'since last week',
  },
  {
    id: 'completed',
    label: 'Completed this month',
    value: '38',
    icon: 'fa-solid fa-circle-check',
    color: 'c2',
    delta: '12',
    deltaDirection: 'up',
    deltaPeriod: 'vs last month',
  },
  {
    id: 'capacity',
    label: 'Team capacity',
    value: '78%',
    icon: 'fa-solid fa-gauge-simple',
    color: 'c3',
    delta: '5pp',
    deltaDirection: 'up',
    deltaPeriod: 'vs last week',
  },
  {
    id: 'hours',
    label: 'Hours this week',
    value: '1,248',
    icon: 'fa-regular fa-clock',
    color: 'c4',
    delta: -4,
    deltaPeriod: 'vs last week',
  },
]

export interface Project {
  id: string
  title: string
  due: string
  tasks: number
  status: StatusPillStatus
  statusLabel: string
  members: string[]
  progress: number
  /** Fill colour for the progress bar (defaults to the accent). */
  barColor?: string
}

export const activeProjects: Project[] = [
  {
    id: 'pr1',
    title: 'Acme dashboard redesign',
    due: 'May 18',
    tasks: 12,
    status: 'process',
    statusLabel: 'on track',
    members: [avatar(1), avatar(4), avatar(6)],
    progress: 78,
  },
  {
    id: 'pr2',
    title: 'Q2 marketing campaign',
    due: 'May 24',
    tasks: 8,
    status: 'process',
    statusLabel: 'on track',
    members: [avatar(2), avatar(5)],
    progress: 64,
    barColor: 'var(--m-c2)',
  },
  {
    id: 'pr3',
    title: 'Mobile app v3 release',
    due: 'Jun 02',
    tasks: 24,
    status: 'approved',
    statusLabel: 'in review',
    members: [avatar(1), avatar(3), avatar(5), avatar(6)],
    progress: 52,
  },
  {
    id: 'pr4',
    title: 'API v2 documentation',
    due: 'May 20',
    tasks: 6,
    status: 'process',
    statusLabel: 'on track',
    members: [avatar(4)],
    progress: 88,
    barColor: 'var(--m-c2)',
  },
  {
    id: 'pr5',
    title: 'Customer onboarding flow',
    due: 'May 28',
    tasks: 14,
    status: 'denied',
    statusLabel: 'at risk',
    members: [avatar(2), avatar(4)],
    progress: 32,
    barColor: 'var(--m-c3)',
  },
  {
    id: 'pr6',
    title: 'Pricing page A/B test',
    due: 'Jun 10',
    tasks: 4,
    status: 'approved',
    statusLabel: 'planning',
    members: [avatar(5), avatar(3)],
    progress: 18,
  },
]

export interface Deadline {
  id: string
  day: string
  month: string
  title: string
  project: string
}

export const upcomingDeadlines: Deadline[] = [
  {
    id: 'dl1',
    day: '16',
    month: 'May',
    title: 'Design review with stakeholders',
    project: 'Acme dashboard redesign',
  },
  {
    id: 'dl2',
    day: '18',
    month: 'May',
    title: 'Hand-off final designs',
    project: 'Acme dashboard redesign',
  },
  {
    id: 'dl3',
    day: '20',
    month: 'May',
    title: 'Publish API v2 docs',
    project: 'API v2 documentation',
  },
  {
    id: 'dl4',
    day: '24',
    month: 'May',
    title: 'Campaign launch',
    project: 'Q2 marketing campaign',
  },
  {
    id: 'dl5',
    day: '28',
    month: 'May',
    title: 'Onboarding flow QA',
    project: 'Customer onboarding flow',
  },
  {
    id: 'dl6',
    day: '02',
    month: 'Jun',
    title: 'Mobile app v3 ship',
    project: 'Mobile app v3 release',
  },
]

export const projectActivity: ActivityEntry[] = [
  {
    id: 'pa1',
    avatarSrc: avatar(1),
    text: '**John Doe** moved 3 tasks to "In review" on **Mobile app v3 release**.',
    time: '12 minutes ago',
  },
  {
    id: 'pa2',
    avatarSrc: avatar(4),
    text: '**Diane Myers** shipped **"Auth flow refactor"**.',
    time: '1 hour ago',
  },
  {
    id: 'pa3',
    avatarSrc: avatar(6),
    text: '**Michelle Moreno** commented on **"Pricing page A/B test"**.',
    time: '3 hours ago',
  },
  {
    id: 'pa4',
    avatarSrc: avatar(5),
    text: '**Cynthia Harvey** created **"Customer onboarding flow"**.',
    time: 'Yesterday',
  },
  {
    id: 'pa5',
    avatarSrc: avatar(2),
    text: '**Emma Carter** assigned 5 tasks to **Robert Taylor**.',
    time: 'Yesterday',
  },
  {
    id: 'pa6',
    avatarSrc: avatar(3),
    text: '**Robert Taylor** resolved 2 issues on **API v2 documentation**.',
    time: '2 days ago',
  },
]

export interface TeamMember {
  id: string
  name: string
  role: string
  avatarSrc: string
  status: 'online' | 'away' | 'busy' | 'offline'
  availability: string
}

export const teamAvailability: TeamMember[] = [
  {
    id: 'tm1',
    name: 'John Doe',
    role: 'Engineering lead',
    avatarSrc: avatar(1),
    status: 'online',
    availability: 'Available',
  },
  {
    id: 'tm2',
    name: 'Diane Myers',
    role: 'Senior engineer',
    avatarSrc: avatar(4),
    status: 'busy',
    availability: 'In meeting',
  },
  {
    id: 'tm3',
    name: 'Michelle Moreno',
    role: 'Product designer',
    avatarSrc: avatar(6),
    status: 'online',
    availability: 'Available',
  },
  {
    id: 'tm4',
    name: 'Cynthia Harvey',
    role: 'Product manager',
    avatarSrc: avatar(5),
    status: 'away',
    availability: 'Away',
  },
  {
    id: 'tm5',
    name: 'Emma Carter',
    role: 'Engineering manager',
    avatarSrc: avatar(2),
    status: 'online',
    availability: 'Available',
  },
  {
    id: 'tm6',
    name: 'Robert Taylor',
    role: 'Engineer',
    avatarSrc: avatar(3),
    status: 'offline',
    availability: 'Off today',
  },
]
