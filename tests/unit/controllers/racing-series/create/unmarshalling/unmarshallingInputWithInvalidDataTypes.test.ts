import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../src/controllers/racing-series/marshalling/unmarshalInputData"

/**
 * Unmarshalling does NOT perform any validation.
 * Incorrect data types will be accepted, as long as the "keys" are correct.
 */
test('unmarshalling a request where the data types are incorrect', async () => {
    const data: any = {
        name: true,
        short_name: true,
        founded: true,
        defunct: true,
        organized_by: true,
        vehicle_type: true,
    }

    const result = unmarshalInputData(data)

    expect(result)
        .toStrictEqual({
            name: true,
            short_name: true,
            founded: true,
            defunct: true,
            organized_by: true,
            vehicle_type: true,
        })
})
