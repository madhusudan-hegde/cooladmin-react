/**
 * Sample board for the /kanban page, lifted verbatim from CoolAdmin's
 * `kanban.html` (four columns, 18 cards). Plain module — no `'use client'`.
 */

export type KanbanStatus = 'backlog' | 'progress' | 'review' | 'done'
export type KanbanLabel = 'feature' | 'research' | 'bug' | 'docs' | 'design'

export interface KanbanColumn {
  id: KanbanStatus
  title: string
  /** Whether the column shows the "+ Add card" affordance (CoolAdmin omits it on Done). */
  canAdd: boolean
}

/** One footer meta item, in the order CoolAdmin renders them. */
export type KanbanMeta =
  | { kind: 'comments'; value: number }
  | { kind: 'attachments'; value: number }
  | { kind: 'due'; value: string }

export interface KanbanCard {
  id: string
  title: string
  labels: KanbanLabel[]
  meta: KanbanMeta[]
  /** Avatar URLs of the assignees. */
  assignees: string[]
  status: KanbanStatus
}

export const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: 'backlog', title: 'Backlog', canAdd: true },
  { id: 'progress', title: 'In progress', canAdd: true },
  { id: 'review', title: 'In review', canAdd: true },
  { id: 'done', title: 'Done', canAdd: false },
]

export const KANBAN_LABELS: Record<KanbanLabel, string> = {
  feature: 'Feature',
  research: 'Research',
  bug: 'Bug',
  docs: 'Docs',
  design: 'Design',
}

export const KANBAN_META_ICONS: Record<KanbanMeta['kind'], string> = {
  comments: 'fa-regular fa-comment',
  attachments: 'fa-regular fa-paperclip',
  due: 'fa-regular fa-calendar',
}

const avatar = (n: number): string => `/assets/img/avatar-0${n}.jpg`

export const kanbanCards: KanbanCard[] = [
  // Backlog
  {
    id: 'k1',
    title: 'Add CSV export to data tables',
    labels: ['feature'],
    meta: [
      { kind: 'comments', value: 3 },
      { kind: 'attachments', value: 1 },
    ],
    assignees: [avatar(4)],
    status: 'backlog',
  },
  {
    id: 'k2',
    title: 'User testing — onboarding flow v2',
    labels: ['research'],
    meta: [{ kind: 'due', value: 'May 22' }],
    assignees: [avatar(5), avatar(6)],
    status: 'backlog',
  },
  {
    id: 'k3',
    title: 'Sidebar collapses unexpectedly on Safari iOS',
    labels: ['bug'],
    meta: [{ kind: 'comments', value: 7 }],
    assignees: [avatar(1)],
    status: 'backlog',
  },
  {
    id: 'k4',
    title: 'Document the chart factory helpers',
    labels: ['docs'],
    meta: [{ kind: 'attachments', value: 2 }],
    assignees: [avatar(3)],
    status: 'backlog',
  },
  {
    id: 'k5',
    title: 'Bulk-edit selected rows in tables',
    labels: ['feature'],
    meta: [{ kind: 'due', value: 'Jun 02' }],
    assignees: [avatar(2)],
    status: 'backlog',
  },
  // In progress
  {
    id: 'k6',
    title: 'Q2 dashboard redesign — sidebar + topbar',
    labels: ['feature', 'design'],
    meta: [
      { kind: 'due', value: 'May 18' },
      { kind: 'comments', value: 12 },
    ],
    assignees: [avatar(1), avatar(4), avatar(6)],
    status: 'progress',
  },
  {
    id: 'k7',
    title: 'Fix avatar alignment on mobile header',
    labels: ['bug'],
    meta: [{ kind: 'comments', value: 4 }],
    assignees: [avatar(4)],
    status: 'progress',
  },
  {
    id: 'k8',
    title: 'Cmd+K command palette',
    labels: ['feature'],
    meta: [{ kind: 'due', value: 'Today' }],
    assignees: [avatar(3)],
    status: 'progress',
  },
  {
    id: 'k9',
    title: 'Pricing page A/B test analysis',
    labels: ['research'],
    meta: [
      { kind: 'attachments', value: 5 },
      { kind: 'comments', value: 2 },
    ],
    assignees: [avatar(5)],
    status: 'progress',
  },
  // In review
  {
    id: 'k10',
    title: 'Auth flow refactor — PR #2148',
    labels: ['feature'],
    meta: [{ kind: 'comments', value: 14 }],
    assignees: [avatar(4), avatar(1)],
    status: 'review',
  },
  {
    id: 'k11',
    title: 'Pricing page — final visual review',
    labels: ['design'],
    meta: [{ kind: 'due', value: 'Tomorrow' }],
    assignees: [avatar(6)],
    status: 'review',
  },
  {
    id: 'k12',
    title: 'API v2 docs — review by reviewers',
    labels: ['docs'],
    meta: [{ kind: 'comments', value: 3 }],
    assignees: [avatar(3)],
    status: 'review',
  },
  // Done
  {
    id: 'k13',
    title: 'Toast notification system',
    labels: ['feature'],
    meta: [{ kind: 'due', value: 'May 12' }],
    assignees: [avatar(2)],
    status: 'done',
  },
  {
    id: 'k14',
    title: 'Calendar — date-relative event generator',
    labels: ['feature'],
    meta: [{ kind: 'comments', value: 5 }],
    assignees: [avatar(1)],
    status: 'done',
  },
  {
    id: 'k15',
    title: 'Search field overflow on iPhone SE',
    labels: ['bug'],
    meta: [{ kind: 'comments', value: 2 }],
    assignees: [avatar(4)],
    status: 'done',
  },
  {
    id: 'k16',
    title: 'Inbox redesign — folder tabs + email rows',
    labels: ['design'],
    meta: [{ kind: 'attachments', value: 3 }],
    assignees: [avatar(6)],
    status: 'done',
  },
  {
    id: 'k17',
    title: 'v3 release notes',
    labels: ['docs'],
    meta: [{ kind: 'due', value: 'May 8' }],
    assignees: [avatar(3)],
    status: 'done',
  },
  {
    id: 'k18',
    title: 'Q1 customer interview synthesis',
    labels: ['research'],
    meta: [{ kind: 'comments', value: 9 }],
    assignees: [avatar(5)],
    status: 'done',
  },
]

/**
 * Move `id` into `status`, placed before `beforeId` (or at the end of that
 * column when `beforeId` is null / not in the column). Returns the same array
 * when nothing changes so drag-over can call it freely.
 */
export function moveKanbanCard(
  cards: KanbanCard[],
  id: string,
  status: KanbanStatus,
  beforeId: string | null = null
): KanbanCard[] {
  const card = cards.find(c => c.id === id)
  if (!card || beforeId === id) return cards
  const without = cards.filter(c => c.id !== id)
  let index = beforeId ? without.findIndex(c => c.id === beforeId && c.status === status) : -1
  if (index === -1) {
    let last = -1
    without.forEach((c, i) => {
      if (c.status === status) last = i
    })
    index = last + 1
  }
  const next = [...without.slice(0, index), { ...card, status }, ...without.slice(index)]
  const unchanged = next.every((c, i) => c.id === cards[i].id && c.status === cards[i].status)
  return unchanged ? cards : next
}
