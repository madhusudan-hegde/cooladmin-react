'use client'

import { useState } from 'react'
import { MCard, Switch, useToast } from '@cooladmin/react'
import { emailNotifications, pushNotifications } from '@/lib/profile-data'
import type { NotificationPref } from '@/lib/profile-data'

interface NotifGroupProps {
  title: string
  subtitle: string
  prefs: NotificationPref[]
  className?: string
}

/** One `.notif-grid` of `.notif-row` toggles inside an `MCard`. */
function NotifGroup({ title, subtitle, prefs, className }: NotifGroupProps) {
  const [rows, setRows] = useState(prefs)
  const toast = useToast()

  const toggle = (id: string) =>
    setRows(list =>
      list.map(row => {
        if (row.id !== id) return row
        const enabled = !row.enabled
        toast.info(row.title, enabled ? 'Notifications turned on.' : 'Notifications turned off.')
        return { ...row, enabled }
      })
    )

  return (
    <MCard title={title} subtitle={subtitle} className={className}>
      <div className="notif-grid">
        {rows.map(row => (
          <div className="notif-row" key={row.id}>
            <div>
              <p className="notif-row__title">{row.title}</p>
              <p className="notif-row__sub">{row.sub}</p>
            </div>
            <Switch aria-label={row.title} checked={row.enabled} onChange={() => toggle(row.id)} />
          </div>
        ))}
      </div>
    </MCard>
  )
}

/** "Notifications" tab: email and push preference toggles. */
export function ProfileNotificationsPane() {
  return (
    <>
      <NotifGroup
        title="Email notifications"
        subtitle="Choose which updates you want delivered to your inbox."
        prefs={emailNotifications}
      />
      <NotifGroup
        title="Push notifications"
        subtitle="In-app and mobile push alerts."
        prefs={pushNotifications}
        className="mt-3"
      />
    </>
  )
}
