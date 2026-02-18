import {expect, test} from 'vitest'
import {CreateCarModelRawInput} from "../../../../../../src/controllers/node-types/car-models/types/CreateCarModelRawInput"
import {validate} from "../../../../../../src/controllers/node-types/car-models/create"

test('validating a valid request where optional fields are missing', async () => {
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
