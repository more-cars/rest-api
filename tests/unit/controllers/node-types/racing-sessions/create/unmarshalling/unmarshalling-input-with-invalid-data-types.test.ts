import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        name: true,
        start_date: true,
        start_time: true,
        duration: true,
        distance: true,
        distance_unit: true,
    }

    const result = unmarshalInputData(data, [
        'name',
        'start_date',
        'start_time',
        'duration',
        'distance',
        'distance_unit',
    ])

    expect(result)
        .toStrictEqual({
            name: true,
            start_date: true,
            start_time: true,
            duration: true,
            distance: true,
            distance_unit: true,
        })
})
