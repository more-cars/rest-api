import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/session-results/marshalling/unmarshalInputData"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        position: 1,
        driver_name: "Lewis Hamilton",
    }

    const result = unmarshalInputData(data)

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
