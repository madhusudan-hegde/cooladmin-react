'use client'

import { useId } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'
import { PriorityChip } from './priority-chip'
import type { PriorityLevel } from './priority-chip'

export interface TaskListItem {
  id: string | number
  label: ReactNode
  done?: boolean
  due?: ReactNode
  priority?: PriorityLevel
}

export interface TaskListProps {
  items: TaskListItem[]
  /** Controlled mode: called with the task id and its next `done` value. */
  onToggle?: (id: TaskListItem['id'], done: boolean) => void
  className?: string
}

/**
 * "My tasks" checklist (`.task-list > .task-item`). Controlled when `onToggle`
 * is given; otherwise the checkboxes manage their own state.
 */
export function TaskList({ items, onToggle, className }: TaskListProps) {
  const baseId = useId()

  return (
    <ul className={cn('task-list', className)}>
      {items.map(item => {
        const inputId = `${baseId}-${item.id}`
        const done = !!item.done
        return (
          <li key={item.id} className={cn('task-item', done && 'is-done')}>
            <input
              type="checkbox"
              id={inputId}
              {...(onToggle
                ? { checked: done, onChange: () => onToggle(item.id, !done) }
                : { defaultChecked: done })}
            />
            <label className="task-item__title" htmlFor={inputId}>
              {item.label}
            </label>
            {(item.priority || item.due) && (
              <div className="task-item__meta">
                {item.priority && <PriorityChip level={item.priority} />}
                {item.due && <span>{item.due}</span>}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
