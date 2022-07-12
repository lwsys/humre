import { expect, test } from 'vitest'
import { sum } from '../src/main'
test('a + b', () => {
  expect(sum(1, 2)).toBe(3)
})
