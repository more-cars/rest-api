import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        rating_value: true,
        scale_minimum: true,
        scale_maximum: true,
        scale_direction: true,
    }

    const result = unmarshalInputData(data, [
        'rating_value',
        'scale_minimum',
        'scale_maximum',
        'scale_direction',
    ])

    expect(result)
        .toStrictEqual({
            rating_value: true,
            scale_minimum: true,
            scale_maximum: true,
            scale_direction: true,
        })
})
