import {expect, test} from 'vitest'
import {CreateModelCarBrandRawInput} from "../../../../../../../src/controllers/node-types/model-car-brands/types/CreateModelCarBrandRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/model-car-brands/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateModelCarBrandRawInput = {
        name: "Hot Wheels",
        founded: undefined,
        defunct: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
