import {describe, expect, test} from "vitest"
import {isValidImagePlatform} from "../../../../src/controllers/validators/isValidImagePlatform"

describe('Validating image provider', () => {
    test.each([
        ['flickr'],
        ['wikimedia'],
    ])('valid value: $0', async (input) => {
        expect(isValidImagePlatform(input))
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
        expect(isValidImagePlatform(input))
            .toBeFalsy()
    })
})
