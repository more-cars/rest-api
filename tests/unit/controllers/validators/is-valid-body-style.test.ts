import {describe, expect, test} from "vitest"
import {isValidBodyStyle} from "../../../../src/controllers/validators/isValidBodyStyle"

describe('Validating body style', () => {
    test.each([
        [undefined],
        [null],
        ['coupe'],
        ['convertible'],
        ['roadster'],
        ['hatchback'],
        ['sedan'],
        ['station-wagon'],
        ['minivan'],
        ['van'],
        ['suv'],
        ['off-roader'],
        ['pickup-truck'],
        ['truck'],
        ['targa'],
        ['t-top'],
        ['kei-car'],
        ['formula-race-car'],
        ['other'],
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
