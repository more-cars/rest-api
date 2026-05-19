import {describe, expect, test} from "vitest"
import {isValidTrackSurface} from "../../../../src/controllers/validators/isValidTrackSurface"

describe('Validating track surface', () => {
    test.each([
        [undefined],
        [null],
        ['asphalt'],
        ['mixed'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidTrackSurface(input))
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
        expect(isValidTrackSurface(input))
            .toBeFalsy()
    })
})
