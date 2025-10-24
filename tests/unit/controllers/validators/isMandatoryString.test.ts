import {describe, expect, test} from "vitest"
import {isMandatoryString} from "../../../../src/controllers/validators/isMandatoryString"

describe('Validating mandatory strings', () => {
    test.each([
        ['test'],
        ['0'],
        ['true'],
        ['false'],
        ['null'],
        ['undefined'],
    ])('valid value: $0', async (input) => {
        expect(isMandatoryString(input))
            .toBeTruthy()
    })

    test.each([
        [''],
        [1],
        [0],
        [-1],
        [true],
        [false],
        [null],
        [undefined],
        [NaN],
    ])('invalid value: $0', async (input) => {
        expect(isMandatoryString(input))
            .toBeFalsy()
    })
})
