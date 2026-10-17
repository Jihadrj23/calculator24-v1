import { ArrowRight, BookOpen, Check, ChevronDown, Lightbulb, Sigma } from 'lucide-react'
import { Link } from '@/components/app-link'
import { calculatorGuides } from '@/lib/calculator-guides'
import { calculators } from '@/lib/calculators'

export function CalculatorGuide({ title }: { title: string }) {
  const guide = calculatorGuides[title]
  if (!guide) return null
  const related = calculators.filter((calculator) => guide.related.includes(calculator.href))

  return (
    <article className="mt-16 border-t border-glass-border pt-10 sm:mt-20 sm:pt-12" aria-label={`${title} guide`}>
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent"><BookOpen className="size-4" aria-hidden="true" /> The essentials</p>
        <h2 className="text-2xl leading-snug font-bold text-foreground sm:text-3xl">{guide.heading}</h2>
        <p className="mt-4 text-base leading-8 text-muted-foreground">{guide.intro}</p>
      </div>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <section>
          <h3 className="text-xl font-bold">How to calculate</h3>
          <ol className="mt-6 space-y-6">
            {guide.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">{index + 1}</span>
                <div><h4 className="font-semibold">{step.title}</h4><p className="mt-1 text-sm leading-7 text-muted-foreground">{step.text}</p></div>
              </li>
            ))}
          </ol>
        </section>
        <section className="min-w-0">
          <h3 className="flex items-center gap-2 text-xl font-bold"><Sigma className="size-5 text-primary" aria-hidden="true" /> Behind the result</h3>
          <div className="mt-5 rounded-xl border border-glass-border glass p-5 sm:p-6">
            <p className="whitespace-pre-line font-mono text-sm leading-7 break-words text-accent">{guide.formula}</p>
            <p className="mt-4 border-t border-border pt-4 text-sm leading-7 text-muted-foreground">{guide.formulaNote}</p>
          </div>
          <h4 className="mt-6 font-semibold">A worked example</h4>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{guide.example}</p>
        </section>
      </div>
      <section className="mt-10 border-y border-glass-border py-8">
        <h3 className="flex items-center gap-2 text-xl font-bold"><Lightbulb className="size-5 text-warning" aria-hidden="true" /> Tips for a useful result</h3>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {guide.tips.map((tip) => <li key={tip} className="flex gap-3 text-sm leading-7 text-muted-foreground"><Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" /><span>{tip}</span></li>)}
        </ul>
      </section>
      <section className="mt-10">
        <h3 className="text-xl font-bold">Common questions</h3>
        <div className="mt-4 divide-y divide-border">
          {guide.faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold focus-visible:outline-2 focus-visible:outline-primary">{faq.question}<ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" /></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{faq.answer}</p></details>)}
        </div>
      </section>
      <nav className="mt-10" aria-label="Related calculators">
        <h3 className="text-xl font-bold">Keep exploring</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.map(({ href, name, icon: Icon }) => <Link key={href} href={href} className="flex items-center gap-3 rounded-xl border border-glass-border glass p-4 text-sm font-semibold transition-colors hover:border-primary/40 hover:bg-glass-hover focus-visible:outline-2 focus-visible:outline-primary"><Icon className="size-5 shrink-0 text-accent" aria-hidden="true" /><span className="flex-1">{name}</span><ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" /></Link>)}
        </div>
      </nav>
    </article>
  )
}