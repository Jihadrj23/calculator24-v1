'use client'

import { useEffect, useRef, useState } from 'react'
import { Delete, RotateCcw } from 'lucide-react'
import { evaluate, formatResult, type AngleMode } from '@/lib/evaluate'
import { cn } from '@/lib/utils'
import { PrivacyNote } from '@/components/tool-ui'

type Mode = 'basic' | 'scientific'
type Key = { label: React.ReactNode; value: string; aria?: string; variant?: 'num' | 'fn' }

const basicKeys: Key[] = [
  { label: 'AC', value: 'AC', aria: 'All clear', variant: 'fn' },
  { label: '(', value: '(', variant: 'fn' },
  { label: ')', value: ')', variant: 'fn' },
  { label: <Delete className="size-6" aria-hidden="true" />, value: 'DEL', aria: 'Backspace', variant: 'fn' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '÷', value: '÷', aria: 'Divide', variant: 'fn' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '×', value: '×', aria: 'Multiply', variant: 'fn' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '−', value: '−', aria: 'Subtract', variant: 'fn' },
  { label: '0', value: '0' },
  { label: '.', value: '.', aria: 'Decimal point' },
  { label: '%', value: '%', aria: 'Percent', variant: 'fn' },
  { label: '+', value: '+', aria: 'Add', variant: 'fn' },
]

const scientificKeys: Key[] = [
  { label: 'sin', value: 'sin(', aria: 'Sine', variant: 'fn' },
  { label: 'cos', value: 'cos(', aria: 'Cosine', variant: 'fn' },
  { label: 'tan', value: 'tan(', aria: 'Tangent', variant: 'fn' },
  { label: 'xʸ', value: '^', aria: 'Power', variant: 'fn' },
  { label: 'ln', value: 'ln(', aria: 'Natural log', variant: 'fn' },
  { label: 'log', value: 'log(', aria: 'Log base 10', variant: 'fn' },
  { label: '√', value: '√(', aria: 'Square root', variant: 'fn' },
  { label: 'x²', value: '^2', aria: 'Square', variant: 'fn' },
  { label: 'π', value: 'π', aria: 'Pi', variant: 'fn' },
  { label: 'e', value: 'e', aria: 'Euler number', variant: 'fn' },
  { label: 'n!', value: '!', aria: 'Factorial', variant: 'fn' },
]

const OPERATORS = ['+', '−', '×', '÷', '^', '^2', '%', '!']

