'use client'

import { useEffect, useRef } from 'react'
import type {
  Chart as ChartJS,
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
  Plugin,
} from 'chart.js'
import { cn } from '../lib/class-name'
import { loadChart } from '../lib/chart-loader'
import { applyChartDefaults } from '../lib/chart-theme'
import { resolveTokens } from '../lib/color'
import { useOptionalAccent } from '../context/accent-context'
import { useOptionalColorMode } from '../context/color-mode-context'

export interface ChartProps<TType extends ChartType = ChartType> {
  type: TType
  data: ChartData<TType>
  options?: ChartOptions<TType>
  /** Per-chart plugins (inline plugin objects). */
  plugins?: Plugin<TType>[]
  /** Container height in px (default 280). */
  height?: number
  /** Accessible description; the canvas gets `role="img"` when set. */
  ariaLabel?: string
  /** Called once the chart instance exists (and after each re-create). */
  onReady?: (chart: ChartJS<TType>) => void
  className?: string
  /** Extra props for the canvas element (e.g. `id`). */
  canvasId?: string
}

/**
 * Generic Chart.js wrapper. Loads `chart.js` on demand (optional peer dep),
 * registers `registerables` once, applies CoolAdmin's defaults (Inter 12px,
 * muted token colours, dark tooltip), updates in place when `data`/`options`
 * change, and destroys on unmount. Any `var(--m-*)` string inside `data` /
 * `options` is resolved against the canvas' computed styles, so datasets can use
 * design tokens; defaults are re-applied (and tokens re-resolved) when the accent
 * or color mode changes.
 */
export function Chart<TType extends ChartType = ChartType>({
  type,
  data,
  options,
  plugins,
  height = 280,
  ariaLabel,
  onReady,
  className,
  canvasId,
}: ChartProps<TType>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<ChartJS | null>(null)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady
  const accent = useOptionalAccent()?.accent
  const resolvedMode = useOptionalColorMode()?.resolved

  // Value keys so inline object literals don't recreate the chart every render.
  const dataKey = JSON.stringify(data)
  const optionsKey = JSON.stringify(options ?? null)

  useEffect(() => {
    let cancelled = false
    const canvas = canvasRef.current
    if (!canvas) return

    loadChart()
      .then(ChartCtor => {
        if (cancelled || canvasRef.current !== canvas) return
        applyChartDefaults(ChartCtor, canvas)
        const resolvedData = resolveTokens(data, canvas)
        const resolvedOptions = resolveTokens(options ?? {}, canvas)

        const existing = chartRef.current
        if (existing && (existing.config as ChartConfiguration).type === type) {
          existing.data = resolvedData as unknown as ChartData
          existing.options = resolvedOptions as unknown as ChartOptions
          existing.update()
          onReadyRef.current?.(existing as unknown as ChartJS<TType>)
          return
        }

        existing?.destroy()
        const config = {
          type,
          data: resolvedData,
          options: resolvedOptions,
          plugins,
        } as unknown as ChartConfiguration
        const instance = new ChartCtor(canvas, config)
        chartRef.current = instance
        onReadyRef.current?.(instance as unknown as ChartJS<TType>)
      })
      .catch(err => console.error('Chart: failed to load chart.js', err))

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, dataKey, optionsKey, plugins, accent, resolvedMode])

  useEffect(
    () => () => {
      chartRef.current?.destroy()
      chartRef.current = null
    },
    []
  )

  return (
    <div className={cn('chart', className)} style={{ position: 'relative', height }}>
      <canvas
        ref={canvasRef}
        id={canvasId}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
      />
    </div>
  )
}
