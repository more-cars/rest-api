import {describe, expect, test} from "vitest"
import {isValidVideoPlatform} from "../../../../src/controllers/validators/isValidVideoPlatform"

describe('video image provider', () => {
    test.each([
        ['youtube'],
    ])('valid value: $0', async (input) => {
        expect(isValidVideoPlatform(input))
            .toBeTruthy()
    })

    test.each([
        [null],
        [undefined],
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
        expect(isValidVideoPlatform(input))
            .toBeFalsy()
    })
})
