import {expect, test} from 'vitest'
import {CreateRacingSessionRawInput} from "../../../../../../src/controllers/racing-sessions/types/CreateRacingSessionRawInput"
import {validate} from "../../../../../../src/controllers/racing-sessions/create"

test.each([
    [true, "2025-05-20", "14:00", 120, "min", 58, "laps"],
    ["Grand Prix", false, "14:00", 120, "min", 58, "laps"],
    ["Grand Prix", "2025-05-20", false, 120, "min", 58, "laps"],
    ["Grand Prix", "2025-05-20", "14:00", false, "min", 58, "laps"],
    ["Grand Prix", "2025-05-20", "14:00", 120, false, 58, "laps"],
    ["Grand Prix", "2025-05-20", "14:00", 120, "min", false, "laps"],
    ["Grand Prix", "2025-05-20", "14:00", 120, "min", 58, false],
])('validating a request where the fields have invalid data types', async (
    name, start_date, start_time, duration, duration_unit, distance, distance_unit
) => {
    const data: CreateRacingSessionRawInput = {
        name,
        start_date,
        start_time,
        duration,
        duration_unit,
        distance,
        distance_unit,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
