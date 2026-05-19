import {describe, expect, test} from "vitest"
import {isValidEnergySource} from "../../../../src/controllers/validators/isValidEnergySource"

describe('Validating energy source', () => {
    test.each([
        [undefined],
        [null],
        ['petrol'],
        ['electricity'],
        ['diesel'],
        ['hydrogen'],
        ['ethanol'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidEnergySource(input))
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
        expect(isValidEnergySource(input))
            .toBeFalsy()
    })
})
