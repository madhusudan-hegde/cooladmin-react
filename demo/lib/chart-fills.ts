import type { ScriptableContext } from 'chart.js'

/**
 * Scriptable dataset `backgroundColor` that paints a vertical gradient from
 * `rgba(rgb, top)` at the chart-area top to `rgba(rgb, bottom)` at the bottom —
 * the same fade CoolAdmin builds with `createLinearGradient` in main-vanilla.js.
 * Only usable from client components (functions are not RSC-serialisable).
 */
export function verticalFade(rgb: string, top: number, bottom = 0) {
  return (context: ScriptableContext<'line'>): CanvasGradient | string => {
    const { chart } = context
    const area = chart.chartArea
    if (!area) return `rgba(${rgb}, ${top})`
    const gradient = chart.ctx.createLinearGradient(0, area.top, 0, area.bottom)
    gradient.addColorStop(0, `rgba(${rgb}, ${top})`)
    gradient.addColorStop(1, `rgba(${rgb}, ${bottom})`)
    return gradient
  }
}

/** `1234 → "1.2k"`, values under 1000 pass through. */
export function compactNumber(value: number | string): string {
  const n = Number(value)
  if (Number.isNaN(n)) return String(value)
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}
