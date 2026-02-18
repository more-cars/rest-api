import {expect, test} from 'vitest'
import {CreateSessionResultRawInput} from "../../../../../../src/controllers/node-types/session-results/types/CreateSessionResultRawInput"
import {validate} from "../../../../../../src/controllers/node-types/session-results/create"

test('validating a valid request where optional fields are missing', async () => {
    const data: CreateSessionResultRawInput = {
        position: 1,
        race_number: undefined,
        driver_name: "Lewis Hamilton",
        team_name: undefined,
        race_time: undefined,
        laps: undefined,
        status: undefined,
        points: undefined,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
