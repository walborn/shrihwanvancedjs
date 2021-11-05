module.exports = class {
  [Symbol.toStringTag] = '^_^'
  #values = []

  constructor(values = []) {
    for (let value of values) this.add(value)
  }

  *[Symbol.iterator]() {
    yield *this.values()
  }

  get size() {
    return this.#values.length
  }

  get() {
    return this.#values
  }

  *values() {
    for (let value of this.#values) yield value
  }

  *keys() {
    yield *this.values()
  }

  *entries() {
    for (let value of this.#values) yield [ value, value]
  }

  clear() {
    this.#values.length = 0
  }

  has(value) {
    return this.#values.includes(value);
  }

  add(value) {
    if (!this.has(value)) this.#values.push(value)
    return this
  }

  delete(value) {
    if (!this.has(value)) return
    const i = this.#values.indexOf(value)
    this.#values = [ ...this.#values.slice(0, i), ...this.#values.slice(i + 1) ]
  }

  forEach(cb, ctx) {
    for (let value of this.#values) {
      cb.bind(ctx)(value)
    }
  }

  toString() {
    return Object.prototype.toString.call(this)
  }
}