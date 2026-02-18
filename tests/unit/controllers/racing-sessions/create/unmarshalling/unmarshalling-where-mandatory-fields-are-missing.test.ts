import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/node-types/racing-sessions/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Missing mandatory fields are automatically added as "undefined".
 */
test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: any = {}
    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: undefined,
            start_date: undefined,
            start_time: undefined,
            duration: undefined,
            duration_unit: undefined,
            distance: undefined,
            distance_unit: undefined,
        })
})
