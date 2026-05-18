import {describe, expect, test} from "vitest"
import {isValidPublicationFrequency} from "../../../../src/controllers/validators/isValidPublicationFrequency"

describe('Validating publication frequency', () => {
    test.each([
        [undefined],
        [null],
        ['l'],
        ['kWh'],
        ['gal'],
        ['kg'],
    ])('valid value: $0', async (input) => {
        expect(isValidPublicationFrequency(input))
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
        expect(isValidPublicationFrequency(input))
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
        expect(isValidPublicationFrequency(input))
            .toBeFalsy()
    })
})
