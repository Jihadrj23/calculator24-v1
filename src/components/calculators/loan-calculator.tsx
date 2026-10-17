'use client'

import { useState } from 'react'
import { ActionRow, Field, FormError, PrivacyNote, ResultCard, Stat, inputClass } from '@/components/tool-ui'
import { formatMoney } from '@/lib/calculators'

type LoanResult = { emi: number; totalInterest: number; totalPayment: number; principal: number; months: number }

export function LoanCalculator() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [months, setMonths] = useState('')
  const [result, setResult] = useState<LoanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const principal = Number(amount)
    const annual = Number(rate)
    const n = Number(months)
    if (!amount || principal <= 0 || !rate || annual < 0 || !months || n <= 0 || !Number.isInteger(n)) {
      setError('Enter a loan amount above 0, an interest rate of 0 or more, and a whole number of months.')
      setResult(null)
      return
    }
    const r = annual / 12 / 100
    const emi = r === 0 ? principal / n : (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1)
    const totalPayment = emi * n
    setError(null)
    setResult({ emi, totalPayment, totalInterest: totalPayment - principal, principal, months: n })
  }

  function onReset() {
    setAmount('')
    setRate('')
    setMonths('')
    setResult(null)
    setError(null)
  }

  const interestShare = result ? (result.totalInterest / result.totalPayment) * 100 : 0

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <Field id="loan-amount" label="Loan amount">
          <input id="loan-amount" type="number" inputMode="decimal" min="0" placeholder="e.g. 100,000" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field id="loan-rate" label="Annual interest (%)">
            <input id="loan-rate" type="number" inputMode="decimal" min="0" step="any" placeholder="e.g. 10" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} />
          </Field>
          <Field id="loan-months" label="Duration (months)">
            <input id="loan-months" type="number" inputMode="numeric" min="1" step="1" placeholder="e.g. 12" value={months} onChange={(e) => setMonths(e.target.value)} className={inputClass} />
          </Field>
        </div>
        <FormError message={error} />
        <ActionRow label="Calculate EMI" onReset={onReset} />
      </form>
      <PrivacyNote />

      <ResultCard hasResult={result !== null} emptyText="Enter your loan details and press Calculate EMI to see your monthly payment.">
        {result && (
          <div className="flex flex-col gap-4">
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Stat label="Monthly EMI" value={formatMoney(result.emi)} highlight />
              <Stat label="Total interest payable" value={formatMoney(result.totalInterest)} highlight />
            </dl>
            <dl className="grid grid-cols-2 gap-3">
              <Stat label="Principal" value={formatMoney(result.principal)} />
              <Stat label={`Total payment (${result.months} mo)`} value={formatMoney(result.totalPayment)} />
            </dl>
            <div>
              <div className="flex h-3 overflow-hidden rounded-full bg-muted" role="img" aria-label={`Interest is ${interestShare.toFixed(1)}% of the total payment`}>
                <div className="bg-primary" style={{ width: `${100 - interestShare}%` }} />
                <div className="glass-nav" style={{ width: `${interestShare}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" aria-hidden="true" />Principal {(100 - interestShare).toFixed(1)}%</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full glass-nav" aria-hidden="true" />Interest {interestShare.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}
      </ResultCard>
    </>
  )
}
