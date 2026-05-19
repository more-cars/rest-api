import {describe, expect, test} from "vitest"
import {isValidDateTime} from "../../../../src/controllers/validators/isValidDateTime"

describe('Validating date time', () => {
    test.each([
        [undefined],
        [null],
        ['2024-04-14T11:04:04.493Z'],
        ['2024-04-14 11:04:04.493Z'],
    ])('valid value: $0', async (input) => {
        expect(isValidDateTime(input))
            .toBeTruthy()
    })

    test.each([
        ['2024-04-14'],
        ['11:04:04.493Z'],
    ])('invalid value: $0', async (input) => {
        expect(isValidDateTime(input))
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
        expect(isValidDateTime(input))
            .toBeFalsy()
    })
})
