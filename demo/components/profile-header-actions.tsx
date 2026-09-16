'use client'

import { MButton, useToast } from '@madhusudan-hegde/cooladmin-react'

/** Cancel / Save changes actions from profile.html's page header. */
export function ProfileHeaderActions() {
  const toast = useToast()
  return (
    <>
      <MButton variant="ghost" onClick={() => toast.info('Discarded changes')}>
        Cancel
      </MButton>
      <MButton
        variant="primary"
        icon="fa-solid fa-floppy-disk"
        onClick={() => toast.success('Settings saved')}
      >
        Save changes
      </MButton>
    </>
  )
}
