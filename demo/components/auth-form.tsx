'use client'

import type { FormEvent, FormHTMLAttributes, ReactNode } from 'react'
import { useToast } from '@cooladmin/react'

export interface AuthFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Toast shown on submit (the demo forms never post anywhere). */
  submitMessage?: string
  children: ReactNode
}

/** `form.login-form` that swallows submit — presentational demo forms only. */
export function AuthForm({
  submitMessage = 'This is a demo — nothing was submitted.',
  children,
  ...rest
}: AuthFormProps) {
  const toast = useToast()
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.info('Demo form', submitMessage)
  }
  return (
    <form {...rest} className="login-form" action="#" method="post" onSubmit={onSubmit}>
      {children}
    </form>
  )
}
