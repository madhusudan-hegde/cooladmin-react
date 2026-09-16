import type { ReactNode } from 'react'
import type { AccentSlot } from '../types/theme'
import { cn } from '../lib/class-name'

export interface ActivityListItem {
  id: string | number
  avatarSrc?: string
  /** Font Awesome 7 class string used when there is no avatar. */
  icon?: string
  iconColor?: AccentSlot
  text: ReactNode
  time: ReactNode
}

export interface ActivityListProps {
  items: ActivityListItem[]
  className?: string
}

/** "Recent activity" feed (`.activity-list > .activity-item`). */
export function ActivityList({ items, className }: ActivityListProps) {
  return (
    <ul className={cn('activity-list', className)}>
      {items.map(item => (
        <li key={item.id} className="activity-item">
          {item.avatarSrc ? (
            <img className="activity-item__avatar" src={item.avatarSrc} alt="" />
          ) : (
            <span
              className={cn(
                'activity-item__icon',
                item.iconColor && `activity-item__icon--${item.iconColor}`
              )}
            >
              <i className={item.icon ?? 'fa-solid fa-bolt'} aria-hidden="true" />
            </span>
          )}
          <div className="activity-item__body">
            <p className="activity-item__text">{item.text}</p>
            <span className="activity-item__time">{item.time}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
