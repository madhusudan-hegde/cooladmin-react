// Type exports
export type * from './types/menu'
export type * from './types/theme'
export type * from './types/layout'

// Context exports
export {
  SidebarProvider,
  useSidebar,
  SIDEBAR_BREAKPOINT,
  SIDEBAR_STORAGE_KEY,
} from './context/sidebar-context'
export type { SidebarContextValue, SidebarProviderProps } from './context/sidebar-context'
export {
  ColorModeProvider,
  useColorMode,
  COLOR_MODE_STORAGE_KEY,
} from './context/color-mode-context'
export type { ColorModeContextValue, ColorModeProviderProps } from './context/color-mode-context'
export { AccentProvider, useAccent, ACCENT_STORAGE_KEY } from './context/accent-context'
export type { AccentContextValue, AccentProviderProps } from './context/accent-context'
export { ToastProvider, useToast } from './context/toast-context'
export type { ToastContextValue, ToastProviderProps, ToastHandle } from './context/toast-context'
export {
  CommandPaletteProvider,
  useCommandPalette,
  useOptionalCommandPalette,
} from './context/command-palette-context'
export type {
  CommandPaletteContextValue,
  CommandPaletteProviderProps,
} from './context/command-palette-context'
export { LinkProvider, useLinkComponent, DefaultLink } from './context/link-context'
export {
  NavigationProvider,
  useNavigation,
  usePathname,
  useNavigate,
  useBrowserPathname,
  browserNavigate,
} from './context/navigation-context'
export type {
  NavigationAdapter,
  NavigateOptions,
  NavigationProviderProps,
} from './context/navigation-context'
export type { LinkProviderProps } from './context/link-context'
export { BodyClassSync } from './context/body-class-sync'
export type { BodyClassSyncProps } from './context/body-class-sync'

// Layout exports
export { DashboardLayout } from './layout/dashboard-layout'
export type { DashboardLayoutProps } from './layout/dashboard-layout'
export { AuthLayout } from './layout/auth-layout'
export type { AuthLayoutProps } from './layout/auth-layout'
export { ErrorLayout } from './layout/error-layout'
export type { ErrorLayoutProps } from './layout/error-layout'
export { AppContent } from './layout/app-content'
export type { AppContentProps } from './layout/app-content'
export { PageHeader } from './layout/page-header'
export type { PageHeaderProps } from './layout/page-header'
export { Sidebar } from './layout/sidebar'
export type { SidebarProps } from './layout/sidebar'
export { SidebarBrand } from './layout/sidebar-brand'
export type { SidebarBrandProps } from './layout/sidebar-brand'
export { SidebarNav } from './layout/sidebar-nav'
export type { SidebarNavProps } from './layout/sidebar-nav'
export { SidebarNavItem, isPathActive } from './layout/sidebar-nav-item'
export type { SidebarNavItemProps } from './layout/sidebar-nav-item'
export { SidebarOverlay } from './layout/sidebar-overlay'
export { Topbar } from './layout/topbar'
export type { TopbarProps } from './layout/topbar'
export { TopbarSearch } from './layout/topbar-search'
export type { TopbarSearchProps } from './layout/topbar-search'
export { TopbarMenu } from './layout/topbar-menu'
export type { TopbarMenuProps, TopbarMenuItem, TopbarMenuVariant } from './layout/topbar-menu'
export { AccountMenu } from './layout/account-menu'
export type { AccountMenuProps, AccountMenuLink } from './layout/account-menu'
export { Footer } from './layout/footer'
export type { FooterProps } from './layout/footer'
export { SkipLink } from './layout/skip-link'
export type { SkipLinkProps } from './layout/skip-link'

