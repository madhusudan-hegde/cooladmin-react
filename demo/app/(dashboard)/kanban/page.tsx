import { Footer } from '@cooladmin/react'
import { KanbanBoard } from '@/components/kanban-board'

export const metadata = { title: 'Kanban board' }

/** CoolAdmin's kanban.html — the board (with its page header) is one client component. */
export default function KanbanPage() {
  return (
    <>
      <KanbanBoard />
      <Footer />
    </>
  )
}
