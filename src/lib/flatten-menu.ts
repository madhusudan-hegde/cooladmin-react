import type { MenuNode } from '../types/menu'
import type { Command } from '../types/layout'

const COMPONENT_GROUP = /\b(ui|component|element)s?\b/i

function joinHref(prefix: string | undefined, href: string): string {
  if (!prefix) return href
  if (/^(https?:)?\/\//.test(href) || href.startsWith('#')) return href
  const p = prefix.endsWith('/') ? prefix.slice(0, -1) : prefix
  return href.startsWith('/') ? `${p}${href}` : `${p}/${href}`
}

/**
 * Flattens a `MenuNode` tree into command-palette entries. Header nodes set the
 * group label for the items that follow; groups whose label reads like
 * "UI Elements" / "Components" land in the `Components` group; everything else
 * defaults to `Pages`. Skips placeholder links (`#`) and de-duplicates by href.
 *
 * Lives outside any `'use client'` module so Server Components (DashboardLayout)
 * can call it during server render.
 */
export function flattenMenuToCommands(menuItems: MenuNode[], linkPrefix?: string): Command[] {
  const out: Command[] = []

  const walk = (nodes: MenuNode[], section: string, parentLabel?: string, parentIcon?: string) => {
    let group = section
    for (const node of nodes) {
      if (node.type === 'header') {
        group = node.label
      } else if (node.type === 'item') {
        if (!node.href || node.href === '#') continue
        const href = joinHref(linkPrefix, node.href)
        out.push({
          id: `page:${href}`,
          label: node.label,
          group,
          icon: node.icon ?? parentIcon,
          href,
          description: parentLabel,
          keywords: [
            ...(parentLabel ? [parentLabel] : []),
            ...(node.keywords ?? []),
            node.href.replace(/[/.-]+/g, ' ').trim(),
          ].filter(Boolean),
        })
      } else if (node.type === 'group') {
        const childGroup = COMPONENT_GROUP.test(node.label) ? 'Components' : group
        walk(node.children, childGroup, node.label, node.icon)
      }
    }
  }

  walk(menuItems, 'Pages')

  const seen = new Set<string>()
  return out.filter(c => {
    const key = c.href ?? c.id
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
