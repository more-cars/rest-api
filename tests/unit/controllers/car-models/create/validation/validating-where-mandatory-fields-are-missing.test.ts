import {expect, test} from 'vitest'
import {CreateCarModelRawInput} from "../../../../../../src/controllers/car-models/types/CreateCarModelRawInput"
import {validate} from "../../../../../../src/controllers/car-models/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateCarModelRawInput = {
        name: undefined,
        built_from: 1999,
        built_to: 2005,
        generation: null,
        internal_code: "F131",
        total_production: 16365,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
