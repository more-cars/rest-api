import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/model-car-brands/marshalling/unmarshalInputData"
import type {CreateModelCarBrandRawInput} from "../../../../../../../src/controllers/node-types/model-car-brands/types/CreateModelCarBrandRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateModelCarBrandRawInput = {
        name: "Hot Wheels",
        founded: 1968,
        defunct: null,
        country_code: 'US',
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Hot Wheels",
            founded: 1968,
            defunct: null,
            country_code: 'US',
        })
})
