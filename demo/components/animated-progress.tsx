'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@cooladmin/react'

export interface AnimatedProgressProps {
  /** Target value, 0–100. */
  value: number
  /** Bootstrap `bg-*` colour class on the fill. */
  tone?: 'success' | 'warning' | 'danger'
  /** Show the percentage inside the bar (CoolAdmin does). */
  showLabel?: boolean
  ariaLabel?: string
  className?: string
}

/**
 * Bootstrap `.progress > .progress-bar` that counts up from 0 to `value` once it
 * scrolls into view — the React equivalent of `initProgressBars()` in
 * main-vanilla.js (IntersectionObserver, 50 steps at 30ms).
 */
export function AnimatedProgress({
  value,
  tone,
  showLabel = true,
  ariaLabel,
  className,
}: AnimatedProgressProps) {
  const target = Math.max(0, Math.min(100, value))
  const ref = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timer: ReturnType<typeof setInterval> | null = null

    const animate = () => {
      const step = target / 50
      let next = 0
      timer = setInterval(() => {
        next = Math.min(next + step, target)
        setCurrent(next)
        if (next >= target && timer) clearInterval(timer)
      }, 30)
    }

    if (typeof IntersectionObserver === 'undefined') {
      setCurrent(target)
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          animate()
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timer) clearInterval(timer)
    }
  }, [target])

  const shown = Math.round(current)
  return (
    <div
      ref={ref}
      className={cn('progress', className)}
      role="progressbar"
      aria-valuenow={shown}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel ?? `${target}% complete`}
    >
      <div className={cn('progress-bar', tone && `bg-${tone}`)} style={{ width: `${current}%` }}>
        {showLabel && `${shown}%`}
      </div>
    </div>
  )
}
