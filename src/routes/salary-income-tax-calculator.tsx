import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { AdditionalCalculator } from '@/components/calculators/additional-calculator'

export const Route = createFileRoute('/salary-income-tax-calculator')({
  head: () => ({ meta: [
    { title: 'Salary & Income Tax Calculator | Calculator 24' },
    { name: 'description', content: 'Estimate monthly and annual take-home pay using gross salary, an annual tax allowance, and your effective tax rate. Country-neutral planning tool and guide.' },
    { property: 'og:title', content: 'Salary & Income Tax Calculator | Calculator 24' },
    { property: 'og:description', content: 'Estimate take-home salary using your tax rate and allowance, with transparent assumptions.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Page,
})
function Page() { return <ToolPage title="Salary & Income Tax Calculator"><AdditionalCalculator kind="salary" /></ToolPage> }