
// doesn't do sorting at all but preserves all items 
export function sortBroken1(array: number[]): number[] {
  return array
}

// uses lexicographic order by default, ie converts numbers to 
// strings before comparing. Thus: -1 < -4
export function sortBroken2(array: number[]): number[] {
  return [...array].sort()
}

export function sortBroken3(array: number[]): number[] {
  return [1,2,3,4,5]
}

// removes duplicates
export function sortBroken4(array: number[]): number[] {
  return sortCorrect([...new Set(array)])
}

// preserves length but changes items by swapping a duplicate
export function sortBroken5(array: number[]): number[] {
  let result: number[] = []
  let seen = new Set<number>()

  sortCorrect(array).forEach((item, index, sorted) => {
    // if `item` is a duplicate, replace it with the the following item, 
    // if one exists. The following item might still be the same as `item`
    // so this only kicks in if `item` exists exactly twice.
    if (seen.has(item) && index+1 < sorted.length) {
      result.push(array[index+1])
    } else {
      seen.add(item)
      result.push(item)
    }
  })

  return result
}

// by default fast-check won't generate arrays with more than 10 items
export function sortBroken6(array: number[]): number[] {
  return sortCorrect(array).slice(0,30)
}

export function sortCorrect(array: number[]): number[] {
  return [...array].sort((a,b) => a-b)
}

