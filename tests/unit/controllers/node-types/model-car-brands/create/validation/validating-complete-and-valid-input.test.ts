import {expect, test} from 'vitest'
import {CreateModelCarBrandRawInput} from "../../../../../../../src/controllers/node-types/model-car-brands/types/CreateModelCarBrandRawInput"
import {validate} from "../../../../../../../src/controllers/node-types/model-car-brands/create"

test('validating a complete and valid request', async () => {
    const data: CreateModelCarBrandRawInput = {
        name: "Hot Wheels",
        founded: 1968,
        defunct: null,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
