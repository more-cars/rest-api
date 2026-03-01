import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/car-models/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "360 Modena",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "360 Modena",
            built_from: undefined,
            built_to: undefined,
            generation: undefined,
            internal_code: undefined,
            total_production: undefined,
        })
})
