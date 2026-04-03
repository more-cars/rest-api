import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/ratings/marshalling/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        rating_value: 93,
        scale_minimum: 0,
        scale_maximum: 100,
        scale_direction: "up",
        my_property: "Hello",
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            rating_value: 93,
            scale_minimum: 0,
            scale_maximum: 100,
            scale_direction: "up",
        })
})
