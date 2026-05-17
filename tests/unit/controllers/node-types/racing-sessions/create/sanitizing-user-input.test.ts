import {describe, expect, test} from 'vitest'
import type {RacingSessionInput} from "../../../../../../src/models/node-types/racing-sessions/types/RacingSessionInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: RacingSessionInput = {
            name: "   Grand Prix  ",
            start_date: "   2025-05-20  ",
            start_time: "   14:00  ",
            duration: 120,
            duration_unit: "   min  ",
            distance: 58,
            distance_unit: "   laps  ",
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
})
