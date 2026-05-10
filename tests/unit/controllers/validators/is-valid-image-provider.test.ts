import {describe, expect, test} from "vitest"
import {isValidImageProvider} from "../../../../src/controllers/validators/isValidImageProvider"

describe('Validating image provider', () => {
    test.each([
        ['flickr'],
        ['wikimedia'],
    ])('valid value: $0', async (input) => {
        expect(isValidImageProvider(input))
            .toBeTruthy()
    })

    test.each([
        [null],
        [undefined],
        [''],
        ['flikkr'],
        ['shutterstock'],
        [1],
        [0],
        [-1],
        [true],
        [false],
        [NaN],
    ])('invalid value: $0', async (input) => {
        expect(isValidImageProvider(input))
            .toBeFalsy()
    })
})
