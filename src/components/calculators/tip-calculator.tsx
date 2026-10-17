'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Field, Stat, inputClass } from '@/components/tool-ui'
import { EmptyHint, ResultPanel } from '@/components/home/tool-card'
import { formatMoney } from '@/lib/calculators'
import { cn } from '@/lib/utils'

const PRESETS = [10, 15, 18, 20, 25]

const stepButton =
  'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-glass-subtle text-foreground transition-colors hover:bg-glass-hover disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export function TipCalculator() {
  const [bill, setBill] = useState('')
  const [tip, setTip] = useState('15')
  const [people, setPeople] = useState(1)

  const billValue = Number(bill)
  const tipValue = Number(tip)
  const valid = bill !== '' && billValue > 0 && tip !== '' && tipValue >= 0
  const tipAmount = (billValue * tipValue) / 100
  const total = billValue + tipAmount

  return (
    <div className="flex flex-col gap-5">
      <Field id="tip-bill" label="Bill amount">
        <input
          id="tip-bill"
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          placeholder="e.g. 1,250"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          className={inputClass}
        />
      </Field>
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-base font-semibold text-foreground">Tip percentage</legend>
        <div className="grid grid-cols-5 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={tipValue === p}
              onClick={() => setTip(String(p))}
              className={cn(
                'inline-flex items-center justify-center text-center leading-none h-11 rounded-xl border text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                tipValue === p
                  ? 'btn-glass-action'
                  : 'border-border glass text-foreground hover:bg-glass-hover',
              )}
            >
              {p}%
            </button>
          ))}
        </div>
        <label htmlFor="tip-custom" className="sr-only">
          Custom tip percentage
        </label>
        <input
          id="tip-custom"
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          placeholder="Custom %"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          className={inputClass}
        />
      </fieldset>
      <Field id="tip-people" label="Split between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={stepButton}
            onClick={() => setPeople((p) => Math.max(1, p - 1))}
            disabled={people <= 1}
            aria-label="Fewer people"
          >
            <Minus className="size-5" aria-hidden="true" />
          </button>
          <input
            id="tip-people"
            type="number"
            inputMode="numeric"
            min="1"
            max="100"
            value={people}
            onChange={(e) => setPeople(Math.min(100, Math.max(1, Math.floor(Number(e.target.value) || 1))))}
            className={cn(inputClass, 'text-center')}
          />
          <button
            type="button"
            className={stepButton}
            onClick={() => setPeople((p) => Math.min(100, p + 1))}
            aria-label="More people"
          >
            <Plus className="size-5" aria-hidden="true" />
          </button>
        </div>
      </Field>

      <ResultPanel className="mt-0">
        {valid ? (
          <dl className="grid grid-cols-2 gap-3">
            <Stat label="Tip per person" value={formatMoney(tipAmount / people)} highlight />
            <Stat label="Total per person" value={formatMoney(total / people)} highlight />
            <Stat label="Total tip" value={formatMoney(tipAmount)} />
            <Stat label="Total bill" value={formatMoney(total)} />
          </dl>
        ) : (
          <EmptyHint>Enter a bill amount to see the tip and split.</EmptyHint>
        )}
      </ResultPanel>
    </div>
  )
}