// Widget exports
export { MCard } from './widget/m-card'
export type { MCardProps } from './widget/m-card'
export { StatCard } from './widget/stat-card'
export type { StatCardProps } from './widget/stat-card'
export { Sparkline } from './widget/sparkline'
export type { SparklineProps } from './widget/sparkline'
export { Chart } from './widget/chart'
export type { ChartProps } from './widget/chart'
export { RankList } from './widget/rank-list'
export type { RankListProps, RankListItem } from './widget/rank-list'
export { StatusPill } from './widget/status-pill'
export type { StatusPillProps, StatusPillStatus } from './widget/status-pill'
export { PriorityChip } from './widget/priority-chip'
export type { PriorityChipProps, PriorityLevel } from './widget/priority-chip'
export { Avatar, AvatarGroup } from './widget/avatar'
export type { AvatarProps, AvatarGroupProps, AvatarSize } from './widget/avatar'
export { EmptyState } from './widget/empty-state'
export type { EmptyStateProps } from './widget/empty-state'
export { Skeleton } from './widget/skeleton'
export type { SkeletonProps } from './widget/skeleton'
export { ToastContainer, ToastItem, TOAST_ICONS } from './widget/toast'
export type { ToastContainerProps, ToastItemProps, ToastRecord } from './widget/toast'
export { CommandPalette } from './widget/command-palette'
export type { CommandPaletteProps } from './widget/command-palette'
export { ThemeSwitcher } from './widget/theme-switcher'
export type { ThemeSwitcherProps } from './widget/theme-switcher'
export { SectionEyebrow } from './widget/section-eyebrow'
export type { SectionEyebrowProps } from './widget/section-eyebrow'
export { ActivityList } from './widget/activity-list'
export type { ActivityListProps, ActivityListItem } from './widget/activity-list'
export { TaskList } from './widget/task-list'
export type { TaskListProps, TaskListItem } from './widget/task-list'
export { ProgressBar } from './widget/progress-bar'
export type { ProgressBarProps } from './widget/progress-bar'

// Form exports
export { MButton } from './form/m-button'
export type { MButtonProps, MButtonVariant, MButtonSize } from './form/m-button'
export { IconButton } from './form/icon-button'
export type { IconButtonProps } from './form/icon-button'
export { Input } from './form/input'
export type { InputProps } from './form/input'
export { Select } from './form/select'
export type { SelectProps, SelectOption } from './form/select'
export { Switch } from './form/switch'
export type { SwitchProps } from './form/switch'
export { Checkbox } from './form/checkbox'
export type { CheckboxProps } from './form/checkbox'
export { DateChip } from './form/date-chip'
export type { DateChipProps } from './form/date-chip'

// Hook exports
export { useMediaQuery } from './hooks/use-media-query'
export { useLocalStorage } from './hooks/use-local-storage'
export { useKeyboardShortcut } from './hooks/use-keyboard-shortcut'
export type { KeyboardShortcutOptions } from './hooks/use-keyboard-shortcut'
export { useBodyClass } from './hooks/use-body-class'
export { useIsomorphicLayoutEffect } from './hooks/use-isomorphic-layout-effect'
export { useClickOutside } from './hooks/use-click-outside'

// Lib exports
export { cn } from './lib/class-name'
export { flattenMenuToCommands } from './lib/flatten-menu'
export { storage, STORAGE_EVENT } from './lib/storage'
export { getBodyClassName } from './lib/body-class'
export type { BodyClassOptions } from './lib/body-class'
export { ACCENT_PRESETS, DEFAULT_ACCENT, isAccentPreset } from './lib/accent-presets'
export { loadChart } from './lib/chart-loader'
export {
  CHART_FONT,
  modernTooltip,
  lightTooltip,
  sparklineOptions,
  kpiSparklineConfig,
  applyChartDefaults,
} from './lib/chart-theme'
export type { TooltipStyle, SparklineOptionsInput, KpiSparklineInput } from './lib/chart-theme'
export { readToken, resolveColor, resolveTokens, parseColor, withAlpha } from './lib/color'

// ---- Phase 2 components (widgets / forms / hooks) ----
export { Alert } from './widget/alert'
export type { AlertProps, AlertVariant } from './widget/alert'
export { Badge } from './widget/badge'
export type { BadgeProps, BadgeVariant } from './widget/badge'
export { Tabs } from './widget/tabs'
export type { TabsProps, TabItem, TabsVariant } from './widget/tabs'
export { Modal } from './widget/modal'
export type { ModalProps, ModalSize } from './widget/modal'
export { Pagination } from './widget/pagination'
export type { PaginationProps } from './widget/pagination'
export { DataTable } from './widget/data-table'
export type { DataTableProps, DataTableColumn, DataTableSort } from './widget/data-table'
export { Wizard } from './widget/wizard'
export type { WizardProps, WizardStep } from './widget/wizard'
export { Textarea } from './form/textarea'
export type { TextareaProps } from './form/textarea'
export { Radio } from './form/radio'
export type { RadioProps } from './form/radio'
export { useDisclosure } from './hooks/use-disclosure'
export type { UseDisclosureReturn } from './hooks/use-disclosure'
