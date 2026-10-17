import { createFileRoute } from '@tanstack/react-router'
import { ToolPage } from '@/components/tool-ui'
import { BasicCalculator } from '@/components/calculators/basic-calculator'
import { HomeGuides } from '@/components/home/home-guides'

export const Route = createFileRoute('/')({
  head: () => {
    const title = 'Calculator 24 - Free Online Math, Financial & Utility Calculators'
    const description =
      'Free online calculators: scientific, age, GPA, loan EMI, discount, BMI, currency & unit converters, Zakat, tip and more. Fast, simple and private.'
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: '/' },
        { property: 'og:site_name', content: 'Calculator 24' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      links: [{ rel: 'canonical', href: '/' }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Calculator 24',
            alternateName: ['Calculator24', 'calculator24.online'],
            url: 'https://calculator24.online/',
            description,
            inLanguage: 'en',
          }),
        },
      ],
    }
  },
  component: Page,
})

function Page() {
  return (
    <>
      <ToolPage title="Basic & Scientific Calculator">
        <BasicCalculator />
      </ToolPage>
      <HomeGuides />
    </>
  )
}
