/**
 * Lazy loaders for vendor assets the library does not bundle (FullCalendar,
 * Leaflet). Each URL is injected once per document and every caller shares the
 * same promise, which resolves when the asset has loaded (or immediately when
 * an identical tag is already present and loaded).
 */

export interface LoadExternalOptions {
  /** Subresource integrity hash (`sha256-…`). */
  integrity?: string
  /** CORS mode; pass `''` for the anonymous default (same as `crossorigin=""`). */
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
}

const pending = new Map<string, Promise<void>>()

function waitFor(el: HTMLElement, url: string, kind: 'script' | 'style'): Promise<void> {
  if (el.dataset.loaded === 'true') return Promise.resolve()
  return new Promise<void>((resolve, reject) => {
    const onLoad = () => {
      el.dataset.loaded = 'true'
      cleanup()
      resolve()
    }
    const onError = () => {
      cleanup()
      pending.delete(url)
      el.remove()
      reject(new Error(`Failed to load ${kind}: ${url}`))
    }
    const cleanup = () => {
      el.removeEventListener('load', onLoad)
      el.removeEventListener('error', onError)
    }
    el.addEventListener('load', onLoad)
    el.addEventListener('error', onError)
  })
}

/** Append a `<script src>` once and resolve when it has executed. */
export function loadScript(src: string, options: LoadExternalOptions = {}): Promise<void> {
  if (typeof document === 'undefined') return Promise.reject(new Error('loadScript: no document'))
  const existing = pending.get(src)
  if (existing) return existing

  let el = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
  if (!el) {
    el = document.createElement('script')
    el.src = src
    el.async = true
    if (options.integrity) el.integrity = options.integrity
    if (options.crossOrigin !== undefined) el.crossOrigin = options.crossOrigin
    document.head.appendChild(el)
  }
  const promise = waitFor(el, src, 'script')
  pending.set(src, promise)
  return promise
}

/** Append a `<link rel="stylesheet">` once and resolve when it has loaded. */
export function loadStyle(href: string, options: LoadExternalOptions = {}): Promise<void> {
  if (typeof document === 'undefined') return Promise.reject(new Error('loadStyle: no document'))
  const existing = pending.get(href)
  if (existing) return existing

  let el = document.querySelector<HTMLLinkElement>(`link[rel="stylesheet"][href="${href}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = 'stylesheet'
    el.href = href
    if (options.integrity) el.integrity = options.integrity
    if (options.crossOrigin !== undefined) el.crossOrigin = options.crossOrigin
    document.head.appendChild(el)
  }
  const promise = waitFor(el, href, 'style')
  pending.set(href, promise)
  return promise
}

/** Load several assets in order (each waits for the previous one — needed when a script depends on another). */
export async function loadSequence(
  items: Array<{ kind: 'script' | 'style'; url: string; options?: LoadExternalOptions }>
): Promise<void> {
  for (const item of items) {
    if (item.kind === 'script') await loadScript(item.url, item.options)
    else await loadStyle(item.url, item.options)
  }
}
