'use client'

import { useMemo, useState } from 'react'
import type { ChartData, ChartOptions } from 'chart.js'
import { Chart, MCard, cn } from '@cooladmin/react'
import { KPI_COLORS, KPI_COLORS_RGB, revenueTrend } from '@/lib/dashboard-data'
import { compactNumber, verticalFade } from '@/lib/chart-fills'

type Series = 'products' | 'services'

const SERIES: { id: Series; label: string; color: string; rgb: string; alpha: number }[] = [
  { id: 'products', label: 'Products', color: KPI_COLORS.c1, rgb: KPI_COLORS_RGB.c1, alpha: 0.2 },
  { id: 'services', label: 'Services', color: KPI_COLORS.c2, rgb: KPI_COLORS_RGB.c2, alpha: 0.18 },
]

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
      callbacks: { label: item => `${item.dataset.label}: $${item.formattedValue}` },
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
        callback: v => `$${compactNumber(v)}`,
      },
    },
  },
}

/**
 * "Revenue trend" card (index.html `primary-chart`): 30-day products vs.
 * services line chart with header chips that toggle each series.
 */
export function RevenueTrendCard() {
  const [visible, setVisible] = useState<Record<Series, boolean>>({
    products: true,
    services: true,
  })

  const toggle = (id: Series) =>
    setVisible(v => {
      const next = { ...v, [id]: !v[id] }
      // Keep at least one series on screen.
      return next.products || next.services ? next : v
    })

  const data = useMemo<ChartData<'line'>>(
    () => ({
      labels: revenueTrend.labels,
      datasets: SERIES.filter(s => visible[s.id]).map(s => ({
        label: s.label,
        data: revenueTrend[s.id],
        borderColor: s.color,
        backgroundColor: verticalFade(s.rgb, s.alpha),
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: s.color,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      })),
    }),
    [visible]
  )

  return (
    <MCard
      title="Revenue trend"
      subtitle="Daily revenue over the past 30 days, products vs. services."
      actions={
        <div className="d-flex gap-2" role="group" aria-label="Toggle series">
          {SERIES.map(s => (
            <button
              key={s.id}
              type="button"
              className={cn(
                'm-btn',
                'm-btn--sm',
                visible[s.id] ? 'm-btn--primary' : 'm-btn--ghost'
              )}
              aria-pressed={visible[s.id]}
              onClick={() => toggle(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      }
    >
      <Chart
        type="line"
        data={data}
        options={options}
        height={280}
        ariaLabel="Line chart of daily revenue for products and services over the last 30 days"
      />
    </MCard>
  )
}
