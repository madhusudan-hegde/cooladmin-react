'use client'

import type { CSSProperties } from 'react'
import { MButton, useToast } from '@madhusudan-hegde/cooladmin-react'
import { toastDemoButtons } from '@/lib/ui-alerts-data'
import type { ToastDemoButton } from '@/lib/ui-alerts-data'

/** CoolAdmin inlines the semantic fill on `.m-btn--primary`; mapped to the `--m-*` tokens. */
function toneStyle(tone: ToastDemoButton['tone']): CSSProperties | undefined {
  if (!tone) return undefined
  return { background: `var(--m-${tone})`, borderColor: `var(--m-${tone})` }
}

/**
 * The "Trigger a toast" row from alert.html — `window.toast.<kind>(message)`
 * translated to the library's `useToast()`.
 */
export function UiAlertsToastDemo() {
  const toast = useToast()

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {toastDemoButtons.map(btn => (
        <MButton
          key={btn.kind}
          variant="primary"
          icon={btn.icon}
          style={toneStyle(btn.tone)}
          onClick={() => toast[btn.kind](btn.message)}
        >
          {btn.label}
        </MButton>
      ))}
    </div>
  )
}
