'use client'

import { useRef, useState } from 'react'
import type { ColorMode } from '../types/theme'
import { cn } from '../lib/class-name'
import { useAccent } from '../context/accent-context'
import { useOptionalColorMode } from '../context/color-mode-context'
import { useOptionalToast } from '../context/toast-context'
import { useClickOutside } from '../hooks/use-click-outside'
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut'

export interface ThemeSwitcherProps {
  /** Hide the Light / Dark / Auto row. */
  showColorMode?: boolean
  /** Fire a toast when the accent changes (default `true`). */
  announce?: boolean
  className?: string
}

const MODES: { id: ColorMode; label: string; icon: string }[] = [
  { id: 'light', label: 'Light', icon: 'fa-solid fa-sun' },
  { id: 'dark', label: 'Dark', icon: 'fa-solid fa-moon' },
  { id: 'auto', label: 'Auto', icon: 'fa-solid fa-circle-half-stroke' },
]

/**
 * Floating bottom-right accent picker (port of CoolAdmin's `initThemeSwitcher`)
 * plus an added color-mode row. Only `DashboardLayout` mounts it — auth/error
 * pages stay clean, as in the original.
 */
export function ThemeSwitcher({
  showColorMode = true,
  announce = true,
  className,
}: ThemeSwitcherProps) {
  const { accent, setAccent, presets } = useAccent()
  const colorMode = useOptionalColorMode()
  const toast = useOptionalToast()
  const [isOpen, setIsOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useClickOutside(wrapRef, () => setIsOpen(false), isOpen)
  useKeyboardShortcut('Escape', () => setIsOpen(false), {
    enabled: isOpen,
    preventDefault: false,
    allowInInputs: true,
  })

  return (
    <div ref={wrapRef} className={cn('theme-switcher', isOpen && 'is-open', className)}>
      <div
        className="theme-switcher__panel"
        role="dialog"
        aria-label="Theme picker"
        aria-hidden={!isOpen}
      >
        <p className="theme-switcher__title">Accent color</p>
        <div className="theme-switcher__grid" role="group" aria-label="Accent color">
          {presets.map(preset => {
            const active = preset.id === accent
            return (
              <button
                key={preset.id}
                type="button"
                className={cn('theme-switcher__swatch', active && 'is-active')}
                data-theme={preset.id}
                aria-label={`Use ${preset.label} theme`}
                aria-pressed={active}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => {
                  setAccent(preset.id)
                  if (announce) toast?.success(`Switched to ${preset.label}`)
                }}
              >
                <span
                  className="theme-switcher__swatch-color"
                  style={{ background: preset.color }}
                />
                <span className="theme-switcher__swatch-label">{preset.label}</span>
              </button>
            )
          })}
        </div>

        {showColorMode && colorMode && (
          <>
            <p className="theme-switcher__title">Color mode</p>
            <div className="theme-switcher__modes" role="group" aria-label="Color mode">
              {MODES.map(m => {
                const active = colorMode.mode === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={cn('theme-switcher__mode', active && 'is-active')}
                    data-mode={m.id}
                    aria-pressed={active}
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => colorMode.setMode(m.id)}
                  >
                    <i className={m.icon} aria-hidden="true" />
                    <span>{m.label}</span>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>

      <button
        type="button"
        className="theme-switcher__toggle"
        aria-label="Change theme"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(o => !o)}
      >
        <i className="fa-solid fa-palette" aria-hidden="true" />
      </button>
    </div>
  )
}
