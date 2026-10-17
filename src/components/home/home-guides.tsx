import { ArrowRight, BookOpen, ChevronDown, Landmark, Lightbulb, Sigma } from 'lucide-react'
import { Link } from '@/components/app-link'
import { calculators } from '@/lib/calculators'

const categories = [
  { title: 'Money & everyday decisions', text: 'Compare loan repayments, calculate a sale price, split a restaurant bill, convert currencies, or estimate Zakat on eligible assets.', paths: ['/loan-emi-calculator', '/discount-calculator', '/currency-converter', '/tip-calculator', '/zakat-calculator'] },
  { title: 'Health & personal planning', text: 'Explore adult BMI and estimated daily calorie needs, or find an exact calendar age. Health figures are starting points for a conversation, not a diagnosis.', paths: ['/bmi-calculator', '/bmr-calculator', '/age-calculator'] },
  { title: 'Study, measurements & utilities', text: 'Work through scientific calculations, estimate Bangladesh SSC or HSC GPA, convert measurements, compare dates, and generate random passwords.', paths: ['/', '/gpa-calculator', '/unit-converter', '/date-calculator', '/password-generator'] },
]

const financialTips = [
  { title: 'Look beyond the monthly payment', text: 'A longer loan term can reduce the monthly EMI while increasing the total interest. Compare the same principal and rate over several terms, then consider fees, insurance, and any early-repayment charges separately.', href: '/loan-emi-calculator', link: 'Compare loan repayments' },
  { title: 'Compare final prices, not sale labels', text: 'A large discount is not always the cheapest offer. Calculate the amount you actually pay, then add delivery and any applicable charges. Two successive discounts multiply; 20% off followed by 10% off is 28% off overall, not 30%.', href: '/discount-calculator', link: 'Check a discount' },
  { title: 'Treat exchange rates as a reference', text: 'A currency conversion helps you budget across currencies. Your bank or payment provider may apply a different rate, a spread, or a separate fee. Check the update date and confirm the provider’s final amount before exchanging money.', href: '/currency-converter', link: 'Convert currencies' },
]

const faqs = [
  { question: 'Which calculator should I use?', answer: 'Choose by the question you need to answer: Loan / EMI for repayments, Discount for sale prices, Unit Converter for measurements, and Date & Time for calendar intervals. Each dedicated page includes the relevant formula, a worked example, and guidance on interpreting the result.' },
  { question: 'Are the calculators free to use?', answer: 'Yes. You can use the calculators without creating an account. Enter your values, calculate, and reset whenever you want to compare another scenario.' },
  { question: 'Why might a result differ from a bank, school, or health professional?', answer: 'Calculators rely on the assumptions shown on each page. Lenders may add fees or use different interest conventions, schools may have specific grading rules, and health estimates do not account for every individual factor. Use official statements or professional advice for decisions that depend on those details.' },
  { question: 'Are my calculations saved?', answer: 'The calculator inputs and results are processed in your browser and are not saved to a Calculator 24 account. This does not mean the whole website is offline: exchange-rate retrieval, fonts, and advertising can make network requests.' },
  { question: 'How can I get more accurate results?', answer: 'Check units and decimal places, use the correct reference date or rate, and round only at the end. Review the worked example on the relevant calculator page to make sure your inputs mean what you expect.' },
]

