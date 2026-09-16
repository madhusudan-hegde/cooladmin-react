import { Route, Routes } from 'react-router'
import { DashboardLayout } from '@madhusudan-hegde/cooladmin-react'
import { ReactRouterNavigationProvider } from '@madhusudan-hegde/cooladmin-react/react-router'
import { menuItems } from './menu'
import { CustomersPage, NotFoundPage, OverviewPage, SettingsPage } from './pages'

/**
 * The whole library is framework-agnostic; `ReactRouterNavigationProvider`
 * is the one line that tells it about React Router (active links, palette
 * navigation, `<Link>`). Compare with the Next.js demo, which uses
 * `NextNavigationProvider` from `@madhusudan-hegde/cooladmin-react/next`.
 */
export function App() {
  return (
    <ReactRouterNavigationProvider>
      <DashboardLayout
        menuItems={menuItems}
        brandName="CoolAdmin"
        user={{ name: 'Ada Lovelace', role: 'Admin' }}
      >
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </DashboardLayout>
    </ReactRouterNavigationProvider>
  )
}
