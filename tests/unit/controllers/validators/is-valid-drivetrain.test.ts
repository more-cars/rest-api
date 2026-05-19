import {describe, expect, test} from "vitest"
import {isValidDrivetrain} from "../../../../src/controllers/validators/isValidDrivetrain"

describe('Validating drivetrain', () => {
    test.each([
        [undefined],
        [null],
        ['RWD'],
        ['AWD'],
        ['FWD'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidDrivetrain(input))
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
        expect(isValidDrivetrain(input))
            .toBeFalsy()
    })
})
