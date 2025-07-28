import {expect, test} from 'vitest'
import {validate} from "../../../../../../src/controllers/carModels/create"
import {CreateCarModelRawInput} from "../../../../../../src/controllers/carModels/types/CreateCarModelRawInput"

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
