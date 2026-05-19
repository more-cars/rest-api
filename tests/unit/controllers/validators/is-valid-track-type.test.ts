import {describe, expect, test} from "vitest"
import {isValidTrackType} from "../../../../src/controllers/validators/isValidTrackType"

describe('Validating track type', () => {
    test.each([
        [undefined],
        [null],
        ['permanent race track'],
        ['street circuit'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidTrackType(input))
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
        expect(isValidTrackType(input))
            .toBeFalsy()
    })
})
