import {describe, expect, test} from "vitest"
import {isValidBodyStyle} from "../../../../src/controllers/validators/isValidBodyStyle"

describe('Validating body style', () => {
    test.each([
        [undefined],
        [null],
        ['coupe'],
        ['convertible'],
        ['formula race car'],
        ['hatchback'],
        ['kei car'],
        ['minivan'],
        ['offroad'],
        ['pickup truck'],
        ['roadster'],
        ['sedan'],
        ['station wagon'],
        ['suv'],
        ['t-top'],
        ['targa'],
        ['truck'],
        ['van'],
    ])('valid value: $0', async (input) => {
        expect(isValidBodyStyle(input))
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
        expect(isValidBodyStyle(input))
            .toBeFalsy()
    })
})
