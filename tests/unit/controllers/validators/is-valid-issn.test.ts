import {describe, expect, test} from "vitest"
import {isValidIssn} from "../../../../src/controllers/validators/isValidIssn"

describe('Validating issn', () => {
    test.each([
        [undefined],
        [null],
        ['1111-1119'],
    ])('valid value: $0', async (input) => {
        expect(isValidIssn(input))
            .toBeTruthy()
    })

    test.each([
        ['1111-1111'],
        ['1234-5678'],
    ])('invalid value: $0', async (input) => {
        expect(isValidIssn(input))
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
        expect(isValidIssn(input))
            .toBeFalsy()
    })
})
