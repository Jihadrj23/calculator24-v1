'use client'

import { useState } from 'react'
import { ActionRow, Field, FormError, ResultCard, inputClass } from '@/components/tool-ui'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { name: 'Underweight', range: '< 18.5', min: 0, bar: 'bg-info', text: 'text-info', bg: 'bg-info/15' },
  { name: 'Healthy', range: '18.5–24.9', min: 18.5, bar: 'bg-success', text: 'text-success', bg: 'bg-success/15' },
  { name: 'Overweight', range: '25–29.9', min: 25, bar: 'bg-warning', text: 'text-warning', bg: 'bg-warning/15' },
  { name: 'Obese', range: '30+', min: 30, bar: 'bg-destructive', text: 'text-destructive', bg: 'bg-destructive/15' },
]

const SCALE_MIN = 12
const SCALE_MAX = 40

function categoryIndex(bmi: number) {
  if (bmi >= 30) return 3
  if (bmi >= 25) return 2
  if (bmi >= 18.5) return 1
  return 0
}

export function BmiCalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const w = Number(weight)
    const h = Number(height) / 100
    if (!weight || !height || w <= 0 || h <= 0) {
      setError('Enter a weight and height greater than 0.')
      setBmi(null)
      return
    }
    setError(null)
    setBmi(w / (h * h))
  }

  function onReset() {
    setWeight('')
    setHeight('')
    setBmi(null)
    setError(null)
  }

  const idx = bmi !== null ? categoryIndex(bmi) : 0
  const category = CATEGORIES[idx]
  const markerPercent =
    bmi !== null ? Math.min(100, Math.max(0, ((bmi - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100)) : 0

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <Field id="weight" label="Weight (kg)">
          <input id="weight" type="number" inputMode="decimal" min="0" step="any" placeholder="e.g. 70" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} />
        </Field>
        <Field id="height" label="Height (cm)">
          <input id="height" type="number" inputMode="decimal" min="0" step="any" placeholder="e.g. 175" value={height} onChange={(e) => setHeight(e.target.value)} className={inputClass} />
        </Field>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Adult BMI: underweight below 18.5; healthy weight 18.5–24.9; overweight 25–29.9; obesity 30 or above. Not a
          medical diagnosis.
        </p>
        <FormError message={error} />
        <ActionRow label="Calculate BMI" onReset={onReset} />
      </form>

      <ResultCard hasResult={bmi !== null} emptyText="Enter your weight and height, then press Calculate BMI.">
        {bmi !== null && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-primary/30 glass p-5">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Your BMI</p>
                <p className="mt-1 text-5xl font-bold tracking-tight text-foreground tabular-nums">{bmi.toFixed(1)}</p>
              </div>
              <span className={cn('rounded-lg px-3 py-1.5 text-base font-bold', category.bg, category.text)}>
                {category.name}
              </span>
            </div>

            <div>
              <div className="relative">
                <div className="flex h-3 gap-1 overflow-hidden rounded-full" aria-hidden="true">
                  <div className={cn('rounded-l-full', CATEGORIES[0].bar)} style={{ flex: 18.5 - SCALE_MIN }} />
                  <div className={CATEGORIES[1].bar} style={{ flex: 6.5 }} />
                  <div className={CATEGORIES[2].bar} style={{ flex: 5 }} />
                  <div className={cn('rounded-r-full', CATEGORIES[3].bar)} style={{ flex: SCALE_MAX - 30 }} />
                </div>
                <div
                  className="absolute -top-1.5 size-6 -translate-x-1/2 rounded-full border-4 border-glass-border glass-nav shadow-md"
                  style={{ left: `${markerPercent}%` }}
                  aria-hidden="true"
                />
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CATEGORIES.map((c, i) => (
                  <li
                    key={c.name}
                    aria-current={i === idx ? 'true' : undefined}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-xs',
                      i === idx ? cn('border-transparent font-semibold', c.bg, c.text) : 'border-border glass text-muted-foreground',
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className={cn('size-2 rounded-full', c.bar)} aria-hidden="true" />
                      {c.name}
                    </span>
                    <span className="mt-0.5 block tabular-nums">{c.range}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </ResultCard>
    </>
  )
}
