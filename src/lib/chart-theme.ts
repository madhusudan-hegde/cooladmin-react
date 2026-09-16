import type { Chart as ChartJS, ChartConfiguration, ChartOptions } from 'chart.js'
import { readToken, withAlpha } from './color'

/** CoolAdmin's chart typeface (the modern overlay dropped Poppins for Inter). */
export const CHART_FONT = '"Inter", system-ui, sans-serif'

/** Deep-partial tooltip options (what `options.plugins.tooltip` accepts). */
export type TooltipStyle = NonNullable<NonNullable<ChartOptions<'line'>['plugins']>['tooltip']>

/**
 * Tooltip for light cards on neutral backgrounds (port of `modernTooltip`).
 */
export const modernTooltip: TooltipStyle = {
  backgroundColor: '#0f172a',
  titleColor: '#f1f5f9',
  bodyColor: '#e2e8f0',
  borderWidth: 0,
  cornerRadius: 6,
  padding: 10,
  titleFont: { family: CHART_FONT, size: 12, weight: 600 },
  bodyFont: { family: CHART_FONT, size: 12 },
  displayColors: false,
}

/**
 * Light tooltip shared by the larger dashboard line charts (port of `lightTooltip`).
 */
export const lightTooltip: TooltipStyle = {
  backgroundColor: '#fff',
  titleColor: '#333',
  bodyColor: '#666',
  borderColor: '#ddd',
  borderWidth: 1,
  titleFont: { family: CHART_FONT },
  bodyFont: { family: CHART_FONT },
}

export interface SparklineOptionsInput {
  /** Show an index-mode tooltip (default `false`). */
  tooltip?: boolean
}

/**
 * Inline sparkline options — hidden axes, transparent grids, no legend
 * (port of `sparklineOptions` from CoolAdmin's main-vanilla.js).
 */
export function sparklineOptions({
  tooltip = false,
}: SparklineOptionsInput = {}): ChartOptions<'line'> {
  const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false, grid: { color: 'transparent' }, ticks: { display: false } },
      y: { display: false, ticks: { display: false } },
    },
    elements: {
      line: { borderWidth: 2, tension: 0.4 },
      point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
    },
    interaction: { intersect: false, mode: 'index' },
    layout: { padding: 0 },
  }
  if (tooltip) {
    options.plugins!.tooltip = {
      ...modernTooltip,
      enabled: true,
      mode: 'index',
      intersect: false,
      callbacks: { title: () => '', label: item => item.formattedValue },
    }
  }
  return options
}

export interface KpiSparklineInput {
  /** Concrete line colour (already resolved — no `var()`). */
  accent: string
  data: number[]
  /** Gradient stops top → bottom. Defaults to `accent` at 22% → 0% alpha. */
  fillStops?: [string, string]
  /** Canvas height used for the gradient length (default 60). */
  height?: number
  tooltip?: boolean
}

/**
 * Builds the KPI-tile sparkline configuration (port of `kpiSparkline`): a filled
 * line whose area fades to transparent via a vertical canvas gradient.
 */
export function kpiSparklineConfig(
  canvas: HTMLCanvasElement,
  { accent, data, fillStops, height = 60, tooltip = true }: KpiSparklineInput
): ChartConfiguration<'line'> {
  const stops = fillStops ?? [withAlpha(accent, 0.22), withAlpha(accent, 0)]
  const ctx = canvas.getContext('2d')
  let background: string | CanvasGradient = stops[0]
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, stops[0])
    gradient.addColorStop(1, stops[1])
    background = gradient
  }

  return {
    type: 'line',
    data: {
      labels: data.map((_, i) => i + 1),
      datasets: [
        {
          data,
          borderColor: accent,
          backgroundColor: background,
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: accent,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        },
      ],
    },
    options: sparklineOptions({ tooltip }),
  }
}

/**
 * Apply CoolAdmin's global Chart.js defaults: Inter 12px, muted text and soft
 * grid colours read from the active `--m-*` tokens, and the modern tooltip.
 * Cheap enough to call before every chart creation so theme changes propagate.
 */
export function applyChartDefaults(Chart: typeof ChartJS, el?: Element | null): void {
  const muted = readToken('--m-text-muted', '#475569', el)
  const border = readToken('--m-border-soft', '#eef0f3', el)
  Chart.defaults.font.family = CHART_FONT
  Chart.defaults.font.size = 12
  Chart.defaults.color = muted
  Chart.defaults.borderColor = border
  const plugins = Chart.defaults.plugins as unknown as {
    tooltip?: Record<string, unknown>
    legend?: { labels?: { usePointStyle?: boolean; boxWidth?: number } }
  }
  if (plugins.tooltip) Object.assign(plugins.tooltip, modernTooltip)
  if (plugins.legend?.labels) {
    plugins.legend.labels.usePointStyle = true
    plugins.legend.labels.boxWidth = 8
  }
}
