import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        name: "Grand Prix"
    }

    const result = unmarshalInputData(data, [
        'name',
        'start_date',
        'start_time',
        'duration',
        'duration_unit',
        'distance',
        'distance_unit',
    ])

    expect(result)
        .toStrictEqual({
            name: "Grand Prix",
            start_date: undefined,
            start_time: undefined,
            duration: undefined,
            duration_unit: undefined,
            distance: undefined,
            distance_unit: undefined,
        })
})
