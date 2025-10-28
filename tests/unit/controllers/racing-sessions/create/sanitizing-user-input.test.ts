import {describe, expect, test} from 'vitest'
import {CreateRacingSessionInput} from "../../../../../src/models/racing-sessions/types/CreateRacingSessionInput"
import {sanitize} from "../../../../../src/controllers/racing-sessions/create"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: CreateRacingSessionInput = {
            name: "   Grand Prix  ",
            start_date: "   2025-05-20  ",
            start_time: "   14:00  ",
            duration: 120,
            duration_unit: "   min  ",
            distance: 58,
            distance_unit: "   laps  ",
        }

        const result = sanitize(data)

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
