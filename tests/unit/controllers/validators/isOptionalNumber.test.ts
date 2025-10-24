import {describe, expect, test} from "vitest"
import {isOptionalNumber} from "../../../../src/controllers/validators/isOptionalNumber"

describe('Validating optional numbers', () => {
    test.each([
        [0],
        [0.0],
        [0.01],
        [-0.01],
        [1],
        [999999999],
        [null],
        [undefined],
    ])('valid value: $0', async (input) => {
        expect(isOptionalNumber(input))
            .toBeTruthy()
    })

    test.each([
        ['test'],
        [''],
        ['0'],
        ['0.1'],
        ['-1'],
        [true],
        [false],
        [NaN],
    ])('invalid value: $0', async (input) => {
        expect(isOptionalNumber(input))
            .toBeFalsy()
    })
})
