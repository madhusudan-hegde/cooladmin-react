import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/**
 * Run `handler` when a pointer-down lands outside every element in `refs`.
 */
export function useClickOutside(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  active = true
): void {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    if (!active || typeof document === 'undefined') return
    const list = Array.isArray(refs) ? refs : [refs]
    const onDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null
      if (!target) return
      const inside = list.some(r => r.current && r.current.contains(target))
      if (!inside) handlerRef.current(e)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ...(Array.isArray(refs) ? refs : [refs])])
}
