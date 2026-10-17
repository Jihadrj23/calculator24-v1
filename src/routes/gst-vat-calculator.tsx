import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { AdditionalCalculator } from '@/components/calculators/additional-calculator'

export const Route = createFileRoute('/gst-vat-calculator')({
  head: () => ({ meta: [
    { title: 'GST & VAT Calculator | Calculator 24' },
    { name: 'description', content: 'Add GST or VAT to a net price or extract included tax from a gross price using your rate. Includes formulas, examples, and practical tax tips.' },
    { property: 'og:title', content: 'GST & VAT Calculator | Calculator 24' },
    { property: 'og:description', content: 'Calculate tax-inclusive and tax-exclusive amounts with your applicable GST or VAT rate.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
  ] }),
  component: Page,
})
function Page() { return <ToolPage title="GST & VAT Calculator"><AdditionalCalculator kind="gst" /></ToolPage> }