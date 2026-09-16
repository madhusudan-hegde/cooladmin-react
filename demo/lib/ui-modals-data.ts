import type { AccentSlot } from '@cooladmin/react'

/** Sample data for CoolAdmin's modal.html + modal.post.html (the /ui/modals page). */

export type ModernModalId = 'basic' | 'confirm' | 'form' | 'large' | 'scroll' | 'image'

export interface ModalLauncher<Id extends string> {
  id: Id
  label: string
  variant: 'primary' | 'ghost'
}

/** "Modal patterns" launcher row (modal.html). */
export const modernLaunchers: ModalLauncher<ModernModalId>[] = [
  { id: 'basic', label: 'Basic dialog', variant: 'primary' },
  { id: 'confirm', label: 'Confirm delete', variant: 'ghost' },
  { id: 'form', label: 'Form modal', variant: 'ghost' },
  { id: 'large', label: 'Large modal', variant: 'ghost' },
  { id: 'scroll', label: 'Scrollable', variant: 'ghost' },
  { id: 'image', label: 'Image preview', variant: 'ghost' },
]

export interface ReportStat {
  id: string
  label: string
  value: string
  icon: string
  color: AccentSlot
}

/** KPI tiles inside the "Detailed report" large modal. */
export const reportStats: ReportStat[] = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: '$48,217',
    icon: 'fa-solid fa-dollar-sign',
    color: 'c1',
  },
  { id: 'orders', label: 'Orders', value: '1,284', icon: 'fa-solid fa-cart-shopping', color: 'c2' },
  { id: 'users', label: 'Users', value: '8,492', icon: 'fa-solid fa-users', color: 'c3' },
]

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

/** The ten "Section N." paragraphs of the Terms & conditions scrollable modal. */
export const termsSections: string[] = Array.from(
  { length: 10 },
  (_, i) => `Section ${i + 1}. ${LOREM}`
)

export const inviteRoles = ['Member', 'Admin', 'Owner'] as const

export type LegacyModalId = 'small' | 'medium' | 'large' | 'scroll' | 'static'

/** modal.post.html dialogs — CoolAdmin ships them without triggers; the demo adds launchers. */
export const legacyLaunchers: ModalLauncher<LegacyModalId>[] = [
  { id: 'small', label: 'Small Modal', variant: 'ghost' },
  { id: 'medium', label: 'Medium Modal', variant: 'ghost' },
  { id: 'large', label: 'Large Modal', variant: 'ghost' },
  { id: 'scroll', label: 'Scrolling Long Content Modal', variant: 'ghost' },
  { id: 'static', label: 'Static Modal', variant: 'ghost' },
]

export const zebraText =
  "There are three species of zebras: the plains zebra, the mountain zebra and the Grévy's zebra. The plains zebra and the mountain zebra belong to the subgenus Hippotigris, but Grévy's zebra is the sole species of subgenus Dolichohippus. The latter resembles an ass, to which it is closely related, while the former two are more horse-like. All three belong to the genus Equus, along with other living equids."

const SCROLL_LINES = [
  'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
  'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
  'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.',
]

/** The `<br>`-separated lines of the "Scrolling Long Content Modal" (3 sentences × 6 repeats). */
export const scrollingLines: string[] = Array.from({ length: 6 }, () => SCROLL_LINES).flat()
