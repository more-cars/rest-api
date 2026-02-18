import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/session-results/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {}
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            position: undefined,
            race_number: undefined,
            driver_name: undefined,
            team_name: undefined,
            race_time: undefined,
            laps: undefined,
            status: undefined,
            points: undefined,
        })
})
