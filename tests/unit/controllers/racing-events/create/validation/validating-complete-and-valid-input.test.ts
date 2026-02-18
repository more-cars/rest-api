import {expect, test} from 'vitest'
import {CreateRacingEventRawInput} from "../../../../../../src/controllers/node-types/racing-events/types/CreateRacingEventRawInput"
import {validate} from "../../../../../../src/controllers/node-types/racing-events/create"

test('validating a complete and valid request', async () => {
    const data: CreateRacingEventRawInput = {
        name: "GP Monaco 2025",
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27",
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
