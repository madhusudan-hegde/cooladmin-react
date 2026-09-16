'use client'

import type { ChartData, ChartOptions } from 'chart.js'
import { Chart } from '@cooladmin/react'
import { pipelineFunnel } from '@/lib/dashboard-data'

const data: ChartData<'bar'> = {
  labels: pipelineFunnel.labels,
  datasets: [
    {
      data: pipelineFunnel.data,
      backgroundColor: pipelineFunnel.colors,
      borderRadius: 6,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
    },
  ],
}

const options: ChartOptions<'bar'> = {
  indexAxis: 'y',
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: item => `${item.formattedValue} deals` } },
  },
  scales: {
    x: {
      grid: { color: '#eef0f3' },
      border: { display: false },
      ticks: { color: '#94a3b8', font: { size: 11 } },
    },
    y: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#475569', font: { size: 12, weight: 500 } },
    },
  },
}

/** Horizontal funnel of active deals per stage (index2.html `pipeline-funnel`). */
export function PipelineFunnelChart() {
  return (
    <Chart
      type="bar"
      data={data}
      options={options}
      height={280}
      ariaLabel="Bar chart of active deals by pipeline stage: 320 leads, 180 qualified, 95 proposals, 55 in negotiation, 24 closed won"
    />
  )
}
