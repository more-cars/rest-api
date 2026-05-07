import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        position: true,
        race_number: true,
        driver_name: true,
        team_name: true,
        race_time: true,
        laps: true,
        status: true,
        points: true,
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
