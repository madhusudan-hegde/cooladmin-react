'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Avatar, Input, MButton, MCard, Select, Textarea, useToast } from '@madhusudan-hegde/cooladmin-react'
import {
  connectedAccounts,
  profileLanguages,
  profileTimezones,
  profileUser,
} from '@/lib/profile-data'

/** "Account" tab: profile photo, connected accounts and the personal-information form. */
export function ProfileAccountPane() {
  const toast = useToast()
  const [accounts, setAccounts] = useState(connectedAccounts)
  const [user, setUser] = useState(profileUser)

  const update = <K extends keyof typeof profileUser>(key: K, value: (typeof profileUser)[K]) =>
    setUser(prev => ({ ...prev, [key]: value }))

  const toggleAccount = (id: string) =>
    setAccounts(list =>
      list.map(a => {
        if (a.id !== id) return a
        const connected = !a.connected
        toast.success(connected ? `${a.name} connected` : `${a.name} disconnected`)
        return { ...a, connected, detail: connected ? `Connected as ${user.email}` : '' }
      })
    )

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.success('Profile updated')
  }

  return (
    <div className="row row-tight">
      <div className="col-lg-4">
        <MCard title="Profile photo" subtitle="JPG, PNG or GIF, up to 2 MB.">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              padding: '8px 0',
            }}
          >
            <Avatar src={user.avatar} alt={`${user.firstName} ${user.lastName}`} size={120} />
            <div style={{ display: 'flex', gap: 8 }}>
              <MButton
                variant="primary"
                icon="fa-solid fa-cloud-arrow-up"
                onClick={() =>
                  toast.info('Upload photo', 'File picker ships with the next release.')
                }
              >
                Upload
              </MButton>
              <MButton
                variant="ghost"
                icon="fa-regular fa-trash-can"
                onClick={() => toast.info('Photo removed')}
              >
                Remove
              </MButton>
            </div>
          </div>
        </MCard>

        <MCard title="Connected accounts" className="mt-3">
          <ul className="card-list" style={{ margin: '0 -20px -8px' }}>
            {accounts.map(account => (
              <li key={account.id}>
                <div className="card-list__main">
                  <span
                    className="card-list__icon"
                    style={{ background: 'var(--m-surface-2)', color: 'var(--m-text)' }}
                  >
                    <i className={account.icon} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="card-list__title">{account.name}</span>
                    <span className="card-list__sub">
                      {account.connected ? account.detail : 'Not connected'}
                    </span>
                  </div>
                </div>
                <MButton variant="ghost" size="sm" onClick={() => toggleAccount(account.id)}>
                  {account.connected ? 'Disconnect' : 'Connect'}
                </MButton>
              </li>
            ))}
          </ul>
        </MCard>
      </div>

      <div className="col-lg-8">
        <MCard title="Personal information" subtitle="Used across the dashboard and on invoices.">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Input
                  variant="bootstrap"
                  id="first-name"
                  label="First name"
                  autoComplete="given-name"
                  value={user.firstName}
                  onChange={e => update('firstName', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  variant="bootstrap"
                  id="last-name"
                  label="Last name"
                  autoComplete="family-name"
                  value={user.lastName}
                  onChange={e => update('lastName', e.target.value)}
                />
              </div>
            </div>
            <Input
              variant="bootstrap"
              id="email"
              type="email"
              label="Email address"
              autoComplete="email"
              value={user.email}
              onChange={e => update('email', e.target.value)}
            />
            <Input
              variant="bootstrap"
              id="role"
              label="Job title"
              value={user.jobTitle}
              onChange={e => update('jobTitle', e.target.value)}
            />
            <Textarea
              id="bio"
              label="Bio"
              value={user.bio}
              onChange={e => update('bio', e.target.value)}
            />
            <div className="row">
              <div className="col-md-6">
                <Select
                  id="timezone"
                  label="Timezone"
                  value={user.timezone}
                  onChange={e => update('timezone', e.target.value)}
                >
                  {profileTimezones.map(tz => (
                    <option key={tz}>{tz}</option>
                  ))}
                </Select>
              </div>
              <div className="col-md-6">
                <Select
                  id="lang"
                  label="Language"
                  value={user.language}
                  onChange={e => update('language', e.target.value)}
                >
                  {profileLanguages.map(lang => (
                    <option key={lang}>{lang}</option>
                  ))}
                </Select>
              </div>
            </div>
            <button type="submit" className="visually-hidden">
              Save profile
            </button>
          </form>
        </MCard>
      </div>
    </div>
  )
}
