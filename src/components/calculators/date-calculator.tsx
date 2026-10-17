'use client'

import { useState } from 'react'
import { Field, Stat, inputClass } from '@/components/tool-ui'
import { EmptyHint, ResultPanel, Segmented } from '@/components/home/tool-card'
import { formatNumber } from '@/lib/calculators'
import { calendarDifference } from '@/lib/calendar-difference'

type Mode = 'difference' | 'add'

function parseISO(value: string) {
  const [y, m, d] = value.split('-').map(Number)
  return { y, m: m - 1, d }
}

const longDate = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function DateCalculator() {
  const [mode, setMode] = useState<Mode>('difference')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [base, setBase] = useState('')
  const [amount, setAmount] = useState('30')
  const [direction, setDirection] = useState<'add' | 'subtract'>('add')

  const difference = start && end ? calendarDifference(start, end) : null
  const amountNum = Math.floor(Number(amount))
  let shifted: Date | null = null
  if (base && amount !== '' && Number.isFinite(amountNum)) {
    const b = parseISO(base)
    shifted = new Date(b.y, b.m, b.d + (direction === 'add' ? amountNum : -amountNum))
  }

  return (
    <div className="flex flex-col gap-5">
      <Segmented
        label="Date calculation type"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'difference', label: 'Difference' },
          { value: 'add', label: 'Add / Subtract' },
        ]}
      />

      {mode === 'difference' ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field id="dt-start" label="Start date">
              <input id="dt-start" type="date" value={start} onChange={(e) => setStart(e.target.value)} className={inputClass} />
            </Field>
            <Field id="dt-end" label="End date">
              <input id="dt-end" type="date" value={end} onChange={(e) => setEnd(e.target.value)} className={inputClass} />
            </Field>
          </div>
          <ResultPanel className="mt-0">
            {difference ? (
              <dl className="grid grid-cols-3 gap-3">
                <div className="col-span-3">
                  <Stat
                    label="Difference"
                    value={`${difference.years}y ${difference.months}m ${difference.days}d`}
                    highlight
                  />
                </div>
                <Stat label="Total days" value={formatNumber(difference.totalDays)} />
                <Stat label="Weeks" value={formatNumber(Math.floor(difference.totalDays / 7))} />
                <Stat label="Months" value={formatNumber(difference.years * 12 + difference.months)} />
              </dl>
            ) : (
              <EmptyHint>Pick a start and end date to see the difference.</EmptyHint>
            )}
          </ResultPanel>
        </>
      ) : (
        <>
          <Field id="dt-base" label="Start date">
            <input id="dt-base" type="date" value={base} onChange={(e) => setBase(e.target.value)} className={inputClass} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Segmented
              label="Add or subtract"
              value={direction}
              onChange={setDirection}
              options={[
                { value: 'add', label: 'Add' },
                { value: 'subtract', label: 'Subtract' },
              ]}
            />
            <div>
              <label htmlFor="dt-amount" className="sr-only">
                Number of days
              </label>
              <input
                id="dt-amount"
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                placeholder="Days"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <ResultPanel className="mt-0">
            {shifted && !Number.isNaN(shifted.getTime()) ? (
              <dl>
                <Stat
                  label={`${formatNumber(amountNum)} days ${direction === 'add' ? 'after' : 'before'}`}
                  value={longDate.format(shifted)}
                  highlight
                />
              </dl>
            ) : (
              <EmptyHint>Pick a start date and number of days.</EmptyHint>
            )}
          </ResultPanel>
        </>
      )}
    </div>
  )
}
