import {describe, expect, test} from "vitest"
import {isValidConsumptionNorm} from "../../../../src/controllers/validators/isValidConsumptionNorm"

describe('Validating consumption norm', () => {
    test.each([
        [undefined],
        [null],
        ['NEDC'],
        ['WLTP'],
    ])('valid value: $0', async (input) => {
        expect(isValidConsumptionNorm(input))
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
        expect(isValidConsumptionNorm(input))
            .toBeFalsy()
    })
})
