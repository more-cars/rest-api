import {expect, test} from 'vitest'
import {CreateRacingSessionRawInput} from "../../../../../../src/controllers/racing-sessions/types/CreateRacingSessionRawInput"
import {validate} from "../../../../../../src/controllers/racing-sessions/create"

test('validating a complete and valid request', async () => {
    const data: CreateRacingSessionRawInput = {
        name: "Grand Prix",
        start_date: "2025-05-20",
        start_time: "14:00",
        duration: 120,
        duration_unit: "min",
        distance: 58,
        distance_unit: "laps",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
