import {describe, expect, test} from "vitest"
import {isValidScaleDirection} from "../../../../src/controllers/validators/isValidScaleDirection"

describe('Validating scale direction', () => {
    test.each([
        [undefined],
        [null],
        ['up'],
        ['down'],
    ])('valid value: $0', async (input) => {
        expect(isValidScaleDirection(input))
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
        expect(isValidScaleDirection(input))
            .toBeFalsy()
    })
})
