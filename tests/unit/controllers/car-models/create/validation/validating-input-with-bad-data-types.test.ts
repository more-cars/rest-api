import {expect, test} from 'vitest'
import {CreateCarModelRawInput} from "../../../../../../src/controllers/car-models/types/CreateCarModelRawInput"
import {validate} from "../../../../../../src/controllers/car-models/create"

test.each([
    [true, 1999, 2005, 1, "F131", 16365],
    ["360 Modena", false, 2005, 1, "F131", 16365],
    ["360 Modena", 1999, false, 1, "F131", 16365],
    ["360 Modena", 1999, 2005, false, "F131", 16365],
    ["360 Modena", 1999, 2005, 1, false, 16365],
    ["360 Modena", 1999, 2005, 1, "F131", false],
])('validating a request where the fields have invalid data types', async (
    name, built_from, built_to, generation, internal_code, total_production
) => {
    const data: CreateCarModelRawInput = {
        name,
        built_from,
        built_to,
        generation,
        internal_code,
        total_production,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
