import {expect, test} from 'vitest'
import {CreateRacingEventRawInput} from "../../../../../../src/controllers/node-types/racing-events/types/CreateRacingEventRawInput"
import {validate} from "../../../../../../src/controllers/node-types/racing-events/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateRacingEventRawInput = {
        name: "GP Monaco 2025",
        round: undefined,
        date_from: undefined,
        date_to: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
