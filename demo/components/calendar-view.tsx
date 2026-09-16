'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  Input,
  MButton,
  Select,
  Skeleton,
  resolveColor,
  useAccent,
  useColorMode,
  useToast,
} from '@cooladmin/react'
import {
  CALENDAR_EVENT_TYPE_OPTIONS,
  CALENDAR_TAG_COLORS,
  buildEvents,
  upcomingEvents,
  ymd,
  ymdt,
} from '@/lib/calendar-data'
import type { CalendarEvent, CalendarEventType } from '@/lib/calendar-data'
import { loadScript, loadStyle } from '@/lib/load-external'

/* ------------------------------------------------------------------------
   FullCalendar 7 assets (vendored under demo/public/vendor).
   Order matters: skeleton → theme → palette CSS; core JS before the theme JS
   (the theme self-registers into FullCalendar.Shared.globalPlugins).
   ------------------------------------------------------------------------ */
const FC_BASE = '/vendor/fullcalendar-7.0.2'
const FC_STYLES = [
  `${FC_BASE}/skeleton.css`,
  `${FC_BASE}/themes/classic/theme.css`,
  `${FC_BASE}/themes/classic/palette.css`,
]
const FC_SCRIPTS = [
  `${FC_BASE}/fullcalendar.global.js`,
  `${FC_BASE}/themes/classic/theme.global.js`,
]

async function loadFullCalendar(): Promise<void> {
  for (const href of FC_STYLES) await loadStyle(href)
  for (const src of FC_SCRIPTS) await loadScript(src)
}

/* ------------------------------------------------------------------------
   Shared page state: the generated events + the "Add event" form toggle.
   ------------------------------------------------------------------------ */
interface CalendarContextValue {
  /** `null` until mounted — events are generated on the client from today's date. */
  events: CalendarEvent[] | null
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void
  formOpen: boolean
  setFormOpen: (open: boolean) => void
}

const CalendarContext = createContext<CalendarContextValue | undefined>(undefined)

function useCalendarContext(): CalendarContextValue {
  const ctx = useContext(CalendarContext)
  if (!ctx) throw new Error('Calendar components must be rendered inside <CalendarProvider>')
  return ctx
}

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[] | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const counter = useRef(0)

  // Generated after mount so server and client never disagree on "today".
  useEffect(() => {
    setEvents(buildEvents(new Date()))
  }, [])

  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
    counter.current += 1
    const id = `custom-${counter.current}`
    setEvents(prev => [...(prev ?? []), { ...event, id }])
  }, [])

  const value = useMemo(
    () => ({ events, addEvent, formOpen, setFormOpen }),
    [events, addEvent, formOpen]
  )
  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
}

/* ------------------------------------------------------------------------
   Page-header actions (Export / Add event).
   ------------------------------------------------------------------------ */
export function CalendarActions() {
  const { formOpen, setFormOpen, events } = useCalendarContext()
  const toast = useToast()
  return (
    <>
      <MButton
        variant="ghost"
        icon="fa-solid fa-download"
        onClick={() =>
          toast.info('Export started', `${events?.length ?? 0} events will be exported as .ics`)
        }
      >
        Export
      </MButton>
      <MButton
        variant="primary"
        icon="fa-solid fa-plus"
        aria-expanded={formOpen}
        aria-controls="calendar-add-event"
        onClick={() => setFormOpen(!formOpen)}
      >
        Add event
      </MButton>
    </>
  )
}

/* ------------------------------------------------------------------------
   Inline "Add event" form (replaces CoolAdmin's `prompt()`).
   ------------------------------------------------------------------------ */
