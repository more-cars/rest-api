import {describe, expect, test} from "vitest"
import {isValidConsumptionUnit} from "../../../../src/controllers/validators/isValidConsumptionUnit"

describe('Validating consumption unit', () => {
    test.each([
        [undefined],
        [null],
        ['l / 100 km'],
        ['mpg'],
        ['kWh / 100 km'],
        ['l / 100 km (NEDC)'],
        ['l / 100 km (WLTP)'],
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
