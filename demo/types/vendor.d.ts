// Minimal globals for the vendor libraries the demo loads at runtime via
// `lib/load-external.ts` (they are not npm dependencies, so no @types).
// This file is a script (no imports/exports) so the interfaces below are
// global and `Window` is augmented directly. Loose typing is deliberate here —
// and only here.

/* eslint-disable @typescript-eslint/no-explicit-any */

interface FullCalendarEventApi {
  id: string
  title: string
  start: Date | null
  end: Date | null
  allDay: boolean
  extendedProps: Record<string, unknown>
  remove(): void
}

interface FullCalendarInstance {
  render(): void
  destroy(): void
  updateSize(): void
  addEvent(event: Record<string, unknown>): FullCalendarEventApi | null
  addEventSource(source: unknown): { remove(): void } | null
  getEventSources(): Array<{ remove(): void }>
  removeAllEvents(): void
  setOption(name: string, value: unknown): void
  getEvents(): FullCalendarEventApi[]
}

interface FullCalendarStatic {
  Calendar: new (el: HTMLElement, options: Record<string, unknown>) => FullCalendarInstance
  Shared?: unknown
  globalPlugins?: unknown[]
  version?: string
}

interface LeafletLayer {
  addTo(map: LeafletMapInstance): this
  remove(): this
}

interface LeafletCircleMarker extends LeafletLayer {
  setStyle(style: Record<string, unknown>): this
  bindPopup(content: string | HTMLElement, options?: Record<string, unknown>): this
  on(event: string, handler: (this: LeafletCircleMarker, ev: any) => void): this
}

interface LeafletControl {
  onAdd?: (map: LeafletMapInstance) => HTMLElement
  addTo(map: LeafletMapInstance): this
  remove(): this
}

interface LeafletMapInstance {
  remove(): void
  invalidateSize(): void
  setView(center: [number, number], zoom: number): this
}

interface LeafletStatic {
  map(el: string | HTMLElement, options?: Record<string, unknown>): LeafletMapInstance
  tileLayer(url: string, options?: Record<string, unknown>): LeafletLayer
  circleMarker(latlng: [number, number], options?: Record<string, unknown>): LeafletCircleMarker
  control(options?: Record<string, unknown>): LeafletControl
  DomUtil: { create(tag: string, className?: string, container?: HTMLElement): HTMLElement }
  version?: string
}

interface Window {
  FullCalendar?: FullCalendarStatic
  L?: LeafletStatic
}
