'use client'

import { MButton, useToast } from '@cooladmin/react'

/** Page-header buttons for /inbox (`#inbox-refresh-btn` / `#inbox-compose-btn`). */
export function InboxHeaderActions() {
  const toast = useToast()
  return (
    <>
      <MButton
        variant="ghost"
        icon="fa-solid fa-arrows-rotate"
        onClick={() => toast.success('Inbox refreshed')}
      >
        Refresh
      </MButton>
      <MButton
        variant="primary"
        icon="fa-regular fa-pen-to-square"
        onClick={() => toast.info('Compose window coming soon')}
      >
        Compose
      </MButton>
    </>
  )
}
