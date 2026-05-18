import {describe, expect, test} from "vitest"
import {isValidModelScale} from "../../../../src/controllers/validators/isValidModelScale"

describe('Validating motor show focus', () => {
    test.each([
        [undefined],
        [null],
        ['new_cars'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidModelScale(input))
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
        expect(isValidModelScale(input))
            .toBeFalsy()
    })
})
