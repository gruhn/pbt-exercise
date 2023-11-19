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
} from './spoiler/sort'

const functionsToTest = Object.entries({
  sortCorrect,
  sortBroken1,
  sortBroken2,
  sortBroken3,
  sortBroken4,
  sortBroken5,
  sortBroken6,
})

for (const [name, sort] of functionsToTest) {

  describe(name, () => {

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

  }) 

}
