import {describe, expect, test} from "vitest"
import {isValidPaginationValue} from "../../../../src/controllers/validators/isValidPaginationValue"

describe('Validating pagination value', () => {
    test.each([
        [1],
        [999999999],
        [null],
        [undefined],
    ])('valid value: $0', async (input) => {
        expect(isValidPaginationValue(input))
            .toBeTruthy()
    })

    test.each([
        [0],
        [0.0],
        [0.01],
        [-0.01],
        [-1],
        [-999999999],
        ['test'],
        [''],
        ['0'],
        ['0.1'],
        ['-1'],
        [true],
        [false],
        [NaN],
    ])('invalid value: $0', async (input) => {
        expect(isValidPaginationValue(input))
            .toBeFalsy()
    })
})
