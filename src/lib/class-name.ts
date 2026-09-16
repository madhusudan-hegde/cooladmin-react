/**
 * Simple className utility (alternative to clsx).
 */
export type ClassValue = string | number | bigint | boolean | null | undefined

export function cn(...classes: ClassValue[]): string {
  return classes.filter(c => typeof c === 'string' && c.length > 0).join(' ')
}
