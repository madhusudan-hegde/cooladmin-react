import { useEffect } from 'react'

/**
 * Toggle one or more space-separated classes on `<body>` while `active` is
 * true. Classes are removed on deactivate and on unmount.
 */
export function useBodyClass(className: string, active = true): void {
  useEffect(() => {
    if (!active || typeof document === 'undefined') return
    const list = className.split(/\s+/).filter(Boolean)
    if (!list.length) return
    const body = document.body
    list.forEach(c => body.classList.add(c))
    return () => list.forEach(c => body.classList.remove(c))
  }, [className, active])
}
