import {
  ArrowLeftRight,
  Baby,
  BriefcaseBusiness,
  Cake,
  Calculator,
  CalendarDays,
  Flame,
  Fuel,
  GraduationCap,
  HandCoins,
  KeyRound,
  Landmark,
  Percent,
  Receipt,
  Ruler,
  Scale,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'

export type CalculatorLink = {
  name: string
  href: string
  icon: LucideIcon
}

export const calculators: CalculatorLink[] = [
  { name: 'Basic & Scientific Calculator', href: '/', icon: Calculator },
  { name: 'Age Calculator', href: '/age-calculator', icon: Cake },
  { name: 'GPA / Grade Calculator', href: '/gpa-calculator', icon: GraduationCap },
  { name: 'Loan / EMI Calculator', href: '/loan-emi-calculator', icon: Landmark },
  { name: 'Discount & Percentage Calculator', href: '/discount-calculator', icon: Percent },
  { name: 'BMI Calculator', href: '/bmi-calculator', icon: Scale },
  { name: 'Currency Converter', href: '/currency-converter', icon: ArrowLeftRight },
  { name: 'Unit Converter', href: '/unit-converter', icon: Ruler },
  { name: 'Zakat Calculator', href: '/zakat-calculator', icon: HandCoins },
  { name: 'Tip Calculator', href: '/tip-calculator', icon: Receipt },
  { name: 'Date & Time Calculator', href: '/date-calculator', icon: CalendarDays },
  { name: 'BMR & Calorie Calculator', href: '/bmr-calculator', icon: Flame },
  { name: 'Secure Password Generator', href: '/password-generator', icon: KeyRound },
  { name: 'Compound Interest & Investment Calculator', href: '/compound-interest-calculator', icon: TrendingUp },
  { name: 'GST & VAT Calculator', href: '/gst-vat-calculator', icon: Receipt },
  { name: 'Salary & Income Tax Calculator', href: '/salary-income-tax-calculator', icon: BriefcaseBusiness },
  { name: 'Fuel Cost & Mileage Calculator', href: '/fuel-cost-calculator', icon: Fuel },
  { name: 'Pregnancy Due Date Calculator', href: '/pregnancy-due-date-calculator', icon: Baby },
]

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
const moneyFormatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function formatNumber(value: number) {
  return Number.isFinite(value) ? numberFormatter.format(value) : '—'
}

export function formatMoney(value: number) {
  return Number.isFinite(value) ? moneyFormatter.format(value) : '—'
}
