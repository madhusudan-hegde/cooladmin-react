import { Skeleton } from '@cooladmin/react'

/** Root-level route loading state: a lightweight skeleton card. */
export default function Loading() {
  return (
    <div className="app-loading" role="status" aria-live="polite" aria-busy="true">
      <div className="app-loading__card">
        <span className="visually-hidden">Loading…</span>
        <Skeleton size="md" />
        <Skeleton size="sm" />
        <Skeleton variant="block" height={180} width="100%" />
        <Skeleton size="lg" />
      </div>
    </div>
  )
}
