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
  /** Router link (e.g. an adapter around `next/link`). Defaults to a plain `<a>`. */
  linkComponent?: LinkComponent
  children: ReactNode
}

export function LinkProvider({ linkComponent, children }: LinkProviderProps) {
  return (
    <LinkContext.Provider value={linkComponent ?? DefaultLink}>{children}</LinkContext.Provider>
  )
}

/** The active Link component — consumer-injected router link, or a plain `<a>` fallback. */
export function useLinkComponent(): LinkComponent {
  return useContext(LinkContext)
}
