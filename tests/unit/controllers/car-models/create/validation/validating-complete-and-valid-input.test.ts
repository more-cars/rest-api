import {expect, test} from 'vitest'
import {CreateCarModelRawInput} from "../../../../../../src/controllers/node-types/car-models/types/CreateCarModelRawInput"
import {validate} from "../../../../../../src/controllers/node-types/car-models/create"

test('validating a complete and valid request', async () => {
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
