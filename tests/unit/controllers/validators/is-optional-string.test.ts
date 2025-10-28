import {describe, expect, test} from "vitest"
import {isOptionalString} from "../../../../src/controllers/validators/isOptionalString"

describe('Validating optional strings', () => {
    test.each([
        [''],
        ['test'],
        ['0'],
        ['true'],
        ['false'],
        ['null'],
        ['undefined'],
        [null],
        [undefined],
    ])('valid value: $0', async (input) => {
        expect(isOptionalString(input))
            .toBeTruthy()
    })

    test.each([
        [1],
        [0],
        [-1],
        [true],
        [false],
        [NaN],
    ])('invalid value: $0', async (input) => {
        expect(isOptionalString(input))
            .toBeFalsy()
    })
})
