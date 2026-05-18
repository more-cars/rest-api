import {describe, expect, test} from "vitest"
import {isValidDate} from "../../../../src/controllers/validators/isValidDate"

describe('Validating date', () => {
    test.each([
        [undefined],
        [null],
        ['2025-01-01'],
        ['2025-02-28'],
        ['2025-05-07'],
        ['2025-12-31'],
    ])('valid value: $0', async (input) => {
        expect(isValidDate(input))
            .toBeTruthy()
    })

    test.each([
        ['2025-00-00'],
        ['2025-02-29'],
        ['2025-13-13'],
        ['2025-20-05'],
        ['2025-99-99'],
    ])('invalid value: $0', async (input) => {
        expect(isValidDate(input))
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
        expect(isValidDate(input))
            .toBeFalsy()
    })
})
