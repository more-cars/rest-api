import {describe, expect, test} from "vitest"
import {isValidTransmission} from "../../../../src/controllers/validators/isValidTransmission"

describe('Validating transmission', () => {
    test.each([
        [undefined],
        [null],
        ['manual'],
        ['dual clutch'],
        ['auto'],
        ['sequential'],
        ['automated manual'],
        ['cvt'],
    ])('valid value: $0', async (input) => {
        expect(isValidTransmission(input))
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
        expect(isValidTransmission(input))
            .toBeFalsy()
    })
})
