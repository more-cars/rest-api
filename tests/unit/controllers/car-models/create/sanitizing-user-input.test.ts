import {describe, expect, test} from 'vitest'
import {CreateCarModelInput} from "../../../../../src/models/car-models/types/CreateCarModelInput"
import {sanitize} from "../../../../../src/controllers/carModels/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateCarModelInput = {
            name: "    360 Modena    ",
            built_from: 1999,
            built_to: 2005,
            generation: null,
            internal_code: "F131   ",
            total_production: 16365,
        }

        const result = sanitize(data)

        expect(result)
            .toStrictEqual({
                name: "360 Modena",
                built_from: 1999,
                built_to: 2005,
                generation: null,
                internal_code: "F131",
                total_production: 16365,
            })
    })
})
