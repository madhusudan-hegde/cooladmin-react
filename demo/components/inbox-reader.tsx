'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { EmptyState, IconButton, cn } from '@madhusudan-hegde/cooladmin-react'
import { ATTACHMENT_ICONS, INBOX_LABELS } from '@/lib/inbox-data'
import type { InboxMessage } from '@/lib/inbox-data'

export interface InboxReaderProps {
  message: InboxMessage | null
  onBack: () => void
  onToggleStar: (id: string) => void
  onArchive: (id: string) => void
  onDelete: (id: string) => void
  onMore: () => void
  onDownload: (name: string) => void
  onReply: (id: string, text: string) => void
}

/** Right pane of the inbox split view (`.inbox-reader-pane`). */
export function InboxReader({
  message,
  onBack,
  onToggleStar,
  onArchive,
  onDelete,
  onMore,
  onDownload,
  onReply,
}: InboxReaderProps) {
  return (
    <section className="inbox-reader-pane" aria-label="Email reader">
      {message ? (
        <ReaderContent
          key={message.id}
          message={message}
          onBack={onBack}
          onToggleStar={onToggleStar}
          onArchive={onArchive}
          onDelete={onDelete}
          onMore={onMore}
          onDownload={onDownload}
          onReply={onReply}
        />
      ) : (
        <div className="inbox-reader__empty">
          <EmptyState
            icon="fa-regular fa-envelope-open"
            title="Select an email to read"
            text="Pick a message from the list on the left to see its full contents."
          />
        </div>
      )}
    </section>
  )
}

interface ReaderContentProps extends Omit<InboxReaderProps, 'message'> {
  message: InboxMessage
}

function ReaderContent({
  message,
  onBack,
  onToggleStar,
  onArchive,
  onDelete,
  onMore,
  onDownload,
  onReply,
}: ReaderContentProps) {
  const [reply, setReply] = useState('')
  const firstName = message.sender.split(' ')[0]

  const sendReply = (e: FormEvent) => {
    e.preventDefault()
    const text = reply.trim()
    if (!text) return
    onReply(message.id, text)
    setReply('')
  }

  return (
    <>
      <header className="inbox-reader__header">
        <button type="button" className="inbox-reader__back" onClick={onBack}>
          <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back
        </button>
        <div>
          <h2 className="inbox-reader__subject">{message.subject}</h2>
          <div className="inbox-reader__labels">
            {message.label && (
              <span className={`email-item__label email-item__label--${message.label}`}>
                {INBOX_LABELS[message.label]}
              </span>
            )}
          </div>
        </div>
        <div className="inbox-reader__actions">
          <IconButton
            icon={cn('fa-star', message.starred ? 'fa-solid' : 'fa-regular')}
            label={message.starred ? 'Starred' : 'Star'}
            title="Star"
            aria-pressed={message.starred}
            className={cn(message.starred && 'is-starred')}
            onClick={() => onToggleStar(message.id)}
          />
          <IconButton
            icon="fa-solid fa-box-archive"
            label="Archive"
            onClick={() => onArchive(message.id)}
          />
          <IconButton
            icon="fa-regular fa-trash-can"
            label="Delete"
            onClick={() => onDelete(message.id)}
          />
          <IconButton icon="fa-solid fa-ellipsis-vertical" label="More" onClick={onMore} />
        </div>
      </header>

      <div className="inbox-reader__sender">
        <div className="inbox-reader__sender-avatar">
          <img src={message.avatar} alt="" />
        </div>
        <div className="inbox-reader__sender-info">
          <p className="inbox-reader__sender-name">{message.sender}</p>
          <p className="inbox-reader__sender-meta">
            to <strong>me</strong> &middot; {message.email}
          </p>
        </div>
        <span className="inbox-reader__date">{message.date}</span>
      </div>

      {/* Static, trusted sample copy from CoolAdmin's inbox dataset. */}
      <div className="inbox-reader__body" dangerouslySetInnerHTML={{ __html: message.body }} />

      {message.attachments && message.attachments.length > 0 && (
        <div className="inbox-reader__attachments">
          {message.attachments.map(a => (
            <button
              type="button"
              key={a.name}
              className="inbox-reader__attachment"
              onClick={() => onDownload(a.name)}
            >
              <span className="inbox-reader__attachment-icon">
                <i className={`fa-regular ${ATTACHMENT_ICONS[a.type]}`} aria-hidden="true" />
              </span>
              <span className="inbox-reader__attachment-info">
                <span className="inbox-reader__attachment-name">{a.name}</span>
                <span className="inbox-reader__attachment-size">{a.size}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      <form className="inbox-reader__quick-reply" onSubmit={sendReply}>
        <input
          type="text"
          placeholder={`Reply to ${firstName}…`}
          aria-label={`Reply to ${message.sender}`}
          value={reply}
          onChange={e => setReply(e.target.value)}
        />
        <button type="submit" aria-label="Send">
          <i className="fa-solid fa-paper-plane" aria-hidden="true" />
        </button>
      </form>
    </>
  )
}
