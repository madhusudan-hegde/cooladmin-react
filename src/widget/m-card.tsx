import { useId } from 'react'
import type { ElementType, ReactNode } from 'react'
import { cn } from '../lib/class-name'
import { SectionEyebrow } from './section-eyebrow'

export interface MCardProps {
  title?: ReactNode
  subtitle?: ReactNode
  /** Right-aligned header content (buttons, links, menus). */
  actions?: ReactNode
  /** Small uppercase label above the title. */
  eyebrow?: ReactNode
  children?: ReactNode
  className?: string
  /** Wraps `children` in a div with this class (omit to render children directly). */
  bodyClassName?: string
  /** Root element (default `section`). */
  as?: ElementType
  /** Heading level for the title (default `h2`). */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  id?: string
}

/**
 * CoolAdmin's modern card (`.m-card`) with the optional
 * `.m-card__header > (title + subtitle) + actions` row.
 */
export function MCard({
  title,
  subtitle,
  actions,
  eyebrow,
  children,
  className,
  bodyClassName,
  as: Tag = 'section',
  titleAs: TitleTag = 'h2',
  id,
}: MCardProps) {
  const autoId = useId()
  const titleId = title ? `${id ?? autoId}-title` : undefined
  const hasHeader = Boolean(title || subtitle || actions || eyebrow)

  return (
    <Tag className={cn('m-card', className)} id={id} aria-labelledby={titleId}>
      {hasHeader && (
        <header className="m-card__header">
          <div>
            {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
            {title && (
              <TitleTag className="m-card__title" id={titleId}>
                {title}
              </TitleTag>
            )}
            {subtitle && <p className="m-card__subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="m-card__actions">{actions}</div>}
        </header>
      )}
      {bodyClassName ? <div className={bodyClassName}>{children}</div> : children}
    </Tag>
  )
}
