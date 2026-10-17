import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { BmrCalculator } from '@/components/calculators/bmr-calculator'

export const Route = createFileRoute('/bmr-calculator')({
  head: () => ({
    meta: [
      { title: 'BMR & Calorie Calculator' },
      { name: 'description', content: 'Calculate your BMR and daily calorie needs from age, gender, height, weight and activity level.' },
      { property: 'og:title', content: 'BMR & Calorie Calculator' },
      { property: 'og:description', content: 'Calculate your BMR and daily calorie needs from age, gender, height, weight and activity level.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="BMR & Calorie Calculator">
      <BmrCalculator />
    </ToolPage>
  )
}
