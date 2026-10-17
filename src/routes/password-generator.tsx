import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { PasswordGenerator } from '@/components/calculators/password-generator'

export const Route = createFileRoute('/password-generator')({
  head: () => ({
    meta: [
      { title: 'Secure Password Generator' },
      { name: 'description', content: 'Generate strong, secure random passwords with custom length, numbers and symbols, and copy in one click.' },
      { property: 'og:title', content: 'Secure Password Generator' },
      { property: 'og:description', content: 'Generate strong, secure random passwords with custom length, numbers and symbols, and copy in one click.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Page,
})

function Page() {
  return (
    <ToolPage title="Secure Password Generator">
      <PasswordGenerator />
    </ToolPage>
  )
}
