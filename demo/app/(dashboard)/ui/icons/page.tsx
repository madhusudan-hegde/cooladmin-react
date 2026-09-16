import { Footer, PageHeader } from '@madhusudan-hegde/cooladmin-react'
import { iconCategories } from '@/lib/icons-data'
import { IconShowcase } from '@/components/icon-showcase'

export const metadata = { title: 'Font Awesome' }

/** CoolAdmin fontawesome.html — searchable icon grid plus usage guide. */
export default function FontAwesomePage() {
  return (
    <>
      <PageHeader
        title="Font Awesome"
        subtitle="Browse the Font Awesome 7 icon set bundled with the CoolAdmin template."
      />

      <IconShowcase />

      {/* ICON USAGE GUIDE */}
      <div className="row m-t-25">
        <div className="col-lg-6">
          <div className="au-card">
            <div className="au-card-inner">
              <h3 className="title-2 m-b-30">Usage Examples</h3>
              <div className="alert alert-info">
                <h6>
                  <i className="fa-solid fa-info-circle me-2" aria-hidden="true" />
                  Font Awesome 6 Syntax
                </h6>
                <p className="mb-2">
                  <strong>Solid Icons:</strong>{' '}
                  <code>&lt;i class=&quot;fa-solid fa-home&quot;&gt;&lt;/i&gt;</code>
                </p>
                <p className="mb-2">
                  <strong>Regular Icons:</strong>{' '}
                  <code>&lt;i class=&quot;far fa-heart&quot;&gt;&lt;/i&gt;</code>
                </p>
                <p className="mb-0">
                  <strong>Brand Icons:</strong>{' '}
                  <code>&lt;i class=&quot;fab fa-facebook&quot;&gt;&lt;/i&gt;</code>
                </p>
              </div>
              <div className="alert alert-success">
                <h6>
                  <i className="fa-solid fa-check-circle me-2" aria-hidden="true" />
                  Sizing Classes
                </h6>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <i className="fa-solid fa-star" aria-hidden="true" /> <span>Default</span>
                </div>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <i className="fa-solid fa-star fa-lg" aria-hidden="true" />{' '}
                  <span>fa-lg (33% larger)</span>
                </div>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <i className="fa-solid fa-star fa-2x" aria-hidden="true" />{' '}
                  <span>fa-2x (2em)</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <i className="fa-solid fa-star fa-3x" aria-hidden="true" />{' '}
                  <span>fa-3x (3em)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="au-card">
            <div className="au-card-inner">
              <h3 className="title-2 m-b-30">Icon Categories</h3>
              <div className="row">
                {iconCategories.map(c => (
                  <div className="col-6 mb-3" key={c.label}>
                    <div className="d-flex align-items-center">
                      <div
                        className={`icon-color bg-${c.bg} rounded me-2`}
                        style={{ width: 16, height: 16 }}
                        aria-hidden="true"
                      />
                      <span className="fs-6">{c.label}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-muted small">
                  <i className="fa-solid fa-lightbulb me-1" aria-hidden="true" />
                  Click any icon above to copy its HTML code to clipboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