function AddEventForm() {
  const { addEvent, setFormOpen } = useCalendarContext()
  const toast = useToast()
  const today = useMemo(() => ymd(new Date()), [])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(today)
  const [time, setTime] = useState('09:00')
  const [allDay, setAllDay] = useState(false)
  const [type, setType] = useState<CalendarEventType>('meeting')
  const [error, setError] = useState<string | null>(null)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) {
      setError('Give the event a title.')
      return
    }
    const [y, m, d] = date.split('-').map(Number)
    const day = new Date(y, m - 1, d)
    if (Number.isNaN(day.getTime())) {
      setError('Pick a valid date.')
      return
    }
    let start = ymd(day)
    let end: string | null = null
    if (!allDay) {
      const [h, mm] = time.split(':').map(Number)
      start = ymdt(day, h, mm)
      const endDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), h + 1, mm)
      end = ymdt(endDate, endDate.getHours(), endDate.getMinutes())
    }
    addEvent({ title: trimmed, start, end, allDay, type })
    toast.success('Event added', trimmed)
    setTitle('')
    setError(null)
    setFormOpen(false)
  }

  return (
    <form
      id="calendar-add-event"
      className="calendar-add-event"
      onSubmit={submit}
      aria-label="Add event"
      noValidate
    >
      <Input
        label="Title"
        placeholder="e.g. Design sync"
        value={title}
        onChange={e => setTitle(e.target.value)}
        error={error}
        autoFocus
        required
      />
      <Input
        label="Date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <Input
        label="Time"
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        disabled={allDay}
      />
      <Select
        label="Type"
        value={type}
        onChange={e => setType(e.target.value as CalendarEventType)}
        options={CALENDAR_EVENT_TYPE_OPTIONS}
      />
      <div className="form-check calendar-add-event__allday">
        <input
          className="form-check-input"
          type="checkbox"
          id="calendar-add-event-allday"
          checked={allDay}
          onChange={e => setAllDay(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="calendar-add-event-allday">
          All day
        </label>
      </div>
      <div className="calendar-add-event__actions">
        <MButton type="submit" variant="primary" icon="fa-solid fa-check">
          Save event
        </MButton>
        <MButton variant="ghost" onClick={() => setFormOpen(false)}>
          Cancel
        </MButton>
      </div>
    </form>
  )
}

/* ------------------------------------------------------------------------
   The FullCalendar instance.
   ------------------------------------------------------------------------ */
export function EventCalendar() {
  const { events, formOpen } = useCalendarContext()
  const toast = useToast()
  const { accent } = useAccent()
  const { resolved } = useColorMode()
  const containerRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<FullCalendarInstance | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  // Create once; destroy on unmount.
  useEffect(() => {
    let cancelled = false
    const el = containerRef.current
    if (!el) return

    loadFullCalendar()
      .then(() => {
        const FC = window.FullCalendar
        if (cancelled || !FC || containerRef.current !== el) return
        const calendar = new FC.Calendar(el, {
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          },
          height: 'auto',
          eventDisplay: 'block',
          displayEventTime: true,
          dayMaxEvents: 3,
          moreLinkText: 'more',
          navLinks: true,
          nowIndicator: true,
          /* v7 generates hashed internal class names, so CoolAdmin styling hooks
             in through the public *Class options (see pages/_calendar.scss). */
          dayHeaderInnerClass: 'ca-fc-day-header',
          dayCellTopInnerClass: 'ca-fc-day-number',
          eventTimeFormat: { hour: 'numeric', minute: '2-digit', meridiem: 'short' },
          eventClick: (info: { jsEvent: Event; event: FullCalendarEventApi }) => {
            info.jsEvent.preventDefault()
            const e = info.event
            const start = e.start
              ? e.start.toLocaleString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })
              : ''
            const end = e.end
              ? e.end.toLocaleString(undefined, { hour: 'numeric', minute: '2-digit' })
              : ''
            /* Demo feedback — swap for your own detail view / modal. */
            toast.info(e.title, end ? `${start} – ${end}` : start)
          },
        })
        calendar.render()
        calendarRef.current = calendar
        setStatus('ready')
      })
      .catch(err => {
        console.error('Calendar: failed to load FullCalendar', err)
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
      calendarRef.current?.destroy()
      calendarRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Push events (with token colours resolved against the current theme) whenever
  // the data, the accent preset or the colour mode changes.
  useEffect(() => {
    const calendar = calendarRef.current
    const el = containerRef.current
    if (status !== 'ready' || !calendar || !el || !events) return
    const resolvedEvents = events.map(ev => {
      const colors = CALENDAR_TAG_COLORS[ev.type]
      return {
        id: ev.id,
        title: ev.title,
        start: ev.start,
        end: ev.end ?? undefined,
        allDay: ev.allDay,
        /* FullCalendar 7 replaced backgroundColor/borderColor/textColor with
           `color` (fill) + `contrastColor` (text). */
        color: resolveColor(colors.bg, el),
        contrastColor: resolveColor(colors.fg, el),
        extendedProps: { type: ev.type },
      }
    })
    calendar.getEventSources().forEach(source => source.remove())
    calendar.addEventSource(resolvedEvents)
  }, [status, events, accent, resolved])

  return (
    <>
      {formOpen && <AddEventForm />}
      {status === 'loading' && (
        <div className="calendar-loading" aria-busy="true">
          <Skeleton size="md" />
          <Skeleton variant="block" height={420} width="100%" />
        </div>
      )}
      {status === 'error' && (
        <p className="calendar-error" role="alert">
          The calendar could not be loaded. Check that <code>/vendor/fullcalendar-7.0.2/</code> is
          served.
        </p>
      )}
      <div id="calendar" ref={containerRef} className="calendar-container" />
    </>
  )
}

/* ------------------------------------------------------------------------
   Sidebar "Upcoming events" (next 6 from today).
   ------------------------------------------------------------------------ */
export function UpcomingEvents() {
  const { events } = useCalendarContext()
  const upcoming = useMemo(() => (events ? upcomingEvents(events, new Date()) : null), [events])

  if (!upcoming) {
    return (
      <ul className="deadline-list" aria-busy="true">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i}>
            <Skeleton variant="block" width={44} height={44} />
            <div className="deadline-list__body">
              <Skeleton size="md" />
              <Skeleton size="sm" />
            </div>
          </li>
        ))}
      </ul>
    )
  }

  if (upcoming.length === 0) {
    return (
      <ul className="deadline-list">
        <li className="deadline-list__empty">No upcoming events.</li>
      </ul>
    )
  }

  return (
    <ul className="deadline-list">
      {upcoming.map(ev => (
        <li key={ev.id}>
          <div className="deadline-list__date">
            <strong>{ev.day}</strong>
            <span>{ev.month}</span>
          </div>
          <div className="deadline-list__body">
            <p className="deadline-list__title">{ev.title}</p>
            <span className="deadline-list__project">{ev.meta}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
