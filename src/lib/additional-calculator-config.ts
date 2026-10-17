import { compoundInterest, fuelCost, incomeTax, pregnancyDueDate, salesTax, type CalculationResult, type Values } from './additional-calculations'

type Input = { key: string; label: string; initial: string; type?: 'number' | 'date'; min?: number; max?: number; step?: string; options?: { value: string; label: string }[] }
export type ToolConfig = { title: string; action: string; note: string; fields: Input[]; calculate: (values: Values) => CalculationResult }

export const additionalCalculatorConfig: Record<string, ToolConfig> = {
  investment: {
    title: 'Compound Interest & Investment Calculator', action: 'Calculate growth',
    note: 'Amounts use one currency. Deposits are made at each month’s end; returns are fixed estimates before tax, fees, and inflation.',
    calculate: compoundInterest,
    fields: [
      { key: 'principal', label: 'Initial investment', initial: '10000', min: 0 },
      { key: 'deposit', label: 'Monthly contribution', initial: '100', min: 0 },
      { key: 'rate', label: 'Annual nominal return (%)', initial: '5', min: 0, max: 100 },
      { key: 'months', label: 'Duration (1–1,200 months)', initial: '120', min: 1, max: 1200, step: '1' },
      { key: 'frequency', label: 'Compounding frequency', initial: '12', options: [{ value: '1', label: 'Annually' }, { value: '4', label: 'Quarterly' }, { value: '12', label: 'Monthly' }, { value: '365', label: 'Daily (365 periods)' }] },
    ],
  },
  gst: {
    title: 'GST & VAT Calculator', action: 'Calculate tax', note: 'Enter the rate applicable to your purchase. This is a single-rate calculation, not a tax filing.', calculate: salesTax,
    fields: [
      { key: 'amount', label: 'Amount', initial: '1000', min: 0 },
      { key: 'rate', label: 'GST / VAT rate (0–100%)', initial: '0', min: 0, max: 100 },
      { key: 'mode', label: 'Tax treatment', initial: 'exclusive', options: [{ value: 'exclusive', label: 'Add tax (amount excludes tax)' }, { value: 'inclusive', label: 'Extract tax (amount includes tax)' }] },
    ],
  },
  salary: {
    title: 'Salary & Income Tax Calculator', action: 'Estimate take-home', note: 'Uses your flat effective tax rate, not any country’s tax brackets. Annual deductions reduce taxable income, not cash salary. Other payroll deductions are excluded.', calculate: incomeTax,
    fields: [
      { key: 'salary', label: 'Gross salary', initial: '50000', min: 0 },
      { key: 'period', label: 'Salary period', initial: 'annual', options: [{ value: 'annual', label: 'Annual' }, { value: 'monthly', label: 'Monthly' }] },
      { key: 'deduction', label: 'Annual tax-free allowance / deductions', initial: '0', min: 0 },
      { key: 'rate', label: 'Effective tax rate (0–100%)', initial: '0', min: 0, max: 100 },
    ],
  },
  fuel: {
    title: 'Fuel Cost & Mileage Calculator', action: 'Calculate fuel cost', note: 'Distance is in kilometres and fuel price is per litre. Costs exclude tolls, parking, and vehicle maintenance.', calculate: fuelCost,
    fields: [
      { key: 'distance', label: 'Trip distance (km)', initial: '300', min: 0 },
      { key: 'unit', label: 'Fuel efficiency unit', initial: 'km-l', options: [{ value: 'km-l', label: 'Kilometres per litre (km/L)' }, { value: 'l-100km', label: 'Litres per 100 km (L/100 km)' }] },
      { key: 'efficiency', label: 'Fuel efficiency (above 0)', initial: '15', min: 0 },
      { key: 'price', label: 'Fuel price per litre', initial: '1.5', min: 0 },
    ],
  },
  pregnancy: {
    title: 'Pregnancy Due Date Calculator', action: 'Estimate due date', note: 'An estimated date, not a diagnosis or confirmation of pregnancy. A clinician’s assessment and ultrasound may give a different date.', calculate: pregnancyDueDate,
    fields: [
      { key: 'lmp', label: 'First day of last menstrual period', initial: '', type: 'date' },
      { key: 'cycle', label: 'Usual cycle length (21–35 days)', initial: '28', min: 21, max: 35, step: '1' },
      { key: 'reference', label: 'Reference date', initial: '', type: 'date' },
    ],
  },
}