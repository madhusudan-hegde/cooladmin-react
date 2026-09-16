import type { AccentPreset, AccentPresetInfo } from '../types/theme'

/**
 * The six accent presets from CoolAdmin's `_theme-presets.scss`.
 * `body.app.theme-<id>` switches the `--m-accent*` cascade.
 */
export const ACCENT_PRESETS: readonly AccentPresetInfo[] = [
  { id: 'blue', label: 'Blue', color: '#4272d7' },
  { id: 'purple', label: 'Purple', color: '#7c3aed' },
  { id: 'teal', label: 'Teal', color: '#0d9488' },
  { id: 'rose', label: 'Rose', color: '#e11d48' },
  { id: 'amber', label: 'Amber', color: '#d97706' },
  { id: 'graphite', label: 'Graphite', color: '#334155' },
]

export const DEFAULT_ACCENT: AccentPreset = 'blue'

export function isAccentPreset(value: unknown): value is AccentPreset {
  return typeof value === 'string' && ACCENT_PRESETS.some(p => p.id === value)
}
