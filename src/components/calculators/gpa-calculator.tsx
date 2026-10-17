'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ActionRow, FormError, PrivacyNote, ResultCard, Stat } from '@/components/tool-ui'
import { cn } from '@/lib/utils'

const GRADES = [
  { label: 'A+ (5)', value: '5' },
  { label: 'A (4)', value: '4' },
  { label: 'A- (3.5)', value: '3.5' },
  { label: 'B (3)', value: '3' },
  { label: 'C (2)', value: '2' },
  { label: 'D (1)', value: '1' },
  { label: 'F (0)', value: '0' },
]

type Group = 'science' | 'business' | 'humanities'

const GROUPS: { id: Group; label: string }[] = [
  { id: 'science', label: 'Science' },
  { id: 'business', label: 'Business' },
  { id: 'humanities', label: 'Humanities' },
]

const COMMON_SUBJECTS = ['Bangla', 'English', 'Math', 'Islam & Moral Edu.', 'Information Technology (ICT)']

const GROUP_SUBJECTS: Record<Group, { sixthCommon: string; main: string[]; fourth: string }> = {
  science: {
    sixthCommon: 'Bangladesh & Global Studies',
    main: ['Physics', 'Chemistry', 'Biology'],
    fourth: 'Higher Mathematics',
  },
  business: {
    sixthCommon: 'Science',
    main: ['Accounting', 'Finance & Banking', 'Business Entrepreneurship'],
    fourth: 'Agriculture Studies',
  },
  humanities: {
    sixthCommon: 'Science',
    main: ['Geography', 'History of Bangladesh', 'Civic & Citizenship'],
    fourth: 'Agriculture Studies',
  },
}

const FOURTH_KEY = '__fourth__'

type GpaResult = { gpa: number; mainTotal: number; fourthBonus: number; failed: boolean }

function mainSubjectsFor(group: Group) {
  const config = GROUP_SUBJECTS[group]
  return [...COMMON_SUBJECTS, config.sixthCommon, ...config.main]
}

function letterFor(gpa: number) {
  if (gpa >= 5) return 'A+'
  if (gpa >= 4) return 'A'
  if (gpa >= 3.5) return 'A-'
  if (gpa >= 3) return 'B'
  if (gpa >= 2) return 'C'
  if (gpa >= 1) return 'D'
  return 'F'
}

function GradeSelect({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border glass p-2 pl-4">
      <label htmlFor={id} className="min-w-0 flex-1 text-sm font-semibold text-foreground sm:text-base">
        {label}
      </label>
      <div className="relative w-40 shrink-0 sm:w-48">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'h-11 w-full appearance-none rounded-lg border border-border bg-glass-subtle pr-9 pl-3 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 sm:text-base',
            value ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          <option value="" disabled>
            Select Your Grade
          </option>
          {GRADES.map((g) => (
            <option key={g.value} value={g.value} className="text-foreground">
              {g.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export function GpaCalculator() {
  const [group, setGroup] = useState<Group>('science')
  const [grades, setGrades] = useState<Record<string, string>>({})
  const [result, setResult] = useState<GpaResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mainSubjects = mainSubjectsFor(group)
  const fourthSubject = GROUP_SUBJECTS[group].fourth

  function setGrade(key: string, value: string) {
    setGrades((prev) => ({ ...prev, [key]: value }))
  }

  function selectGroup(next: Group) {
    if (next === group) return
    setGroup(next)
    setResult(null)
    setError(null)
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const missing = mainSubjects.filter((s) => !grades[s])
    if (missing.length > 0 || !grades[FOURTH_KEY]) {
      setError('Select a grade for every subject, including the 4th subject.')
      setResult(null)
      return
    }

    const points = mainSubjects.map((s) => Number(grades[s]))
    const mainTotal = points.reduce((sum, p) => sum + p, 0)
    const fourthBonus = Math.max(0, Number(grades[FOURTH_KEY]) - 2)
    const failed = points.some((p) => p === 0)
    const gpa = failed ? 0 : Math.min(5, (mainTotal + fourthBonus) / mainSubjects.length)

    setError(null)
    setResult({ gpa, mainTotal, fourthBonus, failed })
  }

  function onReset() {
    setGrades({})
    setResult(null)
    setError(null)
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <div role="group" aria-label="Select your group" className="grid grid-cols-3 gap-2">
          {GROUPS.map((g) => {
            const active = g.id === group
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectGroup(g.id)}
                className={cn(
                  'inline-flex items-center justify-center text-center leading-none h-11 rounded-xl border text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-base',
                  active
                    ? 'border-gloss-border bg-gradient-to-br from-gloss-from to-gloss-to text-primary-foreground shadow-gloss'
                    : 'border-border bg-glass-subtle text-foreground hover:bg-glass-hover',
                )}
              >
                {g.label}
              </button>
            )
          })}
        </div>

        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-2.5 text-sm font-semibold text-muted-foreground">Main subjects (9)</legend>
          {mainSubjects.map((subject, index) => (
            <GradeSelect
              key={subject}
              id={`grade-${index}`}
              label={subject}
              value={grades[subject] ?? ''}
              onChange={(value) => setGrade(subject, value)}
            />
          ))}
        </fieldset>

        <div className="flex items-center gap-3" role="separator" aria-label="4th Subject">
              <span className="h-px flex-1 bg-primary/20" />
              <span className="rounded-full glass-nav px-4 py-1.5 text-sm font-semibold text-foreground shadow-sm">
                {'4th Subject (↓)'}
              </span>
              <span className="h-px flex-1 bg-primary/20" />
        </div>

        <GradeSelect
          id="grade-fourth"
          label={fourthSubject}
          value={grades[FOURTH_KEY] ?? ''}
          onChange={(value) => setGrade(FOURTH_KEY, value)}
        />

        <FormError message={error} />
        <ActionRow label="Calculate GPA" onReset={onReset} />
      </form>
      <PrivacyNote />

      <ResultCard hasResult={result !== null} emptyText="Pick your group, select a grade for each subject, then press Calculate GPA.">
        {result && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-primary/30 glass p-5">
              <p className="text-xs font-medium text-muted-foreground">Final GPA</p>
              <p className="mt-1 flex flex-wrap items-baseline gap-x-3 font-bold tracking-tight tabular-nums">
                <span className={cn('text-5xl', result.failed ? 'text-destructive' : 'text-success')}>
                  {result.gpa.toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground">/ 5.00</span>
                <span
                  className={cn(
                    'rounded-md px-2 py-0.5 text-base',
                    result.failed ? 'bg-destructive/15 text-destructive' : 'bg-success/15 text-success',
                  )}
                >
                  Grade {letterFor(result.gpa)}
                </span>
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              <Stat label="Main subjects total" value={result.mainTotal.toFixed(2)} />
              <Stat label="4th subject bonus" value={`+${result.fourthBonus.toFixed(2)}`} />
            </dl>
            {result.failed && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/15 px-3 py-2 text-sm font-medium text-destructive">
                One or more main subjects have an F grade, so the final GPA is 0.00.
              </p>
            )}
          </div>
        )}
      </ResultCard>
    </>
  )
}
