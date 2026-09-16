'use client'

import { useMemo, useState } from 'react'
import { cn, useBodyClass, useToast } from '@madhusudan-hegde/cooladmin-react'
import { INBOX_FOLDERS, INBOX_PAGE_SIZE, inboxMessages, messagesInFolder } from '@/lib/inbox-data'
import type { InboxFolder, InboxMessage } from '@/lib/inbox-data'
import { InboxList } from '@/components/inbox-list'
import { InboxReader } from '@/components/inbox-reader'

/**
 * Stateful body of /inbox — stats strip, folder tabs and the list/reader split
 * pane. Port of CoolAdmin's `inbox.scripts.html` onto React state.
 */
export function InboxView() {
  const toast = useToast()
  const [messages, setMessages] = useState<InboxMessage[]>(inboxMessages)
  const [folder, setFolder] = useState<InboxFolder>('inbox')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [readerOpen, setReaderOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [oldestFirst, setOldestFirst] = useState(false)
  const [page, setPage] = useState(1)

  // Mobile: the reader slides in as a full-screen overlay while this is set.
  useBodyClass('inbox-reader-open', readerOpen)

  const folderDef = INBOX_FOLDERS.find(f => f.id === folder) ?? INBOX_FOLDERS[0]

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = messagesInFolder(messages, folder)
    if (unreadOnly) list = list.filter(m => m.unread)
    if (q) {
      list = list.filter(m =>
        [m.sender, m.email, m.subject, m.preview].some(s => s.toLowerCase().includes(q))
      )
    }
    return oldestFirst ? [...list].reverse() : list
  }, [messages, folder, unreadOnly, query, oldestFirst])

  const pageCount = Math.max(1, Math.ceil(visible.length / INBOX_PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pageItems = visible.slice(
    (currentPage - 1) * INBOX_PAGE_SIZE,
    currentPage * INBOX_PAGE_SIZE
  )

  const inboxUnread = messages.filter(m => m.folder === 'inbox' && m.unread).length
  const starredCount = messages.filter(m => m.starred && m.folder !== 'trash').length
  const activeMessage = activeId ? messages.find(m => m.id === activeId) ?? null : null

  const folderCount = (id: InboxFolder) => messagesInFolder(messages, id).length

  const update = (id: string, patch: Partial<InboxMessage>) =>
    setMessages(list => list.map(m => (m.id === id ? { ...m, ...patch } : m)))

  const resetView = () => {
    setPage(1)
    setSelectedIds([])
  }

  const selectFolder = (id: InboxFolder) => {
    setFolder(id)
    resetView()
  }

  const openEmail = (id: string) => {
    update(id, { unread: false })
    setActiveId(id)
    setReaderOpen(true)
  }

  const closeReader = () => setReaderOpen(false)

  const resetReader = () => {
    setActiveId(null)
    setReaderOpen(false)
  }

  const toggleStar = (id: string) => {
    const m = messages.find(x => x.id === id)
    if (m) update(id, { starred: !m.starred })
  }

  const toggleSelect = (id: string) =>
    setSelectedIds(ids => (ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]))

  const toggleSelectAll = () => {
    const pageIds = pageItems.map(m => m.id)
    const allSelected = pageIds.length > 0 && pageIds.every(id => selectedIds.includes(id))
    setSelectedIds(ids =>
      allSelected ? ids.filter(id => !pageIds.includes(id)) : [...new Set([...ids, ...pageIds])]
    )
  }

  const markRead = () => {
    if (selectedIds.length) {
      setMessages(list => list.map(m => (selectedIds.includes(m.id) ? { ...m, unread: false } : m)))
      toast.success(
        `${selectedIds.length} message${selectedIds.length === 1 ? '' : 's'} marked as read`
      )
      setSelectedIds([])
      return
    }
    setMessages(list => list.map(m => ({ ...m, unread: false })))
    toast.success('All messages marked as read')
  }

  /** Trash keeps the message (it shows under the Trash tab); trashing again removes it for good. */
  const trash = (ids: string[]) => {
    setMessages(list =>
      list
        .filter(m => !(ids.includes(m.id) && m.folder === 'trash'))
        .map(m => (ids.includes(m.id) ? { ...m, folder: 'trash' as const } : m))
    )
    if (activeId && ids.includes(activeId)) resetReader()
    setSelectedIds(sel => sel.filter(id => !ids.includes(id)))
  }

  const deleteOne = (id: string) => {
    trash([id])
    toast.success('Moved to trash')
  }

  const deleteSelected = () => {
    const n = selectedIds.length
    trash(selectedIds)
    toast.success(`${n} message${n === 1 ? '' : 's'} moved to trash`)
  }

  const archive = (id: string) => {
    setMessages(list => list.filter(m => m.id !== id))
    setSelectedIds(sel => sel.filter(x => x !== id))
    toast.success('Email archived')
    resetReader()
  }

  const sendReply = () => toast.success('Reply sent')

  return (
    <>
      {/* Stats strip */}
      <div className="inbox-stats">
        <div className="inbox-stat">
          <span className="inbox-stat__icon">
            <i className="fa-regular fa-envelope" aria-hidden="true" />
          </span>
          <div className="inbox-stat__body">
            <p className="inbox-stat__label">Unread</p>
            <p className="inbox-stat__value">{inboxUnread}</p>
          </div>
        </div>
        <div className="inbox-stat">
          <span className="inbox-stat__icon inbox-stat__icon--warning">
            <i className="fa-solid fa-star" aria-hidden="true" />
          </span>
          <div className="inbox-stat__body">
            <p className="inbox-stat__label">Starred</p>
            <p className="inbox-stat__value">{starredCount}</p>
          </div>
        </div>
        <div className="inbox-stat">
          <span className="inbox-stat__icon inbox-stat__icon--c3">
            <i className="fa-regular fa-clock" aria-hidden="true" />
          </span>
          <div className="inbox-stat__body">
            <p className="inbox-stat__label">Snoozed</p>
            <p className="inbox-stat__value">{folderCount('snoozed')}</p>
          </div>
        </div>
        <div className="inbox-stat">
          <span className="inbox-stat__icon inbox-stat__icon--c2">
            <i className="fa-solid fa-paper-plane" aria-hidden="true" />
          </span>
          <div className="inbox-stat__body">
            <p className="inbox-stat__label">Sent today</p>
            <p className="inbox-stat__value">24</p>
          </div>
        </div>
      </div>

      {/* Folder tabs */}
      <nav className="inbox-tabs" aria-label="Inbox folders">
        {INBOX_FOLDERS.map(f => {
          const count = folderCount(f.id)
          const active = f.id === folder
          return (
            <button
              type="button"
              key={f.id}
              className={cn('inbox-tab', active && 'is-active')}
              aria-current={active ? 'true' : undefined}
              onClick={() => selectFolder(f.id)}
            >
              <i className={f.icon} aria-hidden="true" /> {f.label}
              {count > 0 && <span className="inbox-tab__count">{count}</span>}
            </button>
          )
        })}
      </nav>

      {/* Split pane: list + reader */}
      <div className="inbox-split">
        <InboxList
          items={pageItems}
          total={visible.length}
          unreadCount={visible.filter(m => m.unread).length}
          activeId={activeId}
          selectedIds={selectedIds}
          folderLabel={folderDef.label}
          query={query}
          unreadOnly={unreadOnly}
          oldestFirst={oldestFirst}
          page={currentPage}
          pageCount={pageCount}
          pageSize={INBOX_PAGE_SIZE}
          onOpen={openEmail}
          onToggleStar={toggleStar}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={toggleSelectAll}
          onRefresh={() => toast.success('Inbox refreshed')}
          onMarkRead={markRead}
          onDeleteSelected={deleteSelected}
          onQueryChange={value => {
            setQuery(value)
            setPage(1)
          }}
          onToggleUnreadOnly={() => {
            setUnreadOnly(v => !v)
            setPage(1)
          }}
          onToggleSort={() => {
            setOldestFirst(v => !v)
            setPage(1)
          }}
          onPageChange={setPage}
        />
        <InboxReader
          message={activeMessage}
          onBack={closeReader}
          onToggleStar={toggleStar}
          onArchive={archive}
          onDelete={deleteOne}
          onMore={() => toast.info('More options coming soon')}
          onDownload={name => toast.info(`Downloading ${name}`)}
          onReply={sendReply}
        />
      </div>
    </>
  )
}
