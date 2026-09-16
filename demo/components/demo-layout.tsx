'use client'

import type { ReactNode } from 'react'
import { DashboardLayout, TopbarMenu } from '@cooladmin/react'
import type { DashboardLayoutProps, TopbarMenuItem } from '@cooladmin/react'
import { menuItems } from '@/lib/menu'
import { avatar } from '@/lib/dashboard-data'
import { NavLink } from '@/components/nav-link'

// Topbar dropdown rows — CoolAdmin's placeholder content from header-desktop.pug.
const messages: TopbarMenuItem[] = [
  {
    id: 'm1',
    avatarSrc: avatar(6),
    title: 'Michelle Moreno',
    text: 'Have sent a photo',
    meta: '3 min ago',
    href: '/inbox',
  },
  {
    id: 'm2',
    avatarSrc: avatar(4),
    title: 'Diane Myers',
    text: 'You are now connected on message',
    meta: 'Yesterday',
    href: '/inbox',
  },
]

const emails: TopbarMenuItem[] = [
  {
    id: 'e1',
    avatarSrc: avatar(6),
    title: 'Meeting about new dashboard...',
    text: 'Cynthia Harvey, 3 min ago',
    href: '/inbox',
  },
  {
    id: 'e2',
    avatarSrc: avatar(5),
    title: 'Meeting about new dashboard...',
    text: 'Cynthia Harvey, Yesterday',
    href: '/inbox',
  },
  {
    id: 'e3',
    avatarSrc: avatar(4),
    title: 'Meeting about new dashboard...',
    text: 'Cynthia Harvey, January 15, 2025',
    href: '/inbox',
  },
]

const notifications: TopbarMenuItem[] = [
  {
    id: 'n1',
    icon: 'fa-solid fa-envelope-open',
    iconColor: 'c1',
    title: 'You got a email notification',
    meta: 'January 15, 2025 14:30',
    href: '/notifications',
  },
  {
    id: 'n2',
    icon: 'fa-solid fa-id-card',
    iconColor: 'c2',
    title: 'Your account has been blocked',
    meta: 'January 15, 2025 14:30',
    href: '/notifications',
  },
  {
    id: 'n3',
    icon: 'fa-solid fa-file-lines',
    iconColor: 'c3',
    title: 'You got a new file',
    meta: 'January 15, 2025 14:30',
    href: '/notifications',
  },
]

export type DemoLayoutProps = Partial<Omit<DashboardLayoutProps, 'children'>> & {
  children: ReactNode
}

/**
 * Demo-wide shell: brand, signed-in user, CoolAdmin's three topbar dropdowns and
 * the `next/link` adapter, on top of the library `DashboardLayout`. Any extra
 * `DashboardLayout` props are forwarded.
 */
export function DemoLayout({ children, ...props }: DemoLayoutProps) {
  return (
    <DashboardLayout
      menuItems={menuItems}
      linkComponent={NavLink}
      brandName="CoolAdmin"
      brandMark="C"
      brandHref="/"
      user={{
        name: 'John Doe',
        role: 'Administrator',
        email: 'johndoe@example.com',
        avatarSrc: avatar(1),
      }}
      topbarEnd={
        <>
          <TopbarMenu
            variant="messages"
            icon="fa-solid fa-comment-dots"
            count={1}
            title="You have 2 new messages"
            items={messages}
            footerLabel="View all messages"
            footerHref="/inbox"
          />
          <TopbarMenu
            variant="emails"
            icon="fa-solid fa-envelope"
            count={1}
            title="You have 3 new emails"
            items={emails}
            footerLabel="See all emails"
            footerHref="/inbox"
          />
          <TopbarMenu
            variant="notifications"
            icon="fa-solid fa-bell"
            count={3}
            title="You have 3 notifications"
            items={notifications}
            footerLabel="All notifications"
            footerHref="/notifications"
          />
        </>
      }
      {...props}
    >
      {children}
    </DashboardLayout>
  )
}
