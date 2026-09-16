import { Footer, MCard, PageHeader } from '@cooladmin/react'
import { regionMaps, worldMap } from '@/lib/maps-data'
import { LeafletMap } from '@/components/leaflet-map'

export const metadata = { title: 'Maps' }

/** CoolAdmin map.html — Leaflet world map + six regional maps with revenue markers. */
export default function MapsPage() {
  return (
    <>
      <PageHeader
        title="Maps"
        subtitle="Interactive maps powered by Leaflet 1.9.4 with regional markers."
      />

      <div className="row row-tight">
        <div className="col-md-12">
          <MCard
            title="Global revenue distribution"
            subtitle="Top markets by revenue this quarter."
            actions={
              <div className="user-data filters">
                <div className="select-wrapper">
                  <select
                    className="form-select"
                    name="property"
                    aria-label="Filter properties"
                    defaultValue="All properties"
                  >
                    <option>All properties</option>
                    <option>Products</option>
                    <option>Services</option>
                  </select>
                </div>
                <div className="select-wrapper">
                  <select
                    className="form-select"
                    name="time"
                    aria-label="Filter by time"
                    defaultValue="All time"
                  >
                    <option>All time</option>
                    <option>By month</option>
                    <option>By day</option>
                  </select>
                </div>
              </div>
            }
          >
            <LeafletMap config={worldMap} height={380} />
          </MCard>
        </div>
      </div>

      <div className="row row-tight mt-3">
        {regionMaps.map(region => (
          <div className="col-md-6" key={region.config.id}>
            <MCard title={region.title} subtitle={region.subtitle}>
              <LeafletMap config={region.config} height={280} />
            </MCard>
          </div>
        ))}
      </div>

      <Footer />
    </>
  )
}
