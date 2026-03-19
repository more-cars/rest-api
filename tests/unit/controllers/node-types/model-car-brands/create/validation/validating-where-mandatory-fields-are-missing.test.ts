import {expect, test} from 'vitest'
import {CreateModelCarBrandRawInput} from "../../../../../../../src/controllers/node-types/model-car-brands/types/CreateModelCarBrandRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/model-car-brands/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateModelCarBrandRawInput = {
        name: undefined,
        founded: 1968,
        defunct: null,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
