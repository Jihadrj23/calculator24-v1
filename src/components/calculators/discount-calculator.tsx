'use client'

import { useState } from 'react'
import { ActionRow, Field, FormError, PrivacyNote, ResultCard, Stat, inputClass } from '@/components/tool-ui'
import { formatMoney, formatNumber } from '@/lib/calculators'

type DiscountResult = { finalPrice: number; saved: number; original: number; percent: number }

export function DiscountCalculator() {
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [result, setResult] = useState<DiscountResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const original = Number(price)
    const percent = Number(discount)
    if (!price || original <= 0 || !discount || percent < 0 || percent > 100) {
      setError('Enter a price above 0 and a discount between 0 and 100%.')
      setResult(null)
      return
    }
    const saved = (original * percent) / 100
    setError(null)
    setResult({ original, percent, saved, finalPrice: original - saved })
  }

  function onReset() {
    setPrice('')
    setDiscount('')
    setResult(null)
    setError(null)
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <Field id="original-price" label="Original price">
          <input id="original-price" type="number" inputMode="decimal" min="0" step="any" placeholder="e.g. 2,000" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
        </Field>
        <Field id="discount" label="Discount (%)">
          <input id="discount" type="number" inputMode="decimal" min="0" max="100" step="any" placeholder="e.g. 20" value={discount} onChange={(e) => setDiscount(e.target.value)} className={inputClass} />
        </Field>
        <FormError message={error} />
        <ActionRow label="Calculate Discount" onReset={onReset} />
      </form>
      <PrivacyNote />

      <ResultCard hasResult={result !== null} emptyText="Enter a price and discount, then press Calculate Discount.">
        {result && (
          <div className="flex flex-col gap-3">
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Stat label="Final price" value={formatMoney(result.finalPrice)} highlight />
              <Stat label="You save" value={formatMoney(result.saved)} highlight />
            </dl>
            <p className="text-sm text-muted-foreground">
              {formatNumber(result.percent)}% off {formatMoney(result.original)} — you pay{' '}
              {formatNumber(100 - result.percent)}% of the original price.
            </p>
          </div>
        )}
      </ResultCard>
    </>
  )
}
