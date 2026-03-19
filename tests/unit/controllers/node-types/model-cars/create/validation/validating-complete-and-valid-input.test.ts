import {expect, test} from 'vitest'
import {CreateModelCarRawInput} from "../../../../../../../src/controllers/node-types/model-cars/types/CreateModelCarRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/model-cars/create"

test('validating a complete and valid request', async () => {
    const data: CreateModelCarRawInput = {
        name: "BMW 2002",
        product_code: "DHX60",
        release_year: 2016,
        scale: "1:64",
        series: "BMW",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
