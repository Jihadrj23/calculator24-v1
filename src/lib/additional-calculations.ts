export type Values = Record<string, string>
export type CalculationResult = { label: string; value: number | string; money?: boolean; highlight?: boolean }[]

function numeric(values: Values, key: string, min = 0, max = Infinity) {
  const raw = values[key]
  const value = Number(raw)
  if (!raw?.trim() || !Number.isFinite(value) || value < min || value > max) throw new Error('Enter a valid value for every field, within the displayed limits.')
  return value
}

export function compoundInterest(v: Values): CalculationResult {
  const principal = numeric(v, 'principal')
  const deposit = numeric(v, 'deposit')
  const annual = numeric(v, 'rate', 0, 100)
  const months = numeric(v, 'months', 1, 1200)
  if (!Number.isInteger(months)) throw new Error('Duration must be a whole number of months.')
  const frequency = numeric(v, 'frequency')
  if (![1, 4, 12, 365].includes(frequency)) throw new Error('Choose a compounding frequency.')
  const r = Math.expm1(frequency / 12 * Math.log1p(annual / 100 / frequency))
  const growth = Math.expm1(months * Math.log1p(r))
  const total = principal * (1 + growth) + deposit * (r === 0 ? months : growth / r)
  if (!Number.isFinite(total)) throw new Error('These inputs produce a value too large to display.')
  const invested = principal + deposit * months
  return [{ label: 'Future investment value', value: total, money: true, highlight: true }, { label: 'Total contributions', value: invested, money: true }, { label: 'Interest earned', value: total - invested, money: true }, { label: 'Effective annual return', value: `${((Math.pow(1 + annual / 100 / frequency, frequency) - 1) * 100).toFixed(2)}%` }]
}

export function salesTax(v: Values): CalculationResult {
  const amount = numeric(v, 'amount')
  const rate = numeric(v, 'rate', 0, 100)
  if (!['exclusive', 'inclusive'].includes(v['mode'])) throw new Error('Choose whether tax is included.')
  const net = v['mode'] === 'inclusive' ? amount / (1 + rate / 100) : amount
  const tax = net * rate / 100
  return [{ label: 'Amount including tax', value: net + tax, money: true, highlight: true }, { label: 'Amount excluding tax', value: net, money: true }, { label: 'GST / VAT amount', value: tax, money: true }]
}

export function incomeTax(v: Values): CalculationResult {
  const salary = numeric(v, 'salary')
  const deduction = numeric(v, 'deduction')
  const rate = numeric(v, 'rate', 0, 100)
  if (!['annual', 'monthly'].includes(v['period'])) throw new Error('Choose a salary period.')
  const gross = salary * (v['period'] === 'monthly' ? 12 : 1)
  const taxable = Math.max(0, gross - deduction)
  const tax = taxable * rate / 100
  return [{ label: 'Monthly take-home estimate', value: (gross - tax) / 12, money: true, highlight: true }, { label: 'Annual take-home estimate', value: gross - tax, money: true }, { label: 'Annual estimated tax', value: tax, money: true }, { label: 'Annual taxable income', value: taxable, money: true }, { label: 'Annual gross salary', value: gross, money: true }]
}

export function fuelCost(v: Values): CalculationResult {
  const distance = numeric(v, 'distance')
  const efficiency = numeric(v, 'efficiency', Number.MIN_VALUE)
  const price = numeric(v, 'price')
  if (!['km-l', 'l-100km'].includes(v['unit'])) throw new Error('Choose an efficiency unit.')
  const litres = v['unit'] === 'km-l' ? distance / efficiency : distance * efficiency / 100
  const cost = litres * price
  const per100 = v['unit'] === 'km-l' ? 100 / efficiency : efficiency
  if (![litres, cost, per100].every(Number.isFinite)) throw new Error('These inputs produce a value too large to display.')
  return [{ label: 'Total fuel cost', value: cost, money: true, highlight: true }, { label: 'Fuel needed (litres)', value: litres }, { label: 'Cost per kilometre', value: per100 / 100 * price, money: true }, { label: 'Consumption (L/100 km)', value: per100 }]
}

const day = 86_400_000
function dateValue(raw: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw ?? '')) throw new Error('Enter valid calendar dates.')
  const timestamp = Date.parse(`${raw}T00:00:00Z`)
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== raw) throw new Error('Enter valid calendar dates.')
  return timestamp
}

export function pregnancyDueDate(v: Values): CalculationResult {
  const lmp = dateValue(v['lmp'])
  const reference = dateValue(v['reference'])
  const cycle = numeric(v, 'cycle', 21, 35)
  if (!Number.isInteger(cycle)) throw new Error('Cycle length must be a whole number of days.')
  if (lmp > reference) throw new Error('The last period cannot start after the reference date.')
  const due = lmp + (280 + cycle - 28) * day
  const elapsed = Math.floor((reference - lmp) / day)
  const display = (timestamp: number) => new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(timestamp)
  return [{ label: 'Estimated due date', value: display(due), highlight: true }, { label: 'Gestational age from last period', value: `${Math.floor(elapsed / 7)} weeks, ${elapsed % 7} days` }, { label: 'Estimated conception date', value: display(lmp + (cycle - 14) * day) }, { label: reference > due ? 'Days past estimated due date' : 'Days until estimated due date', value: Math.abs(Math.round((due - reference) / day)) }]
}