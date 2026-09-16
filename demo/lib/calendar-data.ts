/**
 * Calendar page data (port of CoolAdmin's calendar.scripts.html).
 *
 * The calendar populates itself with events spread across the CURRENT month
 * every time the page loads, so whether someone opens the demo in May 2026 or
 * March 2030 it always shows a populated month with past, present and upcoming
 * events. Colours are `--m-*` token references; `CalendarView` resolves them
 * against the DOM before handing them to FullCalendar (canvas-free, but v7
 * applies `color`/`contrastColor` as concrete CSS values).
 */

export type CalendarEventType =
  | 'meeting'
  | 'task'
  | 'presentation'
  | 'deadline'
  | 'personal'
  | 'custom'

export interface CalendarEvent {
  id: string
  title: string
  /** ISO date (`YYYY-MM-DD`) or datetime (`YYYY-MM-DDTHH:mm:ss`), local time. */
  start: string
  end: string | null
  allDay: boolean
  type: CalendarEventType
}

/** Event-type palette — `fg` is the text colour, the fill is `fg` at ~15% alpha. */
export const CALENDAR_TAG_COLORS: Record<CalendarEventType, { fg: string; bg: string }> = {
  meeting: { fg: 'var(--m-c1)', bg: 'var(--m-c1-soft)' },
  task: { fg: 'var(--m-c2)', bg: 'var(--m-c2-soft)' },
  presentation: { fg: 'var(--m-c4)', bg: 'var(--m-c4-soft)' },
  deadline: { fg: 'var(--m-danger)', bg: 'var(--m-danger-soft)' },
  personal: { fg: 'var(--m-c3)', bg: 'var(--m-c3-soft)' },
  custom: { fg: 'var(--m-accent)', bg: 'var(--m-accent-soft)' },
}

/** Sidebar "Event types" legend (markup order from calendar.html). */
export const CALENDAR_LEGEND: Array<{ label: string; color: string }> = [
  { label: 'Meetings', color: 'var(--m-c1)' },
  { label: 'Tasks', color: 'var(--m-c2)' },
  { label: 'Appointments', color: 'var(--m-warning)' },
  { label: 'Deadlines', color: 'var(--m-danger)' },
  { label: 'Presentations', color: 'var(--m-c4)' },
]

/** Options for the "Add event" form. */
export const CALENDAR_EVENT_TYPE_OPTIONS: Array<{ value: CalendarEventType; label: string }> = [
  { value: 'meeting', label: 'Meeting' },
  { value: 'task', label: 'Task' },
  { value: 'presentation', label: 'Presentation' },
  { value: 'deadline', label: 'Deadline' },
  { value: 'personal', label: 'Personal' },
]

const pad = (n: number) => String(n).padStart(2, '0')

export const ymd = (d: Date): string =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

export const ymdt = (d: Date, h: number, mm = 0): string => `${ymd(d)}T${pad(h)}:${pad(mm)}:00`

