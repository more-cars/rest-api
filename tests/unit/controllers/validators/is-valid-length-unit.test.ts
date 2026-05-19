import {describe, expect, test} from "vitest"
import {isValidLengthUnit} from "../../../../src/controllers/validators/isValidLengthUnit"

describe('Validating length unit', () => {
    test.each([
        [undefined],
        [null],
        ['m'],
        ['km'],
        ['miles'],
        ['laps'],
    ])('valid value: $0', async (input) => {
        expect(isValidLengthUnit(input))
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
        expect(isValidLengthUnit(input))
            .toBeFalsy()
    })
})
