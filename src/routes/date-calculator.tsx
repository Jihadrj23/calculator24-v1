import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { DateCalculator } from '@/components/calculators/date-calculator'

export const Route = createFileRoute('/date-calculator')({
  head: () => ({
    meta: [
      { title: 'Date & Time Calculator' },
      { name: 'description', content: 'Find the exact difference in years, months and days between two dates, or add and subtract days.' },
      { property: 'og:title', content: 'Date & Time Calculator' },
      { property: 'og:description', content: 'Find the exact difference in years, months and days between two dates, or add and subtract days.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="Date & Time Calculator">
      <DateCalculator />
    </ToolPage>
  )
}
