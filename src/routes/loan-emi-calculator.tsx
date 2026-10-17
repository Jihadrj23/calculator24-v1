import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { LoanCalculator } from '@/components/calculators/loan-calculator'

export const Route = createFileRoute('/loan-emi-calculator')({
  head: () => ({
    meta: [
      { title: 'Loan EMI Calculator' },
      { name: 'description', content: 'Calculate your monthly loan EMI, total interest and total amount payable.' },
      { property: 'og:title', content: 'Loan EMI Calculator' },
      { property: 'og:description', content: 'Calculate your monthly loan EMI, total interest and total amount payable.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="Loan / EMI Calculator">
      <LoanCalculator />
    </ToolPage>
  )
}
