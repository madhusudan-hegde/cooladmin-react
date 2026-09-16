import type { ReactNode } from 'react'
import { MButton } from '@cooladmin/react'
import { ReloadButton, SearchButton } from '@/components/error-actions'

/**
 * Status-page bodies shared by the `/errors/*` demo routes and Next's own
 * `not-found.tsx` / `error.tsx`. Rendered inside `<ErrorLayout>` (which supplies
 * `main.error-card` + the brand), using CoolAdmin's `.error-card__*` classes.
 */

export function NotFoundContent() {
  return (
    <>
      <h1 className="error-card__code">404</h1>
      <h2 className="error-card__title">We can&rsquo;t find that page</h2>
      <p className="error-card__text">
        The page you&rsquo;re looking for might have been moved, renamed, or never existed. Try
        going back or head to the dashboard.
      </p>
      <div className="error-card__actions">
        <MButton href="/" variant="primary" icon="fa-solid fa-house">
          Back to dashboard
        </MButton>
        <SearchButton variant="ghost" icon="fa-solid fa-magnifying-glass">
          Search
        </SearchButton>
      </div>
      <p className="error-card__hint">
        Need help? <a href="#">Contact support</a> or <a href="/">browse the dashboard</a>.
      </p>
    </>
  )
}

export interface ServerErrorContentProps {
  /** Primary action; defaults to a full-page reload. */
  retry?: ReactNode
  /** Reference id shown in the hint (default `INC-7E2A91`). */
  reference?: string
}

export function ServerErrorContent({ retry, reference = 'INC-7E2A91' }: ServerErrorContentProps) {
  return (
    <>
      <h1 className="error-card__code">500</h1>
      <h2 className="error-card__title">Something went wrong on our end</h2>
      <p className="error-card__text">
        Our servers hit an unexpected snag. We&rsquo;ve logged the error and our team will look into
        it. In the meantime, you can refresh the page or head back home.
      </p>
      <div className="error-card__actions">
        {retry ?? (
          <ReloadButton variant="primary" icon="fa-solid fa-arrows-rotate">
            Try again
          </ReloadButton>
        )}
        <MButton href="/" variant="ghost" icon="fa-solid fa-house">
          Back to dashboard
        </MButton>
      </div>
      <p className="error-card__hint">
        If this keeps happening, <a href="#">contact support</a> with reference ID{' '}
        <code className="error-card__ref">{reference}</code>.
      </p>
    </>
  )
}

export function MaintenanceContent() {
  return (
    <>
      <div className="error-card__icon">
        <i className="fa-solid fa-screwdriver-wrench" aria-hidden="true" />
      </div>
      <h1 className="error-card__title error-card__title--lg">
        We&rsquo;re upgrading the dashboard
      </h1>
      <p className="error-card__text">
        We&rsquo;re shipping some improvements that&rsquo;ll be worth the wait. The dashboard should
        be back in <strong className="error-card__emphasis">about 15 minutes</strong>. Thanks for
        your patience.
      </p>
      <div className="error-card__actions">
        <ReloadButton variant="primary" icon="fa-solid fa-arrows-rotate">
          Check again
        </ReloadButton>
        <MButton href="#" variant="ghost" icon="fa-regular fa-bell">
          Notify me when done
        </MButton>
      </div>
      <p className="error-card__hint">
        Follow <a href="#">@cooladmin</a> for live updates &middot; status page at{' '}
        <a href="#">status.cooladmin.com</a>.
      </p>
    </>
  )
}
