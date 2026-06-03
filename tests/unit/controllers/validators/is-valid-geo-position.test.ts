import {describe, expect, test} from "vitest"
import {isValidGeoPosition} from "../../../../src/controllers/validators/isValidGeoPosition"

describe('Validating geo position', () => {
    test.each([
        [undefined],
        [null],
        ['51°32′0″N 13°55′10″E'],
        ['34°50′30″N 136°32′20″E'],
    ])('valid value: $0', async (input) => {
        expect(isValidGeoPosition(input))
            .toBeTruthy()
    })

    test.each([
        ['51°32′0"N 13°55′10"E'],
        ["51°32'0″N 13°55'10″E"],
        ['51°32′0″N13°55′10″E'],
    ])('valid value: $0', async (input) => {
        expect(isValidGeoPosition(input))
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
        expect(isValidGeoPosition(input))
            .toBeFalsy()
    })
})
