import {expect, test} from 'vitest'
import {generateMoreCarsId} from "../../../../../src/db/generateMoreCarsId"
import {OutOfRangeError} from "../../../../../src/db/types/OutOfRangeError"

test.each([
    0,
    1,
    10,
    100,
    1000,
    10000,
    100000,
    1000000,
    10000000,
    87999999, // this is the largest base ID that can be used to stay within the 8-digit limit
])('valid ID is generated', async (baseId: number) => {
    const id = generateMoreCarsId(baseId)

    expect(id)
        .toBeGreaterThanOrEqual(12000000)

    expect(id)
        .toBeLessThanOrEqual(99999999)
})

test('base ID is too large', async () => {
    expect(() => {
        generateMoreCarsId(78000000)
    }).toThrow(OutOfRangeError)
})
