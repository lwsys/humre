import { expect, test } from 'vitest'
import { backReference } from '../src/index'
test('test random regexps', () => {
  expect(backReference(1)).toBe('\\1')
  expect('1234123456'.match(new RegExp(`(123).?${backReference(1)}`))?.[0]).toBe('1234123')
})
