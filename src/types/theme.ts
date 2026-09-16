/**
 * Color mode. `'auto'` follows `prefers-color-scheme` and resolves to light or dark.
 */
export type ColorMode = 'light' | 'dark' | 'auto'

/**
 * Accent preset id — mirrors CoolAdmin's `body.app.theme-<id>` classes.
 */
export type AccentPreset = 'blue' | 'purple' | 'teal' | 'rose' | 'amber' | 'graphite'

/**
 * Descriptor for one accent preset (swatch label + representative color).
 */
export interface AccentPresetInfo {
  id: AccentPreset
  label: string
  color: string
}

/**
 * KPI / icon accent slots (`--m-c1` … `--m-c4`).
 */
export type AccentSlot = 'c1' | 'c2' | 'c3' | 'c4'
