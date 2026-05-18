import {describe, expect, test} from "vitest"
import {isValidModelScale} from "../../../../src/controllers/validators/isValidModelScale"

describe('Validating model car scale', () => {
    test.each([
        [undefined],
        [null],
        ['1:64'],
        ['1:43'],
        ['1:24'],
        ['1:18'],
        ['1:10'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidModelScale(input))
            .toBeTruthy()
    })

    test.each([
        ['1:11'],
        ['1 to 10'],
        ['1-tenth'],
    ])('valid value: $0', async (input) => {
        expect(isValidModelScale(input))
            .toBeFalsy()
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
