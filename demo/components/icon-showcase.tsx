'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Input, cn } from '@madhusudan-hegde/cooladmin-react'
import { iconSections } from '@/lib/icons-data'
import type { IconEntry } from '@/lib/icons-data'

/** `<i class="fa-solid fa-home"></i>` — what fontawesome.scripts.html copies. */
const snippet = (icon: IconEntry) => `<i class="${icon.className}"></i>`

function IconTile({
  icon,
  copied,
  onCopy,
}: {
  icon: IconEntry
  copied: boolean
  onCopy: (icon: IconEntry) => void
}) {
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 col-6">
      <button
        type="button"
        className={cn(
          'icon-showcase d-flex flex-column align-items-center p-3 border rounded text-center',
          copied && 'is-copied'
        )}
        onClick={() => onCopy(icon)}
        aria-label={`Copy ${icon.className}`}
        title={`Copy ${snippet(icon)}`}
      >
        {copied ? (
          <>
            <i className="fa-solid fa-check text-success fs-2 mb-2" aria-hidden="true" />
            <small className="text-success">Copied!</small>
          </>
        ) : (
          <>
            <i className={`${icon.className} fs-2 text-${icon.tone} mb-2`} aria-hidden="true" />
            <small className="text-muted">{icon.className}</small>
          </>
        )}
      </button>
    </div>
  )
}

/**
 * Searchable Font Awesome grid (CoolAdmin fontawesome.html + .scripts.html):
 * three `.au-card` sections of `.icon-showcase` tiles; clicking a tile copies its
 * `<i>` snippet to the clipboard and shows "Copied!" for a second.
 */
export function IconShowcase() {
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const q = query.trim().toLowerCase()
  const sections = useMemo(
    () =>
      iconSections.map(section => ({
        ...section,
        icons: q
          ? section.icons.filter(
              i => i.className.includes(q) || i.category.toLowerCase().includes(q)
            )
          : section.icons,
      })),
    [q]
  )
  const total = sections.reduce((n, s) => n + s.icons.length, 0)

  const copy = async (icon: IconEntry) => {
    try {
      await navigator.clipboard?.writeText(snippet(icon))
    } catch {
      // Clipboard access denied — still show the feedback so the click isn't silent.
    }
    setCopied(icon.className)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(null), 1000)
  }

  return (
    <>
      <div className="icon-search">
        <Input
          type="search"
          placeholder="Search icons — e.g. chart, envelope, brands"
          aria-label="Search icons"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="icon-search__count" role="status">
          {total} {total === 1 ? 'icon' : 'icons'}
        </span>
      </div>

      {sections.map(section => (
        <div className="row m-t-25" key={section.id}>
          <div className="col-lg-12">
            <div className="au-card">
              <div className="au-card-inner">
                <h3 className="title-2 m-b-40">{section.title}</h3>
                {section.icons.length ? (
                  <div className="row g-3">
                    {section.icons.map(icon => (
                      <IconTile
                        key={icon.className}
                        icon={icon}
                        copied={copied === icon.className}
                        onCopy={copy}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="icon-showcase-empty">No icons match “{query.trim()}”.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
