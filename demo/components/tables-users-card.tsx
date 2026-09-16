'use client'

import { useState } from 'react'
import { Checkbox, MCard, Select, useToast } from '@cooladmin/react'
import { userPermissions } from '@/lib/tables-data'
import type { TableUser, UserPermission } from '@/lib/tables-data'

export interface TablesUsersCardProps {
  users: TableUser[]
}

/**
 * "Users" card from CoolAdmin's table.html (`.user-data` + `.table-data__info`
 * + `.role` chips): header filters, select-all checkbox, per-row permission
 * select and a "Load more" footer — all driven by React state.
 */
export function TablesUsersCard({ users }: TablesUsersCardProps) {
  const [rows, setRows] = useState(users)
  const toast = useToast()

  const allSelected = rows.length > 0 && rows.every(u => u.selected)
  const someSelected = rows.some(u => u.selected)

  const toggleAll = () => setRows(list => list.map(u => ({ ...u, selected: !allSelected })))
  const toggleRow = (id: string) =>
    setRows(list => list.map(u => (u.id === id ? { ...u, selected: !u.selected } : u)))
  const setPermission = (id: string, permission: UserPermission) =>
    setRows(list => list.map(u => (u.id === id ? { ...u, permission } : u)))

  return (
    <MCard
      title="Users"
      subtitle="Manage roles and permissions."
      actions={
        <div className="user-data filters">
          <div className="select-wrapper">
            <Select name="property" aria-label="Filter properties" defaultValue="All properties">
              <option>All properties</option>
              <option>Products</option>
              <option>Services</option>
            </Select>
          </div>
          <div className="select-wrapper">
            <Select name="time" aria-label="Filter by time" defaultValue="All time">
              <option>All time</option>
              <option>By month</option>
              <option>By day</option>
            </Select>
          </div>
        </div>
      }
    >
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 24 }}>
                <label className="au-checkbox">
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    checked={allSelected}
                    ref={el => {
                      if (el) el.indeterminate = !allSelected && someSelected
                    }}
                    onChange={toggleAll}
                  />
                  <span className="au-checkmark" aria-hidden="true" />
                </label>
              </th>
              <th>Name</th>
              <th>Role</th>
              <th>Permission</th>
              <th>
                <span className="visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(user => (
              <tr key={user.id}>
                <td>
                  <Checkbox
                    aria-label={`Select ${user.name}`}
                    checked={user.selected}
                    onChange={() => toggleRow(user.id)}
                  />
                </td>
                <td>
                  <div className="table-data__info">
                    <h6>{user.name}</h6>
                    <span>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </span>
                  </div>
                </td>
                <td>
                  <span className={`role ${user.role}`}>{user.roleLabel}</span>
                </td>
                <td>
                  <div className="select-wrapper">
                    <Select
                      aria-label={`Permission for ${user.name}`}
                      value={user.permission}
                      onChange={e => setPermission(user.id, e.target.value as UserPermission)}
                    >
                      {userPermissions.map(p => (
                        <option key={p}>{p}</option>
                      ))}
                    </Select>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="more"
                    aria-label={`More actions for ${user.name}`}
                    onClick={() => toast.info(user.name, 'Row actions ship with the next release.')}
                  >
                    <i className="fa-solid fa-ellipsis-vertical" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="user-data__footer">
        <button
          className="au-btn-load"
          type="button"
          onClick={() => toast.info('All users loaded', 'There are no more users to show.')}
        >
          Load more
        </button>
      </div>
    </MCard>
  )
}
