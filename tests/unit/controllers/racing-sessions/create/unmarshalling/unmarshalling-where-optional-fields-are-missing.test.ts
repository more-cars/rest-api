import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-sessions/marshalling/unmarshalInputData"

/**
 * Missing optional fields are automatically added as "undefined".
 */
test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: any = {
        name: "Grand Prix"
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: "Grand Prix",
            start_date: undefined,
            start_time: undefined,
            duration: undefined,
            duration_unit: undefined,
            distance: undefined,
            distance_unit: undefined,
        })
})