/** Generate ~20 events spread across the month containing `today`. */
export function buildEvents(today: Date): CalendarEvent[] {
  const y = today.getFullYear()
  const m = today.getMonth()
  const sameMonth = (d: Date) => d.getMonth() === m && d.getFullYear() === y
  const offset = (n: number) => {
    const d = new Date(today)
    d.setDate(today.getDate() + n)
    return d
  }
  const nthDow = (n: number, dow: number): Date | null => {
    const d = new Date(y, m, 1)
    let count = 0
    while (d.getMonth() === m) {
      if (d.getDay() === dow) {
        count++
        if (count === n) return new Date(d)
      }
      d.setDate(d.getDate() + 1)
    }
    return null
  }
  const lastDow = (dow: number): Date => {
    const d = new Date(y, m + 1, 0)
    while (d.getDay() !== dow) d.setDate(d.getDate() - 1)
    return d
  }

  let seq = 0
  const events: CalendarEvent[] = []
  const e = (
    title: string,
    start: string,
    end: string | null,
    allDay: boolean,
    type: CalendarEventType
  ) => {
    events.push({ id: `ev-${++seq}`, title, start, end, allDay, type })
  }

  // 1. Recurring daily standup — every weekday, 9:00–9:15
  const cur = new Date(y, m, 1)
  while (cur.getMonth() === m) {
    const dow = cur.getDay()
    if (dow >= 1 && dow <= 5) e('Team standup', ymdt(cur, 9, 0), ymdt(cur, 9, 15), false, 'meeting')
    cur.setDate(cur.getDate() + 1)
  }

  // 2. Sprint planning — first Monday, 10:00–11:30
  const sp = nthDow(1, 1)
  if (sp) e('Sprint planning', ymdt(sp, 10, 0), ymdt(sp, 11, 30), false, 'meeting')

  // 3. Sprint retro — last Friday, 15:00–16:30
  const retro = lastDow(5)
  e('Sprint retro', ymdt(retro, 15, 0), ymdt(retro, 16, 30), false, 'meeting')

  // 4. 1:1 with manager — every other Tuesday, 14:00
  const firstTue = nthDow(1, 2)
  if (firstTue) {
    for (let week = 0; week < 5; week += 2) {
      const d = new Date(firstTue)
      d.setDate(d.getDate() + week * 7)
      if (!sameMonth(d)) break
      e('1:1 with manager', ymdt(d, 14, 0), ymdt(d, 14, 30), false, 'meeting')
    }
  }

  // 5. Town hall — 3rd Thursday, 16:00–17:00
  const th = nthDow(3, 4)
  if (th) e('All-hands town hall', ymdt(th, 16, 0), ymdt(th, 17, 0), false, 'presentation')

  // 6. Today (or next weekday) — Design review with stakeholders
  let t0 = new Date(today)
  if (t0.getDay() === 0) t0 = offset(1)
  if (t0.getDay() === 6) t0 = offset(2)
  if (sameMonth(t0)) {
    e('Design review with stakeholders', ymdt(t0, 11, 0), ymdt(t0, 12, 30), false, 'presentation')
  }

  // 7. Today + 2 — Customer interviews (pricing)
  const t2 = offset(2)
  if (sameMonth(t2))
    e('Customer interviews — pricing', ymdt(t2, 13, 0), ymdt(t2, 14, 0), false, 'task')

  // 8. Today + 4 — Client demo (Acme)
  const t4 = offset(4)
  if (sameMonth(t4))
    e('Client demo — Acme', ymdt(t4, 14, 0), ymdt(t4, 15, 30), false, 'presentation')

  // 9. Today + 7 — Code freeze (all-day)
  const t7 = offset(7)
  if (sameMonth(t7)) e('Code freeze', ymd(t7), null, true, 'deadline')

  // 10. Today + 12 — Q2 product launch (all-day)
  const t12 = offset(12)
  if (sameMonth(t12)) e('Q2 product launch', ymd(t12), null, true, 'presentation')

  // 11. Today − 5 — Brand kickoff (past event)
  const tn5 = offset(-5)
  if (sameMonth(tn5)) e('Brand kickoff', ymdt(tn5, 10, 30), ymdt(tn5, 12, 0), false, 'meeting')

  // 12. Today − 9 — Quarterly OKR review (past, all-day)
  const tn9 = offset(-9)
  if (sameMonth(tn9)) e('Quarterly OKR review', ymd(tn9), null, true, 'deadline')

  // 13. Mid-month all-day team offsite (15th, or last day if month is short)
  const lastDayOfMonth = new Date(y, m + 1, 0).getDate()
  const offsite = new Date(y, m, Math.min(15, lastDayOfMonth))
  e('Team strategy offsite', ymd(offsite), null, true, 'task')

  // 14. Personal — gym (twice a week, Mon + Wed evenings, 18:30)
  const cursor = new Date(y, m, 1)
  while (cursor.getMonth() === m) {
    if (cursor.getDay() === 1 || cursor.getDay() === 3) {
      e('Gym', ymdt(cursor, 18, 30), ymdt(cursor, 19, 30), false, 'personal')
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  // 15. Friday afternoon coffee chat (every Friday, 16:30)
  const cof = new Date(y, m, 1)
  while (cof.getMonth() === m) {
    if (cof.getDay() === 5)
      e('Coffee with the team', ymdt(cof, 16, 30), ymdt(cof, 17, 0), false, 'personal')
    cof.setDate(cof.getDate() + 1)
  }

  return events
}

export interface UpcomingEvent {
  id: string
  day: string
  month: string
  title: string
  meta: string
}

/** The next `limit` events from the start of today, sorted ascending (sidebar "Upcoming events"). */
export function upcomingEvents(all: CalendarEvent[], now: Date, limit = 6): UpcomingEvent[] {
  const todayStart = new Date(now)
  todayStart.setHours(0, 0, 0, 0)
  return all
    .map(ev => ({ ev, start: new Date(ev.start) }))
    .filter(x => x.start >= todayStart)
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, limit)
    .map(({ ev, start }) => ({
      id: ev.id,
      day: pad(start.getDate()),
      month: start.toLocaleDateString(undefined, { month: 'short' }),
      title: ev.title,
      meta: ev.allDay
        ? 'All day'
        : start.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true }),
    }))
}
