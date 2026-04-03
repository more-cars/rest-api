import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/model-car-brands/marshalling/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        name: "Hot Wheels",
        founded: 1968,
        defunct: null,
        my_property: "Hello",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Hot Wheels",
            founded: 1968,
            defunct: null,
        })
})
