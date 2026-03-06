import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/node-types/ratings/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        rating_value: 93,
        scale_minimum: 0,
        scale_maximum: 100,
        scale_direction: "up",
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
