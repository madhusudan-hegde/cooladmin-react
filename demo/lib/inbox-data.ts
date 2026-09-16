/**
 * Sample mailbox for the /inbox page, lifted verbatim from CoolAdmin's
 * `inbox.scripts.html` (`EMAILS`, `LABELS`, attachment icon map).
 *
 * Plain module — no `'use client'` — shared by the server page and the client
 * inbox component.
 */

export type InboxLabel = 'work' | 'personal' | 'social' | 'promo' | 'alert'

/** Mailbox a message physically lives in. */
export type InboxMailbox = 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash'

/** Folder tabs (mailboxes plus the two virtual views). */
export type InboxFolder = InboxMailbox | 'starred' | 'snoozed'

export type InboxAttachmentType = 'pdf' | 'xls' | 'fig' | 'img'

export interface InboxAttachment {
  name: string
  size: string
  type: InboxAttachmentType
}

export interface InboxMessage {
  id: string
  avatar: string
  sender: string
  email: string
  label?: InboxLabel
  subject: string
  preview: string
  /** Relative time shown in the list row. */
  time: string
  /** Full timestamp shown in the reader. */
  date: string
  unread: boolean
  starred: boolean
  snoozed?: boolean
  attachments?: InboxAttachment[]
  /** Trusted static HTML (CoolAdmin's sample copy) rendered in the reader body. */
  body: string
  folder: InboxMailbox
}

export interface InboxFolderDef {
  id: InboxFolder
  label: string
  icon: string
}

/** Human labels for the coloured chips (`.email-item__label--*`). */
export const INBOX_LABELS: Record<InboxLabel, string> = {
  work: 'Work',
  personal: 'Personal',
  social: 'Social',
  promo: 'Receipts',
  alert: 'Urgent',
}

/** Folder tabs in CoolAdmin's order. */
export const INBOX_FOLDERS: InboxFolderDef[] = [
  { id: 'inbox', label: 'Inbox', icon: 'fa-regular fa-envelope' },
  { id: 'starred', label: 'Starred', icon: 'fa-solid fa-star' },
  { id: 'snoozed', label: 'Snoozed', icon: 'fa-regular fa-clock' },
  { id: 'sent', label: 'Sent', icon: 'fa-solid fa-paper-plane' },
  { id: 'drafts', label: 'Drafts', icon: 'fa-regular fa-file-lines' },
  { id: 'spam', label: 'Spam', icon: 'fa-solid fa-shield' },
  { id: 'trash', label: 'Trash', icon: 'fa-regular fa-trash-can' },
]

/** Font Awesome glyph per attachment type (`attachIcon()` in CoolAdmin). */
export const ATTACHMENT_ICONS: Record<InboxAttachmentType, string> = {
  pdf: 'fa-file-pdf',
  xls: 'fa-file-excel',
  fig: 'fa-pen-ruler',
  img: 'fa-image',
}

/** Rows per page in the list pane. */
export const INBOX_PAGE_SIZE = 10

const avatar = (n: number): string => `/assets/img/avatar-0${n}.jpg`

