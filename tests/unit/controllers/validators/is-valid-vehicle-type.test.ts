import {describe, expect, test} from "vitest"
import {isValidVehicleType} from "../../../../src/controllers/validators/isValidVehicleType"

describe('Validating vehicle type', () => {
    test.each([
        [undefined],
        [null],
        ['open-wheel-cars'],
        ['rally-cars'],
        ['touring-cars'],
        ['gt-cars'],
        ['stock-cars'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidVehicleType(input))
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
        expect(isValidVehicleType(input))
            .toBeFalsy()
    })
})
