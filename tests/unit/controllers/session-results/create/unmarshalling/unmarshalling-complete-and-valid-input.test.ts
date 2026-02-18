import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/session-results/marshalling/unmarshalInputData"

test('unmarshalling a complete and valid request', async () => {
    const data: any = {
        position: 1,
        race_number: "44",
        driver_name: "Lewis Hamilton",
        team_name: "Mercedes",
        race_time: "PT1H23M45.678S",
        laps: 51,
        status: "finished",
        points: 25,
    }

    const result = unmarshalInputData(data)

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
