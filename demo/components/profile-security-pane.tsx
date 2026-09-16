'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Input, MButton, MCard, StatusPill, useToast } from '@cooladmin/react'
import { activeSessions } from '@/lib/profile-data'
import type { ActiveSession } from '@/lib/profile-data'

const SESSION_TONE: Record<ActiveSession['tone'], { background: string; color: string }> = {
  success: { background: 'var(--m-success-soft)', color: 'var(--m-success)' },
  c2: { background: 'var(--m-c2-soft)', color: 'var(--m-c2)' },
  c3: { background: 'var(--m-c3-soft)', color: 'var(--m-c3)' },
}

/** "Security" tab: change password, two-factor authentication, active sessions. */
export function ProfileSecurityPane() {
  const toast = useToast()
  const [sessions, setSessions] = useState(activeSessions)
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [pwError, setPwError] = useState<string | undefined>()
  const [twoFactor, setTwoFactor] = useState(true)

  const onPasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (pw.next.length < 12) {
      setPwError('Use at least 12 characters.')
      return
    }
    if (pw.next !== pw.confirm) {
      setPwError('Passwords do not match.')
      return
    }
    setPwError(undefined)
    setPw({ current: '', next: '', confirm: '' })
    toast.success('Password updated')
  }

  const signOut = (id: string) => {
    setSessions(list => list.filter(s => s.id !== id))
    toast.info('Signed out', 'The session was revoked.')
  }
  const signOutOthers = () => {
    setSessions(list => list.filter(s => s.current))
    toast.info('Signed out of all other sessions')
  }

  return (
    <div className="row row-tight">
      <div className="col-lg-7">
        <MCard
          title="Change password"
          subtitle="Use at least 12 characters with a mix of letters, numbers, and symbols."
        >
          <form onSubmit={onPasswordSubmit}>
            <Input
              variant="bootstrap"
              id="cur-pw"
              type="password"
              label="Current password"
              autoComplete="current-password"
              value={pw.current}
              onChange={e => setPw(p => ({ ...p, current: e.target.value }))}
            />
            <Input
              variant="bootstrap"
              id="new-pw"
              type="password"
              label="New password"
              autoComplete="new-password"
              value={pw.next}
              onChange={e => setPw(p => ({ ...p, next: e.target.value }))}
            />
            <Input
              variant="bootstrap"
              id="confirm-pw"
              type="password"
              label="Confirm new password"
              autoComplete="new-password"
              error={pwError}
              value={pw.confirm}
              onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))}
            />
            <MButton type="submit" variant="primary" className="mt-3">
              Update password
            </MButton>
          </form>
        </MCard>

        <MCard
          title="Two-factor authentication"
          subtitle="Add an extra layer of security with an authenticator app."
          className="mt-3"
          actions={
            twoFactor ? (
              <StatusPill status="process">Enabled</StatusPill>
            ) : (
              <StatusPill status="denied">Disabled</StatusPill>
            )
          }
        >
          <p style={{ margin: '0 0 16px', color: 'var(--m-text-muted)', fontSize: 13.5 }}>
            {twoFactor ? (
              <>
                Currently using{' '}
                <strong style={{ color: 'var(--m-text)' }}>Google Authenticator</strong>. Backup
                codes were generated 14 days ago.
              </>
            ) : (
              'Two-factor authentication is turned off for this account.'
            )}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {twoFactor ? (
              <>
                <MButton
                  variant="ghost"
                  icon="fa-solid fa-arrows-rotate"
                  onClick={() => toast.info('Reconfigure 2FA', 'Scan the new QR code in your app.')}
                >
                  Reconfigure
                </MButton>
                <MButton
                  variant="ghost"
                  icon="fa-solid fa-list"
                  onClick={() => toast.info('Backup codes', 'Codes were sent to your email.')}
                >
                  Show backup codes
                </MButton>
                <MButton
                  variant="ghost"
                  icon="fa-solid fa-power-off"
                  style={{ color: 'var(--m-danger)' }}
                  onClick={() => {
                    setTwoFactor(false)
                    toast.warning('Two-factor authentication disabled')
                  }}
                >
                  Disable
                </MButton>
              </>
            ) : (
              <MButton
                variant="primary"
                icon="fa-solid fa-shield-halved"
                onClick={() => {
                  setTwoFactor(true)
                  toast.success('Two-factor authentication enabled')
                }}
              >
                Enable
              </MButton>
            )}
          </div>
        </MCard>
      </div>

      <div className="col-lg-5">
        <MCard title="Active sessions">
          <ul className="card-list" style={{ margin: '0 -20px -8px' }}>
            {sessions.map(session => (
              <li key={session.id}>
                <div className="card-list__main">
                  <span className="card-list__icon" style={SESSION_TONE[session.tone]}>
                    <i className={session.icon} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="card-list__title">{session.device}</span>
                    <span className="card-list__sub">{session.location}</span>
                  </div>
                </div>
                {session.current ? (
                  <StatusPill status="process">Active</StatusPill>
                ) : (
                  <MButton variant="ghost" size="sm" onClick={() => signOut(session.id)}>
                    Sign out
                  </MButton>
                )}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--m-divider)' }}>
            <MButton
              variant="ghost"
              style={{ color: 'var(--m-danger)', width: '100%' }}
              disabled={sessions.length <= 1}
              onClick={signOutOthers}
            >
              Sign out of all other sessions
            </MButton>
          </div>
        </MCard>
      </div>
    </div>
  )
}
