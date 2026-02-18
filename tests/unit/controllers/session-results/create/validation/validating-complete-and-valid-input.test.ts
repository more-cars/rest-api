import {expect, test} from 'vitest'
import {CreateSessionResultRawInput} from "../../../../../../src/controllers/node-types/session-results/types/CreateSessionResultRawInput"
import {validate} from "../../../../../../src/controllers/node-types/session-results/create"

test('validating a complete and valid request', async () => {
    const data: CreateSessionResultRawInput = {
        position: 1,
        race_number: "44",
        driver_name: "Lewis Hamilton",
        team_name: "Mercedes",
        race_time: "PT1H23M45.678S",
        laps: 51,
        status: "finished",
        points: 25,
    }

    const result = validate(data)

    expect(result)
        .toBeTruthy()
})
