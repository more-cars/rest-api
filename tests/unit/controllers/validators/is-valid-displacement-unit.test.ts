import {describe, expect, test} from "vitest"
import {isValidDisplacementUnit} from "../../../../src/controllers/validators/isValidDisplacementUnit"

describe('Validating displacement unit', () => {
    test.each([
        [undefined],
        [null],
        ['ccm'],
        ['cu'],
    ])('valid value: $0', async (input) => {
        expect(isValidDisplacementUnit(input))
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
        expect(isValidDisplacementUnit(input))
            .toBeFalsy()
    })
})
