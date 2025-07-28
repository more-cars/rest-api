import {expect, test} from 'vitest'
import {validate} from "../../../../../../src/controllers/carModels/create"
import {CreateCarModelRawInput} from "../../../../../../src/controllers/carModels/types/CreateCarModelRawInput"

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
