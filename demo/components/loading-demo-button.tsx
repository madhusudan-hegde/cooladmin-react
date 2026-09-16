'use client'

import { useEffect, useRef, useState } from 'react'
import { MButton, useToast } from '@madhusudan-hegde/cooladmin-react'

type Phase = 'idle' | 'saving' | 'saved'

/**
 * The "Save" async-action demo from CoolAdmin's button.scripts.html:
 * click → spinner "Saving…" (1.1s) → check "Saved" + success toast (1.4s) → reset.
 */
export function LoadingDemoButton() {
  const [phase, setPhase] = useState<Phase>('idle')
  const toast = useToast()
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const run = () => {
    if (phase !== 'idle') return
    setPhase('saving')
    timers.current.push(
      setTimeout(() => {
        setPhase('saved')
        toast.success('Saved successfully')
        timers.current.push(setTimeout(() => setPhase('idle'), 1400))
      }, 1100)
    )
  }

  if (phase === 'saving') {
    return (
      <MButton variant="primary" loading id="loading-demo-btn">
        Saving…
      </MButton>
    )
  }
  if (phase === 'saved') {
    return (
      <MButton variant="primary" disabled icon="fa-solid fa-circle-check" id="loading-demo-btn">
        Saved
      </MButton>
    )
  }
  return (
    <MButton variant="primary" icon="fa-solid fa-floppy-disk" id="loading-demo-btn" onClick={run}>
      <span>Save</span>
    </MButton>
  )
}
