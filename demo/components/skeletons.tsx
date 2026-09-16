import { Skeleton } from '@madhusudan-hegde/cooladmin-react'

/** Loading stand-in for a `<StatCard>` (CoolAdmin's `statSkeleton` markup). */
export function StatCardSkeleton() {
  return (
    <article className="stat-card" aria-busy="true">
      <div className="stat-card__skeleton">
        <div className="d-flex justify-content-between align-items-center">
          <Skeleton size="sm" />
          <Skeleton variant="circle" width={36} />
        </div>
        <Skeleton size="lg" />
        <Skeleton size="md" />
        <Skeleton variant="block" height={24} width="100%" style={{ marginTop: 'auto' }} />
      </div>
    </article>
  )
}

export interface ChartCardSkeletonProps {
  /** Plot-area height to reserve (default 240). */
  height?: number
}

/** Loading stand-in for a chart `<MCard>` (CoolAdmin's `primarySkeleton` markup). */
export function ChartCardSkeleton({ height = 240 }: ChartCardSkeletonProps) {
  return (
    <section className="m-card" aria-busy="true">
      <div className="d-flex flex-column gap-3 h-100">
        <Skeleton size="md" />
        <Skeleton size="sm" />
        <Skeleton variant="block" height={height} width="100%" />
      </div>
    </section>
  )
}