export function HomeGuides() {
  return (
    <div className="mt-16 space-y-14 border-t border-glass-border pt-10 sm:mt-20 sm:space-y-20 sm:pt-12">
      <section aria-labelledby="home-guides-heading">
        <p className="flex items-center gap-2 text-sm font-semibold text-accent"><BookOpen className="size-4" aria-hidden="true" /> A little clarity, every day</p>
        <h2 id="home-guides-heading" className="mt-3 max-w-3xl text-3xl leading-snug font-bold sm:text-4xl">Calculator 24: numbers that make sense.</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">From a quick sum to a loan comparison, the right calculation turns a guess into a more informed decision. Explore our free online math, financial, health, and utility calculators, with practical examples and explanations alongside each tool.</p>
        <div className="mt-9 grid gap-8 lg:grid-cols-3">
          {categories.map((category, index) => <section key={category.title} className="border-t border-border pt-5"><span className="text-sm font-mono text-accent">0{index + 1}</span><h3 className="mt-3 text-xl font-bold">{category.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{category.text}</p><ul className="mt-5 space-y-3">{calculators.filter((calculator) => category.paths.includes(calculator.href)).map(({ href, name, icon: Icon }) => <li key={href}><Link href={href} className="group flex items-center gap-3 py-1 text-sm font-medium hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"><Icon className="size-4 shrink-0 text-primary" aria-hidden="true" /><span className="flex-1">{name}</span><ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" /></Link></li>)}</ul></section>)}
        </div>
      </section>

      <section className="border-y border-glass-border py-10" aria-labelledby="math-guide-heading">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div><p className="flex items-center gap-2 text-sm font-semibold text-primary"><Sigma className="size-4" aria-hidden="true" /> Math, without the guesswork</p><h2 id="math-guide-heading" className="mt-3 text-2xl font-bold sm:text-3xl">Basic & scientific calculator guide</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Use the calculator above for everyday arithmetic or switch to scientific mode for more advanced expressions. Parentheses make the order of a calculation explicit; powers, roots, logarithms, and trigonometric functions help with study and technical work.</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Multiplication and division take precedence over addition and subtraction. For example, 2 + 3 × 4 = 14, while (2 + 3) × 4 = 20. When you need a grouped subtotal, add parentheses before multiplying.</p></div>
          <div><h3 className="text-lg font-bold">Three checks before you calculate</h3><ol className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground"><li><strong className="text-foreground">1. Write the expression clearly.</strong> Keep units consistent and group values with parentheses when they belong together.</li><li><strong className="text-foreground">2. Check the mode.</strong> For trigonometry, choose degrees or radians to match your problem. In degree mode, sin(30) = 0.5.</li><li><strong className="text-foreground">3. Sense-check the answer.</strong> Estimate the scale of the result mentally, then keep enough decimal places for the next step.</li></ol><div className="mt-6 rounded-xl border border-glass-border glass p-5"><p className="text-sm font-semibold text-accent">Percentage example</p><p className="mt-2 font-mono text-lg">250 × (15 ÷ 100) = 37.5</p><p className="mt-2 text-sm leading-7 text-muted-foreground">15% of 250 is 37.5. To add 15%, multiply 250 by 1.15 instead: the new total is 287.5.</p></div></div>
        </div>
      </section>

      <section aria-labelledby="financial-tips-heading">
        <p className="flex items-center gap-2 text-sm font-semibold text-accent"><Landmark className="size-4" aria-hidden="true" /> A more informed money decision</p>
        <h2 id="financial-tips-heading" className="mt-3 text-2xl font-bold sm:text-3xl">Practical financial tips</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">A useful financial estimate includes both the numbers and their assumptions. These habits can help you compare options more fairly; they are general educational guidance, not personalised financial advice.</p>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">{financialTips.map((tip) => <article key={tip.title} className="flex flex-col rounded-xl border border-glass-border glass p-6"><Lightbulb className="size-5 text-warning" aria-hidden="true" /><h3 className="mt-4 text-lg font-bold">{tip.title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{tip.text}</p><Link href={tip.href} className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-primary hover:text-accent focus-visible:outline-2 focus-visible:outline-primary">{tip.link}<ArrowRight className="size-4 shrink-0" aria-hidden="true" /></Link></article>)}</div>
      </section>

      <section className="grid gap-10 border-y border-glass-border py-10 lg:grid-cols-2 lg:gap-16">
        <div><h2 className="text-2xl font-bold">Small details. Better answers.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">An accurate formula cannot correct an input entered in the wrong unit. Before calculating, confirm whether a height is in centimetres or metres, an interest rate is annual, and a loan term is expressed in months or years.</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Keep intermediate values unrounded when possible. Converting a measurement several times with rounded figures can introduce avoidable error. Round the final answer to a precision that makes sense for your task.</p><Link href="/unit-converter" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">Explore unit conversions<ArrowRight className="size-4" aria-hidden="true" /></Link></div>
        <div><h3 className="text-xl font-bold">Know what an estimate can tell you</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">BMI is an adult screening measure, not a complete assessment of health. BMR and calorie targets estimate energy needs rather than measuring them. GPA calculations reflect the scale and optional-subject treatment described on the tool’s page.</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Calendar age and elapsed days answer different questions. A month varies in length, while a day count measures the interval between dates. Choose the result that matches your planning, application, or record-keeping needs.</p><Link href="/date-calculator" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">Compare two dates<ArrowRight className="size-4" aria-hidden="true" /></Link></div>
      </section>

      <section aria-labelledby="home-faq-heading"><h2 id="home-faq-heading" className="text-2xl font-bold sm:text-3xl">Frequently asked questions</h2><div className="mt-6 divide-y divide-border">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold focus-visible:outline-2 focus-visible:outline-primary">{faq.question}<ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" /></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{faq.answer}</p></details>)}</div></section>
    </div>
  )
}