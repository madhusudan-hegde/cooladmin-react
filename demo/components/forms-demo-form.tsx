'use client'

import type { FormEvent, ReactNode } from 'react'
import { useToast } from '@madhusudan-hegde/cooladmin-react'

export interface DemoFormProps {
  id: string
  className?: string
  /** Toast title shown on submit (default "Form submitted"). */
  toastTitle?: string
  children: ReactNode
}

/**
 * `<form action="#" onsubmit="return false">` from CoolAdmin's form.html as a
 * client island: prevents navigation and confirms with a toast. Children are
 * rendered by the server page.
 */
export function DemoForm({
  id,
  className,
  toastTitle = 'Form submitted',
  children,
}: DemoFormProps) {
  const toast = useToast()
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.success(toastTitle, 'This demo form does not send data anywhere.')
  }
  return (
    <form id={id} className={className} action="#" method="post" onSubmit={onSubmit}>
      {children}
    </form>
  )
}
