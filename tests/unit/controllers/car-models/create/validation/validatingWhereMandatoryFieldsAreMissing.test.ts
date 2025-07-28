import {expect, test} from 'vitest'
import {validate} from "../../../../../../src/controllers/carModels/create"
import {CreateCarModelRawInput} from "../../../../../../src/controllers/carModels/types/CreateCarModelRawInput"

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
