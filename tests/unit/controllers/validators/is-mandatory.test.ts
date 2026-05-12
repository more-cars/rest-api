import {describe, expect, test} from "vitest"
import {isMandatory} from "../../../../src/controllers/validators/isMandatory"

describe('Validating mandatory data', () => {
    test.each([
        ['test'],
        ['0'],
        ['true'],
        ['false'],
        ['null'],
        ['undefined'],
        [0],
        [0.0],
        [0.01],
        [-0.01],
        [-1],
        [1],
        [999999999],
        [true],
        [false],
    ])('valid value: $0', async (input) => {
        expect(isMandatory(input))
            .toBeTruthy()
    })

    test.each([
        [''],
        [null],
        [undefined],
        [NaN],
    ])('invalid value: $0', async (input) => {
        expect(isMandatory(input))
            .toBeFalsy()
    })
})
