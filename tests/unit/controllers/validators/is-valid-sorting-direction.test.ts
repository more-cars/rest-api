import {describe, expect, test} from "vitest"
import {isValidSortingDirection} from "../../../../src/controllers/validators/isValidSortingDirection"

describe('Validating sorting direction', () => {
    test.each([
        ['asc'],
        ['desc'],
        ['ASC'],
        ['DESC'],
        ['aSC'],
        ['DeSc'],
        [''],
        [null],
        [undefined],
    ])('valid value: $0', async (input) => {
        expect(isValidSortingDirection(input))
            .toBeTruthy()
    })

    test.each([
        ['_asc_'],
        ['ascending'],
        ['descending'],
        ['up'],
        ['down'],
        [1],
        [0],
        [-1],
        [true],
        [false],
        [NaN],
    ])('invalid value: $0', async (input) => {
        expect(isValidSortingDirection(input))
            .toBeFalsy()
    })
})
