import {describe, expect, test} from "vitest"
import {isValidPublicationFrequency} from "../../../../src/controllers/validators/isValidPublicationFrequency"

describe('Validating publication frequency', () => {
    test.each([
        [undefined],
        [null],
        ['yearly'],
        ['twice-a-year'],
        ['quarterly'],
        ['every-two-months'],
        ['every-six-weeks'],
        ['monthly'],
        ['twice-per-month'],
        ['weekly'],
        ['irregular'],
        ['other'],
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
