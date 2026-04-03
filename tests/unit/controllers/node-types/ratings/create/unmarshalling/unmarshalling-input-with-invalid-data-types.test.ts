import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/ratings/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        rating_value: true,
        scale_minimum: true,
        scale_maximum: true,
        scale_direction: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            rating_value: true,
            scale_minimum: true,
            scale_maximum: true,
            scale_direction: true,
        })
})
