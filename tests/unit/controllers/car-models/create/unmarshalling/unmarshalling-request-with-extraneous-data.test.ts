import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/car-models/marshalling/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: any = {
        name: "360 Modena",
        id: 42,
        my_property: "Hello",
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
