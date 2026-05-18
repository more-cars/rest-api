import {describe, expect, test} from "vitest"
import {isValidTargetAudience} from "../../../../src/controllers/validators/isValidTargetAudience"

describe('Validating target audience', () => {
    test.each([
        [undefined],
        [null],
        ['international'],
        ['national'],
        ['regional'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidTargetAudience(input))
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
        expect(isValidTargetAudience(input))
            .toBeFalsy()
    })
})
