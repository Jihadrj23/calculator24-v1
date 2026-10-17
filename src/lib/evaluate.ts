export type AngleMode = 'deg' | 'rad'

type Token =
  | { type: 'num'; value: number }
  | { type: 'op'; value: '+' | '-' | '*' | '/' | '^' }
  | { type: 'postfix'; value: '%' | '!' }
  | { type: 'fn'; value: 'sin' | 'cos' | 'tan' | 'ln' | 'log' | 'sqrt' }
  | { type: 'lparen' }
  | { type: 'rparen' }

const FUNCTIONS: [string, Extract<Token, { type: 'fn' }>['value']][] = [
  ['sin', 'sin'],
  ['cos', 'cos'],
  ['tan', 'tan'],
  ['log', 'log'],
  ['ln', 'ln'],
  ['√', 'sqrt'],
]

function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < input.length) {
    const ch = input[i]
    if (ch === ' ') {
      i++
      continue
    }
    if (/[0-9.]/.test(ch)) {
      let j = i
      while (j < input.length && /[0-9.]/.test(input[j])) j++
      const raw = input.slice(i, j)
      if ((raw.match(/\./g) ?? []).length > 1 || raw === '.') throw new Error('Invalid number')
      // Consume exponent notation as part of a number, while keeping bare e
      // available as Euler's constant (including implicit multiplication: 2e).
      const exponent = input.slice(j).match(/^[eE][+-]?\d+/)?.[0]
      if (exponent) j += exponent.length
      tokens.push({ type: 'num', value: Number(input.slice(i, j)) })
      i = j
      continue
    }
    const fn = FUNCTIONS.find(([name]) => input.startsWith(name, i))
    if (fn) {
      tokens.push({ type: 'fn', value: fn[1] })
      i += fn[0].length
      continue
    }
    if (ch === 'π') tokens.push({ type: 'num', value: Math.PI })
    else if (ch === 'e') tokens.push({ type: 'num', value: Math.E })
    else if (ch === '+') tokens.push({ type: 'op', value: '+' })
    else if (ch === '−' || ch === '-') tokens.push({ type: 'op', value: '-' })
    else if (ch === '×' || ch === '*') tokens.push({ type: 'op', value: '*' })
    else if (ch === '÷' || ch === '/') tokens.push({ type: 'op', value: '/' })
    else if (ch === '^') tokens.push({ type: 'op', value: '^' })
    else if (ch === '%' || ch === '!') tokens.push({ type: 'postfix', value: ch })
    else if (ch === '(') tokens.push({ type: 'lparen' })
    else if (ch === ')') tokens.push({ type: 'rparen' })
    else throw new Error(`Unexpected character: ${ch}`)
    i++
  }
  return tokens
}

function factorial(n: number) {
  if (n < 0 || !Number.isInteger(n)) throw new Error('Factorial needs a non-negative integer')
  if (n > 170) return Infinity
  let result = 1
  for (let k = 2; k <= n; k++) result *= k
  return result
}

class Parser {
  private pos = 0
  constructor(
    private tokens: Token[],
    private angle: AngleMode,
  ) {}

  parse() {
    const value = this.expression()
    if (this.pos < this.tokens.length) throw new Error('Unexpected token')
    return value
  }

  private peek() {
    return this.tokens[this.pos]
  }

  private startsOperand(token: Token | undefined) {
    return !!token && (token.type === 'num' || token.type === 'fn' || token.type === 'lparen')
  }

  private expression(): number {
    let value = this.term()
    for (let t = this.peek(); t?.type === 'op' && (t.value === '+' || t.value === '-'); t = this.peek()) {
      this.pos++
      const rhs = this.term()
      value = t.value === '+' ? value + rhs : value - rhs
    }
    return value
  }

  private term(): number {
    let value = this.unary()
    for (;;) {
      const t = this.peek()
      if (t?.type === 'op' && (t.value === '*' || t.value === '/')) {
        this.pos++
        const rhs = this.unary()
        value = t.value === '*' ? value * rhs : value / rhs
      } else if (this.startsOperand(t)) {
        value *= this.unary()
      } else {
        return value
      }
    }
  }

  private unary(): number {
    const t = this.peek()
    if (t?.type === 'op' && (t.value === '-' || t.value === '+')) {
      this.pos++
      const value = this.unary()
      return t.value === '-' ? -value : value
    }
    return this.power()
  }

  private power(): number {
    const base = this.postfix()
    const t = this.peek()
    if (t?.type === 'op' && t.value === '^') {
      this.pos++
      return base ** this.unary()
    }
    return base
  }

  private postfix(): number {
    let value = this.primary()
    for (let t = this.peek(); t?.type === 'postfix'; t = this.peek()) {
      this.pos++
      value = t.value === '%' ? value / 100 : factorial(value)
    }
    return value
  }

  private group(): number {
    const value = this.expression()
    const t = this.peek()
    if (t?.type === 'rparen') this.pos++
    else if (t !== undefined) throw new Error('Expected )')
    return value
  }

  private primary(): number {
    const t = this.peek()
    if (!t) throw new Error('Unexpected end')
    this.pos++
    if (t.type === 'num') return t.value
    if (t.type === 'lparen') return this.group()
    if (t.type === 'fn') {
      const next = this.peek()
      const arg = next?.type === 'lparen' ? (this.pos++, this.group()) : this.postfix()
      const rad = this.angle === 'deg' ? (arg * Math.PI) / 180 : arg
      switch (t.value) {
        case 'sin':
          return Math.sin(rad)
        case 'cos':
          return Math.cos(rad)
        case 'tan':
          return Math.tan(rad)
        case 'ln':
          return Math.log(arg)
        case 'log':
          return Math.log10(arg)
        case 'sqrt':
          return Math.sqrt(arg)
      }
    }
    throw new Error('Unexpected token')
  }
}

export function evaluate(expression: string, angle: AngleMode = 'deg'): number {
  const tokens = tokenize(expression)
  if (tokens.length === 0) throw new Error('Empty expression')
  const value = new Parser(tokens, angle).parse()
  if (Number.isNaN(value)) throw new Error('Not a number')
  return value
}

export function formatResult(value: number): string {
  if (!Number.isFinite(value)) return value > 0 ? '∞' : value < 0 ? '−∞' : 'Error'
  // Large results must round-trip without discarding low-order integer digits.
  if (Math.abs(value) >= 1e15) return value.toExponential()
  const cleaned = Math.abs(value) < 1e-12 ? 0 : Number.parseFloat(value.toPrecision(12))
  const abs = Math.abs(cleaned)
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) return cleaned.toExponential(8).replace(/\.?0+e/, 'e')
  return String(cleaned)
}
