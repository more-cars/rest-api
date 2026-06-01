import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        name: "Grand Prix",
        start_date: "2025-05-20",
        start_time: "14:00",
        duration: "PT120M",
        distance: 58,
        distance_unit: "laps",
        my_property: "Hello",
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
            name: "Grand Prix",
            start_date: "2025-05-20",
            start_time: "14:00",
            duration: "PT120M",
            distance: 58,
            distance_unit: "laps",
        })
})
