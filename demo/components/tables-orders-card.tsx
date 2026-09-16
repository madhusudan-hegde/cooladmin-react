'use client'

import { useState } from 'react'
import { Checkbox, MCard, Select, StatusPill, useToast } from '@madhusudan-hegde/cooladmin-react'
import { orderActions } from '@/lib/tables-data'
import type { Order } from '@/lib/tables-data'

export interface TablesOrdersCardProps {
  orders: Order[]
}

/**
 * "Orders" card from CoolAdmin's table.html: `.table-data__tool` toolbar
 * (filters, Add item, Export) above a `.table-data2` table with select-all
 * and inline `.table-data-feature` row actions.
 */
export function TablesOrdersCard({ orders }: TablesOrdersCardProps) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const toast = useToast()

  const allSelected = orders.length > 0 && orders.every(o => selected.has(o.id))
  const someSelected = orders.some(o => selected.has(o.id))

  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(orders.map(o => o.id)))
  const toggleRow = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const onExport = (format: string) => {
    if (format === 'Export') return
    toast.success(`Export started`, `Preparing your ${format} file.`)
  }

  return (
    <MCard title="Orders" subtitle="All orders, with inline actions.">
      <div className="table-data__tool">
        <div className="table-data__tool-left">
          <div className="select-wrapper">
            <Select aria-label="Filter properties" defaultValue="All properties">
              <option>All properties</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </Select>
          </div>
          <div className="select-wrapper">
            <Select aria-label="Time range" defaultValue="Today">
              <option>Today</option>
              <option>3 days</option>
              <option>1 week</option>
            </Select>
          </div>
          <button
            className="au-btn-filter"
            type="button"
            onClick={() => toast.info('Filters', 'Advanced filters ship with the next release.')}
          >
            <i className="fa-solid fa-filter" aria-hidden="true" /> Filters
          </button>
        </div>
        <div className="table-data__tool-right">
          <button
            className="au-btn au-btn--green au-btn--small"
            type="button"
            onClick={() => toast.info('Add item', 'Order creation ships with the next release.')}
          >
            <i className="fa-solid fa-plus" aria-hidden="true" /> Add item
          </button>
          <div className="select-wrapper">
            <Select aria-label="Export" value="Export" onChange={e => onExport(e.target.value)}>
              <option>Export</option>
              <option>CSV</option>
              <option>Excel</option>
            </Select>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-data2">
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
              <th>Email</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Price</th>
              <th>
                <span className="visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>
                  <Checkbox
                    aria-label={`Select order for ${order.name}`}
                    checked={selected.has(order.id)}
                    onChange={() => toggleRow(order.id)}
                  />
                </td>
                <td>{order.name}</td>
                <td>
                  <a className="block-email" href={`mailto:${order.email}`}>
                    {order.email}
                  </a>
                </td>
                <td>{order.description}</td>
                <td>{order.date}</td>
                <td>
                  <StatusPill status={order.status}>{order.statusLabel}</StatusPill>
                </td>
                <td>{order.price}</td>
                <td>
                  <div className="table-data-feature">
                    {orderActions.map(action => (
                      <button
                        key={action.id}
                        className="item"
                        type="button"
                        title={action.label}
                        aria-label={`${action.label} order for ${order.name}`}
                        onClick={() =>
                          toast.info(action.label, `${order.description} · ${order.name}`)
                        }
                      >
                        <i className={action.icon} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MCard>
  )
}
