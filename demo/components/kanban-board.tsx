'use client'

import { useState } from 'react'
import type { DragEvent, FormEvent, KeyboardEvent } from 'react'
import { IconButton, MButton, PageHeader, cn, useToast } from '@cooladmin/react'
import {
  KANBAN_COLUMNS,
  KANBAN_LABELS,
  KANBAN_META_ICONS,
  kanbanCards,
  moveKanbanCard,
} from '@/lib/kanban-data'
import type { KanbanCard, KanbanStatus } from '@/lib/kanban-data'

/**
 * Stateful body of /kanban — page header + four-column board with HTML5
 * drag-and-drop (port of `kanban.scripts.html`), an inline "Add card" form in
 * place of CoolAdmin's `prompt()`, and a keyboard-accessible "Move to…" select.
 */
export function KanbanBoard() {
  const toast = useToast()
  const [cards, setCards] = useState<KanbanCard[]>(kanbanCards)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dropTarget, setDropTarget] = useState<KanbanStatus | null>(null)
  const [adding, setAdding] = useState<KanbanStatus | null>(null)
  const [nextId, setNextId] = useState(kanbanCards.length + 1)

  const columnTitle = (status: KanbanStatus) =>
    KANBAN_COLUMNS.find(c => c.id === status)?.title ?? status

  /** Card whose vertical midpoint is first below the pointer (CoolAdmin's `nextCardAfter`). */
  const cardAfterPointer = (list: HTMLElement, y: number): string | null => {
    let closest: { offset: number; id: string | null } = { offset: -Infinity, id: null }
    list.querySelectorAll<HTMLElement>('.kanban-card:not(.is-dragging)').forEach(el => {
      const box = el.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) closest = { offset, id: el.dataset.id ?? null }
    })
    return closest.id
  }

  const onDragStart = (e: DragEvent<HTMLElement>, id: string) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
    setDraggingId(id)
  }

  const endDrag = () => {
    setDraggingId(null)
    setDropTarget(null)
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>, status: KanbanStatus) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (dropTarget !== status) setDropTarget(status)
    if (!draggingId) return
    const dragged = cards.find(c => c.id === draggingId)
    // Live reordering only within the source column keeps the dragged DOM node
    // mounted (a cross-column move would remount it and swallow `dragend`).
    if (dragged && dragged.status === status) {
      const beforeId = cardAfterPointer(e.currentTarget, e.clientY)
      setCards(list => moveKanbanCard(list, draggingId, status, beforeId))
    }
  }

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDropTarget(null)
  }

  const onDrop = (e: DragEvent<HTMLDivElement>, status: KanbanStatus) => {
    e.preventDefault()
    const id = draggingId ?? e.dataTransfer.getData('text/plain')
    if (id) {
      const beforeId = cardAfterPointer(e.currentTarget, e.clientY)
      setCards(list => moveKanbanCard(list, id, status, beforeId))
      toast.info('Card moved')
    }
    endDrag()
  }

  const moveTo = (card: KanbanCard, status: KanbanStatus) => {
    setCards(list => moveKanbanCard(list, card.id, status))
    toast.info('Card moved', `“${card.title}” → ${columnTitle(status)}`)
  }

  const addCard = (status: KanbanStatus, title: string) => {
    const card: KanbanCard = {
      id: `k${nextId}`,
      title,
      labels: ['feature'],
      meta: [{ kind: 'due', value: 'Today' }],
      assignees: [],
      status,
    }
    setNextId(n => n + 1)
    setCards(list => moveKanbanCard([...list, card], card.id, status))
    setAdding(null)
    toast.success('Card added')
  }

  return (
    <>
      <PageHeader
        title="Kanban board"
        subtitle="Drag-and-drop kanban board with columns and cards."
        actions={
          <>
            <MButton
              variant="ghost"
              icon="fa-solid fa-filter"
              onClick={() => toast.info('Filter options coming soon')}
            >
              Filter
            </MButton>
            <MButton variant="primary" icon="fa-solid fa-plus" onClick={() => setAdding('backlog')}>
              New card
            </MButton>
          </>
        }
      />

      <div className="kanban-board">
        {KANBAN_COLUMNS.map(col => {
          const items = cards.filter(c => c.status === col.id)
          return (
            <section
              className="kanban-col"
              data-status={col.id}
              key={col.id}
              aria-labelledby={`kanban-col-${col.id}`}
            >
              <header className="kanban-col__header">
                <h2 className="kanban-col__title" id={`kanban-col-${col.id}`}>
                  <span
                    className={`kanban-col__rail kanban-col__rail--${col.id}`}
                    aria-hidden="true"
                  />{' '}
                  {col.title}
                  <span className="kanban-col__count">{items.length}</span>
                </h2>
                <IconButton
                  icon="fa-solid fa-ellipsis"
                  label="Column options"
                  onClick={() => toast.info('Column options coming soon')}
                />
              </header>

              <div
                className={cn('kanban-col__list', dropTarget === col.id && 'is-drop-target')}
                onDragOver={e => onDragOver(e, col.id)}
                onDragLeave={onDragLeave}
                onDrop={e => onDrop(e, col.id)}
              >
                {items.map(card => (
                  <article
                    key={card.id}
                    className={cn('kanban-card', card.id === draggingId && 'is-dragging')}
                    draggable
                    data-id={card.id}
                    onDragStart={e => onDragStart(e, card.id)}
                    onDragEnd={endDrag}
                  >
                    <div className="kanban-card__labels">
                      {card.labels.map(l => (
                        <span key={l} className={`kanban-card__label kanban-card__label--${l}`}>
                          {KANBAN_LABELS[l]}
                        </span>
                      ))}
                    </div>
                    <p className="kanban-card__title">{card.title}</p>
                    <div className="kanban-card__footer">
                      <span className="kanban-card__meta">
                        {card.meta.map((m, i) => (
                          <span key={i}>
                            <i className={KANBAN_META_ICONS[m.kind]} aria-hidden="true" />
                            {m.value}
                            <span className="visually-hidden">
                              {m.kind === 'due' ? ' due' : ` ${m.kind}`}
                            </span>
                          </span>
                        ))}
                      </span>
                      <span className="kanban-card__end">
                        {card.assignees.length > 0 && (
                          <span className="kanban-card__avatars">
                            {card.assignees.map(src => (
                              <img key={src} src={src} alt="" />
                            ))}
                          </span>
                        )}
                        <select
                          className="kanban-card__move"
                          aria-label={`Move “${card.title}” to`}
                          value=""
                          onChange={e => {
                            if (e.target.value) moveTo(card, e.target.value as KanbanStatus)
                          }}
                        >
                          <option value="">Move to…</option>
                          {KANBAN_COLUMNS.filter(c => c.id !== col.id).map(c => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {col.canAdd && (
                <div className="kanban-col__add">
                  {adding === col.id ? (
                    <AddCardForm
                      onSubmit={title => addCard(col.id, title)}
                      onCancel={() => setAdding(null)}
                    />
                  ) : (
                    <button type="button" onClick={() => setAdding(col.id)}>
                      <i className="fa-solid fa-plus" aria-hidden="true" /> Add card
                    </button>
                  )}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </>
  )
}

interface AddCardFormProps {
  onSubmit: (title: string) => void
  onCancel: () => void
}

/** Inline replacement for CoolAdmin's `prompt('Card title:')`. */
function AddCardForm({ onSubmit, onCancel }: AddCardFormProps) {
  const [title, setTitle] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const value = title.trim()
    if (!value) return
    onSubmit(value)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') onCancel()
  }

  return (
    <form className="kanban-col__add-form" onSubmit={submit}>
      <input
        type="text"
        className="au-input"
        placeholder="Card title"
        aria-label="Card title"
        autoFocus
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="kanban-col__add-actions">
        <MButton variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </MButton>
        <MButton variant="primary" size="sm" type="submit" disabled={!title.trim()}>
          Add
        </MButton>
      </div>
    </form>
  )
}
