'use client'

import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Field, Stat, inputClass } from '@/components/tool-ui'
import { EmptyHint, ResultPanel, selectClass } from '@/components/home/tool-card'
import { CURRENCIES, type RatesData } from '@/lib/rates'

const amountFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
const rateFormatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 6 })

export function CurrencyConverter({ data }: { data: RatesData }) {
  const [amount, setAmount] = useState('100')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('BDT')

  const value = Number(amount)
  const rate = data.rates[to] / data.rates[from]
  const valid = amount !== '' && Number.isFinite(value) && value >= 0

  return (
    <div className="flex flex-col gap-5">
      <Field id="cc-amount" label="Amount">
        <input
          id="cc-amount"
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          placeholder="e.g. 100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={inputClass}
        />
      </Field>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <Field id="cc-from" label="From" className="flex-1">
          <select id="cc-from" value={from} onChange={(e) => setFrom(e.target.value)} className={selectClass}>
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </Field>
        <button
          type="button"
          onClick={() => {
            setFrom(to)
            setTo(from)
          }}
          aria-label="Swap currencies"
          className="flex h-14 w-full shrink-0 items-center justify-center rounded-xl border border-border bg-glass-subtle text-foreground transition-colors hover:bg-glass-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-14"
        >
          <ArrowUpDown className="size-5 sm:rotate-90" aria-hidden="true" />
        </button>
        <Field id="cc-to" label="To" className="flex-1">
          <select id="cc-to" value={to} onChange={(e) => setTo(e.target.value)} className={selectClass}>
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <ResultPanel className="mt-0">
        {valid ? (
          <div className="flex flex-col gap-3">
            <dl>
              <Stat
                label={`${amountFormatter.format(value)} ${from} equals`}
                value={`${amountFormatter.format(value * rate)} ${to}`}
                highlight
              />
            </dl>
            <p className="text-sm text-muted-foreground tabular-nums">
              1 {from} = {rateFormatter.format(rate)} {to}
            </p>
            <p className="text-xs text-muted-foreground">
              {data.updatedAt
                ? `Rates updated ${new Date(data.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}. Indicative only — bank rates may differ.`
                : 'Showing approximate reference rates. Bank and market rates may differ.'}
            </p>
          </div>
        ) : (
          <EmptyHint>Enter an amount to convert.</EmptyHint>
        )}
      </ResultPanel>
    </div>
  )
}
