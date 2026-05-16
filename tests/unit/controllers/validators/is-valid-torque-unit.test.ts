import {describe, expect, test} from "vitest"
import {isValidTorqueUnit} from "../../../../src/controllers/validators/isValidTorqueUnit"

describe('Validating torque unit', () => {
    test.each([
        [undefined],
        [null],
        ['Nm'],
        ['lb ft'],
    ])('valid value: $0', async (input) => {
        expect(isValidTorqueUnit(input))
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
        expect(isValidTorqueUnit(input))
            .toBeFalsy()
    })
})
