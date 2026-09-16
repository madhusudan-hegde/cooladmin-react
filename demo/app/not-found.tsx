import { ErrorLayout, flattenMenuToCommands } from '@madhusudan-hegde/cooladmin-react'
import { menuItems } from '@/lib/menu'
import { NotFoundContent } from '@/components/error-content'

export const metadata = { title: 'Page not found' }

/** Next's catch-all 404 — same content as the `/errors/404` demo page. */
export default function NotFound() {
  return (
    <ErrorLayout
      brandName="CoolAdmin"
      brandMark="C"
      brandHref="/"
      commands={flattenMenuToCommands(menuItems)}
    >
      <NotFoundContent />
    </ErrorLayout>
  )
}
