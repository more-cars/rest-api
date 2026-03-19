import {expect, test} from 'vitest'
import {CreateModelCarBrandRawInput} from "../../../../../../../src/controllers/node-types/model-car-brands/types/CreateModelCarBrandRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/model-car-brands/create"

test.each([
    [false, 1968, 0.01],
    ["Hot Wheels", false, 0.01],
    ["Hot Wheels", 1968, false],
])('validating a request where the fields have invalid data types', async (
    name,
    founded,
    defunct,
) => {
    const data: CreateModelCarBrandRawInput = {
        name,
        founded,
        defunct,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
