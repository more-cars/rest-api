import {describe, expect, test} from "vitest"
import {isValidPublicationFormat} from "../../../../src/controllers/validators/isValidPublicationFormat"

describe('Validating publication format', () => {
    test.each([
        [undefined],
        [null],
        ['l'],
        ['kWh'],
        ['gal'],
        ['kg'],
    ])('valid value: $0', async (input) => {
        expect(isValidPublicationFormat(input))
            .toBeTruthy()
    })

    test.each([
        [undefined],
        [null],
        ['l'],
        ['kWh'],
        ['gal'],
        ['kg'],
    ])('valid value: $0', async (input) => {
        expect(isValidPublicationFormat(input))
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
        expect(isValidPublicationFormat(input))
            .toBeFalsy()
    })
})
