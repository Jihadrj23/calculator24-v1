import { LegalLinks } from '@/components/legal-links'

export function SiteFooter() {
  return (
    <footer className="border-t border-border glass">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-5 py-6 text-center sm:px-6">
        <p className="text-sm font-semibold text-foreground">
          Calculator <span className="text-primary">24</span>
        </p>
        <LegalLinks />
        <p className="text-xs text-muted-foreground">{'© 2026 calculator24.online. All rights reserved.'}</p>
      </div>
    </footer>
  )
}
