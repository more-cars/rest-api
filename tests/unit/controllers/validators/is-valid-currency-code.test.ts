import {describe, expect, test} from "vitest"
import cc from 'currency-codes'
import {isValidCurrencyCode} from "../../../../src/controllers/validators/isValidCurrencyCode"

describe('Validating currency code', () => {
    test.each([
        [undefined],
        [null],
    ])('valid value: $0', async (input) => {
        expect(isValidCurrencyCode(input))
            .toBeTruthy()
    })

    test.each(
        cc.codes()
    )('valid value: $0', async (input) => {
        expect(isValidCurrencyCode(input))
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
        expect(isValidCurrencyCode(input))
            .toBeFalsy()
    })
})
