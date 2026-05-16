import {describe, expect, test} from "vitest"
import {isValidSortingProperty} from "../../../../src/controllers/validators/isValidSortingProperty"

describe('Validating sorting property', () => {
    test.each([
        [undefined],
        [null],
        [''],
        ['name'],
        ['founded'],
        ['NAME'],
        ['FOUNDED'],
        ['nAmE'],
        ['fOUnDED'],
    ])('valid value: $0', async (input) => {
        expect(isValidSortingProperty(input, ['name', 'founded']))
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
        expect(isValidSortingProperty(input, ['name', 'founded']))
            .toBeFalsy()
    })
})
