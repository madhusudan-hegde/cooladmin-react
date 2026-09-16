import type { BadgeVariant, RankListItem, StatusPillStatus } from '@cooladmin/react'

/**
 * Sample data for the /tables page, lifted verbatim from CoolAdmin's
 * `table.html`. Plain module — no `'use client'`.
 */

/* ------------------------------------------------------------------ */
/* Recent earnings (`.table-earning`)                                  */
/* ------------------------------------------------------------------ */

export interface Earning {
  id: string
  date: string
  order: string
  name: string
  price: string
  qty: string
  total: string
  customer: string
  status: { variant: BadgeVariant; label: string }
}

export const earnings: Earning[] = [
  {
    id: 'e1',
    date: 'Jan 15, 14:32',
    order: '#100398',
    name: 'iPhone 17 128GB Titanium',
    price: '$999.00',
    qty: '1',
    total: '$999.00',
    customer: 'John Smith',
    status: { variant: 'success', label: 'Completed' },
  },
  {
    id: 'e2',
    date: 'Jan 15, 14:32',
    order: '#100397',
    name: 'Samsung Galaxy S25 Ultra',
    price: '$756.00',
    qty: '1',
    total: '$756.00',
    customer: 'Jane Doe',
    status: { variant: 'warning', label: 'Processing' },
  },
  {
    id: 'e3',
    date: 'Jan 15, 14:32',
    order: '#100396',
    name: 'Game Console Controller',
    price: '$22.00',
    qty: '2',
    total: '$44.00',
    customer: 'Mike Johnson',
    status: { variant: 'success', label: 'Completed' },
  },
  {
    id: 'e4',
    date: 'Jan 15, 14:32',
    order: '#100395',
    name: 'iPhone 17 Pro Max 1TB',
    price: '$1,199.00',
    qty: '1',
    total: '$1,199.00',
    customer: 'Sarah Wilson',
    status: { variant: 'danger', label: 'Cancelled' },
  },
  {
    id: 'e5',
    date: 'Jan 15, 14:32',
    order: '#100393',
    name: 'USB-C Thunderbolt 5 Cable',
    price: '$10.00',
    qty: '3',
    total: '$30.00',
    customer: 'David Chen',
    status: { variant: 'success', label: 'Completed' },
  },
  {
    id: 'e6',
    date: 'Jan 15, 14:32',
    order: '#100392',
    name: 'Smartwatch 4.0 LTE',
    price: '$199.00',
    qty: '6',
    total: '$1,194.00',
    customer: 'Emily Rodriguez',
    status: { variant: 'info', label: 'Shipped' },
  },
  {
    id: 'e7',
    date: 'Jan 15, 14:32',
    order: '#100391',
    name: 'Camera C430W 4k',
    price: '$699.00',
    qty: '1',
    total: '$699.00',
    customer: 'Robert Taylor',
    status: { variant: 'warning', label: 'Processing' },
  },
  {
    id: 'e8',
    date: 'Jan 14, 16:22',
    order: '#100390',
    name: 'Wireless Earbuds Pro Max',
    price: '$249.00',
    qty: '2',
    total: '$498.00',
    customer: 'Lisa Anderson',
    status: { variant: 'success', label: 'Completed' },
  },
]

/* ------------------------------------------------------------------ */
/* Top countries (`.table-top-countries`)                               */
/* ------------------------------------------------------------------ */

export interface CountryRevenue {
  country: string
  revenue: string
}

export const topCountries: CountryRevenue[] = [
  { country: 'United States', revenue: '$119,366.96' },
  { country: 'Australia', revenue: '$70,261.65' },
  { country: 'United Kingdom', revenue: '$46,399.22' },
  { country: 'Turkey', revenue: '$35,364.90' },
  { country: 'Germany', revenue: '$20,366.96' },
  { country: 'France', revenue: '$10,366.96' },
  { country: 'Italy', revenue: '$1,639.32' },
]

/* ------------------------------------------------------------------ */
/* Users (`.user-data`)                                                 */
/* ------------------------------------------------------------------ */

export type UserRole = 'admin' | 'user' | 'member'
export type UserPermission = 'Full control' | 'Post' | 'Watch'

export const userPermissions: UserPermission[] = ['Full control', 'Post', 'Watch']

export interface TableUser {
  id: string
  name: string
  email: string
  role: UserRole
  roleLabel: string
  permission: UserPermission
  selected: boolean
}

export const tableUsers: TableUser[] = [
  {
    id: 'u1',
    name: 'Lori Lynch',
    email: 'lori@example.com',
    role: 'admin',
    roleLabel: 'Admin',
    permission: 'Full control',
    selected: false,
  },
  {
    id: 'u2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    roleLabel: 'User',
    permission: 'Post',
    selected: true,
  },
  {
    id: 'u3',
    name: 'Diane Myers',
    email: 'diane@example.com',
    role: 'user',
    roleLabel: 'User',
    permission: 'Post',
    selected: false,
  },
  {
    id: 'u4',
    name: 'Cynthia Harvey',
    email: 'cynthia@example.com',
    role: 'member',
    roleLabel: 'Member',
    permission: 'Full control',
    selected: false,
  },
]

