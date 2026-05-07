import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"
import type {CreateSessionResultRawInput} from "../../../../../../../src/controllers/node-types/session-results/types/CreateSessionResultRawInput"

test('unmarshalling a complete and valid request', async () => {
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

    const result = unmarshalInputData(data, [
        'position',
        'race_number',
        'driver_name',
        'team_name',
        'race_time',
        'laps',
        'status',
        'points',
    ])

    expect(result)
        .toStrictEqual({
            position: 1,
            race_number: "44",
            driver_name: "Lewis Hamilton",
            team_name: "Mercedes",
            race_time: "PT1H23M45.678S",
            laps: 51,
            status: "finished",
            points: 25,
        })
})
