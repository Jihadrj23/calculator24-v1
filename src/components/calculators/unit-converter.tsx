'use client'

import { useState } from 'react'
import { Field, Stat, inputClass } from '@/components/tool-ui'
import { EmptyHint, ResultPanel, Segmented, selectClass } from '@/components/home/tool-card'

type Category = 'length' | 'weight' | 'temperature'
type Unit = { id: string; label: string; factor?: number }

const UNITS: Record<Category, Unit[]> = {
  length: [
    { id: 'm', label: 'Meters (m)', factor: 1 },
    { id: 'km', label: 'Kilometers (km)', factor: 1000 },
    { id: 'cm', label: 'Centimeters (cm)', factor: 0.01 },
    { id: 'mm', label: 'Millimeters (mm)', factor: 0.001 },
    { id: 'ft', label: 'Feet (ft)', factor: 0.3048 },
    { id: 'in', label: 'Inches (in)', factor: 0.0254 },
    { id: 'yd', label: 'Yards (yd)', factor: 0.9144 },
    { id: 'mi', label: 'Miles (mi)', factor: 1609.344 },
  ],
  weight: [
    { id: 'kg', label: 'Kilograms (kg)', factor: 1 },
    { id: 'g', label: 'Grams (g)', factor: 0.001 },
    { id: 'lb', label: 'Pounds (lb)', factor: 0.45359237 },
    { id: 'oz', label: 'Ounces (oz)', factor: 0.028349523125 },
    { id: 't', label: 'Tonnes (t)', factor: 1000 },
  ],
  temperature: [
    { id: 'c', label: 'Celsius (°C)' },
    { id: 'f', label: 'Fahrenheit (°F)' },
    { id: 'k', label: 'Kelvin (K)' },
  ],
}

const DEFAULTS: Record<Category, [string, string]> = {
  length: ['m', 'ft'],
  weight: ['kg', 'lb'],
  temperature: ['c', 'f'],
}

const formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 })

function toCelsius(value: number, unit: string) {
  if (unit === 'f') return ((value - 32) * 5) / 9
  if (unit === 'k') return value - 273.15
  return value
}

function fromCelsius(value: number, unit: string) {
  if (unit === 'f') return (value * 9) / 5 + 32
  if (unit === 'k') return value + 273.15
  return value
}

function convert(category: Category, value: number, from: string, to: string) {
  if (category === 'temperature') return fromCelsius(toCelsius(value, from), to)
  const units = UNITS[category]
  const fromFactor = units.find((u) => u.id === from)?.factor ?? 1
  const toFactor = units.find((u) => u.id === to)?.factor ?? 1
  return (value * fromFactor) / toFactor
}

export function UnitConverter() {
  const [category, setCategory] = useState<Category>('length')
  const [value, setValue] = useState('1')
  const [from, setFrom] = useState(DEFAULTS.length[0])
  const [to, setTo] = useState(DEFAULTS.length[1])

  function changeCategory(next: Category) {
    setCategory(next)
    setFrom(DEFAULTS[next][0])
    setTo(DEFAULTS[next][1])
  }

  const num = Number(value)
  const valid = value !== '' && Number.isFinite(num)
  const units = UNITS[category]
  const symbol = (id: string) => units.find((u) => u.id === id)?.label.match(/\((.+)\)/)?.[1] ?? id

  return (
    <div className="flex flex-col gap-5">
      <Segmented
        label="Measurement type"
        value={category}
        onChange={changeCategory}
        options={[
          { value: 'length', label: 'Length' },
          { value: 'weight', label: 'Weight' },
          { value: 'temperature', label: 'Temp' },
        ]}
      />
      <Field id="uc-value" label="Value">
        <input
          id="uc-value"
          type="number"
          inputMode="decimal"
          step="any"
          placeholder="e.g. 10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field id="uc-from" label="From">
          <select id="uc-from" value={from} onChange={(e) => setFrom(e.target.value)} className={selectClass}>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="uc-to" label="To">
          <select id="uc-to" value={to} onChange={(e) => setTo(e.target.value)} className={selectClass}>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <ResultPanel className="mt-0">
        {valid ? (
          <dl>
            <Stat
              label={`${formatter.format(num)} ${symbol(from)} equals`}
              value={`${formatter.format(convert(category, num, from, to))} ${symbol(to)}`}
              highlight
            />
          </dl>
        ) : (
          <EmptyHint>Enter a value to convert.</EmptyHint>
        )}
      </ResultPanel>
    </div>
  )
}
