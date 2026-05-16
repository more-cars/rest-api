import {describe, expect, test} from "vitest"
import {isNumber} from "../../../../src/controllers/validators/isNumber"

describe('Validating numbers', () => {
    test.each([
        [undefined],
        [null],
        [0],
        [0.0],
        [0.01],
        [-0.01],
        [-1],
        [1],
        [999999999],
    ])('valid value: $0', async (input) => {
        expect(isNumber(input))
            .toBeTruthy()
    })

    test.each([
        [''],
        ['test'],
        [NaN],
        [true],
        [false],
        [['test']],
        [{test: 'dummy'}],
    ])('invalid value: $0', async (input) => {
        expect(isNumber(input))
            .toBeFalsy()
    })
})
