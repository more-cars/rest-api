import {expect, test} from 'vitest'
import {CreateSessionResultRawInput} from "../../../../../../src/controllers/node-types/session-results/types/CreateSessionResultRawInput"
import {validate} from "../../../../../../src/controllers/node-types/session-results/create"

test('validating a request where mandatory fields are missing', async () => {
    const data: CreateSessionResultRawInput = {
        position: undefined,
        race_number: "44",
        driver_name: undefined,
        team_name: "Mercedes",
        race_time: "PT1H23M45.678S",
        laps: 51,
        status: "finished",
        points: 25,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
