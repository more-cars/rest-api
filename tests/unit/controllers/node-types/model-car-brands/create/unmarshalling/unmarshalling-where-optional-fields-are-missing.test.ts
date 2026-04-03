import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/model-car-brands/marshalling/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "Hot Wheels"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Hot Wheels",
            founded: undefined,
            defunct: undefined
        })
})
