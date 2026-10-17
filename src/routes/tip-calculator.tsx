import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { TipCalculator } from '@/components/calculators/tip-calculator'

export const Route = createFileRoute('/tip-calculator')({
  head: () => ({
    meta: [
      { title: 'Tip Calculator' },
      { name: 'description', content: 'Calculate the tip on any bill with custom percentages and split the total between people.' },
      { property: 'og:title', content: 'Tip Calculator' },
      { property: 'og:description', content: 'Calculate the tip on any bill with custom percentages and split the total between people.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="Tip Calculator">
      <TipCalculator />
    </ToolPage>
  )
}
