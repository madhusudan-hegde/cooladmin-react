import type { ReactNode } from 'react'
import { AuthLayout } from '@madhusudan-hegde/cooladmin-react'

export const metadata = {
  title: { default: 'CoolAdmin React', template: '%s · CoolAdmin React' },
}

/**
 * `body.app.auth-page > main#auth-form.login-wrap > .login-content` shell for
 * /login, /register and /forgot-password.
 */
export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayout brandName="CoolAdmin" brandMark="C" brandHref="/">
      {children}
    </AuthLayout>
  )
}
