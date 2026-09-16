'use client'

import type { ChartData, ChartOptions, ScriptableContext } from 'chart.js'
import { Chart, resolveColor, withAlpha } from '@madhusudan-hegde/cooladmin-react'
import {
  CHART_PALETTE,
  browserShare,
  productDistribution,
  quarterlyRevenue,
  skillProficiency,
  systemMetrics,
  teamCommits,
  trafficByDevice,
  visitsVsDownloads,
  yearlySales,
} from '@/lib/charts-data'
import type { ShowcaseChartId } from '@/lib/charts-data'

export interface ShowcaseChartProps {
  chart: ShowcaseChartId
  ariaLabel?: string
  height?: number
}

/* ---- shared styling (chart.scripts.html: tickStyle / gridStyle / legendStyle) ---- */

const tickStyle = { font: { size: 11 }, color: 'var(--m-text-faint)' }
const strongTickStyle = { font: { size: 12, weight: 500 as const }, color: 'var(--m-text-muted)' }
const gridStyle = { color: 'var(--m-border-soft)' }

const legendTop: NonNullable<ChartOptions['plugins']>['legend'] = {
  display: true,
  position: 'top',
  align: 'end',
  labels: {
    usePointStyle: true,
    pointStyle: 'circle',
    boxWidth: 6,
    boxHeight: 6,
    padding: 14,
    font: { size: 12 },
    color: 'var(--m-text-muted)',
  },
}

const legendBottom: NonNullable<ChartOptions['plugins']>['legend'] = {
  display: true,
  position: 'bottom',
  labels: {
    usePointStyle: true,
    pointStyle: 'circle',
    padding: 12,
    font: { size: 12 },
    color: 'var(--m-text-muted)',
  },
}

/**
 * Vertical fade for a token colour — the `gradient(ctx, h, c1, c2)` helper from
 * chart.scripts.html, but resolved against the live `--m-*` token so it follows
 * the accent preset and colour mode.
 */
function tokenFade(token: string, top: number, bottom = 0) {
  return (context: ScriptableContext<'line'>): CanvasGradient | string => {
    const { chart } = context
    const color = resolveColor(token, chart.canvas)
    const area = chart.chartArea
    if (!area) return withAlpha(color, top)
    const gradient = chart.ctx.createLinearGradient(0, area.top, 0, area.bottom)
    gradient.addColorStop(0, withAlpha(color, top))
    gradient.addColorStop(1, withAlpha(color, bottom))
    return gradient
  }
}

/** Scriptable flat fill: the token colour at `alpha` (e.g. `rgba(66,114,215,.15)`). */
function tokenAlpha(token: string, alpha: number) {
  return (context: ScriptableContext<'radar'>): string =>
    withAlpha(resolveColor(token, context.chart.canvas), alpha)
}

function lineDataset(label: string, data: number[], token: string, alpha: number) {
  return {
    label,
    data,
    borderColor: token,
    backgroundColor: tokenFade(token, alpha),
    borderWidth: 2,
    fill: true,
    tension: 0.35,
    pointRadius: 0,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: token,
    pointHoverBorderColor: '#fff',
    pointHoverBorderWidth: 2,
  }
}

const cartesianLineOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { intersect: false, mode: 'index' },
  plugins: { legend: legendTop },
  scales: {
    y: { beginAtZero: true, grid: gridStyle, border: { display: false }, ticks: tickStyle },
    x: { grid: { display: false }, border: { display: false }, ticks: tickStyle },
  },
}

const ringOptions = (cutout?: string): ChartOptions<'doughnut' | 'pie'> => ({
  responsive: true,
  maintainAspectRatio: false,
  ...(cutout ? { cutout } : {}),
  animation: { animateScale: true, animateRotate: true },
  plugins: { legend: legendBottom },
})

/* ---- the nine charts ---- */

const salesData: ChartData<'line'> = {
  labels: yearlySales.labels,
  datasets: [lineDataset('Sales', yearlySales.data, CHART_PALETTE[0], 0.2)],
}

const teamData: ChartData<'doughnut'> = {
  labels: teamCommits.labels,
  datasets: [
    {
      data: teamCommits.data,
      backgroundColor: [...CHART_PALETTE],
      borderWidth: 2,
      hoverBorderColor: '#fff',
    },
  ],
}

const barData: ChartData<'bar'> = {
  labels: quarterlyRevenue.labels,
  datasets: [
    {
      label: 'Revenue',
      data: quarterlyRevenue.data,
      backgroundColor: [...CHART_PALETTE],
      borderRadius: 6,
      borderSkipped: false,
      barPercentage: 0.6,
      categoryPercentage: 0.7,
    },
  ],
}
const barOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, grid: gridStyle, border: { display: false }, ticks: tickStyle },
    x: { grid: { display: false }, border: { display: false }, ticks: strongTickStyle },
  },
}

