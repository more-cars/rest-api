import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/session-results/marshalling/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        position: true,
        race_number: true,
        driver_name: true,
        team_name: true,
        race_time: true,
        laps: true,
        status: true,
        points: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            position: true,
            race_number: true,
            driver_name: true,
            team_name: true,
            race_time: true,
            laps: true,
            status: true,
            points: true,
        })
})
