import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-sessions/marshalling/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {
        start_date: "2025-05-20",
        start_time: "14:00",
        duration: 120,
        duration_unit: "min",
        distance: 58,
        distance_unit: "laps",
    }
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            start_date: "2025-05-20",
            start_time: "14:00",
            duration: 120,
            duration_unit: "min",
            distance: 58,
            distance_unit: "laps",
        })
})
