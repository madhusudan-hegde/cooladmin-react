/**
 * Maps page data (port of CoolAdmin's map.scripts.html `mapConfigs`).
 * Marker colours are `--m-*` token references, resolved against the DOM by
 * `LeafletMap` before Leaflet paints them.
 */

export interface MapPoint {
  name: string
  lat: number
  lng: number
  value: number
  color: string
}

export interface MapConfig {
  /** DOM id of the map container (CoolAdmin's `#vmap`, `#vmap1`…`#vmap6`). */
  id: string
  center: [number, number]
  zoom: number
  /** Overlay title rendered top-right (CoolAdmin's `info` control). */
  title: string
  data: MapPoint[]
}

/** Categorical marker palette — chart series tokens plus the semantic colours. */
const C = [
  'var(--m-c1)',
  'var(--m-success)',
  'var(--m-warning)',
  'var(--m-c4)',
  'var(--m-c3)',
  'var(--m-danger)',
  'var(--m-accent)',
  'var(--m-c2)',
] as const

export const worldMap: MapConfig = {
  id: 'vmap',
  center: [20, 0],
  zoom: 2,
  title: 'World Map',
  data: [
    { name: 'United States', lat: 39.8283, lng: -98.5795, value: 45000, color: C[0] },
    { name: 'United Kingdom', lat: 55.3781, lng: -3.436, value: 32000, color: C[1] },
    { name: 'Germany', lat: 51.1657, lng: 10.4515, value: 28000, color: C[2] },
    { name: 'Japan', lat: 36.2048, lng: 138.2529, value: 35000, color: C[3] },
    { name: 'Australia', lat: -25.2744, lng: 133.7751, value: 22000, color: C[4] },
    { name: 'Brazil', lat: -14.235, lng: -51.9253, value: 18000, color: C[5] },
    { name: 'India', lat: 20.5937, lng: 78.9629, value: 25000, color: C[6] },
    { name: 'China', lat: 35.8617, lng: 104.1954, value: 40000, color: C[7] },
  ],
}

export interface RegionMapCard {
  title: string
  subtitle: string
  config: MapConfig
}

/**
 * The six regional cards. CoolAdmin's map.html card titles and map.scripts.html
 * configs were mismatched by id (e.g. the "Europe" card held the USA config);
 * here each card gets the config that matches its title.
 */
export const regionMaps: RegionMapCard[] = [
  {
    title: 'Europe',
    subtitle: 'Major markets across the EU and UK.',
    config: {
      id: 'vmap1',
      center: [54.526, 15.2551],
      zoom: 4,
      title: 'Europe Map',
      data: [
        { name: 'London', lat: 51.5074, lng: -0.1278, value: 12000, color: C[0] },
        { name: 'Paris', lat: 48.8566, lng: 2.3522, value: 10000, color: C[1] },
        { name: 'Berlin', lat: 52.52, lng: 13.405, value: 8000, color: C[2] },
        { name: 'Madrid', lat: 40.4168, lng: -3.7038, value: 6000, color: C[3] },
        { name: 'Rome', lat: 41.9028, lng: 12.4964, value: 5000, color: C[4] },
      ],
    },
  },
  {
    title: 'United States',
    subtitle: 'Top metro areas by revenue.',
    config: {
      id: 'vmap2',
      center: [39.8283, -95.5795],
      zoom: 4,
      title: 'USA Map',
      data: [
        { name: 'New York', lat: 40.7128, lng: -74.006, value: 15000, color: C[0] },
        { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, value: 12000, color: C[1] },
        { name: 'Chicago', lat: 41.8781, lng: -87.6298, value: 8000, color: C[2] },
        { name: 'Houston', lat: 29.7604, lng: -95.3698, value: 6000, color: C[3] },
        { name: 'Miami', lat: 25.7617, lng: -80.1918, value: 4000, color: C[4] },
      ],
    },
  },
  {
    title: 'Germany',
    subtitle: 'DACH region performance.',
    config: {
      id: 'vmap3',
      center: [51.1657, 10.4515],
      zoom: 6,
      title: 'Germany Map',
      data: [
        { name: 'Berlin', lat: 52.52, lng: 13.405, value: 8000, color: C[0] },
        { name: 'Munich', lat: 48.1351, lng: 11.582, value: 5000, color: C[1] },
        { name: 'Hamburg', lat: 53.5511, lng: 9.9937, value: 4000, color: C[2] },
      ],
    },
  },
  {
    title: 'France',
    subtitle: 'Top cities by revenue.',
    config: {
      id: 'vmap4',
      center: [46.6034, 1.8883],
      zoom: 6,
      title: 'France Map',
      data: [
        { name: 'Paris', lat: 48.8566, lng: 2.3522, value: 10000, color: C[0] },
        { name: 'Lyon', lat: 45.764, lng: 4.8357, value: 4000, color: C[1] },
        { name: 'Marseille', lat: 43.2965, lng: 5.3698, value: 3000, color: C[2] },
      ],
    },
  },
  {
    title: 'Russia',
    subtitle: 'Major hubs across Russia.',
    config: {
      id: 'vmap5',
      center: [61.524, 105.3188],
      zoom: 3,
      title: 'Russia Map',
      data: [
        { name: 'Moscow', lat: 55.7558, lng: 37.6176, value: 12000, color: C[0] },
        { name: 'St. Petersburg', lat: 59.9311, lng: 30.3609, value: 6000, color: C[1] },
        { name: 'Novosibirsk', lat: 55.0084, lng: 82.9357, value: 3000, color: C[2] },
      ],
    },
  },
  {
    title: 'Brazil',
    subtitle: 'South America performance.',
    config: {
      id: 'vmap6',
      center: [-14.235, -51.9253],
      zoom: 4,
      title: 'Brazil Map',
      data: [
        { name: 'São Paulo', lat: -23.5505, lng: -46.6333, value: 8000, color: C[0] },
        { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729, value: 6000, color: C[1] },
        { name: 'Brasília', lat: -15.8267, lng: -47.9218, value: 4000, color: C[2] },
      ],
    },
  },
]

/** Leaflet 1.9.4 assets — same URLs and integrity hashes as CoolAdmin's map.pug. */
export const LEAFLET_CSS = {
  url: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
}
export const LEAFLET_JS = {
  url: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
}
