import {describe, expect, test} from "vitest"
import {isValidConsumptionUnit} from "../../../../src/controllers/validators/isValidConsumptionUnit"

describe('Validating consumption unit', () => {
    test.each([
        [undefined],
        [null],
        ['L/100 km'],
        ['kWh/100 km'],
        ['km/L'],
        ['mpg'],
    ])('valid value: $0', async (input) => {
        expect(isValidConsumptionUnit(input))
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
        expect(isValidConsumptionUnit(input))
            .toBeFalsy()
    })
})
