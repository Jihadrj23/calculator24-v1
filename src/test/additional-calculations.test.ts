import { describe, expect, it } from 'vitest'
import { compoundInterest, fuelCost, incomeTax, pregnancyDueDate, salesTax } from '@/lib/additional-calculations'

describe('Compound interest and investment', () => {
  it('compounds 10,000 monthly at 12% for 12 months', () => {
    expect(compoundInterest({ principal: '10000', deposit: '0', rate: '12', months: '12', frequency: '12' })[0]!.value).toBeCloseTo(11268.250301, 5)
  })
  it('adds month-end deposits with interest', () => {
    expect(compoundInterest({ principal: '0', deposit: '100', rate: '12', months: '2', frequency: '12' })[0]!.value).toBeCloseTo(201)
  })
  it('handles zero return without division by zero', () => {
    expect(compoundInterest({ principal: '10000', deposit: '100', rate: '0', months: '12', frequency: '12' })[0]!.value).toBe(11200)
  })
  it('rejects fractional duration', () => {
    expect(() => compoundInterest({ principal: '100', deposit: '0', rate: '5', months: '1.5', frequency: '12' })).toThrow()
  })
})
describe('GST and VAT', () => {
  it('adds 20% to a net amount of 100', () => {
    expect(salesTax({ amount: '100', rate: '20', mode: 'exclusive' }).map((item) => item.value)).toEqual([120, 100, 20])
  })
  it('extracts 20 of tax from a gross amount of 120', () => {
    expect(salesTax({ amount: '120', rate: '20', mode: 'inclusive' }).map((item) => item.value)).toEqual([120, 100, 20])
  })
  it('leaves a zero-rate amount unchanged', () => {
    expect(salesTax({ amount: '100', rate: '0', mode: 'inclusive' }).map((item) => item.value)).toEqual([100, 100, 0])
  })
})
describe('Salary and income tax estimates', () => {
  it('taxes 60,000 salary less a 10,000 allowance at 20%', () => {
    const result = incomeTax({ salary: '60000', period: 'annual', deduction: '10000', rate: '20' })
    expect(result[1]!.value).toBe(50000)
    expect(result[2]!.value).toBe(10000)
  })
  it('annualises monthly salary but keeps allowance annual', () => {
    expect(incomeTax({ salary: '5000', period: 'monthly', deduction: '10000', rate: '20' })[3]!.value).toBe(50000)
  })
  it('does not turn excess allowances into cash refunds', () => {
    const result = incomeTax({ salary: '10000', period: 'annual', deduction: '20000', rate: '20' })
    expect(result[1]!.value).toBe(10000)
    expect(result[2]!.value).toBe(0)
  })
})
describe('Fuel cost and efficiency', () => {
  it('uses 20 litres for 300 km at 15 km/L', () => {
    const result = fuelCost({ distance: '300', efficiency: '15', price: '1.5', unit: 'km-l' })
    expect(result[0]!.value).toBe(30)
    expect(result[1]!.value).toBe(20)
  })
  it('supports litres per 100 kilometres', () => {
    expect(fuelCost({ distance: '300', efficiency: '8', price: '1.5', unit: 'l-100km' })[0]!.value).toBe(36)
  })
  it('rejects zero efficiency', () => {
    expect(() => fuelCost({ distance: '300', efficiency: '0', price: '1.5', unit: 'km-l' })).toThrow()
  })
})
describe('Pregnancy date estimates', () => {
  it('adds 280 days for a 28-day cycle', () => {
    const result = pregnancyDueDate({ lmp: '2026-01-01', reference: '2026-01-29', cycle: '28' })
    expect(result[0]!.value).toBe('October 8, 2026')
    expect(result[1]!.value).toBe('4 weeks, 0 days')
    expect(result[2]!.value).toBe('January 15, 2026')
  })
  it('adjusts a 30-day cycle by two days', () => {
    expect(pregnancyDueDate({ lmp: '2026-01-01', reference: '2026-01-29', cycle: '30' })[0]!.value).toBe('October 10, 2026')
  })
  it('rejects invalid dates and dates before the period', () => {
    expect(() => pregnancyDueDate({ lmp: '2026-02-30', reference: '2026-03-01', cycle: '28' })).toThrow()
    expect(() => pregnancyDueDate({ lmp: '2026-01-01', reference: '2025-12-31', cycle: '28' })).toThrow()
  })
})