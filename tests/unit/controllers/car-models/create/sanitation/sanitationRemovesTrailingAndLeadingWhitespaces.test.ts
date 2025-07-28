import {expect, test} from 'vitest'
import {sanitize} from "../../../../../../src/controllers/carModels/create"
import {CreateCarModelInput} from "../../../../../../src/models/car-models/types/CreateCarModelInput"

test('leading and trailing whitespaces are removed', async () => {
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
