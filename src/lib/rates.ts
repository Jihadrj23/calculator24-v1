export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'BDT', name: 'Bangladeshi Taka' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'PKR', name: 'Pakistani Rupee' },
  { code: 'SAR', name: 'Saudi Riyal' },
  { code: 'AED', name: 'UAE Dirham' },
  { code: 'MYR', name: 'Malaysian Ringgit' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
] as const

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  BDT: 120,
  INR: 84,
  PKR: 280,
  SAR: 3.75,
  AED: 3.6725,
  MYR: 4.4,
  SGD: 1.34,
  JPY: 150,
  CNY: 7.2,
  CAD: 1.37,
  AUD: 1.52,
}

export type RatesData = { rates: Record<string, number>; updatedAt: string | null }

export async function getUsdRates(): Promise<RatesData> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) throw new Error(`Rates request failed: ${res.status}`)
    const data = (await res.json()) as { result?: string; rates?: Record<string, number>; time_last_update_utc?: string }
    if (data.result !== 'success' || !data.rates) throw new Error('Invalid rates payload')
    const rates: Record<string, number> = {}
    for (const { code } of CURRENCIES) {
      rates[code] = data.rates[code] ?? FALLBACK_RATES[code]
    }
    return { rates, updatedAt: data.time_last_update_utc ?? null }
  } catch {
    return { rates: FALLBACK_RATES, updatedAt: null }
  }
}
