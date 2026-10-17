import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { AdditionalCalculator } from '@/components/calculators/additional-calculator'

export const Route = createFileRoute('/pregnancy-due-date-calculator')({
  head: () => ({ meta: [
    { title: 'Pregnancy Due Date Calculator | Calculator 24' },
    { name: 'description', content: 'Estimate a pregnancy due date from the last menstrual period and cycle length. View gestational age with clear medical limitations and an educational guide.' },
    { property: 'og:title', content: 'Pregnancy Due Date Calculator | Calculator 24' },
    { property: 'og:description', content: 'Explore menstrual-date pregnancy estimates, cycle adjustments, and gestational age.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Page,
})
function Page() { return <ToolPage title="Pregnancy Due Date Calculator"><AdditionalCalculator kind="pregnancy" /></ToolPage> }