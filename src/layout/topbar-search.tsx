'use client'

import { useOptionalCommandPalette } from '../context/command-palette-context'
import { cn } from '../lib/class-name'

export interface TopbarSearchProps {
  placeholder?: string
  /** Keyboard hint shown in the `<kbd>` (default `⌘K`). */
  hint?: string
  className?: string
}

/**
 * Topbar search field (`form.form-header > input.au-input.au-input--xl + kbd`).
 * Focusing or clicking it opens the command palette instead of typing inline —
 * the same behaviour CoolAdmin wires in `initCommandPalette`.
 */
export function TopbarSearch({
  placeholder = 'Search anything…',
  hint = '⌘K',
  className,
}: TopbarSearchProps) {
  const palette = useOptionalCommandPalette()

  return (
    <form className={cn('form-header', className)} role="search" onSubmit={e => e.preventDefault()}>
      <i className="fa-solid fa-magnifying-glass form-header__icon" aria-hidden="true" />
      <input
        className="au-input au-input--xl"
        type="search"
        name="search"
        placeholder={placeholder}
        aria-label="Search"
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        readOnly
        onFocus={e => {
          if (!palette) return
          e.currentTarget.blur()
          palette.open()
        }}
        onMouseDown={e => {
          if (!palette) return
          e.preventDefault()
          palette.open()
        }}
        onKeyDown={e => {
          if (palette && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            palette.open()
          }
        }}
      />
      <kbd className="form-header__hint" aria-hidden="true">
        {hint}
      </kbd>
    </form>
  )
}
