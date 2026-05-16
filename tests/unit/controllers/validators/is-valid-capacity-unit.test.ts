import {describe, expect, test} from "vitest"
import {isValidCapacityUnit} from "../../../../src/controllers/validators/isValidCapacityUnit"

describe('Validating capacity unit', () => {
    test.each([
        [undefined],
        [null],
        ['l'],
        ['kWh'],
        ['gal'],
        ['kg'],
    ])('valid value: $0', async (input) => {
        expect(isValidCapacityUnit(input))
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
        expect(isValidCapacityUnit(input))
            .toBeFalsy()
    })
})
