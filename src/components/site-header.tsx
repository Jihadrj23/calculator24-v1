'use client'

import { Link } from '@/components/app-link'
import { useLocation } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Calculator, Check, Menu, X } from 'lucide-react'
import { calculators } from '@/lib/calculators'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  const pathname = useLocation({ select: (l) => l.pathname })
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 glass-nav">
      <div ref={containerRef} className="relative mx-auto grid h-16 w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 sm:h-[72px] sm:px-6">
        <Link href="/" className="flex min-w-0 w-fit max-w-full items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
<span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-glass-border bg-gradient-to-b from-primary/40 to-accent/20 shadow-md shadow-glow ring-1 ring-inset ring-glass-border sm:size-11 sm:rounded-2xl">
<Calculator className="size-6 text-foreground sm:size-[26px]" strokeWidth={2} absoluteStrokeWidth shapeRendering="geometricPrecision" aria-hidden="true" />
          </span>
          <span className="min-w-0 truncate text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            Calculator <span className="text-primary">24</span>
            <sup className="ml-0.5 align-super text-[10px] font-semibold text-primary">®</sup>
          </span>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="calculator-menu"
          aria-label={open ? 'Close calculator menu' : 'Open calculator menu'}
          className="size-11 shrink-0 rounded-lg text-foreground hover:bg-glass-hover focus-visible:outline-2 focus-visible:outline-primary [&_svg]:size-7"
        >
          {open ? <X className="size-7" aria-hidden="true" /> : <Menu className="size-7" aria-hidden="true" />}
        </Button>

        {open && (
          <nav
            id="calculator-menu"
            aria-label="Calculators"
            className="absolute top-full right-3 mt-1 w-max min-w-52 max-w-[calc(100vw-1.5rem)] rounded-xl border border-glass-border bg-popover backdrop-blur-2xl max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain p-1.5 shadow-xl shadow-glow animate-in fade-in slide-in-from-top-2 duration-150 sm:right-4"
          >
            <ul className="flex flex-col gap-0.5">
              {calculators.map((calc) => {
                const active = pathname === calc.href
                const Icon = calc.icon
                return (
                  <li key={calc.href}>
                    <Link
                      href={calc.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-background hover:text-primary',
                        active && 'bg-primary/10 text-primary hover:bg-primary/10',
                      )}
                    >
                      <Icon className={cn('size-4 shrink-0', active ? 'text-primary' : 'text-muted-foreground')} aria-hidden="true" />
                      <span className={cn('flex-1', calc.name.length > 35 ? 'min-w-0 whitespace-normal' : 'whitespace-nowrap')}>{calc.name}</span>
                      {active && <Check className="ml-2 size-4 shrink-0" aria-hidden="true" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
