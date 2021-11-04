const MySet = require('./index')

const set = new MySet([4, 8, 15, 15, 16, 23, 42])

test('хранит только уникальные значения', () => {
  expect([...set]).toEqual([ 4, 8, 15, 16, 23, 42 ])
})

test('есть свойство size', () => expect(set.size).toBe(6))

test('работает в цикле for-of', () => {
  const a = [ 4, 8, 15, 16, 23, 42 ]
  for (const item of set) {
    expect(item).toBe(a.shift())
  }
})

test('есть методы keys, values, entries', () => {
  const a = [ 4, 8, 15, 16, 23, 42 ].map(i => [ i, i ])
  for (const item of set.entries()) {
    expect(item).toEqual(a.shift())
  }
})

test('есть метод clear', () => {
  set.clear()
  expect(set.size).toBe(0)
})

const object = {
  getValue () { return this.value }
}

const data = {
  value: 42
}

test('есть метод add', () => {
  set.add(object)
  set.add(data)
  expect(set.size).toBe(2)
})

test('который может работать в цепочке вызовов', () => {
  set.add(object).add(object).add(object)
  expect(set.size).toBe(2)
})

test('есть метод delete', () => {
  set.delete(data)
  expect(set.size).toBe(1)
})

test('есть метод has', () => {
  expect(set.has({})).toBe(false)
  expect(set.has(object)).toBe(true)
  expect(set.has(data)).toBe(false)
})

test('и кое-что еще', () => {
  expect(set).toEqual(set.valueOf())
  expect(String(set)).toEqual('[object ^_^]')
  expect(Object.prototype.toString.call(set)).toEqual('[object ^_^]')
})

test('есть forEach, который делает какие-то странные вещи...', () => {
  set.forEach(function (item) {
    expect(item.getValue.call(this)).toBe(42)
  }, data)
})
