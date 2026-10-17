'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

const SETS = {
  upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  lower: 'abcdefghijkmnopqrstuvwxyz',
  numbers: '23456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?',
} as const

type SetKey = keyof typeof SETS

const OPTIONS: { key: SetKey; label: string }[] = [
  { key: 'upper', label: 'Uppercase (A–Z)' },
  { key: 'lower', label: 'Lowercase (a–z)' },
  { key: 'numbers', label: 'Numbers (0–9)' },
  { key: 'symbols', label: 'Symbols (!@#)' },
]

function randomIndex(max: number) {
  const limit = Math.floor(0x1_0000_0000 / max) * max
  const buf = new Uint32Array(1)
  do crypto.getRandomValues(buf)
  while (buf[0] >= limit)
  return buf[0] % max
}

function generate(length: number, enabled: SetKey[]) {
  const pools = enabled.map((k) => SETS[k])
  const all = pools.join('')
  const chars = pools.map((p) => p[randomIndex(p.length)])
  while (chars.length < length) chars.push(all[randomIndex(all.length)])
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.join('')
}

function strength(length: number, enabled: SetKey[]) {
  const pool = enabled.reduce((n, k) => n + SETS[k].length, 0)
  const bits = length * Math.log2(pool || 1)
  if (bits >= 100) return { label: 'Very strong', bars: 4, color: 'bg-success', text: 'text-success' }
  if (bits >= 70) return { label: 'Strong', bars: 3, color: 'bg-success', text: 'text-success' }
  if (bits >= 50) return { label: 'Fair', bars: 2, color: 'bg-warning', text: 'text-warning' }
  return { label: 'Weak', bars: 1, color: 'bg-destructive', text: 'text-destructive' }
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [enabled, setEnabled] = useState<Record<SetKey, boolean>>({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const active = OPTIONS.map((o) => o.key).filter((k) => enabled[k])

  function regenerate(nextLength = length, nextActive = active) {
    setPassword(generate(nextLength, nextActive))
    setCopied(false)
  }

  useEffect(() => {
    setPassword(generate(16, ['upper', 'lower', 'numbers', 'symbols']))
    return () => clearTimeout(copyTimer.current)
  }, [])

  function toggle(key: SetKey) {
    const next = { ...enabled, [key]: !enabled[key] }
    const nextActive = OPTIONS.map((o) => o.key).filter((k) => next[k])
    if (nextActive.length === 0) return
    setEnabled(next)
    regenerate(length, nextActive)
  }

  async function copy() {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const s = strength(length, active)

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-border bg-glass-subtle p-4">
        <div className="flex items-center gap-2">
          <output
            aria-live="polite"
            aria-label="Generated password"
            className="min-h-14 min-w-0 flex-1 rounded-xl border border-border glass px-4 py-3.5 font-mono text-base break-all text-foreground sm:text-lg"
          >
            {password || '\u00a0'}
          </output>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex flex-1 gap-1" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className={cn('h-1.5 flex-1 rounded-full', i <= s.bars ? s.color : 'bg-muted')} />
            ))}
          </div>
          <span className={cn('text-xs font-semibold tracking-[0.15em] uppercase', s.text)}>{s.label}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label htmlFor="pw-length" className="text-base font-semibold text-foreground">
            Length
          </label>
          <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary tabular-nums">{length}</span>
        </div>
        <input
          id="pw-length"
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => {
            const next = Number(e.target.value)
            setLength(next)
            regenerate(next)
          }}
          className="w-full accent-primary"
        />
      </div>

      <fieldset>
        <legend className="mb-3 text-base font-semibold text-foreground">Include</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {OPTIONS.map((o) => (
            <label
              key={o.key}
              className="flex h-12 cursor-pointer items-center gap-3 rounded-xl border border-border glass px-4 text-sm font-medium text-foreground transition-colors hover:bg-glass-hover has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/15"
            >
              <input
                type="checkbox"
                checked={enabled[o.key]}
                onChange={() => toggle(o.key)}
                className="size-4 accent-primary"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={copy}
          className="flex h-14 flex-1 items-center justify-center gap-3 rounded-xl border border-gloss-border bg-gradient-to-br from-gloss-from to-gloss-to px-4 text-lg font-bold text-primary-foreground shadow-gloss transition-[filter,box-shadow,transform] hover:-translate-y-px hover:brightness-105 hover:shadow-lg hover:shadow-gloss active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {copied ? <Check className="size-5" aria-hidden="true" /> : <Copy className="size-5" aria-hidden="true" />}
          {copied ? 'Copied!' : 'Copy Password'}
        </button>
        <button
          type="button"
          onClick={() => regenerate()}
          aria-label="Generate new password"
          className="flex h-14 w-16 shrink-0 items-center justify-center rounded-xl border border-border bg-glass-subtle text-foreground transition-colors hover:bg-glass-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <RefreshCw className="size-5" aria-hidden="true" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground">Generated securely in your browser — never sent anywhere.</p>
    </div>
  )
}
