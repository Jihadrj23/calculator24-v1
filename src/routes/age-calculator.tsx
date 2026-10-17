import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { AgeCalculator } from '@/components/calculators/age-calculator'

export const Route = createFileRoute('/age-calculator')({
  head: () => ({
    meta: [
      { title: 'Age Calculator' },
      { name: 'description', content: 'Calculate your exact age in years, months and days from your date of birth.' },
      { property: 'og:title', content: 'Age Calculator' },
      { property: 'og:description', content: 'Calculate your exact age in years, months and days from your date of birth.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="Age Calculator">
      <AgeCalculator />
    </ToolPage>
  )
}
