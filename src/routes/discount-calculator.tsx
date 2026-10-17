import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { DiscountCalculator } from '@/components/calculators/discount-calculator'

export const Route = createFileRoute('/discount-calculator')({
  head: () => ({
    meta: [
      { title: 'Discount Calculator' },
      { name: 'description', content: 'Find the final price after a percentage discount and how much money you save.' },
      { property: 'og:title', content: 'Discount Calculator' },
      { property: 'og:description', content: 'Find the final price after a percentage discount and how much money you save.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="Discount & Percentage Calculator">
      <DiscountCalculator />
    </ToolPage>
  )
}
