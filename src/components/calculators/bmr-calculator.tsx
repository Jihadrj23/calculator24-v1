'use client'

import { useState } from 'react'
import { ActionRow, Field, FormError, Stat, inputClass } from '@/components/tool-ui'
import { EmptyHint, ResultPanel, Segmented, selectClass } from '@/components/home/tool-card'
import { formatNumber } from '@/lib/calculators'

const ACTIVITY = [
  { value: '1.2', label: 'Sedentary (little or no exercise)' },
  { value: '1.375', label: 'Light (1–3 days/week)' },
  { value: '1.55', label: 'Moderate (3–5 days/week)' },
  { value: '1.725', label: 'Active (6–7 days/week)' },
  { value: '1.9', label: 'Very active (hard daily training)' },
]

type BmrResult = { bmr: number; tdee: number }

export function BmrCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('1.55')
  const [result, setResult] = useState<BmrResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const a = Number(age)
    const h = Number(height)
    const w = Number(weight)
    if (!age || !height || !weight || a < 15 || a > 100 || h <= 0 || w <= 0) {
      setError('Enter an age between 15 and 100, and a height and weight above 0.')
      setResult(null)
      return
    }
    const bmr = 10 * w + 6.25 * h - 5 * a + (gender === 'male' ? 5 : -161)
    setError(null)
    setResult({ bmr, tdee: bmr * Number(activity) })
  }

  function onReset() {
    setAge('')
    setHeight('')
    setWeight('')
    setActivity('1.55')
    setResult(null)
    setError(null)
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <Segmented
          label="Gender"
          value={gender}
          onChange={setGender}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
        />
        <div className="grid grid-cols-3 gap-3">
          <Field id="bmr-age" label="Age">
            <input id="bmr-age" type="number" inputMode="numeric" min="15" max="100" placeholder="30" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} />
          </Field>
          <Field id="bmr-height" label="Height (cm)">
            <input id="bmr-height" type="number" inputMode="decimal" min="0" step="any" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} className={inputClass} />
          </Field>
          <Field id="bmr-weight" label="Weight (kg)">
            <input id="bmr-weight" type="number" inputMode="decimal" min="0" step="any" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} />
          </Field>
        </div>
        <Field id="bmr-activity" label="Activity level">
          <select id="bmr-activity" value={activity} onChange={(e) => setActivity(e.target.value)} className={selectClass}>
            {ACTIVITY.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </Field>
        <FormError message={error} />
        <ActionRow label="Calculate Calories" onReset={onReset} />
      </form>

      <ResultPanel>
        {result ? (
          <div className="flex flex-col gap-3">
            <dl className="grid grid-cols-2 gap-3">
              <Stat label="BMR (kcal/day)" value={formatNumber(Math.round(result.bmr))} highlight />
              <Stat label="Maintain weight" value={formatNumber(Math.round(result.tdee))} highlight />
              <Stat label="Mild loss (−0.25 kg/wk)" value={formatNumber(Math.round(result.tdee - 250))} />
              <Stat label="Weight loss (−0.5 kg/wk)" value={formatNumber(Math.round(result.tdee - 500))} />
            </dl>
            <p className="text-xs text-muted-foreground">
              Uses the Mifflin-St Jeor equation. Estimates only — not medical advice.
            </p>
          </div>
        ) : (
          <EmptyHint>Enter your details, then press Calculate Calories.</EmptyHint>
        )}
      </ResultPanel>
    </>
  )
}
