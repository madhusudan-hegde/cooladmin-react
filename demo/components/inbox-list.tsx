'use client'

import { EmptyState, IconButton, cn } from '@cooladmin/react'
import { INBOX_LABELS } from '@/lib/inbox-data'
import type { InboxMessage } from '@/lib/inbox-data'

export interface InboxListProps {
  /** Rows on the current page. */
  items: InboxMessage[]
  /** Size of the whole filtered view (for the toolbar count + pagination). */
  total: number
  unreadCount: number
  activeId: string | null
  selectedIds: string[]
  folderLabel: string
  query: string
  unreadOnly: boolean
  oldestFirst: boolean
  page: number
  pageCount: number
  pageSize: number
  onOpen: (id: string) => void
  onToggleStar: (id: string) => void
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
  onRefresh: () => void
  onMarkRead: () => void
  onDeleteSelected: () => void
  onQueryChange: (value: string) => void
  onToggleUnreadOnly: () => void
  onToggleSort: () => void
  onPageChange: (page: number) => void
}

/** Left pane of the inbox split view: toolbar, `.email-list` rows and pagination. */
export function InboxList({
  items,
  total,
  unreadCount,
  activeId,
  selectedIds,
  folderLabel,
  query,
  unreadOnly,
  oldestFirst,
  page,
  pageCount,
  pageSize,
  onOpen,
  onToggleStar,
  onToggleSelect,
  onToggleSelectAll,
  onRefresh,
  onMarkRead,
  onDeleteSelected,
  onQueryChange,
  onToggleUnreadOnly,
  onToggleSort,
  onPageChange,
}: InboxListProps) {
  const selectedCount = selectedIds.length
  const allSelected = items.length > 0 && items.every(m => selectedIds.includes(m.id))
  const someSelected = !allSelected && items.some(m => selectedIds.includes(m.id))

  const countText = selectedCount
    ? `${selectedCount} selected`
    : `${total} message${total === 1 ? '' : 's'}${unreadCount ? ` · ${unreadCount} unread` : ''}`

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <section className="inbox-list-pane" aria-label={`${folderLabel} messages`}>
      <div className="inbox-toolbar">
        <div className="inbox-toolbar__left">
          <span className="email-item__check inbox-toolbar__check">
            <input
              type="checkbox"
              aria-label="Select all messages on this page"
              checked={allSelected}
              disabled={items.length === 0}
              ref={el => {
                if (el) el.indeterminate = someSelected
              }}
              onChange={onToggleSelectAll}
            />
          </span>
          <IconButton icon="fa-solid fa-arrows-rotate" label="Refresh" onClick={onRefresh} />
          <IconButton
            icon="fa-solid fa-check-double"
            label={selectedCount ? 'Mark selected as read' : 'Mark all as read'}
            onClick={onMarkRead}
          />
          {selectedCount > 0 && (
            <IconButton
              icon="fa-regular fa-trash-can"
              label="Delete selected"
              onClick={onDeleteSelected}
            />
          )}
          <span className="inbox-toolbar__count" aria-live="polite">
            {countText}
          </span>
        </div>
        <div className="inbox-toolbar__right">
          <input
            type="search"
            className="au-input inbox-toolbar__search"
            placeholder="Search mail…"
            aria-label="Search mail"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
          />
          <IconButton
            icon="fa-solid fa-filter"
            label="Filter: unread only"
            active={unreadOnly}
            onClick={onToggleUnreadOnly}
          />
          <IconButton
            icon="fa-solid fa-arrow-up-wide-short"
            label="Sort: oldest first"
            active={oldestFirst}
            onClick={onToggleSort}
          />
        </div>
      </div>

      <ul className="email-list" role="list">
        {items.length === 0 && (
          <li className="email-list__empty">
            <EmptyState
              icon="fa-regular fa-folder-open"
              title={query ? 'No messages match your search' : `Nothing in ${folderLabel}`}
              text={
                query
                  ? 'Try a different sender, subject or keyword.'
                  : 'Messages you move here will show up in this folder.'
              }
            />
          </li>
        )}
        {items.map(m => {
          const hasAttachments = Boolean(m.attachments && m.attachments.length)
          const isActive = m.id === activeId
          return (
            <li
              key={m.id}
              className={cn('email-item', m.unread && 'is-unread', isActive && 'is-active')}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onOpen(m.id)}
            >
              <span className="email-item__check" onClick={e => e.stopPropagation()}>
                <input
                  type="checkbox"
                  aria-label={`Select email from ${m.sender}`}
                  checked={selectedIds.includes(m.id)}
                  onChange={() => onToggleSelect(m.id)}
                />
              </span>
              <button
                type="button"
                className={cn('email-item__star', m.starred && 'is-starred')}
                aria-label={m.starred ? 'Starred' : 'Star'}
                aria-pressed={m.starred}
                onClick={e => {
                  e.stopPropagation()
                  onToggleStar(m.id)
                }}
              >
                <i
                  className={cn('fa-star', m.starred ? 'fa-solid' : 'fa-regular')}
                  aria-hidden="true"
                />
              </button>
              <div className="email-item__avatar">
                <img src={m.avatar} alt="" />
              </div>
              <button
                type="button"
                className="email-item__body"
                onClick={e => {
                  e.stopPropagation()
                  onOpen(m.id)
                }}
              >
                <span className="email-item__sender">
                  {m.sender}
                  {m.label && (
                    <span className={`email-item__label email-item__label--${m.label}`}>
                      {INBOX_LABELS[m.label]}
                    </span>
                  )}
                </span>
                <span className="email-item__subject">
                  {m.subject}
                  <span className="email-item__preview">&mdash; {m.preview}</span>
                </span>
              </button>
              <div className="email-item__meta">
                {hasAttachments && (
                  <i className="fa-solid fa-paperclip" role="img" aria-label="Has attachments" />
                )}
                <span>{m.time}</span>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="inbox-pagination">
        <span>{total === 0 ? 'No messages' : `Showing ${start}–${end} of ${total}`}</span>
        <div className="inbox-pagination__nav">
          <IconButton
            icon="fa-solid fa-chevron-left"
            label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          />
          <IconButton
            icon="fa-solid fa-chevron-right"
            label="Next page"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          />
        </div>
      </div>
    </section>
  )
}
