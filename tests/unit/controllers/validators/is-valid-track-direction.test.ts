import {describe, expect, test} from "vitest"
import {isValidTrackDirection} from "../../../../src/controllers/validators/isValidTrackDirection"

describe('Validating track direction', () => {
    test.each([
        [undefined],
        [null],
        ['clockwise'],
        ['counterclockwise'],
    ])('valid value: $0', async (input) => {
        expect(isValidTrackDirection(input))
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
        expect(isValidTrackDirection(input))
            .toBeFalsy()
    })
})
