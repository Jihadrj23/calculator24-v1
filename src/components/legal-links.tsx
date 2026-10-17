'use client'

import { useRef, useState } from 'react'
import { X } from 'lucide-react'

type LegalDoc = {
  id: 'privacy' | 'terms'
  label: string
  title: string
  intro: string
  points: { heading: string; body: string }[]
}

const DOCS: LegalDoc[] = [
  {
    id: 'privacy',
    label: 'Privacy Policy',
    title: 'Privacy Policy for Calculator24.online',
    intro:
      'At calculator24.online, accessible from https://www.calculator24.online, the privacy of our visitors is extremely important to us.',
    points: [
      {
        heading: 'Log Files',
        body: "Like many other websites, calculator24.online makes use of log files. These files merely log visitors to the site—usually a standard procedure for hosting companies and a part of hosting services' analytics.",
      },
      {
        heading: 'Cookies and Web Beacons',
        body: "We do not use cookies to store personal information. However, third-party vendors (such as Google AdSense) may use cookies to serve ads based on a user's prior visits to our website or other websites.",
      },
      {
        heading: 'Consent',
        body: 'By using our website, you hereby consent to our Privacy Policy and agree to its terms.',
      },
    ],
  },
  {
    id: 'terms',
    label: 'Terms & Conditions',
    title: 'Terms and Conditions for Calculator24.online',
    intro:
      'Welcome to calculator24.online! These terms and conditions outline the rules and regulations for the use of our website.',
    points: [
      {
        heading: 'Use of Calculators',
        body: 'All calculators provided on this website are for general informational and educational purposes only. While we strive to keep calculations accurate, we do not guarantee absolute precision for financial, medical, or legal decisions.',
      },
      {
        heading: 'Intellectual Property',
        body: "All tools, design, and source code of calculator24.online are protected. You may not copy, reproduce, or replicate the website's code or tools without permission.",
      },
      {
        heading: 'Disclaimer',
        body: 'The services are provided on an "as is" basis without warranties of any kind. We are not liable for any errors or losses resulting from the use of our calculators.',
      },
    ],
  },
]

export function LegalLinks() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState<LegalDoc>(DOCS[0])

  const open = (doc: LegalDoc) => {
    setActive(doc)
    dialogRef.current?.showModal()
  }

  const close = () => dialogRef.current?.close()

  return (
    <>
      <nav aria-label="Legal" className="flex items-center gap-4 text-xs">
        {DOCS.map((doc, i) => (
          <span key={doc.id} className="flex items-center gap-4">
            {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-muted" />}
            <button
              type="button"
              onClick={() => open(doc)}
              aria-haspopup="dialog"
              className="font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {doc.label}
            </button>
          </span>
        ))}
      </nav>

      <dialog
        ref={dialogRef}
        aria-labelledby="legal-dialog-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-border glass p-0 text-left text-foreground shadow-2xl backdrop:bg-background/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[80dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
            <h2 id="legal-dialog-title" className="text-base font-semibold text-foreground text-pretty">
              {active.title}
            </h2>
            <button
              type="button"
              onClick={close}
              className="-mr-2 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-glass-hover hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{active.intro}</p>
            <ul className="mt-5 flex flex-col gap-4">
              {active.points.map((point) => (
                <li key={point.heading} className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-foreground">{point.heading}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end border-t border-border px-6 py-3">
            <button
              type="button"
              onClick={close}
              className="rounded-lg glass-nav px-4 py-2 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
