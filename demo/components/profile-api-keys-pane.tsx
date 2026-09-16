'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { IconButton, MButton, MCard, useToast } from '@madhusudan-hegde/cooladmin-react'
import { apiKeys } from '@/lib/profile-data'
import type { ApiKey } from '@/lib/profile-data'

const codeStyle: CSSProperties = {
  fontSize: 12,
  background: 'var(--m-surface-2)',
  padding: '3px 8px',
  borderRadius: 4,
}

const TONE: Record<NonNullable<ApiKey['tone']>, CSSProperties> = {
  c2: { background: 'var(--m-c2-soft)', color: 'var(--m-c2)' },
  c3: { background: 'var(--m-c3-soft)', color: 'var(--m-c3)' },
}

/** "API keys" tab: keys table with copy / revoke actions. */
export function ProfileApiKeysPane() {
  const toast = useToast()
  const [keys, setKeys] = useState(apiKeys)

  const copy = (key: ApiKey) => {
    toast.success('Copied', `${key.label} key copied to the clipboard.`)
  }
  const revoke = (key: ApiKey) => {
    setKeys(list => list.filter(k => k.id !== key.id))
    toast.warning('Key revoked', `${key.label} can no longer authenticate requests.`)
  }
  const create = () => {
    const n = keys.length + 1
    setKeys(list => [
      ...list,
      {
        id: `key-${n}`,
        label: `New key ${n}`,
        key: 'sk_test_••••••••••new' + n,
        created: 'Just now',
        lastUsed: 'Never',
        tone: 'c2',
      },
    ])
    toast.success('API key created', 'Copy it now — it will not be shown again.')
  }

  return (
    <MCard
      title="API keys"
      subtitle="Use these to authenticate API requests. Keep them secret."
      actions={
        <MButton variant="primary" icon="fa-solid fa-plus" onClick={create}>
          Create new key
        </MButton>
      }
    >
      <div className="table-responsive">
        <table className="m-table">
          <thead>
            <tr>
              <th scope="col">Label</th>
              <th scope="col">Key</th>
              <th scope="col">Created</th>
              <th scope="col">Last used</th>
              <th scope="col">
                <span className="visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {keys.map(key => (
              <tr key={key.id}>
                <td>
                  <span className="row-product">
                    <span
                      className="row-product__icon"
                      style={key.tone ? TONE[key.tone] : undefined}
                    >
                      <i className="fa-solid fa-key" aria-hidden="true" />
                    </span>
                    {key.label}
                  </span>
                </td>
                <td>
                  <code style={codeStyle}>{key.key}</code>
                </td>
                <td>{key.created}</td>
                <td>{key.lastUsed}</td>
                <td>
                  <IconButton
                    icon="fa-regular fa-copy"
                    label={`Copy ${key.label} key`}
                    onClick={() => copy(key)}
                  />
                  <IconButton
                    icon="fa-regular fa-trash-can"
                    label={`Revoke ${key.label} key`}
                    style={{ color: 'var(--m-danger)' }}
                    onClick={() => revoke(key)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MCard>
  )
}
