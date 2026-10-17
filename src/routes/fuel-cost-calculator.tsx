import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { AdditionalCalculator } from '@/components/calculators/additional-calculator'

export const Route = createFileRoute('/fuel-cost-calculator')({
  head: () => ({ meta: [
    { title: 'Fuel Cost & Mileage Calculator | Calculator 24' },
    { name: 'description', content: 'Estimate trip fuel cost and litres needed from distance, fuel price, and efficiency in km/L or L/100 km. Includes mileage formulas and budgeting tips.' },
    { property: 'og:title', content: 'Fuel Cost & Mileage Calculator | Calculator 24' },
    { property: 'og:description', content: 'Budget fuel for your journey with kilometre and litre-based efficiency calculations.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Page,
})
function Page() { return <ToolPage title="Fuel Cost & Mileage Calculator"><AdditionalCalculator kind="fuel" /></ToolPage> }