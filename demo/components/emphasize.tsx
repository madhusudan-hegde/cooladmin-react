import type { ReactNode } from 'react'

/**
 * Turns `**bold**` segments of a plain string into `<b>` elements — lets the
 * activity datasets stay serialisable strings while rendering like CoolAdmin's
 * `<b>Name</b> did <b>thing</b>` markup.
 */
export function emphasize(text: string): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  if (parts.length === 1) return text
  return parts.map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part))
}
