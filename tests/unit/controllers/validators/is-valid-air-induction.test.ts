import {describe, expect, test} from "vitest"
import {isValidAirInduction} from "../../../../src/controllers/validators/isValidAirInduction"

describe('Validating air induction', () => {
    test.each([
        [undefined],
        [null],
        ['naturally-aspirated'],
        ['turbocharged'],
        ['supercharged'],
        ['turbocharged,supercharged'],
        ['other'],
    ])('valid value: $0', async (input) => {
        expect(isValidAirInduction(input))
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
        expect(isValidAirInduction(input))
            .toBeFalsy()
    })
})
