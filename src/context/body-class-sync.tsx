'use client'

import { useEffect } from 'react'
import { useOptionalSidebar } from './sidebar-context'
import { useOptionalAccent } from './accent-context'
import { ACCENT_PRESETS } from '../lib/accent-presets'

export interface BodyClassSyncProps {
  /** Always-on classes, e.g. `'app'` or `'app auth-page'`. */
  staticClasses?: string
}

const THEME_CLASSES = ACCENT_PRESETS.map(p => `theme-${p.id}`)

/**
 * Headless: mirrors React state onto `document.body` — `app` (static),
 * `sidebar-collapsed`, `sidebar-open` and `theme-<accent>`. Adds on mount,
 * keeps in sync, removes on unmount. Works with whichever providers are present.
 */
export function BodyClassSync({ staticClasses = 'app' }: BodyClassSyncProps) {
  const sidebar = useOptionalSidebar()
  const accent = useOptionalAccent()

  const collapsed = sidebar?.collapsed ?? false
  const open = sidebar?.open ?? false
  const accentId = accent?.accent

  useEffect(() => {
    const body = document.body
    const statics = staticClasses.split(/\s+/).filter(Boolean)
    statics.forEach(c => body.classList.add(c))
    return () => statics.forEach(c => body.classList.remove(c))
  }, [staticClasses])

  useEffect(() => {
    if (!sidebar) return
    const body = document.body
    body.classList.toggle('sidebar-collapsed', collapsed)
    body.classList.toggle('sidebar-open', open)
    return () => body.classList.remove('sidebar-collapsed', 'sidebar-open')
  }, [sidebar, collapsed, open])

  useEffect(() => {
    if (!accentId) return
    const body = document.body
    body.classList.remove(...THEME_CLASSES)
    body.classList.add(`theme-${accentId}`)
    return () => body.classList.remove(`theme-${accentId}`)
  }, [accentId])

  return null
}
