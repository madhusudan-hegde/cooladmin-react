'use client'

import { MButton, useToast } from '@madhusudan-hegde/cooladmin-react'

/** Export / Add row actions shared by the /tables and /tables/data page headers. */
export function TablesHeaderActions() {
  const toast = useToast()
  return (
    <>
      <MButton
        variant="ghost"
        icon="fa-solid fa-download"
        onClick={() => toast.success('Export started', 'Your CSV will download shortly.')}
      >
        Export
      </MButton>
      <MButton
        variant="primary"
        icon="fa-solid fa-plus"
        onClick={() => toast.info('Add row', 'Row creation ships with the next release.')}
      >
        Add row
      </MButton>
    </>
  )
}
