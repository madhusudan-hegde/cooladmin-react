'use client'

import { useEffect, useState } from 'react'
import { cn } from '@cooladmin/react'

export interface DocsTocItem {
  id: string
  label: string
}

export interface DocsTocProps {
  items: DocsTocItem[]
}

/**
 * Sticky "On this page" list with scroll-spy (port of docs.scripts.html): an
 * IntersectionObserver over every `.docs-section` marks the matching link
 * `.is-active` / `aria-current`.
 */
export function DocsToc({ items }: DocsTocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.docs-section'))
    if (!sections.length || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -55% 0px' }
    )
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  return (
    <aside className="docs-toc" id="docs-toc" aria-label="On this page">
      <p className="docs-toc__title">On this page</p>
      <ul className="docs-toc__list">
        {items.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(activeId === item.id && 'is-active')}
              aria-current={activeId === item.id ? 'true' : undefined}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
