import {describe, expect, test} from "vitest"
import {isValidEngineConfiguration} from "../../../../src/controllers/validators/isValidEngineConfiguration"

describe('Validating engine configuration', () => {
    test.each([
        [undefined],
        [null],
        ['Inline'],
        ['V'],
        ['Flat'],
        ['Rotary'],
        ['W'],
    ])('valid value: $0', async (input) => {
        expect(isValidEngineConfiguration(input))
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
        expect(isValidEngineConfiguration(input))
            .toBeFalsy()
    })
})
