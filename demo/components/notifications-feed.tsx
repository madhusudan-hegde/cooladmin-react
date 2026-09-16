'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { EmptyState, MButton, MCard, PageHeader, cn, useToast } from '@madhusudan-hegde/cooladmin-react'
import {
  NOTIFICATION_CHIP_LABELS,
  NOTIFICATION_FILTERS,
  NOTIFICATION_GROUPS,
  notifications,
} from '@/lib/notifications-data'
import type { NotificationEntry, NotificationFilter } from '@/lib/notifications-data'

/** Matches the 200ms fade + 20ms grace in CoolAdmin's dismiss handler. */
const DISMISS_MS = 220

/** `**bold**` → `<b>`, `` `code` `` → `<code>` (CoolAdmin's inline markup). */
function renderText(text: string): ReactNode {
  return text.split(/(\*\*.+?\*\*|`.+?`)/g).map((part, i) => {
    if (part.startsWith('**')) return <b key={i}>{part.slice(2, -2)}</b>
    if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>
    return part
  })
}

/**
 * Stateful body of /notifications — page header, category filters and the
 * day-grouped `.notif-list`s (port of `notifications.scripts.html`).
 */
export function NotificationsFeed() {
  const toast = useToast()
  const [items, setItems] = useState<NotificationEntry[]>(notifications)
  const [filter, setFilter] = useState<NotificationFilter>('all')
  const [dismissing, setDismissing] = useState<string[]>([])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
    },
    []
  )

  const countFor = (id: NotificationFilter) =>
    id === 'all' ? items.length : items.filter(n => n.type === id).length

  const visible = filter === 'all' ? items : items.filter(n => n.type === filter)
  const unreadCount = items.filter(n => n.unread).length

  const dismiss = (id: string) => {
    setDismissing(list => [...list, id])
    timers.current.push(
      setTimeout(() => {
        setItems(list => list.filter(n => n.id !== id))
        setDismissing(list => list.filter(x => x !== id))
      }, DISMISS_MS)
    )
  }

  const markRead = (id: string) =>
    setItems(list => list.map(n => (n.id === id && n.unread ? { ...n, unread: false } : n)))

  const markAllRead = () => {
    setItems(list => list.map(n => (n.unread ? { ...n, unread: false } : n)))
    toast.success('All notifications marked as read')
  }

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Activity log with date grouping and category filters."
        actions={
          <>
            <MButton
              variant="ghost"
              icon="fa-solid fa-check-double"
              onClick={markAllRead}
              disabled={unreadCount === 0}
            >
              Mark all read
            </MButton>
            <MButton
              variant="primary"
              icon="fa-solid fa-gear"
              href="/account/profile#tab-notifications"
            >
              Preferences
            </MButton>
          </>
        }
      />

      <div className="notif-filters" role="group" aria-label="Filter notifications">
        {NOTIFICATION_FILTERS.map(f => (
          <button
            type="button"
            key={f.id}
            className={cn('notif-filter', filter === f.id && 'is-active')}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label} <span className="notif-filter__count">{countFor(f.id)}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <MCard>
          <EmptyState
            icon="fa-regular fa-bell-slash"
            title="You’re all caught up"
            text={
              filter === 'all'
                ? 'No notifications right now. New activity will show up here.'
                : `No ${NOTIFICATION_FILTERS.find(
                    f => f.id === filter
                  )?.label.toLowerCase()} notifications right now.`
            }
            actions={
              filter !== 'all' && (
                <MButton variant="ghost" size="sm" onClick={() => setFilter('all')}>
                  Show all
                </MButton>
              )
            }
          />
        </MCard>
      ) : (
        NOTIFICATION_GROUPS.map(group => {
          const rows = visible.filter(n => n.group === group)
          if (rows.length === 0) return null
          return (
            <div className="notif-day" key={group}>
              <p className="notif-day__label">{group}</p>
              <ul className="notif-list">
                {rows.map(n => (
                  <li
                    key={n.id}
                    className={cn(
                      n.unread && 'is-unread',
                      dismissing.includes(n.id) && 'is-dismissing'
                    )}
                    onClick={() => markRead(n.id)}
                  >
                    <span
                      className={cn('notif-list__icon', n.tone && `notif-list__icon--${n.tone}`)}
                    >
                      {n.avatar ? (
                        <img src={n.avatar} alt="" />
                      ) : (
                        <i className={n.icon} aria-hidden="true" />
                      )}
                    </span>
                    <div className="notif-list__body">
                      <p className="notif-list__text">
                        {n.unread && <span className="visually-hidden">Unread: </span>}
                        {renderText(n.text)}
                      </p>
                      <div className="notif-list__meta">
                        {n.type && (
                          <span className={`notif-list__chip notif-list__chip--${n.type}`}>
                            {NOTIFICATION_CHIP_LABELS[n.type]}
                          </span>
                        )}
                        <span>{n.time}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="notif-list__close"
                      aria-label="Dismiss"
                      onClick={e => {
                        e.stopPropagation()
                        dismiss(n.id)
                      }}
                    >
                      <i className="fa-solid fa-xmark" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        })
      )}

      <div className="notif-load-more">
        <MButton
          variant="ghost"
          onClick={() => toast.info('You’re all caught up', 'No older notifications to load.')}
        >
          Load older notifications
        </MButton>
      </div>
    </>
  )
}
