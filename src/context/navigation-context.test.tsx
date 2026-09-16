import { describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { NavigationProvider, useNavigation, usePathname, useNavigate } from './navigation-context'
import { LinkProvider, useLinkComponent } from './link-context'
import type { LinkProps } from '../types/layout'

function ShowPath() {
  const pathname = usePathname()
  return <span data-testid="path">{pathname}</span>
}

function NavigateButton({ href }: { href: string }) {
  const { navigate } = useNavigation()
  return (
    <button type="button" onClick={() => navigate(href)}>
      go
    </button>
  )
}

function ShowLink() {
  const Link = useLinkComponent()
  return <Link href="/x">link</Link>
}

describe('NavigationProvider / useNavigation', () => {
  it('falls back to window.location.pathname without a provider', () => {
    window.history.pushState({}, '', '/from-browser')
    render(<ShowPath />)
    expect(screen.getByTestId('path').textContent).toBe('/from-browser')
  })

  it('tracks popstate in the browser fallback', () => {
    window.history.pushState({}, '', '/first')
    render(<ShowPath />)
    act(() => {
      window.history.pushState({}, '', '/second')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(screen.getByTestId('path').textContent).toBe('/second')
  })

  it('uses the provided pathname and navigate', () => {
    const navigate = vi.fn()
    render(
      <NavigationProvider pathname="/from-router" navigate={navigate}>
        <ShowPath />
        <NavigateButton href="/target" />
      </NavigationProvider>
    )
    expect(screen.getByTestId('path').textContent).toBe('/from-router')
    screen.getByRole('button').click()
    expect(navigate).toHaveBeenCalledWith('/target')
  })

  it('forwards linkComponent to LinkProvider', () => {
    const CustomLink = ({ href, children }: LinkProps) => (
      <a href={href} data-testid="custom">
        {children}
      </a>
    )
    render(
      <NavigationProvider linkComponent={CustomLink}>
        <ShowLink />
      </NavigationProvider>
    )
    expect(screen.getByTestId('custom')).toHaveAttribute('href', '/x')
  })

  it('LinkProvider without linkComponent inherits the parent link', () => {
    const CustomLink = ({ href, children }: LinkProps) => (
      <a href={href} data-testid="inherited">
        {children}
      </a>
    )
    render(
      <LinkProvider linkComponent={CustomLink}>
        <LinkProvider>
          <ShowLink />
        </LinkProvider>
      </LinkProvider>
    )
    expect(screen.getByTestId('inherited')).toBeInTheDocument()
  })

  it('useNavigate forwards to the adapter and stays stable across renders', () => {
    const navigate = vi.fn()
    const seen: Array<(href: string) => void> = []
    function Probe() {
      const go = useNavigate()
      seen.push(go)
      return (
        <button type="button" onClick={() => go('/via-hook', { replace: true })}>
          hook
        </button>
      )
    }
    const { rerender } = render(
      <NavigationProvider pathname="/a" navigate={navigate}>
        <Probe />
      </NavigationProvider>
    )
    rerender(
      <NavigationProvider pathname="/a" navigate={navigate}>
        <Probe />
      </NavigationProvider>
    )
    screen.getByRole('button').click()
    expect(navigate).toHaveBeenCalledWith('/via-hook', { replace: true })
    expect(seen[0]).toBe(seen[1])
  })
})
