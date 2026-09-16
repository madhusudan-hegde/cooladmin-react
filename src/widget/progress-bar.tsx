import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../lib/class-name'

export interface ProgressBarProps {
  /** 0–100. */
  value: number
  /** Optional caption row (`.progress-bar-modern__label`); the value is shown on the right. */
  label?: ReactNode
  /** Fill colour (CSS colour or `var(--m-c2)`); defaults to the accent. */
  color?: string
  size?: 'sm' | 'md' | 'lg'
  /** Hide the numeric value next to the label. */
  hideValue?: boolean
  /** Accessible name for the track when `label` is absent or not plain text. */
  ariaLabel?: string
  className?: string
}

/**
 * Slim modern progress bar (`.progress-bar-modern`) used for quotas and skills.
 */
export function ProgressBar({
  value,
  label,
  color,
  size = 'md',
  hideValue = false,
  ariaLabel,
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, Math.round(value)))
  // The stylesheet sizes/tints the fill from these custom properties
  // (`width: var(--pct)`, `background: var(--color, var(--m-accent))`).
  const fillStyle = {
    '--pct': `${pct}%`,
    ...(color ? { '--color': color } : {}),
  } as CSSProperties

  return (
    <div className={cn('progress-bar-modern', `progress-bar-modern--${size}`, className)}>
      {(label || !hideValue) && (
        <div className="progress-bar-modern__label">
          {label && <span>{label}</span>}
          {!hideValue && <span className="progress-bar-modern__value">{pct}%</span>}
        </div>
      )}
      <div
        className="progress-bar-modern__track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined)}
      >
        <div className="progress-bar-modern__fill" style={fillStyle} />
      </div>
    </div>
  )
}
