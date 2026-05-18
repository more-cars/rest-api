import {describe, expect, test} from "vitest"
import {isValidMagazineFocus} from "../../../../src/controllers/validators/isValidMagazineFocus"

describe('Validating magazine focus', () => {
    test.each([
        [undefined],
        [null],
        ['l'],
        ['kWh'],
        ['gal'],
        ['kg'],
    ])('valid value: $0', async (input) => {
        expect(isValidMagazineFocus(input))
            .toBeTruthy()
    })

    test.each([
        [undefined],
        [null],
        ['l'],
        ['kWh'],
        ['gal'],
        ['kg'],
    ])('valid value: $0', async (input) => {
        expect(isValidMagazineFocus(input))
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
        expect(isValidMagazineFocus(input))
            .toBeFalsy()
    })
})
