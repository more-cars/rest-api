import {describe, expect, test} from "vitest"
import {isValidPowerUnit} from "../../../../src/controllers/validators/isValidPowerUnit"

describe('Validating power unit', () => {
    test.each([
        [undefined],
        [null],
        ['PS'],
        ['bhp'],
        ['kW'],
        ['PS_SAE'],
    ])('valid value: $0', async (input) => {
        expect(isValidPowerUnit(input))
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
        expect(isValidPowerUnit(input))
            .toBeFalsy()
    })
})
