'use client'

import { useRouter } from 'next/navigation'
import { MButton, useOptionalCommandPalette } from '@madhusudan-hegde/cooladmin-react'
import type { MButtonProps } from '@madhusudan-hegde/cooladmin-react'

/** `location.reload()` button for the 500 / maintenance pages. */
export function ReloadButton({ children, ...rest }: Omit<MButtonProps, 'onClick' | 'href'>) {
  return (
    <MButton {...rest} onClick={() => window.location.reload()}>
      {children}
    </MButton>
  )
}

/**
 * The 404 page's secondary action. Like CoolAdmin, it opens the command palette
 * when `ErrorLayout` was given `commands`; otherwise it goes back in history and
 * finally falls back to the dashboard.
 */
export function SearchButton({ children, ...rest }: Omit<MButtonProps, 'onClick' | 'href'>) {
  const palette = useOptionalCommandPalette()
  const router = useRouter()
  const onClick = () => {
    if (palette) palette.open()
    else if (typeof window !== 'undefined' && window.history.length > 1) router.back()
    else router.push('/')
  }
  return (
    <MButton {...rest} onClick={onClick}>
      {children}
    </MButton>
  )
}

/** History-back button that falls back to the dashboard when there is no history. */
export function BackButton({ children, ...rest }: Omit<MButtonProps, 'onClick' | 'href'>) {
  const router = useRouter()
  const onClick = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) router.back()
    else router.push('/')
  }
  return (
    <MButton {...rest} onClick={onClick}>
      {children}
    </MButton>
  )
}
