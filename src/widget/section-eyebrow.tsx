import type { ElementType, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface SectionEyebrowProps {
  children: ReactNode
  /** Element to render (default `h5`, as in CoolAdmin's showcase pages). */
  as?: ElementType
  className?: string
}

/** Small uppercase section label (`.section-eyebrow`). */
export function SectionEyebrow({ children, as: Tag = 'h5', className }: SectionEyebrowProps) {
  return <Tag className={cn('section-eyebrow', className)}>{children}</Tag>
}
