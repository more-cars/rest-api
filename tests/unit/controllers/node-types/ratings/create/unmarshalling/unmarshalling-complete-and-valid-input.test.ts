import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"
import type {CreateRatingRawInput} from "../../../../../../../src/controllers/node-types/ratings/types/CreateRatingRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateRatingRawInput = {
        rating_value: 93,
        scale_minimum: 0,
        scale_maximum: 100,
        scale_direction: "up",
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
            scale_direction: "up",
        })
})
