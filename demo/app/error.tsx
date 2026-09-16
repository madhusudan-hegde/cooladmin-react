'use client'

import { useEffect } from 'react'
import { ErrorLayout, MButton } from '@cooladmin/react'
import { ServerErrorContent } from '@/components/error-content'

/** Route error boundary — CoolAdmin's 500 card with Next's `reset()` as "Try again". */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Report to an error service in a real app.
    console.error(error)
  }, [error])

  return (
    <ErrorLayout brandName="CoolAdmin" brandMark="C" brandHref="/">
      <ServerErrorContent
        reference={error.digest ?? 'INC-7E2A91'}
        retry={
          <MButton variant="primary" icon="fa-solid fa-arrows-rotate" onClick={reset}>
            Try again
          </MButton>
        }
      />
    </ErrorLayout>
  )
}
