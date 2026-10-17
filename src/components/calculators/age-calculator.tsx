'use client'

import { useState } from 'react'
import { ActionRow, Field, FormError, PrivacyNote, ResultCard, Stat, inputClass } from '@/components/tool-ui'
import { formatNumber } from '@/lib/calculators'
import { calendarDifference } from '@/lib/calendar-difference'

function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

type AgeResult = {
  years: number
  months: number
  days: number
  totalMonths: number
  totalWeeks: number
  weekRemainderDays: number
  totalDays: number
}

function computeAge(birthISO: string, asOfISO: string): AgeResult {
  return calendarDifference(birthISO, asOfISO)
}

export function AgeCalculator() {
  const [birth, setBirth] = useState('')
  const [asOf, setAsOf] = useState(todayISO)
  const [result, setResult] = useState<AgeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!birth || !asOf) {
      setError('Please choose both dates.')
      setResult(null)
      return
    }
    if (birth > asOf) {
      setError('Date of birth must be on or before the "Age at the Date of" date.')
      setResult(null)
      return
    }
    setError(null)
    setResult(computeAge(birth, asOf))
  }

  function onReset() {
    setBirth('')
    setAsOf(todayISO())
    setResult(null)
    setError(null)
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <Field id="dob" label="Date of birth">
          <input id="dob" type="date" value={birth} max={asOf || undefined} onChange={(e) => setBirth(e.target.value)} className={inputClass} required />
        </Field>
        <Field id="as-of" label="Age at the Date of">
          <input id="as-of" type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} className={inputClass} required />
        </Field>
        <FormError message={error} />
        <ActionRow label="Calculate Age" onReset={onReset} />
      </form>
      <PrivacyNote />

      <ResultCard hasResult={result !== null} emptyText="Pick your date of birth and press Calculate Age to see your exact age.">
        {result && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-primary/30 glass p-5">
              <p className="text-xs font-medium text-muted-foreground">Your age</p>
              <p className="age-result-row mt-2 grid grid-cols-[auto_auto_auto] items-baseline gap-1 text-foreground">
                {[
                  { value: result.years, unit: result.years === 1 ? 'year' : 'years' },
                  { value: result.months, unit: result.months === 1 ? 'month' : 'months' },
                  { value: result.days, unit: result.days === 1 ? 'day' : 'days' },
                ].map((part) => (
                  <span key={part.unit} className="flex min-w-0 items-baseline justify-center gap-1 whitespace-nowrap">
                    <span className="age-result-number text-xl font-bold tabular-nums sm:text-4xl">{part.value}</span>
                    <span className="age-result-unit text-xs font-medium text-muted-foreground sm:text-sm">{part.unit}</span>
                  </span>
                ))}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              <Stat label="Total months" value={formatNumber(result.totalMonths)} />
              <Stat
                label="Total weeks"
                value={
                  <>
                    {formatNumber(result.totalWeeks)}
                    {result.weekRemainderDays > 0 && (
                      <span className="text-sm font-medium text-muted-foreground"> + {result.weekRemainderDays}d</span>
                    )}
                  </>
                }
              />
              <Stat label="Total days" value={formatNumber(result.totalDays)} />
              <Stat label="Total hours" value={formatNumber(result.totalDays * 24)} />
              <Stat label="Total minutes" value={formatNumber(result.totalDays * 1440)} />
              <Stat label="Total seconds" value={formatNumber(result.totalDays * 86_400)} />
            </dl>
          </div>
        )}
      </ResultCard>
    </>
  )
}
