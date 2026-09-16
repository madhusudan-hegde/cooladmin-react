import type { Chart as ChartJS } from 'chart.js'

let registered = false
let pending: Promise<typeof ChartJS> | null = null

/**
 * Lazily load Chart.js (an optional peer dependency) and register every
 * built-in controller/element/scale/plugin exactly once. Never import
 * `chart.js` statically anywhere in the library.
 */
export function loadChart(): Promise<typeof ChartJS> {
  if (!pending) {
    pending = import('chart.js').then(mod => {
      if (!registered) {
        mod.Chart.register(...mod.registerables)
        registered = true
      }
      return mod.Chart
    })
    pending.catch(() => {
      pending = null
    })
  }
  return pending
}
