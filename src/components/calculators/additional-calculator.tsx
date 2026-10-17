import { useEffect, useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FormError, PrivacyNote, ResultCard, Stat, inputClass } from '@/components/tool-ui'
import { formatMoney, formatNumber } from '@/lib/calculators'
import { additionalCalculatorConfig, type ToolConfig } from '@/lib/additional-calculator-config'
import type { CalculationResult, Values } from '@/lib/additional-calculations'

function defaults(config: ToolConfig): Values {
  return Object.fromEntries(config.fields.map((field) => [field.key, field.initial]))
}

export function AdditionalCalculator({ kind }: { kind: string }) {
  const config = additionalCalculatorConfig[kind]
  if (!config) return null
  return <CalculatorForm key={kind} config={config} />
}

function CalculatorForm({ config }: { config: ToolConfig }) {
  const [values, setValues] = useState<Values>(() => defaults(config))
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    if (config.fields.some((field) => field.key === 'reference')) {
      const now = new Date()
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
      setValues((previous) => ({ ...previous, reference: today }))
    }
  }, [config])

  function update(key: string, value: string) {
    setValues((previous) => ({ ...previous, [key]: value }))
    setResult(null)
    setError(null)
  }
  function reset() {
    setValues((previous) => ({ ...defaults(config), ...(previous['reference'] ? { reference: previous['reference'] } : {}) }))
    setResult(null)
    setError(null)
  }
  function submit(event: React.FormEvent) {
    event.preventDefault()
    try {
      const calculated = config.calculate(values)
      if (calculated.some((item) => typeof item.value === 'number' && !Number.isFinite(item.value))) throw new Error('These inputs produce a value too large to display.')
      setResult(calculated)
      setError(null)
    } catch (cause) {
      setResult(null)
      setError(cause instanceof Error ? cause.message : 'Please check your inputs.')
    }
  }

  return <>
    <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
      {config.fields.map((field) => <Field key={field.key} id={`new-${field.key}`} label={field.label}>
        {field.options ? <select id={`new-${field.key}`} className={inputClass} value={values[field.key]} onChange={(event) => update(field.key, event.target.value)}>{field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : <input id={`new-${field.key}`} className={inputClass} type={field.type ?? 'number'} inputMode={field.type === 'date' ? undefined : 'decimal'} min={field.min} max={field.max} step={field.step ?? 'any'} required value={values[field.key]} onChange={(event) => update(field.key, event.target.value)} />}
      </Field>)}
      <p className="text-sm leading-6 text-muted-foreground">{config.note}</p>
      <FormError message={error} />
      <div className="flex gap-3">
        <Button type="submit" className="h-14 min-w-0 flex-1 rounded-xl border border-gloss-border bg-gradient-to-br from-gloss-from to-gloss-to px-3 text-base font-bold whitespace-normal text-primary-foreground shadow-gloss transition-[filter,box-shadow,transform] hover:-translate-y-px hover:brightness-105 sm:text-lg">{config.action}<ArrowRight aria-hidden="true" /></Button>
        <Button type="button" variant="outline" onClick={reset} aria-label="Reset" className="h-14 w-16 shrink-0 rounded-xl border-border glass text-muted-foreground hover:bg-primary/10 hover:text-primary"><RotateCcw aria-hidden="true" /></Button>
      </div>
    </form>
    <PrivacyNote />
    <ResultCard hasResult={result !== null} emptyText="Your estimate will appear here after you calculate.">
      {result && <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">{result.map((item) => <Stat key={item.label} label={item.label} value={typeof item.value === 'string' ? item.value : item.money ? formatMoney(item.value) : formatNumber(item.value)} highlight={item.highlight ?? false} />)}</dl>}
    </ResultCard>
  </>
}