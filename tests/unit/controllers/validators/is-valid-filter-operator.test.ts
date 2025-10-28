import {describe, expect, test} from "vitest"
import {isValidFilterOperator} from "../../../../src/controllers/validators/isValidFilterOperator"

describe('Validating filter operator', () => {
    test.each([
        [null],
        [undefined],
        [''],
        ['eq'],
        ['neq'],
        ['lt'],
        ['gt'],
        ['lte'],
        ['gte'],
    ])('valid value: $0', async (input) => {
        expect(isValidFilterOperator(input))
            .toBeTruthy()
    })

    test.each([
        ['equal'],
        ['!='],
        ['>'],
        ['<'],
        ['>='],
        ['<='],
        [1],
        [0],
        [-1],
        [true],
        [false],
        [NaN],
    ])('invalid value: $0', async (input) => {
        expect(isValidFilterOperator(input))
            .toBeFalsy()
    })
})
