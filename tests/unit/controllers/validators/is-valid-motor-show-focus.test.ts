import {describe, expect, test} from "vitest"
import {isValidMotorShowFocus} from "../../../../src/controllers/validators/isValidMotorShowFocus"

describe('Validating motor show focus', () => {
    test.each([
        [undefined],
        [null],
        ['new_cars'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidMotorShowFocus(input))
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
        expect(isValidMotorShowFocus(input))
            .toBeFalsy()
    })
})
