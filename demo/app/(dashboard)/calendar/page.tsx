import { Footer, MCard, PageHeader } from '@cooladmin/react'
import { CALENDAR_LEGEND } from '@/lib/calendar-data'
import {
  CalendarActions,
  CalendarProvider,
  EventCalendar,
  UpcomingEvents,
} from '@/components/calendar-view'

export const metadata = { title: 'Calendar' }

/** CoolAdmin calendar.html — FullCalendar 7 month/week/day/list views + upcoming list. */
export default function CalendarPage() {
  return (
    <CalendarProvider>
      <PageHeader
        title="Calendar"
        subtitle="Event calendar built with FullCalendar 7 and Bootstrap 5 styling."
        actions={<CalendarActions />}
      />

      <div className="row row-tight">
        <div className="col-lg-9">
          <MCard title="Event calendar" subtitle="Click any day or event to see details.">
            <EventCalendar />
          </MCard>
        </div>
        <div className="col-lg-3">
          <MCard title="Upcoming events" subtitle="Next two weeks.">
            <UpcomingEvents />
          </MCard>

          <MCard title="Event types" className="mt-3">
            <ul className="legend-list">
              {CALENDAR_LEGEND.map(item => (
                <li key={item.label}>
                  <span
                    className="legend-dot"
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </MCard>
        </div>
      </div>

      <Footer />
    </CalendarProvider>
  )
}
