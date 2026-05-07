import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        position: 1,
        race_number: "44",
        driver_name: "Lewis Hamilton",
        team_name: "Mercedes",
        race_time: "PT1H23M45.678S",
        laps: 51,
        status: "finished",
        points: 25,
        my_property: "Hello",
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
