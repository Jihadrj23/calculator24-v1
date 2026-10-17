import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { ZakatCalculator } from '@/components/calculators/zakat-calculator'

export const Route = createFileRoute('/zakat-calculator')({
  head: () => ({
    meta: [
      { title: 'Zakat Calculator' },
      { name: 'description', content: 'Calculate your Zakat on cash, gold, silver and assets at the standard 2.5% rate.' },
      { property: 'og:title', content: 'Zakat Calculator' },
      { property: 'og:description', content: 'Calculate your Zakat on cash, gold, silver and assets at the standard 2.5% rate.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="Zakat Calculator">
      <ZakatCalculator />
    </ToolPage>
  )
}
