import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/model-car-brands/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        founded: true,
        defunct: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            founded: true,
            defunct: true,
        })
})