export const inboxMessages: InboxMessage[] = [
  {
    id: 'em1',
    avatar: avatar(1),
    sender: 'John Doe',
    email: 'john@acme.co',
    label: 'work',
    subject: 'Q2 roadmap is ready for review',
    preview:
      "I've added the engineering and design tracks. Let me know what you think before Friday's sync.",
    time: '12 min',
    date: 'Today, 2:14 PM',
    unread: true,
    starred: true,
    attachments: [
      { name: 'q2-roadmap.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'eng-tracks.xlsx', size: '180 KB', type: 'xls' },
    ],
    body: `<p>Hey,</p><p>I've finished the first pass of the <strong>Q2 roadmap</strong>. The engineering and design tracks are spelled out, and I've added rough estimates for each initiative.</p><p>A few things I'd love your input on:</p><ul><li>Whether the auth refactor should stay in Q2 or shift to Q3</li><li>How aggressive we want to be on the analytics rollout</li><li>The proposed dependency between the design system v3 and onboarding flow</li></ul><p>Doc + spreadsheet attached. Let's chat <a href="#">on Friday's sync</a>, but happy to take async feedback before then.</p><p>Thanks,<br>John</p>`,
    folder: 'inbox',
  },
  {
    id: 'em2',
    avatar: avatar(4),
    sender: 'Diane Myers',
    email: 'diane@globex.io',
    label: 'alert',
    subject: 'Auth flow refactor — needs review',
    preview:
      "PR #2148 is ready. The migration touches user sessions so I'd like a careful look before merging.",
    time: '34 min',
    date: 'Today, 1:52 PM',
    unread: true,
    starred: false,
    body: `<p>Quick heads-up — <strong>PR #2148</strong> is ready for review.</p><p>The migration touches our session-token storage, which means we need to be careful about:</p><ol><li>Backwards compatibility during deploy (sessions issued before the migration)</li><li>The downstream effect on our refresh-token flow</li><li>Edge cases around the "remember me" extended sessions</li></ol><p>I've covered the main paths in tests but I'd love a second pair of eyes, especially on the <code>SessionStore.migrate()</code> implementation. Branch is <a href="#">refactor/auth-sessions</a>.</p><p>Aiming to merge by EOW.</p><p>— Diane</p>`,
    folder: 'inbox',
  },
  {
    id: 'em3',
    avatar: avatar(6),
    sender: 'Cynthia Harvey',
    email: 'cynthia@example.com',
    subject: 'Replied to your comment on Q1 retro',
    preview: "Agreed on the action items. Let's schedule a follow-up to scope the deck rebuild.",
    time: '1 hour',
    date: 'Today, 1:14 PM',
    unread: true,
    starred: true,
    body: `<p>Cynthia replied to your comment on <strong>Q1 retro</strong>:</p><blockquote>Agreed on the action items. Let's schedule a follow-up to scope the deck rebuild — I think we can knock it out in one focused session if we have all the data we need.</blockquote><p><a href="#">View thread →</a></p>`,
    folder: 'inbox',
  },
  {
    id: 'em4',
    avatar: avatar(2),
    sender: 'Robert Taylor',
    email: 'robert@hooli.com',
    label: 'work',
    subject: 'Onboarding wireframes ready',
    preview:
      "Final wires are in Figma. Let's walk through them on Wednesday before kicking off dev.",
    time: '2 hour',
    date: 'Today, 12:00 PM',
    unread: true,
    starred: false,
    attachments: [{ name: 'onboarding-v3.fig', size: '14 MB', type: 'fig' }],
    body: `<p>Hey team,</p><p>Final onboarding wireframes are ready in Figma. I've covered:</p><ul><li>Sign-up → email verification → workspace creation</li><li>Empty-state for first-time users</li><li>The optional tour overlay (we can A/B test this)</li></ul><p>Want to walk through them together on Wednesday? Should take ~45 min. After that I'm clear to hand off to engineering.</p><p>Cheers,<br>Robert</p>`,
    folder: 'inbox',
  },
  {
    id: 'em5',
    avatar: avatar(5),
    sender: 'Michelle Moreno',
    email: 'michelle@umbrella.co',
    subject: 'Brand assets uploaded to Figma',
    preview: 'New logo lockups, illustration kit, and motion stickers are in the "v3" library.',
    time: '3 hour',
    date: 'Today, 11:08 AM',
    unread: true,
    starred: false,
    body: `<p>FYI — uploaded the v3 brand library to Figma. Includes:</p><ul><li>Updated logo lockups (light + dark)</li><li>Illustration kit (16 spot illustrations)</li><li>Motion stickers for product onboarding</li></ul><p>Library link: <a href="#">cooladmin/v3</a>. Anyone with edit access can pull components into their files.</p>`,
    folder: 'inbox',
  },
  {
    id: 'em6',
    avatar: avatar(3),
    sender: 'Nicholas Martinez',
    email: 'nick@example.com',
    label: 'personal',
    subject: 'Re: dinner Saturday?',
    preview: '7:30 works. The new place on Hawthorne or back to the usual?',
    time: 'Yesterday',
    date: 'Yesterday, 8:42 PM',
    unread: false,
    starred: false,
    body: `<p>7:30 works for me 👍</p><p>The new place on Hawthorne or back to the usual? Either works, just lmk so I can book.</p>`,
    folder: 'inbox',
  },
  {
    id: 'em7',
    avatar: avatar(4),
    sender: 'GitHub',
    email: 'noreply@github.com',
    label: 'social',
    subject: '[acme/dashboard] PR #2148 approved by 2 reviewers',
    preview: 'All checks passing. Ready to merge to main.',
    time: 'Yesterday',
    date: 'Yesterday, 5:12 PM',
    unread: false,
    starred: true,
    body: `<p><strong>2 of 2 required approvals received.</strong> All checks passing.</p><p>This pull request is ready to be merged into <code>main</code>.</p><p><a href="#">View pull request →</a></p>`,
    folder: 'inbox',
  },
  {
    id: 'em8',
    avatar: avatar(6),
    sender: 'Cynthia Harvey',
    email: 'cynthia@example.com',
    subject: 'Out of office — back Monday',
    preview: "Please loop in Emma for anything urgent. I'll catch up on email when I'm back.",
    time: 'Yesterday',
    date: 'Yesterday, 9:30 AM',
    unread: false,
    starred: false,
    snoozed: true,
    body: `<p>Hi all,</p><p>I'm out of office until <strong>Monday morning</strong>. Please loop in <a href="#">Emma</a> for anything urgent — she has full context on the active workstreams.</p><p>I'll catch up on email when I'm back.</p><p>Cynthia</p>`,
    folder: 'inbox',
  },
  {
    id: 'em9',
    avatar: avatar(2),
    sender: 'Stripe',
    email: 'receipts@stripe.com',
    label: 'promo',
    subject: 'Your monthly receipt is available',
    preview: 'Invoice #INV-2026-04 for $1,248.00 was paid on May 1.',
    time: '2 days',
    date: 'May 1, 9:00 AM',
    unread: false,
    starred: false,
    attachments: [{ name: 'invoice-2026-04.pdf', size: '78 KB', type: 'pdf' }],
    body: `<p>Receipt for your records.</p><p><strong>Invoice #INV-2026-04</strong><br>Amount: <strong>$1,248.00</strong><br>Paid: May 1, 2026<br>Method: Visa •••• 4242</p><p>Receipt PDF attached for your records.</p>`,
    folder: 'inbox',
  },
  {
    id: 'em10',
    avatar: avatar(1),
    sender: 'John Doe',
    email: 'john@acme.co',
    subject: 'Sprint planning notes — sprint 24',
    preview: "Capacity, carry-over, and the three priority tracks. Read before Wednesday's sync.",
    time: '2 days',
    date: 'May 1, 8:14 AM',
    unread: false,
    starred: false,
    snoozed: true,
    body: `<p>Notes from sprint 24 planning. Read these before Wednesday's standup:</p><ol><li><strong>Capacity:</strong> 8 engineers × 0.8 = 6.4 effective seats</li><li><strong>Carry-over:</strong> 12 points (mostly on the auth refactor)</li><li><strong>Priority tracks:</strong> Auth, onboarding, billing</li></ol><p>Full notes in <a href="#">Notion</a>.</p>`,
    folder: 'inbox',
  },
  {
    id: 'em11',
    avatar: avatar(5),
    sender: 'Emma Carter',
    email: 'emma@example.com',
    label: 'work',
    subject: '1:1 agenda for Thursday',
    preview: 'A few things to cover: hiring update, Q3 planning, your career growth track.',
    time: '3 days',
    date: 'Apr 30, 4:18 PM',
    unread: false,
    starred: false,
    snoozed: true,
    body: `<p>Hey,</p><p>For our Thursday 1:1, I'd like to cover:</p><ul><li>Hiring update — we have 2 finalists for the senior eng role</li><li>Q3 planning — early thoughts on what to prioritize</li><li>Your career growth track — let's talk about the next level</li></ul><p>Anything else you want to add? I have us at 30 min but happy to extend if needed.</p>`,
    folder: 'inbox',
  },
  {
    id: 'em12',
    avatar: avatar(3),
    sender: 'Linear',
    email: 'noreply@linear.app',
    label: 'social',
    subject: '5 issues assigned to you this week',
    preview: 'ENG-1284, ENG-1290, ENG-1293, ENG-1294, ENG-1297. Earliest due May 18.',
    time: '5 days',
    date: 'Apr 28, 7:30 AM',
    unread: false,
    starred: false,
    body: `<p>You have <strong>5 issues</strong> assigned to you this week:</p><ul><li><a href="#">ENG-1284</a> — Fix avatar oval on mobile (due May 18)</li><li><a href="#">ENG-1290</a> — Add Cmd+K palette (due May 22)</li><li><a href="#">ENG-1293</a> — Onboarding wires review</li><li><a href="#">ENG-1294</a> — Brand assets v3 sync</li><li><a href="#">ENG-1297</a> — Sprint retro prep</li></ul><p><a href="#">View all in Linear →</a></p>`,
    folder: 'inbox',
  },
]

/** Which messages a folder tab shows. */
export function messagesInFolder(messages: InboxMessage[], folder: InboxFolder): InboxMessage[] {
  switch (folder) {
    case 'starred':
      return messages.filter(m => m.starred && m.folder !== 'trash')
    case 'snoozed':
      return messages.filter(m => m.snoozed && m.folder !== 'trash')
    default:
      return messages.filter(m => m.folder === folder)
  }
}
