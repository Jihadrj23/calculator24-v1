import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { CurrencyConverter } from '@/components/calculators/currency-converter'
import { getUsdRates } from '@/lib/rates'

export const Route = createFileRoute('/currency-converter')({
  head: () => ({
    meta: [
      { title: 'Currency Converter' },
      { name: 'description', content: 'Convert popular currencies like USD, EUR, BDT, INR and GBP instantly with up-to-date exchange rates.' },
      { property: 'og:title', content: 'Currency Converter' },
      { property: 'og:description', content: 'Convert popular currencies like USD, EUR, BDT, INR and GBP instantly with up-to-date exchange rates.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  loader: () => getUsdRates(),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="Currency Converter">
      <CurrencyConverter data={Route.useLoaderData()} />
    </ToolPage>
  )
}
