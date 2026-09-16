'use client'

import { MButton, useToast } from '@cooladmin/react'

/**
 * Invoice page-header actions (CoolAdmin invoice.html): Print opens the browser
 * print dialog (the print stylesheet hides the app chrome), Download / Send are
 * demo feedback via toast.
 */
export function InvoiceActions() {
  const toast = useToast()
  return (
    <>
      <MButton variant="ghost" icon="fa-solid fa-print" onClick={() => window.print()}>
        Print
      </MButton>
      <MButton
        variant="ghost"
        icon="fa-solid fa-download"
        onClick={() => toast.success('Invoice downloaded')}
      >
        Download PDF
      </MButton>
      <MButton
        variant="primary"
        icon="fa-regular fa-paper-plane"
        onClick={() => toast.success('Invoice sent')}
      >
        Send
      </MButton>
    </>
  )
}
