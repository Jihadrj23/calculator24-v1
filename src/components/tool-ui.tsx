import { Link } from '@/components/app-link'
import { ArrowRight, CircleCheck, RotateCcw, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CalculatorGuide } from '@/components/calculator-guide'

export const inputClass =
  'h-14 w-full rounded-xl border border-border glass px-4 text-base text-foreground placeholder:text-muted-foreground transition-shadow focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 sm:text-lg'

export function ToolPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-1">
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-2xl">
        <ol className="grid grid-cols-[auto_auto_minmax(0,1fr)] items-start gap-1.5 text-xs leading-4 text-muted-foreground">
          <li className="shrink-0">
            <Link href="/" className="transition-colors hover:text-primary">
              home
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted-foreground/50">
            /
          </li>
          <li aria-current="page" className="min-w-0 break-words font-medium text-foreground">
            {title}
          </li>
        </ol>
      </nav>
      <h1 className="mx-auto mt-3 mb-5 w-full max-w-2xl break-words text-2xl leading-tight font-bold text-foreground sm:text-3xl">
        {title}
      </h1>
      <div className="mx-auto max-w-2xl rounded-3xl border border-glass-border glass p-4 sm:p-6">
        {children}
      </div>
      <CalculatorGuide title={title} />
    </div>
  )
}

export function Field({
  id,
  label,
  children,
  className,
}: {
  id: string
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-base font-semibold text-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}

export function ActionRow({ label, onReset }: { label: string; onReset: () => void }) {
  return (
    <div className="flex gap-3">
      <button
        type="submit"
        className="flex h-14 flex-1 items-center justify-center gap-3 rounded-xl px-4 text-lg font-bold btn-glass-action transition-[filter,box-shadow,transform] duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {label}
        <ArrowRight className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onReset}
        aria-label="Reset"
        className="flex h-14 w-16 shrink-0 items-center justify-center rounded-xl border border-border glass text-muted-foreground shadow-sm shadow-glow transition-colors duration-200 hover:border-primary/25 hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <RotateCcw className="size-5" aria-hidden="true" />
      </button>
    </div>
  )
}

export function PrivacyNote() {
  return (
    <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
      <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
      Your calculations stay on your device.
    </p>
  )
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/15 px-3 py-2 text-sm font-medium text-destructive">
      {message}
    </p>
  )
}

export function ResultCard({
  hasResult,
  emptyText,
  children,
}: {
  hasResult: boolean
  emptyText: string
  children?: React.ReactNode
}) {
  return (
    <section
      aria-live="polite"
      aria-label="Your result"
      className="mt-6 rounded-2xl border border-glass-border bg-glass-subtle p-4 sm:p-5"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Your result</h2>
        <span
          className={cn(
            'flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold tracking-[0.15em] uppercase',
            hasResult ? 'text-success' : 'text-muted-foreground',
          )}
        >
          <CircleCheck className="size-4" aria-hidden="true" />
          {hasResult ? 'Calculated' : 'Ready when you are'}
        </span>
      </div>
      {hasResult ? <div className="mt-5">{children}</div> : <p className="mt-4 text-sm text-muted-foreground">{emptyText}</p>}
    </section>
  )
}

export function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-xl border glass p-4 shadow-sm shadow-glow',
        highlight ? 'border-primary/25 ring-1 ring-primary/10' : 'border-border',
      )}
    >
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          'mt-1 overflow-x-auto whitespace-nowrap font-bold tabular-nums',
          highlight ? 'text-3xl text-primary' : 'text-lg text-foreground',
        )}
      >
        {value}
      </dd>
    </div>
  )
}
