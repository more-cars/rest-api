import {describe, expect, test} from "vitest"
import {isValidVideoProvider} from "../../../../src/controllers/validators/isValidVideoProvider"

describe('video image provider', () => {
    test.each([
        ['youtube'],
    ])('valid value: $0', async (input) => {
        expect(isValidVideoProvider(input))
            .toBeTruthy()
    })

    test.each([
        [''],
        ['yuutube'],
        ['vimeo'],
        [1],
        [0],
        [-1],
        [true],
        [false],
        [NaN],
    ])('invalid value: $0', async (input) => {
        expect(isValidVideoProvider(input))
            .toBeFalsy()
    })
})