const radarData: ChartData<'radar'> = {
  labels: systemMetrics.labels,
  datasets: [
    {
      label: 'Current',
      data: systemMetrics.current,
      backgroundColor: tokenAlpha(CHART_PALETTE[0], 0.15),
      borderColor: CHART_PALETTE[0],
      borderWidth: 2,
      pointBackgroundColor: CHART_PALETTE[0],
      pointBorderColor: '#fff',
      pointBorderWidth: 1.5,
    },
    {
      label: 'Target',
      data: systemMetrics.target,
      backgroundColor: tokenAlpha(CHART_PALETTE[1], 0.15),
      borderColor: CHART_PALETTE[1],
      borderWidth: 2,
      pointBackgroundColor: CHART_PALETTE[1],
      pointBorderColor: '#fff',
      pointBorderWidth: 1.5,
    },
  ],
}
const radarOptions: ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: legendTop },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      grid: gridStyle,
      angleLines: gridStyle,
      pointLabels: { font: { size: 11 }, color: 'var(--m-text-muted)' },
      ticks: { display: false },
    },
  },
}

const lineData: ChartData<'line'> = {
  labels: visitsVsDownloads.labels,
  datasets: [
    lineDataset('Website visits', visitsVsDownloads.visits, CHART_PALETTE[0], 0.2),
    lineDataset('App downloads', visitsVsDownloads.downloads, CHART_PALETTE[1], 0.18),
  ],
}

const doughnutData: ChartData<'doughnut'> = {
  labels: trafficByDevice.labels,
  datasets: [
    {
      data: trafficByDevice.data,
      backgroundColor: [CHART_PALETTE[0], CHART_PALETTE[1], CHART_PALETTE[2]],
      borderWidth: 2,
      hoverBorderColor: '#fff',
    },
  ],
}

const pieData: ChartData<'pie'> = {
  labels: browserShare.labels,
  datasets: [
    {
      data: browserShare.data,
      backgroundColor: [...CHART_PALETTE],
      borderWidth: 2,
      hoverBorderColor: '#fff',
    },
  ],
}

const polarData: ChartData<'polarArea'> = {
  labels: productDistribution.labels,
  datasets: [
    {
      data: productDistribution.data,
      // SOFT_PALETTE: the same hues at 85% alpha.
      // (chart.js types polarArea datasets through the doughnut controller, so keep the context structural)
      backgroundColor: (ctx: { chart: { canvas: HTMLCanvasElement }; dataIndex: number }) =>
        withAlpha(
          resolveColor(CHART_PALETTE[ctx.dataIndex % CHART_PALETTE.length], ctx.chart.canvas),
          0.85
        ),
      borderColor: [...CHART_PALETTE],
      borderWidth: 1.5,
    },
  ],
}
const polarOptions: ChartOptions<'polarArea'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: legendBottom },
  scales: {
    r: { beginAtZero: true, grid: gridStyle, angleLines: gridStyle, ticks: { display: false } },
  },
}

const skillsData: ChartData<'bar'> = {
  labels: skillProficiency.labels,
  datasets: [
    {
      label: 'Proficiency',
      data: skillProficiency.data,
      backgroundColor: CHART_PALETTE[0],
      borderRadius: 6,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
    },
  ],
}
const skillsOptions: ChartOptions<'bar'> = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: item => `${item.formattedValue}%` } },
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 100,
      grid: gridStyle,
      border: { display: false },
      ticks: { ...tickStyle, callback: v => `${v}%` },
    },
    y: { grid: { display: false }, border: { display: false }, ticks: strongTickStyle },
  },
}

/**
 * One of the nine Chart.js examples from CoolAdmin's chart.html, keyed by id.
 * Each maps 1:1 to a `new Chart(...)` block in chart.scripts.html.
 */
export function ShowcaseChart({ chart, ariaLabel, height = 280 }: ShowcaseChartProps) {
  const common = { height, ariaLabel }
  switch (chart) {
    case 'sales':
      return <Chart type="line" data={salesData} options={cartesianLineOptions} {...common} />
    case 'team':
      return <Chart type="doughnut" data={teamData} options={ringOptions('65%')} {...common} />
    case 'bar':
      return <Chart type="bar" data={barData} options={barOptions} {...common} />
    case 'radar':
      return <Chart type="radar" data={radarData} options={radarOptions} {...common} />
    case 'line':
      return <Chart type="line" data={lineData} options={cartesianLineOptions} {...common} />
    case 'doughnut':
      return <Chart type="doughnut" data={doughnutData} options={ringOptions('65%')} {...common} />
    case 'pie':
      return <Chart type="pie" data={pieData} options={ringOptions()} {...common} />
    case 'polar':
      return <Chart type="polarArea" data={polarData} options={polarOptions} {...common} />
    case 'skills':
      return <Chart type="bar" data={skillsData} options={skillsOptions} {...common} />
  }
}
