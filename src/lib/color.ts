/**
 * Small color helpers for canvas rendering. Charts need concrete color strings
 * (canvas cannot resolve `var(--m-accent)`), so we read tokens off the DOM at
 * render time and derive translucent fill stops from them.
 */

/** Read a CSS custom property from `el` (defaults to `document.body`). */
export function readToken(name: string, fallback = '', el?: Element | null): string {
  if (typeof window === 'undefined') return fallback
  const target = el ?? document.body
  if (!target) return fallback
  const value = window.getComputedStyle(target).getPropertyValue(name).trim()
  return value || fallback
}

/**
 * Resolve `var(--token)`, `var(--token, fallback)`, a bare `--token`, or any
 * literal color string into something the canvas understands.
 */
export function resolveColor(input: string, el?: Element | null, fallback = '#4272d7'): string {
  const trimmed = input.trim()
  const varMatch = /^var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)$/.exec(trimmed)
  if (varMatch) return readToken(varMatch[1], varMatch[2]?.trim() || fallback, el)
  if (trimmed.startsWith('--')) return readToken(trimmed, fallback, el)
  return trimmed || fallback
}

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}

/** Parse `#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb()` and `rgba()` into channels. */
export function parseColor(color: string): { r: number; g: number; b: number; a: number } | null {
  const c = color.trim()
  const hex = /^#([0-9a-f]{3,8})$/i.exec(c)
  if (hex) {
    let h = hex[1]
    if (h.length === 3 || h.length === 4) {
      h = h
        .split('')
        .map(ch => ch + ch)
        .join('')
    }
    if (h.length !== 6 && h.length !== 8) return null
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
    return { r, g, b, a }
  }
  const rgb = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/i.exec(c)
  if (rgb) {
    const alphaRaw = rgb[4]
    const a =
      alphaRaw === undefined
        ? 1
        : alphaRaw.endsWith('%')
        ? parseFloat(alphaRaw) / 100
        : parseFloat(alphaRaw)
    return { r: clamp255(+rgb[1]), g: clamp255(+rgb[2]), b: clamp255(+rgb[3]), a }
  }
  return null
}

/** Return `color` with the given alpha (falls back to the input when unparsable). */
export function withAlpha(color: string, alpha: number): string {
  const parsed = parseColor(color)
  if (!parsed) return color
  return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${alpha})`
}

/**
 * Deep-resolve every `var(--token)` / bare `--token` string inside a Chart.js
 * `data`/`options` object so canvas rendering gets concrete colours. Non-string
 * leaves, functions (scriptable options) and class instances are left untouched.
 */
export function resolveTokens<T>(value: T, el?: Element | null): T {
  if (typeof value === 'string') {
    const s = value.trim()
    if (s.startsWith('var(') || s.startsWith('--')) return resolveColor(s, el) as unknown as T
    return value
  }
  if (Array.isArray(value)) return value.map(v => resolveTokens(v, el)) as unknown as T
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>))
      out[k] = resolveTokens(v, el)
    return out as T
  }
  return value
}
