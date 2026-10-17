import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { BmiCalculator } from '@/components/calculators/bmi-calculator'

export const Route = createFileRoute('/bmi-calculator')({
  head: () => ({
    meta: [
      { title: 'BMI Calculator' },
      { name: 'description', content: 'Calculate your Body Mass Index from weight and height and see your BMI category.' },
      { property: 'og:title', content: 'BMI Calculator' },
      { property: 'og:description', content: 'Calculate your Body Mass Index from weight and height and see your BMI category.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="BMI Calculator">
      <BmiCalculator />
    </ToolPage>
  )
}
