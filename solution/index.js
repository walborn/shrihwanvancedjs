module.exports = class {
  [Symbol.toStringTag] = '^_^'
  #values

  constructor(values) {
    this.#values = values.reduce((r, i) => ~r.indexOf(i) ? r : [ ...r, i ], [])
  }

  *[Symbol.iterator] () {
    yield *this.values()
  }

  get size() {
    return this.#values.length
  }

  get() {
    return this.#values
  }

  values() {
    return this.#values[Symbol.iterator]()
  }
  keys() {
    return this.values()
  }
  entries() {
    return this.#values.map(i => [ i, i ])[Symbol.iterator]()
  }
  clear() {
    this.#values = []
  }
  has(value) {
    return !!~this.#values.indexOf(value)
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

  valueOf() {
    return this
  }

  forEach(fn, ctx) {
    this.#values.forEach(i => i.getValue.bind(ctx))
    for (let i = 0; i < this.size; i++) {
      const getValue = this.#values[i]?.getValue
      if (typeof getValue === 'function') this.#values[i].getValue = getValue.bind(ctx)
      fn(this.#values[i], i, this)
    }
  }

  toString() {
    return Object.prototype.toString.call(this)
  }
}