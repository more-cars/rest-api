import {expect, test} from 'vitest'
import {CreateRacingEventRawInput} from "../../../../../../src/controllers/node-types/racing-events/types/CreateRacingEventRawInput"
import {validate} from "../../../../../../src/controllers/node-types/racing-events/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateRacingEventRawInput = {
        name: undefined,
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27",
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
