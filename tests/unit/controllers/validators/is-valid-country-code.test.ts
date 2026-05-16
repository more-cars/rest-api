import {describe, expect, test} from "vitest"
import {isValidCountryCode} from "../../../../src/controllers/validators/isValidCountryCode"
import countries from "i18n-iso-countries"

describe('Validating country code', () => {
    test.each([
        [undefined],
        [null],
    ])('valid value: $0', async (input) => {
        expect(isValidCountryCode(input))
            .toBeTruthy()
    })

    test.each(
        Object.keys(countries.getAlpha2Codes())
    )('valid value: $0', async (input) => {
        expect(isValidCountryCode(input))
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
        expect(isValidCountryCode(input))
            .toBeFalsy()
    })
})
