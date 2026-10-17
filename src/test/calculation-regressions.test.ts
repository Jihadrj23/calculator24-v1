import { describe, expect, it } from 'vitest'
import { calendarDifference } from '@/lib/calendar-difference'
import { evaluate, formatResult } from '@/lib/evaluate'

describe('Scientific result reuse', () => {
  it('adds one to an exponent-formatted result without treating e as Euler', () => {
    const first = formatResult(evaluate('10^15'))
    expect(first).toBe('1e+15')
    const next = evaluate(`${first}+1`)
    expect(next).toBe(1000000000000001)
    expect(evaluate(formatResult(next))).toBe(1000000000000001)
  })
  it('reuses negative exponent notation', () => {
    const first = formatResult(evaluate('10^(-10)'))
    expect(evaluate(`${first}×10`)).toBeCloseTo(1e-9, 15)
  })
  it('preserves standalone Euler and implicit multiplication', () => {
    expect(evaluate('e')).toBe(Math.E)
    expect(evaluate('2e')).toBe(2 * Math.E)
    expect(evaluate('2e+3')).toBe(2000)
    expect(evaluate('2E-3')).toBe(0.002)
  })
})

describe('Age and date calendar differences', () => {
  it('returns one month and one day from January 31 to March 1', () => {
    expect(calendarDifference('2023-01-31', '2023-03-01')).toMatchObject({ years: 0, months: 1, days: 1, totalDays: 29 })
  })
  it('clamps anniversaries at month end', () => {
    expect(calendarDifference('2023-01-31', '2023-02-28')).toMatchObject({ years: 0, months: 1, days: 0, totalDays: 28 })
  })
  it('handles leap-day anniversaries', () => {
    expect(calendarDifference('2024-02-29', '2025-03-01')).toMatchObject({ years: 1, months: 0, days: 1, totalDays: 366 })
  })
  it('gives the same positive difference for reversed dates', () => {
    expect(calendarDifference('2023-03-01', '2023-01-31')).toEqual(calendarDifference('2023-01-31', '2023-03-01'))
  })
  it('handles early calendar years without remapping them to the 1900s', () => {
    expect(calendarDifference('0099-12-31', '0100-01-01')).toMatchObject({ years: 0, months: 0, days: 1, totalDays: 1 })
  })
  it('returns zero for identical dates', () => {
    expect(calendarDifference('2026-10-17', '2026-10-17')).toMatchObject({ years: 0, months: 0, days: 0, totalDays: 0 })
  })
})