import {describe, expect, test} from "vitest"
import {isValidFilterProperty} from "../../../../src/controllers/validators/isValidFilterProperty"

describe('Validating filter property', () => {
    test.each([
        [null],
        [undefined],
        [''],
        ['name'],
        ['founded'],
        ['NAME'],
        ['FOUNDED'],
        ['nAmE'],
        ['fOUnDED'],
    ])('valid value: $0', async (input) => {
        expect(isValidFilterProperty(input, ['name', 'founded']))
            .toBeTruthy()
    })

    test.each([
        ['id'],
        ['_name_'],
        [1],
        [0],
        [-1],
        [true],
        [false],
        [NaN],
    ])('invalid value: $0', async (input) => {
        expect(isValidFilterProperty(input, ['name', 'founded']))
            .toBeFalsy()
    })
})
