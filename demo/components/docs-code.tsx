'use client'

import { useEffect, useRef, useState } from 'react'
import { cn, useToast } from '@madhusudan-hegde/cooladmin-react'

export interface CodeBlockProps {
  /** The code, rendered verbatim inside `<pre><code>`. */
  code: string
  /** Optional language hint (`language-*` class on the code element). */
  language?: string
  className?: string
}

const RESET_MS = 1500

/**
 * `<pre>` with CoolAdmin's `.docs-copy-btn` (docs.scripts.html): copies the code
 * to the clipboard, flips the label to "Copied!" for 1.5 s and confirms via toast.
 */
export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const toast = useToast()
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('Copied to clipboard')
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), RESET_MS)
    } catch {
      toast.error('Copy failed', 'Your browser blocked clipboard access.')
    }
  }

  return (
    <pre className={className}>
      <button
        type="button"
        className={cn('docs-copy-btn', copied && 'is-copied')}
        onClick={copy}
        aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        aria-live="polite"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <code className={language ? `language-${language}` : undefined}>{code}</code>
    </pre>
  )
}
