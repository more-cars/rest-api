import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        rating_value: 93,
        scale_minimum: 0,
        scale_maximum: 100,
        scale_direction: "up"
    }

    const result = unmarshalInputData(data, [
        'rating_value',
        'scale_minimum',
        'scale_maximum',
        'scale_direction',
    ])

    expect(result)
        .toStrictEqual({
            rating_value: 93,
            scale_minimum: 0,
            scale_maximum: 100,
            scale_direction: "up"
        })
})
