import {describe, expect, test} from "vitest"
import {isValidPowerNorm} from "../../../../src/controllers/validators/isValidPowerNorm"

describe('Validating power norm', () => {
    test.each([
        [undefined],
        [null],
        ['DIN'],
        ['SAE'],
    ])('valid value: $0', async (input) => {
        expect(isValidPowerNorm(input))
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
        expect(isValidPowerNorm(input))
            .toBeFalsy()
    })
})
