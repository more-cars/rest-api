import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        position: 1,
        driver_name: "Lewis Hamilton",
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
            race_number: undefined,
            driver_name: "Lewis Hamilton",
            team_name: undefined,
            race_time: undefined,
            laps: undefined,
            status: undefined,
            points: undefined,
        })
})
