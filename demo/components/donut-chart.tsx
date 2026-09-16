'use client'

import { useMemo } from 'react'
import type { ChartData, ChartOptions } from 'chart.js'
import { Chart } from '@cooladmin/react'

export interface DonutChartProps {
  labels: string[]
  data: number[]
  colors: string[]
  hoverColors?: string[]
  /** Suffix appended to tooltip values (default `%`). */
  unit?: string
  height?: number
  ariaLabel?: string
}

/**
 * Share-of-total doughnut (CoolAdmin's `traffic-sources` config: 70% cutout,
 * circle legend at the bottom, `label: value%` tooltip). Wrapped in `.donut-wrap`.
 */
export function DonutChart({
  labels,
  data,
  colors,
  hoverColors,
  unit = '%',
  height = 260,
  ariaLabel,
}: DonutChartProps) {
  const chartData = useMemo<ChartData<'doughnut'>>(
    () => ({
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          hoverBackgroundColor: hoverColors,
          borderWidth: 2,
          hoverBorderColor: '#ffffff',
        },
      ],
    }),
    [labels, data, colors, hoverColors]
  )

  const options = useMemo<ChartOptions<'doughnut'>>(
    () => ({
      maintainAspectRatio: false,
      responsive: true,
      cutout: '70%',
      animation: { animateScale: true, animateRotate: true },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 12,
            font: { size: 12 },
            color: '#475569',
          },
        },
        tooltip: { callbacks: { label: item => `${item.label}: ${item.formattedValue}${unit}` } },
      },
    }),
    [unit]
  )

  return (
    <div className="donut-wrap">
      <Chart
        type="doughnut"
        data={chartData}
        options={options}
        height={height}
        ariaLabel={ariaLabel}
      />
    </div>
  )
}
