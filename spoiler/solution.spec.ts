import { test, expect, describe } from 'vitest'
import fc from 'fast-check'
import { 
  sortBroken1,
  sortBroken2,
  sortBroken3,
  sortBroken4,
  sortBroken5,
  sortBroken6,
  sortCorrect,
} from './sort'

const functionsToTest = Object.entries({
  sortCorrect,
  sortBroken1,
  sortBroken2,
  sortBroken3,
  sortBroken4,
  sortBroken5,
  sortBroken6,
})

function adjacentPairs<T>(array: T[]): [T,T][] {
  return array.slice(0,-1).map((item, index) => {
    return [item, array[index+1]]
  })
}

function isPermutationOf<T>(arrayA: T[], arrayB: T[]) {
  if (arrayA.length === 0) {
    return arrayB.length === 0
  } else {
    const [ firstA, ...restA ] = arrayA
    const indexB = arrayB.findIndex(item => item === firstA)

    if (indexB === -1) {
      return false
    } else {
      const restB = arrayB.filter((_, i) => i !== indexB)
      return isPermutationOf(restA, restB)
    }
  }
}

for (const [name, sort] of functionsToTest) {

  describe(name, () => {

    test('left items are less or equal to right items', () => {
      fc.assert(fc.property(
        fc.array(fc.integer()),
        array => {
          for (const [left, right] of adjacentPairs(sort(array))) {
            expect(left).toBeLessThanOrEqual(right)
          }
        }
      ))
    })

    test('input and output array contain exactly the same items', () => {
      fc.assert(fc.property(
        fc.array(fc.integer(), { size: '+1' }),
        array => {
          expect(isPermutationOf(array, sort(array))).toBe(true)
        }
      ))
    })

    // redundant tests:

    test('all items in the input array are also in the output array', () => {
      fc.assert(fc.property(
        fc.array(fc.integer()),
        array => {
          const result = sort(array)
          for (const item of array) {
            expect(result).toContain(item)
          }
        }
      ))
    })

    test('always returns an array', () => {
      fc.assert(fc.property(
        // specify randomized arguments:
        fc.array(fc.integer()),
        // actual test code:
        randomArray => {
          // this property is trivial since the return type of `sort`
          // is already guaranteed by the type checker.
          expect(Array.isArray(sort(randomArray)))
        }

      ), { numRuns: 100 })
    })

    test('duplicate items are preserved', () => {
      fc.assert(fc.property(
        fc.array(fc.integer()),
        fc.array(fc.integer()),
        fc.array(fc.integer()),
        fc.integer(),
        (prefix, infix, suffix, duplicate) => {
          const array = [...prefix, duplicate, ...infix, duplicate, ...suffix]

          // may be >2
          const duplicateCountBefore = array.filter(item => item === duplicate)
          const duplicateCountAfter = sort(array).filter(item => item === duplicate)

          // `item` should occur at least twice
          expect(duplicateCountAfter).toEqual(duplicateCountBefore)
        }
      ))
    })

    test('array length does not change', () => {
      fc.assert(fc.property(
        fc.array(fc.integer()),
        array => {
          expect(sort(array).length).toBe(array.length)
        }
      ), { numRuns: 1000 })
    })

  }) 

}
