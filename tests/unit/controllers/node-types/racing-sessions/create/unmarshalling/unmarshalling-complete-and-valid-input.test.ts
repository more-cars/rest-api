import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"
import type {CreateRacingSessionRawInput} from "../../../../../../../src/controllers/node-types/racing-sessions/types/CreateRacingSessionRawInput"

test('unmarshalling a complete and valid request', async () => {
    const data: CreateRacingSessionRawInput = {
        name: "Grand Prix",
        start_date: "2025-05-20",
        start_time: "14:00",
        duration: 120,
        duration_unit: "min",
        distance: 58,
        distance_unit: "laps",
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
            start_date: "2025-05-20",
            start_time: "14:00",
            duration: 120,
            duration_unit: "min",
            distance: 58,
            distance_unit: "laps",
        })
})
