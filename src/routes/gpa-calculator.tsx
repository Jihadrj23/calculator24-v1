import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { GpaCalculator } from '@/components/calculators/gpa-calculator'

export const Route = createFileRoute('/gpa-calculator')({
  head: () => ({
    meta: [
      { title: 'GPA Calculator' },
      { name: 'description', content: 'Calculate your SSC & HSC GPA on the Bangladesh 5.0 scale, including the 4th subject.' },
      { property: 'og:title', content: 'GPA Calculator' },
      { property: 'og:description', content: 'Calculate your SSC & HSC GPA on the Bangladesh 5.0 scale, including the 4th subject.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="GPA / Grade Calculator">
      <GpaCalculator />
    </ToolPage>
  )
}
