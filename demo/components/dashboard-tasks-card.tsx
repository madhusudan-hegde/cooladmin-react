'use client'

import { useState } from 'react'
import { MButton, MCard, TaskList, useToast } from '@madhusudan-hegde/cooladmin-react'
import type { TaskListItem } from '@madhusudan-hegde/cooladmin-react'
import type { TaskEntry } from '@/lib/dashboard-data'

export interface DashboardTasksCardProps {
  tasks: TaskEntry[]
  /** Shown in the subtitle ("N open · 12 completed this week."). */
  completedThisWeek?: number
}

/** "My tasks" card with controlled checkbox state (index.html). */
export function DashboardTasksCard({ tasks, completedThisWeek = 12 }: DashboardTasksCardProps) {
  const [items, setItems] = useState<TaskListItem[]>(() =>
    tasks.map(t => ({ id: t.id, label: t.label, done: t.done, due: t.due, priority: t.priority }))
  )
  const toast = useToast()
  const open = items.filter(t => !t.done).length

  const onToggle = (id: TaskListItem['id'], done: boolean) =>
    setItems(list => list.map(t => (t.id === id ? { ...t, done, due: done ? 'Done' : t.due } : t)))

  return (
    <MCard
      title="My tasks"
      subtitle={`${open} open · ${completedThisWeek} completed this week.`}
      actions={
        <MButton
          variant="ghost"
          size="sm"
          icon="fa-solid fa-plus"
          onClick={() => toast.info('Add task', 'Task creation ships in Phase 2.')}
        >
          Add task
        </MButton>
      }
    >
      <TaskList items={items} onToggle={onToggle} />
    </MCard>
  )
}
