import {describe, expect, test} from "vitest"
import {isValidDuration} from "../../../../src/controllers/validators/isValidDuration"

describe('Validating duration', () => {
    test.each([
        [undefined],
        [null],
        ['PT30S'],
        ['PT1M30S'],
        ['PT1H1M30S'],
        ['PT1H1M30S'],
        ['P1DT1H1M30.03S'],
    ])('valid value: $0', async (input) => {
        expect(isValidDuration(input))
            .toBeTruthy()
    })

    test.each([
        ['P'],
        ['PT'],
        ['D'],
        ['1D'],
    ])('invalid value: $0', async (input) => {
        expect(isValidDuration(input))
            .toBeFalsy()
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
        expect(isValidDuration(input))
            .toBeFalsy()
    })
})
