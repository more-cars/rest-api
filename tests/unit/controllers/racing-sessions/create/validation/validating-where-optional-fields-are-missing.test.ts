import {expect, test} from 'vitest'
import {CreateRacingSessionRawInput} from "../../../../../../src/controllers/node-types/racing-sessions/types/CreateRacingSessionRawInput"
import {validate} from "../../../../../../src/controllers/node-types/racing-sessions/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateRacingSessionRawInput = {
        name: "Grand Prix",
        start_date: undefined,
        start_time: undefined,
        duration: undefined,
        duration_unit: undefined,
        distance: undefined,
        distance_unit: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
