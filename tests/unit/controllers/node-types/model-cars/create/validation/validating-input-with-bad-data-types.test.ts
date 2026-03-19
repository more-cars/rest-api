import {expect, test} from 'vitest'
import {CreateModelCarRawInput} from "../../../../../../../src/controllers/node-types/model-cars/types/CreateModelCarRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/model-cars/create"

test.each([
    [false, "DHX60", 2016, "1:64", "BMW"],
    ["BMW 2002", false, 2016, "1:64", "BMW"],
    ["BMW 2002", "DHX60", false, "1:64", "BMW"],
    ["BMW 2002", "DHX60", 2016, false, "BMW"],
    ["BMW 2002", "DHX60", 2016, "1:64", false],
])('validating a request where the fields have invalid data types', async (
    name,
    product_code,
    release_year,
    scale,
    series,
) => {
    const data: CreateModelCarRawInput = {
        name,
        product_code,
        release_year,
        scale,
        series,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
