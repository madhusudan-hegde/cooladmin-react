import type { CSSProperties } from 'react'
import { cn } from '../lib/class-name'

export interface SkeletonProps {
  variant?: 'line' | 'circle' | 'block'
  /** Line preset widths/heights (`.skeleton-line--sm|md|lg`). */
  size?: 'sm' | 'md' | 'lg'
  width?: number | string
  height?: number | string
  className?: string
  style?: CSSProperties
}

/**
 * Loading placeholder — `.skeleton-line(--sm|--md|--lg)`, `.skeleton-circle` or
 * `.skeleton-block`, matching CoolAdmin's dashboard-refresh skeletons.
 */
export function Skeleton({
  variant = 'line',
  size,
  width,
  height,
  className,
  style,
}: SkeletonProps) {
  const base =
    variant === 'line'
      ? 'skeleton-line'
      : variant === 'circle'
      ? 'skeleton-circle'
      : 'skeleton-block'
  const inline: CSSProperties = { ...style }
  if (width !== undefined) inline.width = width
  if (height !== undefined) inline.height = height
  if (variant === 'circle' && width !== undefined && height === undefined) inline.height = width

  return (
    <span
      className={cn(base, variant === 'line' && size && `skeleton-line--${size}`, className)}
      style={inline}
      aria-hidden="true"
    />
  )
}
