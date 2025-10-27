import {expect, test} from 'vitest'
import {sanitize} from "../../../../../../src/controllers/racing-sessions/create"
import {CreateRacingSessionInput} from "../../../../../../src/models/racing-sessions/types/CreateRacingSessionInput"

test('leading and trailing whitespaces are removed from all properties of type "string"', async () => {
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
