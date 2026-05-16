import {describe, expect, test} from "vitest"
import {isFlatObject} from "../../../../src/controllers/validators/isFlatObject"

describe('Validating flat objects', () => {
    test.each([
        {},
        {
            test: 'dummy',
            test2: 42,
        },
    ])('valid value', async (input) => {
        expect(isFlatObject(input))
            .toBeTruthy()
    })

    test.each([
        [''],
        ['test'],
        [0],
        [0.01],
        [NaN],
        [true],
        [false],
        [null],
        [undefined],
        [['test']],
        [{
            test: {
                nested: 'not allowed',
            },
        }],
        [{
            test: {
                nested: 'not allowed',
            },
            test2: 'dummy',
        }],
    ])('invalid value', async (input) => {
        expect(isFlatObject(input))
            .toBeFalsy()
    })
})
