import {describe, expect, test} from "vitest"
import {isValidWeightNorm} from "../../../../src/controllers/validators/isValidWeightNorm"

describe('Validating weight norm', () => {
    test.each([
        [undefined],
        [null],
        ['dry'],
        ['EG'],
        ['DIN'],
    ])('valid value: $0', async (input) => {
        expect(isValidWeightNorm(input))
            .toBeTruthy()
    })

    test.each([
        [''],
        ['dummy'],
        [1],
        [0],
        [-1.1],
        [NaN],
        [true],
        [false],
        [['test']],
        [{test: 'dummy'}],
    ])('invalid value: $0', async (input) => {
        expect(isValidWeightNorm(input))
            .toBeFalsy()
    })
})
