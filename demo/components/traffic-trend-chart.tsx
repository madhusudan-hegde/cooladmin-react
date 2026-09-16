'use client'

import type { ChartData, ChartOptions } from 'chart.js'
import { Chart } from '@cooladmin/react'
import { KPI_COLORS, KPI_COLORS_RGB, trafficTrend } from '@/lib/dashboard-data'
import { compactNumber, verticalFade } from '@/lib/chart-fills'

const line = (label: string, values: number[], color: string, rgb: string, alpha: number) => ({
  label,
  data: values,
  borderColor: color,
  backgroundColor: verticalFade(rgb, alpha),
  borderWidth: 2,
  fill: true,
  tension: 0.35,
  pointRadius: 0,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: color,
  pointHoverBorderColor: '#fff',
  pointHoverBorderWidth: 2,
})

const data: ChartData<'line'> = {
  labels: trafficTrend.labels,
  datasets: [
    line('Visitors', trafficTrend.visitors, KPI_COLORS.c1, KPI_COLORS_RGB.c1, 0.2),
    line('Sessions', trafficTrend.sessions, KPI_COLORS.c2, KPI_COLORS_RGB.c2, 0.16),
  ],
}

const options: ChartOptions<'line'> = {
  maintainAspectRatio: false,
  responsive: true,
  interaction: { intersect: false, mode: 'index' },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 6,
        boxHeight: 6,
        padding: 16,
        font: { size: 12 },
        color: '#475569',
      },
    },
    tooltip: {
      callbacks: { label: item => `${item.dataset.label}: ${Number(item.raw).toLocaleString()}` },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        font: { size: 11 },
        color: '#94a3b8',
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 8,
      },
    },
    y: {
      grid: { color: '#eef0f3' },
      border: { display: false },
      ticks: {
        font: { size: 11 },
        color: '#94a3b8',
        maxTicksLimit: 5,
        callback: v => compactNumber(v),
      },
    },
  },
}

/** 28-day visitors vs. sessions line chart (index3.html `traffic-trend`). */
export function TrafficTrendChart() {
  return (
    <Chart
      type="line"
      data={data}
      options={options}
      height={280}
      ariaLabel="Line chart of daily visitors and sessions over the last 28 days"
    />
  )
}
