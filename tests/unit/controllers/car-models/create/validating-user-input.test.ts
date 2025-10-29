import {describe, expect, test} from 'vitest'
import {CreateCarModelRawInput} from "../../../../../src/controllers/carModels/types/CreateCarModelRawInput"
import {validate} from "../../../../../src/controllers/carModels/create"

describe('Validating user input', () => {
    test('mandatory fields are missing', async () => {
        const data: CreateCarModelRawInput = {
            name: undefined,
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })

    test('optional fields are missing', async () => {
        const data: CreateCarModelRawInput = {
            name: "360 Modena",
            built_from: undefined,
            built_to: undefined,
            generation: undefined,
            internal_code: undefined,
            total_production: undefined,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test('providing valid input', async () => {
        const data: CreateCarModelRawInput = {
            name: "360 Modena",
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131",
            total_production: 16365,
        }

        const result = validate(data)

        expect(result)
            .toBeTruthy()
    })

    test.each([
        // ["360 Modena", 1999, 2005, null, "F131", 16365], // VALID data for reference
        [360, 1999, 2005, null, "F131", 16365],
        [false, 1999, 2005, null, "F131", 16365],
        ["360 Modena", "1999", 2005, null, "F131", 16365],
        ["360 Modena", 1999, [2005], null, "F131", 16365],
        ["360 Modena", 1999, 2005, true, "F131", 16365],
        ["360 Modena", 1999, 2005, null, 131, 16365],
        ["360 Modena", 1999, 2005, null, "F131", "16365"],
        ["360 Modena", 1999, 2005, null, null, "16365"],
    ])('validating a request where the data types are incorrect', async (
        name, built_from, built_to, generation, internal_code, total_production
    ) => {
        const data: CreateCarModelRawInput = {
            name, built_from, built_to, generation, internal_code, total_production
        }

        const result = validate(data)

        expect(result)
            .toBeFalsy()
    })
})
