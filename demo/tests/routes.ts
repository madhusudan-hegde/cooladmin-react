/**
 * Every demo route. Keep in sync with `demo/app/**` — every route listed here
 * is loaded by `smoke.spec.ts` and must render without console or page errors.
 */
export const routes: string[] = [
  // Phase 1
  '/',
  '/dashboard/sales',
  '/dashboard/marketing',
  '/dashboard/projects',
  '/login',
  '/register',
  '/forgot-password',
  '/errors/404',
  '/errors/500',
  '/errors/maintenance',
  // Phase 2
  '/charts',
  '/tables',
  '/tables/data',
  '/forms',
  '/forms/wizard',
  '/calendar',
  '/maps',
  '/inbox',
  '/kanban',
  '/notifications',
  '/docs',
  '/account/profile',
  '/account/pricing',
  '/account/invoice',
  '/ui/buttons',
  '/ui/badges',
  '/ui/tabs',
  '/ui/cards',
  '/ui/alerts',
  '/ui/progress',
  '/ui/modals',
  '/ui/switches',
  '/ui/grid',
  '/ui/icons',
  '/ui/typography',
]

/** Kept for parity with adminlte-react's test helpers. */
export function getRoutes(): string[] {
  return [...routes]
}
