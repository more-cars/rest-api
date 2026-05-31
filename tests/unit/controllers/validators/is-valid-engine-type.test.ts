import {describe, expect, test} from "vitest"
import {isValidEngineType} from "../../../../src/controllers/validators/isValidEngineType"

describe('Validating engine type', () => {
    test.each([
        [undefined],
        [null],
        ['otto'],
        ['diesel'],
        ['electric'],
        ['hybrid'],
        ['fuel-cell'],
        ['wankel'],
        ['turbine'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidEngineType(input))
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
        expect(isValidEngineType(input))
            .toBeFalsy()
    })
})
