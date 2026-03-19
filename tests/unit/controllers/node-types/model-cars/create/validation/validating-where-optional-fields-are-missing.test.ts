import {expect, test} from 'vitest'
import {CreateModelCarRawInput} from "../../../../../../../src/controllers/node-types/model-cars/types/CreateModelCarRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/model-cars/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateModelCarRawInput = {
        name: "BMW 2002",
        product_code: undefined,
        release_year: undefined,
        scale: undefined,
        series: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
