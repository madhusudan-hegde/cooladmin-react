/**
 * Sample datasets for the /charts showcase (CoolAdmin chart.html +
 * chart.scripts.html), lifted verbatim. Plain module — no `'use client'`.
 *
 * Colours are `--m-*` tokens: the library `Chart` resolves `var(--m-*)` strings
 * against the canvas at render time (and again on accent / colour-mode change).
 * The fifth palette slot (violet) has no token in CoolAdmin's overlay, so it stays
 * a literal, exactly as in chart.scripts.html.
 */

export const CHART_PALETTE = [
  'var(--m-c1)',
  'var(--m-c2)',
  'var(--m-c3)',
  'var(--m-c4)',
  '#8b5cf6',
] as const

export type ShowcaseChartId =
  | 'sales'
  | 'team'
  | 'bar'
  | 'radar'
  | 'line'
  | 'doughnut'
  | 'pie'
  | 'polar'
  | 'skills'

export interface ShowcaseChartCard {
  id: ShowcaseChartId
  title: string
  subtitle: string
  ariaLabel: string
}

/** Card order and copy from chart.html. */
export const showcaseChartCards: ShowcaseChartCard[] = [
  {
    id: 'sales',
    title: 'Yearly sales',
    subtitle: 'Monthly revenue, last 12 months.',
    ariaLabel:
      'Line chart of monthly sales over the last 12 months, rising from 12 in January to 45 in December',
  },
  {
    id: 'team',
    title: 'Team commits',
    subtitle: 'Distribution by discipline.',
    ariaLabel:
      'Doughnut chart of team commits: frontend 35%, backend 25%, DevOps 15%, design 15%, QA 10%',
  },
  {
    id: 'bar',
    title: 'Bar chart',
    subtitle: 'Quarterly revenue.',
    ariaLabel: 'Bar chart of quarterly revenue: Q1 65, Q2 59, Q3 80, Q4 81',
  },
  {
    id: 'radar',
    title: 'Radar chart',
    subtitle: 'Current vs. target system metrics.',
    ariaLabel:
      'Radar chart comparing current and target scores for performance, scalability, security, usability, reliability and maintainability',
  },
  {
    id: 'line',
    title: 'Line chart',
    subtitle: 'Visits vs. downloads, last 6 weeks.',
    ariaLabel: 'Line chart of website visits and app downloads over the last 6 weeks',
  },
  {
    id: 'doughnut',
    title: 'Doughnut chart',
    subtitle: 'Traffic by device.',
    ariaLabel: 'Doughnut chart of traffic by device: mobile 55%, desktop 35%, tablet 10%',
  },
  {
    id: 'pie',
    title: 'Pie chart',
    subtitle: 'Browser market share.',
    ariaLabel:
      'Pie chart of browser market share: Chrome 45%, Firefox 25%, Safari 15%, Edge 10%, others 5%',
  },
  {
    id: 'polar',
    title: 'Polar area chart',
    subtitle: 'Product distribution.',
    ariaLabel: 'Polar area chart of product distribution across products A to E',
  },
  {
    id: 'skills',
    title: 'Horizontal bar chart',
    subtitle: 'Skill proficiency.',
    ariaLabel:
      'Horizontal bar chart of skill proficiency: HTML 95%, CSS 90%, JavaScript 85%, React 80%, Vue 70%, Angular 75%',
  },
]

export const yearlySales = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  data: [12, 19, 15, 25, 22, 30, 28, 35, 30, 40, 35, 45],
}

export const teamCommits = {
  labels: ['Frontend', 'Backend', 'DevOps', 'Design', 'QA'],
  data: [35, 25, 15, 15, 10],
}

export const quarterlyRevenue = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  data: [65, 59, 80, 81],
}

export const systemMetrics = {
  labels: ['Performance', 'Scalability', 'Security', 'Usability', 'Reliability', 'Maintainability'],
  current: [80, 70, 85, 75, 90, 65],
  target: [90, 85, 95, 90, 95, 85],
}

export const visitsVsDownloads = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  visits: [1200, 1900, 1500, 2500, 2200, 3000],
  downloads: [800, 1400, 1100, 1800, 1600, 2200],
}

export const trafficByDevice = {
  labels: ['Mobile', 'Desktop', 'Tablet'],
  data: [55, 35, 10],
}

export const browserShare = {
  labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Others'],
  data: [45, 25, 15, 10, 5],
}

export const productDistribution = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
  data: [30, 45, 25, 35, 40],
}

export const skillProficiency = {
  labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular'],
  data: [95, 90, 85, 80, 70, 75],
}
