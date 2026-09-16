import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number

export interface AvatarProps {
  src?: string
  /** Required for images; used as the tooltip/label for initials too. */
  alt: string
  /** Preset (`xs` 24 · `sm` 32 · `md` 40 · `lg` 56 · `xl` 80) or a pixel size. */
  size?: AvatarSize
  /** Fallback when `src` is missing (defaults to initials derived from `alt`). */
  initials?: string
  /** Presence dot. */
  status?: 'online' | 'away' | 'busy' | 'offline'
  className?: string
}

function deriveInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p.charAt(0).toUpperCase())
    .join('')
}

/**
 * Circular avatar (`.avatar.avatar--<size>`) with an initials fallback and an
 * optional presence dot (`.avatar__status--online` …).
 */
export function Avatar({ src, alt, size = 'md', initials, status, className }: AvatarProps) {
  const numeric = typeof size === 'number'
  // Pixel sizes feed the same `--avatar-size` custom property the presets set,
  // so the stylesheet derives width/height/font-size consistently.
  const style = numeric ? ({ '--avatar-size': `${size}px` } as CSSProperties) : undefined

  return (
    <span
      className={cn('avatar', !numeric && `avatar--${size}`, !src && 'avatar--initials', className)}
      style={style}
      title={alt}
    >
      {src ? (
        <img className="avatar__img" src={src} alt={alt} />
      ) : (
        <span className="avatar__initials" role="img" aria-label={alt}>
          {initials ?? deriveInitials(alt)}
        </span>
      )}
      {status && (
        <span className={cn('avatar__status', `avatar__status--${status}`)} aria-hidden="true" />
      )}
    </span>
  )
}

export interface AvatarGroupProps {
  children: ReactNode
  /** Show at most this many avatars; the rest collapse into a `+N` bubble. */
  max?: number
  /** Total count used for the `+N` overflow when `children` is already truncated. */
  total?: number
  size?: AvatarSize
  className?: string
}

/** Overlapping avatar stack (`.avatar-group`), as used on project/kanban cards. */
export function AvatarGroup({ children, max, total, size = 'sm', className }: AvatarGroupProps) {
  const list = Array.isArray(children) ? children : [children]
  const flat = list.flat().filter(Boolean)
  const visible = max ? flat.slice(0, max) : flat
  const overflow = (total ?? flat.length) - visible.length
  const numeric = typeof size === 'number'

  return (
    <span className={cn('avatar-group', className)}>
      {visible}
      {overflow > 0 && (
        <span
          className={cn(
            'avatar',
            'avatar--initials',
            'avatar--overflow',
            !numeric && `avatar--${size}`
          )}
          style={numeric ? ({ '--avatar-size': `${size}px` } as CSSProperties) : undefined}
        >
          <span className="avatar__initials">+{overflow}</span>
        </span>
      )}
    </span>
  )
}
