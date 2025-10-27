import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/racing-sessions/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the "keys" are correct.
 */
test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: true,
        start_date: true,
        start_time: true,
        duration: true,
        duration_unit: true,
        distance: true,
        distance_unit: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            start_date: true,
            start_time: true,
            duration: true,
            duration_unit: true,
            distance: true,
            distance_unit: true,
        })
})
