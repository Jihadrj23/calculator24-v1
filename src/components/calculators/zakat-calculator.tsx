'use client'

import { useState } from 'react'
import { ActionRow, Field, FormError, Stat, inputClass } from '@/components/tool-ui'
import { EmptyHint, ResultPanel } from '@/components/home/tool-card'
import { formatMoney } from '@/lib/calculators'

const FIELDS = [
  { key: 'cash', label: 'Cash in hand & bank', placeholder: 'e.g. 50,000' },
  { key: 'gold', label: 'Value of gold', placeholder: 'e.g. 120,000' },
  { key: 'silver', label: 'Value of silver', placeholder: 'e.g. 10,000' },
  { key: 'assets', label: 'Investments & business assets', placeholder: 'e.g. 30,000' },
  { key: 'liabilities', label: 'Debts & liabilities due', placeholder: 'e.g. 15,000' },
] as const

type Key = (typeof FIELDS)[number]['key']
type ZakatResult = { total: number; net: number; zakat: number; eligible: boolean; nisab: number }

const EMPTY: Record<Key, string> = { cash: '', gold: '', silver: '', assets: '', liabilities: '' }

export function ZakatCalculator() {
  const [values, setValues] = useState(EMPTY)
  const [nisab, setNisab] = useState('')
  const [result, setResult] = useState<ZakatResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const n = (s: string) => (s === '' ? 0 : Number(s))
    const nums = FIELDS.map((f) => n(values[f.key]))
    const nisabValue = n(nisab)
    if ([...nums, nisabValue].some((v) => !Number.isFinite(v) || v < 0)) {
      setError('Values cannot be negative.')
      setResult(null)
      return
    }
    const total = n(values.cash) + n(values.gold) + n(values.silver) + n(values.assets)
    if (total <= 0) {
      setError('Enter at least one asset value above 0.')
      setResult(null)
      return
    }
    const net = Math.max(0, total - n(values.liabilities))
    const eligible = net > 0 && net >= nisabValue
    setError(null)
    setResult({ total, net, nisab: nisabValue, eligible, zakat: eligible ? net * 0.025 : 0 })
  }

  function onReset() {
    setValues(EMPTY)
    setNisab('')
    setResult(null)
    setError(null)
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <Field key={f.key} id={`zk-${f.key}`} label={f.label}>
              <input
                id={`zk-${f.key}`}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder={f.placeholder}
                value={values[f.key]}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                className={inputClass}
              />
            </Field>
          ))}
          <Field id="zk-nisab" label="Nisab threshold (optional)">
            <input
              id="zk-nisab"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="Value of 85g gold"
              value={nisab}
              onChange={(e) => setNisab(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Nisab is the current value of 85g of gold or 595g of silver in your currency. Zakat is due at 2.5% on net
          wealth held for one lunar year above nisab.
        </p>
        <FormError message={error} />
        <ActionRow label="Calculate Zakat" onReset={onReset} />
      </form>

      <ResultPanel>
        {result ? (
          <div className="flex flex-col gap-3">
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <Stat label="Zakat payable (2.5%)" value={formatMoney(result.zakat)} highlight />
              </div>
              <Stat label="Total assets" value={formatMoney(result.total)} />
              <Stat label="Net zakatable wealth" value={formatMoney(result.net)} />
              <Stat label="Nisab used" value={result.nisab ? formatMoney(result.nisab) : 'Not set'} />
            </dl>
            {!result.eligible && (
              <p className="text-sm text-muted-foreground">Your net wealth is below the nisab threshold, so no Zakat is due.</p>
            )}
          </div>
        ) : (
          <EmptyHint>Enter your assets and liabilities, then press Calculate Zakat.</EmptyHint>
        )}
      </ResultPanel>
    </>
  )
}
