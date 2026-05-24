import {describe, expect, test} from "vitest"
import ISO6391 from 'iso-639-1'
import {isValidLanguageCode} from "../../../../src/controllers/validators/isValidLanguageCode"

describe('Validating language code', () => {
    test.each([
        [undefined],
        [null],
    ])('valid value: $0', async (input) => {
        expect(isValidLanguageCode(input))
            .toBeTruthy()
    })

    test.each(
        ISO6391.getAllCodes()
    )('valid value: $0', async (input) => {
        expect(isValidLanguageCode(input))
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
        expect(isValidLanguageCode(input))
            .toBeFalsy()
    })
})
