import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { UnitConverter } from '@/components/calculators/unit-converter'

export const Route = createFileRoute('/unit-converter')({
  head: () => ({
    meta: [
      { title: 'Unit Converter' },
      { name: 'description', content: 'Convert length (meters, feet, inches), weight (kg, pounds) and temperature (Celsius, Fahrenheit).' },
      { property: 'og:title', content: 'Unit Converter' },
      { property: 'og:description', content: 'Convert length (meters, feet, inches), weight (kg, pounds) and temperature (Celsius, Fahrenheit).' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="Unit Converter">
      <UnitConverter />
    </ToolPage>
  )
}
