import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {}

    const result = unmarshalInputData(data, [
        'rating_value',
        'scale_minimum',
        'scale_maximum',
        'scale_direction',
    ])

    expect(result)
        .toStrictEqual({
            rating_value: undefined,
            scale_minimum: undefined,
            scale_maximum: undefined,
            scale_direction: undefined
        })
})
