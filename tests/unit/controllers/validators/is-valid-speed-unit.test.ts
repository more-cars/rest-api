import {describe, expect, test} from "vitest"
import {isValidSpeedUnit} from "../../../../src/controllers/validators/isValidSpeedUnit"

describe('Validating speed unit', () => {
    test.each([
        [undefined],
        [null],
        ['km/h'],
        ['mph'],
        ['m/s'],
    ])('valid value: $0', async (input) => {
        expect(isValidSpeedUnit(input))
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
        expect(isValidSpeedUnit(input))
            .toBeFalsy()
    })
})
