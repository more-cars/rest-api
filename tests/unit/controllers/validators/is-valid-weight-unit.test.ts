import {describe, expect, test} from "vitest"
import {isValidWeightUnit} from "../../../../src/controllers/validators/isValidWeightUnit"

describe('Validating weight unit', () => {
    test.each([
        [undefined],
        [null],
        ['kg'],
        ['lbs'],
    ])('valid value: $0', async (input) => {
        expect(isValidWeightUnit(input))
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
        expect(isValidWeightUnit(input))
            .toBeFalsy()
    })
})
