'use client'

import { useEffect, useRef, useState } from 'react'
import { cn, resolveColor, useAccent, useColorMode } from '@cooladmin/react'
import type { MapConfig } from '@/lib/maps-data'
import { LEAFLET_CSS, LEAFLET_JS } from '@/lib/maps-data'
import { loadScript, loadStyle } from '@/lib/load-external'

export interface LeafletMapProps {
  config: MapConfig
  /** Container height in px (CoolAdmin: 380 for the world map, 280 for regions). */
  height?: number
  className?: string
}

async function loadLeaflet(): Promise<void> {
  await loadStyle(LEAFLET_CSS.url, { integrity: LEAFLET_CSS.integrity, crossOrigin: '' })
  await loadScript(LEAFLET_JS.url, { integrity: LEAFLET_JS.integrity, crossOrigin: '' })
}

type LeafletHost = HTMLDivElement & { _leaflet_id?: number }

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, ch => `&#${ch.charCodeAt(0)};`)
}

/**
 * Leaflet 1.9.4 map (port of CoolAdmin's map.scripts.html). Loads Leaflet from
 * unpkg on first use, draws OpenStreetMap tiles, one sized circle marker per
 * data point (popup + hover emphasis) and a title control. Guards against
 * double initialisation and calls `map.remove()` on unmount. Markers are
 * redrawn when the accent preset or colour mode changes so token colours stay
 * in sync.
 */
export function LeafletMap({ config, height = 280, className }: LeafletMapProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const { accent } = useAccent()
  const { resolved } = useColorMode()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    let map: LeafletMapInstance | null = null
    const host = hostRef.current as LeafletHost | null
    if (!host) return

    loadLeaflet()
      .then(() => {
        const L = window.L
        if (cancelled || !L || hostRef.current !== host) return
        // Double-init guard (Leaflet stamps the element it owns).
        if (host._leaflet_id) return

        map = L.map(host, {
          center: config.center,
          zoom: config.zoom,
          zoomControl: true,
          scrollWheelZoom: false,
          doubleClickZoom: true,
          attributionControl: false,
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '',
          maxZoom: 18,
          minZoom: 1,
        }).addTo(map)

        const strokeColor = resolveColor('var(--m-surface)', host, '#ffffff')
        config.data.forEach(point => {
          const fill = resolveColor(point.color, host)
          const marker = L.circleMarker([point.lat, point.lng], {
            radius: Math.sqrt(point.value / 200) + 3,
            fillColor: fill,
            color: strokeColor,
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7,
          }).addTo(map as LeafletMapInstance)

          marker.bindPopup(
            `<div class="map-popup"><strong>${escapeHtml(point.name)}</strong><br>` +
              `<span class="map-popup__value" style="color:${fill}">$${point.value.toLocaleString()}</span></div>`
          )
          marker.on('mouseover', function () {
            this.setStyle({ fillOpacity: 0.9, weight: 3 })
          })
          marker.on('mouseout', function () {
            this.setStyle({ fillOpacity: 0.7, weight: 2 })
          })
        })

        const info = L.control({ position: 'topright' })
        info.onAdd = () => {
          const div = L.DomUtil.create('div', 'info map-title')
          div.textContent = config.title
          return div
        }
        info.addTo(map)
        setStatus('ready')
      })
      .catch(err => {
        console.error(`Error initializing ${config.title}:`, err)
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
      map?.remove()
      map = null
      // Leaflet leaves its stamp behind on remove(); clear it so a re-run can init.
      delete host._leaflet_id
    }
  }, [config, accent, resolved])

  return (
    <div className={cn('map-wrap', className)} style={{ height }}>
      {status === 'error' && (
        <div className="map-fallback" role="status">
          <div>
            <i className="fa-solid fa-map-marker-alt" aria-hidden="true" />
            <div className="map-fallback__title">{config.title}</div>
            <div className="map-fallback__hint">Loading failed</div>
          </div>
        </div>
      )}
      <div
        id={config.id}
        ref={hostRef}
        className="vmap"
        role="region"
        aria-label={`${config.title}: ${config.data.map(p => p.name).join(', ')}`}
        hidden={status === 'error'}
      />
    </div>
  )
}
