import {describe, expect, test} from "vitest"
import {isMandatoryNumber} from "../../../../src/controllers/validators/isMandatoryNumber"

describe('Validating mandatory numbers', () => {
    test.each([
        [0],
        [0.0],
        [0.01],
        [-0.01],
        [1],
        [999999999],
    ])('valid value: $0', async (input) => {
        expect(isMandatoryNumber(input))
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
        [null],
        [undefined],
    ])('invalid value: $0', async (input) => {
        expect(isMandatoryNumber(input))
            .toBeFalsy()
    })
})
