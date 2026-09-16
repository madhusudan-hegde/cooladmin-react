'use client'

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { LinkComponent, LinkProps } from '../types/layout'

export type { LinkComponent, LinkProps }

/** Framework-agnostic fallback: a plain anchor (full-page navigation). */
export function DefaultLink({ href, children, ...rest }: LinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}

const LinkContext = createContext<LinkComponent>(DefaultLink)

export interface LinkProviderProps {
  /**
   * Router link (e.g. an adapter around `next/link`). When omitted, the nearest
   * ancestor `LinkProvider` is inherited — typically a framework adapter such as
   * `NextNavigationProvider` — and a plain `<a>` is the final fallback.
   */
  linkComponent?: LinkComponent
  children: ReactNode
}

export function LinkProvider({ linkComponent, children }: LinkProviderProps) {
  const inherited = useContext(LinkContext)
  return <LinkContext.Provider value={linkComponent ?? inherited}>{children}</LinkContext.Provider>
}

/** The active Link component — consumer-injected router link, or a plain `<a>` fallback. */
export function useLinkComponent(): LinkComponent {
  return useContext(LinkContext)
}
