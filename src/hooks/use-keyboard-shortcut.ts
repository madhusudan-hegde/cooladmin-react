import { useEffect, useRef } from 'react'

export interface KeyboardShortcutOptions {
  /** Set `false` to temporarily disable the shortcut. */
  enabled?: boolean
  /** Call `preventDefault()` on match (default `true`). */
  preventDefault?: boolean
  /** Fire even while typing in inputs/textareas (default `false`, except for `Escape`). */
  allowInInputs?: boolean
}

interface ParsedCombo {
  key: string
  mod: boolean
  ctrl: boolean
  meta: boolean
  shift: boolean
  alt: boolean
}

function parse(combo: string): ParsedCombo {
  const parts = combo
    .toLowerCase()
    .split('+')
    .map(p => p.trim())
    .filter(Boolean)
  const parsed: ParsedCombo = {
    key: '',
    mod: false,
    ctrl: false,
    meta: false,
    shift: false,
    alt: false,
  }
  for (const part of parts) {
    if (part === 'mod' || part === 'cmd' || part === 'command') parsed.mod = true
    else if (part === 'ctrl' || part === 'control') parsed.ctrl = true
    else if (part === 'meta') parsed.meta = true
    else if (part === 'shift') parsed.shift = true
    else if (part === 'alt' || part === 'option') parsed.alt = true
    else parsed.key = part === 'esc' ? 'escape' : part
  }
  return parsed
}

function matches(e: KeyboardEvent, c: ParsedCombo): boolean {
  const key = e.key.toLowerCase()
  if (c.key && key !== c.key) return false
  if (c.mod && !(e.metaKey || e.ctrlKey)) return false
  if (!c.mod) {
    if (c.ctrl !== e.ctrlKey) return false
    if (c.meta !== e.metaKey) return false
  }
  if (c.shift !== e.shiftKey) return false
  if (c.alt !== e.altKey) return false
  return true
}

function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null
  if (!el || typeof el.tagName !== 'string') return false
  const tag = el.tagName.toLowerCase()
  return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable
}

/**
 * Global keyboard shortcut. `keys` accepts one or many combos such as
 * `'mod+k'` (⌘ on macOS, Ctrl elsewhere), `'ctrl+shift+p'`, or `'Escape'`.
 */
export function useKeyboardShortcut(
  keys: string | string[],
  handler: (event: KeyboardEvent) => void,
  { enabled = true, preventDefault = true, allowInInputs = false }: KeyboardShortcutOptions = {}
): void {
  const handlerRef = useRef(handler)
  handlerRef.current = handler
  const combos = Array.isArray(keys) ? keys.join('|') : keys

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return
    const parsed = combos.split('|').map(parse)
    const onKeyDown = (e: KeyboardEvent) => {
      const hit = parsed.find(c => matches(e, c))
      if (!hit) return
      if (
        !allowInInputs &&
        hit.key !== 'escape' &&
        !hit.mod &&
        !hit.ctrl &&
        !hit.meta &&
        isEditable(e.target)
      )
        return
      if (preventDefault) e.preventDefault()
      handlerRef.current(e)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [combos, enabled, preventDefault, allowInInputs])
}
