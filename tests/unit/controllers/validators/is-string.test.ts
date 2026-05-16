import {describe, expect, test} from "vitest"
import {isString} from "../../../../src/controllers/validators/isString"

describe('Validating strings', () => {
    test.each([
        [undefined],
        [null],
        [''],
        ['test'],
        ['very very very very very very very very very very very long string'],
    ])('valid value: $0', async (input) => {
        expect(isString(input))
            .toBeTruthy()
    })

    test.each([
        [0],
        [-0.01],
        [-1],
        [1],
        [NaN],
        [true],
        [false],
        [['test']],
        [{test: 'dummy'}],
    ])('invalid value: $0', async (input) => {
        expect(isString(input))
            .toBeFalsy()
    })
})
