import {expect, test} from 'vitest'
import {CreateSessionResultRawInput} from "../../../../../../src/controllers/session-results/types/CreateSessionResultRawInput"
import {validate} from "../../../../../../src/controllers/session-results/create"

test.each([
    [true, "44", "Lewis Hamilton", "Mercedes", "PT1H23M45.678S", 51, "finished", 25],
    [1, false, "Lewis Hamilton", "Mercedes", "PT1H23M45.678S", 51, "finished", 25],
    [1, "44", true, "Mercedes", "PT1H23M45.678S", 51, "finished", 25],
    [1, "44", "Lewis Hamilton", false, "PT1H23M45.678S", 51, "finished", 25],
    [1, "44", "Lewis Hamilton", "Mercedes", false, 51, "finished", 25],
    [1, "44", "Lewis Hamilton", "Mercedes", "PT1H23M45.678S", false, "finished", 25],
    [1, "44", "Lewis Hamilton", "Mercedes", "PT1H23M45.678S", 51, false, 25],
    [1, "44", "Lewis Hamilton", "Mercedes", "PT1H23M45.678S", 51, "finished", false],
])('validating a request where the fields have invalid data types', async (
    position, race_number, driver_name, team_name, race_time, laps, status, points
) => {
    const data: CreateSessionResultRawInput = {
        position,
        race_number,
        driver_name,
        team_name,
        race_time,
        laps,
        status,
        points,
    }

    const result = validate(data)

    expect(result)
        .toBeFalsy()
})
