import {describe, expect, test} from "vitest"
import {isValidIsbn} from "../../../../src/controllers/validators/isValidIsbn"

describe('Validating isbn', () => {
    test.each([
        [undefined],
        [null],
        ['9783868528893'],
        ['978-3-86-852889-3'],
        ['0-306-40615-2'],
    ])('valid value: $0', async (input) => {
        expect(isValidIsbn(input))
            .toBeTruthy()
    })

    test.each([
        ['978-3-86-852889-4'],
        ['978-3-86-852889'],
        ['978-3-86-85288'],
        ['0-306-40615-'],
        ['030640615'],
    ])('invalid value: $0', async (input) => {
        expect(isValidIsbn(input))
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
        expect(isValidIsbn(input))
            .toBeFalsy()
    })
})