export function BasicCalculator() {
  const [mode, setMode] = useState<Mode>('basic')
  const [angle, setAngle] = useState<AngleMode>('deg')
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('0')
  const [justEvaluated, setJustEvaluated] = useState(false)
  const handlerRef = useRef<(value: string) => void>(() => {})

  function preview(expr: string, mode = angle) {
    if (!expr) return '0'
    try {
      return formatResult(evaluate(expr, mode))
    } catch {
      return null
    }
  }

  function press(value: string) {
    if (value === 'AC') {
      setExpression('')
      setResult('0')
      setJustEvaluated(false)
      return
    }
    if (value === 'DEL') {
      const next = justEvaluated ? '' : expression.replace(/(sin\(|cos\(|tan\(|log\(|ln\(|√\(|.)$/, '')
      setExpression(next)
      setResult(preview(next) ?? result)
      setJustEvaluated(false)
      return
    }
    if (value === '=') {
      if (!expression) return
      try {
        const value = formatResult(evaluate(expression, angle))
        setResult(value)
        setExpression(value)
        setJustEvaluated(true)
      } catch {
        setResult('Error')
        setJustEvaluated(true)
      }
      return
    }

    let base = expression
    if (justEvaluated) {
      const continuing = OPERATORS.includes(value) && result !== 'Error'
      base = continuing ? expression : ''
    }
    const next = base + value
    setExpression(next)
    setJustEvaluated(false)
    const live = preview(next)
    if (live !== null) setResult(live)
  }

  handlerRef.current = press

  useEffect(() => {
    const map: Record<string, string> = {
      '*': '×',
      '/': '÷',
      '-': '−',
      Enter: '=',
      '=': '=',
      Backspace: 'DEL',
      Escape: 'AC',
    }
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (target.closest('input, textarea, select') || event.metaKey || event.ctrlKey || event.altKey) return
      const key = event.key
      let value: string | undefined = map[key]
      if (!value && /^[0-9.()+%^!]$/.test(key)) value = key
      if (!value) return
      event.preventDefault()
      handlerRef.current(value)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function switchAngle() {
    const next = angle === 'deg' ? 'rad' : 'deg'
    setAngle(next)
    if (expression && !justEvaluated) {
      const live = preview(expression, next)
      if (live !== null) setResult(live)
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Calculator mode" className="flex gap-3">
        {(['basic', 'scientific'] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              'inline-flex items-center justify-center text-center leading-none h-10 rounded-xl px-4 text-sm font-medium sm:h-12 sm:px-5 sm:text-base capitalize transition-colors focus-visible:outline-2 focus-visible:outline-primary',
              mode === m
                ? 'border border-gloss-border bg-gradient-to-br from-gloss-from to-gloss-to text-primary-foreground shadow-gloss'
                : 'border border-transparent bg-muted text-muted-foreground hover:text-foreground',
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <output
        aria-live="polite"
        className="mt-4 flex min-h-24 flex-col items-end justify-end gap-1 rounded-2xl border border-glass-border bg-background/50 px-4 py-3 shadow-inner sm:mt-6 sm:min-h-36 sm:gap-2 sm:px-5 sm:py-5"
      >
        <span className="w-full truncate text-right text-base text-muted-foreground sm:text-xl" dir="ltr">
          {expression || '0'}
        </span>
        <span
          className={cn(
            'w-full truncate text-right font-bold tracking-tight text-foreground tabular-nums',
            result.length > 14 ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-5xl',
          )}
        >
          {result}
        </span>
      </output>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-6 sm:gap-3">
        {mode === 'scientific' && (
          <>
            {scientificKeys.map((key) => (
              <CalcKey key={key.value} k={key} onPress={press} />
            ))}
            <button
              type="button"
              onClick={switchAngle}
              aria-label={`Angle mode: ${angle === 'deg' ? 'degrees' : 'radians'}. Switch.`}
              className="flex h-11 items-center justify-center rounded-xl bg-primary/15 text-sm font-semibold text-primary uppercase transition-colors hover:bg-primary/25 focus-visible:outline-2 focus-visible:outline-primary sm:h-16"
            >
              {angle}
            </button>
          </>
        )}
        {basicKeys.map((key) => (
          <CalcKey key={key.value} k={key} onPress={press} />
        ))}
      </div>

      <div className="mt-2 flex gap-2 sm:mt-6 sm:gap-3">
        <button
          type="button"
          onClick={() => press('=')}
          aria-label="Equals"
          className="flex h-12 flex-1 items-center justify-center rounded-xl btn-glass-action transition-[filter,box-shadow,transform] duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-16"
        >
          <span aria-hidden="true" className="grid h-full w-full -translate-y-[0.17em] place-items-center text-2xl leading-none font-bold">=</span>
        </button>
        <button
          type="button"
          onClick={() => press('AC')}
          aria-label="Reset"
          className="flex h-12 w-12 shrink-0 items-center sm:h-16 sm:w-16 justify-center rounded-xl border border-border bg-glass-subtle text-foreground transition-colors hover:bg-glass-hover focus-visible:outline-2 focus-visible:outline-primary"
        >
          <RotateCcw className="size-5" aria-hidden="true" />
        </button>
      </div>
      <PrivacyNote />
    </div>
  )
}

function CalcKey({ k, onPress }: { k: Key; onPress: (value: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPress(k.value)}
      aria-label={k.aria}
      className={cn(
        'flex h-11 items-center justify-center rounded-xl text-xl leading-none text-foreground sm:text-2xl shadow-glow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-primary sm:h-16',
        k.variant === 'fn'
          ? 'bg-muted hover:bg-glass-hover'
          : 'border border-border bg-glass-subtle hover:bg-glass-hover',
        typeof k.label === 'string' && k.label.length > 2 && 'text-base sm:text-lg',
      )}
    >
      {k.label}
    </button>
  )
}
