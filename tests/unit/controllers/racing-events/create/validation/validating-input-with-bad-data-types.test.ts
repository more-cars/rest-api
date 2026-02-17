import {expect, test} from 'vitest'
import {CreateRacingEventRawInput} from "../../../../../../src/controllers/racing-events/types/CreateRacingEventRawInput"
import {validate} from "../../../../../../src/controllers/racing-events/create"

test.each([
    [true, 8, "2025-05-25", "2025-05-27"],
    ["GP Monaco 2025", false, "2025-05-25", "2025-05-27"],
    ["GP Monaco 2025", 8, false, "2025-05-27"],
    ["GP Monaco 2025", 8, "2025-05-25", false],
])('validating a request where the fields have invalid data types', async (
    name, round, date_from, date_to
) => {
    const data: CreateRacingEventRawInput = {
        name,
        round,
        date_from,
        date_to,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
