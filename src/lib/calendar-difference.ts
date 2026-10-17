const DAY_MS = 86_400_000

function calendarDate(year: number, month: number, day: number) {
  const date = new Date(0)
  date.setUTCFullYear(year, month, day)
  date.setUTCHours(0, 0, 0, 0)
  return date
}

function parseDate(iso: string) {
  const [year = NaN, month = NaN, day = NaN] = iso.split('-').map(Number)
  const date = calendarDate(year, month - 1, day)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== iso) {
    throw new Error('Enter valid calendar dates.')
  }
  return date
}

// Count complete months using anniversaries clamped to the target month's end.
// Remaining days are elapsed UTC days after that anniversary, never borrowed days.
export function calendarDifference(startISO: string, endISO: string) {
  let start = parseDate(startISO)
  let end = parseDate(endISO)
  if (start > end) [start, end] = [end, start]

  const anniversary = (months: number) => {
    const target = calendarDate(start.getUTCFullYear(), start.getUTCMonth() + months, 1)
    const lastDay = calendarDate(target.getUTCFullYear(), target.getUTCMonth() + 1, 0).getUTCDate()
    return calendarDate(target.getUTCFullYear(), target.getUTCMonth(), Math.min(start.getUTCDate(), lastDay))
  }
  let totalMonths = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth()
  if (anniversary(totalMonths) > end) totalMonths--
  const totalDays = Math.round((end.getTime() - start.getTime()) / DAY_MS)
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days: Math.round((end.getTime() - anniversary(totalMonths).getTime()) / DAY_MS),
    totalMonths,
    totalWeeks: Math.floor(totalDays / 7),
    weekRemainderDays: totalDays % 7,
    totalDays,
  }
}