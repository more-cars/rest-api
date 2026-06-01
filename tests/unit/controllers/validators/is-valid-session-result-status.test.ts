import {describe, expect, test} from "vitest"
import {isValidSessionResultStatus} from "../../../../src/controllers/validators/isValidSessionResultStatus"

describe('Validating session result status', () => {
    test.each([
        [undefined],
        [null],
        ['finished'],
        ['DSQ'],
        ['DNF'],
        ['DNC'],
        ['DNS'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidSessionResultStatus(input))
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
        expect(isValidSessionResultStatus(input))
            .toBeFalsy()
    })
})