/* ------------------------------------------------------------------ */
/* Top campaigns (`.rank-list`)                                         */
/* ------------------------------------------------------------------ */

export const topCampaigns: RankListItem[] = [
  { title: 'Q1 product launch — paid', value: '$74,310', percent: 100 },
  { title: 'Black Friday early access', value: '$58,920', percent: 79 },
  { title: 'Spring sale — apparel', value: '$42,165', percent: 57 },
  { title: 'Reactivation email flow', value: '$36,400', percent: 49 },
  { title: 'Affiliate partner push', value: '$24,850', percent: 33 },
  { title: 'May newsletter digest', value: '$18,720', percent: 25 },
  { title: 'Influencer takeover — IG', value: '$14,330', percent: 19 },
  { title: 'Bundle promo — accessories', value: '$9,580', percent: 13 },
]

/* ------------------------------------------------------------------ */
/* Orders (`.table-data2`)                                              */
/* ------------------------------------------------------------------ */

export interface Order {
  id: string
  name: string
  email: string
  description: string
  date: string
  status: StatusPillStatus
  statusLabel: string
  price: string
}

export const orders: Order[] = [
  {
    id: 'o1',
    name: 'Lori Lynch',
    email: 'lori@example.com',
    description: 'Samsung Galaxy S25 Ultra',
    date: 'Jan 15, 14:32',
    status: 'process',
    statusLabel: 'Processed',
    price: '$679.00',
  },
  {
    id: 'o2',
    name: 'John Smith',
    email: 'john@example.com',
    description: 'iPhone 17 128GB Titanium',
    date: 'Jan 15, 14:32',
    status: 'process',
    statusLabel: 'Processed',
    price: '$999.00',
  },
  {
    id: 'o3',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    description: 'iPhone 17 Pro Max 1TB',
    date: 'Jan 15, 14:32',
    status: 'denied',
    statusLabel: 'Denied',
    price: '$1,199.00',
  },
  {
    id: 'o4',
    name: 'Robert Taylor',
    email: 'robert@example.com',
    description: 'Camera C430W 4k',
    date: 'Jan 15, 14:32',
    status: 'process',
    statusLabel: 'Processed',
    price: '$699.00',
  },
]

/** Inline row actions (`.table-data-feature .item`). */
export const orderActions: { id: string; label: string; icon: string }[] = [
  { id: 'send', label: 'Send', icon: 'fa-solid fa-paper-plane' },
  { id: 'edit', label: 'Edit', icon: 'fa-solid fa-pen-to-square' },
  { id: 'delete', label: 'Delete', icon: 'fa-solid fa-trash' },
  { id: 'more', label: 'More', icon: 'fa-solid fa-ellipsis-vertical' },
]

/* ------------------------------------------------------------------ */
/* Sales by category (`.table-data3`)                                   */
/* ------------------------------------------------------------------ */

export interface Sale {
  id: string
  date: string
  category: string
  description: string
  status: StatusPillStatus
  statusLabel: string
  price: string
}

export const sales: Sale[] = [
  {
    id: 's1',
    date: 'Jan 15, 14:32',
    category: 'Mobile',
    description: 'iPhone 17 128GB Titanium',
    status: 'process',
    statusLabel: 'Processed',
    price: '$999.00',
  },
  {
    id: 's2',
    date: 'Jan 15, 14:32',
    category: 'Mobile',
    description: 'Samsung Galaxy S25 Ultra',
    status: 'process',
    statusLabel: 'Processed',
    price: '$756.00',
  },
  {
    id: 's3',
    date: 'Jan 15, 14:32',
    category: 'Game',
    description: 'Game Console Controller',
    status: 'denied',
    statusLabel: 'Denied',
    price: '$22.00',
  },
  {
    id: 's4',
    date: 'Jan 15, 14:32',
    category: 'Mobile',
    description: 'iPhone 17 Pro Max 1TB',
    status: 'denied',
    statusLabel: 'Denied',
    price: '$1,199.00',
  },
  {
    id: 's5',
    date: 'Jan 15, 14:32',
    category: 'Accessories',
    description: 'USB-C Thunderbolt 5 Cable',
    status: 'process',
    statusLabel: 'Processed',
    price: '$10.00',
  },
  {
    id: 's6',
    date: 'Jan 15, 14:32',
    category: 'Wearables',
    description: 'Smartwatch 4.0 LTE',
    status: 'denied',
    statusLabel: 'Denied',
    price: '$199.00',
  },
  {
    id: 's7',
    date: 'Jan 15, 14:32',
    category: 'Camera',
    description: 'Camera C430W 4k',
    status: 'process',
    statusLabel: 'Processed',
    price: '$699.00',
  },
  {
    id: 's8',
    date: 'Jan 15, 14:32',
    category: 'Computers',
    description: 'MacBook Pro M5',
    status: 'process',
    statusLabel: 'Processed',
    price: '$1,799.00',
  },
]
