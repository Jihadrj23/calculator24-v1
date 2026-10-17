import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export const selectClass =
  'h-14 w-full appearance-none rounded-xl border border-border glass bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-11 pl-4 text-base text-foreground transition-shadow focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 sm:text-lg'

export function ToolCard({
  id,
  icon: Icon,
  title,
  description,
  children,
}: {
  id: string
  icon: LucideIcon
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-6 rounded-2xl border border-border glass p-5 sm:p-6"
    >
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 id={`${id}-title`} className="text-lg leading-tight font-bold tracking-tight text-foreground sm:text-xl">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-1 rounded-xl border border-border bg-glass-subtle p-1">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center justify-center text-center leading-none h-10 flex-1 rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
              active ? 'btn-glass-action' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export function ResultPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div aria-live="polite" className={cn('mt-5 rounded-2xl border border-border bg-glass-subtle p-4 sm:p-5', className)}>
      {children}
    </div>
  )
}

export function EmptyHint({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}
