import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { AdditionalCalculator } from '@/components/calculators/additional-calculator'

export const Route = createFileRoute('/compound-interest-calculator')({
  head: () => ({ meta: [
    { title: 'Compound Interest & Investment Calculator | Calculator 24' },
    { name: 'description', content: 'Estimate investment growth with compound interest and monthly contributions. Compare future value, contributions, and interest with a clear usage guide.' },
    { property: 'og:title', content: 'Compound Interest & Investment Calculator | Calculator 24' },
    { property: 'og:description', content: 'Explore compound growth, monthly savings, and effective annual returns with worked examples.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Page,
})
function Page() { return <ToolPage title="Compound Interest & Investment Calculator"><AdditionalCalculator kind="investment" /></ToolPage> }