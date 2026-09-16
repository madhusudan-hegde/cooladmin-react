'use client'

import { useEffect, useRef } from 'react'
import type { Chart as ChartJS } from 'chart.js'
import { cn } from '../lib/class-name'
import { loadChart } from '../lib/chart-loader'
import { applyChartDefaults, kpiSparklineConfig } from '../lib/chart-theme'
import { resolveColor } from '../lib/color'
import { useOptionalAccent } from '../context/accent-context'
import { useOptionalColorMode } from '../context/color-mode-context'

export interface SparklineProps {
  data: number[]
  /** Line/fill colour — a CSS var (`'var(--m-c2)'`), a token (`'--m-accent'`) or a hex. */
  color?: string
  /** Canvas height in px (default 60). */
  height?: number
  /** Show the index-mode tooltip (default `true`, as on CoolAdmin's KPI tiles). */
  tooltip?: boolean
  /** Accessible description of the series. */
  ariaLabel?: string
  className?: string
}

/**
 * KPI sparkline (port of CoolAdmin's `kpiSparkline`): a filled Chart.js line
 * with hidden axes and a gradient that fades to transparent. Chart.js is loaded
 * on demand; the chart re-renders when data, accent or color mode change so the
 * resolved token colour stays current.
 */
export function Sparkline({
  data,
  color = 'var(--m-accent)',
  height = 60,
  tooltip = true,
  ariaLabel,
  className,
}: SparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<ChartJS<'line'> | null>(null)
  const accent = useOptionalAccent()?.accent
  const resolvedMode = useOptionalColorMode()?.resolved
  const dataKey = JSON.stringify(data)

  useEffect(() => {
    let cancelled = false
    const canvas = canvasRef.current
    if (!canvas) return

    loadChart()
      .then(Chart => {
        // Guard: unmounted / re-run before the dynamic import resolved.
        if (cancelled || canvasRef.current !== canvas) return
        applyChartDefaults(Chart, canvas)
        const resolved = resolveColor(color, canvas)
        const config = kpiSparklineConfig(canvas, { accent: resolved, data, height, tooltip })
        chartRef.current?.destroy()
        chartRef.current = new Chart(canvas, config)
      })
      .catch(err => console.error('Sparkline: failed to load chart.js', err))

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataKey, color, height, tooltip, accent, resolvedMode])

  // Destroy on unmount only.
  useEffect(
    () => () => {
      chartRef.current?.destroy()
      chartRef.current = null
    },
    []
  )

  return (
    <div className={cn('sparkline', className)} style={{ position: 'relative', height }}>
      <canvas
        ref={canvasRef}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
      />
    </div>
  )
}
