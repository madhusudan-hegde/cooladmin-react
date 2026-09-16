'use client'

import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../lib/class-name'
import { MButton } from '../form/m-button'

export interface WizardStep {
  id: string
  label: ReactNode
  sublabel?: ReactNode
  /** Font Awesome 7 class string shown in the circle instead of the step number. */
  icon?: string
  content: ReactNode
}

export interface WizardProps {
  steps: WizardStep[]
  /** Controlled active step (0-based). */
  activeIndex?: number
  /** Uncontrolled initial step (default 0). */
  defaultActiveIndex?: number
  onChange?: (index: number) => void
  /** Called when the user advances into the last step (CoolAdmin's "Finish"). */
  onFinish?: () => void
  backLabel?: ReactNode
  nextLabel?: ReactNode
  finishLabel?: ReactNode
  /** Return false to disable the Next/Finish button for step `index`. */
  canProceed?: (index: number) => boolean
  className?: string
}

/**
 * CoolAdmin's multi-step wizard: `ol.wizard__steps` progress indicator
 * (`.is-active` / `.is-complete`, completed steps are clickable) above a
 * `.wizard__panel` with the active step's `.wizard__pane` and a `.wizard__nav`
 * of Back / Next buttons. The forward button on the penultimate step reads
 * `finishLabel`; entering the last step fires `onFinish`, and the last step
 * itself has no forward button (it hosts the confirmation content).
 */
export function Wizard({
  steps,
  activeIndex,
  defaultActiveIndex = 0,
  onChange,
  onFinish,
  backLabel = 'Back',
  nextLabel = 'Continue',
  finishLabel = 'Finish',
  canProceed,
  className,
}: WizardProps) {
  const baseId = useId()
  const [internal, setInternal] = useState(defaultActiveIndex)
  const last = steps.length - 1
  const current = Math.min(Math.max(0, activeIndex ?? internal), Math.max(0, last))
  const step = steps[current]

  const go = (index: number) => {
    if (index < 0 || index > last || index === current) return
    if (activeIndex === undefined) setInternal(index)
    onChange?.(index)
    if (index === last) onFinish?.()
  }

  const proceedAllowed = canProceed ? canProceed(current) : true
  const isPenultimate = current === last - 1
  const labelId = (i: number) => `${baseId}-step-${i}`
  const paneId = `${baseId}-pane`

  return (
    <div className={cn('wizard', className)}>
      <ol className="wizard__steps">
        {steps.map((s, i) => {
          const isActive = i === current
          const isComplete = i < current
          const circle = (
            <span className="wizard__circle" aria-hidden="true">
              {isComplete ? (
                <i className="fa-solid fa-check" />
              ) : s.icon ? (
                <i className={s.icon} />
              ) : (
                i + 1
              )}
            </span>
          )
          const label = (
            <span className="wizard__label" id={labelId(i)}>
              {s.label}
              {s.sublabel && <span className="wizard__sublabel">{s.sublabel}</span>}
            </span>
          )
          return (
            <li
              key={s.id}
              className={cn('wizard__step', isActive && 'is-active', isComplete && 'is-complete')}
              aria-current={isActive ? 'step' : undefined}
            >
              {isComplete ? (
                <button
                  type="button"
                  className="wizard__step-btn"
                  onClick={() => go(i)}
                  aria-controls={paneId}
                >
                  {circle}
                  {label}
                </button>
              ) : (
                <>
                  {circle}
                  {label}
                </>
              )}
            </li>
          )
        })}
      </ol>

      <div className="wizard__panel">
        {step && (
          <div
            className="wizard__pane is-active"
            id={paneId}
            role="group"
            aria-labelledby={labelId(current)}
          >
            {step.content}
          </div>
        )}

        <div className="wizard__nav">
          {current > 0 ? (
            <MButton variant="ghost" icon="fa-solid fa-arrow-left" onClick={() => go(current - 1)}>
              {backLabel}
            </MButton>
          ) : (
            <span aria-hidden="true" />
          )}
          {current < last && (
            <MButton variant="primary" disabled={!proceedAllowed} onClick={() => go(current + 1)}>
              {isPenultimate ? finishLabel : nextLabel}{' '}
              <i
                className={isPenultimate ? 'fa-solid fa-check' : 'fa-solid fa-arrow-right'}
                aria-hidden="true"
              />
            </MButton>
          )}
        </div>
      </div>
    </div>
  )
}
